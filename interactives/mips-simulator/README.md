# MIPS Simulator Interactive

**MIPS Simulator Creator:** Alan Hogan
**Interactive Author:** Jack Morgan

This interactive allows users to simulate assembled MIPS code and see the output.

## MIPS Simulator License

The [MIPS Simulator](https://github.com/alanhogan/miphps-mips-simulator) by [Alan Hogan](http://alanhogan.com/) is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

## Required Files

- This interactive uses jQuery and MaterializeCSS (loaded from base-files folder).

## Future Plans

These were Alan Hogan's original list of items to implement:
- Memory is just an associative array, hex code key & hex code data
- Load all pairs into memory
- while (!$exit)
    - Begin execution at 0x00400000 or custom location
    - Function "instruction_decode($hex)" takes hex, returns "Instruction" object
        - Instruction->type: R, I, J, Syscall (more??)
        - Instruction->opcode, rs, rt, rd, shamt, funct, imm, address: bit string
    - Exit with exit syscall or invalid instruction or invalid mem ref
- "Registers" object
- Support for syscall ops
- Create a stack model: Probably just 0xffffffff and then lower in the memory hash
- Support for jump
- Support for beq, bne
- Support for R-types
- Support for I-types
- Finish J-types & jal, jr.
- If jr and $ra = 0, then program execution is complete (success!)

## Extra Notes

- Opera problems resolved. Do not use "&nbsp;" within textareas. See: http://www.webdesignforums.net/showthread.php?t=28727
