# The Virtual Machine

## 1. Introduction

This document describes the virtual machine by giving an overview of available instructions, the calling convention, and the instruction specification in pseudo code format.

The virtual machine is a typed stack machine, where type information in the
operand dictates the behavior of the operation.

## 2. Instruction Overview

| Mnemonic | Arguments (Imm)                     | Arguments (Stack)   | Return (Stack)  | High-level Description                  |
| -------- | ----------------------------------- | ------------------- | --------------- | --------------------------------------- |
| `ADD`    | `()`                                | `(a: u32, b: u32)`  | `(res: u32)`    | Addition                                |
| `NOP`    | `()`                                | `()`                | `()`            | No operation                            |
| `EQ`     | `()`                                | `(a: i32, b: i32)`  | `(res: bool)`   | Equality check                          |
| `LT`     | `()`                                | `(a: i32, b: i32)`  | `(res: bool)`   | Less than check                         |
| `MALLOC` | `(length: u32)`                     | `()`                | `(addr: u32)`   | Allocate segment on heap                |
| `FREE`   | `()`                                | `(addr: u32)`       | `()`            | Free segment on heap                    |
| `ALLOCA` | `(length: u32)`                     | `()`                | `()`            | Allocate space on stack                 |
| `FREEA`  | `(length: u32)`                     | `()`                | `()`            | Free space on stack                     |
| `MOV`    | `(srcOff: u32, destOff: u32, TYPE)` | `()`                | `()`            | Move value on stack                     |
| `PUSH`   | `(value: TYPE, TYPE)`               | `()`                | `(value: TYPE)` | Push value to stack                     |
| `PUSHA`  | `(off: u32, TYPE)`                  | `()`                | `(value: TYPE)` | Copy value from stack and push to stack |
| `POPA`   | `(off: u32, TYPE)`                  | `()`                | `()`            | Pop value from stack to stack           |
| `ASSIGN` | `(off: u32, value: TYPE, type)`     | `()`                | `()`            | Copy value to stack                     |
| `CALL`   | `(ip: u32)`                         | \*                  | \*              | Call function at ip                     |
| `JUMP`   | `(ip: u32)`                         | `()`                | `()`            | Jump to ip                              |
| `JUMPF`  | `(ip: u32)`                         | `(condition: bool)` | `()`            | Jump if value on stack is false         |
| `RETURN` | `()`                                | \*                  | \*              | Returns from a function                 |
| `HALT`   | `()`                                | `()`                | `()`            | Halts VM                                |

\*: See calling convention below

## 3. Calling Convention

```
  ┌───────────────────┐
  │Frame #0           │
  │                   │
  │┌─────────────────┐│
  ││       IP        ││
  │└─────────────────┘│
  │┌─────────────────┐│
  ││       FP        ││
  │└─────────────────┘│
  │┌─────────────────┐│
  ││                 ││
  ││                 ││
  ││                 ││
  ││     Locals      ││
  ││                 ││
  ││                 ││
  ││                 ││
  │└─────────────────┘│
  │┌─────────────────┐│
  ││  nth Argument   ││
  │└─────────────────┘│
  │         ●         │
  │         ●         │
  │         ●         │
  │┌─────────────────┐│
  ││  1st Argument   ││
  │└─────────────────┘│
  │┌─────────────────┐│
  ││                 ││
  ││                 ││
  ││   Return Area   ││
  ││                 ││
  ││                 ││
  │└─────────────────┘│
  └───────────────────┘
  ┌───────────────────┐
  │Frame #1           │
  │                   │
  │                   │
  └*******************┘
```

Snapshot of a stack. Caller pushes arguments onto the stack and allocates space
for the return value. The instruction `CALL` pushes the return instruction
pointer (IP) (the next instruction after `CALL`) and frame pointer (FP) onto the
stack and jumps to the function, by setting the program counter to the entry
point of the function.

The ´RETURN` instruction moves the internal stack pointer to the previous
frame pointer (FP) and sets the program counter to the saved ip.

## 4. Instruction Specification

**Mnemonic:** `ADD`
**Description:** Addition
**Pseudocode:**

```pseudocode
value_b = POP i32 from Stack
value_a = POP i32 from Stack
result = value_a + value_b
PUSH result (i32) onto Stack
Increment IP by 1
```

---

**Mnemonic:** `NOP`
**Description:** No operation
**Pseudocode:**

```pseudocode
Increment IP by 1
```

---

**Mnemonic:** `EQ`
**Description:** Equality check
**Pseudocode:**

```pseudocode
// Assumes i32 based on implementation
value_b = POP i32 from Stack
value_a = POP i32 from Stack
result = (value_a == value_b) // Boolean result
PUSH result (as 1 for true, 0 for false - u32) onto Stack
Increment IP by 1
```

---

**Mnemonic:** `LT`
**Description:** Less than check
**Pseudocode:**

```pseudocode
// Assumes i32 based on implementation
value_b = POP i32 from Stack
value_a = POP i32 from Stack
result = (value_a < value_b) // Boolean result
PUSH result (as 1 for true, 0 for false - u32) onto Stack
Increment IP by 1
```

---

**Mnemonic:** `MALLOC`
**Arguments (Imm):** `(length: u32)` (Number of _bytes_ to allocate)
**Description:** Allocate segment on heap
**Pseudocode:**

```pseudocode
address = ALLOCATE length bytes on Heap
IF allocation failed THEN
  Signal Runtime Error (e.g., out of memory)
ELSE
  PUSH address (u32) onto Stack
  Increment IP by 1
