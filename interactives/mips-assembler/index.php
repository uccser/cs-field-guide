<?php
/* Assembler logic from Alan Hogan
 * https://github.com/alanhogan/online-mips-assembler
 * Licensed under CC BY-NC-SA 4.0
 * See README for more information
 */

$debug = "";

define('ASSEMBLER_VERSION', '0.20');

//Types of instructions
define('TYPE_UNASSIGNED', 0);
define('TYPE_COMMENT', 1);
define('TYPE_R', 2);
define('TYPE_I', 3);
define('TYPE_LA_FIRST', 3.1);
define('TYPE_LA_THIRD', 3.2);
define('TYPE_J', 4);
define('TYPE_SYSCALL', 5);
define('TYPE_LABEL', 6);
define('TYPE_INVALID', -1);

//For .data directives
define('DATATYPE_ASCIIZ', 25);

//Regex pattern for a register
define('REGEX_REGISTER', '((\$zero)|(\$[a-z][a-z0-9]))');
//Where instructions start
define('ADDRESS_START',0x00400000); //note, by default this will print integer/decimal format
//Data stored here
define('DATA_ADDRESS_START',0x00c00000);

function mem_dechex($dec) {
    return sprintf("%08x", $dec);
}

class Line {
    public $inputLineNumber = 0;
    public $originalCode = "";

    public $lineType = TYPE_UNASSIGNED;
    public $label = "";
    public $function = "";
    public $args = "";
    public $memAddress = 0;

    public function assemble() {
        global $debug;
        $output = "";
        if($this->lineType == TYPE_LABEL) {
            $output .= mem_dechex($this->memAddress).": <$this->label>";
        } elseif($this->lineType == TYPE_R || $this->lineType == TYPE_I || $this->lineType == TYPE_J || $this->lineType == TYPE_SYSCALL || $this->lineType == TYPE_LA_FIRST || $this->lineType == TYPE_LA_THIRD) {
            $output .= "\t".mem_dechex($this->memAddress).": ";
        }

        if($this->lineType == TYPE_R){
            $output .= r_handler($this->function, $this->args);
        }

        if($this->lineType == TYPE_I){
            $output .= i_handler($this->function, $this->args, $this->memAddress);
        }

        if($this->lineType == TYPE_J){
            $output .= j_handler($this->function, $this->args, $this->memAddress);
        }

        if($this->lineType == TYPE_SYSCALL){
            if($this->function == 'syscall')
                $output.="0000000c";
        }

        if($this->lineType == TYPE_LA_FIRST){
            $tempAddr = get_address_of_data(trim($this->args));
            if($_POST['debug_on'])
                $debug .= "1[".$this->args."] Address of data: $tempAddr or ".dechex($tempAddr)."\n";
            //$tempAddr = floor( (1.0*$tempAddr)/(2^16)  ); //right left 16
            $tempAddr = $tempAddr >> 16; //right left 16
            if($_POST['debug_on'])
                $debug .= "1* Left sixteen bits of data: ".dechex($tempAddr)."\n";
            $output.= i_hex(0x9, 0, register($this->function),  $tempAddr);
        }

        if($this->lineType == TYPE_LA_THIRD){
            $tempAddr = get_address_of_data(trim($this->args));
            if($_POST['debug_on'])
                $debug .= "3[".$this->args."] Address of data: $tempAddr or ".dechex($tempAddr)."\n";
            $tempAddr = (int) hexdec(substr(sprintf("%04x",$tempAddr),4,4)); //get rid of high bits
            if($_POST['debug_on'])
                $debug .= "3* Right sixteen bits of data: $tempAddr or ".dechex($tempAddr)."\n";
            $output.= i_hex(0x9, register($this->function), register($this->function), $tempAddr);
        }
        if($this->lineType == TYPE_INVALID){
                $output.="; UNRECOGNIZED INSTRUCTION ";
        }

        if($_POST['concise_off'] || ($this->lineType != TYPE_UNASSIGNED && $this->lineType != TYPE_COMMENT))
            $output .= "\t; <input:{$this->inputLineNumber}> {$this->originalCode}"."\n";

        return $output;
    }
}

