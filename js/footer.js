// PHEDEL Universal Footer Component
// Standardized footer for all pages

class PhedelFooter {
    constructor() {
        this.init();
    }

    getBasePath() {
        const path = window.location.pathname;
        const segments = path.split('/').filter(segment => segment);

        // If we're in a subdirectory (like telecom/), go up one level
        if (segments.length > 1 && segments[segments.length - 1].includes('.html')) {
            return '../';
        }
        return './';
    }

    ensureFontAwesome() {
        const existingFa = document.querySelector('link[href*="font-awesome"], link[href*="fontawesome"], link[href*="cdnjs.cloudflare.com/ajax/libs/font-awesome"]');
        if (!existingFa) {
            const faLink = document.createElement('link');
            faLink.rel = 'stylesheet';
            faLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
            document.head.appendChild(faLink);
        }
    }

    init() {
        this.ensureFontAwesome();
        this.injectFooterHTML();
    }

    injectFooterHTML() {
        const basePath = this.getBasePath();
        const footerHTML = `
        <!-- Footer --> 
        <footer class="bg-gray-900 text-white py-8"> 
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> 
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 py-8"> 
                    <!-- Company Info --> 
                    <div class="flex flex-col items-center md:items-start"> 
                        <img src="/images/phedel.png" alt="PHEDEL Logo" class="w-32 h-10 object-contain mb-4"> 
                        <div class="text-sm text-gray-400 text-center md:text-left"> 
                            <p>GF, SY NO 70/2A &B,70/3 &70/4,, BANGALORE RURAL DISTRICT, BUDHIHAL</p> 
                            <p>VILLAGE,NELAMNGALA TALUK, Bengaluru, Bengaluru Rural, Karnataka, 562123</p> 
                            <p>Karnataka, India</p> 
                            <p>Phone: +91 96069 43073</p> 
                            <p>Email: support@phedelco.com</p> 
                        </div> 
                    </div> 
                    
                    <!-- Quick Links --> 
                    <div class="flex flex-col items-center"> 
                        <h3 class="text-white font-semibold mb-4">Quick Links</h3> 
                        <div class="flex flex-col gap-3 text-sm text-gray-400"> 
                            <a href="${basePath}about.html" class="hover:text-white transition-colors">About</a> 
                            <a href="${basePath}industries.html" class="hover:text-white transition-colors">Industries</a> 
                            <a href="${basePath}contact.html" class="hover:text-white transition-colors">Contact</a> 
                        </div> 
                    </div> 
    
                    <!-- Social Links --> 
                    <div class="flex flex-col items-center"> 
                        <h3 class="text-white font-semibold mb-4">Connect With Us</h3> 
                        <div class="flex space-x-6"> 
                            <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl"> 
                                <i class="fab fa-linkedin"></i> 
                            </a> 
                            <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl"> 
                                <i class="fab fa-twitter"></i> 
                            </a> 
                            <a href="#" class="text-gray-400 hover:text-white transition-colors text-xl"> 
                                <i class="fab fa-facebook"></i> 
                            </a> 
                        </div> 
                    </div> 
                </div> 
                
                <div class="border-t border-gray-800 mt-8 pt-8 text-center space-y-2"> 
                    <p class="text-sm text-gray-300 tracking-wide">&copy; 2024 PHEDEL Enterprises Inc. All rights reserved.</p> 
                    <p class="text-xs text-gray-500">
                        <span class="opacity-80">Crafted with ❤️ by</span>
                        <a href="https://krishna77606.github.io/portfolio/" 
                           target="_blank" 
                           rel="noopener noreferrer" 
                           class="ml-1 text-gray-400 hover:text-white font-medium underline decoration-dotted transition-all duration-200 hover:decoration-solid">
                            Krishnamurthy M G
                        </a>
                    </p>
                </div>
            </div> 
        </footer>`;

        let footerContainer = document.getElementById('footer-container');
        if (!footerContainer) {
            footerContainer = document.createElement('div');
            footerContainer.id = 'footer-container';
            document.body.appendChild(footerContainer);
        }
        footerContainer.innerHTML = footerHTML;
    }
}

// Initialize footer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.phedelFooter = new PhedelFooter();
    } catch (error) {
        console.error('Error creating PhedelFooter:', error);
    }
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PhedelFooter;
}