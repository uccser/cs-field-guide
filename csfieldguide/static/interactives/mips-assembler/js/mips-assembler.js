/* Incomplete MIPS I Assembler based on the work of Alan Hogan
 * https://github.com/alanhogan/online-mips-assembler
 * Licensed under CC BY-NC-SA 4.0
 */

// Types of instructions
const TYPE_UNSUPPORTED = -2;
const TYPE_INVALID = -1;
const TYPE_UNASSIGNED = 0;
const TYPE_R = 1;
const TYPE_I = 2;
const TYPE_J = 3;

// other constants
const INSTRUCTION_START = 0x00400000;
const DATA_START = 0x00c00000;

const TXTINPUT = gettext('input');

// Required global variables
var funcName = [];
var funcAddr = [];

// Stores a backup of the default code and registers button handler functions
$(document).ready(function() {
    var basicProgram = $('#mips-input').val();
    var advancedProgram = $('#assembler-output').val();
    $('#assembler-output').val('');

    $('#submit-mips').on('click', function () {
        assemble();
    });

    $('#reset-basic').on('click', function () {
        $('#mips-input').val(basicProgram);
        $('#assembler-output').val('');
    });

    $('#reset-adv').on('click', function () {
        $('#mips-input').val(advancedProgram);
        $('#assembler-output').val('');
    });
});

// Sets all checkbuttons to be unchecked and inactive
// No longer used
function resetButtons() {
    $('#show-blank').prop('checked', false);
    $('#show-instructions').prop('checked', false);
    $('#show-blank-label').removeClass('active');
    $('#show-instructions-label').removeClass('active');
}

