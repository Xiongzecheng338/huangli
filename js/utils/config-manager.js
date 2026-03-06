/**
 * 配置管理模块
 * 统一管理应用配置、用户设置、主题切换等
 * @module ConfigManager
 */

const ConfigManager = {
    /**
     * 默认配置
     */
    defaults: {
        // 主题设置
        theme: 'dark', // 'dark' | 'light' | 'classic'
        primaryColor: '#D4AF37', // 主色调
        fontSize: 'medium', // 'small' | 'medium' | 'large'
        
        // 音效设置
        soundEnabled: true,
        soundVolume: 0.5,
        
        // 动画设置
        animationsEnabled: true,
        reduceMotion: false,
        
        // 性能设置
        enableLazyLoad: true,
        enableCache: true,
        maxCacheSize: 50, // MB
        
        // 通知设置
        enableNotifications: true,
        enableToast: true,
        
        // 隐私设置
        enableAnalytics: false,
        enableErrorReporting: true,
        
        // 语言设置
        language: 'zh-CN' // 'zh-CN' | 'zh-TW' | 'en'
    },
    
    /**
     * 当前配置
     */
    config: {},
    
    /**
     * 配置变更监听器
     */
    listeners: [],
    
    /**
     * 初始化配置管理器
     */
    init() {
        this.loadConfig();
        this.applyConfig();
        console.log('[ConfigManager] 初始化完成');
    },
    
    /**
     * 从 LocalStorage 加载配置
     */
    loadConfig() {
        try {
            const saved = localStorage.getItem('tianji_config');
            if (saved) {
                this.config = { ...this.defaults, ...JSON.parse(saved) };
            } else {
                this.config = { ...this.defaults };
            }
        } catch (error) {
            console.error('[ConfigManager] 加载配置失败:', error);
            this.config = { ...this.defaults };
        }
    },
    
    /**
     * 保存配置到 LocalStorage
     */
    saveConfig() {
        try {
            localStorage.setItem('tianji_config', JSON.stringify(this.config));
            this.notifyListeners();
        } catch (error) {
            console.error('[ConfigManager] 保存配置失败:', error);
        }
    },
    
    /**
     * 应用配置
     */
    applyConfig() {
        this.applyTheme();
        this.applyFontSize();
        this.applyAnimations();
        this.applyLanguage();
    },
    
    /**
     * 应用主题
     */
    applyTheme() {
        const body = document.body;
        const { theme, primaryColor } = this.config;
        
        // 移除所有主题类
        body.classList.remove('theme-dark', 'theme-light', 'theme-classic');
        
        // 添加当前主题类
        body.classList.add(`theme-${theme}`);
        
        // 设置主色调
        document.documentElement.style.setProperty('--primary-color', primaryColor);
        
        // 更新主题按钮图标
        const themeBtn = document.getElementById('themeToggle');
        if (themeBtn) {
            themeBtn.innerHTML = this.getThemeIcon(theme);
        }
    },
    
    /**
     * 获取主题图标
     */
    getThemeIcon(theme) {
        const icons = {
            'dark': '<i class="fas fa-moon"></i>',
            'light': '<i class="fas fa-sun"></i>',
            'classic': '<i class="fas fa-yin-yang"></i>'
        };
        return icons[theme] || icons['dark'];
    },
    
    /**
     * 应用字体大小
     */
    applyFontSize() {
        const { fontSize } = this.config;
        const sizes = {
            'small': '12px',
            'medium': '14px',
            'large': '16px'
        };
        
        document.documentElement.style.setProperty('--base-font-size', sizes[fontSize] || '14px');
    },
    
    /**
     * 应用动画设置
     */
    applyAnimations() {
        const { animationsEnabled, reduceMotion } = this.config;
        
        if (!animationsEnabled || reduceMotion) {
            document.body.classList.add('reduce-motion');
        } else {
            document.body.classList.remove('reduce-motion');
        }
    },
    
    /**
     * 应用语言设置
     */
    applyLanguage() {
        const { language } = this.config;
        document.documentElement.lang = language;
    },
    
    /**
     * 获取配置项
     */
    get(key) {
        return this.config[key];
    },
    
    /**
     * 设置配置项
     */
    set(key, value, save = true) {
        if (key in this.config) {
            this.config[key] = value;
            if (save) {
                this.saveConfig();
            }
            this.applyConfig();
        } else {
            console.warn(`[ConfigManager] 未知配置项：${key}`);
        }
    },
    
    /**
     * 批量设置配置项
     */
    setAll(configObj, save = true) {
        Object.keys(configObj).forEach(key => {
            if (key in this.config) {
                this.config[key] = configObj[key];
            }
        });
        if (save) {
            this.saveConfig();
        }
        this.applyConfig();
    },
    
    /**
     * 重置为默认配置
     */
    reset() {
        this.config = { ...this.defaults };
        this.saveConfig();
        this.applyConfig();
    },
    
    /**
     * 添加配置变更监听器
     */
    addListener(callback) {
        if (typeof callback === 'function' && !this.listeners.includes(callback)) {
            this.listeners.push(callback);
        }
    },
    
    /**
     * 移除配置变更监听器
     */
    removeListener(callback) {
        const index = this.listeners.indexOf(callback);
        if (index > -1) {
            this.listeners.splice(index, 1);
        }
    },
    
    /**
     * 通知所有监听器
     */
    notifyListeners() {
        this.listeners.forEach(callback => {
            try {
                callback(this.config);
            } catch (error) {
                console.error('[ConfigManager] 监听器执行失败:', error);
            }
        });
    },
    
    /**
     * 导出配置
     */
    exportConfig() {
        const dataStr = JSON.stringify(this.config, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `tianji-config-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    },
    
    /**
     * 导入配置
     */
    importConfig(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                try {
                    const imported = JSON.parse(e.target.result);
                    this.setAll(imported);
                    resolve(imported);
                } catch (error) {
                    reject(new Error('配置文件格式错误'));
                }
            };
            reader.onerror = () => reject(new Error('读取文件失败'));
            reader.readAsText(file);
        });
    },
    
    /**
     * 获取主题配置选项
     */
    getThemeOptions() {
        return [
            { value: 'dark', label: '深色主题', icon: 'fa-moon' },
            { value: 'light', label: '浅色主题', icon: 'fa-sun' },
            { value: 'classic', label: '经典主题', icon: 'fa-yin-yang' }
        ];
    },
    
    /**
     * 获取字体大小选项
     */
    getFontSizeOptions() {
        return [
            { value: 'small', label: '小', size: '12px' },
            { value: 'medium', label: '中', size: '14px' },
            { value: 'large', label: '大', size: '16px' }
        ];
    },
    
    /**
     * 获取语言选项
     */
    getLanguageOptions() {
        return [
            { value: 'zh-CN', label: '简体中文' },
            { value: 'zh-TW', label: '繁體中文' },
            { value: 'en', label: 'English' }
        ];
    }
};

// 导出模块
if (typeof window !== 'undefined') {
    window.ConfigManager = ConfigManager;
}
