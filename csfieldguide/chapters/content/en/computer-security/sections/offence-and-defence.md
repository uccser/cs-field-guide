# Offence and defence

Like many team sports, looking after security involves both defensive and offensive tactics.
For example, protecting authentication is one of the harder and most important jobs you can have when defending a system.
To defend it, you might log all the requests and where they come from, alert yourself and systems administrators when there have been a lot of failed attempts, and provide users the options to use more 2-factor authentication (such as giving and password and entering a code sent to another device that they own) to prove who they are.
You can offensively protect users by encouraging users to use a different password if the one they are trying to use is easy to guess or has come up before in other system breaches, or you might hunt down websites that are hosting a login page that looks like yours (a phishing page) so you can actively take it down.

A lot of the security measures that you’ll come across are defensive: setting up firewalls, making sure users have strong passwords and use multi-factor authentication, placing limits on the resources that someone online can tie up and so on.
But offensive security is also important.

In the physical world, buildings are secured with locks.
Locksmiths can be called to pick or break the lock if you get locked out.
They need to know the skills of bypassing locks in case of emergencies.
You might see some people picking a lock, and it could be a thief, or it could be a locksmith.
It’s the same in the digital world - it might seem hard to distinguish between someone researching security weaknesses for good or bad reasons - they are both looking for security weaknesses that could be exploited.
The difference is that the “good” hacker is intent on fixing any holes that they find in the system before someone else finds them, whereas a “malicious” hacker is looking for ways to exploit security weaknesses that benefit themselves or could be used to cause harm.
There are contractors that can be hired by a company to test the security of their systems and provide recommendations on how the security can be improved.
These tests are called “penetration tests”, “security audits”, “offensive security exercises”, or “red team exercises”.
Of course, if you hire someone to attack your system, you need to have very good agreements in place so that if they break in, they won’t get into trouble, and they will know what to do if they access any sensitive information.
Some companies even offer “bug bounties”, to encourage good hackers outside the company to do testing for them e.g. [Discord's Bug Bounty](https://discord.com/security).

“Good” hackers, or professionals who specialise in offensive security are sometimes referred to as “Whitehat hackers”, and “bad” hackers or security researchers acting maliciously are sometimes called “Blackhat hackers,” although many in the industry are moving away from these terms due to the connotation that black is bad and white is good.

Offensive security also involves setting traps for hackers.
One simple idea is to set up what is called a “honeypot”, which could be something like a section of a website that appears to have weak security and looks like a great target for attackers.
This serves to distract the attacker from the rest of your system, and can help to gather data about attackers, which could be used to block them from other parts of the system, or even be used to track them down.

In general, offensive security uses “annoyance, attribution and attack”.
The annoyance is done by setting up honeypots or other decoys in the system that lures an attacker, hopefully wasting their time.
Since attacks are often done by running programs that try to find weaknesses, keeping the attacker’s programs busy following false leads is a good way to frustrate their work.
Attribution is trying to identify the attacker by having them engage with your system in a way that reveals where they are located or what their goals are.
With sufficient information gathered (including possibly tricking them into uploading data that triggers their own systems to send information to you), it may even be possible to attack them in return!
However, as in the physical world, you aren’t allowed to break the law in order to attack a criminal, and bear in mind that it’s possible that the apparent criminal is just a customer or employee who has a mistake!

Generally security analysts don’t try to track down attackers, but focus on learning what attackers are trying to do, and defending from their attacks.
Attribution of the source of an attack is very hard, and in most cases it is not necessary - the balance between offensive and defensive strongly favors offensive.
From a defender’s point of view, you have limited time and resources, and finding the source of an attack is expensive and not worth the effort when you could redirect it to actual protection.
Organisations tend to leave attribution up to forensic and police experts - and even then, experts with the resources of large governments can get it wrong!
Incidentally, there is a strong demand for security forensic experts for law enforcement; crimes commonly involve computers, even if it is just emails or text messages to plan a physical break-in, and law enforcement need people with security expertise to investigate incidents.

[This video](https://www.youtube.com/watch?v=le71yVPh4uk) documents an example of a security expert who did chase down the attribution of an attack.
The presenter has gone to some effort to track back a hacker, to the point that they could even watch the hackers on their own security cameras!
This isn’t a normal application of offensive security, but see if you can identify the  “annoyance, attribution and attack” by this white hat hacker.

{panel type="teacher-note"}

# Ethics of the video

The above video gives us a view of one kind of cybercriminal that isn’t based on fictional movies or media stereotypes.
You could discuss the ethics of this video - did the person break the law?
Should they be allowed to harass the scammers?
Why were so many details required to be blurred out?

{panel end}

{panel type="additional-information"}

# Who are the actors?

Security involves a range of “actors” (that’s a technical term!) and the “bad actors” have a variety of motivations, and can even include people who are on your side making mistakes!

A **threat actor** or **malicious actor** is a person or entity responsible for an event or incident that impacts, or has the potential to impact, the safety or security of another entity.

The different types of threat actors could be:

**Internal:**

> This could be users who intentionally or unintentionally make mistakes or breach policies; or administrators who take advantage of their higher level of authorisation.

**External:**

> Advanced external attacks include organized crimes, terrorists, state-sponsored attacks, “Advanced Persistent Threat” groups that infiltrate a system and remain undetected for a long time, or other government or politically motivated attackers.
>
> Less resourced attacks can be initiated by activists or “hacktivists” who are trying to fight for something or against something their target is associated with in the belief that it is a good cause, such as removing blocks to internet access, or protesting organisations or laws that they see as unfair.
> Less skilled external attacks include “Script kiddies” (people who copy and paste code or techniques from others without fully understanding what they are doing).

{panel end}
