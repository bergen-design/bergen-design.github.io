// Popup management
const popups = document.querySelectorAll('.popup');
const toggleBtn = document.getElementById('toggleBtn');
const prevBtn = document.getElementById('prevPopup');
const nextBtn = document.getElementById('nextPopup');
const overlayContainer = document.getElementById('overlayContainer');
const backgroundIframe = document.querySelector('.background-iframe');
const header = document.getElementById('change');
const segmentOptions = document.querySelectorAll('.segment-option[data-view]');
const segmentIndicator = document.querySelector('.segment-indicator');
const iaFlyout = document.getElementById('iaFlyout');
const iaFlyoutButtons = document.querySelectorAll('.ia-flyout-btn');
const caseStudyFrame = document.getElementById('caseStudyFrame');
const imageStack = document.getElementById('imageStack');

const VIEW_URLS = {
    hifi: 'https://premieretransportation.com/',
    lofi: 'https://embed.figma.com/proto/zHyVeZMFI9bBQIIuMTicKp/LEC-inc.?page-id=55%3A345&node-id=595-5835&p=f&viewport=-782%2C513%2C0.06&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=595%3A4950&embed-host=share',
    hifi_mobile: 'https://premieretransportation.com/',
    lofi_mobile: 'https://embed.figma.com/proto/4FaNr3T3t2FXS9wQcBIZcc/Premiere-Transportation?page-id=11%3A2270&node-id=16-188&viewport=730%2C204%2C0.02&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=16%3A188&show-proto-sidebar=1&embed-host=share'
};

const IA_IMAGE_MAP = {
    sitemap: [
        { src: 'premiere-sitemap.png', alt: 'Sitemap' },
        
    ],
    userflows: [
        { src: 'premiere-analysis.png', alt: 'Competitive Analysis' },
        
    ]
};

let currentPopupIndex = 0; // Initialize with first popup visible
let overlayVisible = true;
let manualNavigation = false;

// Initialize
function init() {
    currentPopupIndex = 0;
    overlayVisible = true;
    updatePopupDisplay();
    setupNavigation();
    setupMiniControls();
    
    // Handle window resize for indicator
    window.addEventListener('resize', () => {
        const activeOption = document.querySelector('.segment-option.active');
        if (activeOption) {
            updateIndicator(activeOption);
        }
    });
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', init);

// Toggle overlay
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        overlayVisible = !overlayVisible;
        backgroundIframe.classList.toggle('interactive');
        overlayContainer.classList.toggle('active');
        toggleBtn.classList.toggle('active');

        // Update toggle label
        const toggleLabel = document.getElementById('toggleLabel');
        if (toggleLabel) {
            toggleLabel.textContent = overlayVisible ? 'Hide Overview' : 'Show Overview';
        }

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
    // Get all navigation buttons (in case there are multiple)
    const prevButtons = document.querySelectorAll('.nav-btn-prev');
    const nextButtons = document.querySelectorAll('.nav-btn-next');

    const goToPrevPopup = () => {
        if (currentPopupIndex > 0) {
            manualNavigation = true;
            currentPopupIndex--;
            updatePopupDisplay();
            scrollToPopup(currentPopupIndex);
        }
    };

    const goToNextPopup = () => {
        if (currentPopupIndex < popups.length - 1) {
            manualNavigation = true;
            currentPopupIndex++;
            updatePopupDisplay();
            scrollToPopup(currentPopupIndex);
        }
    };

    // Add event listeners to all previous buttons
    prevButtons.forEach(btn => {
        btn.addEventListener('click', goToPrevPopup);
    });

    // Add event listeners to all next buttons
    nextButtons.forEach(btn => {
        btn.addEventListener('click', goToNextPopup);
    });

    // Also update the disabled state of all buttons
    updatePopupDisplay();
}

