// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2025 Hugo Melder

// Heap implementation backed by ArrayBuffer, using the first-fit algorithm for
// finding unused nodes in the free-list.
// TODO: We could also do something fancier, like the buddy algorithm
export class Heap {
    private readonly buffer: ArrayBuffer
    private readonly view: DataView
    private readonly capacity: number

    // --- Configuration ---
    /** Size of the block header in bytes (stores size|allocated_flag). Must be power of 2 >= 4. */
    private readonly HEADER_SIZE = 4
    /** Alignment for allocations (pointers returned by malloc). Must be power of 2 >= 4. */
    private readonly ALIGNMENT = 8
    /** Offset within a free block's payload where the 'next free' pointer is stored. */
    private readonly NEXT_FREE_OFFSET = 0
    /** Offset within a free block's payload where the 'prev free' pointer is stored. */
    private readonly PREV_FREE_OFFSET = 4 // Assumes 4-byte pointers/offsets
    /** Size required to store free list pointers within a free block's payload. */
    private readonly FREE_LIST_POINTER_SIZE = 8 // next(4) + prev(4)
    /** Minimum total size of any block (header + payload). Must be aligned. */
    private readonly MIN_BLOCK_SIZE: number // Calculated in constructor

    /** Sentinel offset for the free list head/tail/null pointers */
    private readonly NULL_OFFSET = -1

    /** Offset of the *header* of the first block in the free list. */
    private freeListHeadHeaderOffset: number = this.NULL_OFFSET

    private readonly littleEndian = true

    constructor(capacityInBytes: number) {
        if (capacityInBytes <= 0) {
            throw new Error('Capacity must be positive.')
        }
        // Ensure capacity is sufficient and aligned
        this.capacity = this.alignUp(capacityInBytes, this.ALIGNMENT)
        if (this.capacity < this.HEADER_SIZE * 2) {
            throw new Error(
                `Capacity ${capacityInBytes} (aligned to ${this.capacity}) is too small.`
            )
        }

        this.buffer = new ArrayBuffer(this.capacity)
        this.view = new DataView(this.buffer)

        // Calculate minimum block size based on header, alignment, and free list pointer storage
        this.MIN_BLOCK_SIZE = this.alignUp(
            this.HEADER_SIZE + this.FREE_LIST_POINTER_SIZE,
            this.ALIGNMENT
        )

        // Initialize the entire buffer as a single large free block
        const initialBlockSize = this.capacity
        if (initialBlockSize >= this.MIN_BLOCK_SIZE) {
            this.setHeader(0, initialBlockSize, true) // Header at offset 0
            this.addBlockToFreeList(0) // Add this block (identified by header offset)
        } else {
            // Capacity is too small even for the minimum block size
            throw new Error(
                `Capacity ${this.capacity} is too small for minimum block size ${this.MIN_BLOCK_SIZE}.`
            )
        }
    }

    // --- Allocation & Deallocation ---

    /**
     * Allocates a block of memory on the heap.
     * @param sizeInBytes The requested size of the memory block.
     * @returns The byte offset (pointer) to the allocated block's payload, or NULL_OFFSET (-1) if allocation fails.
     */
    malloc(sizeInBytes: number): number {
        if (sizeInBytes <= 0) {
            return this.NULL_OFFSET
        }

        // Calculate required payload size with alignment
        const alignedPayloadSize = this.alignUp(sizeInBytes, this.ALIGNMENT)
        // Calculate total block size needed (header + aligned payload)
        let requiredBlockSize = alignedPayloadSize + this.HEADER_SIZE

        // Ensure minimum block size requirement is met (especially for small allocations)
        if (requiredBlockSize < this.MIN_BLOCK_SIZE) {
            requiredBlockSize = this.MIN_BLOCK_SIZE
        }
        requiredBlockSize = this.alignUp(requiredBlockSize, this.ALIGNMENT)

        // First-fit strategy
        let currentHeaderOffset = this.freeListHeadHeaderOffset
        let bestFitHeaderOffset = this.NULL_OFFSET

        while (currentHeaderOffset !== this.NULL_OFFSET) {
            const currentBlockSize = this.getSizeFromHeader(currentHeaderOffset)
            if (currentBlockSize >= requiredBlockSize) {
                bestFitHeaderOffset = currentHeaderOffset
                break
            }
            currentHeaderOffset = this.getNextFreeOffset(currentHeaderOffset)
        }

        if (bestFitHeaderOffset === this.NULL_OFFSET) {
            // No suitable block found
            console.warn(
                `Heap.malloc: No free block large enough for ${sizeInBytes} bytes (needs ${requiredBlockSize} total).`
            )
            return this.NULL_OFFSET
        }

        const foundBlockSize = this.getSizeFromHeader(bestFitHeaderOffset)
        this.removeBlockFromFreeList(bestFitHeaderOffset) // Remove the entire block for now

        // --- Try to split the block if it's significantly larger ---
        const remainingSize = foundBlockSize - requiredBlockSize

        if (remainingSize >= this.MIN_BLOCK_SIZE) {
            // Split the block
            // 1. Allocated block (at the beginning)
            this.setHeader(bestFitHeaderOffset, requiredBlockSize, false) // Mark as allocated

            // 2. New free block (the remainder)
            const newFreeBlockHeaderOffset =
                bestFitHeaderOffset + requiredBlockSize
            this.setHeader(newFreeBlockHeaderOffset, remainingSize, true) // Mark as free
            this.addBlockToFreeList(newFreeBlockHeaderOffset) // Add remainder back to free list

            // Return pointer to payload of the allocated portion
            return bestFitHeaderOffset + this.HEADER_SIZE
        } else {
            // Allocate the entire block (cannot split)
            this.setHeader(bestFitHeaderOffset, foundBlockSize, false) // Mark as allocated

            // Return pointer to payload
            return bestFitHeaderOffset + this.HEADER_SIZE
        }
    }

