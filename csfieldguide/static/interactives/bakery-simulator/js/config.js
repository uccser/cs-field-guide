const CUSTOMER_INTRO = gettext("Good morning! I'd like to order a cake.");
const QUESTIONS_MAX_REACHED = gettext("You have asked the maximum of 6 questions. Lets get baking!");
const MODAL_TITLE = gettext("Make your cake using the options below. You may select multiple decorations.");
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
    'flavour': gettext("My best friend and her wife both love chocolate."),
    'decorations': gettext("Decorative icing and writing with the names of the happy couple."),
    'size': gettext("Large with as many layers as possible."),
    'shape': gettext("Rectangular sounds good."),
    'event': gettext("It's a wedding, so the icing should be white. They want a red velvet cake."),
    'avoid': gettext("No sprinkles or candles, please! Also avoid basic flavors, like chocolate and vanilla."),
    'style': gettext("They would like a white rectangular cake with decorative icing and writing."),
    'layers': gettext("The cake should be large with 3 layers."),
};

const CUSTOMER_1_CAKE = {
    'layers': 2,
    'flavour': 'Chocolate',
    'colour': 'Purple',
    'size': 'Large',
    'decorations': ['Sprinkles'],
    'shape': 'Circle',
};

const CUSTOMER_2_CAKE = {
    'layers': 3,
    'flavour': 'Banana',
    'colour': 'Blue',
    'size': 'Medium',
    'decorations': ['Candles', 'Writing', 'Deco-Icing'],
    'shape': 'Rectangular',
};

const CUSTOMER_3_CAKE = {
    'layers': 3,
    'flavour': 'Chocolate',
    'colour': 'White',
    'size': 'Large',
    'decorations': ['Deco-Icing', 'Writing'],
    'shape': 'Rectangular',
};

const RADIO_LAYERS = {
    title: 'Layers:',
    name: 'layers',
    values: [
        1,
        2,
        3,
    ]
};

const RADIO_FLAVOURS = {
    title: gettext('Flavour:'),
    name: 'flavour',
    values: [
        gettext('Vanilla'),
        gettext('Chocolate'),
        gettext('Banana'),
    ]
};

const RADIO_ICING_COLOUR = {
    title: gettext('Icing Colour:'),
    name: 'icing-colour',
    values: [
        gettext('Red'),
        gettext('Blue'),
        gettext('Green'),
        gettext('Purple'),
        gettext('White'),
    ]
};

const RADIO_SIZE = {
    title: gettext('Size:'),
    name: 'size',
    values: [
        gettext('Small'),
        gettext('Medium'),
        gettext('Large'),
    ]
};

const RADIO_DECORATIONS = {
    title: gettext('Decorations:'),
    name: 'decorations',
    values: [
        gettext('Deco-Icing'),
        gettext('Candles'),
        gettext('Writing'),
        gettext('Sprinkles'),
    ]
};

const RADIO_SHAPE = {
    title: gettext('Shape:'),
    name: 'shape',
    values: [
        gettext('Circle'),
        gettext('Rectangular'),
        gettext('Star'),
    ]
};

const RADIO_OPTIONS = [
    RADIO_LAYERS,
    RADIO_FLAVOURS,
    RADIO_ICING_COLOUR,
    RADIO_SIZE,
    RADIO_DECORATIONS,
    RADIO_SHAPE,
];

module.exports = {
    CUSTOMER_INTRO,
    QUESTIONS_MAX_REACHED,
    MODAL_TITLE,
    QUESTIONS,
    CUSTOMER_1_ANS,
    CUSTOMER_2_ANS,
    CUSTOMER_3_ANS,
    CUSTOMER_1_CAKE,
    CUSTOMER_2_CAKE,
    CUSTOMER_3_CAKE,
    RADIO_LAYERS,
    RADIO_FLAVOURS,
    RADIO_ICING_COLOUR,
    RADIO_SIZE,
    RADIO_DECORATIONS,
    RADIO_SHAPE,
    RADIO_OPTIONS,
};
