import { minify } from 'terser';
import fs from 'fs';
import path from 'path';

const BUILD_DIR = 'dist';
const SOURCE_DIR = '.';

async function build() {
    console.log('🚀 Building ARISE HQ...');
    
    // Create build directory
    if (!fs.existsSync(BUILD_DIR)) {
        fs.mkdirSync(BUILD_DIR, { recursive: true });
    }
    
    // 1. Copy HTML files
    console.log('📄 Copying HTML files...');
    fs.copyFileSync(
        path.join(SOURCE_DIR, 'index.html'),
        path.join(BUILD_DIR, 'index.html')
    );
    
    // 2. Process and minify CSS
    console.log('🎨 Processing CSS...');
    let css = fs.readFileSync(
        path.join(SOURCE_DIR, 'styles/main.css'),
        'utf8'
    );
    
    // Minify CSS
    css = css.replace(/\s+/g, ' ')
             .replace(/\/\*.*?\*\//g, '')
             .trim();
    
    fs.writeFileSync(
        path.join(BUILD_DIR, 'styles.css'),
        css
    );
    
    // 3. Process and bundle JavaScript
    console.log('⚡ Processing JavaScript...');
    
    const jsFiles = [
        'scripts/main.js',
        'scripts/navigation.js',
        'scripts/animations.js',
        'scripts/assets.js'
    ];
    
    let jsBundle = '';
    
    for (const file of jsFiles) {
        const content = fs.readFileSync(
            path.join(SOURCE_DIR, file),
            'utf8'
        );
        jsBundle += content + '\n\n';
    }
    
    // Minify JavaScript
    const minified = await minify(jsBundle, {
        compress: true,
        mangle: true,
        output: {
            comments: false
        }
    });
    
    fs.writeFileSync(
        path.join(BUILD_DIR, 'app.js'),
        minified.code
    );
    
    // 4. Copy assets
    console.log('🖼️ Copying assets...');
    copyDir(
        path.join(SOURCE_DIR, 'assets'),
        path.join(BUILD_DIR, 'assets')
    );
    
    // 5. Generate service worker for offline support
    console.log('🔧 Generating service worker...');
    generateServiceWorker();
    
    console.log('✅ Build complete!');
    console.log(`📁 Output: ${BUILD_DIR}/`);
}

function copyDir(src, dest) {
    if (!fs.existsSync(dest)) {
        fs.mkdirSync(dest, { recursive: true });
    }
    
    const entries = fs.readdirSync(src, { withFileTypes: true });
    
    for (const entry of entries) {
        const srcPath = path.join(src, entry.name);
        const destPath = path.join(dest, entry.name);
        
        if (entry.isDirectory()) {
            copyDir(srcPath, destPath);
        } else {
            fs.copyFileSync(srcPath, destPath);
        }
    }
}

function generateServiceWorker() {
    const swContent = `
// ARISE HQ Service Worker
const CACHE_NAME = 'arise-hq-v1.0.0';
const ASSETS = [
    '/',
    '/index.html',
    '/styles.css',
    '/app.js',
    '/assets/icons/logo.svg'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
    );
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response;
                }
                
                return fetch(event.request).then(response => {
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }
                    
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });
                    
                    return response;
                });
            })
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
`;
    
    fs.writeFileSync(
        path.join(BUILD_DIR, 'sw.js'),
        swContent
    );
}

// Run build
build().catch(console.error);