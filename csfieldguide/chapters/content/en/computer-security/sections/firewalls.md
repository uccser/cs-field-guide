# Firewall

A firewall is another important defensive measure that has been used in network security for over 25 years.
A firewall establishes a barrier between secured and controlled internal networks that can be trusted, and untrusted outside networks, such as the Internet.
All the network traffic for an organisation goes through them, so there’s a tradeoff between spending time detecting bad traffic, and not slowing down legitimate operations.

The firewall decides whether to allow or block specific traffic based on a defined set of security rules.
The firewall could be as simple as software running on one computer, to an array of specialised computers protecting a large organisation.
The firewall needs to respond very quickly, detecting and rejecting suspicious looking data traffic, but still passing through the large amounts of normal traffic.

Corporate firewalls can easily be receiving 24% of traffic that is from bad bots (scripts that are written to try and break into a system); making a decision to block this traffic can easily accidently impact the 13% of traffic from good bots (like those that index the internet for search engines), or 63% of traffic from real humans (these numbers are from [imperva.com](https://www.imperva.com/blog/bad-bot-report-2020-bad-bots-strike-back/)).
One form of “denial of service” (DOS) attack is to send so many requests to a firewall that it can’t keep up, which means that even legitimate users wanting to view a company web page or access their own data get their requests blocked because the firewall is too busy.
Sometimes companies have accidentally started what looks like a DOS attack by advertising something that gets many more people than usual looking at their website; the net effect is that the potential new customers see the website as being very slow, or not working at all, and the advertising campaign backfires.

In terms of the CIA triad, the challenge of a firewall is to avoid blocking legitimate users, but also to avoid letting in those with bad intentions.
This needs to be done for all data coming into the system.
A firewall can check where the data is coming from (and to), but if a hacker has taken over people’s home computers, then the bad traffic could be coming from previously trusted sources.
So the firewall needs to check what is being requested, and see if there are patterns in the requests that match common forms of attack.
Doing this requires fast algorithms to check the internet traffic.

Malicious attacks can be identified in several ways; for example, requests from outside are addressed to a “port”, which is a number that indicates what kind of service is being sought.
Requesting a web page (e.g. when “HTTP” is in a URL) generally uses port 80, a secure web page (HTTPS) uses port 443, and routing some email (SMTP) is usually on port 25.
Requests to ports that aren’t used by the company can be a symptom that someone is looking for an insecure port, and should be blocked.
A common example is requesting a file transfer through port 20, which uses an outdated method called FTP; such requests need to be blocked because of known security flaws.
The “P” in each of the acronyms just used stands for “protocol”, and these are discussed more thoroughly in the chapter on [Network Communication Protocols]('chapters:chapter' 'network-communication-protocols').
There are many other checks that can be done on incoming traffic; for example, a firewall may also detect incoming data that looks like it contains malware.

Firewalls also need to monitor outgoing traffic.
They might block someone inside an organisation from accidentally accessing a malicious site, or sending out information that they shouldn’t, either deliberately or accidentally.
For this reason, employees sometimes see their workplace as a very unfriendly environment for internet access, but this is all part of the tradeoff between availability and confidentiality.

A key role of a firewall is to separate an organisation’s own network from the publicly accessible internet.
Other forms of separating networks include having a “Virtual Local Area Network” (VLAN), where the same physical network equipment is used in an organisation for different purposes (such as accessing databases and making VOIP phone calls), but the traffic on the network is separated by tagging the data and treating differently tagged data as if it is on a separate network.
Another way that internal and external access can be separated is having some services available in a “demilitarized zone” (DMZ), which is an isolated part of an organisation’s network that contains key services that need to be accessed externally (such as email and web pages), but isn’t part of the sensitive internal network that can access all of the organisation's information.

{panel type="exercise"}
