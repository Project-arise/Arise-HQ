export class AssetManager {
    constructor() {
        this.assets = new Map();
        this.loaded = false;
        this.totalAssets = 0;
        this.loadedAssets = 0;
        this.progressCallbacks = [];
        
        this.init();
    }

    init() {
        this.setupAssetPreloading();
        this.setupImageOptimization();
        this.setupFontLoading();
        this.setupVideoOptimization();
    }

    // ASSET PRELOADING
    setupAssetPreloading() {
        // Detect critical assets
        this.detectCriticalAssets();
        
        // Preload assets based on viewport
        this.preloadVisibleAssets();
        
        // Lazy load non-critical assets
        this.setupLazyLoading();
    }

    detectCriticalAssets() {
        // Critical images (above the fold)
        const criticalImages = [
            // Logo
            '/assets/icons/logo.svg',
            // Hero background elements
            '/assets/images/backgrounds/hero-grid.png',
            // Team placeholder colors
            '/assets/images/team/placeholders/'
        ];
        
        this.criticalAssets = criticalImages;
        this.totalAssets = criticalImages.length;
    }

    preloadVisibleAssets() {
        this.criticalAssets.forEach(asset => {
            this.preloadAsset(asset);
        });
    }

    async preloadAsset(src) {
        return new Promise((resolve, reject) => {
            const asset = new Image();
            asset.onload = () => {
                this.assets.set(src, asset);
                this.loadedAssets++;
                this.updateProgress();
                resolve(asset);
            };
            asset.onerror = reject;
            asset.src = src;
        });
    }

    // LAZY LOADING SYSTEM
    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            this.lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        this.loadLazyAsset(element);
                        this.lazyObserver.unobserve(element);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });
            
            // Observe lazy elements
            document.addEventListener('DOMContentLoaded', () => {
                document.querySelectorAll('[data-lazy]').forEach(element => {
                    this.lazyObserver.observe(element);
                });
            });
        } else {
            // Fallback for older browsers
            this.loadAllAssets();
        }
    }

    loadLazyAsset(element) {
        const assetType = element.tagName.toLowerCase();
        const src = element.dataset.src || element.dataset.lazy;
        
        if (!src) return;
        
        switch(assetType) {
            case 'img':
                this.loadLazyImage(element, src);
                break;
            case 'video':
                this.loadLazyVideo(element, src);
                break;
            case 'iframe':
                this.loadLazyIframe(element, src);
                break;
        }
    }

    loadLazyImage(imgElement, src) {
        // Create a new image to preload
        const tempImage = new Image();
        tempImage.onload = () => {
            // Apply the src to the actual element
            imgElement.src = src;
            imgElement.classList.add('loaded');
            
            // Dispatch event
            imgElement.dispatchEvent(new Event('load'));
            
            // Fade in effect
            imgElement.style.opacity = '0';
            imgElement.style.transition = 'opacity 0.3s ease';
            
            requestAnimationFrame(() => {
                imgElement.style.opacity = '1';
            });
        };
        
        tempImage.src = src;
    }

    // IMAGE OPTIMIZATION
    setupImageOptimization() {
        // Generate responsive image sets
        this.generateResponsiveImages();
        
        // Apply WebP conversion where supported
        this.setupWebPSupport();
        
        // Add blur-up technique for images
        this.setupBlurUpTechnique();
    }

    generateResponsiveImages() {
        // This would typically be done server-side
        // Here we just add srcset attributes to images
        
        document.addEventListener('DOMContentLoaded', () => {
            document.querySelectorAll('img[data-srcset]').forEach(img => {
                const srcset = img.dataset.srcset;
                if (srcset) {
                    img.srcset = srcset;
                    img.sizes = img.dataset.sizes || '100vw';
                }
            });
        });
    }

    setupWebPSupport() {
        // Check WebP support
        this.supportsWebP = false;
        
        const webPTest = new Image();
        webPTest.onload = webPTest.onerror = () => {
            this.supportsWebP = (webPTest.height === 2);
            this.applyWebPConversion();
        };
        webPTest.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }

    applyWebPConversion() {
        if (!this.supportsWebP) return;
        
        document.querySelectorAll('img[data-webp]').forEach(img => {
            const webpSrc = img.dataset.webp;
            if (webpSrc) {
                img.src = webpSrc;
            }
        });
    }

    setupBlurUpTechnique() {
        // Add blur-up effect for images
        const style = document.createElement('style');
        style.textContent = `
            .blur-up {
                filter: blur(10px);
                transition: filter 0.3s ease;
            }
            
            .blur-up.loaded {
                filter: blur(0);
            }
            
            .blur-up.lqip {
                background-size: cover;
                background-position: center;
            }
        `;
        document.head.appendChild(style);
    }

    // FONT LOADING
    setupFontLoading() {
        // Preload critical fonts
        this.preloadFonts();
        
        // Add font loading states
        this.setupFontLoadingStates();
    }

    preloadFonts() {
        const criticalFonts = [
            'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800',
            'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;700'
        ];
        
        criticalFonts.forEach(fontUrl => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = fontUrl;
            link.onload = () => {
                link.rel = 'stylesheet';
            };
            document.head.appendChild(link);
        });
    }

    setupFontLoadingStates() {
        // Add font loading classes
        document.documentElement.classList.add('fonts-loading');
        
        // Check when fonts are loaded
        document.fonts.ready.then(() => {
            document.documentElement.classList.remove('fonts-loading');
            document.documentElement.classList.add('fonts-loaded');
        });
    }

    // VIDEO OPTIMIZATION
    setupVideoOptimization() {
        // Lazy load videos
        this.setupVideoLazyLoading();
        
        // Optimize video playback
        this.optimizeVideoPlayback();
    }

    setupVideoLazyLoading() {
        document.querySelectorAll('video[data-src]').forEach(video => {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const videoElement = entry.target;
                        videoElement.src = videoElement.dataset.src;
                        videoElement.load();
                        observer.unobserve(videoElement);
                    }
                });
            });
            
            observer.observe(video);
        });
    }

    optimizeVideoPlayback() {
        // Add video controls optimization
        document.querySelectorAll('video').forEach(video => {
            // Preload metadata only
            video.preload = 'metadata';
            
            // Add custom controls
            this.addCustomVideoControls(video);
        });
    }

    addCustomVideoControls(video) {
        if (video.controls) return;
        
        const controls = document.createElement('div');
        controls.className = 'custom-video-controls';
        controls.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            background: linear-gradient(transparent, rgba(0,0,0,0.7));
            padding: 10px;
            display: flex;
            align-items: center;
            gap: 10px;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        const playBtn = document.createElement('button');
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
        playBtn.onclick = () => {
            if (video.paused) {
                video.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                video.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            }
        };
        
        const timeDisplay = document.createElement('span');
        timeDisplay.className = 'video-time';
        timeDisplay.style.color = 'white';
        
        const progress = document.createElement('input');
        progress.type = 'range';
        progress.min = 0;
        progress.max = 100;
        progress.value = 0;
        progress.oninput = (e) => {
            const percent = e.target.value;
            video.currentTime = (percent / 100) * video.duration;
        };
        
        video.addEventListener('timeupdate', () => {
            const percent = (video.currentTime / video.duration) * 100;
            progress.value = percent;
            
            const minutes = Math.floor(video.currentTime / 60);
            const seconds = Math.floor(video.currentTime % 60);
            timeDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
        });
        
        controls.appendChild(playBtn);
        controls.appendChild(progress);
        controls.appendChild(timeDisplay);
        
        video.parentElement.style.position = 'relative';
        video.parentElement.appendChild(controls);
        
        // Show/hide controls on hover
        video.parentElement.addEventListener('mouseenter', () => {
            controls.style.opacity = '1';
        });
        
        video.parentElement.addEventListener('mouseleave', () => {
            controls.style.opacity = '0';
        });
    }

    // PROGRESS TRACKING
    updateProgress() {
        const progress = (this.loadedAssets / this.totalAssets) * 100;
        
        // Update loading bar if exists
        const loadingBar = document.querySelector('.loading-progress');
        if (loadingBar) {
            loadingBar.style.width = `${progress}%`;
        }
        
        // Call progress callbacks
        this.progressCallbacks.forEach(callback => {
            callback(progress);
        });
        
        // Check if all assets are loaded
        if (this.loadedAssets >= this.totalAssets && !this.loaded) {
            this.onAssetsLoaded();
        }
    }

    onAssetsLoaded() {
        this.loaded = true;
        
        // Dispatch event
        const event = new CustomEvent('arise:assetsLoaded', {
            detail: {
                totalAssets: this.totalAssets,
                timestamp: Date.now()
            }
        });
        document.dispatchEvent(event);
        
        // Remove loading screen
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }
    }

    // ASSET MANAGEMENT METHODS
    async getAsset(src) {
        if (this.assets.has(src)) {
            return this.assets.get(src);
        }
        
        return this.loadAsset(src);
    }

    async loadAsset(src) {
        return new Promise((resolve, reject) => {
            const asset = new Image();
            asset.onload = () => {
                this.assets.set(src, asset);
                resolve(asset);
            };
            asset.onerror = reject;
            asset.src = src;
        });
    }

    preloadAssets(assetList) {
        assetList.forEach(src => {
            if (!this.assets.has(src)) {
                this.totalAssets++;
                this.preloadAsset(src);
            }
        });
    }

    // EVENT HANDLING
    onProgress(callback) {
        this.progressCallbacks.push(callback);
    }

    onLoaded(callback) {
        if (this.loaded) {
            callback();
        } else {
            document.addEventListener('arise:assetsLoaded', callback);
        }
    }

    // PUBLIC API
    static async loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = src;
        });
    }

    static async loadJSON(src) {
        const response = await fetch(src);
        return response.json();
    }

    static async loadVideo(src) {
        return new Promise((resolve, reject) => {
            const video = document.createElement('video');
            video.onloadeddata = () => resolve(video);
            video.onerror = reject;
            video.src = src;
        });
    }

    // CLEANUP
    destroy() {
        if (this.lazyObserver) {
            this.lazyObserver.disconnect();
        }
        
        this.assets.clear();
        this.progressCallbacks = [];
    }
}

// Initialize asset manager
document.addEventListener('DOMContentLoaded', () => {
    window.ARISEAssets = new AssetManager();
});