// script.js – Complete Interactive Functionality for Stories by Memories

document.addEventListener('DOMContentLoaded', function() {
  
  // ===== INITIALIZE AOS ANIMATIONS =====
  AOS.init({
    duration: 1000,
    once: true,
    offset: 100,
    easing: 'ease-out-cubic'
  });

  // ===== CINEMATIC LOADING SEQUENCE =====
  const loadingScreen = document.getElementById('loading');
  const flashEffect = document.getElementById('flashEffect');
  const loaderTitle = document.getElementById('loaderTitle');
  const loaderSubtitle = document.getElementById('loaderSubtitle');
  
  // Animate camera lens
  setTimeout(() => {
    document.querySelector('.lens-inner').style.transform = 'scale(0.8)';
  }, 200);
  
  setTimeout(() => {
    document.querySelector('.lens-inner').style.transform = 'scale(1)';
  }, 400);
  
  // Flash effect
  setTimeout(() => {
    flashEffect.classList.add('active');
    setTimeout(() => {
      flashEffect.classList.remove('active');
    }, 300);
  }, 600);
  
  // Text fade in
  setTimeout(() => {
    loaderTitle.style.opacity = '1';
    loaderTitle.style.transform = 'translateY(0)';
  }, 900);
  
  setTimeout(() => {
    loaderSubtitle.style.opacity = '1';
    loaderSubtitle.style.transform = 'translateY(0)';
  }, 1200);
  
  // Hide loading screen
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 2500);

  // ===== SCROLL PROGRESS INDICATOR =====
  const progressBar = document.getElementById('progressBar');
  
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });

  // ===== MOBILE HAMBURGER MENU =====
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');
  
  if (hamburger) {
    hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
  }

  // ===== HEADER SCROLL EFFECT =====
  const header = document.getElementById('header');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // ===== ACTIVE NAVIGATION LINK ON SCROLL =====
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  
  function updateActiveNavLink() {
    let current = '';
    const scrollPosition = window.scrollY + 150;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      const href = link.getAttribute('href').substring(1);
      if (href === current) {
        link.classList.add('active');
      }
    });
  }
  
  window.addEventListener('scroll', updateActiveNavLink);
  updateActiveNavLink();

  // ===== HERO SLIDESHOW WITH KEN BURNS EFFECT =====
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  
  function nextSlide() {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
  }
  
  if (slides.length > 0) {
    setInterval(nextSlide, 5000);
  }

  // ===== BOOK NOW BUTTON FUNCTIONALITY =====
  const bookNowBtns = document.querySelectorAll('#bookNowBtn, #bookNowBtn2');
  
  bookNowBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get form data from contact form if available
      const contactForm = document.getElementById('contactForm');
      let name = '', email = '', phone = '', eventType = '', eventDate = '', message = '';
      
      if (contactForm) {
        name = contactForm.querySelector('input[type="text"]')?.value.trim() || '';
        email = contactForm.querySelector('input[type="email"]')?.value.trim() || '';
        phone = contactForm.querySelector('input[type="tel"]')?.value.trim() || '';
        eventType = contactForm.querySelector('select')?.value || '';
        eventDate = contactForm.querySelector('input[type="date"]')?.value || '';
        message = contactForm.querySelector('textarea')?.value.trim() || '';
      }
      
      // Create WhatsApp message with details
      const whatsappMessage = `Hello Stories by Memories,

I would like to book a photoshoot session.

📋 *Booking Details:*
👤 Name: ${name || '[Not provided]'}
📧 Email: ${email || '[Not provided]'}
📱 Phone: ${phone || '[Not provided]'}
🎉 Event Type: ${eventType || '[Not provided]'}
📅 Event Date: ${eventDate || '[Not provided]'}
💬 Message: ${message || '[Not provided]'}

Please share the details and availability.`;

      // Open WhatsApp with pre-filled message
      const encodedMessage = encodeURIComponent(whatsappMessage);
      window.open(`https://wa.me/918861247675?text=${encodedMessage}`, '_blank');
      
      // Show thank you notification
      showNotification(
        'Thank You for Your Interest!',
        'Your booking request has been initiated. You will be redirected to WhatsApp to complete your booking.',
        'success'
      );
    });
  });

  // ===== GALLERY FILTER WITH ICONS =====
  const filterBtns = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  
  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const filterValue = this.dataset.filter;
      
      galleryItems.forEach(item => {
        if (filterValue === 'all' || item.dataset.category === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 10);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.8)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // ===== LIGHTBOX FUNCTIONALITY =====
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxContent = document.getElementById('lightboxContent');
  const closeLightbox = document.querySelector('.close-lightbox');
  const prevBtn = document.querySelector('.lightbox-prev');
  const nextBtn = document.querySelector('.lightbox-next');
  
  let currentImageIndex = 0;
  let galleryImages = [];
  
  function refreshGalleryImages() {
    galleryImages = document.querySelectorAll('.gallery-item img, .featured-item img');
  }
  
  refreshGalleryImages();
  
  function openLightbox(index) {
    if (galleryImages.length === 0) {
      refreshGalleryImages();
      if (galleryImages.length === 0) return;
    }
    
    currentImageIndex = Math.min(index, galleryImages.length - 1);
    const imgSrc = galleryImages[currentImageIndex].src;
    const imgAlt = galleryImages[currentImageIndex].alt;
    
    lightboxContent.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`;
    lightboxModal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  }
  
  document.querySelectorAll('.gallery-item, .featured-item').forEach((item, idx) => {
    item.addEventListener('click', function(e) {
      e.stopPropagation();
      refreshGalleryImages();
      
      const img = this.querySelector('img');
      if (img) {
        const imgArray = Array.from(galleryImages);
        const foundIndex = imgArray.findIndex(i => i === img);
        openLightbox(foundIndex !== -1 ? foundIndex : 0);
      }
    });
  });
  
  if (closeLightbox) {
    closeLightbox.addEventListener('click', function() {
      lightboxModal.style.display = 'none';
      document.body.style.overflow = 'auto';
    });
  }
  
  function navigateImage(direction) {
    if (galleryImages.length === 0) {
      refreshGalleryImages();
    }
    
    currentImageIndex = (currentImageIndex + direction + galleryImages.length) % galleryImages.length;
    const imgSrc = galleryImages[currentImageIndex].src;
    const imgAlt = galleryImages[currentImageIndex].alt;
    
    lightboxContent.innerHTML = `<img src="${imgSrc}" alt="${imgAlt}">`;
  }
  
  if (prevBtn) {
    prevBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navigateImage(-1);
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      navigateImage(1);
    });
  }
  
  if (lightboxModal) {
    lightboxModal.addEventListener('click', function(e) {
      if (e.target === lightboxModal) {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      }
    });
  }
  
  document.addEventListener('keydown', function(e) {
    if (lightboxModal && lightboxModal.style.display === 'flex') {
      if (e.key === 'Escape') {
        lightboxModal.style.display = 'none';
        document.body.style.overflow = 'auto';
      } else if (e.key === 'ArrowLeft') {
        navigateImage(-1);
      } else if (e.key === 'ArrowRight') {
        navigateImage(1);
      }
    }
  });

  // ===== CONTACT FORM SUBMISSION =====
  const contactForm = document.getElementById('contactForm');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const name = this.querySelector('input[type="text"]')?.value.trim();
      const email = this.querySelector('input[type="email"]')?.value.trim();
      const phone = this.querySelector('input[type="tel"]')?.value.trim();
      const eventType = this.querySelector('select')?.value;
      const eventDate = this.querySelector('input[type="date"]')?.value;
      const message = this.querySelector('textarea')?.value.trim();
      const submitBtn = this.querySelector('button[type="submit"]');
      
      if (!name || !email) {
        showNotification('Error', 'Please fill in your name and email.', 'error');
        return;
      }
      
      if (!email.includes('@') || !email.includes('.')) {
        showNotification('Error', 'Please enter a valid email address.', 'error');
        return;
      }
      
      submitBtn.innerHTML = 'Sending...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        showNotification(
          'Message Sent Successfully!',
          'Thank you for reaching out! We\'ll get back to you within 24 hours.',
          'success'
        );
        this.reset();
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
      }, 1500);
    });
  }
  
  // ===== CUSTOM NOTIFICATION FUNCTION =====
  function showNotification(title, message, type) {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
      <div class="notification-header">
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <h4>${title}</h4>
      </div>
      <p>${message}</p>
    `;
    
    Object.assign(notification.style, {
      position: 'fixed',
      top: '20px',
      right: '20px',
      background: type === 'success' ? '#2c4a3e' : '#c6a15b',
      color: 'white',
      padding: '20px',
      borderRadius: '12px',
      boxShadow: '0 5px 30px rgba(0,0,0,0.2)',
      zIndex: '10000',
      maxWidth: '350px',
      animation: 'slideInRight 0.3s ease'
    });
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 4000);
  }

  // ===== CLOSE MOBILE MENU AFTER LINK CLICK =====
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      if (navMenu && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      }
    });
  });

  // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ===== BUTTON RIPPLE EFFECT =====
  const buttons = document.querySelectorAll('.btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.className = 'ripple';
      
      this.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    });
  });

  // ===== WINDOW RESIZE HANDLER =====
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
      document.body.classList.remove('no-scroll');
    }
  });

  // ===== LAZY LOADING WITH INTERSECTION OBSERVER =====
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, { rootMargin: '50px' });
    
    images.forEach(img => imageObserver.observe(img));
  }

  // ===== STATS COUNTER ANIMATION =====
  const statNumbers = document.querySelectorAll('.stat-number');
  
  function animateStats() {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.innerText.replace(/[^0-9]/g, ''));
      let current = 0;
      const increment = target / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          stat.innerText = target + '+';
          clearInterval(timer);
        } else {
          stat.innerText = Math.floor(current) + '+';
        }
      }, 30);
    });
  }
  
  const philosophySection = document.querySelector('.philosophy');
  if (philosophySection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateStats();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    observer.observe(philosophySection);
  }
});