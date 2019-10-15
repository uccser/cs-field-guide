# Application layer protocols - HTTP, IRC

The URL for the home site of this book is https://www.csfieldguide.org.nz.
Ask a few friends what the "http" stands for &ndash; they have probably seen it thousands of times... do they know what it is?
This section covers high level protocols such as HTTP and IRC, what they can do and how you can use them (hint: you’re already using HTTP right now).

## HyperText Transfer Protocol (HTTP)

{panel type="teacher-note"}

# Looking at HTTP in the classroom

For the activity in this section it's ideal if your school computers have a modern browser with the developer extensions enabled.
[Chrome](https://www.google.com/chrome/browser/) is free to download, and is the browser we recommend.
In most modern browsers these tools are installed by default, and you can open them in Windows with `Ctrl + Shift + I` and Mac with `Command + Option + I`.
Follow the instructions [here](http://debugbrowser.com/) for more information if this doesn't work.

The developer tools can’t do any harm, and you can encourage further tinkering.
However, knowledge of HTML, JavaScript or any other web design won’t be helpful in a report on protocols.
If your school’s IT department can't allow you access to these features, simply encourage the students to try this at home.
It’s a perfectly safe activity.

**Note:** Details in the Network tab only show up if it is open before the page loads, you may need to refresh the current page to see everything.

{panel end}

The {glossary-link term="http"}HyperText Transfer Protocol{glossary-link end} (HTTP) is the most common protocol in use on the internet.
The protocol’s job is to transfer [HyperText](https://en.wikipedia.org/wiki/Hypertext) (such as HTML) from a server to your computer.
It’s doing that right now.
You just loaded the CS Field Guide from the servers where it is hosted.
Hit refresh and you’ll see it in action.

HTTP functions as a simple conversation between client and server.
Think of when you’re at a shop:

> You: "Can I have a can of soda please?"
>
> Shop Keeper: "Sure, here’s a can of soda."

{image file-path="img/chapters/asking-for-a-soda-cartoon.png" alt="Asking for a soda"}

HTTP uses a request/response pattern for solving the problem of reliable communication between client and server.
The "ask for" is known as a *request* and the reply is known as a *response*.
Both requests and responses can also have other data or *resources* sent along with it.

{panel type="jargon-buster"}

# What is a resource?

A *resource* is any item of data on a server.
For example, a blog post, a customer, an item of stock or a news story.
As a business or a website, you would create, read, update and delete these as part of your daily business.
HTTP is well suited to that.
For example, if you’re a news site, every day your authors would add stories, you could update them, delete them if they’re old or become out of date, all sorts.
These sorts of methods are required to manage content on a server, and HTTP is the way to do this.

{panel end}

This is happening all the time when you're browsing the web; every web page you look at is delivered using the HyperText Transfer Protocol.
Going back to the shop analogy, consider the same example, this time with more resources shown in asterisk (\*) characters.

> You: "Can I have a can of soda please?" \*You hand the shop keeper $5\*
>
> Shop Keeper: "Sure, here’s a can of soda." \*Also hands you your change\*

{image file-path="img/chapters/asking-for-a-soda-cartoon-with-cash.png" alt="Paying for a soda with cash"}

There are nine *types* of requests that HTTP supports, and the most common are outlined below.

A GET request returns some text that describes the thing you’re asking for.
Like above, you ask for a can of soda, you get a can of soda.

A HEAD request returns information about what you’d get if you did a GET request.
It’s like this:

> You: "Can I see your can of soda please?"
>
> Shop Keeper: "Sure, here’s the can of soda you’d get." \*Hands you a photo of a can of soda\*

What’s neat about HTTP is that it allows you to also modify the contents of the server.
Say you’re now also a representative for the soda company, and you’d like to restock some shelves.

A POST request allows you to send information in the other direction.
This request allows you to replace a resource on the server with one you supply.
These use what is called a Uniform Resource Identifier or URI.
A URI is a unique code or number for a resource.
Confused?
Let’s go back to the shop:

> Sales Rep: "I’d like to replace this dented can of soda with barcode number 123-111-221 with this one, that isn’t dented."
>
> Shop Keeper: "Sure, that has now been replaced."

A PUT request adds a new resource to a server, however, if the resource already exists with that URI, it is modified with the new one.

> Sales Rep: "Here, have 10 more cans of lemonade for this shelf."
>
> Shop Keeper: "Thanks, I’ve now put them on the shelf."

A DELETE request does what you’d think, it deletes a resource.

> Sales Rep: "We are no longer selling ‘Lemonade with Extra Vegetables’, no one likes it! Please remove them!"
>
> Shop Keeper: "Okay, they are gone."

Some other request types (*HTTP methods*) exist too, but they are less used; these are TRACE, OPTIONS, CONNECT and PATCH.
You can [find out more about these](https://en.wikipedia.org/wiki/Hypertext_Transfer_Protocol) on your own if you're interested.

In HTTP, the first line of the response is called the *status* line and has a numeric status code such as **404** and a text-based *reason phrase* such as "Not Found".
The most common is 200 and this means successful or "OK".
HTTP status codes are primarily divided into five groups for better explanation of requests, and responses between client and server are named by purpose and a number: Informational 1XX, Successful 2XX, Redirection 3XX, Client Error 4XX and Server Error 5XX.
There are many [status codes](https://en.wikipedia.org/wiki/List_of_HTTP_status_codes) for representing different cases for error or success.
There’s even a nice 418: Teapot error on Google: [https://www.google.com/teapot](https://www.google.com/teapot)

So what’s actually happening? Well, let’s find out.
Open a new tab in your browser and open the homepage of the [CS Field Guide](http://www.csfieldguide.org.nz).
If you’re in a Chrome or Safari browser, press `Ctrl + Shift + I` in Windows or `Command + Option + I` on a Mac to bring up the web inspector.
(You can do this with other modern browsers also, you just might need to search around for equivalent steps).
Select the Network tab (you might need to expand the list of tabs to see it).
Refresh the page.
What you’re seeing now is a list of of HTTP requests your browser is making to the server to load the page you're currently viewing.
Near the top you’ll see a request to an `html` file.
Click that and you’ll see details of the Headers, Preview, Response, Cookies and Timing.
Ignore those last two for now.

Let’s look at the first few lines of the headers:

```text
Remote Address: 132.181.2.122:3128
Request URL: http://www.csfieldguide.org.nz/en/
Request Method: GET
Status Code: 200 OK
```

The *Remote Address* is the address of the server the page is hosted on.
The *Request URL* is the original URL that you requested.
The request method should be familiar from above.
It is a GET type request, saying "can I have the web page please?" And the response is the HTML.
Don’t believe it?
Click the *Response* tab.
Finally, the *Status Code* is a code that the page can respond with.

Let’s look at the *Request Headers* now, click ‘view source’ to see the original request.

```text
GET /en/ HTTP/1.1
Host: www.csfieldguide.org.nz
Connection: keep-alive
Cache-Control: max-age=0
Accept: text/html,application/xhtml+xml;q=0.9,image/webp,*/*;q=0.8
User-Agent: Chrome/34.0.1847.116
Accept-Encoding: gzip,deflate,sdch
Accept-Language: en-US,en;q=0.8
```

As you can see, a request message consists of the following:

- A request line in the form of *method*  *URI*  *protocol* / *version*.
- Request Headers (Accept, User-Agent, Accept-Language etc).
- An empty line.
- An optional message body.

Let’s look at the *Response Headers*:

```text
HTTP/1.1 200 OK
Date: Sun, 11 May 2014 03:52:56 GMT
Server: Apache/2.2.15 (Red Hat)
Accept-Ranges: bytes
Content-Length: 3947
Connection: Keep-Alive
Content-Type: text/html; charset=UTF-8
Vary: Accept-Encoding, User-Agent
Content-Encoding: gzip
```

As you can see, a response message consists of the following:

- Status Line, 200 OK means everything went well.
- Response Headers (Content-Length, Content-Type etc).
- An empty line.
- An optional message body.

Go ahead and try this same process on a few other pages too.
For example, try these sites:

- A very busy website in terms of content, such as *facebook.com*
- A chapter that [doesn’t exist on Google](https://google.com/nope.html)
- Your favourite website

{panel type="curiosity"}

# Who came up with HTTP?

Tim Berners-Lee was credited for creating HTTP in 1989.
You can read more about him [here](https://en.wikipedia.org/wiki/Tim_Berners-Lee).

{panel end}

## Internet Relay Chat (IRC)

{panel type="teacher-note"}

# Using IRC in the classroom

For this section we suggest you use the [freenode web client](http://webchat.freenode.net/).
This allows you to set up your own channel and then your students can join it too.
With channels on this service, anyone can join them, so if your channel name is too obvious, you might get members of the public joining.
It's best to break convention with channel names and use ###irc-myschool-thedate or something similar.
Students can also download and install IRC clients, but this is complicated to configure, so it’s best to use the web version.
Just tell them what channel to join.

{panel end}

Internet Relay Chat (IRC) is a system that lets you transfer messages in the form of text.
It’s essentially a chat protocol.
The system uses a client-server model.
{glossary-link term="client"}Clients{glossary-link end} are chat programs installed on a user’s computer that connect to a central {glossary-link term="server"}server{glossary-link end}.
The clients communicate the message to the central server which in turn relays that to other clients.
The protocol was originally designed for group communication in discussion forums, called *channels*.
IRC also supports one-to-one communication via *private messages*.
It is also capable of file and data transfer too.

The neat thing about IRC is that users can use commands to interact with the server, client or other users.
For example /DIE will tell the server to shutdown (although it will only work if you are the administrator!), and /ADMIN will tell you who the administrator is.

Whilst IRC may be new to you, the concept of a group conversation online or a *chat room* may not be.
There really isn’t any difference.
Groups exist in the forms of *channels*.
A server hosts many channels, and you can choose which one to join.

Channels usually form around a particular topic, such as Python, Music, TV show fans, Gaming or Hacking.
Convention dictates that channel names start with one or two # symbols, such as #python or ##TheBigBangTheory.
{glossary-link term="convention"}Conventions{glossary-link end} are different to protocols in that they aren’t actually enforced by the protocol, but people choose to use it that way.

To get started with IRC, first you should get a client.
A client is a program that let's you connect.
Ask your teacher about which one to use.
For this chapter, we’ll use the [freenode web client](http://webchat.freenode.net/).
Check with your teacher about which channel to join, as they may have set one up for you.

Try a few things while you’re in there.
Look at this [list of commands](https://en.wikipedia.org/wiki/List_of_Internet_Relay_Chat_commands) and try to use some of them.
What response do you get? Does this make sense?

Try a one on one conversation with a friend.
If they use commands, do you see them?
How about the other way around?
