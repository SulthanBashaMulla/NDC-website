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

window.addEventListener('resize', function() {
    if (window.innerWidth >= 768) {
        document.querySelectorAll('.dropdown').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    }
});


// College image auto slide
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.slide');
    const wrapper = document.querySelector('.slides-wrapper');

    if (!wrapper || slides.length === 0) return;

    let currentSlide = 0;

    function showSlide(index) {
        currentSlide = index;
        wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    setInterval(nextSlide, 3000);
    showSlide(currentSlide);
});


// Courses — Popup Modal
const courseDetails = {
    'bca':        { title: 'Bachelor of Computer Applications',           details: 'Duration: 3 years | Eligibility: 10+2 any stream | Career: Software Developer, Web Developer, Cybersecurity Analyst, Data Analyst, Mobile App Developer, IT Support' },
    'bsc-cs':     { title: 'Bachelor of Science (Computer Science)',       details: 'Duration: 3 years | Eligibility: 10+2 with Mathematics | Career: Software Developer, Data Analyst, Web Developer, Systems Analyst, Cybersecurity Analyst' },
    'bsc-qt':     { title: 'Bachelor of Science (Quantum Technology)',     details: 'Duration: 3 years | Eligibility: 10+2 with PCM | Career: Quantum Computing Researcher, Research Assistant, Lab Technologist, Data Scientist, Higher Studies in Physics/Quantum Science' },
    'bsc-iot':    { title: 'Bachelor of Science (Internet of Things)',     details: 'Duration: 3 years | Eligibility: 10+2 with Mathematics | Career: IoT Developer, Embedded Systems Engineer, Automation Engineer, Smart Systems Developer' },
    'bsc-it':     { title: 'Bachelor of Science (Information Technology)', details: 'Duration: 3 years | Eligibility: 10+2 any stream (Maths preferred) | Career: IT Support Specialist, Network Administrator, System Administrator, Web Developer' },
    'bsc-botany': { title: 'Bachelor of Science (Botany)',                 details: 'Duration: 3 years | Eligibility: 10+2 with Biology | Career: Botanist, Plant Researcher, Agricultural Officer, Environmental Consultant, Lab Technician, Higher Studies in Life Sciences' },
    'bcom-ca':    { title: 'Bachelor of Commerce (Computer Applications)', details: 'Duration: 3 years | Eligibility: 10+2 any stream | Career: Accountant, Financial Analyst, Tax Consultant, Banking Professional, ERP Executive' },
    'bba':        { title: 'Bachelor of Business Administration',          details: 'Duration: 3 years | Eligibility: 10+2 any stream | Career: Business Executive, Marketing Manager, HR Executive, Entrepreneur, MBA Aspirant' },
    'ba-urdu':    { title: 'Bachelor of Arts (Special Urdu)',              details: 'Duration: 3 years | Eligibility: 10+2 any stream | Career: Urdu Lecturer, Translator, Journalist, Civil Services Preparation, Content Writer' }
};

function toggleCourse(courseType) {
    const modal = document.getElementById('courseModal');
    const info = courseDetails[courseType];
    if (!info) return;
    document.getElementById('modalTitle').textContent = info.title;
    document.getElementById('modalDetails').innerHTML =
    info.details
    .replace(/Duration:/g, "<strong>Duration:</strong>")
    .replace(/Eligibility:/g, "<strong>Eligibility:</strong>")
    .replace(/Career:/g, "<strong>Career:</strong>");
    modal.style.display = 'flex';
}

function closeCourseModal() {
    document.getElementById('courseModal').style.display = 'none';
}

// Close modal when clicking outside the box
document.getElementById('courseModal').addEventListener('click', function(e) {
    if (e.target === this) closeCourseModal();
});


// Company logo carousel
const carousel = document.querySelector('.logo-carousel');
const logos = Array.from(carousel.children);

logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    carousel.appendChild(clone);
});

let scrollPos = 0;
let speed = 0.5;

function autoScroll() {
    scrollPos += speed;
    if (scrollPos >= carousel.scrollWidth / 2) {
        scrollPos = 0;
    }
    carousel.scrollLeft = scrollPos;
    requestAnimationFrame(autoScroll);
}

requestAnimationFrame(autoScroll);

carousel.addEventListener('mouseenter', () => speed = 0);
carousel.addEventListener('mouseleave', () => speed = 0.5);

let startX;
carousel.addEventListener('touchstart', e => startX = e.touches[0].pageX);
carousel.addEventListener('touchmove', e => {
    const touchX = e.touches[0].pageX;
    const diff = startX - touchX;
    carousel.scrollLeft += diff;
    startX = touchX;
});