function updatePopupDisplay() {
    // Update popup visibility
    popups.forEach((popup, index) => {
        popup.classList.toggle('active', index === currentPopupIndex && overlayVisible);
    });

    // Update all previous buttons
    document.querySelectorAll('.nav-btn-prev').forEach(btn => {
        btn.disabled = currentPopupIndex === 0 || !overlayVisible;
    });

    // Update all next buttons
    document.querySelectorAll('.nav-btn-next').forEach(btn => {
        btn.disabled = currentPopupIndex === popups.length - 1 || !overlayVisible;
    });
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

        // Update toggle label
        const toggleLabel = document.getElementById('toggleLabel');
        if (toggleLabel) {
            toggleLabel.textContent = overlayVisible ? 'Hide Overview' : 'Show Overview';
        }

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

function setupMiniControls() {
    if (!segmentOptions.length || !segmentIndicator) return;

    // Set initial indicator position and width to Hi-Fi Designs
    const hifiOption = document.querySelector('[data-view="hifi"]');
    updateIndicator(hifiOption);
    hifiOption.classList.add('active');
    
    // Load Hi-Fi Designs on page load
    if (VIEW_URLS.hifi) {
        showIframe(VIEW_URLS.hifi);
    }

    segmentOptions.forEach((option) => {
        option.addEventListener('click', () => {
            const view = option.dataset.view;
            
            // Update active state
            segmentOptions.forEach(opt => opt.classList.remove('active'));
            option.classList.add('active');
            
            // Update indicator position
            updateIndicator(option);
            
            if (view === 'ia') {
                toggleFlyout();
                return;
            }

            if (VIEW_URLS[view]) {
                hideFlyout();
                showIframe(VIEW_URLS[view]);
            }
        });
    });

    iaFlyoutButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const stack = button.dataset.stack;
            if (!stack || !IA_IMAGE_MAP[stack]) return;
            showImageStack(IA_IMAGE_MAP[stack]);
        });
    });

    document.addEventListener('click', (event) => {
        if (!iaFlyout) return;
        if (iaFlyout.contains(event.target) || event.target.closest('.segment-option[data-view="ia"]')) return;
        hideFlyout();
    });
}

function updateIndicator(option) {
    if (!segmentIndicator || !option) return;
    
    const optionRect = option.getBoundingClientRect();
    const parentRect = option.parentElement.getBoundingClientRect();
    
    const left = optionRect.left - parentRect.left;
    const width = optionRect.width;
    
    segmentIndicator.style.transform = `translateX(${left}px)`;
    segmentIndicator.style.width = `${width}px`;
    
    // Update IA flyout position if IA is selected
    if (option.dataset.view === 'ia' && iaFlyout) {
        iaFlyout.style.left = `${left}px`;
        iaFlyout.style.width = `${width}px`;
    }
}

function toggleFlyout() {
    if (!iaFlyout) return;
    const expanded = iaFlyout.getAttribute('aria-hidden') === 'false';
    iaFlyout.setAttribute('aria-hidden', expanded ? 'true' : 'false');
}

function hideFlyout() {
    if (!iaFlyout) return;
    iaFlyout.setAttribute('aria-hidden', 'true');
}

let loadingTimeout = null;

function showLoadingAnimation() {
    const loadingAnimation = document.getElementById('loadingAnimation');
    if (loadingAnimation) {
        loadingAnimation.classList.remove('hidden');
    }
}

function hideLoadingAnimation() {
    const loadingAnimation = document.getElementById('loadingAnimation');
    
    // Add minimum loading time of 4 seconds for Figma files
    if (loadingTimeout) {
        clearTimeout(loadingTimeout);
    }
    
    loadingTimeout = setTimeout(() => {
        if (loadingAnimation) {
            loadingAnimation.classList.add('hidden');
        }
    }, 1000);
}

function showIframe(url) {
    if (!caseStudyFrame) return;
    
    // Show loading animation
    showLoadingAnimation();
    
    // Check if mobile viewport (under 600px)
    const isMobile = window.innerWidth < 600;
    
    // Use mobile URL if available and viewport is mobile
    let finalUrl = url;
    if (isMobile) {
        if (url === VIEW_URLS.hifi) finalUrl = VIEW_URLS.hifi_mobile;
        else if (url === VIEW_URLS.lofi) finalUrl = VIEW_URLS.lofi_mobile;
    }
    
    caseStudyFrame.hidden = false;
    caseStudyFrame.src = finalUrl;
    if (imageStack) {
        imageStack.hidden = true;
        imageStack.innerHTML = '';
    }
}

function showImageStack(images) {
    if (!imageStack || !caseStudyFrame) return;
    
    // Hide loading animation
    hideLoadingAnimation();
    
    const imageMarkup = images
        .map(({ src, alt }) => `<img src="${src}" alt="${alt}" class="stack-image clickable">`)
        .join('');

    imageStack.innerHTML = imageMarkup;
    imageStack.hidden = false;
    caseStudyFrame.hidden = true;
    
    // Add click handlers for images
    imageStack.querySelectorAll('.stack-image').forEach(img => {
        img.addEventListener('click', () => showImageModal(img.src, img.alt));
    });
}

function showImageModal(src, alt) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <img src="${src}" alt="${alt}" class="modal-image">
        <button class="modal-close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(modal);
    modal.classList.add('active');
}

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
