/* Partial MIPS I Assembler based on the work of Alan Hogan
 * https://github.com/alanhogan/online-mips-assembler
 * Licensed under CC BY-NC-SA 4.0
 */

// Types of instructions
const TYPE_BADREGISTER = -3;
const TYPE_UNSUPPORTED = -2;
const TYPE_INVALID = -1;
const TYPE_UNASSIGNED = 0;
const TYPE_R = 1;
const TYPE_I = 2;
const TYPE_J = 3;

// other constants
const INSTRUCTION_START = 0x00400000;
const DATA_START = 0x00c00000;
const COLOUR_ADDR = "#9FBF8A";
const COLOUR_INSTR = "#ECCC87";
const COLOUR_INPUT = "#8BA1B4";
const COLOUR_BAD = "#C15D5A";
const COLOUR_STR = "#B9C2CE";
const COLOUR_LABEL = "#B58DAE";
const COLOUR_COMMENT = "#CE9178";

// Text constants
const TXT_INPUT = gettext("input");
const TXT_DATA = gettext("DATA IN MEMORY");
const TXT_UNSUPPORTED = gettext("UNSUPPORTED OPERATION");
const TXT_INVALID = gettext("INVALID REGISTER");
const TXT_UNRECOGNISED = gettext("UNRECOGNISED INSTRUCTION");
const TXT_PANIC = gettext("You've triggered the failsafe error control in this interactive, which means the programmer who made it didn't prepare for the specific error in your program. Sorry about that. Double check everything and try again.");


// Required global variables
var LABELS;
var LABELADDRS;
var SHOWCOLOUR;
var SHOWBINARY;

// Stores a backup of the default code and registers button handler functions
$(document).ready(function() {
    var basicProgram = $('#basic-example').html();
    var advancedProgram = $('#advanced-example').html();
    $('#mips-input').val(basicProgram);
    $('#assembler-output').html('');

    $('#submit-mips').on('click', function () {
        try {
            assemble();
        } catch(err) {
            present(TXT_PANIC, false);
        }
    });

    $('#reset-basic').on('click', function () {
        $('#mips-input').val(basicProgram);
        $('#assembler-output').html('');
    });

    $('#reset-adv').on('click', function () {
        $('#mips-input').val(advancedProgram);
        $('#assembler-output').html('');
    });
});

/**
 * Assembles the code from the mips input box and prints it to the assembler output box
 */
