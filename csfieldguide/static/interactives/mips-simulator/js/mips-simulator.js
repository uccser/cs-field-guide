/* Partial MIPS I Simulator based on the work of Alan Hogan
 * https://github.com/alanhogan/miphps-mips-simulator
 * Licensed under CC BY-NC-SA 4.0
 */

// Types of instructions
const TYPE_UNSUPPORTED = -2;
const TYPE_INVALID = -1;
const TYPE_UNASSIGNED = 0;
const TYPE_R = 1;
const TYPE_I = 2;
const TYPE_J = 3;
const TYPE_SYSCALL = 4;

// other constants
const INSTRUCTION_START = 0x00400000;
const DATA_START = 0x00c00000;
const MAX_EXECUTIONS = 10000;
const MAX_16 = 32767; // Max value of a signed 16 bit integer, for signed ALU ops

// Register 0 is hardwired to 0. All registers are named as per convention
var REGISTERS = [0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,];
const REG_NAMES = ["zero","at","v0","v1","a0","a1","a2","a3","t0","t1","t2","t3","t4","t5","t6","t7","s0","s1","s2","s3","s4","s5","s6","s7","t8","t9","k0","k1","gp","sp","fp","ra"];
var DATA;

const TXT_INVALID = gettext("INVALID HEX VALUE");
const TXT_END = gettext("* Program execution complete *");
const TXT_BADEND = gettext("* Program execution halted early *");
const TXT_INPUT = gettext("input");
const TXT_NOEND = gettext("Parsing completed without finding the quit instruction");
const TXT_INFINITE = gettext("Program executed 10000 instructions, it probably entered an infinite loop!");
const TXT_INSTRUCTION = gettext("instruction");
const TXT_NOREAD = gettext("Cannot read from empty register");
const TXT_NOSUPPORT = gettext("Unsupported value in register");
const TXT_INT = gettext("Print an integer");
const TXT_TXT = gettext("Print a string");
const TXT_LOAD = gettext("Loading");
const TAB = "    ";

var PRINTTEXT;
var SHOWCONTEXT;
var SHOWREG;

// Stores a backup of the default code and registers button handler functions
$(document).ready(function() {
    var basicProgram = $('#assembled-input').val();
    var advancedProgram = $('#program-output').val();
    $('#program-output').val('');
    
    $('#run-mips').on('click', function () {
        run();
    });

    $('#reset-basic').on('click', function () {
        $('#assembled-input').val(basicProgram);
        $('#program-output').val('');
    });

    $('#reset-adv').on('click', function () {
        $('#assembled-input').val(advancedProgram);
        $('#program-output').val('');
    });
});

