/**
 * Portfolio JavaScript for Kinshu Kumawat (/kinshu.dev)
 * 
 * Features:
 * - REST Endpoint Smooth Navigation
 * - Active Endpoint Highlighting via IntersectionObserver
 * - Scroll Reveal Animations
 * - Live AI Streaming / Typewriter Simulation with reduced-motion support
 */

document.addEventListener('DOMContentLoaded', () => {
  // Navigation & Endpoints
  const endpoints = document.querySelectorAll('.endpoint');
  const sections = [...endpoints]
    .map(e => document.getElementById(e.dataset.target))
    .filter(Boolean);

  // Smooth scroll handler for endpoints
  endpoints.forEach(endpoint => {
    endpoint.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = endpoint.dataset.target;
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
        // Update URL hash without jumping
        if (history.pushState) {
          history.pushState(null, '', `#${targetId}`);
        }
      }
    });
  });

  // IntersectionObserver for active navigation endpoint
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.id;
          endpoints.forEach(endpoint => {
            const isActive = endpoint.dataset.target === currentId;
            endpoint.classList.toggle('active', isActive);
          });
        }
      });
    }, {
      rootMargin: '-40% 0px -50% 0px',
      threshold: 0
    });

    sections.forEach(section => navObserver.observe(section));

    // Scroll reveal observer for elements with .reveal class
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15
    });

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));
  } else {
    // Fallback for browsers without IntersectionObserver support
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // Typewriter effect simulating streamed AI response
  const responseText = "Kinshu is a BCA graduate from Jaipur building AI-powered web apps with React, Node.js and prompt engineering — integrating Anthropic and Groq to ship products that reason with users, not just react to clicks.";
  const target = document.getElementById('typedResponse');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (target) {
    if (prefersReducedMotion) {
      target.textContent = responseText;
    } else {
      let index = 0;
      function typeStream() {
        if (index <= responseText.length) {
          target.innerHTML = responseText.slice(0, index) + '<span class="cursor-blink" aria-hidden="true"></span>';
          index++;
          setTimeout(typeStream, 18);
        }
      }
      setTimeout(typeStream, 500);
    }
  }
});
