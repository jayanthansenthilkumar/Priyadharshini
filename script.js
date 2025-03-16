const titles = ["Web Developer","Frontend Developer","Full Stack Developer","UI/UX Designer"];
const typedText = document.querySelector(".typed-text");
let titleIndex = 0;
let charIndex = 0;
function type() {
    if (charIndex < titles[titleIndex].length) {
        typedText.textContent += titles[titleIndex].charAt(charIndex);
        charIndex++;
        setTimeout(type, 100);
    } else {
        setTimeout(erase, 2000);
    }
}
function erase() {
    if (charIndex > 0) {
        typedText.textContent = titles[titleIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(erase, 50);
    } else {
        titleIndex = (titleIndex + 1) % titles.length;
        setTimeout(type, 1000);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(type, 1000);
    
    // Hero particles configuration
    const heroParticlesConfig = {
        particles: {
            number: { value: 80 },
            color: { value: '#2563eb' },
            opacity: { value: 0.2 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2563eb',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2
            }
        }
    };
    
    // Footer particles configuration - different style
    const footerParticlesConfig = {
        particles: {
            number: { value: 80 },
            color: { value: '#2563eb' },
            opacity: { value: 0.2 },
            size: { value: 3 },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#2563eb',
                opacity: 0.1,
                width: 1
            },
            move: {
                enable: true,
                speed: 2
            }
        }
    };
    
    // Initialize main particles
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', heroParticlesConfig);
    }
    
    // Initialize footer particles with different configuration
    if (document.getElementById('particles-js-footer')) {
        particlesJS('particles-js-footer', footerParticlesConfig);
    }

    const sections = document.querySelectorAll('section, .hero');
    const navItems = document.querySelectorAll('.nav-content ul li');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
                const id = entry.target.classList.contains('hero') ? 'home' : entry.target.getAttribute('id');
                updateActiveNav(id);
            }
        });
    }, { 
        threshold: [0.2, 0.5, 0.8],
        rootMargin: '-10% 0px -10% 0px'
    });
    function updateActiveNav(id) {
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.querySelector(`a[href="#${id}"]`)) {
                item.classList.add('active');
            }
        });
    }

    sections.forEach(section => observer.observe(section));
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                current = section.classList.contains('hero') ? 'home' : section.getAttribute('id');
            }
        });
        if (current) {
            updateActiveNav(current);
        }
    });

    // Tab functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked button and corresponding pane
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
        });
    });

    // AI Assistant functionality
    const toggleAI = document.getElementById('toggleAI');
    const closeAI = document.getElementById('closeAI');
    const aiContainer = document.querySelector('.ai-chat-container');
    const aiInput = document.getElementById('aiInput');
    const aiSend = document.getElementById('aiSend');
    const aiMessages = document.getElementById('aiMessages');
    const minimizeAI = document.getElementById('minimizeAI');

    // Enhanced AI responses with optimized keywords
    const aiResponses = {
        greetings: {
            keywords: ['hi', 'hello', 'hey', 'morning', 'afternoon', 'evening'],
            responses: [
                'Hello! How can I help you learn more about Priya?',
                'Hi there! What would you like to know about Priya?',
                'Welcome! I\'m here to help you learn about Priya\'s work and experience.'
            ]
        },
        introduction: {
            keywords: ['who', 'what', 'name', 'about', 'tell'],
            responses: [
                "I'm Priya's AI assistant, designed to help you learn about her work and experience!",
                "I'm here to tell you all about Priyadharshini Balakrishnan, a talented Full Stack Developer.",
                "Let me introduce you to Priya - she's a passionate developer specializing in web applications."
            ]
        },
        projects: {
            keywords: ['project', 'sowberry', 'snapcert', 'portfolio', 'build'],
            details: {
                'sowberry': "The Sowberry Platform is an interactive e-learning platform featuring course management, live sessions, and progress tracking. It uses Laravel and React.",
                'snapcert': "Snapcert is a secure certificate management system with digital verification and automated generation features.",
                'general': "Priya has worked on several impressive projects. The main ones are Sowberry Platform and Snapcert. Which one would you like to know more about?"
            }
        },
        skills: {
            keywords: ['skill', 'tech', 'code', 'language', 'framework', 'develop'],
            details: {
                'frontend': "In frontend development, Priya is proficient in HTML/CSS (90%), JavaScript (85%), and React (80%).",
                'backend': "For backend, Priya works with PHP (85%), Laravel (80%), and MySQL (75%).",
                'tools': "Priya is experienced with Git, VS Code, and various development tools.",
                'general': "Priya is a full-stack developer with expertise in both frontend and backend technologies. Would you like to know about specific skills?"
            }
        },
        experience: {
            keywords: ['work', 'job', 'company', 'role', 'prisoltech'],
            responses: [
                "Priya is currently working as a Full Stack Developer at PrisolTech, where she develops responsive web applications and implements secure authentication systems.",
                "At PrisolTech, Priya has gained valuable experience in full-stack development, particularly with Laravel and React.",
                "Her professional experience includes creating RESTful APIs, database architectures, and modern web applications."
            ]
        },
        education: {
            keywords: ['study', 'college', 'school', 'degree', 'grade'],
            details: {
                'college': "Currently pursuing Computer Science & Business System at Panimalar Engineering College (2023-2027) with a CGPA of 8.819",
                'school': "Completed schooling at Everwin Matriculation Higher Secondary School with 82% in Secondary School",
                'general': "Would you like to know about Priya's college education or school background?"
            }
        },
        contact: {
            keywords: ['contact', 'mail', 'phone', 'reach', 'connect'],
            responses: [
                "You can reach Priya through:\nEmail: priyadharshini26806@gmail.com\nPhone: +91 9043400716",
                "The best way to contact Priya is via email at priyadharshini26806@gmail.com",
                "Feel free to connect with Priya on LinkedIn or GitHub - links are available on the website!"
            ]
        },
        certificates: {
            keywords: ['cert', 'course', 'training', 'learn', 'udemy'],
            responses: [
                "Priya has completed certifications in Full Stack Development (Udemy) and React Development (Coursera).",
                "Her recent certifications include comprehensive courses in web development and modern frameworks.",
                "Would you like to know more about specific certifications?"
            ]
        }
    };

    function analyzeMessage(message) {
        const lowercaseMsg = message.toLowerCase();
        let bestMatch = {
            category: null,
            score: 0
        };

        // Analyze each category
        for (const [category, data] of Object.entries(aiResponses)) {
            const score = data.keywords.reduce((acc, keyword) => {
                return acc + (lowercaseMsg.includes(keyword) ? 1 : 0);
            }, 0);

            if (score > bestMatch.score) {
                bestMatch = {
                    category,
                    score,
                    data
                };
            }
        }

        if (bestMatch.score === 0) {
            return {
                response: "I'm not sure I understand. You can ask me about Priya's projects, skills, experience, education, or contact information. How can I help?",
                category: 'default'
            };
        }

        // Generate appropriate response based on category and context
        let response;
        if (bestMatch.data.details) {
            // For categories with specific details
            for (const [key, detail] of Object.entries(bestMatch.data.details)) {
                if (lowercaseMsg.includes(key)) {
                    response = detail;
                    break;
                }
            }
            response = response || bestMatch.data.details.general;
        } else {
            // For categories with direct responses
            response = bestMatch.data.responses[Math.floor(Math.random() * bestMatch.data.responses.length)];
        }

        return {
            response,
            category: bestMatch.category
        };
    }

    function addMessage(message, isUser = false, category = '') {
        const messageDiv = document.createElement('div');
        messageDiv.className = `ai-message ${isUser ? 'user-message' : ''}`;
        
        // Add category-specific styling or icons
        const icon = isUser ? 'ri-user-line' : 
                    (category === 'projects' ? 'ri-code-box-line' :
                     category === 'skills' ? 'ri-tools-line' :
                     category === 'education' ? 'ri-graduation-cap-line' :
                     category === 'contact' ? 'ri-contacts-line' :
                     'ri-robot-line');

        messageDiv.innerHTML = `
            <i class="${icon}"></i>
            <p>${message}</p>
        `;
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }

    function handleSend() {
        const message = aiInput.value.trim();
        if (message) {
            addMessage(message, true);
            aiInput.value = '';
            
            // Analyze message and get response
            setTimeout(() => {
                const analysis = analyzeMessage(message);
                addMessage(analysis.response, false, analysis.category);
            }, 500);
        }
    }

    toggleAI.addEventListener('click', () => {
        aiContainer.classList.add('active');
    });

    closeAI.addEventListener('click', () => {
        aiContainer.classList.remove('active');
    });

    aiSend.addEventListener('click', handleSend);
    
    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    minimizeAI.addEventListener('click', () => {
        aiContainer.classList.remove('active');
        // Show a notification that the chat is minimized
        const notification = document.createElement('div');
        notification.className = 'ai-notification';
        notification.textContent = 'Chat minimized. Click the AI button to restore.';
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    });
});
