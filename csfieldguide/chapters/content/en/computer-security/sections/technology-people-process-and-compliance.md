# Technology, people, process and compliance

When you are considering computer security, you can identify problems by thinking about the different key elements of a computer system.
For example, most digital systems can be broken down into:

- Technology - the software and hardware in a system including networks,
- People - the users, including staff, customers and decision makers,
- Process - how the system should be used by the people, and
- Compliance - how you make sure that everyone follows the rules.

Using this view, security experts can implement a layered *defence* approach to cybersecurity (for further reading, see [A Layered Approach to Cybersecurity: People, Processes, and Technology](https://www.csoonline.com/article/3326301/a-layered-approach-to-cybersecurity-people-processes-and-technology.html)).
Examples of what might come up under each of these elements are:

- **Technology**: often the same software is used on many computers, so if a weakness is found in a system, it could be used to attack all sorts of organisations.

    - This is why security updates and patches are distributed after a weakness is found, and computers that aren’t updated become a target if an attacker knows the weakness that required the update.
    - When a vulnerability is found, generally a [Common Vulnerabilities and Exposures](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures) (CVE) identification number is assigned, and a patch is released (you can find examples [here](https://msrc.microsoft.com/update-guide/vulnerability) and [here](https://www.cve.org/)).
    If people or organisations don’t install updates (which frequently contain security patches) then they are running vulnerable software.
    Attackers always check the versions of whatever is running on a target’s system.
    They can then quickly look up vulnerabilities that exist for those specific versions and use tools to exploit those vulnerabilities.
    It is important to install updates because it drives up the time and cost for attackers.
    - Many attackers know that people and organisations run software that is out of date.
    Malicious actors will create campaigns based on specific weaknesses and will target any system that has these weaknesses.
    - For example, the [Wannacry malware](https://en.wikipedia.org/wiki/WannaCry_ransomware_attack) used known vulnerabilities in old Windows systems.
    If these systems had been updated, this malware would not have been able to cause as much devastation as it did.
    - Another example includes your web browser - have you ever noticed a Chrome browser telling you to update your browser?
    These can include critical security patches that have been discovered - these need to be patched with high urgency.
    For example, [this bug fix](https://chromereleases.googleblog.com/2020/10/stable-channel-update-for-desktop_20.html) also reports bounties that have been paid to people who have reported relevant bugs, and indicates that the actual bugs won’t be disclosed publicly until people have had time to do updates so that malicious actors can’t take advantage of them.
    (There’s more information about this [here](https://sites.google.com/a/chromium.org/dev/Home/chromium-security).)
    - Likewise, if a particular technology is known to be effective then it should be used - for example, Transport Layer Security (TLS) is widely used for secure communication on the Internet.
    - Other examples include [Hardware-enhanced Endpoint Security](https://www.intel.com/content/www/us/en/business/enterprise-computers/hardware-security.html) and [equipment destruction attacks](https://searchitoperations.techtarget.com/definition/hardware-security).

- **People**: can be the most unpredictable weakness in a system, and are vulnerable to “social engineering”.

    - As social creatures, humans require trust to peacefully live together.
    But this is in direct conflict with strong security.
    We have all sorts of “weaknesses,” from being overly helpful to being forgetful.
    Malicious actors will attempt to exploit human trust as the first stage in an attack, whether this is holding a coffee cup while talking on the phone near a door hoping to get let in, or sending a friendly email with a malicious document attached.
    Malicious actors will exploit our forgetfulness by trying to use stolen passwords across many sites, knowing that people will often reuse three or four memorable passwords instead of creating fresh credentials for every new system that they register on.
    - It is important to build systems and processes that are resilient and allow people to be trusting and forgetful.
    Unfortunately, since all systems are ultimately administered and used by people, we can’t completely remove the risk of human “vulnerabilities.”
    - Educating users and requiring them to follow procedures  are crucial parts in building a strong defence.
    For example, employees might be required to choose passwords that are over a certain length, attend training where they learn how to identify phishing attacks, and learn what they should look out for and how to report possible incidents or security concerns to the organisation (eg requests to give someone access to information, suspicious or threatening emails).
    - Placing too many restrictions on people can lead to them circumventing the security; for example, requiring frequent password changes can result in people choosing predictable passwords (“myDog’sName02”, and increasing the number every time), or writing them down where someone else can see them.
    - Rather than just giving people rules (like having to have 2 digits and 3 capital letters in a password), it’s good if they can see why (for example, using a site like [my1login.com](https://www.my1login.com/resources/password-strength-test/) to find out why a password is weak may motivate users to be more creative.
    And if users understand why multi-factor authentication (explained in the next section, “process”) protects them better, they are generally happy to use it since it takes the burden of them relying only on their password.

    {panel type="exercise"}

    # Use a password strength testing site

    On a password strength testing site, try the password “applebananacabbag” compared with “applebananacabbage” - it’s possible that the shorter one is stronger - why would that be?
    And while “people” is a bad password, substituting numbers for some letters, like “p30pl3” isn’t much better - why is that?
    There is some [good practical advice on choosing strong passwords in this cartoon](https://xkcd.com/936/) (but you definitely should’t use correcthorsebatterystaple as your password!)

    {panel end}

- **Process**: Good processes can include things like:

    - Hashed passwords: a secure system doesn’t store users’ passwords, but stores a “hash” of their password (this is explained in the [chapter on cryptography]('chapters:chapter_section' 'coding-encryption' 'storing-passwords-securely'), including the important step of “salting” a hashed password).
    This means that even if someone gains access to the password data, it is generally very hard to work out what the password is because they can only try out a range of passwords (typically based on a dictionary of words and names), so even a rogue employee who has access to all of an organisation’s data can’t easily figure out users’ passwords.
    - Two-factor authentication: A common form of this is not just requiring a password, but sending a message to the user’s mobile phone to confirm the access.
    This means that an attacker needs to find out the password and have access to the user’s phone, which multiplies the effort needed to break in, but only adds one small step for the user.
    The more general case of this is multi-factor authentication, where two or more forms of authentication are needed before access is given.
    - Having a process for keeping software updated is important.
    Updates can annoy users if the computer is unavailable while it is being done, but it’s important to have a way to make sure that they happen quickly.
    In a large organisation, this requires a well organised system for making sure every device in the organisation is up to date.
    - Password rotations (e.g. every three months) combined with using a password manager to keep track of the many passwords a user has can also make it difficult for a malicious actor to take advantage of gaining access to passwords.
    The use of a password manager to help randomly generate passwords and autofill these in for users can lead to very secure passwords that are different for every system, and little extra effort for the user once it is set up.
    This significantly helps to increase password strength and decrease password reuse.
    - Carefully removing access rights of people who leave an organisation (such as revoking their password) is important so that only the correct people have access to the system.

- **Compliance**: this is getting people to follow rules in a delicate balance of having them understand why the rules are there, and forcing them to do something that they might find inconvenient.
Examples of things that are inconvenient but can help security are:

    - Not allowing access to the system until the user improves their password.
    - Blocking USB flash drives from being accessed on work computers because they might be bringing in viruses.
    - Forcing a computer to lock if it hasn’t been used for the last few minutes.

{panel type="curiosity"}

# Tools, techniques, procedures (TTPs)

Another angle for thinking about security is to consider what an attacker is doing in terms of the attacker’s tools, techniques and procedures (TTPs).
This term is from conventional warfare, and is about being able to recognise who the enemy is based on how they are attacking, and in turn working out the best way to deal with them.

{panel end}

{panel type="curiosity"}

# An “own goal” with security by the NZ government

When the NZ government was about to announce the 2019 budget, the opposition party published parts of it while it was still confidential.
Initially there was an accusation of hacking, but it turned out that the site’s own search function could find the unreleased budget!
Security needs to be considered around every aspect of a computer system.
More information about this can be found here: [NZ treasury budget leak](https://www.globalgovernmentforum.com/nz-treasury-errors-led-to-budget-leak-inquiry-finds/).

{panel end}

{panel type="curiosity"}

# A Harry Potter analogy to security

Here’s a [talk that uses analogies with the world of Harry Potter](https://2018.pycon-au.org/talks/45196-django-against-the-dark-arts/) to explain ideas from computer security (The Philosopher’s Stone defenses, The Goblet of Fire defenses, 12 Grimmauld Place defenses).
It’s fairly specific to the context of Django, so may be a bit hard to follow, but it highlights some relationships between cybersecurity and a (fictitious) physical world.

{panel end}
