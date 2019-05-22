/* Partial MIPS I Simulator based on the work of Alan Hogan
 * https://github.com/alanhogan/miphps-mips-simulator
 * Licensed under CC BY-NC-SA 4.0
 */

var urlParameters = require('../../../js/third-party/url-parameters.js');

// Types of instructions
const TYPE_UNSUPPORTED = -2;
const TYPE_INVALID = -1;
const TYPE_R = 1;
const TYPE_I = 2;
const TYPE_J = 3;
const TYPE_SYSCALL = 4;

// Other constants
const INSTRUCTION_START = 0x00400000;
const DATA_START = 0x00c00000;
const MAX_EXECUTIONS = 1000;
const MAX_16 = 32767; // Max value of a signed 16 bit integer, for signed ALU ops
const COLOUR_ADDR = "#9FBF8A";
const COLOUR_INSTR = "#ECCC87";
const COLOUR_INPUT = "#8BA1B4";
const COLOUR_BAD = "#C15D5A";
const COLOUR_ANS = "#CE9178";
const COLOUR_OUT = "#FFF";
const COLOUR_REG = "#B58DAE";

// All registers are named as per convention
var REGISTERS;
const REG_NAMES = ["zero","at","v0","v1","a0","a1","a2","a3","t0","t1","t2","t3","t4","t5","t6","t7","s0","s1","s2","s3","s4","s5","s6","s7","t8","t9","k0","k1","gp","sp","fp","ra"];
var DATA;

// Text constants
const TXT_INVALID = gettext("INVALID HEX VALUE");
const TXT_END = "* " + gettext("Program execution complete") + " *";
const TXT_BADEND = "* " + gettext("Program execution halted early") + " *";
const TXT_INPUT = gettext("input");
const TXT_NOEND = gettext("Parsing completed without finding the quit instruction");
const TXT_INFINITE = gettext("Program executed 1000 instructions, it probably entered an infinite loop!");
const TXT_INSTRUCTION = gettext("instruction");
const TXT_NOREAD = gettext("Cannot read from empty register");
const TXT_NOSUPPORT = gettext("Unsupported value in register");
const TXT_UNSUPPORTED_HEX = gettext("Unsupported instruction in hex");
const TXT_INVALID_HEX = gettext("Invalid instruction hex");
const TXT_INT = gettext("Print an integer");
const TXT_TXT = gettext("Print a string");
const TXT_LOAD = gettext("Loading");
const TXT_STORE = gettext("stored in");
const TXT_POINTS = gettext("points to");
const TXT_JUMP = gettext("Jump to");
const TXT_NOTHING = gettext("nothing");
const TXT_BRANCH = gettext("Branching");
const TXT_NO_BRANCH = gettext("Not Branching");
const TXT_PANIC = gettext("You've triggered the failsafe error control in this interactive, which means the programmer who made it didn't prepare for the specific error in your program. Sorry about that. Double check everything and try again.");

// Other globals
var PRINTTEXT;
var SHOWCONTEXT;
var SHOWREG;
var SHOWCOLOUR;

/**
 * Stores a backup of the default code and registers button handler functions
 */
$(document).ready(function() {
    var basicProgram = $('#basic-example').html();
    var advancedProgram = $('#advanced-example').html();
    $('#assembled-input').val('');
    $('#program-output').html('');
    var offerExamples = urlParameters.getUrlParameter('offer-examples');
    
    $('#run-mips').on('click', function () {
        try {
            run();
        } catch(err) {
            present(colour(TXT_PANIC, COLOUR_BAD) + "<br><br>" + PRINTTEXT, false);
        }
    });

    $('#reset-basic').on('click', function () {
        $('#assembled-input').val(basicProgram);
        $('#program-output').html('');
    });

    $('#reset-adv').on('click', function () {
        $('#assembled-input').val(advancedProgram);
        $('#program-output').html('');
    });

    if (offerExamples) {
        $('#assembled-input').val(basicProgram);
        $('#reset-basic').removeClass('d-none');
        $('#reset-adv').removeClass('d-none');
    }
});

/**
 * Interprets and runs each line of assembled MIPS code
 */
