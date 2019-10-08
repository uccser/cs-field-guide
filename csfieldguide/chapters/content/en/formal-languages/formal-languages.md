# Formal Languages

If you've ever written a text-based {glossary-link term="program"}program{glossary-link end} or typed a formula in a spreadsheet, chances are that at some stage the system has told you there's an error and won't even attempt to follow your instructions.

{interactive slug="python-syntax-error" type="in-page"}

These "{glossary-link term="syntax"}syntax{glossary-link end} errors" are annoying messages that programmers become excruciatingly familiar with... it means that they didn't follow the rules somehow, even if it's just a tiny mistake.
For example, suppose you intended to write:

```text
x = (a+b) * (c+d)
```

but you accidentally left out one of the brackets:

```text
x = (a+b) * c+d)
```

When you try to compile or run the program, the computer will tell you that there's an error.
If it's really helpful, it might even suggest where the error is, but it won't run the program until you fix it.

This might seem annoying, but in fact by enforcing precision and attention to detail it helps pinpoint mistakes before they become bugs in the program that go undetected until someone using it complains that it's not working correctly.