// Assembles the code from the mips input box and prints it to the assembler output box
function assemble() {
    funcName = [];
    funcAddr = [];
    var targetIndex;

    var showBlank = $('#show-blank').is(':checked');
    var showInstr = $('#show-instructions').is(':checked');

    var printText = "";
    var nextInstr = "";
    var line;
    var input = 0;
    var mipsText = $("#mips-input").val();
    var instrHex;
    var instrType;
    var instrArgs = [];
    var instructions = [];
    var storedText = [];
    var storedTextNames = [];
    var storedTextAddr = [DATA_START];
    var subtext = [];

    var instructionAddr = INSTRUCTION_START;
    var dataAddr = DATA_START;
    
    var mipsCode = mipsText.split(/\r|\n/);

    // Parse the code
    for (x=0; x < mipsCode.length; x++) {
        line = mipsCode[x].trim();
        if (line.startsWith(".")) {
            // Ignore the line
            if (showInstr) {
                nextInstr = "; <" + TXTINPUT + ":" + input + "> " + line + "\n";
            } else {
                nextInstr = line + "\n"
            }
            if (showBlank) {
                instructions.push([TYPE_UNASSIGNED, nextInstr]);
            }
        } else if (line.startsWith("#") || line == "") {
            // Interpret as a comment or blank line
            if (showBlank) {
                if (showInstr) {
                    nextInstr = "; <" + TXTINPUT + ":" + input + "> " + line + "\n";
                } else {
                    nextInstr = line + "\n";
                }
            }
            instructions.push([TYPE_UNASSIGNED, nextInstr, input, instructionAddr, line]);
        } else if (line.includes(" .asciiz ")) {
            // Interpret as a string to be stored
            var substr = line.match(/.asciiz "(.*)"/);
            storedText.push(splitEvery(4, substr[1]));
            storedTextNames.push(line.substr(0, line.indexOf(":")));
            storedTextAddr.push(last(storedTextAddr) + last(storedText).length * 4);
            if (showBlank) {
                if (showInstr) {
                    nextInstr = "; <" + TXTINPUT + ":" + input + "> " + line + "\n";
                } else {
                    nextInstr = line + "\n";
                }
            }
            instructions.push([TYPE_UNASSIGNED, nextInstr]);
        } else if (last(line.split("")) == ":") {
            // Interpret as a pointer name; e.g. function name or loop point
            var name = line.substr(0, line.length - 1);
            funcName.push(name);
            funcAddr.push(instructionAddr);
            if (showInstr) {
                nextInstr = hexOfInt(instructionAddr, 8) + ": <" + name + "> ; <" + TXTINPUT + ":" + input + "> " + name + ":\n";
            } else if (showBlank) {
                nextInstr = "<" + name + ">\n";
            }
            instructions.push([TYPE_UNASSIGNED, nextInstr, input, instructionAddr, line]);
        } else if (line == "syscall") {
            // Interpret as a syscall
            if (showInstr) {
                nextInstr = hexOfInt(instructionAddr, 8) + ": 0000000c ; <" + TXTINPUT + ":" + input + "> syscall\n";
            } else {
                nextInstr = "0000000c\n";
            }
            instructions.push([TYPE_UNASSIGNED, nextInstr, input, instructionAddr, line]);
            instructionAddr += 4;
        } else {
            // Interpret as a basic instruction
            words = line.split(" ");
            
            if (words[0] == "li" && words.length == 3) {
                // li shouldn't be supported but is with template (li $xy, z == addiu $xy, $0, z)
                words[0] = "addiu";
                words.push(words[2]);
                words[2] = "$0,";
            }

            if (words[0] == "la" && words.length == 3) {
                // la shouldn't be supported but is when split into three instructions
                // la $xy, datavarname ==   addiu $xy, $zero, [high 16 bits of dataaddr]
                //                          sll $xy, $xy, 16
                //                          addiu $xy, $xy, [low 16 bits of dataaddr]

                targetIndex = storedTextNames.indexOf(words[2]);
                var tempTextAddr = storedTextAddr[targetIndex];

                var hi = (0xFFFF0000 & tempTextAddr) >> 16;
                var lo = 0x0000FFFF & tempTextAddr;

                instrArgs = buildInstructionI(["addiu", words[1], "$zero,", hi]);
                instrArgs.push(input);
                instrArgs.push(instructionAddr);
                instrArgs.push(line);
                instructions.push(instrArgs);

                input++;
                instructionAddr += 4;

                instrArgs = buildInstructionR(["sll", words[1], words[1], 16]);
                instrArgs.push(input);
                instrArgs.push(instructionAddr);
                instrArgs.push(line);
                instructions.push(instrArgs);

                input++;
                instructionAddr += 4;

                words[0] = "addiu";
                words[2] = words[1];
                words.push(lo);
            }

            if (words[0] == "move" && words.length == 3) {
                // move shouldn't be supported but is with template (move $ab, $cd == add $ab, $0, $cd)
                words[0] = "add";
                words.push(words[2]);
                words[2] = "$0,";
            }

            instrType = instructionType(words[0]);
            switch(instrType) {
                case TYPE_R:
                    instrArgs = buildInstructionR(words);
                    break;
                case TYPE_I:
                    instrArgs = buildInstructionI(words);
                    break;
                case TYPE_J:
                    instrArgs = buildInstructionJ(words);
                    break;
                case TYPE_INVALID:
                default:
                    instrArgs = [TYPE_INVALID, null];
            }

            instrArgs.push(input);
            instrArgs.push(instructionAddr);
            instrArgs.push(line);
            instructions.push(instrArgs);

            if (instrArgs[0] in [TYPE_R, TYPE_I, TYPE_J]) {
                instructionAddr += 4;
            }
        }
        input++;
        nextInstr = "";
    }

    // Assemble the instructions
    for (z=0; z < instructions.length; z++) {
        instrArgs = instructions[z];
        var input = nthLast(instrArgs, 3);
        var addr = nthLast(instrArgs, 2);
        var orig = last(instrArgs);
        switch(instrArgs[0]) {
            case (TYPE_UNASSIGNED):
                printText += instrArgs[1];
                break;
            case (TYPE_R):
                instrHex = hexR(instrArgs[1], instrArgs[2], instrArgs[3], instrArgs[4], instrArgs[5], instrArgs[6]);
                if (showInstr) {
                    printText += hexOfInt(addr, 8) + ": " + hexOfInt(instrHex, 8) + " ; <" + TXTINPUT + ":" + input + "> " + orig + "\n";
                } else {
                    printText += hexOfInt(instrHex, 8) + "\n";
                }
                break;
            case (TYPE_I):
                if (typeof(instrArgs[4]) == "string") {
                    // Argument is a label that needs addressing
                    // change to the number of instructions between this and the label
                    targetIndex = funcName.indexOf(instrArgs[4]);
                    instrArgs[4] = (funcAddr[targetIndex] - addr) / 4;
                }
                instrHex = hexI(instrArgs[1], instrArgs[2], instrArgs[3], instrArgs[4]);
                if (showInstr) {
                    printText += hexOfInt(addr, 8) + ": " + hexOfInt(instrHex, 8) + " ; <" + TXTINPUT + ":" + input + "> " + orig + "\n";
                } else {
                    printText += hexOfInt(instrHex, 8) + "\n";
                }
                break;
            case (TYPE_J):
                instrHex = hexJ(instrArgs[1], instrArgs[2]);
                if (showInstr) {
                    printText += hexOfInt(addr, 8) + ": " + hexOfInt(instrHex, 8) + " ; <" + TXTINPUT + ":" + input + "> " + orig + "\n";
                } else {
                    printText += hexOfInt(instrHex, 8) + "\n";
                }
                break;
            case (TYPE_UNSUPPORTED):
                printText += "; " + gettext("UNSUPPORTED OPERATION") + ": " + instrArgs[1] + " ; <" + TXTINPUT + ":" + input + "> " + orig + "\n";
                break;
            case (TYPE_INVALID):
            default:
                printText += "; " + gettext("UNRECOGNISED INSTRUCTION") + " ; <" + TXTINPUT + ":" + input + "> " + orig + "\n";
                break;
        }
    }

    // Assemble the data stored in memory
    if (storedText.length > 0) {
        if (showInstr || showBlank) {
            printText += ";\n; "+ gettext("DATA IN MEMORY") + "\n";
        }
        for (i=0; i < storedText.length; i++) {
            if (showInstr || showBlank) {
                printText += "; " + storedTextNames[i] + "\n";
            }
            subtext = storedText[i];
            for (j=0; j < subtext[0].length; j++) {
                hexString = subtext[1][j];
                if (showInstr) {
                    nextInstr = hexOfInt(dataAddr, 8) + ": " + hexString + " ; " + subtext[0][j] + "\n";
                } else {
                    nextInstr = hexString + "\n";
                }
                dataAddr += 4;
                printText += nextInstr;
                nextinstr = "";
            }
        }
    }

    $('#assembler-output').val(printText);
}