function assemble() {
    LABELS = [];
    LABELADDRS = [];
    var targetIndex;

    var showBlank = $('#show-blank').is(':checked');
    var showInstr = $('#show-instructions').is(':checked');
    SHOWCOLOUR = $('#show-colours').is(':checked');
    SHOWBINARY = $('#show-binary').is(':checked');

    var printText = "";
    var nextInstr = "";
    var line;
    var input = 0;
    var mipsText = $('#mips-input').val();
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
    for (var x=0; x < mipsCode.length; x++) {
        line = mipsCode[x].trim();
        if (line.startsWith(".")) {
            // Ignore the line
            if (showInstr) {
                nextInstr = "; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + line + "<br>";
            } else {
                nextInstr = line + "<br>"
            }
            if (showBlank) {
                instructions.push([TYPE_UNASSIGNED, nextInstr, input, instructionAddr, line]);
            }
        } else if (line.startsWith("#") || line == "") {
            // Interpret as a comment or blank line
            if (showInstr) {
                nextInstr = "; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(line, COLOUR_COMMENT) + "<br>";
            } else {
                nextInstr = colour(line, COLOUR_COMMENT) + "<br>";
            }
            if (showBlank) {
                instructions.push([TYPE_UNASSIGNED, nextInstr, input, instructionAddr, line]);
            }
            
        } else if (line.includes(" .asciiz ")) {
            // Interpret as a string to be stored
            var substr = line.match(/.asciiz "(.*)"/);
            var colonIndex =  line.indexOf(":");
            storedText.push(splitEvery(4, substr[1]));
            storedTextNames.push(line.substr(0, colonIndex));
            storedTextAddr.push(last(storedTextAddr) + last(storedText).length * 4);
            if (showInstr) {
                nextInstr = "; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(last(storedTextNames), COLOUR_LABEL) + line.substr(colonIndex) + "<br>";
            } else {
                nextInstr = colour(last(storedTextNames), COLOUR_LABEL) + line.substr(colonIndex) + "<br>";
            }
            if (showBlank) {
                instructions.push([TYPE_UNASSIGNED, nextInstr, input, instructionAddr, line]);
            }
        } else if (last(line.split("")) == ":") {
            // Interpret as a pointer name; e.g. function name or loop point
            var name = line.substr(0, line.length - 1);
            LABELS.push(name);
            LABELADDRS.push(instructionAddr);
            if (showInstr) {
                nextInstr = colour(rawVal(instructionAddr), COLOUR_ADDR) + ": " + colour(name, COLOUR_LABEL) + " ; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(name, COLOUR_LABEL) + ":<br>";
            } else {
                nextInstr = colour(name, COLOUR_LABEL) + ":<br>";
            }
            if (showBlank || showInstr) {
                instructions.push([TYPE_UNASSIGNED, nextInstr, input, instructionAddr, line]);
            }
        } else if (line == "syscall" || line == "SYSCALL") {
            // Interpret as a syscall
            if (showInstr) {
                nextInstr = colour(rawVal(instructionAddr), COLOUR_ADDR) + ": " + colour(rawVal(12), COLOUR_INSTR) + " ; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour("syscall", COLOUR_INSTR) + "<br>";
            } else {
                nextInstr = colour(rawVal(12), COLOUR_INSTR) + "<br>";
            }
            instructions.push([TYPE_UNASSIGNED, nextInstr, input, instructionAddr, line]);
            instructionAddr += 4;
        } else {
            // Interpret as a basic instruction
            keywords = line.split(" ");
            keywords[0] == keywords[0].toLowerCase();
            
            if (keywords[0] == "li" && keywords.length == 3) {
                // li is supported with template (li $xy, z == addiu $xy, $zero, z)
                keywords[0] = "addiu";
                keywords.push(keywords[2]);
                keywords[2] = "$zero,";
                line = "addiu " + keywords[1] + " " + keywords[2] + " " + keywords[3];
            }

            if (keywords[0] == "la" && keywords.length == 3) {
                // la is supported when split into three instructions
                // la $xy, datavarname == addiu $xy, $zero, [high 16 bits of dataaddr]
                //                        sll $xy, $xy, 16
                //                        addiu $xy, $xy, [low 16 bits of dataaddr]

                targetIndex = storedTextNames.indexOf(keywords[2]);
                var tempTextAddr = storedTextAddr[targetIndex];

                var hi = (0xFFFF0000 & tempTextAddr) >> 16;
                var lo = 0x0000FFFF & tempTextAddr;

                instrArgs = buildInstructionI(["addiu", keywords[1], "$zero,", hi]);
                instrArgs.push(input);
                instrArgs.push(instructionAddr);
                instrArgs.push("addiu " + keywords[1] + " $zero, " + storedTextNames[targetIndex] + "[hi]");
                instructions.push(instrArgs);

                input++;
                instructionAddr += 4;

                instrArgs = buildInstructionR(["sll", keywords[1], keywords[1], 16]);
                instrArgs.push(input);
                instrArgs.push(instructionAddr);
                instrArgs.push("sll " + keywords[1] + " " + keywords[1] + " 16");
                instructions.push(instrArgs);

                input++;
                instructionAddr += 4;

                keywords[0] = "addiu";
                keywords[2] = keywords[1];
                keywords.push(lo);
                line = "addiu " + keywords[1] + " " + keywords[2] + " " + storedTextNames[targetIndex] + "[lo]";
            }

            if (keywords[0] == "move" && keywords.length == 3) {
                // move is supported with template (move $ab, $cd == add $ab, $zero, $cd)
                keywords[0] = "add";
                keywords.push(keywords[2]);
                keywords[2] = "$zero,";
                line = "add " + keywords[1] + " " + keywords[2] + " " + keywords[3];
            }

            instrType = instructionType(keywords[0]);
            switch(instrType) {
                case TYPE_R:
                    instrArgs = buildInstructionR(keywords);
                    break;
                case TYPE_I:
                    instrArgs = buildInstructionI(keywords);
                    break;
                case TYPE_J:
                    instrArgs = buildInstructionJ(keywords);
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
    for (var z=0; z < instructions.length; z++) {
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
                    printText += colour(rawVal(addr), COLOUR_ADDR) + ": " + colour(rawVal(instrHex), COLOUR_INSTR) + " ; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(orig, COLOUR_INSTR) + "<br>";
                } else {
                    printText += colour(rawVal(instrHex), COLOUR_INSTR) + "<br>";
                }
                break;
            case (TYPE_I):
                if (typeof(instrArgs[4]) == "string") {
                    // Argument is a label that needs addressing
                    // change to the number of instructions between this and the label
                    targetIndex = LABELS.indexOf(instrArgs[4]);
                    instrArgs[4] = (LABELADDRS[targetIndex] - addr) / 4;
                }
                instrHex = hexI(instrArgs[1], instrArgs[2], instrArgs[3], instrArgs[4]);
                if (showInstr) {
                    printText += colour(rawVal(addr), COLOUR_ADDR) + ": " + colour(rawVal(instrHex), COLOUR_INSTR) + " ; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(orig, COLOUR_INSTR) + "<br>";
                } else {
                    printText += colour(rawVal(instrHex), COLOUR_INSTR) + "<br>";
                }
                break;
            case (TYPE_J):
                instrHex = hexJ(instrArgs[1], instrArgs[2]);
                if (showInstr) {
                    printText += colour(rawVal(addr), COLOUR_ADDR) + ": " + colour(rawVal(instrHex), COLOUR_INSTR) + " ; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(orig, COLOUR_INSTR) + "<br>";
                } else {
                    printText += colour(rawVal(instrHex), COLOUR_INSTR) + "<br>";
                }
                break;
            case (TYPE_UNSUPPORTED):
                printText += "; " + colour(TXT_UNSUPPORTED, COLOUR_BAD) + ": " + instrArgs[1] + " ; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(orig, COLOUR_INSTR) + "<br>";
                break;
            case (TYPE_BADREGISTER):
                printText += "; " + colour(TXT_INVALID, COLOUR_BAD) + ": " + instrArgs[1] + " ; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(orig, COLOUR_INSTR) + "<br>";
                break;
            case (TYPE_INVALID):
            default:
                printText += "; " + colour(TXT_UNRECOGNISED, COLOUR_BAD) + " ; |" + colour(TXT_INPUT + ":" + input, COLOUR_INPUT) + "| " + colour(orig, COLOUR_INSTR) + "<br>";
                break;
        }
    }

    // Assemble the data stored in memory
    if (storedText.length > 0) {
        if (showInstr || showBlank) {
            printText += ";<br>; "+ TXT_DATA + "<br>";
        }
        for (var n=0; n < storedText.length; n++) {
            if (showInstr || showBlank) {
                printText += "; " + colour(storedTextNames[n], COLOUR_LABEL) + "<br>";
            }
            subtext = storedText[n];
            for (var j=0; j < subtext[0].length; j++) {
                if (SHOWBINARY) {
                    hexString = binOfStr(subtext[0][j], 32);
                } else {
                    hexString = subtext[1][j];
                }
                if (showInstr) {
                    nextInstr = colour(rawVal(dataAddr), COLOUR_ADDR) + ": " + colour(hexString, COLOUR_STR) + " ; " + colour(subtext[0][j], COLOUR_STR) + "<br>";
                } else {
                    nextInstr = colour(hexString, COLOUR_STR) + "<br>";
                }
                dataAddr += 4;
                printText += nextInstr;
                nextinstr = "";
            }
        }
    }

    present(printText, true);
}

/**
 * Writes the given text to the Program Output textarea,
 * coloured red if not isSuccess
 */
function present(text, isSuccess) {
    if (!isSuccess) {
        text = colour(text, COLOUR_BAD);
    }
    $("#assembler-output").html(text);
}

/**
 * Returns the last element of the given array
 * This equates to the python expression array[-1]
 */
function last(array) {
    return array[array.length - 1];
}

/**
 * Returns the nth to last element of the given array
 * This equates to the python expression array[-n]
 */
function nthLast(array, n) {
    return array[array.length - n];
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
 * Returns a list of two lists
 * 1) a list of strings: the given text split every num characters
 * 2) a list of strings: the previous list but each item is the hexadecimal value of each character in the string appended together
 * \n is read as a single character even when input as two charaters
 */