function run() {
    SHOWCONTEXT = $('#show-context').is(':checked');
    SHOWREG = $('#show-registers').is(':checked');
    SHOWCOLOUR = $('#show-colours').is(':checked');
    PRINTTEXT = "";
    REGISTERS  = [0,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,];

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

    for (var i=0; i < lines.length; i++) {
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
                PRINTTEXT += colour("; " + TXT_INVALID + " ; |" + TXT_INPUT + ":" + input + "| " + line, COLOUR_BAD) + "<br>";
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
        PRINTTEXT += "<br>" + colour(TXT_NOEND + ": " + "jr $ra", COLOUR_BAD) + "<br>";
        present(PRINTTEXT, false);
        return;
    }

    // Run the code
    var quit = false;
    var instructionSet; // Temporary storage
    var instrType;
    var instrDecoded;
    var instrExecs;
    var instrAddr = INSTRUCTION_START;
    var instructionNum = 0;
    var isSuccess = true;
    while (!quit && instructionNum < MAX_EXECUTIONS) {
        instrIndex = (instrAddr - INSTRUCTION_START) / 4;
        instructionSet = instructions[instrIndex];
        instrHex = instructionSet[1];
        input = instructionSet[2];
        instrExecs = null;

        if (instrHex == 0x0000000c) {
            if (SHOWCONTEXT) {
                PRINTTEXT += TXT_LOAD + " " + colour(hexOfInt(instrAddr, 8), COLOUR_ADDR) + " : " + colour(hexOfInt(instrHex, 8), COLOUR_INSTR) + "; |" + colour(TXT_INSTRUCTION + ":" + instrIndex, COLOUR_INPUT) + "| " + colour("syscall", COLOUR_INSTR) + "<br>";
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
                    PRINTTEXT += TXT_LOAD + " " + colour(hexOfInt(instrAddr, 8), COLOUR_ADDR) + " : " + colour(hexOfInt(instrHex, 8), COLOUR_INSTR) + "; |" + colour(TXT_INSTRUCTION + ":" + instrIndex, COLOUR_INPUT) + "| " + colour("jr $ra", COLOUR_INSTR) + "<br>";
                }
            } else {
                if (instrDecoded == TYPE_UNSUPPORTED) {
                    PRINTTEXT += colour(TXT_UNSUPPORTED_HEX + ": " + hexOfInt(instrHex, 8), COLOUR_BAD) + "<br>";
                    present(PRINTTEXT, false);
                    return;
                } else if (instrDecoded == TYPE_INVALID) {
                    PRINTTEXT += colour(TXT_INVALID_HEX + ": " + hexOfInt(instrHex, 8), COLOUR_BAD) + "<br>";
                    present(PRINTTEXT, false);
                    return;
                }

                if (SHOWCONTEXT) {
                    PRINTTEXT += TXT_LOAD + " " + colour(hexOfInt(instrAddr, 8), COLOUR_ADDR) + " : " + colour(hexOfInt(instrHex, 8), COLOUR_INSTR) + "; |" + colour(TXT_INSTRUCTION + ":" + instrIndex, COLOUR_INPUT) + "| " + colour(instrDecoded, COLOUR_INSTR) + "<br>";
                }
            }
        }

        instrAddr = execute(instrType, instrExecs, instrAddr);
        if (instrAddr < 0) {
            isSuccess = false;
            quit = true;
        }
        instructionNum ++;
    }

    if (instructionNum >= MAX_EXECUTIONS) {
        PRINTTEXT = colour(TXT_INFINITE, COLOUR_BAD) + "<br><br>" + PRINTTEXT + "<br>" + colour(TXT_INFINITE, COLOUR_BAD) + "<br>";
        present(PRINTTEXT, false);
        return;
    }

    // Display output
    present(PRINTTEXT, isSuccess);
}

/**
 * Writes the given text to the Program Output textarea,
 * along with a message depending on the value of isSuccess
 */
function present(text, isSuccess) {
    if (isSuccess) {
        text += "<br>" + TXT_END;
    } else {
        text += "<br>" + colour(TXT_BADEND, COLOUR_BAD);
    }
    $("#program-output").html(text);
}

/**
 * Returns the given string wrapped appropriately to display in the given colour
 * If the global SHOWCOLOUR is false, returns the given string uncoloured
 */
function colour(text, colour) {
    if (SHOWCOLOUR) {
        return '<span style="color:' + colour + '">' + text + '</span>';
    } else {
        return text;
    }
}

/**
 * Returns the string of an integer as a zero-extended n-character hex value
 * If the hex is less than n/2 bytes, zeros will be appended to the front
 * If the hex is greater than n/2 bytes, a larger than n-character string will be returned
 * E.g: hexOfInt(20, 4) = "0014", hexOfint(20, 1) = "14"
 */
