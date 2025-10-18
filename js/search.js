// PHEDEL Basic Universal Search System
// Simple, efficient search across all product directories

class UniversalSearchSystem {
    constructor() {
        this.isSearchResultsPage = window.location.pathname.includes('products.html');
        this.currentQuery = '';
        this.currentResults = [];
        this.searchCache = new Map();
        this.debounceTimer = null;
        
        // Comprehensive product database from all directories with numerical indexing
        this.productDatabase = [
            // Auto Directory Products (Index 1-9)
            {
                index: 1,
                id: 'fans',
                name: 'Fans',
                description: 'Industrial fans for ventilation and cooling in automation environments',
                url: 'auto/fans.html',
                tags: ['fans', 'ventilation', 'cooling', 'automation', 'airflow', 'industrial fans']
            },
            {
                index: 96,
                id: 'hot-aisle-containment',
                name: 'Hot Aisle Containment Systems',
                description: 'Advanced airflow management solutions that isolate hot exhaust air for improved cooling efficiency',
                url: 'datacenter/Hot Aisle Containment Systems.html',
                tags: ['datacenter', 'hot aisle containment', 'airflow management', 'cooling efficiency', 'energy savings', 'temperature control']
            },
            {
                index: 97,
                id: 'cold-aisle-containment',
                name: 'Cold Aisle Containment Systems',
                description: 'Advanced cold aisle containment solutions that isolate cold supply air for optimal cooling efficiency',
                url: 'datacenter/Cold Aisle Containment Systems.html',
                tags: ['datacenter', 'cold aisle containment', 'airflow management', 'cooling efficiency', 'cost reduction', 'flexible installation']
            },
            {
                index: 2,
                id: 'shelves',
                name: 'Shelves',
                description: 'Industrial shelves and mounting solutions for equipment organization',
                url: 'auto/shelves.html',
                tags: ['shelves', 'mounting', 'equipment organization', 'industrial', 'storage']
            },
            {
                index: 3,
                id: 'blanking-panels',
                name: 'Blanking Panels',
                description: 'Blanking panels for proper airflow management and equipment protection',
                url: 'auto/blanking-panels.html',
                tags: ['blanking panels', 'airflow management', 'equipment protection', 'rack accessories']
            },
            {
                index: 4,
                id: 'bus-bars',
                name: 'Bus Bars',
                description: 'Electrical bus bars for power distribution in industrial automation systems',
                url: 'auto/bus-bars.html',
                tags: ['bus bars', 'power distribution', 'electrical', 'automation', 'power management']
            },
            {
                index: 5,
                id: 'brush-panels',
                name: 'Brush Panels',
                description: 'Brush panels for cable management and dust protection in rack systems',
                url: 'auto/brush-panels.html',
                tags: ['brush panels', 'cable management', 'dust protection', 'rack systems']
            },
            {
                index: 6,
                id: 'lacing-bars',
                name: 'Lacing Bars',
                description: 'Lacing bars for cable organization and management in industrial installations',
                url: 'auto/lacing-bars.html',
                tags: ['lacing bars', 'cable organization', 'cable management', 'industrial']
            },
            {
                index: 7,
                id: 'earthing-cable',
                name: 'Earthing Cable',
                description: 'Earthing cables for electrical safety and grounding in industrial systems',
                url: 'auto/earthing-cable.html',
                tags: ['earthing cable', 'electrical safety', 'grounding', 'industrial systems']
            },
            {
                index: 8,
                id: 'horizontal-cable-management',
                name: 'Horizontal Cable Management',
                description: 'Horizontal cable management solutions for organized cable routing',
                url: 'auto/horizontal-cable-management.html',
                tags: ['horizontal cable management', 'cable routing', 'organization', 'rack systems']
            },
            {
                index: 9,
                id: 'vertical-cable-management',
                name: 'Vertical Cable Management',
                description: 'Vertical cable management systems for efficient cable organization',
                url: 'auto/vertical-cable-management.html',
                tags: ['vertical cable management', 'cable organization', 'efficiency', 'rack systems']
            },

            // Datacenter Directory Products (Index 10-15)
            {
                index: 10,
                id: 'environmental-monitoring',
                name: 'Environmental Monitoring',
                description: 'Advanced environmental monitoring systems for datacenter temperature, humidity, and air quality control',
                url: 'datacenter/ip-pdus.html',
                tags: ['environmental monitoring', 'datacenter', 'temperature', 'humidity', 'air quality', 'sensors']
            },
            {
                index: 11,
                id: 'liquid-cooling-systems',
                name: 'Liquid Cooling Systems',
                description: 'Advanced liquid cooling systems for high-density computing environments offering superior heat dissipation and energy efficiency',
                url: 'datacenter/liquid-cooling-systems.html',
                tags: ['liquid cooling', 'datacenter cooling', 'immersion cooling', 'direct liquid cooling', 'high-density computing']
            },
            {
                index: 12,
                id: 'patch-panels',
                name: 'Patch Panels',
                description: 'Professional patch panels for datacenter network connectivity and cable management',
                url: 'datacenter/patch-panels.html',
                tags: ['patch panels', 'network connectivity', 'datacenter', 'cable management', 'fiber optic', 'copper']
            },
            {
                index: 13,
                id: 'precision-air-conditioning',
                name: 'Precision Air Conditioning',
                description: 'Precision air conditioning systems designed specifically for datacenter environments with tight temperature and humidity control',
                url: 'datacenter/Cold Aisle Containment Systems.html',
                tags: ['precision air conditioning', 'datacenter', 'temperature control', 'humidity control', 'CRAC', 'CRAH']
            },
            {
                index: 14,
                id: 'standard-network-racks',
                name: 'Standard Network Racks',
                description: 'Standard 19-inch network racks for datacenter equipment with professional cable management',
                url: 'datacenter/standard-network-racks.html',
                tags: ['network racks', 'datacenter', '19-inch', 'cable management', 'server racks', 'equipment racks']
            },
            {
                index: 15,
                id: 'datacenter-wall-mount-cabinets',
                name: 'Wall Mount Cabinets',
                description: 'Space-efficient wall mount cabinets for datacenter edge equipment and network devices',
                url: 'datacenter/wall-mount-cabinets.html',
                tags: ['wall mount cabinets', 'datacenter', 'edge equipment', 'network devices', 'space efficient']
            },
            {
                index: 16,
                id: 'standard-racks',
                name: 'Standard Racks',
                description: 'Reliable and cost-effective datacenter racks with essential features for small to medium-scale deployments',
                url: 'datacenter/standard-racks.html',
                tags: ['standard racks', 'datacenter', 'cost-effective', 'reliable', 'essential features', 'server racks']
            },
            {
                index: 17,
                id: 'high-density-racks',
                name: 'High-Density Racks',
                description: 'Enterprise-grade server racks engineered for maximum density computing with optimized airflow and cable management',
                url: 'datacenter/high-density-racks.html',
                tags: ['high-density racks', 'datacenter', 'enterprise-grade', 'maximum density', 'optimized airflow', 'cable management']
            },
            {
                index: 18,
                id: 'blade-server-racks',
                name: 'Blade Server Racks',
                description: 'Specialized racks designed for blade server systems with advanced power distribution and cooling capabilities',
                url: 'datacenter/blade-server-racks.html',
                tags: ['blade server racks', 'datacenter', 'blade systems', 'power distribution', 'cooling', 'specialized racks']
            },
            {
                index: 19,
                id: 'standalone-datacenter',
                name: 'Standalone Datacenter',
                description: 'Complete turnkey datacenter solutions providing integrated infrastructure with power, cooling, security, and monitoring systems',
                url: 'datacenter/standalone-datacenter.html',
                tags: ['standalone datacenter', 'turnkey solutions', 'integrated infrastructure', 'power', 'cooling', 'security', 'monitoring']
            },
            {
                index: 20,
                id: 'intelligent-monitoring',
                name: 'Intelligent Monitoring',
                description: 'Advanced AI-powered monitoring systems with predictive analytics and automated responses for datacenter management',
                url: 'datacenter/intelligent-monitoring.html',
                tags: ['intelligent monitoring', 'AI-powered', 'predictive analytics', 'automated responses', 'datacenter management', 'smart systems']
            },
            {
                index: 21,
                id: 'automated-management',
                name: 'Automated Management',
                description: 'Comprehensive automated management systems with self-healing capabilities and intelligent resource allocation',
                url: 'datacenter/automated-management.html',
                tags: ['automated management', 'self-healing', 'intelligent resource allocation', 'datacenter automation', 'smart management']
            },

            // IT Directory Products (Index 22-34)
            {
                index: 22,
                id: 'aero-mount-neo',
                name: 'Aero Mount Neo',
                description: 'Next-generation wall mounting solutions with advanced features for modern IT infrastructure',
                url: 'it/aero-mount-neo.html',
                tags: ['aero mount neo', 'wall mount', 'IT racks', 'network equipment', 'server mounting', 'next generation']
            },
            {
                index: 23,
                id: 'aero-mount-pro',
                name: 'Aero Mount Pro',
                description: 'Professional-grade wall mounting systems for IT equipment with enhanced durability and features',
                url: 'it/aero-mount-pro.html',
                tags: ['aero mount pro', 'professional', 'wall mounting', 'IT equipment', 'durability', 'enhanced features']
            },
            {
                index: 24,
                id: 'aero-mount',
                name: 'Aero Mount',
                description: 'Reliable wall mounting solutions for IT and network equipment in office environments',
                url: 'it/aero-mount.html',
                tags: ['aero mount', 'wall mounting', 'IT equipment', 'network equipment', 'office', 'reliable']
            },
            {
                index: 25,
                id: 'classic-floor-standing-racks',
                name: 'Classic Floor Standing Racks',
                description: 'Traditional floor standing racks with proven reliability for IT server and network equipment',
                url: 'it/classic-floor-standing-racks.html',
                tags: ['classic floor standing', 'racks', 'IT server', 'network equipment', 'traditional', 'reliable']
            },
            {
                index: 26,
                id: 'elite-floor-standing-racks',
                name: 'Elite Floor Standing Racks',
                description: 'Premium floor standing racks with advanced features for high-end IT installations',
                url: 'it/elite-floor-standing-racks.html',
                tags: ['elite floor standing', 'premium racks', 'advanced features', 'high-end', 'IT installations']
            },
            {
                index: 27,
                id: 'floor-standing-racks',
                name: 'Floor Standing Racks',
                description: 'Standard floor standing racks for general IT equipment and server installations',
                url: 'it/floor-standing-racks.html',
                tags: ['floor standing racks', 'IT equipment', 'server installations', 'standard', 'general purpose']
            },
            {
                index: 28,
                id: 'load-master-network-racks',
                name: 'Load Master Network Racks',
                description: 'Heavy-duty network racks designed for high-capacity equipment loads and demanding environments',
                url: 'it/load-master-network-racks.html',
                tags: ['load master', 'network racks', 'heavy-duty', 'high-capacity', 'demanding environments']
            },
            {
                index: 29,
                id: 'netsafe-network-racks',
                name: 'NetSafe Network Racks',
                description: 'Secure network racks with enhanced protection features for sensitive IT equipment',
                url: 'it/netsafe-network-racks.html',
                tags: ['netsafe', 'network racks', 'secure', 'protection', 'sensitive equipment', 'IT security']
            },
            {
                index: 30,
                id: 'open-wall-series-mount',
                name: 'Open Wall Series Mount',
                description: 'Open frame wall mounting systems for easy access and maintenance of IT equipment',
                url: 'it/open-wall-series-mount.html',
                tags: ['open wall series', 'wall mount', 'open frame', 'easy access', 'maintenance', 'IT equipment']
            },
            {
                index: 31,
                id: 'phenomena-floor-standing-racks',
                name: 'Phenomena Floor Standing Racks',
                description: 'Innovative floor standing racks with unique design features for modern IT environments',
                url: 'it/phenomena-floor-standing-racks.html',
                tags: ['phenomena', 'floor standing racks', 'innovative', 'unique design', 'modern IT']
            },
            {
                index: 32,
                id: 'it-security-surveillance',
                name: 'Security Surveillance',
                description: 'Specialized racks and enclosures for security and surveillance equipment in IT environments',
                url: 'it/security-surveillance.html',
                tags: ['security surveillance', 'racks', 'enclosures', 'security equipment', 'surveillance', 'IT']
            },
            {
                index: 33,
                id: 'titan-pro',
                name: 'Titan Pro',
                description: 'Professional-grade server racks with maximum durability and advanced features for enterprise environments',
                url: 'it/titan-pro.html',
                tags: ['titan pro', 'professional grade', 'server racks', 'durability', 'enterprise', 'advanced features']
            },
            {
                index: 34,
                id: 'titan-series',
                name: 'Titan Series',
                description: 'Robust server rack series designed for heavy-duty applications and high-performance computing',
                url: 'it/titan-series.html',
                tags: ['titan series', 'robust', 'server racks', 'heavy-duty', 'high-performance computing']
            },
            {
                index: 35,
                id: 'compact-wall-mount-cabinets',
                name: 'Compact Wall Mount Cabinets',
                description: 'Space-efficient wall mount cabinets designed for compact IT installations and small office environments',
                url: 'it/Compact Wall Mount Cabinets.html',
                tags: ['compact', 'wall mount cabinets', 'space-efficient', 'small office', 'IT installations', 'compact design']
            },
            {
                index: 36,
                id: 'propro-wall-mount-cabinets',
                name: 'ProPro Wall Mount Cabinets',
                description: 'Professional premium wall mount cabinets with advanced features for high-end IT installations',
                url: 'it/ProPro Wall Mount Cabinets.html',
                tags: ['propro', 'professional', 'premium', 'wall mount cabinets', 'advanced features', 'high-end IT']
            },
            {
                index: 37,
                id: 'standard-wall-mount-cabinets',
                name: 'Standard Wall Mount Cabinets',
                description: 'Reliable and cost-effective wall mount cabinets for standard IT equipment installations',
                url: 'it/Standard Network Racks.html',
                tags: ['standard', 'wall mount cabinets', 'reliable', 'cost-effective', 'IT equipment', 'standard installations']
            },

            // Power Directory Products (Index 38-52)
            {
                index: 38,
                id: 'audio-rack',
                name: 'Audio Rack',
                description: 'Professional audio racks for sound systems, broadcasting, and AV installations with acoustic optimization',
                url: 'power/audio-rack.html',
                tags: ['audio rack', 'AV rack', 'sound system', 'broadcasting', 'professional audio', 'studio equipment']
            },
            {
                index: 39,
                id: 'automation-enclosure',
                name: 'Automation Enclosure',
                description: 'Industrial automation enclosures for control systems and electrical components protection',
                url: 'power/automation-enclosure.html',
                tags: ['automation enclosure', 'control systems', 'electrical protection', 'industrial', 'automation']
            },
            {
                index: 40,
                id: 'automation-panels',
                name: 'Automation Panels',
                description: 'Control panels for industrial automation systems with integrated components and wiring',
                url: 'power/automation-panels.html',
                tags: ['automation panels', 'control panels', 'industrial automation', 'integrated components', 'wiring']
            },
            {
                index: 41,
                id: 'customized-enclosure',
                name: 'Customized Enclosure',
                description: 'Custom-designed enclosures tailored to specific requirements and applications',
                url: 'power/customized-enclosure.html',
                tags: ['customized enclosure', 'custom design', 'tailored solutions', 'specific requirements', 'bespoke']
            },
            {
                index: 42,
                id: 'generator-sync-panels',
                name: 'Generator Sync Panels',
                description: 'Synchronization panels for generator systems and power management applications',
                url: 'power/generator-sync-panels.html',
                tags: ['generator sync panels', 'synchronization', 'generator systems', 'power management', 'electrical']
            },
            {
                index: 43,
                id: 'ht-panel',
                name: 'HT Panel',
                description: 'High tension electrical panels for power distribution and control in industrial applications',
                url: 'power/ht-panel.html',
                tags: ['HT panel', 'high tension', 'electrical panels', 'power distribution', 'industrial', 'high voltage']
            },
            {
                index: 44,
                id: 'junction-box',
                name: 'Junction Box',
                description: 'Electrical junction boxes for safe wire connections and cable management',
                url: 'power/junction-box.html',
                tags: ['junction box', 'electrical connections', 'wire management', 'cable connections', 'safety']
            },
            {
                index: 45,
                id: 'lt-panel',
                name: 'LT Panel',
                description: 'Low tension electrical panels for power distribution and motor control applications',
                url: 'power/lt-panel.html',
                tags: ['LT panel', 'low tension', 'electrical panels', 'power distribution', 'motor control', 'industrial']
            },
            {
                index: 46,
                id: 'monitoring-equipment',
                name: 'Monitoring Equipment',
                description: 'Power monitoring and measurement equipment for electrical systems and energy management',
                url: 'power/monitoring-equipment.html',
                tags: ['monitoring equipment', 'power monitoring', 'measurement', 'electrical systems', 'energy management']
            },
            {
                index: 47,
                id: 'pole-mount-junction-box',
                name: 'Pole Mount Junction Box',
                description: 'Outdoor pole-mounted junction boxes for utility and infrastructure applications',
                url: 'power/pole-mount-junction-box.html',
                tags: ['pole mount', 'junction box', 'outdoor', 'utility', 'infrastructure']
            },
            {
                index: 48,
                id: 'security-enclosure',
                name: 'Security Enclosure',
                description: 'Secure enclosures for protection of sensitive equipment and security systems',
                url: 'power/security-enclosure.html',
                tags: ['security enclosure', 'protection', 'sensitive equipment', 'security systems', 'tamper-proof']
            },
            {
                index: 49,
                id: 'server-rack',
                name: 'Server Rack',
                description: 'Professional server racks for data center and IT infrastructure applications',
                url: 'power/server-rack.html',
                tags: ['server rack', 'data center', 'IT infrastructure', 'professional', 'server equipment']
            },
            {
                index: 50,
                id: 'sheet-metal-fabrication',
                name: 'Sheet Metal Fabrication',
                description: 'Custom sheet metal fabrication services for enclosures and industrial components',
                url: 'power/sheet-metal-fabrication.html',
                tags: ['sheet metal', 'fabrication', 'custom', 'enclosures', 'industrial components', 'manufacturing']
            },
            {
                index: 51,
                id: 'ss-enclosure',
                name: 'SS Enclosure',
                description: 'Stainless steel enclosures for harsh environments and corrosive applications',
                url: 'power/ss-enclosure.html',
                tags: ['stainless steel', 'enclosure', 'harsh environments', 'corrosive', 'durable', 'weather resistant']
            },
            {
                index: 52,
                id: 'video-wall-rack',
                name: 'Video Wall Rack',
                description: 'Specialized racks for video wall displays and digital signage installations',
                url: 'power/video-wall-rack.html',
                tags: ['video wall', 'rack', 'displays', 'digital signage', 'AV equipment', 'mounting']
            },

            // Telecom Directory Products (Index 53-64)
            {
                index: 53,
                id: 'telecom-cable-management',
                name: 'Cable Management Solutions',
                description: 'Professional cable management solutions including trays, organizers, and routing systems for clean installations',
                url: 'telecom/cable-management.html',
                tags: ['cable management', 'cable trays', 'organizers', 'routing systems', 'telecom infrastructure', 'fiber management']
            },
            {
                index: 54,
                id: 'telecom-cooling-systems',
                name: 'Cooling Systems',
                description: 'Telecom cooling systems for equipment temperature control and thermal management',
                url: 'telecom/cooling-systems.html',
                tags: ['cooling systems', 'telecom', 'temperature control', 'thermal management', 'equipment cooling']
            },
            {
                index: 55,
                id: 'fiber-patch-panels',
                name: 'Fiber Patch Panels',
                description: 'High-density fiber optic patch panels for telecom network connectivity and management',
                url: 'telecom/fiber-patch-panels.html',
                tags: ['fiber patch panels', 'fiber optic', 'telecom', 'network connectivity', 'high-density', 'management']
            },
            {
                index: 56,
                id: 'telecom-monitoring-equipment',
                name: 'Monitoring Equipment',
                description: 'Network monitoring and diagnostic equipment for telecom infrastructure management',
                url: 'telecom/monitoring-equipment.html',
                tags: ['monitoring equipment', 'network monitoring', 'diagnostic', 'telecom infrastructure', 'management']
            },
            {
                index: 57,
                id: 'lius',
                name: 'LIUs (Line Interface Units)',
                description: 'High-density Line Interface Units for fiber optic network connectivity with modular design and reliable performance',
                url: 'telecom/LIUs.html',
                tags: ['LIUs', 'line interface units', 'high density', 'fiber optic', 'network connectivity', 'modular design', 'telecom infrastructure']
            },
            {
                index: 58,
                id: 'pig-tails',
                name: 'Pig Tails',
                description: 'High-quality fiber optic pigtail cables for reliable network connections and splicing applications with low insertion loss',
                url: 'telecom/Pig Tails.html',
                tags: ['pig tails', 'pigtail cables', 'fiber optic', 'splicing', 'network connections', 'low insertion loss', 'pre-terminated']
            },
            {
                index: 59,
                id: 'fdms-42u-racks',
                name: 'FDMS 42U Racks',
                description: 'Professional Fiber Distribution Management Systems in 42U rack configuration for high-density fiber management in data centers',
                url: 'telecom/FDMS 42U Racks.html',
                tags: ['FDMS', '42U racks', 'fiber distribution', 'management systems', 'high-density', 'data centers', 'telecom facilities']
            },
            {
                index: 60,
                id: 'patch-cords',
                name: 'Patch Cords',
                description: 'Premium fiber optic patch cords for reliable network connections with multiple connector types and various lengths',
                url: 'telecom/Patch Cords.html',
                tags: ['patch cords', 'fiber optic', 'network connections', 'connector types', 'various lengths', 'reliable', 'premium quality']
            },
            {
                index: 61,
                id: 'pole-wall-mount-cabinet',
                name: 'Pole Wall Mount Cabinet',
                description: 'Outdoor pole and wall mount cabinets for telecom infrastructure installations',
                url: 'telecom/pole-wall-mount-cabinet.html',
                tags: ['pole mount', 'wall mount', 'cabinet', 'outdoor', 'telecom infrastructure', 'installations']
            },
            {
                index: 62,
                id: 'power-distribution',
                name: 'Power Distribution',
                description: 'Power distribution systems and PDUs for telecom equipment and infrastructure',
                url: 'telecom/power-distribution.html',
                tags: ['power distribution', 'PDUs', 'telecom equipment', 'infrastructure', 'power systems']
            },
            {
                index: 63,
                id: 'standard-outdoor-cabinet',
                name: 'Standard Outdoor Cabinet',
                description: 'Standard outdoor cabinets for telecom equipment in various environmental conditions',
                url: 'telecom/standard-outdoor-cabinet.html',
                tags: ['standard', 'outdoor cabinet', 'telecom equipment', 'environmental', 'weather protection']
            },
            {
                index: 64,
                id: 'telecom-wall-mount-cabinet',
                name: 'Wall Mount Cabinet',
                description: 'Compact wall mount cabinets for telecom equipment in indoor installations',
                url: 'telecom/wall-mount-cabinet.html',
                tags: ['wall mount', 'cabinet', 'telecom equipment', 'indoor', 'compact', 'installations']
            },
            {
                index: 65,
                id: 'lius',
                name: 'LIUs (Line Interface Units)',
                description: 'High-density Line Interface Units for fiber optic network connectivity with modular design and reliable performance',
                url: 'telecom/LIUs.html',
                tags: ['LIUs', 'line interface units', 'high density', 'fiber optic', 'network connectivity', 'modular design', 'telecom infrastructure']
            },
            {
                index: 66,
                id: 'pig-tails',
                name: 'Pig Tails',
                description: 'High-quality fiber optic pigtail cables for reliable network connections and splicing applications with low insertion loss',
                url: 'telecom/Pig Tails.html',
                tags: ['pig tails', 'pigtail cables', 'fiber optic', 'splicing', 'network connections', 'low insertion loss', 'pre-terminated']
            },
            {
                index: 67,
                id: 'fdms-42u-racks',
                name: 'FDMS 42U Racks',
                description: 'Professional Fiber Distribution Management Systems in 42U rack configuration for high-density fiber management in data centers',
                url: 'telecom/FDMS 42U Racks.html',
                tags: ['FDMS', '42U racks', 'fiber distribution', 'management systems', 'high-density', 'data centers', 'telecom facilities']
            },
            {
                index: 68,
                id: 'patch-cords',
                name: 'Patch Cords',
                description: 'Premium fiber optic patch cords for reliable network connections with multiple connector types and various lengths',
                url: 'telecom/Patch Cords.html',
                tags: ['patch cords', 'fiber optic', 'network connections', 'connector types', 'various lengths', 'reliable', 'premium quality']
            },

            // Pages Directory Products (Index 69-92)
            {
                index: 69,
                id: 'datacenter-cooling-systems',
                name: 'Datacenter Cooling Systems',
                description: 'Comprehensive cooling solutions for datacenter environments including precision AC and liquid cooling',
                url: 'pages/datacenter-cooling-systems.html',
                tags: ['datacenter cooling', 'precision AC', 'liquid cooling', 'thermal management', 'HVAC']
            },
            {
                index: 70,
                id: 'datacenter-network-racks',
                name: 'Datacenter Network Racks',
                description: 'Professional network racks designed specifically for datacenter environments with advanced cable management',
                url: 'pages/datacenter-network-racks.html',
                tags: ['datacenter', 'network racks', 'cable management', 'server racks', '19-inch racks']
            },
            {
                index: 71,
                id: 'datacenter-server-racks',
                name: 'Datacenter Server Racks',
                description: 'High-density server racks for datacenter environments with superior cooling and power management',
                url: 'pages/datacenter-server-racks.html',
                tags: ['datacenter', 'server racks', 'high-density', 'cooling', 'power management']
            },
            {
                index: 72,
                id: 'datacenter-smart-racks',
                name: 'Datacenter Smart Racks',
                description: 'Intelligent server racks with monitoring capabilities and automated management for modern datacenters',
                url: 'pages/datacenter-smart-racks.html',
                tags: ['datacenter', 'smart racks', 'intelligent', 'monitoring', 'automated management']
            },
            {
                index: 73,
                id: 'datacenter-technological-products',
                name: 'Datacenter Technological Products',
                description: 'Advanced technological solutions and accessories for modern datacenter infrastructure',
                url: 'pages/datacenter-technological-products.html',
                tags: ['datacenter', 'technological products', 'advanced solutions', 'infrastructure', 'accessories']
            },
            {
                index: 74,
                id: 'industrial-automation-cable-management',
                name: 'Industrial Automation Cable Management',
                description: 'Comprehensive cable management solutions for industrial automation systems and control panels',
                url: 'pages/industrial-automation-cable-management.html',
                tags: ['industrial automation', 'cable management', 'control panels', 'wire management', 'organization']
            },
            {
                index: 75,
                id: 'industrial-automation-cooling-ventilation',
                name: 'Industrial Automation Cooling & Ventilation',
                description: 'Cooling and ventilation solutions for industrial automation equipment and control systems',
                url: 'pages/industrial-automation-cable-management.html',
                tags: ['industrial automation', 'cooling', 'ventilation', 'thermal management', 'control systems']
            },
            {
                index: 76,
                id: 'industrial-automation-electrical-components',
                name: 'Industrial Automation Electrical Components',
                description: 'Essential electrical components and accessories for industrial automation and control systems',
                url: 'pages/industrial-automation-electrical-components.html',
                tags: ['industrial automation', 'electrical components', 'control systems', 'automation accessories']
            },
            {
                index: 77,
                id: 'industrial-automation-mounting-support',
                name: 'Industrial Automation Mounting & Support',
                description: 'Mounting brackets, supports, and hardware for industrial automation equipment installation',
                url: 'pages/industrial-automation-pdus-power.html',
                tags: ['industrial automation', 'mounting', 'support', 'brackets', 'hardware', 'installation']
            },
            {
                index: 78,
                id: 'industrial-automation-pdus-power',
                name: 'Industrial Automation PDUs & Power',
                description: 'Power distribution units and power management solutions for industrial automation systems',
                url: 'pages/industrial-automation-pdus-power.html',
                tags: ['industrial automation', 'PDUs', 'power distribution', 'power management', 'electrical']
            },
            {
                index: 79,
                id: 'it-desktop-enclosures',
                name: 'IT Desktop Enclosures',
                description: 'Compact desktop enclosures for small IT equipment and office network devices',
                url: 'pages/it-floor-standing-racks.html',
                tags: ['IT', 'desktop enclosures', 'small equipment', 'office', 'network devices', 'compact']
            },
            {
                index: 80,
                id: 'it-floor-standing-racks',
                name: 'IT Floor Standing Racks',
                description: 'Professional floor standing racks for IT server and network equipment installations',
                url: 'pages/it-floor-standing-racks.html',
                tags: ['IT', 'floor standing racks', 'server equipment', 'network equipment', 'professional']
            },
            {
                index: 81,
                id: 'it-network-racks',
                name: 'IT Network Racks',
                description: 'Specialized network racks for IT environments with enhanced cable management and airflow',
                url: 'pages/it-network-racks.html',
                tags: ['IT', 'network racks', 'cable management', 'airflow', 'networking equipment']
            },
            {
                index: 82,
                id: 'it-open-wall-series',
                name: 'IT Open Wall Series',
                description: 'Open frame wall mounting solutions for IT equipment with easy access and maintenance',
                url: 'pages/it-wall-mount-racks.html',
                tags: ['IT', 'open wall series', 'wall mounting', 'open frame', 'easy access', 'maintenance']
            },
            {
                index: 83,
                id: 'it-security-surveillance',
                name: 'IT Security Surveillance',
                description: 'Specialized enclosures and racks for IT security and surveillance equipment',
                url: 'pages/it-security-surveillance.html',
                tags: ['IT', 'security', 'surveillance', 'enclosures', 'racks', 'security equipment']
            },
            {
                index: 84,
                id: 'it-wall-mount-cabinets',
                name: 'IT Wall Mount Cabinets',
                description: 'Space-saving wall mount cabinets for IT equipment in offices and small installations',
                url: 'pages/it-wall-mount-cabinets.html',
                tags: ['IT', 'wall mount cabinets', 'space-saving', 'office', 'small installations']
            },
            {
                index: 85,
                id: 'it-wall-mount-racks',
                name: 'IT Wall Mount Racks',
                description: 'Versatile wall mount racks for IT and network equipment in space-constrained environments',
                url: 'pages/it-wall-mount-racks.html',
                tags: ['IT', 'wall mount racks', 'network equipment', 'space-constrained', 'versatile']
            },
            {
                index: 86,
                id: 'power-av-racks',
                name: 'Power AV Racks',
                description: 'Specialized racks for audio-visual equipment and power distribution in entertainment systems',
                url: 'pages/power-av-racks.html',
                tags: ['power', 'AV racks', 'audio-visual', 'entertainment systems', 'power distribution']
            },
            {
                index: 87,
                id: 'power-electrical-panels',
                name: 'Power Electrical Panels',
                description: 'Industrial electrical panels and enclosures for power distribution and control systems',
                url: 'pages/power-electrical-panels.html',
                tags: ['power', 'electrical panels', 'industrial', 'power distribution', 'control systems']
            },
            {
                index: 88,
                id: 'power-industrial-enclosures',
                name: 'Power Industrial Enclosures',
                description: 'Robust industrial enclosures for power equipment and electrical components',
                url: 'pages/power-industrial-enclosures.html',
                tags: ['power', 'industrial enclosures', 'power equipment', 'electrical components', 'robust']
            },
            {
                index: 89,
                id: 'power-security-surveillance',
                name: 'Power Security Surveillance',
                description: 'Power solutions and enclosures for security and surveillance systems',
                url: 'pages/power-security-surveillance.html',
                tags: ['power', 'security', 'surveillance', 'power solutions', 'enclosures']
            },
            {
                index: 90,
                id: 'telecom-fiber-optic-accessories',
                name: 'Telecom Fiber Optic Accessories',
                description: 'Complete range of fiber optic accessories and components for telecom infrastructure',
                url: 'pages/telecom-fiber-optic-accessories.html',
                tags: ['telecom', 'fiber optic', 'accessories', 'components', 'infrastructure']
            },
            {
                index: 91,
                id: 'telecom-indoor-cabinets',
                name: 'Telecom Indoor Cabinets',
                description: 'Indoor telecom cabinets for equipment housing and network infrastructure',
                url: 'pages/telecom-indoor-cabinets.html',
                tags: ['telecom', 'indoor cabinets', 'equipment housing', 'network infrastructure']
            },
            {
                index: 92,
                id: 'telecom-other-products',
                name: 'Telecom Other Products',
                description: 'Additional telecom products and accessories for comprehensive network solutions',
                url: 'pages/telecom-other-products.html',
                tags: ['telecom', 'other products', 'accessories', 'network solutions', 'comprehensive']
            },
            {
                index: 93,
                id: 'telecom-outdoor-cabinets',
                name: 'Telecom Outdoor Cabinets',
                description: 'Weather-resistant outdoor cabinets for telecom equipment and infrastructure',
                url: 'pages/telecom-outdoor-cabinets.html',
                tags: ['telecom', 'outdoor cabinets', 'weather-resistant', 'infrastructure', 'outdoor equipment']
            },
            {
                index: 94,
                id: 'ip-pdus',
                name: 'IP PDUs - Intelligent Power Distribution Units',
                description: 'Advanced intelligent power distribution units with remote monitoring and control capabilities',
                url: 'datacenter/ip-pdus.html',
                tags: ['datacenter', 'ip pdus', 'power distribution', 'intelligent', 'remote monitoring', 'power management']
            },
            {
                index: 95,
                id: 'km-switches',
                name: 'KM Switches - KVM Management Solutions',
                description: 'Comprehensive keyboard, video, and mouse management for multiple servers from a single console',
                url: 'datacenter/km-switches.html',
                tags: ['datacenter', 'km switches', 'kvm', 'server management', 'keyboard', 'video', 'mouse', 'console']
            },
            // Industrial Automation Electrical Components
            {
                index: 96,
                id: 'fans',
                name: 'Industrial Cooling Fans',
                description: 'High-performance cooling fans for industrial automation racks and control panels with optimal airflow',
                url: 'auto/fans.html',
                tags: ['industrial automation', 'cooling fans', 'airflow', 'thermal management', 'ventilation', 'rack cooling']
            },
            {
                index: 97,
                id: 'shelves',
                name: 'Industrial Rack Shelves',
                description: '1U cantilever trays and shelves for industrial automation equipment mounting and support',
                url: 'auto/shelves.html',
                tags: ['industrial automation', 'shelves', 'cantilever trays', 'equipment mounting', 'rack accessories']
            },
            {
                index: 98,
                id: 'blanking-panels',
                name: 'Industrial Blanking Panels',
                description: 'Airflow management blanking panels for industrial automation racks and control cabinets',
                url: 'auto/blanking-panels.html',
                tags: ['industrial automation', 'blanking panels', 'airflow management', 'rack accessories', 'thermal control']
            },
            {
                index: 99,
                id: 'bus-bars',
                name: 'Industrial Bus Bars',
                description: 'Power distribution bus bars for industrial automation systems and electrical panels',
                url: 'auto/bus-bars.html',
                tags: ['industrial automation', 'bus bars', 'power distribution', 'electrical components', 'power management']
            },
            {
                index: 100,
                id: 'brush-panels',
                name: 'Industrial Brush Panels',
                description: 'Cable management brush panels for industrial automation racks and control systems',
                url: 'auto/brush-panels.html',
                tags: ['industrial automation', 'brush panels', 'cable management', 'wire protection', 'rack accessories']
            },
            {
                index: 101,
                id: 'lacing-bars',
                name: 'Industrial Lacing Bars',
                description: 'Cable lacing bars for organized cable management in industrial automation installations',
                url: 'auto/lacing-bars.html',
                tags: ['industrial automation', 'lacing bars', 'cable management', 'wire organization', 'cable routing']
            },
            {
                index: 102,
                id: 'earthing-cable',
                name: 'Industrial Earthing Cable',
                description: 'Electrical safety earthing cables for proper grounding in industrial automation systems',
                url: 'auto/earthing-cable.html',
                tags: ['industrial automation', 'earthing cable', 'electrical safety', 'grounding', 'safety equipment']
            },
            // Industrial Automation Cable Management
            {
                index: 103,
                id: 'horizontal-cable-management',
                name: 'Horizontal Cable Management',
                description: 'Efficient horizontal cable management solutions for industrial automation racks and panels',
                url: 'auto/horizontal-cable-management.html',
                tags: ['industrial automation', 'horizontal cable management', 'cable routing', 'wire management', 'rack accessories']
            },
            {
                index: 104,
                id: 'vertical-cable-management',
                name: 'Vertical Cable Management',
                description: 'Organized vertical cable management systems for industrial automation installations',
                url: 'auto/vertical-cable-management.html',
                tags: ['industrial automation', 'vertical cable management', 'cable organization', 'wire routing', 'space optimization']
            },
            {
                index: 105,
                id: 'cable-organizers',
                name: 'Industrial Cable Organizers',
                description: 'Professional cable organizers for neat and organized industrial automation installations',
                url: 'auto/cable-organizers.html',
                tags: ['industrial automation', 'cable organizers', 'wire management', 'cable organization', 'professional installation']
            },
            // Industrial Automation PDUs & Power
            {
                index: 106,
                id: 'pdu-horizontal-indian-power',
                name: 'PDU Single Phase Horizontal Indian Power',
                description: 'Industrial horizontal rack-mounted PDU with Indian power outlets for automation systems',
                url: 'auto/pdu-horizontal-indian-power.html',
                tags: ['industrial automation', 'PDU', 'horizontal', 'indian power', 'power distribution', 'single phase']
            },
            {
                index: 107,
                id: 'pdu-horizontal-universal',
                name: 'PDU Single Phase Horizontal Universal',
                description: 'Versatile horizontal PDU with universal power outlets for industrial automation equipment',
                url: 'auto/pdu-horizontal-universal.html',
                tags: ['industrial automation', 'PDU', 'horizontal', 'universal power', 'power distribution', 'single phase']
            },
            {
                index: 108,
                id: 'pdu-vertical-indian-power',
                name: 'PDU Single Phase Vertical Indian Power',
                description: 'Space-efficient vertical PDU with Indian power outlets for industrial automation racks',
                url: 'auto/pdu-vertical-indian-power.html',
                tags: ['industrial automation', 'PDU', 'vertical', 'indian power', 'power distribution', 'single phase', 'space-efficient']
            },
            {
                index: 109,
                id: 'pdu-vertical-universal',
                name: 'PDU Single Phase Vertical Universal',
                description: 'Space-efficient vertical PDU with universal power outlets for automation systems',
                url: 'auto/pdu-vertical-universal.html',
                tags: ['industrial automation', 'PDU', 'vertical', 'universal power', 'power distribution', 'single phase', 'space-efficient']
            },
            {
                index: 110,
                id: 'pdu-three-phase-horizontal',
                name: 'PDU Three Phase Horizontal',
                description: 'High-capacity three-phase horizontal PDU for demanding industrial automation applications',
                url: 'auto/pdu-three-phase-horizontal.html',
                tags: ['industrial automation', 'PDU', 'three phase', 'horizontal', 'high-capacity', 'power distribution', 'industrial']
            },
            {
                index: 111,
                id: 'pdu-three-phase-vertical',
                name: 'PDU Three Phase Vertical',
                description: 'Space-efficient three-phase vertical PDU for high-capacity power distribution in automation',
                url: 'auto/pdu-three-phase-vertical.html',
                tags: ['industrial automation', 'PDU', 'three phase', 'vertical', 'high-capacity', 'power distribution', 'space-efficient']
            }
        ];
        
        this.init();
    }

