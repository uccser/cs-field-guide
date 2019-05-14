# Check digits on barcodes and other numbers

You probably wouldn’t be very happy if you bought a book online by entering the ISBN (International Standard Book Number), and the wrong book was sent to you, or if a few days after you ordered it, you got an email saying that the credit card number you entered was not yours, but was instead one that was one digit different and another credit card holder had complained about a false charge.
Or if you went to the shop to buy a can of drink and the scanner read it as being a more expensive product.
Sometimes, the scanner won’t even read the barcode at all, and the checkout operator has to manually enter the number into the computer — but if they don't enter it exactly as it is on the barcode you could end up being charged for the wrong product.
These are all examples of situations that error control coding can help prevent.

Barcode numbers, credit card numbers, bank account numbers, ISBNs, national health and social security numbers, shipping labels (serial shipping container codes, or SSCC) and tax numbers all have error control coding in them to help reduce the chance of errors.
The last digit in each of these numbers is a check digit, which is obtained doing a special calculation on all the other digits in the number.
If for example you enter your credit card number into a web form to buy something, it will calculate what the 16th digit should be, using the first 15 digits and the special calculation (there are 16 digits in a credit card number).
If the 16th digit that it expected is not the one you entered, it can tell that there was an error made when the number was entered and will notify you that the credit card number is not valid.

In this section we will be initially looking at one of the most commonly used barcode number formats used on most products you buy from supermarkets and other shops.
 We will then be having a look at credit card numbers.
You don’t have to understand *why* the calculations work so well (this is advanced math, and isn’t important for understanding the overall ideas), and while it is good for you to know what the calculation is, it is not essential.
So if math is challenging and worrying for you, don’t panic too much because what we are looking at in this section isn’t near as difficult as it might initially appear!

## Check digits on product barcodes

Most products you can buy at the shop have a barcode on them with a 13 digit "global trade item number" (referred to as GTIN-13).
The first 12 digits are the actual identification number for the product, the 13th is the check digit calculated from the other 12.
Not all barcodes are GTIN-13, there are several other types around.
However, if the barcode has 13 numbers in it, it is almost certainly GTIN-13.

{image file-path="img/chapters/isbn-barcode.png" alt="An image of a 13 digit barcode"}

The last digit of these numbers is calculated from the first 12.
This is very closely related to the parity bit that we looked at above, where the last bit of a row is "calculated" from the preceding ones.
With a GTIN-13 code, we want to be able to detect if one of the digits might have been entered incorrectly.

The following interactive checks GTIN-13 barcodes.
Enter the first 12 digits of a barcode number into the interactive, and it will tell you that the last digit should be!
You could start by using the barcode number "9 300675 036009".

{interactive slug="checksum-calculator-gtin-13" type="in-page"}

{panel type="teacher-note"}

# Getting more barcodes

You could bring various packaging that has barcodes on it for the class to evaluate, or bring in photos of barcodes.

{panel end}

What happens if you make a mistake when you type in the 12 digits (try changing one digit)?
Does that enable you to detect that a mistake was made?

{panel type="teacher-note"}

# Solution

If only one digit is changed, the check digit will always be incorrect, and the error will be detected.

{panel end}

Have a look for another product that has a barcode on it, such as a food item from your lunch, or a stationery item.
Note that some barcodes are a little different — make sure the barcodes that you are using have 13 digits (although you might like to go and find out how the check digit works on some of the other ones).
Can the interactive always determine whether or not you typed the barcode correctly?

One of the following product numbers has one incorrect digit.
Can you tell which of the products has had its number typed incorrectly?

- 9 400550 619775
- 9 400559 001014
- 9 300617 013199

{panel type="teacher-note"}

# Solution

The last code has a typo in it; it should have been 9 300617 003199.
Students should be able to detect that it is incorrect, but it isn't possible to work out what the correct value is.

{panel end}

If you were scanning the above barcodes in a supermarket, the incorrect one will need to be rescanned, and the system can tell that it's a wrong number without even having to look it up.
Typically that would be caused by the bar code itself being damaged (e.g. some ice on a frozen product making it read incorrectly).
If an error is detected, the scanner will usually make a warning sound to alert the operator.

You could try swapping barcode numbers with a classmate, but before giving them the number toss a coin, and if it's heads, change one digit of the barcode before you give it to them.
Can they determine that they've been given an erroneous barcode?

If one of the digits is incorrect, this calculation for the check digit will produce a different value to the checksum, and signals an error.
So single digit errors will *always* be detected, but what if two digits change — will that always detect the error?

{panel type="teacher-note"}

# Solution

If two digits are changed, the error may go undetected; for example, changing 9 400559 001014 to 6 500559 001014 will still produce a checksum of 4, and appear to match.
However, it's unlikely that two errors will counteract like this (students can investigate how often that will happen).