// Returns the last element of the given array
// This equates to the python expression array[-1]
function last(array) {
    return array[array.length - 1];
}

// Returns the nth to last element of the given array
// This equates to the python expression array[-n]
function nthLast(array, n) {
    return array[array.length - n];
}

// Returns a list of two lists
// 1) a list of strings: the given text split every num characters
// 2) a list of strings: the previous list but each item is the hexadecimal value of each character in the string appended together
// \n is read as a single character even when input as two charaters
function splitEvery(num, text) {
    var returnLines = [];
    var returnHexes = [];
    var subtext = "";
    var subhex = "";
    var chars = text.split("");
    var numchars = 0;
    var nextHex;
    for (i=0; i < chars.length; i++) {
        if (chars[i] == "\\" && chars[i+1] == "n") {
            subtext += chars[i] + chars[i+1];
            subhex += "0a";
            i++;
        } else {
            subtext += chars[i];
            nextHex = chars[i].charCodeAt(0).toString(16);
            subhex += ("0".repeat(2 - nextHex.length) + nextHex);
        }
        numchars++;
        if (numchars >= num) {
            returnLines.push(subtext);
            returnHexes.push(subhex);
            subtext = "";
            subhex = "";
            numchars = 0;
        }
    }
    // Push the final line of split text, or "" if it was exactly num characters
    returnLines.push(subtext);
    returnHexes.push(subhex + "0".repeat(8 - subhex.length));
    return [returnLines, returnHexes];
}