function register($register) {
    //Returns register number from name; e.g. $s1 -> 17
    switch($register) {
        case '$zero':
            return 0; break;
        case '$gp':
            return 28; break;
        case '$sp':
            return 29; break;
        case '$fp':
            return 30; break;
        case '$ra':
            return 31; break;
        case '$at':
            return 1; break;
        default:
            $matches = array();
            if(preg_match('/^\$(?<letter>[a-z])(?<number>\d)$/i',$register,$matches)) {
                if ($matches['letter'] == 'v')
                    return $matches['number'] + 2;
                if ($matches['letter'] == 'a')
                    return $matches['number'] + 4;
                if ($matches['letter'] == 't' && (int)$matches['number'] < 8)
                    return $matches['number'] + 8;
                if ($matches['letter'] == 's')
                    return $matches['number'] + 16;
                if ($matches['letter'] == 'k')
                    return $matches['number'] + 26;
                if ($matches['letter'] == 't')
                    return $matches['number'] + 16;
            }
    }
}

function functionType($name) {
    //Takes name of function and returns type
    switch($name) {
        case "add":
        case "and":
        case "jr":
        case "nor":
        case "or":
        case "slt":
        case "sll":
        case "srl":
        case "sub":
        case "subu":
        case "addu":
            return TYPE_R; break;
        case "addi":
        case 'addiu':
        case "andi":
        case "beq":
        case "bne":
        case "ori":
        case "lw":
        case "sb":
        case "sw":
            return TYPE_I; break;
        case "j":
        case "jal":
            return TYPE_J; break;
        case "syscall":
            return TYPE_SYSCALL; break;
        default:
            return TYPE_INVALID;
    }
}

function r_hex($opcode, $rs, $rt, $rd, $shamt, $funct) {
    return sprintf("%08x", bindec(
        substr(sprintf("%06b", $opcode),-6)
        .substr(sprintf("%05b", $rs),-5)
        .substr(sprintf("%05b", $rt),-5)
        .substr(sprintf("%05b", $rd),-5)
        .substr(sprintf("%05b", $shamt),-5)
        .substr(sprintf("%06b", $funct),-6)
        ));
}
function i_hex($opcode, $rs, $rt, $immediate) {
    return sprintf("%08x", bindec(
        substr(sprintf("%06b", $opcode),-6)
        .substr(sprintf("%05b", $rs),-5)
        .substr(sprintf("%05b", $rt),-5)
        .substr(sprintf("%016b", $immediate),-16)
        ));
}
function j_hex($opcode, $address) {
    return sprintf("%08x", bindec(
        substr(sprintf("%06b", $opcode),-6)
        .substr(sprintf("%026b", $address),-26)
        ));
}

