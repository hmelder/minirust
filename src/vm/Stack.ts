// SPDX-License-Identifier: Apache-2.0
// Copyright (c) 2025 Hugo Melder

export class Stack {
    private readonly buffer: ArrayBuffer
    private readonly view: DataView
    private sp: number // Stack Pointer: Offset of the next free byte
    private readonly capacity: number
    private littleEndian: boolean

    /**
     * Creates a new stack with a fixed capacity.
     * @param capacityInBytes The total size of the stack memory in bytes.
     * @param littleEndian Optional: Specifies endianness for multi-byte operations (default: true/little-endian).
     */
    constructor(capacityInBytes: number, littleEndian: boolean = true) {
        if (capacityInBytes <= 0) {
            throw new Error('Capacity must be positive.')
        }
        this.capacity = capacityInBytes
        this.buffer = new ArrayBuffer(this.capacity)
        this.view = new DataView(this.buffer)
        this.sp = 0 // Initialize stack pointer at the bottom
        this.littleEndian = littleEndian
    }

    /**
     * Allocates a block of memory on the stack without initializing it.
     * Analogous to C's alloca() or adjusting the stack pointer for local variables.
     * @param sizeInBytes The number of bytes to allocate.
     * @returns The starting byte offset of the allocated block.
     * @throws Error if allocation would exceed capacity (stack overflow).
     */
    alloca(sizeInBytes: number): number {
        if (this.sp + sizeInBytes > this.capacity) {
            throw new Error(
                `Stack overflow: Cannot allocate ${sizeInBytes} bytes. Available: ${
                    this.capacity - this.sp
                }`
            )
        }
        const startOffset = this.sp
        this.sp += sizeInBytes
        return startOffset
    }

    /**
     * Frees the last allocated block of memory from the stack.
     * Essentially moves the stack pointer downwards.
     * Use with caution - ensure size matches the corresponding `alloca` or `push` operations.
     * @param sizeInBytes The number of bytes to free (must match the size of the last allocation).
     * @throws Error if freeing would move sp below 0 (stack underflow).
     */
    free(sizeInBytes: number): void {
        if (this.sp - sizeInBytes < 0) {
            throw new Error(
                `Stack underflow: Cannot free ${sizeInBytes} bytes. Current sp: ${this.sp}`
            )
        }
        this.sp -= sizeInBytes
    }

    /**
     * Directly sets the stack pointer to a specific offset.
     * Use with caution, primarily for frame management (e.g., RETURN).
     * Ensures the new SP is within valid bounds [0, capacity].
     * @param newSp The desired stack pointer offset.
     */
    setStackPointer(newSp: number): void {
        if (newSp < 0 || newSp > this.capacity) {
            throw new Error(
                `Invalid stack pointer value: ${newSp}. Must be between 0 and ${this.capacity}.`
            )
        }
        // Allow setting SP lower (freeing) or higher (allocating implicitly, though alloca is safer).
        // We might want stricter checks depending on usage (e.g., newSp <= oldSp for freeing only).
        this.sp = newSp
    }

    /**
     * Pushes a Uint8 value (1 byte) onto the stack.
     * @param value The byte value to push.
     */
    pushUint8(value: number): void {
        this.checkSpace(1)
        this.view.setUint8(this.sp, value)
        this.sp += 1
    }

    /**
     * Pops a Uint8 value (1 byte) from the stack.
     * @returns The byte value popped.
     */
    popUint8(): number {
        this.checkAvailable(1)
        this.sp -= 1
        return this.view.getUint8(this.sp)
    }

    /**
     * Pushes a Uint32 value (4 bytes) onto the stack.
     * @param value The 32-bit unsigned integer to push.
     */
    pushUint32(value: number): void {
        this.checkSpace(4)
        this.view.setUint32(this.sp, value, this.littleEndian)
        this.sp += 4
    }

    /**
     * Pops a Uint32 value (4 bytes) from the stack.
     * @returns The 32-bit unsigned integer popped.
     */
    popUint32(): number {
        this.checkAvailable(4)
        this.sp -= 4
        return this.view.getUint32(this.sp, this.littleEndian)
    }

