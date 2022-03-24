# Updates

The ideas earlier in this chapter have provided the motivation for organisations to keep their systems up to date - it’s an important defensive measure.
Once a weakness is found in widely used software (either because a good hacker has reported it, or a malicious hacker has been observed exploiting it), the organisation is at risk since the weakness is probably widely known.

Of course, users don’t like having the system “down for maintenance” or being forced to log off while updates are made.
Fortunately, many updates can be done without people noticing, but either way, procedures are needed to ensure that every device in the organisation is up to date.
A single weak device could be a gateway for an attacker to get into the organisation.

Here are some examples of weaknesses being patched by updates:

- SolarWinds Orion in 2020:

    - September 2019: SolarWinds Orion, which is a tool used by organisations to monitor their environment and networks, is infected with malware that allows attackers to steal data about the networks they monitor.
    - December 2020: A Security Research company (FireEye) found the weakness as part of some internal investigations of their own systems.
    - December 12 2020: FireEye told SolarWinds about the problem, and SolarWinds tried to fix it (this communication was kept private).
    - December 13 2020: The news became public because the US government was informed and released a public advisory. However, no fix was available.
    - December 15 2020: Fix released. This is only 2 days after the issue was made public, but it is a long time considering the customers impacted (US Government, Health companies). In those 2 days, trust was lost in SolarWinds as their “Orion software” that was available via download still had the malware in it.

- The Meltdown and Spectre vulnerabilities affected a very wide range of computers in January 2018.
  Google independently discovered the Meltdown and Spectre vulnerabilities in some microprocessors, but needed to make sure it was fixed in the relevant operating systems without the issue becoming widely known.
  The Google incident management team worked for months with Intel/ARM/AMD to develop patches. Here is an [article about this](https://www.theverge.com/2018/1/11/16878670/meltdown-spectre-disclosure-embargo-google-microsoft-linux).
- Another example is when Shadow Brokers were releasing information about the NSA online - the National Security Agency of the United States of America gave Microsoft a quiet heads up about some vulnerabilities they had been secretly using.
  They suspected the vulnerabilities would be leaked by Shadow Brokers, and [sure enough they were](https://www.zdnet.com/article/microsoft-quietly-patched-latest-shadow-brokers-hacks/).
  These same vulnerabilities were used by the Wannacry malware, and NotPetya not long after.
  These were both devastating attacks (costing an estimated $4 billion and $10 billion USD in damages respectively) because organisations had not applied Microsoft's updates.
  Almost a million machines are still vulnerable (see [avast.com](https://www.avast.com/c-eternalblue)).

{panel type="exercise"}

# Activities to identify security policies that affect you

Here are some things you can investigate to obtain some practical examples of computer security at work in your life.

- Find out what your school’s policy is about updates.
  How do they make sure these happen?
  Do people get annoyed by them?
- What updates have happened, or are pending, on software on a computer that you use?
- What policies can you find about updates?
- Read patch notes or update notes for an app you use or game you play - what security gaps did they close?
  What new features did they introduce?
- Read through a security advisory for a software vulnerability ([such as this one](https://www.cert.govt.nz/it-specialists/advisories/urgent-microsoft-exchange-security-update/)).
  How many people do you think this would impact?
  How important would this security fix be, considering what this software is used for?
- Check the devices in your household - do they have “automatic updates” turned on?
  Can you turn them on so you don’t have to do updates manually?
  What are the pros and cons of doing this?
- What is an “out-of-band” update?
  Why are out-of-band updates significant?

{panel end}
