# Transport Layer Protocols - TCP and UDP

So far we have talked about HTTP and IRC.
These protocols are at a level that make sure you do not need to worry about how your data is being transported.
Now we’ll cover how your data is transferred reliably and efficiently, regardless of what the data is.
Below this level is an unreliable medium for transfer (such as wifi or cable, which are subject to interference errors) which causes a concern for data transportation.
These protocols take different approaches to ensure data is delivered in an effective and/or efficient manner.

## TCP

TCP (The Transmission Control Protocol) is one of the most important protocols on the internet.
It breaks large messages up into *packets*.
What is a packet?
A packet is a segment of data that when combined with other packets, make up a total message (something like a HTTP request, an email, an IRC message or a file like a picture or song being downloaded).
For the rest of the section, we’ll look at how these are used to load an image from a website.

So computer A looks the file and takes it, breaks it into packets.
It then sends the packets over the internet and computer B reassembles them and gives them back to you as the image, [which is demonstrated in this video](https://www.youtube.com/watch?v=ewrBalT_eBM).

By now you’re probably wondering why we bother splitting up packets… wouldn’t it be easier to send the file as a whole? Well, it solves congestion.
Imagine you’re in a bus, in rush hour and you have to be home by 5.
The road is jammed and there’s no way you and your friends are getting home on time.
So you decide to get out of the bus and go your own separate ways.
Web pages are like this too.
They are too big to travel together so they are split up and sent in tiny pieces and then reassembled at the other end.

So why don’t the packets all just go from computer A to computer B just fine?
Ha!
That’d be nice.
Unfortunately it’s not that simple.
Through various means, there are some problems that can affect packets.
These problems are:

- Packet loss
- Packet delay (packets arrive out of order)
- Packet corruption (the packet gets changed on the way)

So, if we didn’t try fix these, the image wouldn’t load, bits would be missing, corrupted or computer B might not even recognise what it is!

{image file-path="img/chapters/corrupted-image.jpg" alt="Corrupted Image"}

So, TCP is a protocol that solves these issues.
To introduce you to TCP, play the game below, called *Packet Attack*.
In the game, *you* are the problems (loss, delay, corruption) and as you move through the levels, pay attention to how the computer tries to combat them.
Good luck trying to stop the messages getting through correctly!

*Packet Attack* is a direct analogy for TCP and it is intended to be an interactive simulation of it.
The Packet Creatures are TCP segments, which move between two computers.
The yellow/gray zone is the unreliable channel, susceptible to unreliability.
That unreliability is the user playing the game.
Remember from the key problems of this topic on the transport level, we have delays, corruption and lost packets, these are the attacks; *delay*, *corrupt*, *kill*.
Solutions come in the form of TCP mechanisms, they are slowly added level by level.
Like in TCP, the game supports packet ordering, checksums (shields), Acks and Nacks (return creatures) and timeouts .

{panel type="teacher-note"}

# Packet Attack spoilers

**Level Overview**

- *Level 1*: No defences.
  One packet.
  Students can beat by using corrupt or kill.
- *Level 2*: Multiple Packets.
  10 packets.
  Students can’t stop all packets, but can corrupt and kill and delay for points.
- *Level 3*: Shields enabled.
  10 packets.
  Students can beat by using kill, but corrupt won’t work.
- *Level 4*: Numbering enabled.
  10 packets.
  Students can beat by using kill, corrupt, but delay won’t work.
- *Level 5*: Numbers and shields.
  10 packets.
- *Level 6*: Numbers and acknowledgments.
  Packets will be sent back and resent.
- *Level 7*: Numbers, shields, timeouts and acknowledgments.
  Packets will be sent back and resent.
  This level is not beatable.

{panel end}

{interactive slug="packet-attack" type="whole-page" text="Packet Attack interactive"}

{panel type="curiosity"}

# Creating your own levels in packet attack

You can also create your own levels in Packet Attack.
We’ve put a level builder in the projects section below so that you can experiment with different reliabilities or combination of defenses.

Adjust the trues, falses and numbers to set different abilities.
Raising the numbers will effectively equate to a less reliable communication channel.
Adding in more abilities (by setting shields etc to true) will make for a harder to level to beat.

{panel end}

Let’s talk about what you saw in that game.
What did the levels do to solve the issues of packet loss, delay (reordering) and corruption? TCP has several mechanisms for dealing with packet troubles.

{panel type="curiosity"}

# What causes delays, losses, and corruption?

Why do packets experience delays, loss and corruption?
This is because as packets are sent over a network, they go through various *nodes*.
These nodes are effectively different routers or computers.
One route might experience more interference than another (causing packet loss), one might be faster or shorter than another (causing order to be lost).
Corruption can happen at any time through electronic interference.

{panel end}

Firstly, TCP starts by doing what is known as a handshake.
This basically means the two computers say to each other: "Hey, we’re going to use TCP for this image.
Reconstruct it as you would".

Next is **Ordering**.
Since a computer can’t look at data and order it like we can (like when we do a jigsaw puzzle or play Scrabble™) they need a way to "stitch" the packets back together.
As we saw in *Packet Attack*, if you delayed a message that didn’t have ordering, the message may look like "HELOLWOLRD".
So, TCP puts a number on each packet (called a sequence number) which signifies its order.
With this, it can put them back together again.
It’s a bit like when you print out a few pages from a printer and you see "*Page 2 of 11*" on the bottom.
Now, if packets do become out of order, TCP will wait for all of the packets to arrive and then put the message together.

Another concept is **checksums**.
This concept of storing information about the data may be familiar from the [error control coding chapter]('chapters:chapter_section' 'coding-error-control' 'check-digits-on-product-barcodes').
Basically, a checksum can detect errors and sometimes with coding schemes, can correct them.
In the case of a correctable packet, it is corrected.
If not, the packet is useless and needs to be resent.
In the game, shields represent checksums.
Corrupt a checksum once, and it can recover from the error using error correction.
Corrupt it again and it can’t.

So how do packets get re-sent?
TCP has a concept of *acknowledgement* and *negative acknowledgement* messages (ACK and NACK for short).
You would have seen these in the higher levels of the game as the green (ACK) and red (NACK) creatures going back.
Acks are sent to let the sender know when a packet arrives and it is usable.
Nacks are sent back when a packet arrives and is damaged and needs resending.
ACKs and and NACKs are useful because they provide a channel *in the opposite direction* for communication.
If computer A receives a NACK, they can resend the message.
If it receives an Ack, the computer can stop worrying about a resend.

But does a computer send it again if it doesn’t hear back? Yes.
It’s called a timeout and it’s the final line of defense in TCP.
If a computer doesn’t get an ACK or a NACK back, after a certain time it will just resend the packet.
It’s a bit like when you’re tuning out in class, and the teacher keeps repeating your name until you answer.
Maybe that’s been you… woops.
Sometimes, an ACK might get lost, so the packet is resent after a timeout, but that’s OK, as TCP can recognise duplicates and ignore them.

So that’s TCP.
A protocol that puts accurate data transmission before efficiency and speed in a network.
It uses timeouts, checksums, acks and nacks and many packets to deliver a message reliably.
However, what if we don’t need all the packets? Can we get the overall picture faster? Read on…

## UDP

UDP (User Datagram Protocol) is a protocol for sending packets that does not guarantee delivery.
UDP doesn’t guarantee against lost packets, duplicate packets or out of order packets.
It just gets the bulk of the data there when it can.
Checksums are used for data integrity though, so they have some protection.
It’s still a protocol because it has a formal packet structure.
The packets still include destination and origin as well as the size of the packet.

So do we even use such an unreliable protocol? Yes, but not for anything too important.
Files, messages, emails, web pages and other text based items use TCP, but things like streaming music, video, VOIP and so on use UDP.
Maybe you’ve had a call on Skype that has been poor quality.
Maybe the video flickers or the sound drops for a split second.
That’s packets being lost.
However, you of course get the overall picture and the conversation you’re having is successful.