// Returns a Type R hex of the given instruction, given the hex code of each individual part
function hexR(opcode, rs, rt, rd, shamt, func) {
    return (opcode << 26 | rs << 21 | rt << 16 | rd << 11 | shamt << 6 | func);
}

// Returns a Type I hex of the given instruction, given the hex code of each individual part
function hexI(opcode, rs, rd, imm) {
    return (opcode << 26 | rs << 21 | rd << 16 | (0xFFFF & imm));
}

// Returns a Type J hex of the given instruction, given the hex code of each individual part
function hexJ(opcode, addr) {
    return (opcode << 26 | addr);
}

// Returns the string of an integer as a zero-extended n-character hex value
// If the hex is less than n bytes, zeros will be appended to the front
// If the hex is greater than n bytes, a larger than n-character string will be returned
// E.g: hexOfInt(20, 4) = "0014", hexOfint(20, 1) = "14"
function hexOfInt(num, n) {
    var returnString = num.toString(16);
    return "0".repeat(n - returnString.length) + returnString;
}

// Returns the base 10 encoding of the given Type R operation code
function encodingR(opcode) {
    var returnVal;
    switch(opcode) {
        case("sll"):
            returnVal = 0; break;
        case("jr"):
            returnVal = 8; break;
        case("add"):
            returnVal = 32; break;
        case("addu"):
            returnVal = 33; break;
        case("sub"):
            returnVal = 34; break;
        case("subu"):
            returnVal = 35; break;
        case("and"):
            returnVal = 36; break;
        case("or"):
            returnVal = 37; break;
        case("xor"):
            returnVal = 38; break;
        case("nor"):
            returnVal = 39; break;
        default:
            returnVal = TYPE_UNSUPPORTED;
    }
    return returnVal;
}

// Returns the base 10 encoding of the given Type I operation code
function encodingI(opcode) {
    var returnVal;
    switch(opcode) {
        case("beq"):
            returnVal = 4; break;
        case("bne"):
            returnVal = 5; break;
        case("addi"):
            returnVal = 8; break;
        case("addiu"):
            returnVal = 9; break;
        case("andi"):
            returnVal = 12; break;
        case("ori"):
            returnVal = 13; break;
        case("xori"):
            returnVal = 14; break;
        default:
            returnVal = TYPE_UNSUPPORTED;
    }
    return returnVal;
}

// Returns the base 10 encoding of the given Type J operation code
function encodingJ(opcode) {
    var returnVal;
    switch(opcode) {
        case("j"):
            returnVal = 2; break;
        case("jal"):
        default:
            returnVal = TYPE_UNSUPPORTED;
    }
    return returnVal;
}

// Returns the integer encoding of the given register
function register(reg) {
    var returnVal;
    switch(reg) {
        case "zero":
        case "0":
            returnVal = 0; break;
        case "at":
            returnVal = 1; break;
        case "gp":
            returnVal = 28; break;
        case "sp":
            returnVal = 29; break;
        case "fp":
            returnVal = 30; break;
        case "ra":
            returnVal = 31; break;
        default:
            var regArr = reg.split("");
            var regChar = regArr[0];
            var regNum;
            if (regArr.length > 2) {
                return -1; // No support for registers > 9
            } else {
                regNum = parseInt(regArr[1]);
            }
            switch(regChar) {
                case("v"):
                    returnVal = regNum + 2; break;
                case("a"):
                    returnVal = regNum + 4; break;
                case("t"):
                    if (regNum < 8) {
                        returnVal = regNum + 8;
                    } break;
                case("s"):
                    returnVal = regNum + 16; break;
                case("k"):
                    returnVal = regNum + 26; break;
                case("t"):
                    returnVal = regNum + 16; break;
                default:
                    returnVal = -1;
            }
    }
    return returnVal;
}

