const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('Author');
const twitterButton = document.getElementById('Twitter');
const nextButton = document.getElementById('New-Qoute');
let apiQuotes = [];

// Show New Quote
function newQuote() {
  // Pick a random quote from API Quotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  
  // Check if Author field is blank replace it with unknown
  if (!quote.author) {
    authorText.textContent = 'Unknown';
  } else {
    authorText.textContent = quote.author;
  }
  
  // Check quote length for styling
  if (quote.text.length > 50) {
    quoteText.classList.add('long-quote');
  } else {
    quoteText.classList.remove('long-quote');
  }
  
  quoteText.textContent = quote.text;
}

// Get Quotes from an API
async function getQuotes() {
  const apiUrl = 'https://api.quotable.io/quotes?limit=50';
  
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    apiQuotes = data.results.map(quote => ({
      text: quote.content,
      author: quote.author
    }));
    newQuote();
  } catch (error) {
    console.error('Error fetching quotes:', error);
    // Fallback quotes if API fails
    apiQuotes = Quotes;
    newQuote();
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(quoteText.textContent + ' - ' + authorText.textContent)}`;
  window.open(twitterUrl, '_blank');
}

// Event Listeners
nextButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

// On Load
getQuotes();
