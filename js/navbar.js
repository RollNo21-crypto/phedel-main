// PHEDEL Universal Navbar Component
// Standardized navigation bar with search functionality for all pages

class PhedelNavbar {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    getCurrentPage() {
        const path = window.location.pathname;
        const filename = path.split('/').pop();
        
        // Handle different path scenarios
        if (!filename || filename === '' || filename === 'index.html') {
            return 'index';
        }
        
        // Remove .html extension for comparison
        const pageName = filename.replace('.html', '');
        
        // Handle subdirectory pages (like telecom/power-distribution.html)
        if (path.includes('/')) {
            const pathParts = path.split('/');
            if (pathParts.length > 2) {
                // For paths like /telecom/power-distribution.html
                const directory = pathParts[pathParts.length - 2];
                const file = pathParts[pathParts.length - 1].replace('.html', '');
                return `${directory}/${file}`;
            }
        }
        
        return pageName;
    }

    getBasePath() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);
        
        // Debug logging
        console.log('Current path:', path);
        console.log('Segments:', segments);
        
        // If we're in a subdirectory (like telecom/), we need to go up one level
        if (segments.length > 1 && segments[segments.length - 1].includes('.html')) {
            console.log('Using relative path: ../');
            return '../';
        }
        console.log('Using current directory: ./');
        return './';
    }

    init() {
        console.log('PhedelNavbar initializing...');
        this.injectNavbarHTML();
        this.setupEventListeners();
        this.highlightCurrentPage();
        this.setupSearchModal();
        console.log('PhedelNavbar initialized successfully');
    }

    injectNavbarHTML() {
        const basePath = this.getBasePath();
        const navbarHTML = `
        <!-- Navigation -->
        <nav class="bg-white shadow-sm">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between items-center h-16">
                    <!-- Logo - Always visible -->
                    <div class="flex items-center cursor-pointer" onclick="window.location.href='${basePath}index.html'">
                        <div class="flex items-center space-x-2 cursor-pointer">
                            <img src="${basePath}phedel.png" alt="PHEDEL Logo" class="w-32 h-12 object-contain cursor-pointer">
                        </div>
                    </div>
                    
                    <!-- Desktop Navigation Links -->
                    <div class="hidden md:flex lg:flex">
                        <div class="ml-10 flex items-baseline space-x-4 lg:space-x-8">
                            <a href="${basePath}index.html" class="nav-link text-gray-700 px-2 lg:px-3 py-2 text-sm font-medium transition-colors" data-page="index" onmouseover="this.style.color='#3A46A5'" onmouseout="this.style.color=''">Home</a>
                            
                            <!-- Industries dropdown -->
                            <div class="relative group">
                                <a href="${basePath}industries.html" class="nav-link px-2 lg:px-3 py-2 text-sm font-medium flex items-center transition-colors" data-page="industries" style="color: #3A46A5;">
                                    Industries
                                    <i class="fas fa-chevron-down ml-1 text-xs"></i>
                                </a>
                                <div class="absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                                    <div class="py-1">
                                        <a href="${basePath}it-industry.html" class="block px-4 py-2 text-sm text-gray-700 transition-colors" onmouseover="this.style.backgroundColor='rgba(58, 70, 165, 0.1)'; this.style.color='#3A46A5'" onmouseout="this.style.backgroundColor=''; this.style.color=''">IT</a>
                                        <a href="${basePath}datacenter-industry.html" class="block px-4 py-2 text-sm text-gray-700 transition-colors" onmouseover="this.style.backgroundColor='rgba(58, 70, 165, 0.1)'; this.style.color='#3A46A5'" onmouseout="this.style.backgroundColor=''; this.style.color=''">Data Center</a>
                                        <a href="${basePath}telecom-industry.html" class="block px-4 py-2 text-sm text-gray-700 transition-colors" onmouseover="this.style.backgroundColor='rgba(58, 70, 165, 0.1)'; this.style.color='#3A46A5'" onmouseout="this.style.backgroundColor=''; this.style.color=''">Telecom</a>
                                        <a href="${basePath}industrial-auto-industry.html" class="block px-4 py-2 text-sm text-gray-700 transition-colors" onmouseover="this.style.backgroundColor='rgba(58, 70, 165, 0.1)'; this.style.color='#3A46A5'" onmouseout="this.style.backgroundColor=''; this.style.color=''">Accessories</a>
                                        <a href="${basePath}power-industry.html" class="block px-4 py-2 text-sm text-gray-700 transition-colors" onmouseover="this.style.backgroundColor='rgba(58, 70, 165, 0.1)'; this.style.color='#3A46A5'" onmouseout="this.style.backgroundColor=''; this.style.color=''">Power</a>
                                    </div>
                                </div>
                            </div>
                            
                            <!-- Products dropdown -->
                            <div class="relative group">
                                <a href="${basePath}products.html" class="nav-link text-gray-700 px-2 lg:px-3 py-2 text-sm font-medium flex items-center transition-colors" data-page="products" onmouseover="this.style.color='#3A46A5'" onmouseout="this.style.color=''">
                                    Products
                                </a>
                            </div>
                            
                            <!-- About Us dropdown -->
                            <div class="relative group">
                                <a href="${basePath}about.html" class="nav-link text-gray-700 px-2 lg:px-3 py-2 text-sm font-medium flex items-center transition-colors" data-page="about" onmouseover="this.style.color='#3A46A5'" onmouseout="this.style.color=''">
                                    About Us
                                </a>
                            </div>
                            <div class="relative group">
                                <a href="${basePath}contact.html" class="nav-link text-gray-700 px-2 lg:px-3 py-2 text-sm font-medium flex items-center transition-colors" data-page="contact" onmouseover="this.style.color='#3A46A5'" onmouseout="this.style.color=''">
                                    Contact Us
                                </a>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Right side controls - Always visible -->
                    <div class="flex items-center space-x-4">
                        <button id="search-button" class="text-gray-700 hover:text-blue-600 p-2 rounded-lg hover:bg-gray-100 transition-colors" title="Search Products (Ctrl+K)">
                            <i class="fas fa-search text-lg"></i>
                        </button>
                        <a href="${basePath}contact.html" class="hidden sm:block text-white px-4 py-2 rounded-lg text-sm font-medium" style="background-color: #3A46A5;" onmouseover="this.style.backgroundColor='#2d3a8c'" onmouseout="this.style.backgroundColor='#3A46A5'">Get Quote</a>
                        <!-- Mobile menu button -->
                        <button id="mobile-menu-button" class="md:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#3A46A5]" onmouseover="this.style.color='#3A46A5'" onmouseout="this.style.color=''">
                            <span class="sr-only">Open main menu</span>
                            <i id="hamburger-icon" class="fas fa-bars text-xl"></i>
                            <i id="close-icon" class="fas fa-times text-xl hidden"></i>
                        </button>
                    </div>
                </div>
                
                <!-- Mobile menu - Only navigation links -->
                <div id="mobile-menu" class="md:hidden hidden">
                    <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                        <a href="${basePath}index.html" class="text-gray-700 block px-3 py-2 text-base font-medium hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">Home</a>
                        
                        <!-- Mobile Industries dropdown -->
                        <div class="mobile-dropdown">
                            <button class="mobile-dropdown-toggle w-full text-left px-3 py-2 text-base font-medium text-gray-700 hover:text-[#3A46A5] hover:bg-gray-50 flex items-center justify-between transition-colors">
                                Industries
                                <i class="fas fa-chevron-down text-sm transition-transform"></i>
                            </button>
                            <div class="mobile-dropdown-content hidden pl-4 space-y-1">
                                <a href="${basePath}it-industry.html" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">IT</a>
                                <a href="${basePath}datacenter-industry.html" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">Data Center</a>
                                <a href="${basePath}telecom-industry.html" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">Telecom</a>
                                <a href="${basePath}industrial-auto-industry.html" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">Accessories</a>
                                <a href="${basePath}power-industry.html" class="block px-3 py-2 text-sm text-gray-600 hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">Power</a>
                            </div>
                        </div>
                        
                        <a href="${basePath}products.html" class="text-gray-700 block px-3 py-2 text-base font-medium hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">Products</a>
                        
                        <a href="${basePath}about.html" class="text-gray-700 block px-3 py-2 text-base font-medium hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">About Us</a>
                        <a href="${basePath}contact.html" class="text-gray-700 block px-3 py-2 text-base font-medium hover:text-[#3A46A5] hover:bg-gray-50 transition-colors">Contact Us</a>
                        <a href="${basePath}contact.html" class="text-white block px-3 py-2 text-base font-medium transition-colors rounded-lg mx-3 mt-4" style="background-color: #3A46A5;" onmouseover="this.style.backgroundColor='#2d3a8c'" onmouseout="this.style.backgroundColor='#3A46A5'">Get Quote</a>
                    </div>
                </div>
            </div>
        </nav>

        <!-- Search Modal -->
        <div id="search-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden">
            <div class="fixed left-1/2 top-16 md:top-20 transform -translate-x-1/2 bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 md:mx-0">
                    <div class="p-6">
                        <div class="flex items-center justify-between mb-4">
                            <h3 class="text-lg font-semibold text-gray-900">Search Products</h3>
                            <button id="close-search-modal" class="text-gray-400 hover:text-gray-600">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                        <div class="relative">
                            <input type="text" id="search-input" placeholder="Search for products, categories, or solutions..." 
                                   class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                            <div class="absolute right-3 top-3">
                                <i class="fas fa-search text-gray-400"></i>
                            </div>
                        </div>
                        <div id="search-results" class="mt-4 max-h-96 overflow-y-auto">
                            <!-- Search results will be populated here -->
                        </div>
                    </div>
                </div>
        </div>
        `;

        // Find the navbar container or create one
        let navbarContainer = document.getElementById('navbar-container');
        console.log('Looking for navbar-container:', navbarContainer);
        
        if (!navbarContainer) {
            console.log('navbar-container not found, creating one');
            navbarContainer = document.createElement('div');
            navbarContainer.id = 'navbar-container';
            document.body.insertBefore(navbarContainer, document.body.firstChild);
        } else {
            console.log('navbar-container found');
        }
        
        console.log('Injecting navbar HTML...');
        navbarContainer.innerHTML = navbarHTML;
        console.log('Navbar HTML injected successfully');
    }

    setupEventListeners() {
        // Mobile menu toggle
        const mobileMenuButton = document.getElementById('mobile-menu-button');
        const mobileMenu = document.getElementById('mobile-menu');
        const hamburgerIcon = document.getElementById('hamburger-icon');
        const closeIcon = document.getElementById('close-icon');

        if (mobileMenuButton && mobileMenu) {
            mobileMenuButton.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
                hamburgerIcon.classList.toggle('hidden');
                closeIcon.classList.toggle('hidden');
            });
        }

        // Mobile dropdown toggles
        const mobileDropdowns = document.querySelectorAll('.mobile-dropdown-toggle');
        mobileDropdowns.forEach(toggle => {
            toggle.addEventListener('click', () => {
                const content = toggle.nextElementSibling;
                const icon = toggle.querySelector('i');
                
                content.classList.toggle('hidden');
                icon.classList.toggle('fa-chevron-down');
                icon.classList.toggle('fa-chevron-up');
            });
        });

        // Search functionality
        const searchButton = document.getElementById('search-button');
        const searchModal = document.getElementById('search-modal');
        const closeSearchModal = document.getElementById('close-search-modal');
        const searchInput = document.getElementById('search-input');

        if (searchButton) {
            searchButton.addEventListener('click', () => this.openSearchModal());
        }

        if (closeSearchModal) {
            closeSearchModal.addEventListener('click', () => this.closeSearchModal());
        }

        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) {
                    this.closeSearchModal();
                }
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.handleSearch(e.target.value);
            });

            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.closeSearchModal();
                }
            });
        }

        // Keyboard shortcut for search (Ctrl+K)
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                this.openSearchModal();
            }
        });
    }

    highlightCurrentPage() {
        const navLinks = document.querySelectorAll('.nav-link');
        const currentPage = this.currentPage;
        
        navLinks.forEach(link => {
            const page = link.getAttribute('data-page');
            
            // Reset styles first
            link.style.color = '';
            link.style.fontWeight = '';
            
            // Check for matches
            if (page === currentPage || 
                (currentPage === 'index' && page === 'index') ||
                (currentPage === '' && page === 'index') ||
                // Handle telecom product pages
                (currentPage.includes('power-distribution') && page === 'products') ||
                (currentPage.includes('premium-outdoor-cabinet') && page === 'products') ||
                (currentPage.includes('splice-enclosures') && page === 'products') ||
                (currentPage.includes('standard-outdoor-cabinet') && page === 'products') ||
                (currentPage.includes('wall-mount-cabinet') && page === 'products') ||
                // Handle other product categories
                (currentPage.includes('telecom') && page === 'products') ||
                (currentPage.includes('datacenter') && page === 'products') ||
                (currentPage.includes('it-network') && page === 'products') ||
                // Handle industry pages
                (currentPage.includes('industry') && page === 'industries')) {
                link.style.color = '#3A46A5';
                link.style.fontWeight = '600';
            }
        });
    }

    setupSearchModal() {
        // Initialize search functionality when UniversalSearchSystem becomes available
        const initializeSearchSystem = () => {
            if (typeof UniversalSearchSystem !== 'undefined') {
                try {
                    this.searchSystem = new UniversalSearchSystem();
                    console.log('UniversalSearchSystem initialized successfully');
                } catch (error) {
                    console.error('Error initializing UniversalSearchSystem:', error);
                }
            } else {
                // If UniversalSearchSystem is not available yet, wait and try again
                setTimeout(initializeSearchSystem, 100);
            }
        };
        
        initializeSearchSystem();
    }

    openSearchModal() {
        const searchModal = document.getElementById('search-modal');
        const searchInput = document.getElementById('search-input');
        
        if (searchModal) {
            searchModal.classList.remove('hidden');
            if (searchInput) {
                setTimeout(() => searchInput.focus(), 100);
            }
        }
    }

    closeSearchModal() {
        const searchModal = document.getElementById('search-modal');
        const searchInput = document.getElementById('search-input');
        const searchResults = document.getElementById('search-results');
        
        if (searchModal) {
            searchModal.classList.add('hidden');
        }
        
        if (searchInput) {
            searchInput.value = '';
        }
        
        if (searchResults) {
            searchResults.innerHTML = '';
        }
    }

    handleSearch(query) {
        if (!query.trim()) {
            document.getElementById('search-results').innerHTML = '';
            return;
        }

        // Use the existing search system if available
        if (this.searchSystem && typeof this.searchSystem.searchProducts === 'function') {
            const results = this.searchSystem.searchProducts(query);
            this.displaySearchResults(results);
        } else {
            // Fallback basic search
            this.performBasicSearch(query);
        }
    }

    displaySearchResults(results) {
        const searchResults = document.getElementById('search-results');
        
        if (!results || results.length === 0) {
            searchResults.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-search text-3xl mb-2"></i>
                    <p>No products found for your search.</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.slice(0, 8).map(product => `
            <div class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onclick="window.location.href='${product.url}'">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900">${product.name}</h4>
                    <p class="text-sm text-gray-600 mt-1">${product.description.substring(0, 100)}...</p>
                    <div class="flex flex-wrap gap-1 mt-2">
                        ${product.tags.slice(0, 3).map(tag => `
                            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">${tag}</span>
                        `).join('')}
                    </div>
                </div>
                <div class="ml-4">
                    <i class="fas fa-arrow-right text-gray-400"></i>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = `
            <div class="space-y-2">
                ${resultsHTML}
                ${results.length > 8 ? `
                    <div class="text-center pt-4">
                        <a href="products.html?search=${encodeURIComponent(query)}" class="text-blue-600 hover:text-blue-800 font-medium">
                            View all ${results.length} results →
                        </a>
                    </div>
                ` : ''}
            </div>
        `;
    }

    performBasicSearch(query) {
        const basePath = this.getBasePath();
        // Basic fallback search functionality
        const basicProducts = [
            { name: 'Data Center Racks', url: `${basePath}datacenter-industry.html`, description: 'Professional data center rack solutions' },
            { name: 'Server Racks', url: `${basePath}it-industry.html`, description: 'High-quality server rack systems' },
            { name: 'Telecom Cabinets', url: `${basePath}telecom-industry.html`, description: 'Telecom infrastructure solutions' },
            { name: 'Network Racks', url: `${basePath}it-industry.html`, description: 'Network equipment housing solutions' },
            { name: 'Power Distribution', url: `${basePath}power-industry.html`, description: 'Power management systems' }
        ];

        const results = basicProducts.filter(product => 
            product.name.toLowerCase().includes(query.toLowerCase()) ||
            product.description.toLowerCase().includes(query.toLowerCase())
        );

        this.displayBasicResults(results);
    }

    displayBasicResults(results) {
        const searchResults = document.getElementById('search-results');
        
        if (results.length === 0) {
            searchResults.innerHTML = `
                <div class="text-center py-8 text-gray-500">
                    <i class="fas fa-search text-3xl mb-2"></i>
                    <p>No products found. Try searching for "racks", "servers", or "telecom".</p>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(product => `
            <div class="flex items-center p-3 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors" onclick="window.location.href='${product.url}'">
                <div class="flex-1">
                    <h4 class="font-medium text-gray-900">${product.name}</h4>
                    <p class="text-sm text-gray-600 mt-1">${product.description}</p>
                </div>
                <div class="ml-4">
                    <i class="fas fa-arrow-right text-gray-400"></i>
                </div>
            </div>
        `).join('');

        searchResults.innerHTML = `<div class="space-y-2">${resultsHTML}</div>`;
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, creating PhedelNavbar...');
    try {
        window.phedelNavbar = new PhedelNavbar();
        console.log('PhedelNavbar created successfully');
    } catch (error) {
        console.error('Error creating PhedelNavbar:', error);
    }

    // Dynamically load footer.js and initialize footer
    try {
        const computeBasePath = () => {
            try {
                if (window.phedelNavbar && typeof window.phedelNavbar.getBasePath === 'function') {
                    return window.phedelNavbar.getBasePath();
                }
                const path = window.location.pathname;
                const segments = path.split('/').filter(Boolean);
                return (segments.length > 1 && segments[segments.length - 1].includes('.html')) ? '../' : './';
            } catch (e) {
                return './';
            }
        };

        const basePath = computeBasePath();
        const footerScriptSrc = `${basePath}js/footer.js`;

        const existingFooterScript = document.querySelector(`script[src$="js/footer.js"]`);
        if (!existingFooterScript) {
            const script = document.createElement('script');
            script.src = footerScriptSrc;
            script.defer = true;
            script.onload = () => {
                console.log('footer.js loaded');
                if (window.PhedelFooter && !window.phedelFooter) {
                    try {
                        window.phedelFooter = new PhedelFooter();
                        console.log('PhedelFooter instantiated after load');
                    } catch (err) {
                        console.error('Error instantiating PhedelFooter:', err);
                    }
                }
            };
            script.onerror = (err) => {
                console.error('Failed to load footer.js:', err);
            };
            document.head.appendChild(script);
        } else {
            // If footer.js is already present, ensure footer instance exists
            if (window.PhedelFooter && !window.phedelFooter) {
                try {
                    window.phedelFooter = new PhedelFooter();
                    console.log('PhedelFooter instantiated (script already present)');
                } catch (err) {
                    console.error('Error instantiating PhedelFooter:', err);
                }
            }
        }
    } catch (e) {
        console.error('Unexpected error while loading footer.js:', e);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhedelNavbar;
}