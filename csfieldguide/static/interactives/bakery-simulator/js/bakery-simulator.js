const CUSTOMER_INTRO = gettext("Good morning! I'd like to order a cake.");
const QUESTIONS = {
    'who': gettext("Who is it for?"),
    'budget': gettext("What is your budget?"),
    'people': gettext("How many people is it for?"),
    'colour': gettext("What colour should it be?"),
    'flavour': gettext("What should the flavour be?"),
    'decorations': gettext("What decorations should it have?"),
    'size': gettext("What size should it be?"),
    'shape': gettext("What shape should it be?"),
    'event': gettext("What is the event?"),
    'avoid': gettext("Anything you’d like to avoid?"),
    'layers': gettext("How many layers should it be?"),
    'style': gettext("How do you want it to look?"),
};

const CUSTOMER_1_ANS = {
    'who': gettext("Me"),
    'budget': gettext("I don't know, like 30 dollars?"),
    'people': gettext("A bunch… I think Susan is coming… Or maybe not, I don’t know."),
    'colour': gettext("Purple or green."),
    'flavour': gettext("Do you have lemon? Amy likes lemon. I think Amy is gonna be there."),
    'decorations': gettext("Just make it look nice, okay? But none of that fancy stuff."),
    'size': gettext("Medium, maybe."),
    'shape': gettext("What kind of a question is that? Cake shaped?"),
    'event': gettext("Does that really matter?"),
    'avoid': gettext("You."),
    'layers': gettext("Cakes have layers?"),
    'style': gettext("Who's the cake-maker here? Me or you?"),
};

const CUSTOMER_2_ANS = {
    'who': gettext("My son."),
    'budget': gettext("As much as is needed."),
    'people': gettext("About 20 people."),
    'colour': gettext("Blue is my son's favourite colour."),
    'flavour': gettext("Whatever most people like."),
    'decorations': gettext("Birthday decorations."),
    'size': gettext("Half a rectangular cake tin."),
    'shape': gettext("I want a fun boys rectangular cake."),
    'event': gettext("My sons birthday, he's turning 10."),
    'avoid': gettext("My son hates sprinkles."),
    'style': gettext("I don't care, a generic boy's birthday cake is fine."),
    'layers': gettext("It's a special birthday, so the bigger the better."),
};

const CUSTOMER_3_ANS = {
    'who': gettext("My best friend; she is getting married."),
    'budget': gettext("About $400, but I'm willing to pay more for decorative icing."),
    'people': gettext("About 100, so it should be as large with as many layers as possible."),
    'colour': gettext("White icing, since it's a wedding."),
    'flavour': gettext("My best friend and her wife both love red velvet."),
    'decorations': gettext("Decorative icing and writing with the names of the happy couple."),
    'size': gettext("Large with as many layers as possible."),
    'shape': gettext("Rectangular sounds good."),
    'event': gettext("It's a wedding, so the icing should be white. They want a red velvet cake."),
    'avoid': gettext("No sprinkles or candles, please! Also avoid basic flavors, like chocolate and vanilla."),
    'style': gettext("They would like a white rectangular cake with decorative icing and writing."),
    'layers': gettext("The cake should be large with 3 layers."),
};

$(document).ready(function() {
    $('#start-button').click(loadCustomer);
});


function loadCustomer() {
    $('#starter-info').addClass('d-none');
    $('#background-image').attr('src', bakerySimImages['customer-1']);
    $('#customer-answer').text(CUSTOMER_INTRO).removeClass('d-none');
    $('#question-dropdown').removeClass('d-none');
}
