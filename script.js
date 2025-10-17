// Birthday Party RSVP Script
document.addEventListener('DOMContentLoaded', function() {
    const guestNameInput = document.getElementById('guestName');
    const rsvpButton = document.getElementById('rsvpButton');
    const thankYouMessage = document.getElementById('thankYouMessage');
    const guestNameDisplay = document.getElementById('guestNameDisplay');
    const confettiCanvas = document.getElementById('confetti-canvas');
    
    // Set up confetti canvas
    const ctx = confettiCanvas.getContext('2d');
    confettiCanvas.width = window.innerWidth;
    confettiCanvas.height = window.innerHeight;
    
    // Handle window resize
    window.addEventListener('resize', function() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    });
    
    // RSVP Button Click Handler
    rsvpButton.addEventListener('click', function() {
        const guestName = guestNameInput.value.trim();
        
        if (guestName === '') {
            // Add shake animation for empty input
            guestNameInput.style.animation = 'shake 0.5s ease-in-out';
            setTimeout(() => {
                guestNameInput.style.animation = '';
            }, 500);
            return;
        }
        
        // Add guest to the list
        const newGuest = {
            name: guestName,
            timestamp: new Date().toLocaleString('bg-BG', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit'
            })
        };
        
        // Check if guest already exists
        const existingGuest = guests.find(guest => guest.name.toLowerCase() === guestName.toLowerCase());
        if (!existingGuest) {
            guests.push(newGuest);
            saveGuests(); // Save to cloud storage
            updateGuestList();
        }
        
        // Show thank you message
        guestNameDisplay.textContent = guestName;
        thankYouMessage.classList.remove('hidden');
        
        // Hide the input section
        document.querySelector('.rsvp-section').style.display = 'none';
        
        // Start confetti animation
        startConfetti();
        
        // Play success sound (optional - you can add an audio file)
        playSuccessSound();
    });
    
    // Allow Enter key to submit
    guestNameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            rsvpButton.click();
        }
    });
    
    // Confetti Animation
    function startConfetti() {
        const confettiPieces = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
        
        // Create confetti pieces
        for (let i = 0; i < 150; i++) {
            confettiPieces.push({
                x: Math.random() * confettiCanvas.width,
                y: -10,
                vx: (Math.random() - 0.5) * 4,
                vy: Math.random() * 3 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                size: Math.random() * 8 + 4,
                rotation: Math.random() * 360,
                rotationSpeed: (Math.random() - 0.5) * 10
            });
        }
        
        // Animate confetti
        function animateConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            
            confettiPieces.forEach((piece, index) => {
                // Update position
                piece.x += piece.vx;
                piece.y += piece.vy;
                piece.rotation += piece.rotationSpeed;
                
                // Apply gravity
                piece.vy += 0.1;
                
                // Draw confetti piece
                ctx.save();
                ctx.translate(piece.x, piece.y);
                ctx.rotate(piece.rotation * Math.PI / 180);
                ctx.fillStyle = piece.color;
                ctx.fillRect(-piece.size/2, -piece.size/2, piece.size, piece.size);
                ctx.restore();
                
                // Remove pieces that are off screen
                if (piece.y > confettiCanvas.height + 20) {
                    confettiPieces.splice(index, 1);
                }
            });
            
            // Continue animation if there are still pieces
            if (confettiPieces.length > 0) {
                requestAnimationFrame(animateConfetti);
            } else {
                // Clear canvas after animation
                setTimeout(() => {
                    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
                }, 1000);
            }
        }
        
        animateConfetti();
    }
    
    // Success sound function (optional)
    function playSuccessSound() {
        // Create a simple beep sound using Web Audio API
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.setValueAtTime(1000, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.3);
    }
    
    // Add shake animation CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-5px); }
            75% { transform: translateX(5px); }
        }
    `;
    document.head.appendChild(style);
    
    // Add some sparkle effects to the page
    function addSparkles() {
        const sparkleCount = 20;
        for (let i = 0; i < sparkleCount; i++) {
            setTimeout(() => {
                createSparkle();
            }, i * 100);
        }
    }
    
    function createSparkle() {
        const sparkle = document.createElement('div');
        sparkle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: #fff;
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            animation: sparkle 2s ease-out forwards;
        `;
        
        sparkle.style.left = Math.random() * window.innerWidth + 'px';
        sparkle.style.top = Math.random() * window.innerHeight + 'px';
        
        document.body.appendChild(sparkle);
        
        setTimeout(() => {
            sparkle.remove();
        }, 2000);
    }
    
    // Add sparkle animation CSS
    const sparkleStyle = document.createElement('style');
    sparkleStyle.textContent = `
        @keyframes sparkle {
            0% {
                opacity: 0;
                transform: scale(0);
            }
            50% {
                opacity: 1;
                transform: scale(1);
            }
            100% {
                opacity: 0;
                transform: scale(0);
            }
        }
    `;
    document.head.appendChild(sparkleStyle);
    
    // Add sparkles on page load
    setTimeout(addSparkles, 1000);
    
    // Simple Admin Panel (no CSS styling)
    const adminToggle = document.getElementById('adminToggle');
    const adminContent = document.getElementById('adminContent');
    const guestList = document.getElementById('guestList');
    const totalGuests = document.getElementById('totalGuests');
    const clearAllBtn = document.getElementById('clearAll');
    const closeAdmin = document.getElementById('closeAdmin');
    const passwordModal = document.getElementById('passwordModal');
    const passwordInput = document.getElementById('passwordInput');
    const passwordSubmit = document.getElementById('passwordSubmit');
    const passwordCancel = document.getElementById('passwordCancel');
    
    let guests = [];
    const ADMIN_PASSWORD = '221005';
    
    // Load guests via serverless API
    async function loadGuests() {
        try {
            const response = await fetch(API_CONFIG.endpoints.guests, {
                method: 'GET',
                headers: API_CONFIG.headers
            });
            const data = await response.json();
            guests = Array.isArray(data.list) ? data.list.map(g => ({
                name: g.name,
                timestamp: g.timestamp || g.time || ''
            })) : [];
            updateGuestList();
        } catch (error) {
            console.log('Using local storage as fallback');
            guests = JSON.parse(localStorage.getItem('birthdayGuests')) || [];
        }
    }
    
    // Save guests via serverless API
    async function saveGuests() {
        try {
            await fetch(API_CONFIG.endpoints.guests, {
                method: 'PUT',
                headers: API_CONFIG.headers,
                body: JSON.stringify({ list: guests })
            });
        } catch (error) {
            console.log('Saving to local storage as fallback');
            localStorage.setItem('birthdayGuests', JSON.stringify(guests));
        }
    }
    
    // Admin button click
    if (adminToggle) {
        adminToggle.addEventListener('click', function() {
            if (passwordModal) {
                passwordModal.classList.remove('hidden');
                if (passwordInput) passwordInput.focus();
            }
        });
    }
    
    // Password check
    function checkPassword() {
        if (passwordInput && passwordInput.value === ADMIN_PASSWORD) {
            if (passwordModal) passwordModal.classList.add('hidden');
            if (adminContent) adminContent.classList.remove('hidden');
            if (passwordInput) passwordInput.value = '';
            updateGuestList();
        } else {
            if (passwordInput) {
                passwordInput.value = '';
                alert('Не се пробвай пак това не работи само за мен е!');
            }
        }
    }
    
    // Password submit
    if (passwordSubmit) {
        passwordSubmit.addEventListener('click', checkPassword);
    }
    
    // Password cancel
    if (passwordCancel) {
        passwordCancel.addEventListener('click', function() {
            if (passwordModal) passwordModal.classList.add('hidden');
            if (passwordInput) passwordInput.value = '';
        });
    }
    
    // Enter key for password
    if (passwordInput) {
        passwordInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') checkPassword();
        });
    }
    
    // Close admin
    if (closeAdmin) {
        closeAdmin.addEventListener('click', function() {
            if (adminContent) adminContent.classList.add('hidden');
        });
    }
    
    // Update guest list
    function updateGuestList() {
        if (guestList && totalGuests) {
            if (guests.length === 0) {
                guestList.innerHTML = '<p>No guests yet...</p>';
            } else {
                guestList.innerHTML = guests.map(guest => 
                    `<div>${guest.name} - ${guest.timestamp}</div>`
                ).join('');
            }
            totalGuests.textContent = guests.length;
        }
    }
    
    // Clear all guests
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', function() {
            if (confirm('Clear all guests?')) {
                guests = [];
                saveGuests(); // Save to cloud storage
                updateGuestList();
            }
        });
    }
    
    // Initialize - load guests from cloud storage
    loadGuests();
});