{panel end}

What if the error is in the checksum itself but not in the other digits - will that be detected?

{panel type="teacher-note"}

# Solution

Some students might worry that there will be a problem if the checksum changes, but of course if it is typed in incorrectly, it won't match the sum for the other digits, and the error will be detected.

{panel end}

## How do check digits protect against common human errors?

People can make mistakes when they enter numbers into computers, and even barcode scanners can get a digit wrong.
Check digits attempt to detect when an error has occurred and notify the computer and/or person of it.
Suppose you give your cellphone number to a friend so that they can contact you later.
To ensure that you told them the number correctly, you may get them to text you immediately to confirm (and so that you have their number too).
If you don’t get the text you will probably double check the number and will find that your friend made an error, for example they got a digit wrong or they reversed 2 digits next to one another.
Mistakes happen, and good systems prevent those mistakes from having annoying or even serious consequences.
If a check digit is being used, there is a good chance that the error will be detected when the check digit is not what the computer expects it to be.

Some of the really common errors are:

- Getting one digit wrong (substitution)
- Swapping two digits that are adjacent (transposition)
- Missing a digit
- Adding a digit

The last two will be picked up from the expected length of the number; for example,a GTIN-13 has 13 digits, so if 12 or 14 were entered, the computer immediately knows this is not right.
The first two depend on the check digit in order to be detected.
Interestingly, all one digit errors will be detected by common checksum systems, and *most* transpositions will be detected (can you find examples of transpositions that aren’t detected, using the interactive above?)

There are also some less common errors that people make

- Getting a digit wrong in two or more different places
- Doubling the wrong digit, e.g. putting 3481120 instead of 3481220
- Muddling 3 digits, e.g. 14829 instead of 12489
- Phonetic errors are possible when the number was read and typed by somebody listening (or reading the number to themselves as they type it).
  For example, "three-forty" (340) might be heard as "three-fourteen" (314), and numbers like 5 and 9 can sound similar on a bad phone line.

Experiment further with the interactive.
What errors are picked up?
What errors can you find that are not?
Are the really common errors nearly always picked up?
Can you find any situations that they are not?
Try to find examples of errors that are detected and errors that are not for as many of the different types of errors as you can.

{panel type="teacher-note"}

# Likely errors

Students may be tempted to do things like reverse all the digits, or completely rearrange them and show that the check digit remains the same and then claim it is a limitation of the algorithm, but this is not a good evaluation.
They need to think about the algorithm under normal usage, e.g. a cashier entering a barcode number into a computer, a nurse entering an ID number of a patient, or somebody buying something online and entering their credit card number, and the errors they could realistically be expected to make.
The errors listed above cover a good range, although they might think of more.
Of course it is more important that the really common errors are picked up, but nice if the less common but still plausible ones are too.
But remember that it would be more of an issue for the algorithm if it could not detect 1 digit being changed than if it could not detect 3 being changed for example.

The main errors that this system will pick up best are single digit typos and swapping two adjacent digits.
It will be more a matter of chance for other types of errors.

Dyslexia and related problems could be an interesting issue to consider, although it needs to be kept in proportion since most people are not dyslexic.

{panel end}

{panel type="teacher-note"}

# Writing an error detection program

Getting students to write a program to calculate checksums is a good programming exercise.
It can be made simple by having each digit entered separately, or part of the exercise could be to separate the digits.
It's also not hard to create a spreadsheet to do these calculations.

{panel end}

## How is the check digit on product barcodes calculated?

The first 12 digits of the barcode represent information such as the country origin, manufacturer, and an identifier for the product.
The 13th digit is a check digit, it is calculated from the first 12 digits.
It is calculated using the following algorithm (also, see the example below).

- Multiply every second digit (starting with the second digit) by 3, and every other digit by 1 (so they stay the same).
- Add up all the multiplied numbers to obtain the *sum*.
- The check digit is whatever number would have to be added to the sum in order to bring it up to a multiple of 10 (i.e. the last digit of the sum should be 0).
  Or more formally, take the last digit of the sum and if it is 0, the check digit is 0.
  Otherwise, subtract the last digit from 10 to obtain the check digit.

Let's look at an example to illustrate this algorithm.
We want to confirm that the check digit that was put on the barcode of a bottle of cola was the correct one.
Its barcode number is 9300675032247.
The last digit, 7, is the check digit.
So we take the first 12 digits and multiply them by 1 or 3, depending on their positions (9x1+3x3+0x1+0x3+6x1+7x3+5x1+0x3+3x1+2x3+2x1+4x3).
We then add up all the multiplied numbers, obtaining a sum of 73.
We want to add the check digit that will bring the sum up to the nearest multiple of 10, which is 80.
This number is 7, which is indeed the check digit on the cola bottle’s barcode.

