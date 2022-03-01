# Non-terminal

In a grammar, a non-terminal is a symbol that needs to be replaced using a production in order to get the final string that the grammar is producing.
Generally a non-terminal is written in upper case letters, but they can also be identified because they appear on the left side of a production in a context-free grammar.
For example, in the production S -> aaBbb, the "a" and "b" are terminals, and the "S" and "B" are non-terminals. In a programming language, the non-terminal could be things like "IF_STMT" or ""COMPOUND_STMT", which would be replaced with the terminals for these statements (e.g. "IF_STMT" would eventually be replaced with terminals like "if" and "else").