function splitEvery(num, text) {
    var returnLines = [];
    var returnHexes = [];
    var subtext = "";
    var subhex = "";
    var chars = text.split("");
    var numchars = 0;
    var nextHex;
    for (var i=0; i < chars.length; i++) {
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

/**
 * Returns a Type R hex of the given instruction, given the hex code of each individual part
 */
function hexR(opcode, rs, rt, rd, shamt, func) {
    return (opcode << 26 | rs << 21 | rt << 16 | rd << 11 | shamt << 6 | func);
}

/**
 * Returns a Type I hex of the given instruction, given the hex code of each individual part
 */
function hexI(opcode, rs, rd, imm) {
    return (opcode << 26 | rs << 21 | rd << 16 | (0xFFFF & imm));
}

/**
 * Returns a Type J hex of the given instruction, given the hex code of each individual part
 */
function hexJ(opcode, addr) {
    return (opcode << 26 | addr);
}

/**
 * If the global value SHOWBINARY is false, returns a string of the given number as a 32-bit hexadecimal
 * If the number is larger than 32 bits, a larger number will be returned (see: hexOfInt)
 * 
 * If SHOWBINARY is true, returns a string of the given number as a 32-bit binary value
 * If the number is larger than 32 bits, a larger number will be returned (see: binOfInt)
 */
function rawVal(num) {
    if (SHOWBINARY) {
        return binOfInt(num, 32);
    } else {
        return hexOfInt(num, 8);
    }
}

/**
 * Returns the string of an integer as a zero-extended n-character binary value
 * If the binary is less than n bits, zeros will be appended to the front
 * If the binary is greater than n bits, a larger than n-character string will be returned
 * E.g: binOfInt(2, 4) = "0010", binOfint(2, 1) = "10"
 */
function binOfInt(num, n) {
    var returnString = num.toString(2);
    if (returnString.length < n) {
        return "0".repeat(n - returnString.length) + returnString;
    } else {
        return returnString;
    }
}

/**
 * Returns the string of another string as a zero-extended n-character binary value
 * If the binary is less than n bits, zeros will be appended to the front
 * If the binary is greater than n bits, a larger than n-character string will be returned
 * /n is interpreted as a single character
 */
function binOfStr(text, n) {
    var returnString = "";
    var chars = text.split("");
    for (var i=0; i < chars.length; i++) {
        if (chars[i] == "\\" && chars[i+1] == "n") {
            returnString += binOfInt(0x0A, 8);
            i++;
        } else {
            returnString += binOfInt(chars[i].charCodeAt(0), 8);
        }
    }
    if (returnString.length < n) {
        return "0".repeat(n - returnString.length) + returnString;
    } else {
        return returnString;
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
 * Returns the base 10 encoding of the given Type R operation code
 */
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

/**
 * Returns the base 10 encoding of the given Type I operation code
 */
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

/**
 * Returns the base 10 encoding of the given Type J operation code
 */
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

/**
 * Returns the integer encoding of the given register
 */
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
            }
            regNum = parseInt(regArr[1]);

            switch(regChar) {
                case("v"):
                    // must be v0 or v1
                    if (regNum <= 1) {
                        returnVal = regNum + 2;
                    } else {
                        returnVal = -1;
                    } break;
                case("a"):
                    // must be a0-a3
                    if (regNum <= 3) {
                        returnVal = regNum + 4;
                    } else {
                        returnVal = -1;
                    } break;
                case("t"):
                    // must be t0-t9
                    if (regNum < 8) {
                        returnVal = regNum + 8;
                    } else {
                        returnVal = regNum + 16;
                    } break;
                case("s"):
                    // must be s0-s7
                    if (regNum < 8) {
                        returnVal = regNum + 16;
                    } else {
                        returnVal = -1;
                    } break;
                case("k"):
                    // must be k0 or k1
                    if (regNum <= 1) {
                        returnVal = regNum + 26;
                    } else {
                        returnVal = -1;
                    } break;
                default:
                    returnVal = -1;
            }
    }
    return returnVal;
}

/**
 * Returns a list of:
 * 1) a TYPE_ code, depending on the success of the operation, TYPE_R if valid
 * 2-7) each argument in order for a valid Type-R instruction, or the operation name if invalid
 * Input is a list of strings, each being a keyword of the instruction to be interpreted
 */
function buildInstructionR(args) {
    var returnList;
    var opcode = args[0];
    var tempReg;
    var dest;
    var operands = [0, 0];
    var opEncoding = encodingR(opcode);

    if (opEncoding == TYPE_UNSUPPORTED) {
        return [TYPE_UNSUPPORTED, args[0]];
    }

    // Get the destination register
    if (args.length >= 2 && args[1].startsWith("$")) {
        if (last(args[1].split("")) == ",") {
            tempReg = args[1].substr(1, args[1].length - 2);
        } else {
            tempReg = args[1].substr(1);
        }
        dest = register(tempReg);
    } else {
        return [TYPE_INVALID, args[0]];
    }

    if (dest < 0) {
        return [TYPE_BADREGISTER, tempReg];
    }

    // Get the operand arguments and build the hex
    if (opcode == "jr") {
        // The Jump Register instruction is special in that its two operand arguments are zero
        // jr $destreg
        if (args.length != 2) {
            return [TYPE_INVALID, args[0]];
        }
        returnList = [TYPE_R, 0, dest, 0, 0, 0, opEncoding];
    } else if (opcode == "sll") {
        // The only supported Shift instruction is required for the la pseudo instruction
        // and requires 4 slightly different arguments
        // sll $destreg, $operand1, shift
        if (args.length != 4) {
            return [TYPE_INVALID, args[0]];
        }

        if (args[2].startsWith("$") && last(args[2].split("")) == ",") {
            tempReg = args[2].substr(1, args[2].length - 2);
        } else {
            return [TYPE_INVALID, args[0]];
        }
        operands[0] = register(tempReg);
        if (operands[0] < 0) {
            return(TYPE_BADREGISTER, tempReg);
        }

        var shift = parseInt(args[3]);
        if (shift > 0) {
            returnList = [TYPE_R, 0, 0, operands[0], dest, shift, opEncoding];
        } else {
            return [TYPE_INVALID, args[0]];
        }
    } else {
        // Remaining supported instructions have exactly 4 arguments
        // opcode $destreg, $operand1, $operand2
        if (args.length != 4) {
            return [TYPE_INVALID, args[0]];
        }

        if (args[2].startsWith("$") && last(args[2].split("")) == ",") {
            tempReg = args[2].substr(1, args[2].length - 2);
        } else {
            return f[TYPE_INVALID, args[0]];
        }
        operands[0] = register(tempReg);
        if (operands[0] < 0) {
            return [TYPE_BADREGISTER, tempReg];
        }

        if (args[3].startsWith("$")) {
            tempReg = args[3].substr(1);
        } else {
            return [TYPE_INVALID, args[0]];
        }
        operands[1] = register(tempReg);
        if (operands[1] < 0) {
            return [TYPE_BADREGISTER, tempReg];
        }

        returnList = [TYPE_R, 0, operands[0], operands[1], dest, 0, opEncoding];
    }
    return returnList;
}

/**
 * Returns a list of:
 * 1) a TYPE_ code, depending on the success of the operation, TYPE_I if valid
 * 2-5) each argument in order for a valid Type-I instruction, or the operation name if invalid
 * Input is a list of strings, each being a keyword of the instruction to be interpreted
 */
function buildInstructionI(args) {
    var returnList;
    var opcode = args[0];
    var tempReg;
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
            tempReg = args[1].substr(1, args[1].length - 2);
        } else {
            tempReg = args[1].substr(1)
        }
        dest = register(tempReg);
    } else {
        return [TYPE_INVALID, args[0]];
    }
    if (dest < 0) {
        return [TYPE_BADREGISTER, tempReg];
    }

    // Get the operand arguments and build the hex
    if (opcode == "beq" || opcode == "bne") {
        // The supported branch instructions work slightly differently
        // opcode $operand1, $operand2, desttag
        // As such the current value of dest is actually an operand
        operands[0] = dest;
        if (args[2].startsWith("$") && last(args[2].split("")) == ",") {
            tempReg = args[2].substr(1, args[2].length - 2);
        } else {
            return [TYPE_INVALID, args[0]];
        }
        operands[1] = register(tempReg);
        if (operands[1] < 0) {
            return [TYPE_BADREGISTER, tempreg];
        }

        // beq and bne both reference destinations that haven't yet been parsed
        // so return the name of the expected target and deal with it later
        returnList = [TYPE_I, opEncoding, operands[0], operands[1], args[3]];
    } else {
        // Remaining instructions follow the template:
        // opcode $destreg, $operand1, immediate
        if (args[2].startsWith("$") && last(args[2].split("")) == ",") {
            tempreg = args[2].substr(1, args[2].length - 2);
        } else {
            return [TYPE_INVALID, args[0]];
        }
        operands[0] = register(tempreg);
        if (operands[0] < 0) {
            return [TYPE_BADREGISTER, tempReg];
        }

        operands[1] = parseInt(args[3]);
        if (isNaN(operands[1])) {
            return [TYPE_INVALID, args[0]];
        }

        returnList = [TYPE_I, opEncoding, operands[0], dest, operands[1]];
    }
    return returnList;
}

/**
 * Returns a list of:
 * 1) a TYPE_ code, depending on the success of the operation, TYPE_J if valid
 * 2-3) each argument in order for a valid Type-J instruction, or the operation name if invalid
 * Input is a list of strings, each being a keyword of the instruction to be interpreted
 */
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
    // opcode destaddr
    if (args.length != 2) {
        return [TYPE_INVALID, args[0]];
    }
    targetIndex = LABELS.indexOf(args[1])
    if (targetIndex < 0) {
        return [TYPE_INVALID, args[0]];
    }
    dest = LABELADDRS[targetIndex];
    returnList = [TYPE_J, opEncoding, dest];
    return returnList;
}

/**
 * Returns the type of instruction based on the given opcode
 * Most MIPS I instructions are recognised but only a few are supported
 */
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
