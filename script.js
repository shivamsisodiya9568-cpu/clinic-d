document.addEventListener('DOMContentLoaded', () => {

    // Preloader
    const preloader = document.getElementById('preloader');
    if (preloader) {
        // Simulate loading for a few seconds, or remove if no preloader needed
        setTimeout(() => {
            preloader.style.opacity = '0';
            preloader.addEventListener('transitionend', () => {
                preloader.style.display = 'none';
            });
        }, 1500); // Adjust duration as needed
    }

    // Sticky Navbar & Back to Top Button
    const header = document.getElementById('header');
    const backToTopButton = document.getElementById('back-to-top');
    const heroSection = document.getElementById('home');

    const scrollHandler = () => {
        const scrollY = window.scrollY;
        const heroHeight = heroSection ? heroSection.offsetHeight : 0;

        // Sticky Navbar effect
        if (scrollY > 50) { // Adjust scroll threshold
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Back to Top Button visibility
        if (scrollY > heroHeight * 0.8) { // Show button after scrolling past 80% of hero section
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', scrollHandler);
    scrollHandler(); // Initial check

    // Back to Top Button click event
    if (backToTopButton) {
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const headerNavButtons = document.querySelector('.nav-buttons');

    if (hamburger && navLinks && headerNavButtons) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            headerNavButtons.classList.toggle('active'); // Also toggle buttons visibility if needed
            // Animate hamburger lines
            hamburger.classList.toggle('is-active');
        });

        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                headerNavButtons.classList.remove('active');
                hamburger.classList.remove('is-active');
            });
        });
    }

    // Smooth Scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Scroll-triggered Animations (Fade-in elements)
    const fadeInElements = document.querySelectorAll('.fade-in, .fade-in-delay, .fade-in-delay-2, .fade-in-delay-3, .fade-in-delay-4, .fade-in-delay-5');

    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.1 // trigger when 10% of the element is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once visible if elements should only animate once
                // observer.unobserve(entry.target);
            } else {
                // Optional: Remove 'visible' class if you want elements to re-animate when scrolling out/in
                // entry.target.classList.remove('visible');
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    fadeInElements.forEach(element => {
        observer.observe(element);
    });


    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => {
            item.classList.toggle('active');
            const answer = item.querySelector('.faq-answer');
            if (item.classList.contains('active')) {
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                answer.style.maxHeight = null;
            }
        });
    });

    // AI Chatbot Logic
    const chatWidget = document.getElementById('chat-widget');
    const chatToggleButton = document.getElementById('chat-toggle-button');
    const closeChatButton = document.getElementById('close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChatButton = document.getElementById('send-chat');
    const chatMessages = document.getElementById('chat-messages');

    // Clinic Info for AI
    const clinicInfo = {
        name: "GS Clinic",
        location: "Agra, Uttar Pradesh, India",
        timing: "Monday to Saturday, 9:00 AM to 8:00 PM",
        services: [
            "Cardiology", "Dermatology", "Pediatrics", "Pulmonology",
            "Orthopedics", "General Medicine"
        ],
        doctors: [
            "Dr. Priya Sharma (Cardiologist)",
            "Dr. Rahul Verma (Dermatologist)",
            "Dr. Aisha Khan (Pediatrician)"
        ],
        appointmentUrl: "#appointments",
        phone: "+91 9876543210",
        email: "info@gsclinicagra.com"
    };

    chatToggleButton.addEventListener('click', () => {
        chatWidget.classList.toggle('visible');
        // Optionally, you might want to reset scroll position when opening
        chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    closeChatButton.addEventListener('click', () => {
        chatWidget.classList.remove('visible');
    });

    function addMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${sender}-message`);
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // Auto-scroll to bottom
    }

    // Basic AI response logic (can be expanded)
    function getAIResponse(userInput) {
        const lowerInput = userInput.toLowerCase();

        if (lowerInput.includes('timing') || lowerInput.includes('hours') || lowerInput.includes('open')) {
            return `Our clinic hours are ${clinicInfo.timing}. We are closed on Sundays.`;
        } else if (lowerInput.includes('location') || lowerInput.includes('address') || lowerInput.includes('where are you')) {
            return `We are located at ${clinicInfo.location}. You can find us on Google Maps via the link in the footer or the 'Find Us' section.`;
        } else if (lowerInput.includes('services') || lowerInput.includes('treatments')) {
            return `We offer a range of services including: ${clinicInfo.services.join(', ')}. Visit our Services section for more details.`;
        } else if (lowerInput.includes('appointment') || lowerInput.includes('book') || lowerInput.includes('schedule')) {
            return `You can book an appointment by filling out the form on our Appointments page, calling us at ${clinicInfo.phone}, or messaging us on WhatsApp.`;
        } else if (lowerInput.includes('doctor') || lowerInput.includes('specialist')) {
            const doctorNames = clinicInfo.doctors.map(d => d.split('(')[0].trim()).join(', ');
            return `Our esteemed doctors include: ${doctorNames}. You can see their profiles and book appointments from the Doctors section.`;
        } else if (lowerInput.includes('emergency')) {
            return "For emergencies, please call us immediately at " + clinicInfo.phone + " or visit the nearest emergency room. We advise calling ahead for emergency situations.";
        } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
            return "Hello! How can I assist you with GS Clinic today?";
        } else if (lowerInput.includes('thank you') || lowerInput.includes('thanks')) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        else {
            return "I can help with information about our timing, location, services, doctors, and booking appointments. For specific medical advice, please consult with our doctors.";
        }
    }

    sendChatButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    function sendMessage() {
        const userInput = chatInput.value.trim();
        if (userInput) {
            addMessage(userInput, 'user');
            chatInput.value = ''; // Clear input

            // Simulate AI thinking
            setTimeout(() => {
                const aiResponse = getAIResponse(userInput);
                addMessage(aiResponse, 'bot');
            }, 1000); // Simulate a small delay for AI response
        }
    }

    // Slider for Reviews (requires a simple implementation or library)
    // This is a basic JS implementation for demonstration. For a full slider, consider libraries like Swiper.js or Slick Carousel.
    const reviews = document.querySelectorAll('.review-card');
    let currentReview = 0;
    const reviewSlider = document.querySelector('.review-slider');

    if (reviews.length > 0 && reviewSlider) {
        // Basic auto-scroll for reviews (optional)
        setInterval(() => {
            // If using snap-scrolling, we might not need to manually scroll, just advance the logic
            // For this example, let's assume we just manage visibility or scroll position manually if needed.
            // In a real slider, you'd manage card visibility or scrollLeft.
            // For now, we rely on CSS scroll-snap and the initial layout.
        }, 5000);
    }

});