function r_reg_reg_reg_hex ($opcode, $args, $funct) {
    $matches = array();
    preg_match('/\s*(?P<rd>'.REGEX_REGISTER.'),\s*(?P<rs>'.REGEX_REGISTER.'),\s*(?P<rt>'.REGEX_REGISTER.')\s*/i', $args, $matches);
    return r_hex($opcode, register($matches['rs']), register($matches['rt']), register($matches['rd']), 0, $funct);
}
function r_shift_hex ($opcode, $args, $funct) {
    $matches = array();
    preg_match('/\s*(?P<rd>'.REGEX_REGISTER.'),\s*(?P<rt>'.REGEX_REGISTER.'),\s*(?P<shamt>-?\d+)\s*/i', $args, $matches);
    return r_hex($opcode, 0, register($matches['rt']), register($matches['rd']), (int)$matches['shamt'], $funct);
}
function r_handler($function, $args) {
    switch ($function){
        case 'add':
            return r_reg_reg_reg_hex(0, $args, 0x20); break;
        case 'sub':
            return r_reg_reg_reg_hex(0, $args, 0x22); break;
        case 'subu':
            return r_reg_reg_reg_hex(0, $args, 0x23); break;
        case 'and':
            return r_reg_reg_reg_hex(0, $args, 0x24); break;
        case 'nor':
            return r_reg_reg_reg_hex(0, $args, 0x27); break;
        case 'or':
            return r_reg_reg_reg_hex(0, $args, 0x25); break;
        case 'slt':
            return r_reg_reg_reg_hex(0, $args, 0x2a); break;
        case 'jr':
            return r_hex(0, register($args), 0, 0, 0, 0x08); break;
        case 'sll':
            return r_shift_hex(0, $args, 0x0); break;
        case 'srl':
            return r_shift_hex(0, $args, 0x2); break;
        default:
            return "; UNSUPPORTED R FORMAT INSTRUCTION '$function $args'";
    }
}

function i_reg_reg_imm_hex($opcode, $args) {
    global $debug;
    $matches = array();
    if(!preg_match('/\s*(?P<rt>'.REGEX_REGISTER.'),\s+(?P<rs>'.REGEX_REGISTER.'),\s+(?P<imm>[-]?\d+)\s*/i', $args, $matches))
        $debug.="Parse error, i_reg_reg_imm_hex: opcode $opcode args $args\n";
    //$debug .= "i_reg_reg... says: opcode $opcode, args $args, rs {$matches['rs']}, rt {$matches['rt']}, imm {$matches['imm']}\ni_hex ".i_hex($opcode, register($matches['rs']), register($matches['rt']), (int)$matches['imm'])."\n"; //debug
    return i_hex($opcode, register($matches['rs']), register($matches['rt']), (int)$matches['imm']);
}
function i_memop($opcode, $args){
    global $debug;
    $matches = array();
    if(!preg_match('/\s*(?P<rt>'.REGEX_REGISTER.'),\s*(?P<imm>\d+)\((?P<rs>'.REGEX_REGISTER.')\)\s*/i', $args, $matches))
        $debug.="Parse error, i_memop: $opcode $args\n";
    return i_hex($opcode, register($matches['rs']), register($matches['rt']), (int)$matches['imm']);
}

function i_branch($opcode, $args, $myAddr){
    global $debug;
    $matches = array();
    if(!preg_match('/\s*(?P<rs>'.REGEX_REGISTER.'),\s*(?P<rt>'.REGEX_REGISTER.'),?\s*(?P<label>[-_a-z0-9]+)\s*/i', $args, $matches))
        $debug.="Parse error, i_branch: $opcode $args\n";
        $relAddr = (get_address_from_label($matches['label']) - ($myAddr+4))/4;
        if($relAddr == 0) return "; COULD NOT FIND LABEL '{$matches['label']}'";
    return i_hex($opcode, register($matches['rs']), register($matches['rt']), $relAddr);
}
function i_handler($function, $args, $myAddr) {
    switch ($function){
        case 'addi':
            return i_reg_reg_imm_hex(0x8, $args); break;
        case 'addiu':
            return i_reg_reg_imm_hex(0x9, $args); break;
        case 'andi':
            return i_reg_reg_imm_hex(0xc, $args); break;
        case 'ori':
            return i_reg_reg_imm_hex(0xd, $args); break;
        case 'sw':
            return i_memop(0x2b, $args); break;
        case 'lw':
            return i_memop(0x23, $args); break;
        case 'lbu':
            return i_memop(0x24, $args); break;
        case 'lhu':
            return i_memop(0x25, $args); break;
        case 'sb':
            return i_memop(0x28, $args); break;
        case 'sh':
            return i_memop(0x29, $args); break;
        case 'beq':
            return i_branch(0x4, $args, $myAddr); break;
        case 'bne':
            return i_branch(0x5, $args, $myAddr); break;
        default:
            return "; UNSUPPORTED I FORMAT INSTRUCTION '$function $args'";
    }
}