// Returns a list of:
// 1) a TYPE_ code, depending on the success of the operation, TYPE_R if valid
// 2-7) each argument in order for a valid Type-R instruction, or the operation name if invalid
// Input is a list of strings, each being a section of instruction to be interpreted
function buildInstructionR(args) {
    var returnList;
    var opcode = args[0];
    var dest;
    var operands = [0, 0];
    var opEncoding = encodingR(opcode);

    if (opEncoding == TYPE_UNSUPPORTED) {
        return [TYPE_UNSUPPORTED, args[0]];
    }

    // Get the destination register
    if (args.length >= 2 && args[1].startsWith("$")) {
        if (last(args[1].split("")) == ",") {
            dest = register(args[1].substr(1, args[1].length - 2));
        } else {
            dest = register(args[1].substr(1));
        }
    } else {
        return [TYPE_INVALID, args[0]];
    }

    if (dest < 0) {
        return [TYPE_INVALID, args[0]];
    }

    // Get the operand arguments and build the hex
    if (opcode == "jr") {
        // The Jump Register instruction is special in that its arguments are zero
        // opcode, destreg
        if (args.length != 2) {
            return [TYPE_INVALID, args[0]];
        }
        returnList = [TYPE_R, 0, dest, 0, 0, 0, opEncoding];
    } else if (opcode == "sll") {
        // The only supported Shift instruction is required for the la pseudo instruction
        // and requires 4 slightly different instructions
        // opcode, destreg, operand1, shift
        if (args.length != 4) {
            return [TYPE_INVALID, args[0]];
        }
        if (args[2].startsWith("$") && last(args[2].split("")) == ",") {
            operands[0] = register(args[2].substr(1, args[2].length - 2));
        } else {
            return [TYPE_INVALID, args[0]];
        }
        var shift = parseInt(args[3]);
        if (shift > 0) {
            returnList = [TYPE_R, 0, 0, operands[0], dest, shift, opEncoding];
        } else {
            return [TYPE_INVALID, args[0]];
        }
    } else {
        // Remaining supported instructions have exactly 4 arguments
        // opcode, destreg, operand1, operand2
        if (args.length != 4) {
            return [TYPE_INVALID, args[0]];
        }

        if (args[2].startsWith("$") && last(args[2].split("")) == ",") {
            operands[0] = register(args[2].substr(1, args[2].length - 2));
        } else {
            return f[TYPE_INVALID, args[0]];
        }
        if (args[3].startsWith("$")) {
            operands[1] = register(args[3].substr(1));
        } else {
            return [TYPE_INVALID, args[0]];
        }
        if (operands[0] < 0 || operands[1] < 0) {
            return [TYPE_INVALID, args[0] ];
        }
        returnList = [TYPE_R, 0, operands[0], operands[1], dest, 0, opEncoding];
    }
    return returnList;
}