    /**
     * Pushes an Int32 value (4 bytes) onto the stack.
     * @param value The 32-bit signed integer to push.
     */
    pushInt32(value: number): void {
        this.checkSpace(4)
        this.view.setInt32(this.sp, value, this.littleEndian)
        this.sp += 4
    }

    /**
     * Pops a Int32 value (4 bytes) from the stack.
     * @returns The 32-bit signed integer popped.
     */
    popInt32(): number {
        this.checkAvailable(4)
        this.sp -= 4
        return this.view.getInt32(this.sp, this.littleEndian)
    }

    // --- Raw Memory Access (for use with alloca/free) ---

    /**
     * Reads a Uint32 value from a specific offset.
     * Does NOT modify the stack pointer. Use after `alloca`.
     * @param offset The byte offset returned by `alloca` or calculated manually.
     * @returns The Uint32 value at the offset.
     * @throws Error if read access is out of bounds.
     */
    readUint32(offset: number): number {
        this.checkBounds(offset, 4)
        return this.view.getUint32(offset, this.littleEndian)
    }

    readInt32(offset: number): number {
        this.checkBounds(offset, 4)
        return this.view.getInt32(offset, this.littleEndian)
    }

    /**
     * Writes a Uint32 value to a specific offset.
     * Does NOT modify the stack pointer. Use after `alloca`.
     * @param offset The byte offset returned by `alloca` or calculated manually.
     * @param value The Uint32 value to write.
     * @throws Error if write access is out of bounds.
     */
    writeUint32(offset: number, value: number): void {
        this.checkBounds(offset, 4)
        this.view.setUint32(offset, value, this.littleEndian)
    }

    writeInt32(offset: number, value: number): void {
        this.checkBounds(offset, 4)
        this.view.setInt32(offset, value, this.littleEndian)
    }

    /**
     * Reads a Float64 value from a specific offset.
     * Does NOT modify the stack pointer. Use after `alloca`.
     * @param offset The byte offset returned by `alloca` or calculated manually.
     * @returns The Float64 value at the offset.
     * @throws Error if read access is out of bounds.
     */
    readFloat64(offset: number): number {
        this.checkBounds(offset, 8)
        return this.view.getFloat64(offset, this.littleEndian)
    }

    /**
     * Writes a Float64 value to a specific offset.
     * Does NOT modify the stack pointer. Use after `alloca`.
     * @param offset The byte offset returned by `alloca` or calculated manually.
     * @param value The Float64 value to write.
     * @throws Error if write access is out of bounds.
     */
    writeFloat64(offset: number, value: number): void {
        this.checkBounds(offset, 8)
        this.view.setFloat64(offset, value, this.littleEndian)
    }

    // --- Utility Methods ---

    /** Returns the current stack pointer offset. */
    getStackPointer(): number {
        return this.sp
    }

    /** Returns the total capacity in bytes. */
    getCapacity(): number {
        return this.capacity
    }

    /** Returns the number of bytes currently used. */
    getUsedSize(): number {
        return this.sp
    }

    /** Returns the number of bytes currently free. */
    getFreeSize(): number {
        return this.capacity - this.sp
    }

    /** Resets the stack pointer to 0, effectively clearing the stack without zeroing memory. */
    reset(): void {
        this.sp = 0
    }

    // --- Private Helpers ---

    private checkSpace(requiredBytes: number): void {
        if (this.sp + requiredBytes > this.capacity) {
            throw new Error(
                `Stack overflow: Need ${requiredBytes} bytes, only ${this.getFreeSize()} available.`
            )
        }
    }

    private checkAvailable(requiredBytes: number): void {
        if (this.sp < requiredBytes) {
            throw new Error(
                `Stack underflow: Trying to pop/access ${requiredBytes} bytes, only ${this.sp} used.`
            )
        }
    }

    private checkBounds(offset: number, size: number): void {
        // Check if the operation fits within the allocated buffer space
        if (offset < 0 || offset + size > this.capacity) {
            throw new Error(
                `Out of bounds access: Trying to access ${size} bytes at offset ${offset}. Capacity: ${this.capacity}`
            )
        }
    }
}
