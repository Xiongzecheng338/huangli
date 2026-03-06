/**
 * 设置中心模块
 * 提供用户界面进行应用配置
 * @module SettingsModule
 */

const SettingsModule = {
    /**
     * 初始化设置中心
     */
    init() {
        this.renderSettings();
        this.bindEvents();
    },
    
    /**
     * 渲染设置界面
     */
    renderSettings() {
        const container = document.getElementById('modalContent');
        if (!container) return;
        
        const config = ConfigManager.config;
        
        container.innerHTML = `
            <div class="settings-container">
                <!-- 设置头部 -->
                <div class="settings-header">
                    <h2 class="settings-title">
                        <i class="fas fa-cog"></i> 应用设置
                    </h2>
                    <p class="settings-desc">个性化定制您的使用体验</p>
                </div>
                
                <!-- 设置分类导航 -->
                <div class="settings-nav">
                    <button class="nav-btn active" data-category="appearance">
                        <i class="fas fa-palette"></i> 外观
                    </button>
                    <button class="nav-btn" data-category="sound">
                        <i class="fas fa-volume-up"></i> 声音
                    </button>
                    <button class="nav-btn" data-category="performance">
                        <i class="fas fa-tachometer-alt"></i> 性能
                    </button>
                    <button class="nav-btn" data-category="privacy">
                        <i class="fas fa-shield-alt"></i> 隐私
                    </button>
                    <button class="nav-btn" data-category="data">
                        <i class="fas fa-database"></i> 数据
                    </button>
                </div>
                
                <!-- 设置内容区 -->
                <div class="settings-content">
                    <!-- 外观设置 -->
                    <div class="settings-category active" data-category="appearance">
                        <h3 class="category-title">外观设置</h3>
                        
                        <!-- 主题选择 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-paint-brush"></i> 主题风格
                                </div>
                                <div class="setting-desc">选择您喜欢的界面主题</div>
                            </div>
                            <div class="theme-options">
                                ${ConfigManager.getThemeOptions().map(theme => `
                                    <button class="theme-option ${config.theme === theme.value ? 'active' : ''}" 
                                            data-theme="${theme.value}">
                                        <i class="fas ${theme.icon}"></i>
                                        <span>${theme.label}</span>
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- 字体大小 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-text-height"></i> 字体大小
                                </div>
                                <div class="setting-desc">调整文字显示大小</div>
                            </div>
                            <div class="font-size-options">
                                ${ConfigManager.getFontSizeOptions().map(opt => `
                                    <button class="font-option ${config.fontSize === opt.value ? 'active' : ''}" 
                                            data-size="${opt.value}">
                                        ${opt.label}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <!-- 动画开关 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-film"></i> 动画效果
                                </div>
                                <div class="setting-desc">开启或关闭界面动画</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" ${config.animationsEnabled ? 'checked' : ''} 
                                       id="animationsToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        
                        <!-- 减少动态效果 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-wheelchair"></i> 减少动态效果
                                </div>
                                <div class="setting-desc">减少动画和动态效果，降低眩晕感</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" ${config.reduceMotion ? 'checked' : ''} 
                                       id="reduceMotionToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- 声音设置 -->
                    <div class="settings-category" data-category="sound">
                        <h3 class="category-title">声音设置</h3>
                        
                        <!-- 音效开关 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-volume-mute"></i> 启用音效
                                </div>
                                <div class="setting-desc">开启或关闭应用音效</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" ${config.soundEnabled ? 'checked' : ''} 
                                       id="soundToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        
                        <!-- 音量调节 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-volume-up"></i> 音量大小
                                </div>
                                <div class="setting-desc">调整音效播放音量</div>
                            </div>
                            <div class="volume-control">
                                <i class="fas fa-volume-down"></i>
                                <input type="range" min="0" max="100" 
                                       value="${config.soundVolume * 100}" 
                                       class="volume-slider" id="volumeSlider">
                                <i class="fas fa-volume-up"></i>
                            </div>
                        </div>
                    </div>
                    
                    <!-- 性能设置 -->
                    <div class="settings-category" data-category="performance">
                        <h3 class="category-title">性能设置</h3>
                        
                        <!-- 懒加载 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-bolt"></i> 懒加载
                                </div>
                                <div class="setting-desc">按需加载内容，提升初始加载速度</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" ${config.enableLazyLoad ? 'checked' : ''} 
                                       id="lazyLoadToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        
                        <!-- 缓存 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-hdd"></i> 启用缓存
                                </div>
                                <div class="setting-desc">缓存数据以提升访问速度</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" ${config.enableCache ? 'checked' : ''} 
                                       id="cacheToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        
                        <!-- 缓存清理 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-trash"></i> 清理缓存
                                </div>
                                <div class="setting-desc">清除缓存数据，释放存储空间</div>
                            </div>
                            <button class="action-btn" id="clearCacheBtn">
                                <i class="fas fa-trash"></i> 清理缓存
                            </button>
                        </div>
                    </div>
                    
                    <!-- 隐私设置 -->
                    <div class="settings-category" data-category="privacy">
                        <h3 class="category-title">隐私设置</h3>
                        
                        <!-- 数据分析 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-chart-bar"></i> 数据分析
                                </div>
                                <div class="setting-desc">允许收集匿名使用数据以改进产品</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" ${config.enableAnalytics ? 'checked' : ''} 
                                       id="analyticsToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                        
                        <!-- 错误报告 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-bug"></i> 错误报告
                                </div>
                                <div class="setting-desc">自动发送错误报告以帮助修复问题</div>
                            </div>
                            <label class="toggle-switch">
                                <input type="checkbox" ${config.enableErrorReporting ? 'checked' : ''} 
                                       id="errorReportingToggle">
                                <span class="toggle-slider"></span>
                            </label>
                        </div>
                    </div>
                    
                    <!-- 数据管理 -->
                    <div class="settings-category" data-category="data">
                        <h3 class="category-title">数据管理</h3>
                        
                        <!-- 导出配置 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-download"></i> 导出配置
                                </div>
                                <div class="setting-desc">导出当前配置到文件</div>
                            </div>
                            <button class="action-btn" id="exportConfigBtn">
                                <i class="fas fa-download"></i> 导出配置
                            </button>
                        </div>
                        
                        <!-- 导入配置 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-upload"></i> 导入配置
                                </div>
                                <div class="setting-desc">从文件导入配置</div>
                            </div>
                            <label class="action-btn">
                                <i class="fas fa-upload"></i> 导入配置
                                <input type="file" accept=".json" id="importConfigInput" style="display: none;">
                            </label>
                        </div>
                        
                        <!-- 重置配置 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-undo"></i> 重置配置
                                </div>
                                <div class="setting-desc">恢复所有设置为默认值</div>
                            </div>
                            <button class="action-btn danger" id="resetConfigBtn">
                                <i class="fas fa-undo"></i> 重置配置
                            </button>
                        </div>
                        
                        <!-- 清空所有数据 -->
                        <div class="setting-item">
                            <div class="setting-info">
                                <div class="setting-label">
                                    <i class="fas fa-trash-alt"></i> 清空所有数据
                                </div>
                                <div class="setting-desc">清除所有本地存储数据（不可恢复）</div>
                            </div>
                            <button class="action-btn danger" id="clearAllDataBtn">
                                <i class="fas fa-trash-alt"></i> 清空所有数据
                            </button>
                        </div>
                    </div>
                </div>
                
                <!-- 设置底部 -->
                <div class="settings-footer">
                    <div class="version-info">
                        <span>天机黄历 v2.0</span>
                        <span class="build-info">Build 2026.03.06</span>
                    </div>
                    <button class="save-btn" id="saveSettingsBtn">
                        <i class="fas fa-check"></i> 保存设置
                    </button>
                </div>
            </div>
        `;
        
        this.applySettingsStyles();
    },
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 分类导航切换
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                
                // 更新导航状态
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // 更新内容显示
                document.querySelectorAll('.settings-category').forEach(c => c.classList.remove('active'));
                document.querySelector(`[data-category="${category}"]`).classList.add('active');
            });
        });
        
        // 主题选择
        document.querySelectorAll('.theme-option').forEach(opt => {
            opt.addEventListener('click', () => {
                document.querySelectorAll('.theme-option').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                ConfigManager.set('theme', opt.dataset.theme);
            });
        });
        
        // 字体大小
        document.querySelectorAll('.font-option').forEach(opt => {
            opt.addEventListener('click', () => {
                document.querySelectorAll('.font-option').forEach(o => o.classList.remove('active'));
                opt.classList.add('active');
                ConfigManager.set('fontSize', opt.dataset.size);
            });
        });
        
        // 动画开关
        document.getElementById('animationsToggle')?.addEventListener('change', (e) => {
            ConfigManager.set('animationsEnabled', e.target.checked);
        });
        
        // 减少动态效果
        document.getElementById('reduceMotionToggle')?.addEventListener('change', (e) => {
            ConfigManager.set('reduceMotion', e.target.checked);
        });
        
        // 音效开关
        document.getElementById('soundToggle')?.addEventListener('change', (e) => {
            ConfigManager.set('soundEnabled', e.target.checked);
        });
        
        // 音量调节
        document.getElementById('volumeSlider')?.addEventListener('input', (e) => {
            ConfigManager.set('soundVolume', e.target.value / 100, false);
        });
        
        // 懒加载
        document.getElementById('lazyLoadToggle')?.addEventListener('change', (e) => {
            ConfigManager.set('enableLazyLoad', e.target.checked);
        });
        
        // 缓存开关
        document.getElementById('cacheToggle')?.addEventListener('change', (e) => {
            ConfigManager.set('enableCache', e.target.checked);
        });
        
        // 数据分析
        document.getElementById('analyticsToggle')?.addEventListener('change', (e) => {
            ConfigManager.set('enableAnalytics', e.target.checked);
        });
        
        // 错误报告
        document.getElementById('errorReportingToggle')?.addEventListener('change', (e) => {
            ConfigManager.set('enableErrorReporting', e.target.checked);
        });
        
        // 清理缓存
        document.getElementById('clearCacheBtn')?.addEventListener('click', () => {
            this.clearCache();
        });
        
        // 导出配置
        document.getElementById('exportConfigBtn')?.addEventListener('click', () => {
            ConfigManager.exportConfig();
        });
        
        // 导入配置
        document.getElementById('importConfigInput')?.addEventListener('change', async (e) => {
            const file = e.target.files[0];
            if (file) {
                try {
                    await ConfigManager.importConfig(file);
                    if (window.ToastUtils) {
                        ToastUtils.show('配置导入成功', 'success');
                    }
                    this.renderSettings();
                } catch (error) {
                    if (window.ToastUtils) {
                        ToastUtils.show('配置导入失败：' + error.message, 'error');
                    }
                }
            }
        });
        
        // 重置配置
        document.getElementById('resetConfigBtn')?.addEventListener('click', () => {
            if (confirm('确定要重置所有设置吗？')) {
                ConfigManager.reset();
                if (window.ToastUtils) {
                    ToastUtils.show('配置已重置', 'success');
                }
                this.renderSettings();
            }
        });
        
        // 清空所有数据
        document.getElementById('clearAllDataBtn')?.addEventListener('click', () => {
            if (confirm('确定要清空所有数据吗？此操作不可恢复！')) {
                localStorage.clear();
                if (window.ToastUtils) {
                    ToastUtils.show('所有数据已清空，请刷新页面', 'success');
                }
                setTimeout(() => location.reload(), 1500);
            }
        });
        
        // 保存设置
        document.getElementById('saveSettingsBtn')?.addEventListener('click', () => {
            ConfigManager.saveConfig();
            if (window.ToastUtils) {
                ToastUtils.show('设置已保存', 'success');
            }
        });
    },
    
    /**
     * 清理缓存
     */
    clearCache() {
        const keys = Object.keys(localStorage);
        let cleared = 0;
        
        keys.forEach(key => {
            if (key.startsWith('tianji_cache')) {
                localStorage.removeItem(key);
                cleared++;
            }
        });
        
        if (window.ToastUtils) {
            ToastUtils.show(`已清理 ${cleared} 项缓存`, 'success');
        }
    },
    
    /**
     * 应用设置样式
     */
    applySettingsStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .settings-container {
                padding: 20px;
                max-width: 900px;
                margin: 0 auto;
            }
            
            .settings-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .settings-title {
                font-size: 28px;
                color: #D4AF37;
                margin-bottom: 10px;
            }
            
            .settings-desc {
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
            }
            
            .settings-nav {
                display: flex;
                gap: 10px;
                margin-bottom: 20px;
                border-bottom: 1px solid rgba(212, 175, 55, 0.3);
                padding-bottom: 15px;
                overflow-x: auto;
            }
            
            .nav-btn {
                padding: 10px 20px;
                background: rgba(212, 175, 55, 0.1);
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 8px;
                color: rgba(255, 255, 255, 0.7);
                white-space: nowrap;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .nav-btn:hover {
                background: rgba(212, 175, 55, 0.2);
                color: #D4AF37;
            }
            
            .nav-btn.active {
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(196, 30, 58, 0.2));
                border-color: #D4AF37;
                color: #D4AF37;
            }
            
            .settings-content {
                margin-bottom: 20px;
            }
            
            .settings-category {
                display: none;
            }
            
            .settings-category.active {
                display: block;
            }
            
            .category-title {
                font-size: 20px;
                color: #D4AF37;
                margin-bottom: 20px;
            }
            
            .setting-item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                margin-bottom: 15px;
            }
            
            .setting-info {
                flex: 1;
            }
            
            .setting-label {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 5px;
            }
            
            .setting-desc {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
            }
            
            .theme-options, .font-size-options {
                display: flex;
                gap: 10px;
            }
            
            .theme-option, .font-option {
                padding: 10px 20px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.2);
                border-radius: 8px;
                color: rgba(255, 255, 255, 0.7);
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .theme-option:hover, .font-option:hover {
                background: rgba(212, 175, 55, 0.2);
                border-color: rgba(212, 175, 55, 0.5);
            }
            
            .theme-option.active, .font-option.active {
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(196, 30, 58, 0.3));
                border-color: #D4AF37;
                color: #D4AF37;
            }
            
            .toggle-switch {
                position: relative;
                display: inline-block;
                width: 60px;
                height: 30px;
            }
            
            .toggle-switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }
            
            .toggle-slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 30px;
                transition: 0.3s;
            }
            
            .toggle-slider:before {
                position: absolute;
                content: "";
                height: 24px;
                width: 24px;
                left: 3px;
                bottom: 3px;
                background: white;
                border-radius: 50%;
                transition: 0.3s;
            }
            
            .toggle-switch input:checked + .toggle-slider {
                background: linear-gradient(135deg, #D4AF37, #B8860B);
            }
            
            .toggle-switch input:checked + .toggle-slider:before {
                transform: translateX(30px);
            }
            
            .volume-control {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .volume-slider {
                width: 200px;
                height: 6px;
                -webkit-appearance: none;
                background: rgba(255, 255, 255, 0.2);
                border-radius: 3px;
                outline: none;
            }
            
            .volume-slider::-webkit-slider-thumb {
                -webkit-appearance: none;
                width: 18px;
                height: 18px;
                background: #D4AF37;
                border-radius: 50%;
                cursor: pointer;
            }
            
            .action-btn {
                padding: 10px 20px;
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(196, 30, 58, 0.2));
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 8px;
                color: #D4AF37;
                cursor: pointer;
                transition: all 0.3s;
                position: relative;
                overflow: hidden;
            }
            
            .action-btn:hover {
                background: rgba(212, 175, 55, 0.3);
                transform: translateY(-2px);
            }
            
            .action-btn.danger {
                background: linear-gradient(135deg, rgba(244, 67, 54, 0.2), rgba(198, 40, 40, 0.2));
                border-color: rgba(244, 67, 54, 0.3);
                color: #F44336;
            }
            
            .action-btn.danger:hover {
                background: rgba(244, 67, 54, 0.3);
            }
            
            .settings-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 20px;
                border-top: 1px solid rgba(212, 175, 55, 0.3);
            }
            
            .version-info {
                display: flex;
                flex-direction: column;
                gap: 5px;
            }
            
            .version-info span {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
            }
            
            .build-info {
                color: rgba(255, 255, 255, 0.3) !important;
            }
            
            .save-btn {
                padding: 12px 30px;
                background: linear-gradient(135deg, #D4AF37, #B8860B);
                border: none;
                border-radius: 8px;
                color: white;
                font-size: 16px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .save-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
            }
            
            @media (max-width: 768px) {
                .setting-item {
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 15px;
                }
                
                .settings-nav {
                    gap: 5px;
                }
                
                .nav-btn {
                    padding: 8px 12px;
                    font-size: 13px;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// 导出模块
if (typeof window !== 'undefined') {
    window.SettingsModule = SettingsModule;
}
