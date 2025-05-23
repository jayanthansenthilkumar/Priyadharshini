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
                'Hi! I\'m Priya. How can I help you?',
                'Hello! Nice to meet you. What would you like to know about me?',
                'Hey there! I\'m happy to chat with you about my work and experience.'
            ]
        },
        introduction: {
            keywords: ['who', 'what', 'name', 'about', 'tell'],
            responses: [
                "I'm Priyadharshini Balakrishnan, a passionate Full Stack Developer who loves creating web applications!",
                "I'm a developer specializing in full-stack web development with a focus on creating impactful solutions.",
                "Let me introduce myself - I'm Priya, and I love turning ideas into reality through code!"
            ]
        },
        projects: {
            keywords: ['project', 'sowberry', 'snapcert', 'portfolio', 'build'],
            details: {
                'sowberry': "I developed the Sowberry Platform, an interactive e-learning system where I implemented course management, live sessions, and progress tracking using Laravel and React.",
                'snapcert': "I created Snapcert, a secure certificate management system where I built digital verification and automated generation features.",
                'general': "I've worked on several exciting projects! My main ones are the Sowberry Platform and Snapcert. Which one would you like to hear about?"
            }
        },
        skills: {
            keywords: ['skill', 'tech', 'code', 'language', 'framework', 'develop'],
            details: {
                'frontend': "In frontend development, I'm proficient in HTML/CSS (90%), JavaScript (85%), and React (80%).",
                'backend': "For backend, I work with PHP (85%), Laravel (80%), and MySQL (75%).",
                'tools': "I'm experienced with Git, VS Code, and various development tools.",
                'general': "I'm a full-stack developer with expertise in both frontend and backend technologies. Would you like to know about specific skills?"
            }
        },
        experience: {
            keywords: ['work', 'job', 'company', 'role', 'prisoltech'],
            responses: [
                "I'm currently working as a Full Stack Developer at PrisolTech, where I develop responsive web applications and implement secure authentication systems.",
                "At PrisolTech, I've gained valuable experience in full-stack development, particularly with Laravel and React.",
                "My professional experience includes creating RESTful APIs, database architectures, and modern web applications."
            ]
        },
        education: {
            keywords: ['study', 'college', 'school', 'degree', 'grade'],
            details: {
                'college': "I'm currently pursuing Computer Science & Business System at Panimalar Engineering College (2023-2027) with a CGPA of 8.819",
                'school': "I completed my schooling at Everwin Matriculation Higher Secondary School with 82% in Secondary School",
                'general': "Would you like to know about my college education or school background?"
            }
        },
        contact: {
            keywords: ['contact', 'mail', 'phone', 'reach', 'connect'],
            responses: [
                "You can reach me through:\nEmail: priyadharshini26806@gmail.com\nPhone: +91 9043400716",
                "The best way to contact me is via email at priyadharshini26806@gmail.com",
                "Feel free to connect with me on LinkedIn or GitHub - links are available on the website!"
            ]
        },
        certificates: {
            keywords: ['cert', 'course', 'training', 'learn', 'udemy'],
            responses: [
                "I've completed certifications in Full Stack Development (Udemy) and React Development (Coursera).",
                "My recent certifications include comprehensive courses in web development and modern frameworks.",
                "Would you like to know more about specific certifications?"
            ]
        },
        achievements: {
            keywords: ['achieve', 'award', 'recognition', 'won', 'accomplishment', 'contest'],
            details: {
                'industrial': "I completed comprehensive training in Industrial Automation Using PLC's at NSIC, Chennai in 2024, gaining hands-on experience with modern manufacturing technologies.",
                'contest': "I secured first place in the Technical Symposium project contest at Panimalar Engineering College in 2024.",
                'general': "I have notable achievements in both academic and technical fields. Would you like to know about my industrial training or project contests?"
            }
        },
        personality: {
            keywords: ['person', 'interest', 'hobby', 'like', 'passion', 'characteristic'],
            responses: [
                "I'm a passionate developer who loves creating innovative solutions. I'm detail-oriented and always eager to learn new technologies.",
                "Beyond coding, I'm enthusiastic about problem-solving and creating user-friendly applications.",
                "I'm known for my dedication to clean code and ability to work well in team environments."
            ]
        },
        location: {
            keywords: ['where', 'location', 'city', 'country', 'based', 'live'],
            responses: [
                "I'm based in Chennai, India.",
                "I'm currently working and residing in Chennai, one of India's major tech hubs.",
                "Located in Chennai, India, I'm actively involved in the local tech community."
            ]
        },
        availability: {
            keywords: ['available', 'hire', 'freelance', 'opportunity', 'job', 'position'],
            responses: [
                "I'm always open to exciting opportunities in web development and full-stack projects!",
                "Feel free to reach out to me via email or LinkedIn to discuss potential collaborations.",
                "While I'm focused on my current work, I'm always interested in hearing about challenging new projects."
            ]
        },
        technical: {
            keywords: ['api', 'database', 'system', 'architecture', 'design', 'stack'],
            details: {
                'frontend': "I specialize in creating responsive, user-friendly interfaces using React and modern CSS frameworks.",
                'backend': "My backend expertise includes RESTful API design, database optimization, and secure authentication systems.",
                'database': "I work with both SQL (MySQL) and NoSQL databases, focusing on efficient data structuring.",
                'architecture': "I implement scalable architectures following clean code principles and modern design patterns.",
                'general': "I have extensive full-stack experience. Which aspect would you like to know more about?"
            }
        },
        learning: {
            keywords: ['learn', 'studying', 'focus', 'growth', 'improve', 'future'],
            responses: [
                "I'm currently focusing on advanced React patterns and cloud technologies.",
                "I'm actively learning about AI integration in web applications and microservices architecture.",
                "My learning roadmap includes cloud deployment, DevOps practices, and advanced system design."
            ]
        },
        workflow: {
            keywords: ['process', 'methodology', 'approach', 'work', 'practice', 'git'],
            details: {
                'development': "I follow agile methodologies with emphasis on clean code and thorough testing.",
                'tools': "I use Git for version control, Jira for project management, and modern IDE tools.",
                'practices': "I implement CI/CD pipelines and follow test-driven development principles.",
                'general': "Would you like to know about my development process, tools, or best practices?"
            }
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

        // Add context awareness
        if (bestMatch.category === 'technical' && lowercaseMsg.includes('example')) {
            bestMatch.data.details.example = "Here's a real example from Priya's work: The Sowberry Platform uses React for the frontend and Laravel for the backend, implementing JWT authentication and real-time features.";
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
