/* =========================================
   MWERO DEV HUB — script.js
   ========================================= */

/* ── Navbar scroll effect ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px,5px)' : '';
  spans[1].style.opacity   = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px,-5px)' : '';
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
  });
});

/* ── Scroll reveal ── */
const revealElements = document.querySelectorAll(
  '.skill-card, .project-card, .tl-card, .contact-card, .about-grid, .brand-grid, .section-title, .section-label, .add-project-card'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));

/* ── Skill bar animation ── */
const skillBars = document.querySelectorAll('.skill-bar');

const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const bar   = entry.target;
      const fill  = bar.querySelector('.skill-fill');
      const width = bar.getAttribute('data-width');
      setTimeout(() => { fill.style.width = width + '%'; }, 200);
      barObserver.unobserve(bar);
    }
  });
}, { threshold: 0.5 });

skillBars.forEach(bar => barObserver.observe(bar));

/* ── Active nav highlight on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navAnchors.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

/* ── Contact form ── */
function sendMessage() {
  const name    = document.getElementById('fname').value.trim();
  const email   = document.getElementById('femail').value.trim();
  const subject = document.getElementById('fsubject').value.trim();
  const message = document.getElementById('fmessage').value.trim();
  const msgDiv  = document.getElementById('form-msg');

  if (!name || !email || !message) {
    msgDiv.textContent = '⚠ Please fill in your name, email, and message.';
    msgDiv.className = 'form-msg error';
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    msgDiv.textContent = '⚠ Please enter a valid email address.';
    msgDiv.className = 'form-msg error';
    return;
  }

  // Build mailto link
  const mailSubject = encodeURIComponent(subject || `Portfolio Inquiry from ${name}`);
  const mailBody    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
  window.location.href = `mailto:juliusmwero900@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  msgDiv.textContent = '✓ Opening your mail client… If nothing opens, email juliusmwero900@gmail.com directly.';
  msgDiv.className = 'form-msg success';
}

/* ── Smooth scroll for anchor buttons ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

/* ── Hero typing effect (tagline) ── */
const tagline = document.querySelector('.hero-tagline');
if (tagline) {
  const text = 'Building Digital Solutions\n& Smart Systems ';
  let i = 0;
  tagline.innerHTML = '<span class="cursor">|</span>';
  const type = () => {
    if (i < text.length) {
      const char = text[i] === '\n' ? '<br>' : text[i];
      tagline.innerHTML = text.slice(0, i + 1).replace('\n', '<br>') + ' <span class="cursor">|</span>';
      i++;
      setTimeout(type, i < 27 ? 45 : 35);
    }
  };
  setTimeout(type, 800);
}

/* ── Stats counter animation ── */
const statNums = document.querySelectorAll('.stat-num');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el  = entry.target;
      const raw = el.textContent;
      const num = parseInt(raw);
      if (!isNaN(num)) {
        let start = 0;
        const step = Math.ceil(num / 30);
        const interval = setInterval(() => {
          start = Math.min(start + step, num);
          el.textContent = start + (raw.includes('+') ? '+' : '');
          if (start >= num) clearInterval(interval);
        }, 40);
      }
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.8 });

statNums.forEach(el => counterObserver.observe(el));
