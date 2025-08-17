class ContinuousCarousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        this.track = this.container.querySelector(".carousel-track");
        this.prevBtn = this.container.querySelector(".prev");
        this.nextBtn = this.container.querySelector(".next");
        this.indicatorsContainer = document.getElementById("indicators");

        // Configuration
        this.cardData = options.cardData || [1, 2, 3, 4, 5, 6, 7, 8];
        this.autoplayDelay = options.autoplayDelay || 3500;
        this.transitionDuration = 500;

        // State
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        this.cardWidth = 0;
        this.visibleCards = 0;
        this.isHovered = false; // Track hover state

        this.init();
    }

    init() {
        this.createCards();
        this.createIndicators();
        this.calculateDimensions();
        this.bindEvents();
        this.startAutoplay();

        // Handle resize
        window.addEventListener("resize", () => {
            this.calculateDimensions();
            this.updatePosition(false);
        });
    }

    createCards() {
        // Create multiple sets for seamless looping
        const totalSets = 3;
        this.track.innerHTML = "";

        for (let set = 0; set < totalSets; set++) {
            this.cardData.forEach((data) => {
                const card = document.createElement("div");
                card.className = "testimonial-card";
                card.innerHTML = data;
                this.track.appendChild(card);
            });
        }

        this.totalCards = this.cardData.length;
        this.allCards = this.track.querySelectorAll(".testimonial-card");
    }

    createIndicators() {
        this.indicatorsContainer.innerHTML = "";
        this.cardData.forEach((_, index) => {
            const indicator = document.createElement("div");
            indicator.className = "indicator";
            indicator.addEventListener("click", () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators =
            this.indicatorsContainer.querySelectorAll(".indicator");
    }

    calculateDimensions() {
        const containerWidth = this.container.offsetWidth;
        const firstCard = this.allCards[0];
        const cardStyle = window.getComputedStyle(firstCard);
        const gap = parseInt(cardStyle.marginRight) || 15;

        this.cardWidth = firstCard.offsetWidth + gap;
        this.visibleCards = Math.floor(containerWidth / this.cardWidth);

        // Start from the middle set
        this.currentIndex = this.totalCards;
        this.updatePosition(false);
    }

    updatePosition(animate = true) {
        const translateX = -this.currentIndex * this.cardWidth;

        if (animate) {
            this.track.style.transition = `transform ${this.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        } else {
            this.track.style.transition = "none";
        }

        this.track.style.transform = `translateX(${translateX}px)`;

        // Update indicators
        const realIndex = this.currentIndex % this.totalCards;
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === realIndex);
        });
    }

    next() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex++;
        this.updatePosition(true);

        setTimeout(() => {
            // If we've moved past the second set, jump back to the first set
            if (this.currentIndex >= this.totalCards * 2) {
                this.currentIndex = this.totalCards;
                this.updatePosition(false);
            }
            this.isTransitioning = false;
        }, this.transitionDuration);
    }

    prev() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex--;
        this.updatePosition(true);

        setTimeout(() => {
            // If we've moved before the first set, jump to the second set
            if (this.currentIndex < this.totalCards) {
                this.currentIndex = this.totalCards * 2 - 1;
                this.updatePosition(false);
            }
            this.isTransitioning = false;
        }, this.transitionDuration);
    }

    goToSlide(index) {
        if (this.isTransitioning) return;

        const currentRealIndex = this.currentIndex % this.totalCards;
        const diff = index - currentRealIndex;

        this.currentIndex += diff;
        this.updatePosition(true);

        this.restartAutoplay();
    }

    startAutoplay() {
        // Only start if not hovered and not already running
        if (!this.isHovered && !this.autoplayInterval) {
            this.autoplayInterval = setInterval(() => {
                this.next();
            }, this.autoplayDelay);
        }
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    restartAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }

    bindEvents() {
        this.nextBtn.addEventListener("click", () => {
            this.next();
            this.restartAutoplay();
        });

        this.prevBtn.addEventListener("click", () => {
            this.prev();
            this.restartAutoplay();
        });

        // Improved hover handling
        this.container.addEventListener("mouseenter", () => {
            this.isHovered = true;
            this.stopAutoplay();
        });

        this.container.addEventListener("mouseleave", () => {
            this.isHovered = false;
            this.startAutoplay(); // This will only start if not hovered
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;
        let startTime = 0;

        this.track.addEventListener("touchstart", (e) => {
            // Don't interfere with button clicks
            if (e.target.classList.contains('testimonial-modal-btn')) {
                return;
            }

            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
            isDragging = false; // Don't set to true immediately
            this.stopAutoplay();
        });

        this.track.addEventListener("touchmove", (e) => {
            // Don't interfere with button clicks
            if (e.target.classList.contains('testimonial-modal-btn')) {
                return;
            }

            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;

            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);

            // Only start dragging if horizontal movement is greater than vertical
            // and movement is significant (more than 10px)
            if (!isDragging && diffX > 10 && diffX > diffY) {
                isDragging = true;
            }

            // Only prevent default if we're actually dragging
            if (isDragging) {
                e.preventDefault();
            }
        });

        this.track.addEventListener("touchend", (e) => {
            // Don't interfere with button clicks
            if (e.target.classList.contains('testimonial-modal-btn')) {
                this.startAutoplay();
                return;
            }

            if (!isDragging) {
                this.startAutoplay();
                return;
            }

            const diff = startX - currentX;
            const threshold = 50;
            const timeDiff = Date.now() - startTime;

            // Only trigger swipe if it was a quick gesture and moved enough
            if (Math.abs(diff) > threshold && timeDiff < 300) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }

            isDragging = false;
            this.startAutoplay();
        });
    }
}

// Initialize the carousel
const carousel = new ContinuousCarousel(".carousel-container", {
    cardData: createCardContent(["../assets/about-image.jpeg", "../assets/editing-image.jpeg", "../assets/content-writting.webp"]),
    autoplayDelay: 3000,
});

function createCardContent(imageUrls) {
    return imageUrls.map((url) => {
        return `
    <div
        class="bg-[var(--bg-primary)] dark:bg-[var(--bg-primary)] rounded-2xl shadow-xl overflow-hidden h-full"
    >
        <!-- Top Section - Black Background -->
        <div class="bg-gray-900 p-4 h-48 flex items-center justify-center">
            <img
                src="${url}"
                alt="Student Testimonial"
                class="w-full h-full object-cover rounded-lg"
            />
        </div>

        <!-- Bottom Section - Primary Color Background -->
        <div class="p-6" style="background: var(--primary-color)">
            <h3 class="text-xl font-bold text-white mb-4">
                Our Student's Feedback
            </h3>
            <p class="text-white/90 mb-4 text-sm">
                The support and guidance provided throughout the
                course has been exceptional. I've gained confidence
                and practical skills that I can immediately apply.
            </p>
            <button 
                class="testimonial-modal-btn bg-white text-gray-900 px-4 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                data-image="${url}"
            >
                Click here
            </button>
        </div>
    </div>
`;
    });
}

// Modal functionality
function initializeModal() {
    const modal = document.getElementById('image-modal');
    const modalImage = document.getElementById('modal-image');
    const closeModal = document.getElementById('close-modal');

    // Function to open modal with image
    function openModal(imageSrc) {
        modalImage.src = imageSrc;
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }

    // Function to close modal
    function closeModalHandler() {
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scrolling
        modalImage.src = ''; // Clear image src
    }

    // Event listeners for modal
    closeModal.addEventListener('click', closeModalHandler);

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModalHandler();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModalHandler();
        }
    });

    // Add event listeners to all testimonial buttons with better mobile support
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('testimonial-modal-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = e.target.getAttribute('data-image');
            openModal(imageSrc);
        }
    });

    // Add touch event for mobile - sometimes click events don't work well on mobile
    document.addEventListener('touchend', (e) => {
        if (e.target.classList.contains('testimonial-modal-btn')) {
            e.preventDefault();
            e.stopPropagation();
            const imageSrc = e.target.getAttribute('data-image');
            openModal(imageSrc);
        }
    });
}

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeModal);

// Clients Carousel Class
class ClientsCarousel {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        this.track = this.container.querySelector(".clients-carousel-track");
        this.prevBtn = this.container.querySelector(".prev");
        this.nextBtn = this.container.querySelector(".next");
        this.indicatorsContainer = document.getElementById("clientsIndicators");

        // Configuration
        this.clientData = options.clientData || [];
        this.autoplayDelay = options.autoplayDelay || 4000;
        this.transitionDuration = 500;

        // State
        this.currentIndex = 0;
        this.isTransitioning = false;
        this.autoplayInterval = null;
        this.cardWidth = 0;
        this.visibleCards = 0;
        this.isHovered = false;

        this.init();
    }

    init() {
        this.createClientCards();
        this.createIndicators();
        this.calculateDimensions();
        this.bindEvents();
        this.startAutoplay();

        // Handle resize
        window.addEventListener("resize", () => {
            this.calculateDimensions();
            this.updatePosition(false);
        });
    }

    createClientCards() {
        // Create multiple sets for seamless looping
        const totalSets = 3;
        this.track.innerHTML = "";

        for (let set = 0; set < totalSets; set++) {
            this.clientData.forEach((client) => {
                const card = document.createElement("div");
                card.className = "client-card";
                card.innerHTML = client;
                this.track.appendChild(card);
            });
        }

        this.totalCards = this.clientData.length;
        this.allCards = this.track.querySelectorAll(".client-card");
    }

    createIndicators() {
        this.indicatorsContainer.innerHTML = "";
        this.clientData.forEach((_, index) => {
            const indicator = document.createElement("div");
            indicator.className = "client-indicator";
            indicator.addEventListener("click", () => this.goToSlide(index));
            this.indicatorsContainer.appendChild(indicator);
        });
        this.indicators = this.indicatorsContainer.querySelectorAll(".client-indicator");
    }

    calculateDimensions() {
        const containerWidth = this.container.offsetWidth;
        const firstCard = this.allCards[0];
        const cardStyle = window.getComputedStyle(firstCard);
        const gap = parseInt(cardStyle.marginRight) || 20;

        this.cardWidth = firstCard.offsetWidth + gap;
        this.visibleCards = Math.floor(containerWidth / this.cardWidth);

        // Start from the middle set
        this.currentIndex = this.totalCards;
        this.updatePosition(false);
    }

    updatePosition(animate = true) {
        const translateX = -this.currentIndex * this.cardWidth;

        if (animate) {
            this.track.style.transition = `transform ${this.transitionDuration}ms cubic-bezier(0.25, 0.46, 0.45, 0.94)`;
        } else {
            this.track.style.transition = "none";
        }

        this.track.style.transform = `translateX(${translateX}px)`;

        // Update indicators
        const realIndex = this.currentIndex % this.totalCards;
        this.indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === realIndex);
        });
    }

    next() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex++;
        this.updatePosition(true);

        setTimeout(() => {
            // If we've moved past the second set, jump back to the first set
            if (this.currentIndex >= this.totalCards * 2) {
                this.currentIndex = this.totalCards;
                this.updatePosition(false);
            }
            this.isTransitioning = false;
        }, this.transitionDuration);
    }

    prev() {
        if (this.isTransitioning) return;

        this.isTransitioning = true;
        this.currentIndex--;
        this.updatePosition(true);

        setTimeout(() => {
            // If we've moved before the first set, jump to the second set
            if (this.currentIndex < this.totalCards) {
                this.currentIndex = this.totalCards * 2 - 1;
                this.updatePosition(false);
            }
            this.isTransitioning = false;
        }, this.transitionDuration);
    }

    goToSlide(index) {
        if (this.isTransitioning) return;

        const currentRealIndex = this.currentIndex % this.totalCards;
        const diff = index - currentRealIndex;

        this.currentIndex += diff;
        this.updatePosition(true);

        this.restartAutoplay();
    }

    startAutoplay() {
        if (!this.isHovered && !this.autoplayInterval) {
            this.autoplayInterval = setInterval(() => {
                this.next();
            }, this.autoplayDelay);
        }
    }

    stopAutoplay() {
        if (this.autoplayInterval) {
            clearInterval(this.autoplayInterval);
            this.autoplayInterval = null;
        }
    }

    restartAutoplay() {
        this.stopAutoplay();
        this.startAutoplay();
    }

    bindEvents() {
        this.nextBtn.addEventListener("click", () => {
            this.next();
            this.restartAutoplay();
        });

        this.prevBtn.addEventListener("click", () => {
            this.prev();
            this.restartAutoplay();
        });

        // Hover handling
        this.container.addEventListener("mouseenter", () => {
            this.isHovered = true;
            this.stopAutoplay();
        });

        this.container.addEventListener("mouseleave", () => {
            this.isHovered = false;
            this.startAutoplay();
        });

        // Touch/swipe support
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;
        let isDragging = false;
        let startTime = 0;

        this.track.addEventListener("touchstart", (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
            startTime = Date.now();
            isDragging = false;
            this.stopAutoplay();
        });

        this.track.addEventListener("touchmove", (e) => {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;

            const diffX = Math.abs(currentX - startX);
            const diffY = Math.abs(currentY - startY);

            if (!isDragging && diffX > 10 && diffX > diffY) {
                isDragging = true;
            }

            if (isDragging) {
                e.preventDefault();
            }
        });

        this.track.addEventListener("touchend", (e) => {
            if (!isDragging) {
                this.startAutoplay();
                return;
            }

            const diff = startX - currentX;
            const threshold = 50;
            const timeDiff = Date.now() - startTime;

            if (Math.abs(diff) > threshold && timeDiff < 300) {
                if (diff > 0) {
                    this.next();
                } else {
                    this.prev();
                }
            }

            isDragging = false;
            this.startAutoplay();
        });
    }
}

// Initialize the clients carousel
// Initialize the clients carousel
const clientsCarousel = new ClientsCarousel(".clients-carousel-container", {
    clientData: createClientCards([
        '../assets/asm-client.png',
        '../assets/Client _n(1).jpg',
        '../assets/Client _n(2).jpg',
        "../assets/Client _n(3).jpg",
        "../assets/Client _n(4).jpg",
        "../assets/Client _n.jpg",
        "../assets/Client(1).jpg",
        "../assets/Client(2).jpg",
        "../assets/Client(3).jpg",
        '../assets/Client(4).jpg',
        "../assets/Client(5).jpg",
        "../assets/Client(6).jpg",
        "../assets/client.jpeg",
        "../assets/Client.jpg",
        "../assets/Client.png",
    ])
    ,
    autoplayDelay: 4000,
});

function createClientCards(imageUrls) {
    return imageUrls.map((url) => {
        return `<img src="${url}">`
    })
}