/**
 * Vaid Tamrakar Portfolio Engine
 * - Smooth Drawer Navigation
 * - Typewriter Hero Cycling
 * - IntersectionObserver Scroll Reveal
 * - Active Section Tracking
 * - Vedu AI Assistant (Secure, text-rendered, intelligent fallback)
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initDrawerNavigation();
  initScrollAnimations();
  initActiveNavHighlight();
  initContactForm();
  initVeduChatbot();
});

/* ==========================================================================
   1. Dynamic Typewriter Effect for Hero
   ========================================================================== */
function initTypewriter() {
  const element = document.getElementById('typewriterText');
  if (!element) return;

  const roles = [
    'Student & Aspiring Developer',
    'Postgraduate in Science',
    'Analytical Problem Solver',
    'Modern Web Enthusiast'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typeSpeed = 90;
  const deleteSpeed = 45;
  const pauseTime = 1800;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      element.textContent = currentRole.substring(0, charIndex);
    } else {
      charIndex++;
      element.textContent = currentRole.substring(0, charIndex);
    }

    let delay = isDeleting ? deleteSpeed : typeSpeed;

    if (!isDeleting && charIndex === currentRole.length) {
      delay = pauseTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/* ==========================================================================
   2. Glass Navigation Drawer (Mobile / Small Screens)
   ========================================================================== */
function initDrawerNavigation() {
  const drawer = document.getElementById('glassDrawer');
  const backdrop = document.getElementById('drawerBackdrop');
  const openBtn = document.getElementById('drawerOpenBtn');
  const closeBtn = document.getElementById('drawerCloseBtn');
  const links = drawer.querySelectorAll('.drawer-link');

  function openDrawer() {
    drawer.classList.add('active');
    backdrop.classList.add('active');
    drawer.setAttribute('aria-hidden', 'false');
    openBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    drawer.classList.remove('active');
    backdrop.classList.remove('active');
    drawer.setAttribute('aria-hidden', 'true');
    openBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  openBtn?.addEventListener('click', openDrawer);
  closeBtn?.addEventListener('click', closeDrawer);
  backdrop?.addEventListener('click', closeDrawer);

  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('active')) {
      closeDrawer();
    }
  });
}

/* ==========================================================================
   3. IntersectionObserver Smooth Scroll Reveals
   ========================================================================== */