// Reviews — manual arrow click only
function scrollReview(direction) {
    const track = document.querySelector(".reviews-track");
    const cards = track.querySelectorAll(".review-card");
    const totalCards = cards.length;

    // ✅ Always show 1 card at a time regardless of screen size
    // This ensures totalCards - visible is always > 0 so arrows always work
    const visible = 1;

    // ✅ Use getBoundingClientRect for accurate width at any screen size
    const cardRect = cards[0].getBoundingClientRect();
    const cardWidth = cardRect.width + 20; // +20 matches margin-right

    const currentTransform = track.style.transform;
    const match = currentTransform.match(/-?([\d.]+)px/);
    const currentOffset = match ? parseFloat(match[1]) : 0;
    let currentIndex = Math.round(currentOffset / cardWidth);

    currentIndex = Math.min(
        Math.max(currentIndex + direction, 0),
        totalCards - visible  // ✅ always 3 - 1 = 2, arrows always work
    );

    track.style.transition = 'transform 0.4s ease';
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
}


// Loader
(function() {
    const startTime = Date.now();

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

    const img = document.createElement('img');
    img.src = '/assets/images/loader.gif';
    img.alt = 'Loading...';
    img.style.cssText = `
        width: 100px;
        height: 100px;
        object-fit: contain;
    `;

    loader.appendChild(img);
    document.documentElement.appendChild(loader);

    window.addEventListener('load', function() {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, 2000 - elapsedTime);

        setTimeout(function() {
            loader.style.opacity = '0';
            setTimeout(function() {
                loader.style.display = 'none';
                loader.remove();
            }, 500);
        }, remainingTime);
    });
})();


// Latest Notices
(function () {
    const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSyvjNgUcUesqV83Af3HDaVJ7bXj49TYE5CuQ4xohXgptO3sBeR7ok0kodKYncdCZNk68L8PbHnSWy1/pub?output=csv';

    const deptClass = dept => {
        const d = (dept || '').toLowerCase();
        if (d.includes('exam'))      return 'exam';
        if (d.includes('placement')) return 'placement';
        if (d.includes('sport'))     return 'sports';
        if (d.includes('holiday'))   return 'holiday';
        if (d.includes('general'))   return 'general';
        return 'default';
    };

    const DEMO_NOTICES = [
        { Title: 'Semester Exam Schedule Released',         Date: '25 Mar 2026', Description: 'The timetable for upcoming semester exams has been published. Students must carry their hall tickets to the exam hall.', Department: 'Exam',      IsNew: 'yes' },
        { Title: 'Wipro Campus Drive — Registrations Open', Date: '22 Mar 2026', Description: 'Final year students eligible for Wipro campus recruitment. Register before 30th March. 60% aggregate required.',         Department: 'Placement', IsNew: 'yes' },
        { Title: 'Annual Sports Day — 5th April',           Date: '20 Mar 2026', Description: 'Students interested in sports events should register with Physical Education dept before 28th March.',                    Department: 'Sports',    IsNew: 'yes' },
    ];

    function parseCSV(text) {
        const lines   = text.trim().split('\n');
        const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''));
        return lines.slice(1).map(line => {
            const cols = []; let cur = '', inQ = false;
            for (let ch of line) {
                if (ch === '"') { inQ = !inQ; }
                else if (ch === ',' && !inQ) { cols.push(cur.trim()); cur = ''; }
                else { cur += ch; }
            }
            cols.push(cur.trim());
            const obj = {};
            headers.forEach((h, i) => obj[h] = (cols[i] || '').replace(/"/g, '').trim());
            return obj;
        }).filter(r => r.Title);
    }

    function renderLatestNotices(notices) {
        const list = document.getElementById('latestNoticesList');
        list.innerHTML = '';
        notices.slice(0, 3).forEach((n, i) => {
            const isNew = (n.IsNew || '').toLowerCase() === 'yes';
            const dc    = deptClass(n.Department);
            const item  = document.createElement('a');
            item.href      = '/pages/Notifications.html';
            item.className = 'ln-item';
            item.style.animationDelay = `${i * 0.1}s`;
            item.innerHTML = `
                <div class="ln-indicator ${isNew ? 'new' : 'normal'}"></div>
                <div class="ln-text">
                    <div class="ln-meta">
                        ${isNew ? '<span class="ln-badge-new">New</span>' : ''}
                        <span class="ln-dept ${dc}">${n.Department || 'General'}</span>
                        <span class="ln-date">📅 ${n.Date || ''}</span>
                    </div>
                    <div class="ln-title">${n.Title}</div>
                    ${n.Description ? `<div class="ln-desc">${n.Description}</div>` : ''}
                </div>
                <span class="ln-arrow">›</span>`;
            list.appendChild(item);
        });
    }

    async function loadLatestNotices() {
        try {
            const res = await fetch(SHEET_CSV_URL);
            if (!res.ok) throw new Error('Fetch failed');
            renderLatestNotices(parseCSV(await res.text()));
        } catch {
            renderLatestNotices(DEMO_NOTICES);
        }
    }

    document.addEventListener('DOMContentLoaded', loadLatestNotices);
})();
                                         