    init() {
        this.setupSearchInterface();
        this.setupEventListeners();
        this.handleInitialSearch();
    }

    setupSearchInterface() {
        // Create search modal
        const searchModal = document.createElement('div');
        searchModal.id = 'search-modal';
        searchModal.className = 'fixed inset-0 bg-black bg-opacity-60 z-50 hidden items-center justify-center p-4 backdrop-blur-sm';
        searchModal.innerHTML = `
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[85vh] overflow-hidden transform transition-all duration-300 scale-95 opacity-0" id="search-modal-content">
                <div class="bg-gradient-to-r from-blue-50 to-indigo-100 p-6 border-b border-gray-100">
                    <div class="flex items-center justify-between mb-4">
                        <div class="flex items-center space-x-3">
                            <div class="w-10 h-10 rounded-full flex items-center justify-center" style="background-color: #3A46A5;">
                                <i class="fas fa-search text-white text-lg"></i>
                            </div>
                            <h2 class="text-2xl font-bold text-gray-900">Search Products</h2>
                        </div>
                        <button id="close-search" class="w-10 h-10 rounded-full bg-white shadow-md hover:shadow-lg text-gray-500 hover:text-gray-700 transition-all duration-200 flex items-center justify-center">
                            <i class="fas fa-times text-lg"></i>
                        </button>
                    </div>
                    <div class="relative">
                        <input type="text" id="search-input" placeholder="Search for racks, enclosures, panels..." 
                               class="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:border-transparent text-lg bg-white shadow-sm transition-all duration-200" 
                               style="focus:ring-color: #3A46A5;">
                        <i class="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg"></i>
                        <div class="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-gray-400 bg-gray-100 px-2 py-1 rounded-md">
                            Ctrl+K
                        </div>
                    </div>
                </div>
                <div id="search-results" class="p-6 max-h-96 overflow-y-auto">
                    <div class="text-center py-12">
                        <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center">
                            <i class="fas fa-search text-2xl" style="color: #3A46A5;"></i>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-700 mb-2">Start Your Search</h3>
                        <p class="text-gray-500">Type to find racks, enclosures, panels, and more industrial solutions</p>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(searchModal);
    }

    setupEventListeners() {
        // Search button listeners
        const searchButton = document.getElementById('search-button');
        const mobileSearchButton = document.getElementById('mobile-search-button');
        const searchModal = document.getElementById('search-modal');
        const closeSearch = document.getElementById('close-search');
        const searchInput = document.getElementById('search-input');

        if (searchButton) {
            searchButton.addEventListener('click', () => this.openSearchModal());
        }

        if (mobileSearchButton) {
            mobileSearchButton.addEventListener('click', () => this.openSearchModal());
        }

        if (closeSearch) {
            closeSearch.addEventListener('click', () => this.closeSearchModal());
        }

        if (searchModal) {
            searchModal.addEventListener('click', (e) => {
                if (e.target === searchModal) this.closeSearchModal();
            });
        }

        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
            searchInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') this.closeSearchModal();
            });
        }

        // Keyboard shortcut
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                this.openSearchModal();
            }
        });
    }

    openSearchModal() {
        const modal = document.getElementById('search-modal');
        const modalContent = document.getElementById('search-modal-content');
        const input = document.getElementById('search-input');
        if (modal && input && modalContent) {
            modal.classList.remove('hidden');
            modal.classList.add('flex');
            // Trigger animation
            setTimeout(() => {
                modalContent.classList.remove('scale-95', 'opacity-0');
                modalContent.classList.add('scale-100', 'opacity-100');
            }, 10);
            input.focus();
        }
    }

    closeSearchModal() {
        const modal = document.getElementById('search-modal');
        const modalContent = document.getElementById('search-modal-content');
        if (modal && modalContent) {
            modalContent.classList.remove('scale-100', 'opacity-100');
            modalContent.classList.add('scale-95', 'opacity-0');
            setTimeout(() => {
                modal.classList.add('hidden');
                modal.classList.remove('flex');
            }, 200);
        }
    }

    handleSearch(query) {
        clearTimeout(this.debounceTimer);
        this.debounceTimer = setTimeout(() => {
            this.performSearch(query);
        }, 300);
    }

    performSearch(query) {
        this.currentQuery = query.trim().toLowerCase();
        
        if (!this.currentQuery) {
            this.displayResults([]);
            return;
        }

        // Check cache first
        if (this.searchCache.has(this.currentQuery)) {
            this.displayResults(this.searchCache.get(this.currentQuery));
            return;
        }

        // Perform search
        const results = this.searchProducts(this.currentQuery);
        this.searchCache.set(this.currentQuery, results);
        this.displayResults(results);
    }

    searchProducts(query) {
        const queryWords = query.toLowerCase().split(' ').filter(word => word.length > 0);
        
        return this.productDatabase
            .map(product => {
                let score = 0;
                const searchText = `${product.name} ${product.description} ${product.tags.join(' ')}`.toLowerCase();
                
                // Exact name match gets highest score
                if (product.name.toLowerCase().includes(query)) {
                    score += 100;
                }
                
                // Description match
                if (product.description.toLowerCase().includes(query)) {
                    score += 50;
                }
                
                // Tag matches
                product.tags.forEach(tag => {
                    if (tag.toLowerCase().includes(query)) {
                        score += 30;
                    }
                });
                
                // Word-based scoring
                queryWords.forEach(word => {
                    if (searchText.includes(word)) {
                        score += 10;
                    }
                });
                
                return { ...product, score, index: product.index };
            })
            .filter(product => product.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 20); // Limit to top 20 results
    }

    // Get product by index for quick access
    getProductByIndex(index) {
        return this.productDatabase.find(product => product.index === index);
    }

    // Get total number of indexed products
    getTotalProducts() {
        return this.productDatabase.length;
    }

    displayResults(results) {
        const resultsContainer = document.getElementById('search-results');
        if (!resultsContainer) return;

        if (results.length === 0) {
            resultsContainer.innerHTML = `
                <div class="text-center py-12">
                    <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-red-100 to-orange-200 flex items-center justify-center">
                        <i class="fas fa-search-minus text-2xl text-red-500"></i>
                    </div>
                    <h3 class="text-lg font-semibold text-gray-700 mb-2">No Results Found</h3>
                    <p class="text-gray-500 mb-6">Can't find what you're looking for? Let us know what you need!</p>
                    
                    <div class="max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                        <h4 class="text-md font-semibold text-gray-800 mb-4">Request This Product</h4>
                        <div class="space-y-4">
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Product you're looking for:</label>
                                <input type="text" id="request-product-name" 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                       placeholder="Enter product name or description" 
                                       value="${this.currentQuery || ''}">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Your email (optional):</label>
                                <input type="email" id="request-email" 
                                       class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                       placeholder="your.email@example.com">
                            </div>
                            <div>
                                <label class="block text-sm font-medium text-gray-700 mb-2">Additional details (optional):</label>
                                <textarea id="request-details" rows="3"
                                          class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                                          placeholder="Specifications, quantity, or any other requirements..."></textarea>
                            </div>
                            <button onclick="searchInterface.submitProductRequest()" 
                                    class="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                                <i class="fas fa-paper-plane mr-2"></i>
                                Submit Request
                            </button>
                        </div>
                        <p class="text-xs text-gray-500 mt-4 text-center">
                            We'll review your request and get back to you with availability and pricing information.
                        </p>
                    </div>
                    
                    <div class="mt-6">
                        <p class="text-sm text-gray-600 mb-3">Or try these suggestions:</p>
                        <div class="flex flex-wrap justify-center gap-2">
                            <button onclick="searchInterface.handleSearch('server rack')" 
                                    class="px-3 py-1 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm rounded-full transition-colors">
                                Server Racks
                            </button>
                            <button onclick="searchInterface.handleSearch('network cabinet')" 
                                    class="px-3 py-1 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm rounded-full transition-colors">
                                Network Cabinets
                            </button>
                            <button onclick="searchInterface.handleSearch('power distribution')" 
                                    class="px-3 py-1 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm rounded-full transition-colors">
                                Power Distribution
                            </button>
                            <button onclick="searchInterface.handleSearch('cooling systems')" 
                                    class="px-3 py-1 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 text-sm rounded-full transition-colors">
                                Cooling Systems
                            </button>
                        </div>
                    </div>
                </div>
            `;
            return;
        }

        const resultsHTML = results.map(result => `
            <div class="group bg-white border border-gray-200 rounded-xl p-5 mb-4 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer transform hover:-translate-y-1" 
                 data-product-id="${result.id}" 
                 data-product-index="${result.index}"
                 onclick="window.location.href='${result.url}'">
                <div class="flex items-start justify-between">
                    <div class="flex-1">
                        <div class="flex items-center space-x-3 mb-3">
                            <div class="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style="background-color: #3A46A5;">
                                ${result.index}
                            </div>
                            <h3 class="text-lg font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                                ${result.name}
                            </h3>
                        </div>
                        <p class="text-gray-600 mb-3 leading-relaxed">
                            ${result.description}
                        </p>
                        <div class="flex flex-wrap gap-2">
                            ${result.tags.slice(0, 4).map(tag => `
                                <span class="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                    ${tag}
                                </span>
                            `).join('')}
                            ${result.tags.length > 4 ? `
                                <span class="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
                                    +${result.tags.length - 4} more
                                </span>
                            ` : ''}
                        </div>
                    </div>
                    <div class="ml-4 flex flex-col items-end space-y-2">
                        <div class="w-10 h-10 rounded-full bg-gray-100 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
                            <i class="fas fa-arrow-right text-gray-400 group-hover:text-blue-500 transition-colors"></i>
                        </div>
                        <div class="text-xs text-gray-400 bg-gray-50 px-2 py-1 rounded-md">
                            ID: ${result.index}
                        </div>
                    </div>
                </div>
            </div>
        `).join('');

        resultsContainer.innerHTML = `
            <div class="mb-4 pb-4 border-b border-gray-200">
                <div class="flex items-center justify-between">
                    <h4 class="text-lg font-semibold text-gray-800">
                        Found ${results.length} product${results.length !== 1 ? 's' : ''}
                    </h4>
                    <div class="text-sm text-gray-500">
                        Click any result to view details
                    </div>
                </div>
            </div>
            ${resultsHTML}
        `;
    }

    handleInitialSearch() {
        const urlParams = new URLSearchParams(window.location.search);
        const searchQuery = urlParams.get('search');
        
        if (searchQuery && this.isSearchResultsPage) {
            this.performSearch(searchQuery);
            this.displayProductsPageResults();
        }
    }

    displayProductsPageResults() {
        if (!this.isSearchResultsPage) return;
        
        // Hide all product cards initially
        const productCards = document.querySelectorAll('.product-card');
        productCards.forEach(card => card.style.display = 'none');
        
        // Show matching products
        this.currentResults.forEach(result => {
            const matchingCards = document.querySelectorAll(`[data-product-name*="${result.name.toLowerCase()}"]`);
            matchingCards.forEach(card => card.style.display = 'block');
        });
        
        // Show no results message if needed
        if (this.currentResults.length === 0) {
            this.showNoResultsMessage();
        } else {
            this.hideNoResultsMessage();
        }
    }

    showNoResultsMessage() {
        let noResultsDiv = document.getElementById('no-results-message');
        if (!noResultsDiv) {
            noResultsDiv = document.createElement('div');
            noResultsDiv.id = 'no-results-message';
            noResultsDiv.className = 'text-center py-12';
            noResultsDiv.innerHTML = `
                <i class="fas fa-search text-6xl text-gray-300 mb-4"></i>
                <h3 class="text-xl font-semibold text-gray-600 mb-2">No Products Found</h3>
                <p class="text-gray-500">Try adjusting your search terms or browse our categories.</p>
            `;
            
            const productsContainer = document.querySelector('.grid');
            if (productsContainer) {
                productsContainer.parentNode.insertBefore(noResultsDiv, productsContainer);
            }
        }
        noResultsDiv.style.display = 'block';
    }

    hideNoResultsMessage() {
        const noResultsDiv = document.getElementById('no-results-message');
        if (noResultsDiv) {
            noResultsDiv.style.display = 'none';
        }
    }

    submitProductRequest() {
        const productName = document.getElementById('request-product-name')?.value?.trim();
        const email = document.getElementById('request-email')?.value?.trim();
        const details = document.getElementById('request-details')?.value?.trim();

        if (!productName) {
            alert('Please enter the product you\'re looking for.');
            return;
        }

        // Create the request data
        const requestData = {
            product: productName,
            email: email || 'Not provided',
            details: details || 'No additional details',
            timestamp: new Date().toISOString(),
            searchQuery: this.currentQuery || productName
        };

        // For now, we'll show a success message and optionally send via email
        // In a real implementation, this would be sent to your backend
        const subject = encodeURIComponent(`Product Request: ${productName}`);
        const body = encodeURIComponent(`
Hello,

I would like to request information about the following product:

Product: ${productName}
${email ? `Contact Email: ${email}` : ''}
${details ? `Additional Details: ${details}` : ''}

Original Search Query: ${this.currentQuery || productName}
Request Time: ${new Date().toLocaleString()}

Please provide availability and pricing information.

Thank you!
        `);

        // Show success message
        const resultsContainer = document.getElementById('search-results');
        resultsContainer.innerHTML = `
            <div class="text-center py-12">
                <div class="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-green-100 to-emerald-200 flex items-center justify-center">
                    <i class="fas fa-check text-2xl text-green-600"></i>
                </div>
                <h3 class="text-lg font-semibold text-gray-700 mb-2">Request Submitted!</h3>
                <p class="text-gray-600 mb-6">Thank you for your product request. We'll review it and get back to you soon.</p>
                
                <div class="max-w-md mx-auto bg-white border border-gray-200 rounded-xl p-6 shadow-sm mb-6">
                    <h4 class="text-md font-semibold text-gray-800 mb-3">Your Request Details:</h4>
                    <div class="text-left space-y-2 text-sm">
                        <div><span class="font-medium text-gray-700">Product:</span> <span class="text-gray-600">${productName}</span></div>
                        ${email ? `<div><span class="font-medium text-gray-700">Email:</span> <span class="text-gray-600">${email}</span></div>` : ''}
                        ${details ? `<div><span class="font-medium text-gray-700">Details:</span> <span class="text-gray-600">${details}</span></div>` : ''}
                    </div>
                </div>

                <div class="space-y-3">
                    <a href="mailto:support@phedelco.com?subject=${subject}&body=${body}" 
                       class="inline-block bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg">
                        <i class="fas fa-envelope mr-2"></i>
                        Send via Email
                    </a>
                    
                    <a href="https://wa.me/919606943073?text=${encodeURIComponent(`Hi! I'm interested in: ${productName}${details ? ` - ${details}` : ''}`)}" 
                       target="_blank"
                       class="inline-block bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-md hover:shadow-lg ml-3">
                        <i class="fab fa-whatsapp mr-2"></i>
                        WhatsApp Us
                    </a>
                    
                    <div class="text-center">
                        <button onclick="searchInterface.clearSearch(); searchInterface.closeSearchModal();" 
                                class="text-gray-500 hover:text-gray-700 text-sm underline">
                            Continue Searching
                        </button>
                    </div>
                </div>
                
                <div class="mt-6 text-xs text-gray-500">
                    <p>You can also contact us directly:</p>
                    <p>Email: support@phedelco.com | WhatsApp: +91 96069 43073</p>
                </div>
            </div>
        `;
    }

    clearSearch() {
        document.getElementById('search-input').value = '';
        document.getElementById('search-results').innerHTML = '';
        this.currentQuery = '';
    }
}

// Initialize search system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.searchInterface = new UniversalSearchSystem();
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = UniversalSearchSystem;
}