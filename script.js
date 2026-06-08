document.addEventListener('DOMContentLoaded', () => {
    // --- Loading Animation ---
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        setTimeout(() => {
            loadingOverlay.classList.add('hidden');
        }, 1500); // Hide after 1.5 seconds
    }

    // --- Navbar Sticky & Active Link ---
    const navbar = document.getElementById('navbar');
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const navLinks = document.querySelectorAll('#navbar nav ul li a');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav ul li a');

    const stickyOffset = navbar.offsetTop;

    function handleScroll() {
        // Sticky Navbar
        if (window.pageYOffset >= stickyOffset) {
            navbar.classList.add('sticky');
        } else {
            navbar.classList.remove('sticky');
        }

        // Active Link Highlighting
        let current = '';
        const sections = document.querySelectorAll('section[id]');
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150; // Adjust offset
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        mobileNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile Menu Toggle
    if (mobileMenuToggle && mobileNav) {
        mobileMenuToggle.addEventListener('click', () => {
            mobileNav.classList.toggle('open');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
            mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close mobile menu when a link is clicked
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('open');
                mobileMenuToggle.querySelector('i').classList.toggle('fa-bars');
                mobileMenuToggle.querySelector('i').classList.toggle('fa-times');
            });
        });
    }


    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) { // Show button after scrolling down 300px
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });

        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        questionButton.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // --- AI Chatbot ---
    const aiChatBubble = document.getElementById('ai-chat-bubble');
    const aiChatWindow = document.getElementById('ai-chat-window');
    const closeChatButton = document.querySelector('.close-chat');
    const chatInput = document.getElementById('chat-input');
    const sendChatButton = document.getElementById('send-chat');
    const chatBox = document.getElementById('chat-box');

    if (aiChatBubble && aiChatWindow && closeChatButton && chatInput && sendChatButton && chatBox) {
        aiChatBubble.addEventListener('click', () => {
            aiChatWindow.classList.toggle('open');
            // Optional: change bubble icon when window is open/closed
        });

        closeChatButton.addEventListener('click', () => {
            aiChatWindow.classList.remove('open');
        });

        sendChatButton.addEventListener('click', sendMessage);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        function sendMessage() {
            const userInput = chatInput.value.trim();
            if (userInput === '') return;

            addMessage('user', userInput);
            chatInput.value = '';
            processBotResponse(userInput);
        }

        function addMessage(sender, message) {
            const messageElement = document.createElement('div');
            messageElement.classList.add('message', sender);
            messageElement.textContent = message;
            chatBox.appendChild(messageElement);
            chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
        }

        function processBotResponse(userInput) {
            const botResponse = getBotResponse(userInput);
            addMessage('bot', botResponse);
        }

        function getBotResponse(query) {
            const lowerQuery = query.toLowerCase();
            const clinicInfo = {
                name: "GS Clinic",
                location: "123, Health Street, Near Landmark, Agra, Uttar Pradesh, India",
                timing: "Monday to Saturday, 9:00 AM to 8:00 PM",
                phone: "+91-XXXXXXXXXX",
                email: "info@gsclinicagra.com",
                services: "Cardiology, Dermatology, Pediatrics, General Medicine, Dental Care, and Laboratory Services.",
                doctor_availability_general: "Doctor availability varies. Please check our 'Doctors' section or call us to confirm the availability of a specific specialist.",
                emergency: "For emergencies, please call us immediately at +91-XXXXXXXXXX or visit our clinic. Our team is equipped to handle urgent medical situations."
            };

            if (lowerQuery.includes('timing') || lowerQuery.includes('hours')) {
                return `Our clinic hours are ${clinicInfo.timing}.`;
            } else if (lowerQuery.includes('location') || lowerQuery.includes('address')) {
                return `You can find us at: ${clinicInfo.location}.`;
            } else if (lowerQuery.includes('service') || lowerQuery.includes('speciality')) {
                return `We offer a wide range of services including: ${clinicInfo.services}`;
            } else if (lowerQuery.includes('appointment') || lowerQuery.includes('book') || lowerQuery.includes('schedule')) {
                return `You can book an appointment via our website form, by calling ${clinicInfo.phone}, or via WhatsApp.`;
            } else if (lowerQuery.includes('doctor') && (lowerQuery.includes('available') || lowerQuery.includes('schedule'))) {
                return clinicInfo.doctor_availability_general;
            } else if (lowerQuery.includes('emergency') || lowerQuery.includes('urgent')) {
                return clinicInfo.emergency;
            } else if (lowerQuery.includes('call') || lowerQuery.includes('phone')) {
                return `You can reach us at ${clinicInfo.phone}.`;
            } else if (lowerQuery.includes('email')) {
                return `Our email address is ${clinicInfo.email}.`;
            } else if (lowerQuery.includes('hello') || lowerQuery.includes('hi') || lowerQuery.includes('hey')) {
                return "Hello! How can I assist you today with GS Clinic?";
            } else if (lowerQuery.includes('thank') || lowerQuery.includes('thanks')) {
                return "You're welcome! Is there anything else I can help you with?";
            }
             else {
                return "I can help with clinic timings, location, services, appointments, doctor availability, and emergency information. Please ask one of those questions.";
            }
        }
    }

    // --- Form Submission (basic placeholder) ---
    const appointmentForm = document.getElementById('appointment-form');
    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault();
            alert('Appointment request submitted! We will contact you shortly.');
            // In a real application, you would send this data to a server here.
            appointmentForm.reset();
        });
    }
});
