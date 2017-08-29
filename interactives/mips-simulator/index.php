<?php
/* Simulator logic from Alan Hogan
 * https://github.com/alanhogan/miphps-mips-simulator
 * Licensed under CC BY-NC-SA 4.0
 * See README for more information
 *
 * Notes:
 *
 * post "memInput" / print $output
 *
 * This program makes liberal use of Regular Expressions. If you are examining
 * or editing this file, please first become familiar with regular expressions,
 * (specifically, the Perl/PCRE engine).
 *
 * This program processes address-intruction/address-data pairs assembled from
 * MIPS code, along with input data, and creates output.
 *
 * Please note that both Register and Memory internall store & return
 * data in STRING HEX of 8-char length. KEYS are INTEGERS but strings
 * are automatically converted (with register() and hexdec(), respectively).
 *
 */

$debug = "";
$output = ""; //// important

define('SIMULATOR_VERSION', '0.10');

//Types of instructions
define('TYPE_UNASSIGNED', 0);
define('TYPE_COMMENT', 1);
define('TYPE_R', 2);
define('TYPE_I', 3);
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
//Top of stack
define('STACK_TOP_ADDRESS',0x7ffffffc); //Any higher, and it will be a negative number

function mem_dechex($dec) {
   return sprintf("%08x", $dec);
}

class Instruction {
   public $type;
   public $opcode;
   public $rs;
   public $rt;
   public $rd;
   public $shamt;
   public $funct;
   public $imm;
   public $address;
   public function __constructor() {
       $this->type = TYPE_UNASSIGNED;
       $this->opcode = "0";
       $this->rs = "0";
       $this->rt = "0";
       $this->rd = "0";
       $this->shamt = "0";
       $this->funct = "0";
       $this->imm = "0";
       $this->address = "0";
       $this->opcodedec     = 0;
       $this->rsdec         = 0;
       $this->rtdec         = 0;
       $this->rddec         = 0;
       $this->shamtdec    = 0;
       $this->functdec    = 0;
       $this->immdec         = 0;
       $this->addressdec    = 0;
   }
}

class Registers {
   private $registers;

   public function __construct() {
       for($x = 0; $x<32; $x++)
           $this->registers[$x]="00000000";
       $this->registers[register('$sp')] = dechex(STACK_TOP_ADDRESS);
   }
   public function read($register) {
       if(is_string($register)) $register = register($register);
       return $this->registers[$register];
   }
   public function write($register, $value) {
       global $debug;
       if(is_string($register)) $register = register($register);
       if(is_string($value) && strlen($value) > 15) {
           if($_POST['debug_on']) $debug .= "Convert binary register value to hex: $value > ";
           $value = sprintf("%08x", (int) bindec($value));
           if($_POST['debug_on']) $debug .= "$value\n";
       } elseif(is_int($value)) {
           $value = sprintf("%08x",$value);
       }
       if ($register < 32 && $register > 0 && $register == (int)$register)
           $this->registers[$register] = $value;
       else
           throw new Exception("Can't write to supposed register '$register'");
   }
}