    /**
     * Frees a previously allocated block of memory.
     * @param ptr The byte offset (pointer) returned by malloc.
     */
    free(ptr: number): void {
        if (ptr <= 0 || ptr >= this.capacity || ptr % this.ALIGNMENT !== 0) {
            console.error(`Heap.free: Invalid pointer ${ptr}.`)
            return // Or throw error
        }

        const headerOffset = ptr - this.HEADER_SIZE

        if (headerOffset < 0) {
            console.error(
                `Heap.free: Pointer ${ptr} leads to invalid header offset ${headerOffset}.`
            )
            return
        }

        const size = this.getSizeFromHeader(headerOffset)
        const isFree = this.isFreeFromHeader(headerOffset)

        if (isFree) {
            console.warn(
                `Heap.free: Double free detected for pointer ${ptr} (header offset ${headerOffset}).`
            )
            return // Already free
        }
        if (headerOffset + size > this.capacity) {
            console.error(
                `Heap.free: Block at ${headerOffset} with size ${size} exceeds capacity ${this.capacity}. Heap corrupted?`
            )
            return
        }

        // Mark the block as free
        this.setHeader(headerOffset, size, true)

        // Add back to the free list (maintaining sorted order) and attempt coalescing
        this.addBlockToFreeListAndCoalesce(headerOffset)
    }

    // --- Memory Access Helpers ---

    /** Reads a Uint32 value from the heap block. */
    readUint32(ptr: number, offsetInBlock: number = 0): number {
        const blockDataOffset = this.getDataOffset(ptr, offsetInBlock, 4)
        if (blockDataOffset === this.NULL_OFFSET) return 0 // Error logged in getDataOffset
        return this.view.getUint32(blockDataOffset, this.littleEndian)
    }

    readInt32(ptr: number, offsetInBlock: number = 0): number {
        const blockDataOffset = this.getDataOffset(ptr, offsetInBlock, 4)
        if (blockDataOffset === this.NULL_OFFSET) return 0 // Error logged in getDataOffset
        return this.view.getInt32(blockDataOffset, this.littleEndian)
    }

    /** Writes a Uint32 value to the heap block. */
    writeUint32(ptr: number, value: number, offsetInBlock: number = 0): void {
        const blockDataOffset = this.getDataOffset(ptr, offsetInBlock, 4)
        if (blockDataOffset !== this.NULL_OFFSET) {
            this.view.setUint32(blockDataOffset, value, this.littleEndian)
        }
    }

    writeInt32(ptr: number, value: number, offsetInBlock: number = 0): void {
        const blockDataOffset = this.getDataOffset(ptr, offsetInBlock, 4)
        if (blockDataOffset !== this.NULL_OFFSET) {
            this.view.setInt32(blockDataOffset, value, this.littleEndian)
        }
    }

    /** Reads a Uint8 value (byte) from the heap block. */
    readUint8(ptr: number, offsetInBlock: number = 0): number {
        const blockDataOffset = this.getDataOffset(ptr, offsetInBlock, 1)
        if (blockDataOffset === this.NULL_OFFSET) return 0
        return this.view.getUint8(blockDataOffset)
    }

    /** Writes a Uint8 value (byte) to the heap block. */
    writeUint8(ptr: number, value: number, offsetInBlock: number = 0): void {
        const blockDataOffset = this.getDataOffset(ptr, offsetInBlock, 1)
        if (blockDataOffset !== this.NULL_OFFSET) {
            this.view.setUint8(blockDataOffset, value)
        }
    }
    // Add more read/write methods as needed (Int32, Float64, etc.)

