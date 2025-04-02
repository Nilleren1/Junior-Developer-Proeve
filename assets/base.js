// Simple JavaScript to make the navigation links smooth scroll
document.addEventListener('DOMContentLoaded', function () {
    // Get all navigation links that point to sections
    const navLinks = document.querySelectorAll('nav a[href^="#"]');

    // Add click event listener to each link
    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            // Scroll smoothly to the target
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add active class to the current navigation item
    function highlightCurrentSection() {
        const sections = document.querySelectorAll('section');
        const navItems = document.querySelectorAll('nav ul li a');

        let currentSectionId = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${currentSectionId}`) {
                item.classList.add('active');
            }
        });
    }

    // Call the function on scroll
    window.addEventListener('scroll', highlightCurrentSection);
});

/**
 * Initializes modal functionality, allowing the modal to be opened, closed, 
 * and dismissed by clicking outside the modal content.
 *
 * - Opens the modal when the "open modal" button is clicked.
 * - Closes the modal when the "close modal" button is clicked.
 * - Closes the modal when clicking on the backdrop (outside the modal content).
 *
 * @event DOMContentLoaded - Ensures the DOM is fully loaded before attaching event listeners.
 */
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('modal');
    const openModalButton = document.querySelector('.promo button');
    const closeModalButton = document.getElementById('close-modal');

    // Åben modal
    openModalButton.addEventListener('click', function () {
        modal.classList.add('show');
    });

    // Luk modal
    closeModalButton.addEventListener('click', function () {
        modal.classList.remove('show');
    });

    // Luk modallen ved at klikke udenfor den
    modal.addEventListener('click', function (e) {
        if (e.target === modal) {
            modal.classList.remove('show');
        }
    });

    /**
     * Initializes the countdown timer in the modal.
     * - Counts down to 15:00 of the current day.
     * - Updates the modal text when the countdown ends.
     */
    function initializeCountdown() {
        const countdownElement = document.createElement('p');
        const modalContent = document.querySelector('.modal-content');
        const expireInfoElement = document.getElementById('expireInfo');
        const expiredText = "Bestil inden kl. 15 på hverdage, og få din ordre sendt afsted samme dag.";

        countdownElement.id = 'countdown-timer';
        countdownElement.style.fontWeight = 'bold';
        modalContent.appendChild(countdownElement);

        function updateCountdown() {
            const now = new Date();
            const target = new Date();
            target.setHours(15, 0, 0, 0); // Sætter timeren til 15:00 i dag

            if (now > target) {
                // Hvis klokken er over 15:00, sæt teksten til expiredText og stop timeren
                expireInfoElement.textContent = expiredText;
                clearInterval(countdownInterval); // Stop intervallet
                return;
            }

            const timeDifference = target - now;

            // gør konstanterne læsbare
            const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((timeDifference / (1000 * 60)) % 60);
            const seconds = Math.floor((timeDifference / 1000) % 60);

            countdownElement.textContent = `Tid tilbage: ${hours}t ${minutes}m ${seconds}s`;
        }

        
        updateCountdown();
        const countdownInterval = setInterval(updateCountdown, 1000); // Opdater hvert sekund
    }

    // Initialize the countdown when the DOM is fully loaded
    initializeCountdown();
});
