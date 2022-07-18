let apiQuotes = [];
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterBtn = document.getElementById('tweeter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// sets a new quote for the website
function newQuote() {
    const quote = fetchSingleQuote();
    load();
    addQuote(quote);
}

//loader
function load() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function loaded() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

// Fetch a single quote from the array and return it
function fetchSingleQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    return quote;
}

function addQuote(quote) {
    quote = checkIfAuthorEmpty(quote);
    // check if text is long
    checkIfQuoteLong(quote);
    quoteText.textContent = quote.text;
    quoteAuthor.textContent = quote.author;
    loaded();
}

function checkIfAuthorEmpty(quote) {
    if(!quote.author) {
        quote.author = 'Unknown'
    }

    return quote;
}

function checkIfQuoteLong(quote) {
    if(quote.text.length > 110) {
        quoteText.classList.add('long-quote');
    } else {
        quoteText.classList.remove('long-quote');
    }
}

// Get Quptes From API
async function getQuotes() {
    const apiUrl = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        
    }
}

function tweetQuote() {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterUrl, '_blank');
}



// Event Listeners
twitterBtn.addEventListener('click', tweetQuote);
newQuoteBtn.addEventListener('click', newQuote);

// On Load
load();
getQuotes();