function j_handler($function, $args, $myAddr) {
        global $debug;
    $opcode;
    switch ($function){
        case 'j':
            $opcode = 0x2; break;
        case 'jal':
            $opcode = 0x3; break;
        default:
            return "; UNSUPPORTED J FORMAT INSTRUCTION '$function $args'";
    }
    $matches = array();
    if(!preg_match('/\s*(?P<label>[-_a-z0-9]+)\s*/i', $args, $matches))
        $debug.="Parse error, j_mama: $opcode $args\n";
        $jAddr = get_address_from_label($matches['label'])/4;
        if($jAddr == 0) return "; COULD NOT FIND LABEL '{$matches['label']}'";
    return j_hex($opcode, $jAddr);
}

function get_address_from_label($label) {
    global $debug, $lines;
    foreach($lines as $lineObj) {
        if($lineObj->label == $label)
            return $lineObj->memAddress;
    }

    $debug .="Could not find label '$label'\n";
    return 0;
}

/////// Functions for .asciiz, "la labelname"...

class Data {
    public $data, $memAddress, $type, $label, $itemBytes;
    private static $bytesUsed = 0;
    //accessor
    public function bytesUsed() { return self::$bytesUsed; }

    public static $dataAddressStart = DATA_ADDRESS_START; //todo: Is this the best way to implement this?
    public static $dataItems = array();

    public function __construct($type, $label, $data) { //Constants: DATATYPE_XXX, e.g. DATATYPE_ASCIIZ
        $this->type = $type;
        $this->label = $label;
        $this->data = $data = make_string_printable($data);
        switch($type) {
            case DATATYPE_ASCIIZ:
                $this->memAddress = self::$dataAddressStart + self::$bytesUsed;
                $bytes = strlen($data)+1;
                while($bytes % 4) $bytes++;
                self::$bytesUsed += $bytes;
                $this->itemBytes = $bytes;
                break;
        }

        self::$dataItems[] = $this;
    }

    public function assemble() {
        if($this->type == DATATYPE_ASCIIZ) {
            $output ="; ".$this->label."\n";
            for($words = 0; $words < ($this->itemBytes >> 2); $words++) {
                $output .= sprintf("%08x", $this->memAddress + 4*$words).":\t";
                for($i = 0; $i < 4; $i++) {
                    if(($i + 4*$words) >= strlen($this->data))
                        $output .= "00";
                    else
                        $output .= sprintf("%02x", ord(substr($this->data, $i+4*$words, 1)));
                }
                $output .= "\t;\t".decode_printable_string(substr($this->data, $words*4, 4)); //\t{$this->data}:
                $output .= "\n";
            }
            return $output;
        }
    }
}//Data

function get_address_of_data($label) {
    global $debug;
    $dataItems = Data::$dataItems;
    foreach($dataItems as $dataObj) {
        if($dataObj->label == $label)
            return $dataObj->memAddress;
    }
    $debug .="Could not find data labeled as '$label'\n";
    return 0;
}

//For asciiz... convert \t, \n, etc
function decode_printable_string($string) {
    return str_replace(array("\n", "\t", "\r"),
        array('\n', '\t', '\r'),
        $string);
}
function make_string_printable($string) {
    return str_replace(array('\n', '\t', '\r'),
        array("\n", "\t", "\r"),
        $string);
}


//For array_walk
function trim_self(&$string) { $string = trim($string); }


//////////////////////////////
/////// actual parsing ///////
//////////////////////////////

