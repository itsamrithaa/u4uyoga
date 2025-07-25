document.addEventListener("DOMContentLoaded", function() {

    // --- Mobile Navigation ---
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
            navLinks.classList.toggle('active');
        });
    }

    // --- Lead Magnet Modal (Homepage only) - UPDATED ---
const leadMagnetModal = document.getElementById('lead-magnet-modal');
if (leadMagnetModal) {
    const closeModalButtons = leadMagnetModal.querySelectorAll('.close-modal');
    
    // Check if the user has EVER closed the modal before
    const modalAlreadyShown = localStorage.getItem('u4uModalClosed');

    const showModal = () => {
        // Only show if it has NEVER been closed
        if (!modalAlreadyShown) {
            leadMagnetModal.classList.add('show');
        }
    };

    const closeModal = () => {
        // When closing, set the permanent flag in localStorage
        localStorage.setItem('u4uModalClosed', 'true');
        leadMagnetModal.classList.remove('show');
    };

    // Show modal after a delay
    setTimeout(showModal, 5000); // 5-second delay

    // Add event listeners to BOTH close buttons
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });

    // Also allow closing by clicking the background
    leadMagnetModal.addEventListener('click', (e) => {
        if (e.target === leadMagnetModal) {
            closeModal();
        }
    });
}

// And finally, we need a small CSS addition for the new buttons.
// Please add this small block to the END of your style.css file.

    // --- Testimonial Data ---
    const testimonials = [
        {
            quote: "Safara creates a warm and nurturing holding environment... Listening to her soft and unwavering tone and instructions immediately calmed my nervous system... My digestive system felt calmer by the end and I felt more love and appreciation for my body.",
            author: "Anonymous, Northampton MA"
        },
        {
            quote: "I absolutely KNOW in my cells, that I was transformed in concrete obvious ways as well as subtle, hidden, and still-unfolding ways. My evolution of space--both internal and external--feels potent and accessible... I think you are an amazing and powerful healer and would recommend you without reservation to anyone!",
            author: "Ethan, Hadley MA"
        },
        {
            quote: "The first word that comes to mind when I think of Safara, and our session is 'presence'... Safara skillfully took me through approaching this challenge with steadiness and gentleness, which was a refreshing contrast from my usual inner monologue of 'shoulds' and shame.",
            author: "Laura Doyle, Baltimore MD"
        },
        {
            quote: "I decided to work with Safara as she is a compassionate minimalist. By helping me organize a successful approach to decluttering, keeping me on track and motivated, I felt lighter each week. Safara brings a clear organized, non-judgmental approach to what feels like a mountain.",
            author: "Linnea, Westhampton, MA"
        },
        {
            quote: "Safara thank you for your calming voice. This dog was 'off the chain' before you started.",
            author: "Patti (Dill)"
        }
    ];

    // --- Testimonial Carousel ---
    const carouselContainer = document.querySelector('.testimonial-carousel');
    if (carouselContainer) {
        const slidesContainer = carouselContainer.querySelector('.testimonial-slides');
        const dotsContainer = carouselContainer.querySelector('.carousel-dots');
        let currentIndex = 0;
        let intervalId;

        // Create slides and dots
        testimonials.forEach((testimonial, index) => {
            // Slide
            const slide = document.createElement('div');
            slide.className = 'testimonial-slide';
            slide.innerHTML = `
                <p class="testimonial-quote">“${testimonial.quote}”</p>
                <p class="testimonial-author">— ${testimonial.author}</p>
            `;
            slidesContainer.appendChild(slide);

            // Dot
            const dot = document.createElement('button');
            dot.className = 'dot';
            dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
            dot.addEventListener('click', () => {
                goToSlide(index);
                resetInterval();
            });
            dotsContainer.appendChild(dot);
        });

        const allSlides = slidesContainer.querySelectorAll('.testimonial-slide');
        const allDots = dotsContainer.querySelectorAll('.dot');
        
        const goToSlide = (index) => {
            slidesContainer.style.transform = `translateX(-${index * 100}%)`;
            allDots.forEach(d => d.classList.remove('active'));
            allDots[index].classList.add('active');
            currentIndex = index;
        };
        
        const nextSlide = () => {
            const nextIndex = (currentIndex + 1) % testimonials.length;
            goToSlide(nextIndex);
        };
        
        const prevSlide = () => {
            const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            goToSlide(prevIndex);
        };

        const resetInterval = () => {
            clearInterval(intervalId);
            intervalId = setInterval(nextSlide, 9000); // Rotate every 9 seconds
        };
        
        // Event Listeners
        carouselContainer.querySelector('.next').addEventListener('click', () => {
            nextSlide();
            resetInterval();
        });
        carouselContainer.querySelector('.prev').addEventListener('click', () => {
            prevSlide();
            resetInterval();
        });

        // Initialize
        goToSlide(0);
        resetInterval();
    }


    // --- FAQ Accordion - CORRECTED ---
const faqCards = document.querySelectorAll('.faq-card');
if (faqCards) {
    faqCards.forEach(card => {
        const question = card.querySelector('.faq-question');
        const answer = card.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = card.classList.contains('active');

            // First, close all other cards
            faqCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('active');
                    otherCard.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Then, toggle the clicked card
            if (!isActive) {
                card.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                card.classList.remove('active');
                answer.style.maxHeight = null;
            }
        });
    });
}

    // --- Fade-in Animations on Scroll ---
    const fadeUpElements = document.querySelectorAll('.fade-in-up');
    if (fadeUpElements) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = `fadeInUp 0.8s ease-out forwards`;
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        fadeUpElements.forEach(el => observer.observe(el));
    }

});