function hexOfInt(num, n) {
    var returnString = num.toString(16);
    if (returnString.length < n) {
        return "0".repeat(n - returnString.length) + returnString;
    } else {
        return returnString;
    }
}

/**
 * Executes the given instruction, or does nothing if it can't be interpreted
 * Returns the address of the next instruction to execute, or -1 if an error occurs
 */
function execute(type, args, addr) {
    var nextAddr;
    var opcode;
    if (type == TYPE_SYSCALL) {
        if (execute_syscall() < 0) {
            return -1;
        }
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

/**
 * Returns a list of 3 values interpreted from the input instruction hex, or a list of 3 TYPE_INVALIDs if it is invalid
 * 1) The Type of instruction
 * 2) The instruction in its dissassembled state, or TYPE_UNSUPPORTED if it is unsupported
 * 3) The instruction arguments in the format used to execute them
 */
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

/**
 * Returns a list of each argument present in the given hex, assuming it is a Type R instruction
 */
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

/**
 * Returns a list of each argument present in the given hex, assuming it is a Type I instruction
 */
function disassembleI(hex) {
    return [
            (0xFC000000 & hex) >> 26,
            (0x03E00000 & hex) >> 21,
            (0x001F0000 & hex) >> 16,
            (0x0000FFFF & hex)
            ]
}

/**
 * Returns a list of each argument present in the given hex, assuming it is a Type J instruction
 */
function disassembleJ(hex) {
    return [
            (0xFC000000 & hex) >> 26,
            (0x03FFFFFF & hex)
            ]
}

/**
 * Returns the operation name associated with the given type and opcode
 */
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

/**
 * Executes an sll instruction on the given arguments
 * Returns the address of the next instruction to execute, given sll is stored at the given address
 */
function execute_sll (args, addr) {
    // sll $dest, $op1, shift
    
    var dest = args[1];
    var op = args[2];
    var shift = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op] << shift;
    if (SHOWREG) {
        PRINTTEXT += colour("sll", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op], 8) + "]", COLOUR_REG) + " " + colour("<< " + shift + " =", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

/**
 * Executes a jr instruction on the given arguments
 * Returns the address of the next instruction to execute, i.e. the value of the given register
 */
function execute_jr (args, addr) {
    // jr $reg
    var addr = args[1];
    if (SHOWREG) {
        if (REGISTERS[addr] === null || isNaN(REGISTERS[addr])) {
            PRINTTEXT += colour("jr", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[addr], COLOUR_INSTR) + " " + TXT_POINTS + " " + colour(TXT_NOTHING, COLOUR_ADDR) + "<br>";
            return addr + 4;
        } else {
            PRINTTEXT += colour("jr", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[addr], COLOUR_INSTR) + " " + TXT_POINTS + " " + colour(hexOfInt(REGISTERS[addr], 8), COLOUR_ADDR) + "<br>";
        }
    }
    return REGISTERS[addr];
}

/**
 * Executes an add instruction on the given arguments
 * Returns the address of the next instruction to execute, given add is stored at the given address
 */
function execute_add (args, addr) {
    // add $dest, $op1, $op2
    
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op1] + REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += colour("add", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("+ $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " " + colour("=", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

/**
 * Executes an addu instruction on the given arguments
 * Returns the address of the next instruction to execute, given addu is stored at the given address
 */
function execute_addu (args, addr) {
    // addu $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op1] + REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += colour("addu", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("+ $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " " + colour("=", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

/**
 * Executes a sub instruction on the given arguments
 * Returns the address of the next instruction to execute, given sub is stored at the given address
 */
function execute_sub (args, addr) {
    // sub $dest, $op1, $op2
    
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op1] - REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += colour("sub", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("- $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " " + colour("=", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

/**
 * Executes a subu instruction on the given arguments
 * Returns the address of the next instruction to execute, given subu is stored at the given address
 */
function execute_subu (args, addr) {
    // subu $dest, $op1, $op2
    
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op1] - REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += colour("subu", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("- $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " " + colour("=", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

/**
 * Executes an and instruction on the given arguments
 * Returns the address of the next instruction to execute, given and is stored at the given address
 */
function execute_and (args, addr) {
    // and $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op1] & REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += colour("and", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("AND $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " " + colour("=", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

/**
 * Executes an or instruction on the given arguments
 * Returns the address of the next instruction to execute, given or is stored at the given address
 */
function execute_or (args, addr) {
    // or $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op1] | REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += colour("or", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("OR $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " " + colour("=", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

/**
 * Executes a xor instruction on the given arguments
 * Returns the address of the next instruction to execute, given xor is stored at the given address
 */
function execute_xor (args, addr) {
    // xor $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op1] ^ REGISTERS[op2];
    if (SHOWREG) {
        PRINTTEXT += colour("xor", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("XOR $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " " + colour("=", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

/**
 * Executes a nor instruction on the given arguments
 * Returns the address of the next instruction to execute, given nor is stored at the given address
 */
function execute_nor (args, addr) {
    // nor $dest, $op1, $op2
        
    var dest = args[1];
    var op1 = args[2];
    var op2 = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = ~(REGISTERS[op1] | REGISTERS[op2]);
    if (SHOWREG) {
        PRINTTEXT += colour("nor", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("NOR $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " " + colour("=", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4
}

/**
 * Executes a beq instruction on the given arguments
 * Returns the address of the next instruction to execute, given beq is stored at the given address
 */
function execute_beq (args, addr) {
    // beq $op1, $op2, [num instructions to skip]
    
    var op1 = args[1];
    var op2 = args[2];
    var skips = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    
    if (REGISTERS[op1] == REGISTERS[op2]) {
        if (SHOWREG) {
            PRINTTEXT += colour("beq", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("== $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " : " + colour(TXT_BRANCH, COLOUR_ANS) + "<br>";
        }
        return addr + ((skips + 1) * 4);
    } else {
        if (SHOWREG) {
            PRINTTEXT += colour("beq", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("!= $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " : " + colour(TXT_NO_BRANCH, COLOUR_ANS) + "<br>";
        }
        return addr + 4;
    }
}

/**
 * Executes a bne instruction on the given arguments
 * Returns the address of the next instruction to execute, given bne is stored at the given address
 */
function execute_bne (args, addr) {
    // bne $op1, $op2, [num instructions to skip]
        
    var op1 = args[1];
    var op2 = args[2];
    var skips = args[3];
    if (REGISTERS[op1] === null || isNaN(REGISTERS[op1])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op1], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (REGISTERS[op2] === null || isNaN(REGISTERS[op2])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op2], COLOUR_BAD) + "<br>";
        return -1;
    }
    
    if (REGISTERS[op1] != REGISTERS[op2]) {
        if (SHOWREG) {
            PRINTTEXT += colour("bne", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("!= $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " : " + colour(TXT_BRANCH, COLOUR_ANS) + "<br>";
        }
        return addr + ((skips + 1) * 4);
    } else {
        if (SHOWREG) {
            PRINTTEXT += colour("bne", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op1], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op1], 8) + "]", COLOUR_REG) + " " + colour("== $" + REG_NAMES[op2], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op2], 8) + "]", COLOUR_REG) + " : " + colour(TXT_NO_BRANCH, COLOUR_ANS) + "<br>";
        }
        return addr + 4;
    }
}

/**
 * Executes an addi instruction on the given arguments
 * Returns the address of the next instruction to execute, given addi is stored at the given address
 */
function execute_addi (args, addr) {
    // addi $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op], COLOUR_BAD) + "<br>";
        return -1;
    }
    if (imm > MAX_16) {
        // F-extend the number, so that it is correctly interpreted as a negative value
        imm = (0xFFFF0000 | imm);
    }
    var ans = REGISTERS[op] + imm;
    if (SHOWREG) {
        PRINTTEXT += colour("addi", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op], 8) + "]", COLOUR_REG) + " " + colour("+ " + imm + " =", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

/**
 * Executes an addiu instruction on the given arguments
 * Returns the address of the next instruction to execute, given addiu is stored at the given address
 */
function execute_addiu (args, addr) {
    // addiu $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op] + imm;
    if (SHOWREG) {
        PRINTTEXT += colour("addiu", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op], 8) + "]", COLOUR_REG) + " " + colour("+ " + imm + " =", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

/**
 * Executes an andi instruction on the given arguments
 * Returns the address of the next instruction to execute, given andi is stored at the given address
 */
function execute_andi (args, addr) {
    // andi $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op] & imm;
    if (SHOWREG) {
        PRINTTEXT += colour("andi", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op], 8) + "]", COLOUR_REG) + " " + colour("AND " + imm + " =", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

/**
 * Executes an ori instruction on the given arguments
 * Returns the address of the next instruction to execute, given ori is stored at the given address
 */
function execute_ori (args, addr) {
    // ori $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op] | imm;
    if (SHOWREG) {
        PRINTTEXT += colour("ori", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op], 8) + "]", COLOUR_REG) + " " + colour("OR " + imm + " =", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

/**
 * Executes a xori instruction on the given arguments
 * Returns the address of the next instruction to execute, given xori is stored at the given address
 */
function execute_xori (args, addr) {
    // xori $dest, $operand, imm

    var dest = args[1];
    var op = args[2];
    var imm = args[3];
    if (REGISTERS[op] === null || isNaN(REGISTERS[op])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $" + REG_NAMES[op], COLOUR_BAD) + "<br>";
        return -1;
    }
    var ans = REGISTERS[op] ^ imm;
    if (SHOWREG) {
        PRINTTEXT += colour("xori", COLOUR_INSTR) + ": " + colour("$" + REG_NAMES[op], COLOUR_INSTR) + " " + colour("[" + hexOfInt(REGISTERS[op], 8) + "]", COLOUR_REG) + " " + colour("XOR " + imm + " =", COLOUR_INSTR) + " " + colour(hexOfInt(ans, 8), COLOUR_ANS) + " " + TXT_STORE + " " + colour("$" + REG_NAMES[dest], COLOUR_INSTR) + "<br>";
    }
    REGISTERS[dest] = ans;
    return addr + 4;
}

/**
 * Executes a j instruction on the given arguments
 * Returns the address of the next instruction to execute
 */
function execute_j (args) {
    // j targetAddr
    if (SHOWREG) {
        PRINTTEXT += colour("j", COLOUR_INSTR) + ": " + TXT_JUMP + " " + colour(hexOfInt(args[1], 8), COLOUR_ADDR) + "<br>";
    }
    return args[1];
}

/**
 * Executes a syscall instruction on $a0 and $v0
 * Returns 0, or -1 if there's an error
 */
function execute_syscall (addr) {
    // syscall

    var a = REG_NAMES.indexOf("a0");
    var v = REG_NAMES.indexOf("v0");
    if (REGISTERS[a] === null || isNaN(REGISTERS[a])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $a0", COLOUR_BAD) + " <br>";
        return -1;
    }
    if (REGISTERS[v] === null || isNaN(REGISTERS[v])) {
        PRINTTEXT += colour(TXT_NOREAD + ": $v0", COLOUR_BAD) + " <br>";
        return -1;
    }
    if (REGISTERS[v] == 1) {
        // Print an integer
        if (SHOWREG) {
            PRINTTEXT += colour(TXT_INT, COLOUR_INSTR) + ": " + colour("$a0", COLOUR_INSTR) + "<br>";
        }
        PRINTTEXT += colour(REGISTERS[a], COLOUR_OUT) + "<br>";
    } else if (REGISTERS[v] == 4) {
        // Print a string
        if (SHOWREG) {
            PRINTTEXT += colour(TXT_TXT, COLOUR_INSTR) + ": " + colour("$a0", COLOUR_INSTR) + " " + TXT_POINTS + " " + colour(hexOfInt(REGISTERS[a], 8), COLOUR_ADDR) + "<br>";
        }
        PRINTTEXT += colour(interpretString(REGISTERS[a]), COLOUR_OUT) + "<br>";
    } else {
        PRINTTEXT += colour(TXT_NOSUPPORT + ": $v0", COLOUR_BAD) + "<br>";
        return -1;
    }
    REGISTERS[a] = null;
    REGISTERS[v] = null;
    return 0;
}

/**
 * Interprets and returns the string stored in the given and subsequent addresses
 */
function interpretString(addr) {
    var returnText = "";
    var nextData = DATA[(addr - DATA_START) / 4];
    var lineHex = nextData[1];
    var chars = disect(lineHex);
    var i = 0;
    var char;
    while (chars[i] != 0) {
        char = String.fromCharCode(chars[i]);
        if (char == "\n") {
            // Switch to HTML <br> tag for display in Prog Output box
            returnText += "<br>"
        } else {
            returnText += char;
        }
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

/**
 * Splits the given 4 byte hex into 4 digits, each representing an ascii character
 */
function disect(hex) {
    return [
            (0xFF000000 & hex) >> 24,
            (0x00FF0000 & hex) >> 16,
            (0x0000FF00 & hex) >> 8,
            (0x000000FF & hex)
            ]
}
