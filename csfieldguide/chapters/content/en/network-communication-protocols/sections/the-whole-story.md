# The whole story!

Let’s say I want to write an online music player.
Okay, so I write the code for someone to press play on a website and the song plays.
Do I now need to code up the protocol that streams the music?
Fine, I write some UDP code.
Now, do I need to go install the cables in your house?
Sure, I jump in my van and spend a few weeks running cable to your house and make sure the packets can get over too.

No.
This sounds absurd.
As a web developer, I don’t want to worry about anything other than making my music player easy to use and fast.
I *don’t* want to worry about UDP and I *don’t* want to worry about ethernet or cables.
It’s already done, I can assume it’s taken care of.
And it is.

Internet protocols exist in layers.
We have four such layers in the computer science internet model.
The top two levels were discussed before in detail, the bottom two we won’t focus on.
The first layer is the Application layer, followed by the Transport, Internet and Link layers.

At each layer, data is made up of the previous layers’ whole unit of data, and then *headers* are added and passed down.
At the bottom layer, the Link layer, a *footer* is added also.
Below is an example of what a UDP packet looks like when it’s packaged up for transport.

{panel type="jargon-buster"}

# Headers and footers

Footers and Headers are basically packet *meta-data*.
Information about the information.
Like a letterhead or a footnote, they’re not part of the content, but they are on the page.
Headers and Footers exist on packets to store data.
Headers come before the data and footers afterwards.

{panel end}

{interactive slug="udp-layers" type="in-page"}

You can think of these protocols as a game of pass the parcel.
When a message is sent in HTTP, it is wrapped in a TCP header, which is then wrapped in an IPv6 header, which is then wrapped in a Ethernet header and footer and sent over ethernet.
At the other end, it’s unwrapped again from an ethernet *frame*, back to a IP *packet*, a TCP *segment*, to a HTTP *request*.

{panel type="curiosity"}

# What is a packet?

The name packet is a generic term for a unit of data.
In the application layer units of data are called *data* or *requests*, in the transport layer, *datagram* or *segments*, in the Network/IP layer, *packet* and in the physical layer, a *frame*.
Each level has its own name for a unit of data (segment, packet, frame, request etc), however the more generic "packet" is often used instead, regardless of layer.

{panel end}

This system is neat because each layer can assume that the layers above and below have guaranteed something about the information, and each layer (and protocol in use at that layer) has a stand-alone role.
So if you’re making a website you just have to program website code, and not worry about code to make the site work over wifi as well as ethernet.
A similar system is in the postal system, you don’t put the courier’s truck number on the front of the envelope!
That’s taken care of by the post company, which then uses a system to sort the mail and assign it to drivers, and then drivers to trucks, and then drivers to routes… none of which you need to worry about when you send or receive a letter or use a courier.

{panel type="curiosity"}

# The OSI model vs the TCP/IP model

The OSI model of the internet is different from the TCP/IP model that Computer Scientists use to approach protocol design.
OSI is considered and probably mentioned in the networking standards but this guide will use the computer science approach because it is simple.
The main idea of layers of abstraction is more important.
You can read more about the differences [here](https://en.wikipedia.org/wiki/Internet_protocol_suite#Comparison_of_TCP.2FIP_and_OSI_layering).

{panel end}

So what does a TCP segment look like?

{interactive slug="tcp-segment" type="in-page"}

A packet is divided into four main parts:

- Two 16 bit addresses (source, destination)
- Two 32 bit numbers (sequence number, ACK number if it’s an acknowledgement)
- Between 64 and 384 bits worth of flags and options
- And the actual data

At each level, the *data* is the entirety of the previous level segment, which includes its own header and data.

TCP and UDP packets have a number saying how big they are.
This number means that the packet can actually be as big as you like.
Can you think of any advantages of having small packets.
How about big ones.
Think about the ratio of data to information (such as those in the header and footer).

{panel type="curiosity"}

# What does a packet trace look like?

Here’s an example of a packet trace on our network [(using tcpdump on the mac)](http://support.apple.com/kb/HT3994)

```text
00:55:18.540237 b8:e8:56:02:f8:3e > c4:a8:1d:17:a0:d3, ethertype IPv4 (0x0800), length 100: (tos 0x0, ttl 64, id 41564, offset 0, flags [none], proto UDP (17), length 86)
  192.168.1.7.51413 > 37.48.71.67.63412: [udp sum ok] UDP, length 58
0x0000:  4500 0056 a25c 0000 4011 aa18 c0a8 0107
0x0010:  2530 4743 c8d5 f7b4 0042 1c72 6431 3a61
0x0020:  6432 3a69 6432 303a b785 2dc9 2e78 e7fb
0x0030:  68c3 81ab e28b fde3 cfef ae47 6531 3a71
0x0040:  343a 7069 6e67 313a 7434 3a70 6e00 0031
0x0050:  3a79 313a 7165

```

{panel end}