    // --- Debugging ---
    /** Prints the current state of the free list. */
    public printFreeList(): void {
        console.log('--- Heap Free List ---')
        let current = this.freeListHeadHeaderOffset
        let i = 0
        while (current !== this.NULL_OFFSET && i < 1000) {
            // Loop limiter
            const size = this.getSizeFromHeader(current)
            const next = this.getNextFreeOffset(current)
            const prev = this.getPrevFreeOffset(current)
            console.log(
                `  Block @ Header ${current}: Size=${size}, Prev=${prev}, Next=${next}`
            )
            if (!this.isFreeFromHeader(current)) {
                console.error(
                    `   ERROR: Block @ ${current} in free list is marked ALLOCATED!`
                )
            }
            if (current + size > this.capacity) {
                console.error(
                    `   ERROR: Block @ ${current} size ${size} exceeds capacity ${this.capacity}!`
                )
            }
            current = next
            i++
        }
        if (i >= 1000)
            console.error(
                '  ERROR: Free list traversal limit reached (potential loop?)'
            )
        console.log('----------------------')
    }

    // --- Private Helper Methods ---

    /** Calculate offset for data access, performing checks. */
    private getDataOffset(
        ptr: number,
        offsetInBlock: number,
        accessSize: number
    ): number {
        if (ptr <= 0 || ptr >= this.capacity || ptr % this.ALIGNMENT !== 0) {
            console.error(`Heap Access Error: Invalid base pointer ${ptr}.`)
            return this.NULL_OFFSET
        }
        const headerOffset = ptr - this.HEADER_SIZE
        if (headerOffset < 0) {
            console.error(
                `Heap Access Error: Pointer ${ptr} leads to invalid header offset ${headerOffset}.`
            )
            return this.NULL_OFFSET
        }

        const blockSize = this.getSizeFromHeader(headerOffset)
        const isFree = this.isFreeFromHeader(headerOffset)
        const payloadSize = blockSize - this.HEADER_SIZE

        if (isFree) {
            console.warn(
                `Heap Access Warning: Accessing potentially uninitialized or freed memory at ptr ${ptr} (offset ${offsetInBlock}).`
            )
            // Allow access to free blocks for things like reading free list pointers, but warn.
        }

        if (offsetInBlock < 0 || offsetInBlock + accessSize > payloadSize) {
            console.error(
                `Heap Access Error: Offset ${offsetInBlock} (size ${accessSize}) out of bounds for block at ptr ${ptr} (payload size ${payloadSize}).`
            )
            return this.NULL_OFFSET
        }

        return ptr + offsetInBlock // Absolute offset in the buffer
    }

    /** Sets the block header (size and allocated status). Size must be aligned. */
    private setHeader(
        headerOffset: number,
        size: number,
        isFree: boolean
    ): void {
        // Size includes the header itself. Store size | free_flag (LSB=1 if free)
        const headerValue = size | (isFree ? 1 : 0)
        this.view.setUint32(headerOffset, headerValue, this.littleEndian)
    }

    /** Gets the total block size from its header. */
    private getSizeFromHeader(headerOffset: number): number {
        const headerValue = this.view.getUint32(headerOffset, this.littleEndian)
        return headerValue & ~1 // Mask out the free flag (LSB)
    }

    /** Checks if the block is marked as free from its header. */
    private isFreeFromHeader(headerOffset: number): boolean {
        const headerValue = this.view.getUint32(headerOffset, this.littleEndian)
        return (headerValue & 1) === 1
    }

    /** Gets the offset of the *header* of the next block in the free list. */
    private getNextFreeOffset(blockHeaderOffset: number): number {
        // Pointers are stored in the payload area
        return this.view.getInt32(
            blockHeaderOffset + this.HEADER_SIZE + this.NEXT_FREE_OFFSET,
            this.littleEndian
        )
    }

    /** Sets the offset of the *header* of the next block in the free list. */
    private setNextFreeOffset(
        blockHeaderOffset: number,
        nextHeaderOffset: number
    ): void {
        this.view.setInt32(
            blockHeaderOffset + this.HEADER_SIZE + this.NEXT_FREE_OFFSET,
            nextHeaderOffset,
            this.littleEndian
        )
    }

    /** Gets the offset of the *header* of the previous block in the free list. */
    private getPrevFreeOffset(blockHeaderOffset: number): number {
        return this.view.getInt32(
            blockHeaderOffset + this.HEADER_SIZE + this.PREV_FREE_OFFSET,
            this.littleEndian
        )
    }

