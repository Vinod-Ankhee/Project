// DOM Elements
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const newQuoteBtn = document.getElementById('new-quote-btn');
const quoteContainer = document.getElementById('quote-container');
const errorMessage = document.getElementById('error-message');

// Fallback quotes in case API fails
const fallbackQuotes = [
    { q: "In the middle of every difficulty lies opportunity.", a: "Albert Einstein" },
    { q: "The only way to do great work is to love what you do.", a: "Steve Jobs" },
    { q: "Life is what happens when you're busy making other plans.", a: "John Lennon" }
];

// Function to get a random fallback quote
function getRandomFallbackQuote() {
    const randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
    return fallbackQuotes[randomIndex];
}

// Main quote fetching function
async function getQuote() {
    // Disable button and show loading state
    newQuoteBtn.disabled = true;
    quoteContainer.classList.add('loading');
    errorMessage.textContent = '';

    try {
        const response = await fetch('https://api.api-ninjas.com/v1/quotes?category=success', {
            method: 'GET',
            headers: {
                'X-Api-Key': 'j8L3opd0Qvj0M0TLyHqTrg==RIW0isniRH7xuc4O', // Replace with your API Ninjas API key
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        
        if (data && data[0]) {
            const quoteData = {
                q: data[0].quote,
                a: data[0].author
            };
            displayQuote(quoteData);
        } else {
            throw new Error('Invalid quote data');
        }
    } catch (error) {
        console.error('Error fetching quote:', error);
        // Use a fallback quote if API fails
        const fallbackQuote = getRandomFallbackQuote();
        displayQuote(fallbackQuote);
        errorMessage.textContent = 'Using offline quote - Check your internet connection';
    } finally {
        // Re-enable button and remove loading state
        newQuoteBtn.disabled = false;
        quoteContainer.classList.remove('loading');
    }
}

// Function to display quote with fade effect
function displayQuote(quoteData) {
    // Add fade effect
    quoteContainer.style.opacity = '0';
    
    setTimeout(() => {
        quoteText.textContent = quoteData.q;
        authorText.textContent = `— ${quoteData.a}`;
        quoteContainer.style.opacity = '1';
    }, 300);
}

// Event Listeners
let isButtonCooldown = false;

newQuoteBtn.addEventListener('click', () => {
    // Prevent rapid clicking
    if (!isButtonCooldown && !newQuoteBtn.disabled) {
        isButtonCooldown = true;
        getQuote();
        setTimeout(() => {
            isButtonCooldown = false;
        }, 500); // Cooldown period of 500ms
    }
});

// Initial load
document.addEventListener('DOMContentLoaded', () => {
    getQuote().catch(() => {
        const fallbackQuote = getRandomFallbackQuote();
        displayQuote(fallbackQuote);
        errorMessage.textContent = 'Using offline quote - Check your internet connection';
    });
});