The following interactive can be used to do the calculations for you.
To make sure you understand the process, you need to do some of the steps yourself; this interactive can be used for a wide range of check digit systems.
To check a GTIN-13 number, enter the first 12 digits where it says "Enter the number here".
The multipliers for GTIN-13 can be entered as "131313131313" (each alternating digit multiplied by 3).
This will give you the products of each of the 12 digits being multiplied by the corresponding number.
You should calculate the total of the products (the numbers in the boxes) yourself and type it in.
Then get the remainder when divided by 10.
To work out the checksum, you should calculate the digit needed to make this number up to 10 (for example, if the remainder is 8, the check digit is 2).
If the remainder is 0, then the check digit is also 0.

{interactive slug="checksum-calculator" type="in-page"}

{comment Insert GTIN-13 diagram here}

Try this with some other bar codes.
Now observe what happens to the calculation when a digit is changed, or two are swapped.

The algorithm to check whether or not a barcode number was correctly entered is very similar.
You could just calculate the check digit and compare it with the 13th digit, but a simpler way is to enter all 13 digits.

Multiply every second digit (starting with the second digit) by 3, and every other digit by 1.
This includes the 13th digit, which is multiplied by 1.
Add up all the multiplied numbers to obtain the *total*.
If the last digit of the sum is a 0, the number was entered correctly.
(That's the same as the remainder when divided by 10 being 0).

{panel type="curiosity"}

# Working out a checksum in your head

For 13-digit barcodes, a quick way to add up a checksum that can be done in your head (with some practice) is to separate the numbers to be multiplied by 3, add them up, and then multiply by 3.
For the example above (9300675032247) the two groups are 9+0+6+5+3+2+7 = 32 and 3+0+7+0+2+4= 16.
So we add 32 + 16x3, which gives the total of 80 including the check digit.

To make it even easier, for each of the additions you only need to note the last digit, as the other digits will never affect the final result.
For example, the first addition above begins with 9+0+6, so you can say that it adds up to 5 (rather than 15) and still get the same result.
The next digit (5) takes the sum to 0, and so on.
This also means that you can group digits that add to 10 (like 1 and 9, or 5 and 5), and ignore them.
For example, in the second group, 3+0+7 at the start adds up to 0, and the only sum that counts is 2+4, giving 6 as the total.

Finally, even the multiplication will be ok if you just take the last digit.
In the example above, that means we end up working out 6x3 giving 8 (not 18); the original was 16x3 giving 48, but it's only the final digit (8) that matters.

All these shortcuts can make it very easy to track the sum in your head.

{panel end}

{panel type="teacher-note"}

# Checking compared with calculating

Students should be able to recognise the relationship between the two algorithms (calculating the number compared with adding all 13 digits to do a check).
Because the 13th digit is in an odd numbered position, it is multiplied by 1 in the second algorithm before being added to the total.
Because the check digit was chosen so that it would make the last digit of the sum up to a multiple of 10 (which always ends with 0), it makes sense that a number in the second algorithm was correctly entered its sum also ends in 0.

{panel end}

{panel type="extra-for-experts"}

# Why does this algorithm work so well?

In order to be effective, the algorithm needs to ensure the multiplied digits will not add up to a multiple of 10 any more if the digits are changed slightly.
The choice of multipliers affects how likely it is to detect small changes in the input.
It's possible to analyse these mathematically to work out what sorts of errors can be detected.

The check digit on barcodes is described in the chapter on [error control coding]('chapters:chapter' 'coding-error-control').
Basically every second digit is multiplied by 3, and the sum of these multiples are added to the remaining digits.

Let's look at some smaller examples with 5 digits (4 normal digits and a check digit), as the same ideas will apply to the 13 digit numbers.

If we need a check digit for 8954, we would calculate (8x1)+(9x3)+(5x1)+(4x3)=52, and in order to bring this up to 60, we need to add 8.
This makes the full number 89548.

The first thing we should observe is that only the ones column (last digit) of each number added have any impact on the check digit.
8+27+5+12=52, and 8+7+5+2=22 (only looking at the last digit of each number we are adding).
Both these end in a 2, and therefore need 8 to bring them up to the nearest multiple of 10.
You might be able to see why this is if you consider that the "2" and "1" were cut from the tens column, they are equal to 10+20=30, a multiple of 10.
Subtracting them only affects the tens column and beyond.
This is always the case, and therefore we can simplify the problem by only adding the ones column of each number to the sum.
(This can also be used as a shortcut to calculate the checksum in your head).

*Protection against single digit errors*

Next, let's look at why changing *one* digit in the number to another digit will *always* be detected with this algorithm.
Each digit will contribute a number between 0 and 9 to the sum (remember we only care about the ones column now).
As long as changing the digit will result in it contributing a different amount to the sum, it becomes impossible for it to still sum to a multiple of 10.
Remember that each digit is either multiplied by 1 or 3 before its ones column is added to the sum.

A number being multiplied by 1 will always contribute itself to the sum.
If for example the digit was supposed to be 9, no other single digit can contribute 9 to the sum.
So those multiplied by 1 are fine.

But what about those multiplied by 3?
To answer that, we need to look at what each different digit contributes to the sum when multiplied by 3.

- 1 -> 3
- 2 -> 6
- 3 -> 9
- 4 -> 2 (from 1*2*)
- 5 -> 5 (from 1*5*)
- 6 -> 8 (from 1*8*)
- 7 -> 1 (from 2*1*)
- 8 -> 4 (from 2*4*)
- 9 -> 7 (from 2*7*)
- 0 -> 0

If you look at the right hand column, you should see that no number is repeated twice.
This means that no digit contributes the same amount to the sum when it is multiplied by 3!

Therefore, we know that all single digit errors will be detected.

*Protection against swapping adjacent digit errors*

Seeing why the algorithm is able to protect against most swap errors is much more challenging.

If two digits are next to one another, one of them must be multiplied by 1, and the other by 3.
If they are swapped, then this is reversed.
For example, if the number 89548 from earlier is changed to 8*59*48, then (5x3)+(9x1)=24 is being added to the total instead of (9x3)+(5x1)=32.
Because 24 and 32 have different values in their ones columns, the amount contributed to the total is different, and therefore the error will be detected.

But are there any cases where the totals will have the same values in their ones columns?
Another way of looking at the problem is to take a pair of rows from the table above, for example:

- 8 -> 4
- 2 -> 6

Remember that the first column is how much will be contributed to the total for digits being multiplied by 1, and the second column is for those being multiplied by 3.
Because adjacent digits are each multiplied by a different amount (one by 3 and the other by 1), the numbers diagonal to each other in the chosen pair will be added.

If for example the first 2 digits in a number are "28", then we will add 2+4=6 to the sum.
If they are then reversed, we will add 8+6=14, which is equivalent to 4 as again, the "10" part does not affect the sum.
8+6 and 2+4 are the diagonals of the pair!

- *8* -> **4**
- **2** -> *6*

So the question now is, can you see any pairs where the diagonals would add up to the same value?
There is one!

*Protection against twin errors*

A twin error is where a digit that is repeated twice in a number is changed to a different digit that is repeated twice.
For example, if we have "22" in the number, somebody might somehow change it to "88".

When two numbers are side by side, one is multiplied by 3 and the other by 1.
So the amount contributed to the total is the sum of the number’s row in the above table.
For example, 2 has the row "2->6".
This means that 2+6=8 will be contributed to the sum as a result of these two digits.

If any rows add up to the same number, this could be a problem.
Where the sum was over 10, the tens column has been removed.

- 1 -> 3 adds to "4"
- 2 -> 6 adds to "8"
- 3 -> 9 adds to "2"
- 4 -> 2 adds to "6"
- 5 -> 5 adds to "0"
- 6 -> 8 adds to "4"
- 7 -> 1 adds to "8"
- 8 -> 4 adds to "2"
- 9 -> 7 adds to "6"
- 0 -> 0 adds to "0"

Some of the rows add up to the same number!
Because both 4 and 9 add up to 6, the error will not be detected if "44" changes to "99" in a number!

Rows that do not add will be detected.
From the example above, if 22 changes to 88, this will be detected because 22’s total is 8, and 88’s total is 2.

*An error that is never detected*

Another error that people sometimes make is the jump transposition error.
This is where two digits that have one digit in between them are swapped, for example, 812 to 218.

A pair of numbers that are two apart like this will always be multiplied by the same amount as each other, either 1 or 3.
This means that the change in position of the numbers does not affect what they are multiplied by, and therefore what they contribute to the sum.
So this kind of error will never be detected.

{panel end}

{panel type="project"}

# Project with check sums

The following interactive will generate random numbers of a chosen type (e.g. ISBN numbers for books).
These numbers are random, and are not based on numbers for actual books (or bank accounts!)
This means that you can do this project without having to ask people for their personal information such as credit card numbers (in fact, they shouldn't give you this information anyway!)

Although the numbers from this interactive are random, their check digits are calculated using the appropriate method, so you can use them as examples for your project.
Actually, not all of them will be correct, so one of your challenges is to figure out which are ok!

{interactive slug="number-generator" type="in-page"}

Your project is to choose a checksum other than the 13-digit barcodes, and research how it is calculated (they all use slightly different multipliers).
You should demonstrate how they work (using the following interactive if you want), and find out which of the numbers generated are incorrect.

ISBN-10 is particularly effective, and you could also look into why that is.

{interactive slug="checksum-calculator" type="iframe"}

{panel end}