// Interprets and runs each line of assembled MIPS code
function run() {
    SHOWCONTEXT = $('#show-context').is(':checked');
    SHOWREG = $('#show-registers').is(':checked');
    PRINTTEXT = "";

    instructionAddr = INSTRUCTION_START;
    dataAddr = DATA_START;
    DATA = [];

    var mipsText = $("#assembled-input").val();
    var line;
    var lineHex;
    var lines;
    var input = 0;

    var instructions = [];

    var parseInstr = true;

    // Parse the code
    lines = mipsText.split(/\r|\n/);

    for (i=0; i < lines.length; i++) {
        line = lines[i].trim();

        // Interpret initial lines as instructions
        if (parseInstr) {
            if (line == "") {
                // Ignore empty lines
                input++;
                continue;
            }
            lineHex = parseInt(("0x" + line));
            if (isNaN(lineHex)) {
                // Stop processing on an invalid character string
                PRINTTEXT += "; " + TXT_INVALID + " ; <" + TXT_INPUT + ":" + input + "> " + line + "\n";
                present(PRINTTEXT, false);
                return;
            }
            if (line == "03e00008") {
                // jr $ra : Interpret as the end of instructions; the following hex values must be stored data
                parseInstr = false;
            }

            instructions.push([instructionAddr, lineHex, input]);
            instructionAddr += 4;

        // Interpret remaining lines as stored data
        } else {
            lineHex = parseInt(("0x" + line));
            DATA.push([dataAddr, lineHex, input]);
            dataAddr += 4;
        }

        input++;
    }

    if (parseInstr) {
        // End instruction was not parsed
        PRINTTEXT += "\n" + TXT_NOEND + ": jr $ra\n";
        present(PRINTTEXT, false);
        return;
    }

    // Run the code
    var quit = false;
    var instructionSet; // Temporary storage
    var instrType;
    var instrDecoded;
    var instrExecs;
    instrAddr = INSTRUCTION_START;
    var instructionNum = 0;
    var isSuccess = true;
    while (!quit && instructionNum < MAX_EXECUTIONS) {
        instructionSet = instructions[(instrAddr - INSTRUCTION_START) / 4];
        instrHex = instructionSet[1];
        input = instructionSet[2];
        instrExecs = null;

        if (instrHex == 0x0000000c) {
            if (SHOWCONTEXT) {
                PRINTTEXT += TXT_LOAD + " " + hexOfInt(instrAddr, 8) + " : " + hexOfInt(instrHex, 8) + "; <" + TXT_INSTRUCTION + ":" + instructionNum + "> syscall\n";
            }
            instrType = TYPE_SYSCALL;
        } else {
            instructionSet = interpret(instrHex);
            instrType = instructionSet[0];
            instrDecoded = instructionSet[1];
            instrExecs = instructionSet[2];

            if (instrHex == 0x03e00008) {
                quit = true;
                if (SHOWCONTEXT) {
                    PRINTTEXT += TXT_LOAD + " " + hexOfInt(instrAddr, 8) + " : " + hexOfInt(instrHex, 8) + "; <" + TXT_INSTRUCTION + ":" + instructionNum + "> jr $ra\n";
                }
            } else {

                //temp block
                if (instrDecoded == TYPE_UNSUPPORTED) {
                    PRINTTEXT += "Unsupported instruction in hex: " + hexOfInt(instrHex, 8) + "\n"; //temp
                } else if (instrDecoded == TYPE_INVALID) {
                    PRINTTEXT += "Invalid instruction hex: " + hexOfInt(instrHex, 8) + "\n"; //temp
                }
                //end temp block

                if (SHOWCONTEXT) {
                    PRINTTEXT += TXT_LOAD + " " + hexOfInt(instrAddr, 8) + " : " + hexOfInt(instrHex, 8) + "; <" + TXT_INSTRUCTION + ":" + instructionNum + "> " + instrDecoded + "\n";
                }
            }
        }

        instrAddr = execute(instrType, instrExecs, instrAddr);
        //instrAddr += 4;
        if (instrAddr < 0) {
            isSuccess = false;
            quit = true;
        }
        instructionNum ++;
    }

    if (instructionNum >= MAX_EXECUTIONS) {
        PRINTTEXT += "\n" + TXT_INFINITE + "\n";
        present(PRINTTEXT, false);
        return;
    }

    // Display output
    present(PRINTTEXT, isSuccess);
}

// Writes the given text to the Program Output textarea,
// along with a message depending on the value of isSuccess
function present(text, isSuccess) {
    if (isSuccess) {
        text += "\n" + TXT_END;
    } else {
        text += "\n" + TXT_BADEND;
    }
    $("#program-output").val(text);
}

// Returns the last element of the given array
// This equates to the python expression array[-1]
function last(array) {
    return array[array.length - 1];
}

// Returns the string of an integer as a zero-extended n-character hex value
// If the hex is less than n/2 bytes, zeros will be appended to the front
// If the hex is greater than n/2 bytes, a larger than n-character string will be returned
// E.g: hexOfInt(20, 4) = "0014", hexOfint(20, 1) = "14"
function hexOfInt(num, n) {
    var returnString = num.toString(16);
    if (returnString.length < n) {
        return "0".repeat(n - returnString.length) + returnString;
    } else {
        return returnString;
    }
}