if (strlen($_POST['input'])) {
    //Process input!
    $input = $_POST['input'];
    if (get_magic_quotes_gpc()) {
        $input = stripslashes($input);
    }

    //convert to arroy of lines
    $inArray = explode("\n", $input);
    array_walk($inArray, 'trim_self');

    //// Convert to an array of Line objects //
    $lines = array();
    $dataItems = array();
    $matches = array();
    $counter = 0; //lines in input code
    $memAddress = ADDRESS_START;

    /////BEGIN FOREACH: Line object creation, pseudocode translation, .data handling
    foreach($inArray as $line) {
        $lineObj = new Line();
        //Save original code & line number
        $lineObj->inputLineNumber = $counter;
        $lineObj->originalCode = $line;

        ///// replace pseudocode with real instructions
        //li to addi/ori
        if (    preg_match('/(?P<front>(\s*)(\w+:)?(\s*))li(\s+)(?P<dest>\$[0-9a-zA-Z]+),(\s+)(?P<imm>-?\d+)(?P<end>(#|\s)+.*)?/iu',
                $line, $matches
                )===1) {
            $line = "{$matches['front']}"
                .($_POST['li_to_ori'] ? ($matches['imm']<0 ?'addi':'ori') : 'addi')
                ." {$matches['dest']},    \$zero,    {$matches['imm']}{$matches['end']}";
            if($_POST['li_to_ori'] && $matches['imm'] < 0) {
                $debug .= "Warning: Converting 'li' to 'ori' in this case would not have the "
                    ."desired effect. The immediate"
                    ." value is negative, but resulting register value will be incorrect"
                    ." due to different bit string lengths and the fact 'ori' does not "
                    ."sign-extend. We will use 'addi' instead."
                    ." Line: ".$lineObj->inputLineNumber.", immediate value: {$matches['imm']}\n";
            }
        }
        //move to add
        if (    preg_match('/(?P<front>(\s*)(\w+:)?(\s*))move(\s+)(?P<dest>\$[0-9a-zA-Z]+),\s*(?P<src>\$[0-9a-zA-Z]+)(?P<end>(#|\s)+.*)?/iu',
                $line, $matches
                )===1) {
            $line = "{$matches['front']}add {$matches['dest']},    \$zero,    {$matches['src']}{$matches['end']}";
        }
        //Todo: Branches


        //Determine what kind of a line it is
        if(preg_match('/^\s*((?P<label>[-_a-z0-9]+):\s*)?(?P<instruction>(?P<function>[a-z]+)(?P<args>\s+([-_\$a-z0-9, \t]*)(?P<address>\d+\('.REGEX_REGISTER.'\))?\s*)?)?(?P<comment>\s*#.*)?\s*$/i', $line, $matches
            )) {
            if(array_key_exists('label',$matches) && strlen($matches['label'])) {
                if(array_key_exists('function',$matches) && strlen($matches['function'])) {
                    //Label and instruction
                    $tempObj = new Line();
                    $tempObj->label = $matches['label'];
                    $tempObj->inputLineNumber = $lineObj->inputLineNumber;
                    $tempObj->originalCode = $lineObj->originalCode;
                    $tempObj->memAddress = $lineObj->memAddress = $memAddress;
                    $tempObj->lineType = TYPE_LABEL;
                    $lines[] = $tempObj;

                } else {
                    //Just a label
                    $lineObj->label = $matches['label'];
                    $lineObj->memAddress = $memAddress;
                    $lineObj->lineType = TYPE_LABEL;
                }

            }
            if(array_key_exists('function',$matches) && strlen($matches['function'])) {
                $lineObj->memAddress = $memAddress;
                $lineObj->function = $matches['function'];
                    $lineObj->lineType = functionType($matches['function']);
                    if ($_POST['debug_on'])
                        $debug .="\$lineObj->lineType: {$lineObj->lineType} ($line)\n";
                if(array_key_exists('args',$matches) && strlen($matches['args'])) {
                    $lineObj->args = trim($matches['args']);
                }
                //Corrections for la.
                //Essentially turn into three instructions: for
                //        la $t0 dataname
                //it becomes:
                //        addiu $t0, $zero, [hi 16 bits of data addr]
                //        sll $t0, $t0, 16
                //        addiu $t0, $t0, [low 16 bits of addr]

                    $tmatches;
                if(preg_match('/^\s*((?P<label>[-_a-z0-9]+):\s*)?(?P<instruction>(?P<function>la)(?P<args>\s+(?P<register>'.REGEX_REGISTER.'),\s+(?P<datalabel>[-_a-z0-9]+)))(?P<comment>\s*#.*)?\s*$/i', $line, $tmatches
                    )){
                    $tempObj = new Line();
                    $secondObj = new Line();
                    //$tempObj->label = $matches['label'];
                    $tempObj->inputLineNumber = $secondObj->inputLineNumber = $lineObj->inputLineNumber;
                    $tempObj->originalCode = $secondObj->originalCode = $lineObj->originalCode;
                    $tempObj->memAddress = $memAddress;
                    $secondObj->memAddress = $memAddress+4;
                    $lineObj->memAddress = $memAddress+8;
                    $memAddress += 8;

                    $tempObj->lineType = TYPE_LA_FIRST;
                    $tempObj->function = trim($tmatches['register']); //NOTE: Not standard!!
                    $tempObj->args = trim($tmatches['datalabel']);

                    $secondObj->lineType = TYPE_R;
                    $secondObj->function = 'sll';
                    $secondObj->args = $tmatches['register'].", ".$tmatches['register'].", 16";

                    $lineObj->lineType = TYPE_LA_THIRD;
                    $lineObj->function = trim($tmatches['register']); //NOTE: Not standard!!
                    $lineObj->args = trim($tmatches['datalabel']);

                    $lines[] = $tempObj;
                    $lines[] = $secondObj;
                }
            }

        }
        elseif(preg_match('/^\s*\.[a-z]+(\s+[-_a-z0-9]+)?\s*$/i', $line, $matches)) { //failed preg_match for functions... type?
                continue;
        }
        elseif(preg_match('/^\s*((?P<label>[-_a-z0-9]+):\s*)(?<type>\.asciiz\s+)"(?P<data>[^"]+)"\s*$/i', $line, $matches)) { //failed preg_match for functions & type... data?
            $lineObj->lineType = DATATYPE_ASCIIZ;
            $dataItems[] = new Data(DATATYPE_ASCIIZ, $matches['label'], $matches['data']);
            continue; //todo: f'real?
        }

        else { //failed preg_match
            $lineObj->lineType = TYPE_INVALID;
        }


        if($lineObj->lineType == TYPE_R || $lineObj->lineType == TYPE_I || $lineObj->lineType == TYPE_LA_THIRD || $lineObj->lineType == TYPE_J || $lineObj->lineType == TYPE_SYSCALL) {
            $memAddress+=4;
        }
        $lines[] = $lineObj;
        $counter++; //todo: check
    }//foreach $inArray as $line

    //Loop thru and print each Line, appropriately calculating
    //addresses for jump thru getLineNumber() function
    $output = "";
    reset($lines);
    foreach($lines as $line2)
    $output .= $line2->assemble(); //they have their own newlines

    //Now data
    if(count(Data::$dataItems)) {
        $output .= ";\n;\tDATA IN MEMORY \n";
        foreach(Data::$dataItems as $dataItem) {
            $output.= $dataItem->assemble();
        }
    }

//END
}