// Returns a list of:
// 1) a TYPE_ code, depending on the success of the operation, TYPE_I if valid
// 2-5) each argument in order for a valid Type-I instruction, or the operation name if invalid
// Input is a list of strings, each being a section of instruction to be interpreted
function buildInstructionI(args) {
    var returnList;
    var opcode = args[0];
    var dest;
    var operands = [0, 0];
    var opEncoding = encodingI(opcode);

    if (opEncoding == TYPE_UNSUPPORTED) {
        return [TYPE_UNSUPPORTED, args[0]];
    }

    // Instructions have exactly 4 arguments
    // Get the destination argument
    if (args.length == 4 && args[1].startsWith("$")) {
        if (last(args[1].split("")) == ",") {
            dest = register(args[1].substr(1, args[1].length - 2));
        } else {
            dest = register(args[1].substr(1));
        }
    } else {
        return [TYPE_INVALID, args[0]];
    }
    if (dest < 0) {
        return [TYPE_INVALID, args[0]];
    }

    // Get the operand arguments and build the hex
    if (opcode == "beq" || opcode == "bne") {
        // The supported branch instructions work slightly differently
        // opcode, operand1, operand2, destaddr
        // As such the current value of dest is actually an operand
        operands[0] = dest;
        if (args[2].startsWith("$") && last(args[2].split("")) == ",") {
            operands[1] = register(args[2].substr(1, args[2].length - 2));
        } else {
            return [TYPE_INVALID, args[0]];
        }
        if (operands[1] < 0) {
            return [TYPE_INVALID, args[0]];
        }

        // beq and bne both reference destinations that haven't yet been parsed
        // so return the name of the expected target and deal with it later
        returnList = [TYPE_I, opEncoding, operands[0], operands[1], args[3]];
    } else {
        // Remaining instructions follow the template:
        // opcode, destreg, operand1, immediate
        if (args[2].startsWith("$") && last(args[2].split("")) == ",") {
            operands[0] = register(args[2].substr(1, args[2].length - 2));
        } else {
            return [TYPE_INVALID, args[0]];
        }

        operands[1] = parseInt(args[3]);
        if (operands[0] < 0 || isNaN(operands[1])) {
            return [TYPE_INVALID, args[0]];
        }

        returnList = [TYPE_I, opEncoding, operands[0], dest, operands[1]];
    }
    return returnList;
}

// Returns a list of:
// 1) a TYPE_ code, depending on the success of the operation, TYPE_J if valid
// 2-3) each argument in order for a valid Type-J instruction, or the operation name if invalid
// Input is a list of strings, each being a section of instruction to be interpreted
function buildInstructionJ(args) {
    var returnList;
    var opcode = args[0];
    var dest;
    var targetIndex;
    var opEncoding = encodingJ(opcode);

    if (opEncoding == TYPE_UNSUPPORTED) {
        return [TYPE_UNSUPPORTED, args[0]];
    }

    // Supported instructions have only 2 arguments
    // opcode, destaddr
    if (args.length != 2) {
        return [TYPE_INVALID, args[0]];
    }
    targetIndex = funcName.indexOf(args[1])
    if (targetIndex < 0) {
        return [TYPE_INVALID, args[0]];
    }
    dest = funcAddr[targetIndex];
    returnList = [TYPE_J, opEncoding, dest];
    return returnList;
}

// Returns the type of instruction based on the given opcode
// Most MIPS I instructions are recognised but only a few are supported
function instructionType(opcode) {
    switch(opcode) {
        // Type R Shifts
        case "sll":
        case "srl":
        case "sra":
        case "sllv":
        case "srlv":
        case "srav":
        // Type R Multiplication & Division
        case "mfhi":
        case "mthi":
        case "mflo":
        case "mtlo":
        case "mult":
        case "multu":
        case "div":
        case "divu":
        // Type R Jumps
        case "jr":
        case "jalr":
        // Type R ALU Instructions
        case "add":
        case "addu":
        case "sub":
        case "subu":
        case "and":
        case "or":
        case "xor":
        case "nor":
        case "slt":
        case "sltu":
            return TYPE_R; break;
        // Type I Loads & Stores
        case "lb":
        case "lh":
        case "lwl":
        case "lw":
        case "lbu":
        case "lhu":
        case "lwr":
        case "sb":
        case "sh":
        case "swl":
        case "sw":
        case "swr":
        // Type I ALU Instructions
        case "addi":
        case "addiu":
        case "slti":
        case "sltiu":
        case "andi":
        case "ori":
        case "xori":
        case "lui":
        // Type I Branches
        case "bltz":
        case "bgez":
        case "bltzal":
        case "bgezal":
        case "beq":
        case "bne":
        case "blez":
        case "bgtz":
            return TYPE_I; break;
        // Type J Jumps
        case "j":
        case "jal":
            return TYPE_J; break;
        // Other
        case "break":
        default:
            return TYPE_INVALID;
    }
}