// Executes the given instruction, or does nothing if it can't be interpreted
// Returns the address of the next instruction to execute
function execute(type, args, addr) {
    var nextAddr;
    var opcode;
    if (type == TYPE_SYSCALL) {
        execute_syscall();
        nextAddr = addr + 4;
    } else {
        opcode = args[0];
        switch(opcode) {
            // Type R
            case("sll"):
                nextAddr = execute_sll(args, addr); break;
            case("jr"):
                nextAddr = execute_jr(args, addr); break;
            case("add"):
                nextAddr = execute_add(args, addr); break;
            case("addu"):
                nextAddr = execute_addu(args, addr); break;
            case("sub"):
                nextAddr = execute_sub(args, addr); break;
            case("subu"):
                nextAddr = execute_subu(args, addr); break;
            case("and"):
                nextAddr = execute_and(args, addr); break;
            case("or"):
                nextAddr = execute_or(args, addr); break;
            case("xor"):
                nextAddr = execute_xor(args, addr); break;
            case("nor"):
                nextAddr = execute_nor(args, addr); break;
            case("beq"):
                nextAddr = execute_beq(args, addr); break;
            case("bne"):
                nextAddr = execute_bne(args, addr); break;
            // Type I
            case("addi"):
                nextAddr = execute_addi(args, addr); break;
            case("addiu"):
                nextAddr = execute_addiu(args, addr); break;
            case("andi"):
                nextAddr = execute_andi(args, addr); break;
            case("ori"):
                nextAddr = execute_ori(args, addr); break;
            case("xori"):
                nextAddr = execute_xori(args, addr); break;
            // Type J
            case("j"):
                nextAddr = execute_j(args); break;
            default:
                nextAddr = addr + 4;
        }
    }
    return nextAddr;
}

// Returns a list of 3 values interpreted from the input instruction hex, or a list of 3 TYPE_INVALIDs if it is invalid
// 1) The Type of instruction
// 2) The instruction in its dissassembled state, or TYPE_UNSUPPORTED if it is unsupported
// 3) The instruction arguments in the format used to execute them
function interpret(hex) {
    var name;
    var type;
    var arguments;
    var executables;
    var returnText = "";
    // Type I and Type J opcodes are in the first 6 bits
    var opcode = (0xFC000000 & hex) >> 26;
    if (opcode == 0) {
        // The Type R opcode is in the last 6 bits
        type = TYPE_R;
        opcode = 0x0000003F & hex;
        arguments = disassembleR(hex);
        name = operation(TYPE_R, opcode);
        if (name == TYPE_UNSUPPORTED) {
            return [type, TYPE_UNSUPPORTED, null];
        }
        if (name == "sll") {
            // Interpret as the supported shift operation
            // sll $dest, $operand, shift
            executables = [name, arguments[3], arguments[2], arguments[4]];
            returnText = name + " $" + REG_NAMES[executables[1]] + ", $" + REG_NAMES[executables[2]] + ", " + executables[3];
        } else if (name == "jr"){
            // Interpret as the supported jump register operation
            // jr $dest
            executables = [name, arguments[1]];
            returnText = name + " $" + REG_NAMES[executables[1]];
        } else {
            // Interpret as a standard Type R instruction
            // name $dest, $operand1, $operand2
            executables = [name, arguments[3], arguments[1], arguments[2]];
            returnText = name + " $" + REG_NAMES[executables[1]] + ", $" + REG_NAMES[executables[2]] + ", $" + REG_NAMES[executables[3]];
        }

    } else if (opcode == 2) {
        // The only supported Type J opcode is for the 'j' operation
        type = TYPE_J;
        arguments = disassembleJ(hex);
        name = operation(TYPE_J, arguments[0]);
        if (name == TYPE_UNSUPPORTED) {
            return [type, TYPE_UNSUPPORTED, null];
        }
        executables = [name, arguments[1]];
        returnText = name + " " + hexOfInt(executables[1], 8);

    } else if ([4, 5, 8, 9, 12, 13, 14].includes(opcode)) {
        type = TYPE_I;
        arguments = disassembleI(hex);
        name = operation(TYPE_I, arguments[0]);
        if (name == TYPE_UNSUPPORTED) {
            return [type, TYPE_UNSUPPORTED, null];
        }
        if (name == "beq" || name == "bne") {
            // Interpret as one of the supported branch operations
            // name $operand1, $operand2, [num instructions skipped]
            executables = [name, arguments[1], arguments[2], arguments[3]];
            returnText = name + " $" + REG_NAMES[executables[1]] + ", $" + REG_NAMES[executables[2]] + ", " + executables[3];
        } else {
            // Interpret as a standard Type I instruction
            // name $dest, $operand, immediate
            executables = [name, arguments[2], arguments[1], arguments[3]];
            returnText = name + " $" + REG_NAMES[executables[1]] + ", $" + REG_NAMES[executables[2]] + ", " + executables[3];
        }

    } else {
        return [TYPE_INVALID, TYPE_INVALID, TYPE_INVALID];
    }
    return [type, returnText, executables];
}

