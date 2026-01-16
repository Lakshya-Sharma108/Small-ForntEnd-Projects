const quote = document.getElementById("quote");
const author = document.getElementById("author");

// Using DummyJSON API which has CORS enabled and is reliable
const API_URL = "https://dummyjson.com/quotes/random";

// Backup static quotes in case API fails
const fallbackQuotes = [
    { quote: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { quote: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs" },
    { quote: "Life is what happens when you're busy making other plans.", author: "John Lennon" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { quote: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle" },
    { quote: "Be yourself; everyone else is already taken.", author: "Oscar Wilde" },
    { quote: "The only impossible journey is the one you never begin.", author: "Tony Robbins" },
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { quote: "The best time to plant a tree was 20 years ago. The second best time is now.", author: "Chinese Proverb" },
    { quote: "Your time is limited, don't waste it living someone else's life.", author: "Steve Jobs" },
    { quote: "Whether you think you can or you think you can't, you're right.", author: "Henry Ford" },
    { quote: "The only limit to our realization of tomorrow will be our doubts of today.", author: "Franklin D. Roosevelt" },
    { quote: "Do what you can, with what you have, where you are.", author: "Theodore Roosevelt" },
    { quote: "Everything you've ever wanted is on the other side of fear.", author: "George Addair" }
];

let usedFallbackIndices = [];

// Fetch and display quote
async function getQuote() {
    try {
        // Add loading state
        quote.classList.add('loading');
        author.classList.add('loading');
        quote.innerHTML = '<span class="loading-text">Loading inspiring quote...</span>';
        author.innerHTML = '...';

        try {
            // Try the API first
            const response = await fetch(API_URL);

            if (response.ok) {
                const data = await response.json();

                // Display quote with animation
                setTimeout(() => {
                    quote.classList.remove('loading');
                    author.classList.remove('loading');
                    quote.innerHTML = data.quote;
                    author.innerHTML = `— ${data.author}`;
                }, 300);
                return;
            }
        } catch (apiError) {
            console.log('API failed, using fallback quotes');
        }

        // If API fails, use fallback quotes
        if (usedFallbackIndices.length >= fallbackQuotes.length) {
            usedFallbackIndices = []; // Reset if all quotes used
        }

        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * fallbackQuotes.length);
        } while (usedFallbackIndices.includes(randomIndex));

        usedFallbackIndices.push(randomIndex);

        const selectedQuote = fallbackQuotes[randomIndex];

        setTimeout(() => {
            quote.classList.remove('loading');
            author.classList.remove('loading');
            quote.innerHTML = selectedQuote.quote;
            author.innerHTML = `— ${selectedQuote.author}`;
        }, 300);

    } catch (error) {
        console.error('Error:', error);
        quote.classList.remove('loading');
        author.classList.remove('loading');
        quote.innerHTML = 'Unable to load quote. Please try again.';
        author.innerHTML = '';
        showNotification('Failed to load quote. Please try again.');
    }
}

// Tweet function
function tweet() {
    const quoteText = quote.innerText;
    const authorText = author.innerText;

    if (quoteText &&
        quoteText !== 'Loading inspiring quote...' &&
        quoteText !== 'Unable to load quote. Please try again.') {
        const tweetText = `"${quoteText}" ${authorText}`;
        const tweetUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`;
        window.open(tweetUrl, "Tweet Window", "width=600, height=400");
    } else {
        showNotification('Please load a quote first!');
    }
}

// Copy to clipboard function
async function copyQuote() {
    const quoteText = quote.innerText;
    const authorText = author.innerText;

    if (quoteText &&
        quoteText !== 'Loading inspiring quote...' &&
        quoteText !== 'Unable to load quote. Please try again.') {
        const textToCopy = `"${quoteText}" ${authorText}`;

        try {
            await navigator.clipboard.writeText(textToCopy);
            showNotification('Quote copied to clipboard! ✓');
        } catch (error) {
            // Fallback for older browsers
            const textArea = document.createElement('textarea');
            textArea.value = textToCopy;
            textArea.style.position = 'fixed';
            textArea.style.left = '-999999px';
            document.body.appendChild(textArea);
            textArea.select();

            try {
                document.execCommand('copy');
                showNotification('Quote copied to clipboard! ✓');
            } catch (err) {
                showNotification('Failed to copy quote');
            }

            document.body.removeChild(textArea);
        }
    } else {
        showNotification('Please load a quote first!');
    }
}

// Show notification
function showNotification(message) {
    const notification = document.getElementById('notification');
    const notificationText = document.getElementById('notification-text');

    notificationText.textContent = message;
    notification.classList.add('show');

    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

// Load initial quote when page loads
window.addEventListener('load', () => {
    getQuote();
});

// Add keyboard shortcut (Space = new quote, Ctrl/Cmd+C = copy)
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && e.target === document.body) {
        e.preventDefault();
        getQuote();
    } else if ((e.ctrlKey || e.metaKey) && e.key === 'c' && e.target === document.body) {
        e.preventDefault();
        copyQuote();
    }
});