// Navigation function with smooth transitions
function navigateToPage(page) {
    // Add fade-out effect
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('fade-out');
    }
    
    // Navigate after animation completes
    setTimeout(() => {
        window.location.href = page;
    }, 500);
}

// Save name from page 1 and navigate
function saveNameAndNavigate() {
    const name = document.getElementById('friendName').value.trim();
    if (name) {
        // Save name to localStorage for personalization
        localStorage.setItem('friendName', name);
        navigateToPage('page2.html');
    } else {
        alert('Please enter your name first!');
    }
}

// Personalize pages with friend's name
function personalizePage() {
    const savedName = localStorage.getItem('friendName');
    if (savedName) {
        // Update page 2 title with friend's name
        const page2Title = document.querySelector('body.page-2 h1');
        if (page2Title) {
            page2Title.innerHTML = `I HAVE A SURPRISE FOR YOU ${savedName.toUpperCase()}!`;
        }
    }
}

// Initialize page when loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add fade-in animation to all pages
    const container = document.querySelector('.container');
    if (container) {
        container.classList.add('fade-in');
    }
    
    // Personalize pages with saved name
    personalizePage();
});

// Page 4 (Reasons Page) Functions
let currentReasonIndex = 0;
const reasons = [
    "I feel so happy whenever I'm with you.",
    "You're just like me… bhondu hehe😂",
    "I feel so comfortable around you.",
    "You always listen to me so carefully, even when the things I say aren't that important hehe",
    "You're my best friend, and there are so many reasons… I can't even list them all 🫠.",
];

function showNextReason() {
    const reasonDisplay = document.getElementById('currentReason');
    const nextReasonBtn = document.getElementById('nextReasonBtn');
    const completionMessage = document.getElementById('completionMessage');

    if (currentReasonIndex < reasons.length) {
        // Show current reason
        reasonDisplay.textContent = reasons[currentReasonIndex];

        // Add fade animation
        reasonDisplay.classList.add('fade-in');
        setTimeout(() => {
            reasonDisplay.classList.remove('fade-in');
        }, 500);

        currentReasonIndex++;

        // Check if all reasons are shown
        if (currentReasonIndex >= reasons.length) {
            nextReasonBtn.style.display = 'none';
            completionMessage.style.display = 'block';
            completionMessage.classList.add('fade-in');
        }
    }
}

// Memory Game Functions (Page 6)
let moves = 0;
let matchedPairs = 0;
let canFlip = true;
let firstCard = null;
let secondCard = null;

function initMemoryGame() {
    const gameBoard = document.getElementById('game-board');
    if (!gameBoard) return;
    
    gameBoard.innerHTML = '';
    
    // Symbols for the cards (6 pairs)
    const symbols = ['❤️', '😗', '😂', '😛', '🙂‍↔️', '🥺', '❤️', '😗', '😂', '😛', '🙂‍↔️', '🥺'];
    
    // Shuffle symbols
    const shuffledSymbols = [...symbols].sort(() => Math.random() - 0.5);
    
    // Create cards
    shuffledSymbols.forEach((symbol, index) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.symbol = symbol;
        
        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">
                    ❓
                </div>
                <div class="card-back">
                    ${symbol}
                </div>
            </div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        gameBoard.appendChild(card);
    });
    
    // Reset counters
    moves = 0;
    matchedPairs = 0;
    updateCounters();
}

function flipCard(card) {
    if (!canFlip || card === firstCard || card.classList.contains('matched')) {
        return;
    }
    
    card.classList.add('flipped');
    
    if (!firstCard) {
        // First card flipped
        firstCard = card;
    } else {
        // Second card flipped
        secondCard = card;
        canFlip = false;
        
        // Increment moves
        moves++;
        updateCounters();
        
        // Check for match
        if (firstCard.dataset.symbol === secondCard.dataset.symbol) {
            // Match found
            setTimeout(() => {
                firstCard.classList.add('matched');
                secondCard.classList.add('matched');
                resetTurn();
                matchedPairs++;
                updateCounters();
                
                // Check if game is complete
                if (matchedPairs === 6) {
                    setTimeout(showGameCompletion, 500);
                }
            }, 500);
        } else {
            // No match
            setTimeout(() => {
                firstCard.classList.remove('flipped');
                secondCard.classList.remove('flipped');
                resetTurn();
            }, 1000);
        }
    }
}

function resetTurn() {
    firstCard = null;
    secondCard = null;
    canFlip = true;
}

function updateCounters() {
    const movesElement = document.getElementById('moves');
    const matchesElement = document.getElementById('matches');
    
    if (movesElement) movesElement.textContent = moves;
    if (matchesElement) matchesElement.textContent = matchedPairs;
}

function showGameCompletion() {
    const completionMessage = document.getElementById('completion-message');
    const finalMoves = document.getElementById('final-moves');
    
    if (completionMessage && finalMoves) {
        finalMoves.textContent = moves;
        completionMessage.classList.add('show');
    }
}

// Initialize memory game when page loads
if (document.getElementById('game-board')) {
    window.addEventListener('DOMContentLoaded', initMemoryGame);
}

// Initialize reasons page when page loads
if (document.getElementById('currentReason')) {
    window.addEventListener('DOMContentLoaded', function() {
        // Reset reason index
        currentReasonIndex = 0;
        
        // Hide completion message initially
        const completionMessage = document.getElementById('completionMessage');
        if (completionMessage) {
            completionMessage.style.display = 'none';
        }
        
        // Show next reason button
        const nextReasonBtn = document.getElementById('nextReasonBtn');
        if (nextReasonBtn) {
            nextReasonBtn.style.display = 'block';
        }
        
        // Set initial message
        const reasonDisplay = document.getElementById('currentReason');
        if (reasonDisplay) {
            reasonDisplay.textContent = "Click here to know!";
        }
    });
}