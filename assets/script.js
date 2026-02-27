        // Mobile Menu Toggle
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');

        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });

        // Dropdown Toggle for Mobile Only
        const dropdownButtons = document.querySelectorAll('.drop-btn');

        dropdownButtons.forEach(button => {
            button.addEventListener('click', function(e) {
   if (window.innerWidth < 768) {
                    e.stopPropagation();
  const dropdown = this.closest('.dropdown');
                    
                    // Close other dropdowns
  document.querySelectorAll('.dropdown').forEach(dd => {
    if (dd !== dropdown) {
                            dd.classList.remove('active');
                        }
                    });
  
    dropdown.classList.toggle('active');
                }
            });
        });


  document.addEventListener('click', function(event) {
            if (window.innerWidth < 768) {
     const isClickInsideNav = event.target.closest('nav');
   if (!isClickInsideNav) {
  document.querySelectorAll('.dropdown').forEach(dropdown => {
                        dropdown.classList.remove('active');
                    });
  if (navLinks.classList.contains('active')) {
     navLinks.classList.remove('active');
                    }
                }
            }
        });

        // Clean up on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth >= 768) {
 document.querySelectorAll('.dropdown').forEach(dropdown => {
                    dropdown.classList.remove('active');
                });
            }
        });



//js for college image auto slide

document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.slide');
  const wrapper = document.querySelector('.slides-wrapper');

  if (!wrapper || slides.length === 0) return;

  let currentSlide = 0;

  function showSlide(index) {
    currentSlide = index;
    wrapper.style.transform = 'translateX(-${currentSlide * 100}%)';
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length; // loop back to first
    showSlide(currentSlide);
  }

  // Auto-slide every 3 seconds (adjust timing as needed)
  setInterval(nextSlide, 3000);

  // Initialize first slide
  showSlide(currentSlide);
});

// courses

        let activeCourse = null; // track currently opened course

function toggleCourse(courseType) {
    const courseInfo = document.getElementById('course-info');
    const courseDetails = {
        'bca': {
            title: 'Bachelor of Computer Application',
            details: 'Duration: 3 years | Eligibility: 10+2 any stream| Career: software development, web development, cybersecurity, data analysis, network administration, mobile app development, and digital marketing'
        },
        'bsc': {
            title: 'Bachelor of Science (computer science)',
            details: 'Duration: 3 years | Eligibility: 10+2 with PCM | Career: Software Developer, Data Analyst, Web Developer, Cybersecurity Analyst, IT Consultant, and Systems Analyst'
        },
        'bscl': {
            title: 'Bachelor of Science (life sciences)',
            details: 'Duration: 3 years | Eligibility: 10+2 | Career: research (Biotechnologist, Microbiologist, Research Assistant), healthcare (Clinical Research Associate, Lab Technician), industry (Pharmaceutical Sales, Food Scientist), environmental conservation (Natural Resource Specialist)'
        },
        'bcom': {
            title: 'Bachelor of Commerce',
            details: 'Duration: 3 years | Eligibility: 10+2 any stream | Career: Accountant,Financial Analyst,Tax consultant'
        },
        'ba': {
            title: 'Bachelor of Arts',
            details: 'Duration: 3 years | Eligibility: 10+2 any stream | Career: Digital Marketing (content writer, social media manager), Journalism & Mass Communication, Teaching (with a B.Ed.)'
        }
    };

    // If the same course is clicked → close
    if (activeCourse === courseType) {
        courseInfo.style.display = 'none';
        courseInfo.innerHTML = '';
        activeCourse = null;
    } else {
        // Show new course
        courseInfo.style.display = 'block';
        courseInfo.innerHTML = `
            <h3>${courseDetails[courseType].title}</h3>
            <p>${courseDetails[courseType].details}</p>
        `;
        activeCourse = courseType;
    }
}

// company logo 

const carousel = document.querySelector('.logo-carousel');
const logos = Array.from(carousel.children);

// Clone logos to create seamless loop
logos.forEach(logo => {
  const clone = logo.cloneNode(true);
  carousel.appendChild(clone);
});

let scrollPos = 0;
const speed = 0.5; // adjust scroll speed

function autoScroll() {
  scrollPos += speed;
  if (scrollPos >= carousel.scrollWidth / 2) {
    scrollPos = 0; // loop back
  }
  carousel.scrollLeft = scrollPos;
  requestAnimationFrame(autoScroll);
}

// Start automatic scrolling
requestAnimationFrame(autoScroll);

// Optional: Pause on hover (desktop)
carousel.addEventListener('mouseenter', () => speed = 0);
carousel.addEventListener('mouseleave', () => speed = 0.5);

// Touch/Swipe support
let startX;
carousel.addEventListener('touchstart', e => startX = e.touches[0].pageX);
carousel.addEventListener('touchmove', e => {
  const touchX = e.touches[0].pageX;
  const diff = startX - touchX;
  carousel.scrollLeft += diff;
  startX = touchX;
});

// js for review

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".reviews-track");
  const cards = document.querySelectorAll(".review-card");
  const totalCards = cards.length;
  let currentIndex = 0;
  const interval = 2000; // 4s per slide
  let autoScroll;

  function getVisibleCards() {
    if(window.innerWidth >= 1024) return 3;
    if(window.innerWidth >= 768) return 2;
    return 1;
  }

  function showSlide(index) {
    const visible = getVisibleCards();
    const cardWidth = cards[0].offsetWidth + 20; // include margin
    track.style.transform = 'translateX(-${index * cardWidth}px)';

    cards.forEach((card, i) => {
      card.classList.toggle("active", i >= index && i < index + visible);
    });
  }

  function nextSlide() {
    const visible = getVisibleCards();
    currentIndex = (currentIndex + 1) % (totalCards - visible + 1);
    showSlide(currentIndex);
  }

  function startAutoScroll() {
    autoScroll = setInterval(nextSlide, interval);
  }

  function stopAutoScroll() {
    clearInterval(autoScroll);
  }

  showSlide(currentIndex);
  startAutoScroll();

  track.addEventListener("mouseenter", stopAutoScroll);
  track.addEventListener("mouseleave", startAutoScroll);

  // Adjust on window resize
  window.addEventListener("resize", () => {
    showSlide(currentIndex);
  });
});

// Create loader when page starts loading
(function() {
    const startTime = Date.now();
    
    // Create loader container
    const loader = document.createElement('div');
    loader.id = 'loader';
    loader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #ffffff;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease-out;
    `;
    
    // Create image element
    const img = document.createElement('img');
    img.src = '/assets/images/loader.gif';  // Your GIF file path
    img.alt = 'Loading...';
    img.style.cssText = `
        width: 100px;
        height: 100px;
        object-fit: contain;
    `;
    
    // Add image to loader
    loader.appendChild(img);
    
    // Add loader to page immediately
    document.documentElement.appendChild(loader);
    
    // Hide loader when page is fully loaded AND minimum time has passed
    window.addEventListener('load', function() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime); // 2000ms = 2 seconds
        
        setTimeout(function() {
            loader.style.opacity = '0';
            
            setTimeout(function() {
                loader.style.display = 'none';
                loader.remove();
            }, 500);
        }, remainingTime);
    });
})();