// Returns a list of each argument present in the given hex, assuming it is a Type R instruction
function disassembleR(hex) {
    return [
            (0xFC000000 & hex) >> 26,
            (0x03E00000 & hex) >> 21,
            (0x001F0000 & hex) >> 16,
            (0x0000F800 & hex) >> 11,
            (0x000007c0 & hex) >> 6,
            (0x0000003F & hex)
            ]
}

// Returns a list of each argument present in the given hex, assuming it is a Type I instruction
function disassembleI(hex) {
    return [
            (0xFC000000 & hex) >> 26,
            (0x03E00000 & hex) >> 21,
            (0x001F0000 & hex) >> 16,
            (0x0000FFFF & hex)
            ]
}

// Returns a list of each argument present in the given hex, assuming it is a Type J instruction
function disassembleJ(hex) {
    return [
            (0xFC000000 & hex) >> 26,
            (0x03FFFFFF & hex)
            ]
}

// Returns the operation name associated with the given type and opcode
function operation(type, opcode) {
    var returnCode;
    if (type == TYPE_R) {
        switch(opcode) {
            case(0):
                returnCode = "sll"; break;
            case(8):
                returnCode = "jr"; break;
            case(32):
                returnCode = "add"; break;
            case(33):
                returnCode = "addu"; break;
            case(34):
                returnCode = "sub"; break;
            case(35):
                returnCode = "subu"; break;
            case(36):
                returnCode = "and"; break;
            case(37):
                returnCode = "or"; break;
            case(38):
                returnCode = "xor"; break;
            case(39):
                returnCode = "nor"; break;
            default:
                returnCode = TYPE_UNSUPPORTED;
        }
    } else if (type == TYPE_J) {
        if (opcode == 2) {
            returnCode = 'j';
        } else {
            returnCode = TYPE_UNSUPPORTED;
        }
    } else { // Type == TYPE_I
        switch(opcode) {
            case(4):
                returnCode = "beq"; break;
            case(5):
                returnCode = "bne"; break;
            case(8):
                returnCode = "addi"; break;
            case(9):
                returnCode = "addiu"; break;
            case(12):
                returnCode = "andi"; break;
            case(13):
                returnCode = "ori"; break;
            case(14):
                returnCode = "xori"; break;
            default:
                returnCode = TYPE_UNSUPPORTED;
        }
    }
    return returnCode;
}

