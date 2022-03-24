# What's the big picture?

Computer security is about making sure that the customers and staff can access what they need to, but others can’t.
Your bank should make it easy for you to make a payment from your account, but really hard for other people to do that.
Your email provider should give you easy access to messages you receive, but not let anyone else see them.
This is a tradeoff between confidentiality and availability.
You can provide great confidentiality by closing down your online system, but the availability is terrible! And you can have great availability by letting someone stay logged in all the time on any computer they’re using, but that may cause some big confidentiality problems.

As well as trying to balance these, you also need to make sure that the data in your system is accurate; if someone can change the information that you rely on (such as account balances or passwords) then they can potentially put a company out of business, or damage the reputation of the company.
For example, they could change the balance of your bank account to make you scared you have lost all your money; or they could change your password and lock you out of your account; or they could even modify stock or cryptocurrency prices that you see on a website to entice you to buy or sell shares or currency you have.
Or an attacker could even manipulate image recognition by feeding machine learning algorithms a bunch of false data (such as feeding it images of cats, and say that they are ducks!)

{comment TODO: Add image of cat detected as a duck}

This challenge is referred to as integrity, and combined with confidentiality and availability, we have the CIA triangle (Confidentiality, Integrity, Availability).
These three needs are all pulling in different directions, and getting security right is the fine art of doing well in all of these without undermining one of them.

Here is an example of them pulling against each other: you could have good availability by giving all staff access to all your data (such as all school staff having access to change all student exam results), but there’s a risk that each staff member with access can change the data at will, and put integrity of the results at risk.

People trying to breach security might not just be after data - they might be wanting to prevent availability to others.
For example, in New Zealand in 2020, the [NZ Exchange experienced a “Distributed Denial of Service” (DDoS) attack](https://www.nzx.com/announcements/358636), where millions of computers were used to make requests to the Exchange, which completely overwhelmed the system and prevented any trading from happening.
Hurting or disabling an organisation can be done for a number of reasons - often it is to extort a ransom to stop the attack, but sometimes it’s just to show off!
Another reason might be to prevent a competing business or foreign government from operating.
Our military defence needs to be just as prepared to repel a cyberattack as it does a physical attack!

Computer security experts are always trying to think of ways that someone might subvert what their staff and customers think is true.
Examples could include:

- Fake emails saying your account has had strange activity, and to login via a link they have given you.
- “Only paying for shipping” when winning free, expensive items like an iPhone or Laptop.
- Getting a phone call from a brand you trust, like Microsoft, saying your computer is infected and they can help if you give them access.
- Pop up ads that encourage you to download software to make your computer operate “better.”
- A scam that says you can win more if you share the post or link with friends online.
- Targeted emails from people pretending to be friends, family, or bosses - asking you to send them money to help them out of a sticky situation.
- Social media friend requests pretending to be people you know, to try and gain your trust and get you to do things for them.
- Emails from someone you work with asking to pay their last invoice to a new bank account.
- Using free WiFi that overlays scam ads on user’s browsers, to encourage them to click through and download bad software

Most of the above examples are based on phishing attacks where the attacker sends emails to a large number of email addresses, in the hope that at least some of those people will fall for the request.

Computer security experts know all the tricks in the book so that they can anticipate what attackers might try to do, but they also look out for new patterns of attack and risks that might come up.

Security people have to be realists... security is always a balance between convenience for legitimate users, and inconvenience for unauthorised users.
In fact, very strong security can backfire; if you have a policy of passwords being changed regularly, users may end up writing the password down where other people can easily access it, or reuse previous passwords so that they have fewer passwords to remember.
They may even just  use the current month as their password!
How much effort you put into security will depend on your “threat model” - what are the main risks, and the consequences of those risks?
For a large organisation there will be many threats and large consequences if some of them play out; for an individual with a personal device, there will be a smaller and possibly different set of threats.

People make mistakes and can be driven to click on something, or do something based on an emotional reaction, like fear, uncertainty, or doubt.
Security people need to try and design systems and processes to make it harder for mistakes to happen.
They also need to investigate incidents and continually tune and make improvements to them.
Preventing security breaches can involve making sure that people using a computer system have the tools they need (including actually providing software for doing their job so they don’t have to download or find ones that work for them, education about what kind of threats are out there and the actions they can take to protect themselves, and someone to call on for help or support when they are unsure).

Preventing breaches also means being creative about how people prove they are who they say they are, also known as authentication.
This is an important part of how we let only legitimate users in to use the system.
Examples include  passwords, PINs, codes sent via text or mobile app, hardware keys you plug in like a USB drive, and even fingerprints or retinas!

{panel type="additional-information"}

# Extra information

The following [Crash Course video](https://www.youtube.com/watch?v=bPVaOlJ6ln0) about security covers a lot of the ideas - and surprises - that you’ll encounter when thinking about computer security.
There’s more information about the [CIA triad on logsign.com](https://www.logsign.com/blog/what-is-the-cia-triad-and-why-is-it-important-for-cybersecurity/)

{panel end}
