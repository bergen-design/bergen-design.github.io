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
    hifi: 'https://maa-min.com/',
    lofi: 'https://embed.figma.com/proto/DeLeiLAR6oTkCJKtRwQWYs/Proposal-for-maa-min.com?node-id=504-4792&viewport=367%2C175%2C0.07&scaling=scale-down&content-scaling=fixed&page-id=126%3A1148&embed-host=share',
    hifi_mobile: 'https://maa-min.com/',
    lofi_mobile: 'https://embed.figma.com/proto/DeLeiLAR6oTkCJKtRwQWYs/Proposal-for-maa-min.com?node-id=504-4792&viewport=367%2C175%2C0.07&scaling=scale-down&content-scaling=fixed&page-id=126%3A1148&embed-host=share'
};

const IA_IMAGE_MAP = {
    sitemap: [
        { src: 'img/maa-min/comp-1.png', alt: 'Competitive Analysis Page 1' },
        { src: 'img/maa-min/comp-2.png', alt: 'Competitive Analysis Page 2' },
        { src: 'img/maa-min/comp-3.png', alt: 'Competitive Analysis Page 3' },
        { src: 'img/maa-min/comp-4.png', alt: 'Competitive Analysis Page 4' },
        { src: 'img/maa-min/comp-5.png', alt: 'Competitive Analysis Page 5' }
    ],
    userflows: [
        { src: 'img/maa-min/brand-1.png', alt: 'brand book Page 1' },
        { src: 'img/maa-min/brand-2.png', alt: 'brand book Page 2' },
        { src: 'img/maa-min/brand-3.png', alt: 'brand book Page 3' },
        { src: 'img/maa-min/brand-4.png', alt: 'brand book Page 4' },
        { src: 'img/maa-min/brand-5.png', alt: 'brand book Page 5' },
        { src: 'img/maa-min/brand-6.png', alt: 'brand book Page 6' },
        { src: 'img/maa-min/brand-7.png', alt: 'brand book Page 7' },
        { src: 'img/maa-min/brand-8.png', alt: 'brand book Page 8' },
        { src: 'img/maa-min/brand-9.png', alt: 'brand book Page 9' },
        { src: 'img/maa-min/brand-10.png', alt: 'brand book Page 10' },
        { src: 'img/maa-min/brand-11.png', alt: 'brand book Page 11' },
        { src: 'img/maa-min/brand-12.png', alt: 'brand book Page 12' },
        { src: 'img/maa-min/brand-13.png', alt: 'brand book Page 13' },
        { src: 'img/maa-min/brand-14.png', alt: 'brand book Page 14' },
        { src: 'img/maa-min/brand-15.png', alt: 'brand book Page 15' },
        { src: 'img/maa-min/brand-16.png', alt: 'brand book Page 16' },
        { src: 'img/maa-min/brand-17.png', alt: 'brand book Page 17' },
        { src: 'img/maa-min/brand-18.png', alt: 'brand book Page 18' },
        { src: 'img/maa-min/brand-19.png', alt: 'brand book Page 19' },
        { src: 'img/maa-min/brand-20.png', alt: 'brand book Page 20' },
        { src: 'img/maa-min/brand-21.png', alt: 'brand book Page 21' },
        { src: 'img/maa-min/brand-22.png', alt: 'brand book Page 22' },
        { src: 'img/maa-min/brand-23.png', alt: 'brand book Page 23' },
        { src: 'img/maa-min/brand-24.png', alt: 'brand book Page 24' },
        { src: 'img/maa-min/brand-25.png', alt: 'brand book Page 25' },
        { src: 'img/maa-min/brand-26.png', alt: 'brand book Page 26' },
        { src: 'img/maa-min/brand-27.png', alt: 'brand book Page 27' },
        { src: 'img/maa-min/brand-28.png', alt: 'brand book Page 28' }
        

    ]
};

let currentPopupIndex = 0; // Initialize with first popup visible
let overlayVisible = true;
let manualNavigation = false;
let currentImageArray = [];
let currentImageIndex = 0;

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
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Ensure loading overlay clears even if iframe onload never fires
window.addEventListener('load', () => {
    setTimeout(hideLoadingAnimation, 4000);
});

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
        .map(({ src, alt }, index) => `<img src="${src}" alt="${alt}" class="stack-image clickable" data-index="${index}">`)
        .join('');

    imageStack.innerHTML = imageMarkup;
    imageStack.hidden = false;
    caseStudyFrame.hidden = true;
    
    // Store current image array for modal navigation
    currentImageArray = images;
    
    // Add click handlers for images
    imageStack.querySelectorAll('.stack-image').forEach(img => {
        img.addEventListener('click', () => {
            const index = parseInt(img.dataset.index);
            showImageModal(img.src, img.alt, index);
        });
    });
}

function showImageModal(src, alt, index = 0) {
    // Set current image index
    currentImageIndex = index;
    
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'image-modal';
    modal.innerHTML = `
        <div class="modal-overlay" onclick="this.parentElement.remove()"></div>
        <button class="modal-nav modal-nav-prev" onclick="navigateModalImage(-1)">‹</button>
        <img src="${src}" alt="${alt}" class="modal-image">
        <button class="modal-nav modal-nav-next" onclick="navigateModalImage(1)">›</button>
        <button class="modal-close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(modal);
    modal.classList.add('active');
    
    // Update navigation button states
    updateModalNavButtons(modal);
    
    // Add keyboard navigation
    modal.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            navigateModalImage(-1);
        } else if (e.key === 'ArrowRight') {
            navigateModalImage(1);
        } else if (e.key === 'Escape') {
            modal.remove();
        }
    });
    
    // Make modal focusable for keyboard events
    modal.tabIndex = 0;
    modal.focus();
}

function navigateModalImage(direction) {
    const modal = document.querySelector('.image-modal.active');
    if (!modal || currentImageArray.length === 0) return;
    
    const newIndex = currentImageIndex + direction;
    
    // Check bounds
    if (newIndex < 0 || newIndex >= currentImageArray.length) return;
    
    // Update current index
    currentImageIndex = newIndex;
    
    // Update modal image
    const modalImage = modal.querySelector('.modal-image');
    const imageData = currentImageArray[currentImageIndex];
    modalImage.src = imageData.src;
    modalImage.alt = imageData.alt;
    
    // Update navigation button states
    updateModalNavButtons(modal);
}

function updateModalNavButtons(modal) {
    const prevBtn = modal.querySelector('.modal-nav-prev');
    const nextBtn = modal.querySelector('.modal-nav-next');
    
    if (prevBtn) {
        prevBtn.disabled = currentImageIndex === 0;
    }
    
    if (nextBtn) {
        nextBtn.disabled = currentImageIndex === currentImageArray.length - 1;
    }
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