ENDIF
```

---

**Mnemonic:** `FREE`
**Description:** Free segment on heap
**Pseudocode:**

```pseudocode
address = POP u32 from Stack
DEALLOCATE heap memory block starting at address
IF deallocation failed (e.g., invalid address) THEN
  Signal Runtime Error
ELSE
  Increment IP by 1
ENDIF
```

---

**Mnemonic:** `ALLOCA`
**Arguments (Imm):** `(length: u32)` (Number of _words/slots_ to allocate)
**Description:** Allocate space on stack
**Pseudocode:**

```pseudocode
bytes_to_allocate = length * bytes_per_slot // Typically 4 bytes per slot
Allocate bytes_to_allocate on Stack by increasing Stack Pointer (SP)
IF allocation failed (e.g., stack overflow) THEN
  Signal Runtime Error
ELSE
  Increment IP by 1
ENDIF
```

---

**Mnemonic:** `FREEA`
**Arguments (Imm):** `(length: u32)` (Number of _words/slots_ to free)
**Description:** Free space on stack
**Pseudocode:**

```pseudocode
bytes_to_free = length * bytes_per_slot // Typically 4 bytes per slot
Deallocate bytes_to_free from Stack by decreasing Stack Pointer (SP)
IF deallocation failed (e.g., stack underflow relative to frame) THEN
  Signal Runtime Error
ELSE
  Increment IP by 1
ENDIF
```

---

**Mnemonic:** `MOV`
**Arguments (Imm):** `(srcOff: u32, destOff: u32, TYPE)` (Offsets relative to Frame Pointer FP)
**Description:** Move value on stack (within the current frame)
**Pseudocode:**

```pseudocode
source_address = FP + (srcOff * bytes_per_slot)
destination_address = FP + (destOff * bytes_per_slot)
value = READ TYPE from Stack at source_address
WRITE value (as TYPE) to Stack at destination_address
Increment IP by 1
```

---

**Mnemonic:** `PUSH`
**Arguments (Imm):** `(value: TYPE, TYPE)`
**Description:** Push immediate value to stack
**Pseudocode:**

```pseudocode
PUSH value (interpreted as TYPE) onto Stack
Increment IP by 1
```

---

**Mnemonic:** `PUSHA`
**Arguments (Imm):** `(off: u32, TYPE)` (Offset relative to Frame Pointer FP)
**Description:** Copy value from stack frame and push to stack top
**Pseudocode:**

```pseudocode
source_address = FP + (off * bytes_per_slot)
value = READ TYPE from Stack at source_address
PUSH value (as TYPE) onto Stack
Increment IP by 1
```

---

**Mnemonic:** `POPA`
**Arguments (Imm):** `(off: u32, TYPE)` (Offset relative to Frame Pointer FP)
**Description:** Pop value from stack top to a location in the stack frame
**Pseudocode:**

```pseudocode
value = POP TYPE from Stack
destination_address = FP + (off * bytes_per_slot)
WRITE value (as TYPE) to Stack at destination_address
Increment IP by 1
```

---

**Mnemonic:** `ASSIGN`
**Arguments (Imm):** `(off: u32, value: TYPE, TYPE)` (Offset relative to Frame Pointer FP)
**Description:** Copy immediate value to a location in the stack frame
**Pseudocode:**

```pseudocode
destination_address = FP + (off * bytes_per_slot)
WRITE value (interpreted as TYPE) to Stack at destination_address
Increment IP by 1
```

---

**Mnemonic:** `CALL`
**Arguments (Imm):** `(ip: u32)` (Target instruction address)
**Description:** Call function at ip
**Pseudocode:**

```pseudocode
// Assume arguments were PUSHed before CALL by the caller
return_address = IP + 1 // Address of the instruction after CALL
PUSH return_address (u32) onto Stack
PUSH current FP (u32) onto Stack
SET FP = current Stack Pointer (SP) // New frame starts *after* saved FP
SET IP = target_ip // Jump to function's first instruction
// Callee is responsible for allocating its local variables (ALLOCA)
// Callee is responsible for accessing arguments (relative to new FP)
```

---

**Mnemonic:** `JUMP`
**Arguments (Imm):** `(ip: u32)` (Target instruction address)
**Description:** Jump unconditionally to ip
**Pseudocode:**

```pseudocode
SET IP = target_ip
```

---

**Mnemonic:** `JUMPF`
**Arguments (Imm):** `(ip: u32)` (Target instruction address)
**Description:** Jump if value on stack is false (0)
**Pseudocode:**

```pseudocode
condition = POP u32/bool from Stack // Treat 0 as false, non-zero as true
IF condition is false (0) THEN
  SET IP = target_ip
ELSE
  Increment IP by 1 // Continue to next instruction
ENDIF
```

---

**Mnemonic:** `RETURN`
**Description:** Returns from a function
**Pseudocode:**

```pseudocode
// Assume return value (if any) is on the top of the stack, pushed by callee
// 1. Deallocate local variables and temporary values within the frame
SET Stack Pointer (SP) = current FP
// 2. Restore caller's frame pointer
old_fp = POP u32 from Stack
SET FP = old_fp
// 3. Restore caller's instruction pointer
return_ip = POP u32 from Stack
IF return_ip == -1 THEN // Special value indicating return from initial call
  SET VM Status = 'halted'
ELSE
  SET IP = return_ip
ENDIF
// Caller is responsible for cleaning up arguments it pushed before CALL
```

---

**Mnemonic:** `HALT`
**Description:** Halts VM execution
**Pseudocode:**

```pseudocode
SET VM Status = 'halted'
// Do not increment IP
```

---