    /** Sets the offset of the *header* of the previous block in the free list. */
    private setPrevFreeOffset(
        blockHeaderOffset: number,
        prevHeaderOffset: number
    ): void {
        this.view.setInt32(
            blockHeaderOffset + this.HEADER_SIZE + this.PREV_FREE_OFFSET,
            prevHeaderOffset,
            this.littleEndian
        )
    }

    /** Removes a block (given its header offset) from the free list. */
    private removeBlockFromFreeList(blockHeaderOffset: number): void {
        const prevOffset = this.getPrevFreeOffset(blockHeaderOffset)
        const nextOffset = this.getNextFreeOffset(blockHeaderOffset)

        if (prevOffset !== this.NULL_OFFSET) {
            this.setNextFreeOffset(prevOffset, nextOffset)
        } else {
            // This was the head of the list
            this.freeListHeadHeaderOffset = nextOffset
        }

        if (nextOffset !== this.NULL_OFFSET) {
            this.setPrevFreeOffset(nextOffset, prevOffset)
        }
        // Clear pointers in the removed block just in case (optional)
        // this.setNextFreeOffset(blockHeaderOffset, this.NULL_OFFSET);
        // this.setPrevFreeOffset(blockHeaderOffset, this.NULL_OFFSET);
    }

    /** Adds a block (given its header offset) to the free list, maintaining sorted order by address. */
    private addBlockToFreeList(blockHeaderOffset: number): void {
        let current = this.freeListHeadHeaderOffset
        let prev = this.NULL_OFFSET

        // Find position to insert (list is sorted by address)
        while (current !== this.NULL_OFFSET && current < blockHeaderOffset) {
            prev = current
            current = this.getNextFreeOffset(current)
        }

        // Insert block
        this.setNextFreeOffset(blockHeaderOffset, current)
        this.setPrevFreeOffset(blockHeaderOffset, prev)

        if (prev !== this.NULL_OFFSET) {
            this.setNextFreeOffset(prev, blockHeaderOffset)
        } else {
            // New head of the list
            this.freeListHeadHeaderOffset = blockHeaderOffset
        }

        if (current !== this.NULL_OFFSET) {
            this.setPrevFreeOffset(current, blockHeaderOffset)
        }
    }

    /** Adds block to free list and attempts to merge with physical neighbours if they are free. */
    private addBlockToFreeListAndCoalesce(headerOffset: number): void {
        let currentHeaderOffset = headerOffset
        let currentSize = this.getSizeFromHeader(currentHeaderOffset)

        // --- Coalesce with *next* physical block ---
        const nextBlockHeaderOffset = currentHeaderOffset + currentSize
        if (nextBlockHeaderOffset < this.capacity) {
            // Check if next block exists within bounds
            if (this.isFreeFromHeader(nextBlockHeaderOffset)) {
                // Next block is free, merge it
                this.removeBlockFromFreeList(nextBlockHeaderOffset) // Remove it from list
                currentSize += this.getSizeFromHeader(nextBlockHeaderOffset)
                this.setHeader(currentHeaderOffset, currentSize, true) // Update current block's header
            }
        }

        // --- Coalesce with *previous* physical block ---
        // This requires finding the previous block header. We assume headers store size accurately.
        // To find previous header, we would need to iterate or have footers.
        // Let's try finding it via the free list (if the prev free block is also the prev physical block)
        // Simpler approach: Add to list *first*, then check neighbours in the list.

        // Add the (potentially already forward-coalesced) block to the free list first
        this.addBlockToFreeList(currentHeaderOffset)

        // Now check neighbours *in the list* which might be physical neighbours
        const prevFreeOffset = this.getPrevFreeOffset(currentHeaderOffset)
        if (prevFreeOffset !== this.NULL_OFFSET) {
            const prevFreeSize = this.getSizeFromHeader(prevFreeOffset)
            if (prevFreeOffset + prevFreeSize === currentHeaderOffset) {
                // Previous free block is physically adjacent! Coalesce backwards.
                this.removeBlockFromFreeList(currentHeaderOffset) // Remove current block
                this.removeBlockFromFreeList(prevFreeOffset) // Remove previous block
                const newSize = prevFreeSize + currentSize
                this.setHeader(prevFreeOffset, newSize, true) // Update previous block's header
                this.addBlockToFreeList(prevFreeOffset) // Add the newly merged block
                // currentHeaderOffset = prevFreeOffset; // Update pointer if we needed to do more
            }
        }
        // Note: Forward coalescing check could also be done here after adding,
        // by checking this.getNextFreeOffset(currentHeaderOffset), but doing it
        // before adding simplifies the logic slightly.
    }

    /** Aligns a value up to the nearest multiple of 'alignment'. */
    private alignUp(value: number, alignment: number): number {
        return Math.ceil(value / alignment) * alignment
    }
}
