// Popup management
const popups = document.querySelectorAll('.popup');
const toggleBtn = document.getElementById('toggleBtn');
const prevBtn = document.getElementById('prevPopup');
const nextBtn = document.getElementById('nextPopup');
const overlayContainer = document.getElementById('overlayContainer');
const backgroundIframe = document.querySelector('.background-iframe');
const header = document.getElementById('change');
const backButton = document.querySelector('.back-button');
const segmentOptions = document.querySelectorAll('.segment-option[data-view]');
const segmentIndicator = document.querySelector('.segment-indicator');
const iaFlyout = document.getElementById('iaFlyout');
const iaFlyoutButtons = document.querySelectorAll('.ia-flyout-btn');
const caseStudyFrame = document.getElementById('caseStudyFrame');
const imageStack = document.getElementById('imageStack');

const VIEW_URLS = {
    hifi: 'https://embed.figma.com/proto/9nfb8aeJSWe5pekAH5ApiB/SkyIT-Design-Challenge?page-id=0%3A1&node-id=11-413&viewport=262%2C-102%2C0.09&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7%3A806&embed-host=share',
    lofi: 'https://embed.figma.com/proto/9nfb8aeJSWe5pekAH5ApiB/SkyIT-Design-Challenge?page-id=0%3A1&node-id=2-2&viewport=262%2C-102%2C0.09&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7%3A806&embed-host=share',
    hifi_mobile: 'https://embed.figma.com/proto/9nfb8aeJSWe5pekAH5ApiB/SkyIT-Design-Challenge?page-id=0%3A1&node-id=11-413&viewport=262%2C-102%2C0.09&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7%3A806&embed-host=share',
    lofi_mobile: 'https://embed.figma.com/proto/9nfb8aeJSWe5pekAH5ApiB/SkyIT-Design-Challenge?page-id=0%3A1&node-id=2-2&viewport=262%2C-102%2C0.09&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=7%3A806&embed-host=share'
};

const IA_IMAGE_MAP = {
    sitemap: [
        { src: 'clean-sitemap.png', alt: 'Clean sitemap visualization' },
        { src: 'site-structure.png', alt: 'Site structure diagram' }
    ],
    userflows: [
        { src: '3d-model-flow.png', alt: '3D model user flow' },
        { src: 'book-user-flow.png', alt: 'Booking user flow' }
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
    }, 3000);
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