// Executes an sll instruction on the given arguments
// Returns the address of the next instruction to execute, given sll is stored at the given address
function execute_sll (args, addr) {
    // sll $dest, $op1, shift
    
    var dest = args[1];
    var op = args[2];
    var shift = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op] + "\n";
        return -1;
    }
    var ans = REGISTERS[op] << shift;
    if (SHOWREG) {
        PRINTTEXT += TAB + "sll:   $" + REG_NAMES[op] + " [" + hexOfInt(REGISTERS[op], 8) + "] << " + shift + " = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

// Executes a jr instruction on the given arguments
// Returns the address of the next instruction to execute, given jr is stored at the given address
function execute_jr (args, addr) {
    // jr $reg
    if (SHOWREG) {
        PRINTTEXT += TAB + "jr:    $" + REG_NAMES[args[1]] + "\n";
    }
    return addr + 4;
}

// Executes an add instruction on the given arguments
// Returns the address of the next instruction to execute, given add is stored at the given address
function execute_add (args, addr) {
    // add $dest, $op1, $op2
    
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    var ans = REGISTERS[op1] + REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += TAB + "add:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] + $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "] = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

// Executes an addu instruction on the given arguments
// Returns the address of the next instruction to execute, given addu is stored at the given address
function execute_addu (args, addr) {
    // addu $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    var ans = REGISTERS[op1] + REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += TAB + "addu:  $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] + $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "] = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

// Executes a sub instruction on the given arguments
// Returns the address of the next instruction to execute, given sub is stored at the given address
function execute_sub (args, addr) {
    // sub $dest, $op1, $op2
    
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    var ans = REGISTERS[op1] - REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += TAB + "sub:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] - $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "] = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

// Executes a subu instruction on the given arguments
// Returns the address of the next instruction to execute, given subu is stored at the given address
function execute_subu (args, addr) {
    // subu $dest, $op1, $op2
    
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    var ans = REGISTERS[op1] - REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += TAB + "subu:  $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] - $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "] = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

// Executes an and instruction on the given arguments
// Returns the address of the next instruction to execute, given and is stored at the given address
function execute_and (args, addr) {
    // and $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    var ans = REGISTERS[op1] & REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += TAB + "and:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] AND $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "] = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

// Executes an or instruction on the given arguments
// Returns the address of the next instruction to execute, given or is stored at the given address
function execute_or (args, addr) {
    // or $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    var ans = REGISTERS[op1] | REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += TAB + "or:    $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] OR $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "] = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

// Executes a xor instruction on the given arguments
// Returns the address of the next instruction to execute, given xor is stored at the given address
function execute_xor (args, addr) {
    // xor $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    var ans = REGISTERS[op1] ^ REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += TAB + "xor:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] XOR $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "] = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

// Executes a nor instruction on the given arguments
// Returns the address of the next instruction to execute, given nor is stored at the given address
function execute_nor (args, addr) {
    // nor $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    var ans = ~(REGISTERS[op1] | REGISTERS[op2]);
    if (SHOWREG) {
        PRINTTEXT += TAB + "nor:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] NOR $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "] = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

// Executes a beq instruction on the given arguments
// Returns the address of the next instruction to execute, given beq is stored at the given address
function execute_beq (args, addr) {
    // beq $op1, $op2, [num instructions to skip]
    
    var op1 = args[1];
    var op2 = args[2];
    var skips = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }
    
    if (REGISTERS[op1] == REGISTERS[op2]) {
        if (SHOWREG) {
            PRINTTEXT += TAB + "beq:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] == $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "]\n";
        }
        return addr + ((skips + 1) * 4);
    } else {
        if (SHOWREG) {
            PRINTTEXT += TAB + "beq:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] != $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "]\n"
        }
        return addr + 4;
    }
}

// Executes a bne instruction on the given arguments
// Returns the address of the next instruction to execute, given bne is stored at the given address
function execute_bne (args, addr) {
    // bne $op1, $op2, [num instructions to skip]
        
    var op1 = args[1];
    var op2 = args[2];
    var skips = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op1] + "\n";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op2] + "\n";
        return -1;
    }

    if (REGISTERS[op1] == REGISTERS[op2]) {
        if (SHOWREG) {
            PRINTTEXT += TAB + "bne:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] == $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "]\n";
        }
        return addr + 4;
    } else {
        if (SHOWREG) {
            PRINTTEXT += TAB + "bne:   $" + REG_NAMES[op1] + " [" + hexOfInt(REGISTERS[op1], 8) + "] != $" + REG_NAMES[op2] + " [" + hexOfInt(REGISTERS[op2], 8) + "]\n"
        }
        return addr + ((skips + 1) * 4);
    }
}

// Executes an addi instruction on the given arguments
// Returns the address of the next instruction to execute, given addi is stored at the given address
function execute_addi (args, addr) {
    // addi $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op] + "\n";
        return -1;
    }
    if (imm > MAX_16) {
        // F-extend the number, so that it is correctly interpreted as a negative value
        imm = (0xFFFF0000 | imm);
    }
    var ans = REGISTERS[op] + imm;
    if (SHOWREG) {
        PRINTTEXT += TAB + "addi:  $" + REG_NAMES[op] + " [" + hexOfInt(REGISTERS[op], 8) + "] + " + imm + " = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4;

}