function initScrollAnimations() {
  const reveals = document.querySelectorAll('.reveal-on-scroll');
  if (!('IntersectionObserver' in window)) {
    reveals.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  reveals.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. Active Navigation State on Scroll
   ========================================================================== */
function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const desktopLinks = document.querySelectorAll('.nav-link');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
        drawerLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${sectionId}`);
        });
      }
    });
  }, { passive: true });
}

/* ==========================================================================
   5. Interactive Contact Form (Validation & Feedback)
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('contactForm');
  const status = document.getElementById('formStatus');
  if (!form || !status) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = form.userName.value.trim();
    const email = form.userEmail.value.trim();
    const message = form.userMessage.value.trim();

    if (!name || !email || !message) {
      status.textContent = 'Please fill out all fields.';
      status.style.color = '#f87171';
      return;
    }

    // Client-side confirmation state
    status.textContent = `Thank you, ${name}! Your message has been prepared.`;
    status.style.color = '#4ade80';
    form.reset();

    setTimeout(() => {
      status.textContent = '';
    }, 5000);
  });
}

/* ==========================================================================
   6. Live AI Chatbot: Vedu
   ========================================================================== */
function initVeduChatbot() {
  const triggerBtn = document.getElementById('chatTriggerBtn');
  const chatWindow = document.getElementById('chatWindow');
  const closeBtn = document.getElementById('chatCloseBtn');
  const messagesContainer = document.getElementById('chatMessages');
  const inputForm = document.getElementById('chatInputForm');
  const inputField = document.getElementById('chatInput');
  const quickChips = document.getElementById('quickChips');

  let hasGreeted = false;

  // Toggle chat window visibility
  function toggleChat() {
    const isOpen = chatWindow.classList.contains('active');
    if (isOpen) {
      chatWindow.classList.remove('active');
      chatWindow.setAttribute('aria-hidden', 'true');
      triggerBtn.setAttribute('aria-expanded', 'false');
    } else {
      chatWindow.classList.add('active');
      chatWindow.setAttribute('aria-hidden', 'false');
      triggerBtn.setAttribute('aria-expanded', 'true');
      if (!hasGreeted) {
        appendMessage('bot', "Hey there! I'm Vedu, Vaid's AI assistant. Ask me anything about Vaid's skills, projects, or background!");
        hasGreeted = true;
      }
      setTimeout(() => inputField.focus(), 200);
    }
  }

  triggerBtn?.addEventListener('click', toggleChat);
  closeBtn?.addEventListener('click', toggleChat);

  // Quick Chips Query Handler
  quickChips?.addEventListener('click', (e) => {
    if (e.target.classList.contains('chip-btn')) {
      const query = e.target.getAttribute('data-query');
      if (query) {
        inputField.value = query;
        handleUserMessage(query);
      }
    }
  });

  // Handle Form Submission
  inputForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = inputField.value.trim();
    if (!message) return;
    handleUserMessage(message);
  });

  async function handleUserMessage(text) {
    appendMessage('user', text);
    inputField.value = '';
    inputField.disabled = true;

    const typingElement = showTypingIndicator();

    try {
      // Connects to serverless endpoint if available; falls back gracefully
      const botResponse = await queryVeduService(text);
      removeTypingIndicator(typingElement);
      appendMessage('bot', botResponse);
    } catch {
      removeTypingIndicator(typingElement);
      appendMessage('bot', getLocalKnowledgeResponse(text));
    } finally {
      inputField.disabled = false;
      inputField.focus();
    }
  }

  // Safe DOM text rendering (Zero innerHTML XSS risk)
  function appendMessage(sender, text) {
    const bubble = document.createElement('div');
    bubble.className = `chat-msg ${sender === 'user' ? 'msg-user' : 'msg-bot'}`;
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }

  function showTypingIndicator() {
    const bubble = document.createElement('div');
    bubble.className = 'typing-bubble';
    bubble.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    return bubble;
  }

  function removeTypingIndicator(indicatorEl) {
    if (indicatorEl && indicatorEl.parentNode) {
      indicatorEl.parentNode.removeChild(indicatorEl);
    }
  }

  /**
   * Network call to optional serverless endpoint.
   * If endpoint is not found or fails, it triggers the built-in fallback.
   */
  async function queryVeduService(userText) {
    // Optional serverless backend endpoint
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userText })
    });

    if (!response.ok) {
      throw new Error('Backend unconfigured or unavailable');
    }

    const data = await response.json();
    return data.reply || getLocalKnowledgeResponse(userText);
  }

  /**
   * Verified Portfolio Knowledge Engine
   * Grounded source of truth: does not invent qualifications or certificates.
   */
  function getLocalKnowledgeResponse(query) {
    const q = query.toLowerCase();

    if (q.includes('who') || q.includes('vaid') || q.includes('intro') || q.includes('about')) {
      return "Vaid Tamrakar is a postgraduate science student and aspiring developer passionate about analytical problem-solving, structured logic, and modern responsive web applications.";
    }
    if (q.includes('skill') || q.includes('tech') || q.includes('language') || q.includes('stack')) {
      return "Vaid's skillset includes HTML5, modern CSS3 (Glassmorphism & Flexbox/Grid), vanilla JavaScript (ES6+), quantitative and algorithmic reasoning, scientific analysis, Git, and VS Code.";
    }
    if (q.includes('project') || q.includes('work') || q.includes('portfolio')) {
      return "Key projects include: 1) This Animated Glassmorphism Portfolio with Vedu AI, 2) An academic presentation suite on the Future of Artificial Intelligence, and 3) Quantitative problem-solving logic utilities.";
    }
    if (q.includes('education') || q.includes('degree') || q.includes('college') || q.includes('study')) {
      return "Vaid holds a postgraduate degree (M.Sc. / PG) in a science field, building upon an undergraduate Bachelor of Science degree with a focus on mathematical and scientific reasoning.";
    }
    if (q.includes('contact') || q.includes('email') || q.includes('hire') || q.includes('message')) {
      return "You can reach Vaid through the contact form at the bottom of the page, or by sending an email directly to vaidtamrakar@example.com.";
    }
    if (q.includes('achievement') || q.includes('certificate')) {
      return "Vaid's achievements include completing postgraduate studies in science, presenting research slides on Artificial Intelligence, and ongoing preparation for state administrative examinations.";
    }

    return "I am Vedu, Vaid's assistant. You can ask me about Vaid's education, skills, featured projects, or how to get in touch!";
  }
}