?>

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <!--Let browser know website is optimized for mobile-->
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <!-- ### Enter your interactive title in the title block ### -->
    <title>MIPS Assembler</title>
    <link rel="stylesheet" href="../base-files/css/third-party/normalize.css">
    <!--Import materialize.css-->
    <link rel="stylesheet" href="../base-files/css/third-party/materialize.min.css" type="text/css" media="screen,projection"/>
    <script src="../base-files/js/third-party/modernizr.js"></script>
    <!-- jQuery (necessary for Materialize) -->
    <script type="text/javascript" src="../base-files/js/third-party/jquery.js"></script>
  </head>
  <body>
    <div class="interactive" id="interactive-mips-assembler">
      <div class="row">
        <h2 class="center-align">MIPS Assembler</h2>
        <div class="col s12 l6">

          <h4>MIPS Input</h4>
          <p>Please enter MIPS code below to see the assembler output. A subset of MIPS is implemented. Comments start with #.</p>

          <?php print '<form action="'.$_ENV['SCRIPT_URL'].'" method="post">'; ?>
<textarea name="input" id="mips_input" class="code"><?php
    print (
        (strlen($input) > 1)
        ? str_replace(array(/*' ',*/"\t"), array(/*'&nbsp;',*/'   '),
             htmlentities($input))
        : str_replace(array(/*' ',*/"\t"), array(/*'&nbsp;',*/'   '),
            htmlentities(
'.data
str:  .asciiz "\nHello World!\n"
# You can change what is between the  quotes if you like

.text
.globl main

main:
# Do the addition
# For this, we first need to put the values
# to add into registers  ($t0 and $t1)
li $t0, 10    # You can change the 10
li $t1, 20    # You can change the 20

# Now we can add the values in $t0
# and $t1, putting the result in special register $a0
add $a0, $t0, $t1

# Set up for printing the value in $a0.
# A 1 in $v0 means we want to print an int
li $v0, 1

# The system call looks at what is in $v0
# and $a0, and knows to print what is in $a0
syscall

# Now we want to print Hello World
# So we load the (address of the) string into $a0
la $a0, str

# And put a 4 in $v0 to mean print a string
li $v0, 4

# And just like before syscall looks at
# $v0 and $a0 and knows to print the string
syscall

# Nicely end the program
li $v0, 0
jr $ra'))); ?></textarea>

      <div class="row">
        <div class="col s12 l6">
          <p>
              <input type="checkbox" name="concise_off" <?php print ($_POST['concise_off'] ? 'checked="checked" ' : ''); ?> id="checkco" />
              <label for="checkco">Show blank lines in output (ignored by default)</label>
          </p>
          <p>
              <input type="checkbox" name="debug_on" <?php print ($_POST['debug_on'] ? 'checked="checked" ' : ''); ?> id="checkdb" />
              <label for="checkdb">Verbose/debug mode</label>
          </p>
          <p>
              <input type="checkbox" name="li_to_ori" <?php print ($_POST['li_to_ori'] ? 'checked="checked" ' : ''); ?> id="check_ori" />
              <label for="check_ori">Use <code>ori</code> (not <code>addi</code>) for <code>li</code></label>
          </p>
        </div>

        <div class="col s12 l6">
          <p>
            <input type="submit" name="assemble" value="Assemble" class="btn btn-large btn-expand green" />
          </p>
          <p>
            <?php print '<a href="'.$_ENV['SCRIPT_URL'].'" title="Reset to Hello World code" class="btn red">Start Over</a>'; ?>
          </p>
        </div>
      </div>
      </form>

    </div>
    <div class="col s12 l6">
      <?php if(strlen(trim($debug))) { ?>
      <h4>Debug Output</h4>
      <div class="code"><?php print nl2br(htmlentities($debug)); ?></div>
      <?php
      }

      if (strlen($output)) {
          print '<h4>Assembler Output</h4><div class="code">'.nl2br(htmlentities($output)).'</div>';
      }
      ?>
    </div>
  </div>
  <div class="footer center-align">This MIPS assembler was created by <a href="https://github.com/alanhogan/online-mips-assembler">Alan J. Hogan</a> and is available under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a></div>

  <style>
  /* Load style from CSS file */
  <?php include 'css/mips-assembler.css'; ?>
  </style>
  </div>
  <!-- Materialize responsive CSS -->
  <script type="text/javascript" src="../base-files/js/third-party/materialize.min.js"></script>
  </body>
</html>
