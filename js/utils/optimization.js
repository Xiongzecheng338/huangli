const ResourceOptimizer = {
    preloadCriticalResources() {
        const criticalResources = [
            'css/main.css'
        ];
        
        criticalResources.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'style';
            link.href = src;
            document.head.appendChild(link);
        });
    },

    deferNonCriticalScripts() {
        document.addEventListener('DOMContentLoaded', () => {
            PerformanceOptimizer.requestIdleCallback(() => {
                this.loadAdditionalModules();
            });
        });
    },

    loadAdditionalModules() {
        const modules = [
            'js/modules/bazi-module.js',
            'js/modules/checkin-module.js',
            'js/modules/fortune-module.js'
        ];
        
        modules.forEach(src => {
            const script = document.createElement('script');
            script.src = src;
            document.body.appendChild(script);
        });
    },

    optimizeImages() {
        const images = document.querySelectorAll('img[data-src]');
        PerformanceOptimizer.lazyLoad('img[data-src]', {
            rootMargin: '50px',
            threshold: 0.01
        });
    },

    minifyCSS() {
        console.log('CSS 已优化：生产环境建议使用构建工具进行 CSS 压缩');
    },

    enableServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                    console.log('ServiceWorker 注册成功:', registration.scope);
                }).catch(err => {
                    console.log('ServiceWorker 注册失败:', err);
                });
            });
        }
    },

    addMetaTags() {
        const metas = [
            { name: 'description', content: '天机黄历 - 传承千年国学智慧，提供每日运势、黄历宜忌、八字算命、风水方位等传统文化服务' },
            { name: 'keywords', content: '黄历，运势，八字，风水，国学，周易，占卜，算命，宜忌，农历' },
            { name: 'author', content: '天机团队' },
            { property: 'og:title', content: '天机黄历 - 洞察天机，顺应天命' },
            { property: 'og:description', content: '传承千年国学智慧，趋吉避凶通玄宝典' },
            { property: 'og:type', content: 'website' }
        ];
        
        metas.forEach(meta => {
            const tag = document.createElement('meta');
            if (meta.name) tag.name = meta.name;
            if (meta.property) tag.property = meta.property;
            tag.content = meta.content;
            document.head.appendChild(tag);
        });
    },

    init() {
        this.preloadCriticalResources();
        this.addMetaTags();
        this.optimizeImages();
        
        if (window.location.protocol === 'https:') {
            this.enableServiceWorker();
        }
    }
};

const AnalyticsManager = {
    trackPageView() {
        const eventData = {
            page: window.location.pathname,
            timestamp: Date.now(),
            userAgent: navigator.userAgent,
            screen: `${window.screen.width}x${window.screen.height}`
        };
        
        console.log('页面访问:', eventData);
    },

    trackEvent(category, action, label) {
        const eventData = {
            category: category,
            action: action,
            label: label,
            timestamp: Date.now()
        };
        
        console.log('事件追踪:', eventData);
        
        const user = UserManager.getUserData();
        if (user) {
            const events = CacheManager.get('user_events') || [];
            events.push(eventData);
            if (events.length > 100) {
                events.shift();
            }
            CacheManager.set('user_events', events, 86400000);
        }
    },

    trackModuleOpen(moduleName) {
        this.trackEvent('module', 'open', moduleName);
    },

    trackCheckIn(success, streak) {
        this.trackEvent('checkin', success ? 'success' : 'failed', `streak:${streak}`);
    },

    trackFortuneView(type, score) {
        this.trackEvent('fortune', 'view', `${type}:${score}`);
    },

    init() {
        this.trackPageView();
        
        const originalOpenModule = window.openModule;
        window.openModule = function(moduleName) {
            AnalyticsManager.trackModuleOpen(moduleName);
            if (originalOpenModule) {
                originalOpenModule.call(this, moduleName);
            }
        };
    }
};

window.addEventListener('load', () => {
    ResourceOptimizer.init();
    AnalyticsManager.init();
});
