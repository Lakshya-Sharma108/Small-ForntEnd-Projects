const quote = document.getElementById("quote");
const author = document.getElementById("author");

// Using DummyJSON API which has CORS enabled and is reliable
//const API_URL = "https://dummyjson.com/quotes/random";

// Backup static quotes in case API fails
const fallbackQuotes = [
    { quote: "You have the right to perform your duty, but not to the fruits of your actions.", author: "Bhagavad Gita" },
    { quote: "Change is the law of the universe. One who clings to the past or present is destined to miss the future.", author: "Bhagavad Gita" },
    { quote: "A person is made by their belief. As they believe, so they become.", author: "Bhagavad Gita" },
    { quote: "The mind is restless, turbulent, strong and obstinate, but it can be controlled by practice and detachment.", author: "Bhagavad Gita" },
    { quote: "There is nothing lost or wasted in this life.", author: "Bhagavad Gita" },
    { quote: "He who has no attachments can truly love others, for his love is pure and divine.", author: "Bhagavad Gita" },
    { quote: "When meditation is mastered, the mind is unwavering like the flame of a lamp in a windless place.", author: "Bhagavad Gita" },
    { quote: "The soul is neither born, nor does it die at any time.", author: "Bhagavad Gita" },
    { quote: "As a person puts on new garments, giving up old ones, the soul accepts new bodies.", author: "Bhagavad Gita" },
    { quote: "Let a man lift himself by his own self; let him not lower himself.", author: "Bhagavad Gita" },
    { quote: "Truth alone triumphs, not falsehood.", author: "Mundaka Upanishad" },
    { quote: "From ignorance, lead me to truth.", author: "Brihadaranyaka Upanishad" },
    { quote: "You are what your deep, driving desire is.", author: "Upanishads" },
    { quote: "The one who sees inaction in action, and action in inaction, is wise.", author: "Bhagavad Gita" },
    { quote: "Peace comes from within. Do not seek it without.", author: "Buddha (Indian spiritual tradition)" }
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