// Popup management
const popups = document.querySelectorAll('.popup');
const toggleBtn = document.getElementById('toggleBtn');
const prevBtn = document.getElementById('prevPopup');
const nextBtn = document.getElementById('nextPopup');
const overlayContainer = document.getElementById('overlayContainer');
const backgroundIframe = document.querySelector('.background-iframe');
const header = document.getElementById('change');

let currentPopupIndex = 0; // Initialize with first popup visible
let overlayVisible = true;
let manualNavigation = false;

// Initialize
function init() {
    currentPopupIndex = 0;
    overlayVisible = true;
    updatePopupDisplay();
    setupNavigation();
}

// Toggle overlay
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        overlayVisible = !overlayVisible;
        backgroundIframe.classList.toggle('interactive');
        overlayContainer.classList.toggle('active');
        toggleBtn.classList.toggle('active');

        // Switch icons and toggle back button
        const showIcon = document.getElementById('showIcon');
        const hideIcon = document.getElementById('hideIcon');
        const backButton = document.querySelector('.back-button');

        if (overlayVisible) {
            showIcon.style.display = 'block';
            hideIcon.style.display = 'none';
            if (header) header.classList.remove('header-hidden');
            // Show back button when overview is visible
            if (backButton) backButton.style.display = 'flex';
        } else {
            showIcon.style.display = 'none';
            hideIcon.style.display = 'block';
            if (header) header.classList.add('header-hidden');
            // Hide back button when overview is hidden
            if (backButton) backButton.style.display = 'none';
        }

        updatePopupDisplay();
    });
}

// Navigation
function setupNavigation() {
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPopupIndex > 0) {
                manualNavigation = true;
                currentPopupIndex--;
                updatePopupDisplay();
                scrollToPopup(currentPopupIndex);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentPopupIndex < popups.length - 1) {
                manualNavigation = true;
                currentPopupIndex++;
                updatePopupDisplay();
                scrollToPopup(currentPopupIndex);
            }
        });
    }
}

function updatePopupDisplay() {
    popups.forEach((popup, index) => {
        popup.classList.toggle('active', index === currentPopupIndex && overlayVisible);
    });

    if (prevBtn && nextBtn) {
        prevBtn.disabled = currentPopupIndex === 0 || !overlayVisible;
        nextBtn.disabled = currentPopupIndex === popups.length - 1 || !overlayVisible;
    }
}

function scrollToPopup(index) {
    const popup = popups[index];
    const popupTop = popup.offsetTop;
    window.scrollTo({
        top: popupTop - 100,
        behavior: 'smooth'
    });
}

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!overlayVisible) return;

    if (e.key === 'ArrowLeft' && currentPopupIndex > 0) {
        manualNavigation = true;
        currentPopupIndex--;
        updatePopupDisplay();
        scrollToPopup(currentPopupIndex);
    } else if (e.key === 'ArrowRight' && currentPopupIndex < popups.length - 1) {
        manualNavigation = true;
        currentPopupIndex++;
        updatePopupDisplay();
        scrollToPopup(currentPopupIndex);
    } else if (e.key === ' ') {
        e.preventDefault();
        overlayVisible = !overlayVisible;
        backgroundIframe.classList.toggle('interactive');
        overlayContainer.classList.toggle('active');
        toggleBtn.classList.toggle('active');

        const showIcon = document.getElementById('showIcon');
        const hideIcon = document.getElementById('hideIcon');

        if (overlayVisible) {
            showIcon.style.display = 'block';
            hideIcon.style.display = 'none';
            if (header) header.classList.remove('header-hidden');
        } else {
            showIcon.style.display = 'none';
            hideIcon.style.display = 'block';
            if (header) header.classList.add('header-hidden');
        }

        updatePopupDisplay();
    }
});

// Initialize on load
init();

function setupHeaderScrollBehavior() {
    if (!header) return;
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentY = window.scrollY;
        const scrollingDown = currentY > lastScrollY;
        if (scrollingDown && currentY > 80) {
            header.classList.add('header-hidden');
        } else {
            header.classList.remove('header-hidden');
        }

        lastScrollY = currentY;
    });
}