// Executes an addiu instruction on the given arguments
// Returns the address of the next instruction to execute, given addiu is stored at the given address
function execute_addiu (args, addr) {
    // addiu $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op] + "\n";
        return -1;
    }
    var ans = REGISTERS[op] + imm;
    if (SHOWREG) {
        PRINTTEXT += TAB + "addiu: $" + REG_NAMES[op] + " [" + hexOfInt(REGISTERS[op], 8) + "] + " + imm + " = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

// Executes an andi instruction on the given arguments
// Returns the address of the next instruction to execute, given andi is stored at the given address
function execute_andi (args, addr) {
    // andi $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op] + "\n";
        return -1;
    }
    if (imm > MAX_16) {
        // F-extend the number, so that it is correctly interpreted as a negative value
        imm = (0xFFFF0000 | imm);
    }
    var ans = REGISTERS[op] & imm;
    if (SHOWREG) {
        PRINTTEXT += TAB + "andi:  $" + REG_NAMES[op] + " [" + hexOfInt(REGISTERS[op], 8) + "] AND " + imm + " = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

// Executes an ori instruction on the given arguments
// Returns the address of the next instruction to execute, given ori is stored at the given address
function execute_ori (args, addr) {
    // ori $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op] + "\n";
        return -1;
    }
    if (imm > MAX_16) {
        // F-extend the number, so that it is correctly interpreted as a negative value
        imm = (0xFFFF0000 | imm);
    }
    var ans = REGISTERS[op] | imm;
    if (SHOWREG) {
        PRINTTEXT += TAB + "ori:   $" + REG_NAMES[op] + " [" + hexOfInt(REGISTERS[op], 8) + "] OR " + imm + " = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

// Executes a xori instruction on the given arguments
// Returns the address of the next instruction to execute, given xori is stored at the given address
function execute_xori (args, addr) {
    // xori $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += TXT_NOREAD + ": $" + REG_NAMES[op] + "\n";
        return -1;
    }
    if (imm > MAX_16) {
        // F-extend the number, so that it is correctly interpreted as a negative value
        imm = (0xFFFF0000 | imm);
    }
    var ans = REGISTERS[op] ^ imm;
    if (SHOWREG) {
        PRINTTEXT += TAB + "xori:  $" + REG_NAMES[op] + " [" + hexOfInt(REGISTERS[op], 8) + "] XOR " + imm + " = " + hexOfInt(ans, 8) + "\n";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

// Executes a j instruction on the given arguments
// Returns the address of the next instruction to execute
function execute_j (args) {
    // j targetAddr
    if (SHOWREG) {
        PRINTTEXT += TAB + "j:     " + hexOfInt(args[1], 8) + "\n";
    }
    return args[1];
}

// Executes a syscall instruction on $a0 and $v0
// Returns nothing
function execute_syscall (addr) {
    // syscall

    var a = REG_NAMES.indexOf("a0");
    var v = REG_NAMES.indexOf("v0");
    if (REGISTERS[a] === null || isNaN(REGISTERS[a])) {
        PRINTTEXT += TXT_NOREAD + ": $a0 \n";
        return -1;
    }
    if (REGISTERS[v] === null || isNaN(REGISTERS[v])) {
        PRINTTEXT += TXT_NOREAD + ": $v0 \n";
        return -1;
    }
    if (REGISTERS[v] == 1) {
        // Print an integer
        if (SHOWREG) {
            PRINTTEXT += TAB + TXT_INT + ": $a0\n";
        }
        PRINTTEXT += REGISTERS[a] + "\n";
    } else if (REGISTERS[v] == 4) {
        // Print a string
        if (SHOWREG) {
            PRINTTEXT += TAB + TXT_TXT + ": $a0\n";
        }
        PRINTTEXT += interpretString(REGISTERS[a]) + "\n";
    } else {
        PRINTTEXT += TXT_NOSUPPORT + ": $v0\n";
    }
    REGISTERS[a] = null;
    REGISTERS[v] = null;
}

// Interprets and returns the string stored in the given and subsequent addresses
function interpretString(addr) {
    var returnText = "";
    var nextData = DATA[(addr - DATA_START) / 4];
    var lineHex = nextData[1];
    var chars = disect(lineHex);
    var i = 0;
    while (chars[i] != 0) {
        returnText += String.fromCharCode(chars[i]);
        i++;
        if (i >= 4) {
            i = 0;
            addr += 4;
            nextData = DATA[((addr) - DATA_START) / 4];
            lineHex = nextData[1];
            chars = disect(lineHex);
        }
        
    }
    return returnText;
}

// Splits the given 4 byte hex into 4 digits, each representing an ascii character
function disect(hex) {
    return [
            (0xFF000000 & hex) >> 24,
            (0x00FF0000 & hex) >> 16,
            (0x0000FF00 & hex) >> 8,
            (0x000000FF & hex)
            ]
}