function register($register) {
   //Returns register number from name; e.g. $s1 -> 17
   switch($register) {
       case '$zero': return 0; break;
       case '$gp': return 28; break;
       case '$sp': return 29; break;
       case '$fp': return 30; break;
       case '$ra': return 31; break;
       case '$at': return 1; break;
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

function instruction_decode($hex) {
   global $debug;
   //Takes instruction, in hex, and returns Instruction object with
   //type and appropriate byte strings.
   $binary = sprintf("%032b",(hexdec($hex)));
   $instr = new Instruction();
   $instr->opcode = substr($binary,0,6);

   switch((int) bindec($instr->opcode)) {
       case 0x0:
           $instr->type = TYPE_R;
           $instr->rs = substr($binary, 6, 5);
           $instr->rt = substr($binary, 11, 5);
           $instr->rd = substr($binary, 16, 5);
           $instr->shamt = substr($binary, 21, 5);
           $instr->funct = substr($binary, 26, 6);
           break;
       case 0x5:
       case 0x4:
       case 0x8:
       case 0x9:
       case 0xa:
       case 0xb:
       case 0xc:
       case 0xd:
       case 0xf:
       case 0x28:
       case 0x23:
       case 0x29:
       case 0x2b:
           $instr->type = TYPE_I;
           $instr->rs = substr($binary, 6, 5);
           $instr->rt = substr($binary, 11, 5);
           $instr->imm = substr($binary, 16, 16);
           break;
       case 0x2:
       case 0x3:
           $instr->type = TYPE_J;
           $instr->address = substr($binary, 6, 26);
           break;
       default:
           return TYPE_INVALID;
   }

   if($hex == "0000000c")
       $instr->type = TYPE_SYSCALL;

   @ $instr->opcodedec    = (int) bindec($instr->opcode);
   @ $instr->rsdec        = (int) bindec($instr->rs);
   @ $instr->rtdec        = (int) bindec($instr->rt);
   @ $instr->rddec        = (int) bindec($instr->rd);
   @ $instr->shamtdec    = (int) bindec($instr->shamt);
   @ $instr->functdec    = (int) bindec($instr->funct);
   @ $instr->immdec        = (int) smartbindec($instr->imm);
   @ $instr->addressdec    = (int) bindec($instr->address);
   return $instr;
} //Instruction

class Memory {
   private $memory;

   public function __construct() {
       $this->memory = array();
   }
   public function read($address) {
       if(is_string($address))
           $address = (int) hexdec($address);
       if(!array_key_exists($address,$this->memory))
           throw new Exception("Memory address undefined: 0x".sprintf("%08x",$address)
               .". (Type: ".gettype($address).")");
       return $this->memory[$address];
   }
   public function comment($address) {
       if(is_string($address))
           $address = (int) hexdec($address);
       if(!array_key_exists($address,$this->memory))
           throw new Exception("Memory address undefined: 0x".sprintf("%08x",$address)
               .". (Type: ".gettype($address).")");
       return $this->memory[$address."_comment"];
   }
   public function write($address, $value, $comment = '') {
       if(is_string($address))
           $address = (int) hexdec($address);
       if(is_string($value) && strlen($value) > 15) {
           $debug .= "$value > ";
           $value = sprintf("%08x", (int) bindec($value));
           $debug .= "$value\n";
       } elseif(is_int($value)) {
           $value = sprintf("%08x",$value);
       }
       $this->memory[$address] = $value;
       $this->memory[$address."_comment"] = $comment;
   }
} //Memory


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

//hex string to 32-bit binary string (2's complement-agnostic)
function hexbin($hexStr) {
   return sprintf("%032b",hexdec($hexStr));
}
//hex string to integer, allowing 2's complement
function smarthexdec($hexStr) {
   return smartbindec(sprintf("%032b",hexdec($hexStr)));
}
//Zero-Extends a 32-bit-length binary string
function bin32($bin) {
   return sprintf("%032s",$bin);
}
//Sign-extends to 32-to-bit-length binary string
function signext32($bin) {
   if(substr($bin,0,1) =="1")
       return sprintf("%'132s",$bin);
   else
       return sprintf("%032s",$bin);
}
function twoscomp($bin) {
   $out = "";
   $mode = "init";
   for($x = strlen($bin)-1; $x >= 0; $x--) {
       if ($mode != "init")
           $out = ($bin[$x] == "0" ? "1" : "0").$out;
       else {
           if($bin[$x] == "1") {
               $out = "1".$out;
               $mode = "invert";
           }
           else
               $out = "0".$out;
       }
   }
   return $out;
}
function smartbindec($bin) {
   if($bin[0] == 1)
       return -1 * bindec(twoscomp($bin));
   else return (int) bindec($bin);
}



//////////////////////////////
/////// actual parsing ///////
//////////////////////////////

if (strlen($_POST['memInput'])) {
  //Process input!
   $memInput = $_POST['memInput'];
   if (get_magic_quotes_gpc()) {
       $memInput = stripslashes($memInput);
   }

   //convert to arroy of lines
   $inArray = explode("\n", $memInput);
   array_walk($inArray, 'trim_self');

   //pc can be overridden by <main>
   $pc = ADDRESS_START; /////// important ///////

   //// Put everything in memory
   $mem = new Memory(); /////// important ///////
   $matches = array();
   foreach($inArray as $line) {
       if(preg_match('/(?P<addr>[a-f0-9]{8})\s*:\s*(?P<data>[a-f0-9]{8})\s*(?P<comment>;.*)?/i',$line,$matches)) {
           if(array_key_exists('comment',$matches))
               $mem->write($matches['addr'], $matches['data'], $matches['comment']);
           else
               $mem->write($matches['addr'], $matches['data']);
           //if($_POST['debug_on'])
           //    $debug .= "addr: ".$matches['addr']."  data: ".$matches['data']."\n";
       }
       else if(preg_match('/^(?P<addr>[a-f0-9]{8})\s*:\s*<main>\s*;.*$/i',$line,$matches))
           $pc = hexdec($matches['addr']);
       else if($_POST['debug_on'])
           $debug .= "Failed regex: ".$line."\n";
   }
   ///key inputs:
   $userEntered = explode("\n", $_POST['keyInput']);
   array_walk($userEntered, 'trim_self');
   $userEnteredVariablesRead = 0;



   /////BEGIN execution
   //$pc already declared; /////// important ///////
   $reg = new Registers(); /////// important ///////
   //$mem already declared: new Memory();

   $execute = true;
   $instrCounter = 0;
   while($execute && ($instrCounter++ < 80000)) { //TODO //DEBUG //This stops baaad recursion
       try {
           $instr = instruction_decode($mem->read($pc));
           if($_POST['debug_on']) {
               $debug .= "Loading 0x".sprintf("%08x : %s  ",$pc,$mem->read($pc));
               //$debug .= print_r($instr,true)."\n";
               $debug .= $mem->comment($pc)."\n";
               if($pc == 0x400000)
                   $debug .= sprintf('$a0: %d, $a1: %d, $ra: 0x%08s',
                       $reg->read('$a0'),
                       $reg->read('$a1'),
                       $reg->read('$ra')
                   )."\n";
           }

           $pc += 4; //Can be overwritten

           if($instr->type == TYPE_R) {
               switch($instr->functdec) {
                   case 0x20: //add
                       $reg->write($instr->rddec,
                           smarthexdec($reg->read($instr->rsdec)) + smarthexdec($reg->read($instr->rtdec))
                           );
                       if($_POST['debug_on'])
                           $debug.= sprintf("\tAdd: \$rs [%08s] + \$rs [%08s] = %08x\n",
                               $reg->read($instr->rsdec),
                               $reg->read($instr->rtdec),
                               smarthexdec($reg->read($instr->rsdec))+smarthexdec($reg->read($instr->rtdec)));
                       break;
                   case 0x25: //or
                       $reg->write($instr->rddec,
                           hexbin($reg->read($instr->rsdec)) | hexbin($reg->read($instr->rtdec))
                           );
                       break;
                   case 0x0: // sll
                       $reg->write($instr->rddec,
                           hexdec($reg->read($instr->rtdec)) * pow(2,$instr->shamtdec)
                           );
                       break;
                   case 0x22: //subtract
                       $reg->write($instr->rddec,
                           smarthexdec($reg->read($instr->rsdec)) - smarthexdec($reg->read($instr->rtdec))
                           );
                       break;
                   case 0x2: // srl

                       break;
                   case 0x8: //jr
                       $jumpto = (int)hexdec($reg->read($instr->rsdec));
                       if($jumpto) {
                           $pc = $jumpto;
                           continue;
                       } else {
                           $execute = false;
                           $output.="\n* Program execution complete *";
                       }

                       break;
/*                    case 0xa:

                       break;
/*                    case 0xb:

                       break;
/*                    case 0xc:

                       break;
/*                    case 0xd:

                       break;
                   case 0xf:

                       break;
                       */
                   default:
                       $execute = false;
                       $debug .= "Unsupported R-type instruction \n";
                       break;
               }
           } elseif($instr->type == TYPE_I) {
               switch($instr->opcodedec) {
                   case 0x4: //beq, branch on equal
                       if(hexdec($reg->read($instr->rsdec)) == hexdec($reg->read($instr->rtdec))) {
                           $pc += $instr->immdec * 4;
                           if($_POST['debug_on'])
                               $debug.="\tBranching [beq], because ".hexdec($reg->read($instr->rsdec))
                                   ." does equal ".hexdec($reg->read($instr->rtdec))."\n";
                       } else if($_POST['debug_on'])
                           $debug.="\tNOT branching [beq], because ".hexdec($reg->read($instr->rsdec))
                               ." does not equal ".hexdec($reg->read($instr->rtdec))."\n";
                       break;
                   case 0x5: //bne, branch on not equal
                       if(hexdec($reg->read($instr->rsdec)) != hexdec($reg->read($instr->rtdec))) {
                           $pc += $instr->immdec * 4;
                           if($_POST['debug_on'])
                               $debug.="\tBranching [bne], because ".hexdec($reg->read($instr->rsdec))
                                   ." does not equal ".hexdec($reg->read($instr->rtdec))."\n";
                       } else if($_POST['debug_on'])
                           $debug.="\tNOT branching [bne], because ".hexdec($reg->read($instr->rsdec))
                               ." does equal ".hexdec($reg->read($instr->rtdec))."\n";
                       break;
//                    case 0x4:
//                        break;
                   case 0x8: //addi [partially tested]
                       $reg->write($instr->rtdec,
                           smartbindec(hexbin($reg->read($instr->rsdec))) + smartbindec($instr->imm)
                           );
                       if($_POST['debug_on'])
                           $debug.= "   Addi: [".$reg->read($instr->rsdec)
                           ."] ".smartbindec(hexbin($reg->read($instr->rsdec)))." + [imm] "
                           .smartbindec($instr->imm)." = "
                           .(smartbindec(hexbin($reg->read($instr->rsdec)))
                               + smartbindec($instr->imm))." \n";
                       break;
                   case 0x9: //addiu
                   $reg->write($instr->rtdec,
                       bindec(hexbin($reg->read($instr->rsdec))) + bindec($instr->imm)
                       );
                       break;
//                    case 0xa:
//                        break;
//                    case 0xb:
//                        break;
                   case 0xc: //andi
                       $reg->write($instr->rtdec,
                           hexbin($reg->read($instr->rsdec)) & bin32($instr->imm)
                           );
                       break;
                   case 0xd: //ori
                       $reg->write($instr->rtdec,
                           hexbin($reg->read($instr->rsdec)) | bin32($instr->imm)
                           );
                       break;
//                    case 0xf:
//                        break;
//                    case 0x28:
//                        break;
//                    case 0x29:
//                        break;
                   case 0x23: //lw
                       $reg->write($instr->rtdec,
                           $mem->read( hexdec($reg->read($instr->rsdec)) + $instr->immdec)
                           );
                       if($_POST['debug_on'])
                           $debug .= "   Load word: ".sprintf("0x%08x",
                           hexdec($reg->read($instr->rsdec)) + $instr->immdec)
                           ." : ".$mem->read( hexdec($reg->read($instr->rsdec)) + $instr->immdec)."\n";
                       break;
                   case 0x2b: //sw
                       $mem->write( hexdec($reg->read($instr->rsdec)) + $instr->immdec,
                           $reg->read($instr->rtdec));
                       break;
                   default:
                       $execute = false;
                       $debug .= "Unsupported I-type instruction \n";
                       break;
               }
           } elseif($instr->type == TYPE_J) {
               switch($instr->opcodedec) {
                   case 0x3: //jal
                       $reg->write('$ra',$pc);
                       //fall through
                   case 0x2: //jump
                       $pc = (int)floor($pc/0x10000000)*0x10000000 + $instr->addressdec * 4;
                       if($_POST['debug_on'])
                           $debug .= sprintf("Jumping to 0x%08x\n", $pc);
                       break;
                   default:
                       $debug .= "Unsupported J-type instruction \n";
                       break;
               }
           } elseif($instr->type == TYPE_SYSCALL) {
               if(hexdec($reg->read('$v0')) == 1) { //Print integer
                   $output .=  smarthexdec($reg->read('$a0'));
               }
               elseif(hexdec($reg->read('$v0')) == 4) { //Print string (asciiz)
                   $temp = ""; $words = 0;
                   while(1){
                       //$debug.="Read mem addr: [0x".$reg->read(register('$a0'))
                       //    ."] ".hexdec($reg->read(register('$a0')))
                       //    ." + $words*4 = ".(hexdec($reg->read(register('$a0'))) + $words*4)."\n";//debug
                       $word = $mem->read(
                           hexdec($reg->read(register('$a0')))
                           + $words*4);
                       for($i = 0; $i < 4; $i++) {
                           $ascii = (int) hexdec(substr($word,$i*2,2));
                           if ($ascii == 0) break(2);
                           else $temp .= chr($ascii);
                       }
                       $words++;
                   }
                   $output .=  $temp;
               } elseif (hexdec($reg->read('$v0')) == 5) {
                   if(count($userEntered)==$userEnteredVariablesRead)
                       throw new Exception("Program demands more user inputs!");
                   $reg->write('$v0', (int)trim($userEntered[$userEnteredVariablesRead]));
                   $output .= ((int)trim($userEntered[$userEnteredVariablesRead]))."\n";
                   $userEnteredVariablesRead++;
               } elseif (hexdec($reg->read('$v0')) == 0) {
                   $execute = false;
                   $output.="\n* Program execution complete *";
               } else {
                   throw new Exception("Unsupported syscall. \$v0: "
                       .$reg->read('$v0')." / ".hexdec($reg->read('$v0')));
               }
           } elseif($instr->type == TYPE_INVALID) {
               $execute = false;
           }

       }//try
       catch(Exception $e) {
           $execute = false;
           $debug .= "Failed simulation: ".$e->getMessage()." [program counter: 0x".dechex($pc)."]\n";
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
    <title>MIPS Simulator</title>
    <link rel="stylesheet" href="../base-files/css/third-party/normalize.css">
    <!--Import materialize.css-->
    <link rel="stylesheet" href="../base-files/css/third-party/materialize.min.css" type="text/css" media="screen,projection"/>
    <script src="../base-files/js/third-party/modernizr.js"></script>
    <!-- jQuery (necessary for Materialize) -->
    <script type="text/javascript" src="../base-files/js/third-party/jquery.js"></script>
  </head>
  <body>
    <div class="interactive" id="interactive-mips-simulator">
      <div class="row">
        <h2 class="center-align">MIPS Simulator</h2>
        <div class="col s12 l6">

          <h4>MIPS Simulator</h4>
          <p>Please enter MIPS assembly instructions from the assembly interactive to see output.</p>

          <?php print '<form action="'.$_ENV['SCRIPT_URL'].'" method="post">'; ?>

            <textarea name="memInput" id="mips_memInput" class="code"><?php
            print (
            (strlen($memInput) > 1)
            ? str_replace("\t", '   ',
            htmlentities($memInput))
            : str_replace("\t", '   ',
            htmlentities(''))
            );
            ?></textarea>

            <!-- Currently input box is hidden from user as we do not use this when teaching -->
            <!-- <h6>Input data, separated by newlines:</h6> -->

            <!-- <textarea name="keyInput" id="mips_keyInput" class="code"> -->
            <?php // print htmlentities((strlen($_POST['keyInput']) ? $_POST['keyInput'] : "")); ?>
            <!-- </textarea> -->

            <div class="row">
              <div class="col s12 l6">
                <p>
                  <input type="checkbox" name="debug_on" <?php print ($_POST['debug_on'] ? 'checked="checked" ' : ''); ?> id="checkdb" />
                  <label for="checkdb">Verbose/debug mode</label>
                </p>
              </div>

              <div class="col s12 l6">
                <p>
                  <input type="submit" name="simulate" value="Simulate Execution" class="btn btn-large btn-expand green" />
                </p>
                <p>
                  <?php print '<a href="'.$_ENV['SCRIPT_URL'].'" title="Clear input boxes" class="btn red">Start Over</a>'; ?>
                </p>
              </div>
            </div>
          </form>
        </div>
        <div class="col s12 l6">
          <?php if(strlen(trim($debug))) { ?>
          <h4>Debug Output</h4>
          <div class="code"><?php print nl2br(str_replace(array(' ',"\t"), array('&nbsp;','&nbsp;&nbsp;&nbsp;'), htmlentities($debug))); ?>
          </div>
          <?php
          }

          if (strlen($output)) { ?>
          <h4>Assembler Output</h4>
          <div class="code"><?php print nl2br(htmlentities($output)); ?>
          </div>
          <?php
          }
          ?>
        </div>
      </div>
      <div class="footer center-align">This MIPS simulator was created by <a href="https://github.com/alanhogan/miphps-mips-simulator">Alan J. Hogan</a> and is available under <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a></div>

      <style>
      /* Load style from CSS file */
      <?php include 'css/mips-simulator.css'; ?>
      </style>
    </div>
    <!-- Materialize responsive CSS -->
    <script type="text/javascript" src="../base-files/js/third-party/materialize.min.js"></script>
  </body>
</html>
