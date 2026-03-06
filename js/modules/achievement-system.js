/**
 * 成就系统模块 - 用户等级、成就徽章、每日任务
 */

const AchievementSystem = {
    // 用户等级配置
    levels: [
        { level: 1, title: '初学者', exp: 0, icon: 'fa-seedling' },
        { level: 2, title: '爱好者', exp: 100, icon: 'fa-user' },
        { level: 3, title: '学习者', exp: 300, icon: 'fa-book-open' },
        { level: 4, title: '探索者', exp: 600, icon: 'fa-compass' },
        { level: 5, title: '实践者', exp: 1000, icon: 'fa-hands' },
        { level: 6, title: '精通者', exp: 1500, icon: 'fa-star' },
        { level: 7, title: '达人', exp: 2200, icon: 'fa-crown' },
        { level: 8, title: '大师', exp: 3000, icon: 'fa-dragon' },
        { level: 9, title: '宗师', exp: 4000, icon: 'fa-phoenix' },
        { level: 10, title: '天机传人', exp: 5000, icon: 'fa-gem' }
    ],
    
    // 成就徽章
    achievements: [
        {
            id: 'first_checkin',
            name: '初次见面',
            description: '完成首次签到',
            icon: 'fa-calendar-check',
            condition: () => this.getUserStats().totalCheckins >= 1,
            reward: 10
        },
        {
            id: 'continuous_7',
            name: '持之以恒',
            description: '连续签到 7 天',
            icon: 'fa-fire',
            condition: () => this.getUserStats().continuousCheckins >= 7,
            reward: 50
        },
        {
            id: 'continuous_30',
            name: '坚持不懈',
            description: '连续签到 30 天',
            icon: 'fa-medal',
            condition: () => this.getUserStats().continuousCheckins >= 30,
            reward: 200
        },
        {
            id: 'first_bazi',
            name: '命理初探',
            description: '首次使用八字算命',
            icon: 'fa-yin-yang',
            condition: () => this.getUserStats().baziCount >= 1,
            reward: 20
        },
        {
            id: 'bazi_master',
            name: '命理大师',
            description: '使用八字算命 50 次',
            icon: 'fa-crystal-ball',
            condition: () => this.getUserStats().baziCount >= 50,
            reward: 300
        },
        {
            id: 'first_name',
            name: '姓名奥秘',
            description: '首次使用姓名测算',
            icon: 'fa-signature',
            condition: () => this.getUserStats().nameCount >= 1,
            reward: 20
        },
        {
            id: 'fortune_collector',
            name: '运势收藏家',
            description: '记录 30 次运势',
            icon: 'fa-scroll',
            condition: () => this.getUserStats().fortuneCount >= 30,
            reward: 100
        },
        {
            id: 'dream_explorer',
            name: '解梦探索者',
            description: '使用周公解梦 20 次',
            icon: 'fa-moon',
            condition: () => this.getUserStats().dreamCount >= 20,
            reward: 80
        },
        {
            id: 'knowledge_seeker',
            name: '求知若渴',
            description: '浏览 100 个知识页面',
            icon: 'fa-library',
            condition: () => this.getUserStats().pageViews >= 100,
            reward: 150
        },
        {
            id: 'sharing_caring',
            name: '分享快乐',
            description: '分享 10 次',
            icon: 'fa-share-alt',
            condition: () => this.getUserStats().shares >= 10,
            reward: 100
        },
        {
            id: 'midnight_user',
            name: '夜猫子',
            description: '在子时（23:00-01:00）使用应用',
            icon: 'fa-owl',
            condition: () => {
                const hour = new Date().getHours();
                return hour >= 23 || hour < 1;
            },
            reward: 30
        },
        {
            id: 'early_bird',
            name: '早起鸟儿',
            description: '在卯时（05:00-07:00）使用应用',
            icon: 'fa-sun',
            condition: () => {
                const hour = new Date().getHours();
                return hour >= 5 && hour < 7;
            },
            reward: 30
        }
    ],
    
    // 每日任务
    dailyTasks: [
        {
            id: 'daily_checkin',
            name: '每日签到',
            description: '完成今日签到',
            exp: 10,
            check: () => this.isTodayChecked()
        },
        {
            id: 'daily_view',
            name: '浏览运势',
            description: '查看今日运势',
            exp: 5,
            check: () => this.getUserStats().todayViews >= 1
        },
        {
            id: 'daily_use',
            name: '功能体验',
            description: '使用任意功能 3 次',
            exp: 15,
            check: () => this.getUserStats().todayUsage >= 3
        },
        {
            id: 'daily_share',
            name: '分享传播',
            description: '分享一次内容',
            exp: 20,
            check: () => this.getUserStats().todayShares >= 1
        },
        {
            id: 'daily_learn',
            name: '学习知识',
            description: '浏览知识页面 5 个',
            exp: 15,
            check: () => this.getUserStats().todayPageViews >= 5
        }
    ],
    
    /**
     * 初始化成就系统
     */
    init() {
        this.loadUserData();
        this.checkAchievements();
        this.renderPanel();
    },
    
    /**
     * 加载用户数据
     */
    loadUserData() {
        const defaultData = {
            exp: 0,
            level: 1,
            totalCheckins: 0,
            continuousCheckins: 0,
            lastCheckin: null,
            baziCount: 0,
            nameCount: 0,
            fortuneCount: 0,
            dreamCount: 0,
            pageViews: 0,
            shares: 0,
            todayViews: 0,
            todayUsage: 0,
            todayShares: 0,
            todayPageViews: 0,
            achievements: [],
            completedTasks: [],
            lastTaskReset: this.getTodayString()
        };
        
        const saved = localStorage.getItem('userAchievements');
        this.userData = saved ? JSON.parse(saved) : defaultData;
        
        // 检查是否需要重置每日任务
        if (this.userData.lastTaskReset !== this.getTodayString()) {
            this.resetDailyTasks();
        }
        
        // 更新等级
        this.updateLevel();
    },
    
    /**
     * 保存用户数据
     */
    saveUserData() {
        localStorage.setItem('userAchievements', JSON.stringify(this.userData));
    },
    
    /**
     * 获取用户统计
     */
    getUserStats() {
        return this.userData;
    },
    
    /**
     * 更新等级
     */
    updateLevel() {
        const exp = this.userData.exp;
        let newLevel = 1;
        
        for (let i = this.levels.length - 1; i >= 0; i--) {
            if (exp >= this.levels[i].exp) {
                newLevel = i + 1;
                break;
            }
        }
        
        if (newLevel > this.userData.level) {
            const oldLevel = this.userData.level;
            this.userData.level = newLevel;
            this.showLevelUpNotification(oldLevel, newLevel);
        }
    },
    
    /**
     * 显示升级通知
     */
    showLevelUpNotification(oldLevel, newLevel) {
        const oldTitle = this.levels[oldLevel - 1].title;
        const newTitle = this.levels[newLevel - 1].title;
        
        // 创建通知
        const notification = document.createElement('div');
        notification.className = 'level-up-notification';
        notification.innerHTML = `
            <div class="level-up-content">
                <i class="fas fa-arrow-up"></i>
                <div class="level-text">等级提升</div>
                <div class="level-detail">
                    ${oldTitle} → ${newTitle}
                </div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    /**
     * 检查成就
     */
    checkAchievements() {
        let newAchievements = 0;
        
        this.achievements.forEach(achievement => {
            if (!this.userData.achievements.includes(achievement.id)) {
                try {
                    if (achievement.condition()) {
                        this.userData.achievements.push(achievement.id);
                        this.userData.exp += achievement.reward;
                        newAchievements++;
                        this.showAchievementUnlock(achievement);
                    }
                } catch (e) {
                    console.error('成就检查错误:', e);
                }
            }
        });
        
        if (newAchievements > 0) {
            this.updateLevel();
            this.saveUserData();
        }
    },
    
    /**
     * 显示成就解锁
     */
    showAchievementUnlock(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-unlock';
        notification.innerHTML = `
            <div class="achievement-content">
                <i class="fas ${achievement.icon}"></i>
                <div class="achievement-name">${achievement.name}</div>
                <div class="achievement-reward">+${achievement.reward} 经验</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.classList.add('show'), 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },
    
    /**
     * 渲染面板
     */
    renderPanel() {
        const container = document.getElementById('modalContent');
        if (!container) return;
        
        const currentLevel = this.levels[this.userData.level - 1];
        const nextLevel = this.levels[this.userData.level] || null;
        const progress = nextLevel 
            ? ((this.userData.exp - currentLevel.exp) / (nextLevel.exp - currentLevel.exp)) * 100 
            : 100;
        
        container.innerHTML = `
            <div class="achievement-container">
                <!-- 用户信息卡片 -->
                <div class="user-card">
                    <div class="user-avatar">
                        <i class="fas ${currentLevel.icon}"></i>
                    </div>
                    <div class="user-info">
                        <div class="user-level">Lv.${this.userData.level} ${currentLevel.title}</div>
                        <div class="user-exp">
                            <div class="exp-bar">
                                <div class="exp-fill" style="width: ${progress}%"></div>
                            </div>
                            <div class="exp-text">
                                ${this.userData.exp} / ${nextLevel ? nextLevel.exp : 'MAX'}
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 统计信息 -->
                <div class="stats-grid">
                    <div class="stat-card">
                        <div class="stat-value">${this.userData.totalCheckins}</div>
                        <div class="stat-label">总签到</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.userData.continuousCheckins}</div>
                        <div class="stat-label">连续签到</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.userData.baziCount}</div>
                        <div class="stat-label">八字算命</div>
                    </div>
                    <div class="stat-card">
                        <div class="stat-value">${this.userData.shares}</div>
                        <div class="stat-label">分享次数</div>
                    </div>
                </div>
                
                <!-- 成就徽章 -->
                <div class="achievements-section">
                    <h3 class="section-title">
                        <i class="fas fa-medal"></i> 成就徽章
                        <span class="achievement-count">
                            ${this.userData.achievements.length} / ${this.achievements.length}
                        </span>
                    </h3>
                    <div class="achievements-grid">
                        ${this.achievements.map(achievement => {
                            const unlocked = this.userData.achievements.includes(achievement.id);
                            return `
                                <div class="achievement-badge ${unlocked ? 'unlocked' : 'locked'}" 
                                     title="${achievement.name}: ${achievement.description}">
                                    <i class="fas ${achievement.icon}"></i>
                                    ${unlocked ? '<div class="unlock-dot"></div>' : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
                
                <!-- 每日任务 -->
                <div class="daily-tasks-section">
                    <h3 class="section-title">
                        <i class="fas fa-tasks"></i> 每日任务
                    </h3>
                    <div class="tasks-list">
                        ${this.dailyTasks.map(task => {
                            const completed = this.userData.completedTasks.includes(task.id);
                            return `
                                <div class="task-item ${completed ? 'completed' : ''}">
                                    <div class="task-info">
                                        <div class="task-name">${task.name}</div>
                                        <div class="task-desc">${task.description}</div>
                                    </div>
                                    <div class="task-reward">+${task.exp} EXP</div>
                                    ${completed 
                                        ? '<div class="task-status"><i class="fas fa-check-circle"></i></div>'
                                        : '<button class="task-claim" onclick="AchievementSystem.claimTask(\'' + task.id + '\')">领取</button>'
                                    }
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            </div>
        `;
        
        this.applyStyles();
    },
    
    /**
     * 领取任务奖励
     */
    claimTask(taskId) {
        const task = this.dailyTasks.find(t => t.id === taskId);
        if (!task) return;
        
        if (task.check() && !this.userData.completedTasks.includes(taskId)) {
            this.userData.completedTasks.push(taskId);
            this.userData.exp += task.exp;
            this.updateLevel();
            this.saveUserData();
            
            if (window.ToastUtils) {
                ToastUtils.show(`领取 ${task.name} 奖励：+${task.exp} 经验`, 'success');
            }
            
            this.renderPanel();
            this.checkAchievements();
        } else {
            if (window.ToastUtils) {
                ToastUtils.show('任务未完成或已领取', 'error');
            }
        }
    },
    
    /**
     * 检查每日任务
     */
    checkDailyTasks() {
        this.dailyTasks.forEach(task => {
            if (task.check() && !this.userData.completedTasks.includes(task.id)) {
                // 自动显示可领取状态
            }
        });
    },
    
    /**
     * 重置每日任务
     */
    resetDailyTasks() {
        this.userData.completedTasks = [];
        this.userData.todayViews = 0;
        this.userData.todayUsage = 0;
        this.userData.todayShares = 0;
        this.userData.todayPageViews = 0;
        this.userData.lastTaskReset = this.getTodayString();
        this.saveUserData();
    },
    
    /**
     * 获取今日字符串
     */
    getTodayString() {
        const now = new Date();
        return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`;
    },
    
    /**
     * 检查是否已签到
     */
    isTodayChecked() {
        return this.userData.lastCheckin === this.getTodayString();
    },
    
    /**
     * 记录签到
     */
    recordCheckin() {
        const today = this.getTodayString();
        
        if (this.userData.lastCheckin === today) {
            return false; // 今日已签到
        }
        
        // 检查是否连续
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = this.getTodayString.call({ getTodayString: () => 
            `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`
        });
        
        if (this.userData.lastCheckin === yesterdayStr) {
            this.userData.continuousCheckins++;
        } else {
            this.userData.continuousCheckins = 1;
        }
        
        this.userData.totalCheckins++;
        this.userData.lastCheckin = today;
        this.userData.exp += 10; // 签到基础经验
        
        this.saveUserData();
        this.updateLevel();
        this.checkAchievements();
        
        return true;
    },
    
    /**
     * 记录使用次数
     */
    recordUsage(type = 'general') {
        this.userData.pageViews++;
        this.userData.todayUsage++;
        this.userData.todayPageViews++;
        
        if (type === 'bazi') this.userData.baziCount++;
        if (type === 'name') this.userData.nameCount++;
        if (type === 'fortune') this.userData.fortuneCount++;
        if (type === 'dream') this.userData.dreamCount++;
        
        this.saveUserData();
        this.checkAchievements();
    },
    
    /**
     * 记录分享
     */
    recordShare() {
        this.userData.shares++;
        this.userData.todayShares++;
        this.saveUserData();
        this.checkAchievements();
    },
    
    /**
     * 应用样式
     */
    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .achievement-container {
                padding: 20px;
                max-width: 900px;
                margin: 0 auto;
            }
            
            .user-card {
                display: flex;
                align-items: center;
                gap: 20px;
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(196, 30, 58, 0.1));
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 15px;
                padding: 20px;
                margin-bottom: 20px;
            }
            
            .user-avatar {
                width: 80px;
                height: 80px;
                border-radius: 50%;
                background: linear-gradient(135deg, #D4AF37, #B8860B);
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 36px;
                color: white;
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
            }
            
            .user-info {
                flex: 1;
            }
            
            .user-level {
                font-size: 24px;
                font-weight: bold;
                color: #D4AF37;
                margin-bottom: 10px;
            }
            
            .user-exp {
                margin-top: 10px;
            }
            
            .exp-bar {
                height: 10px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 5px;
                overflow: hidden;
                margin-bottom: 5px;
            }
            
            .exp-fill {
                height: 100%;
                background: linear-gradient(90deg, #D4AF37, #FFD700);
                border-radius: 5px;
                transition: width 0.5s ease;
            }
            
            .exp-text {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.7);
            }
            
            .stats-grid {
                display: grid;
                grid-template-columns: repeat(4, 1fr);
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .stat-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 15px;
                text-align: center;
            }
            
            .stat-value {
                font-size: 28px;
                font-weight: bold;
                color: #D4AF37;
                margin-bottom: 5px;
            }
            
            .stat-label {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.6);
            }
            
            .section-title {
                font-size: 20px;
                color: #D4AF37;
                margin-bottom: 15px;
                display: flex;
                align-items: center;
                gap: 10px;
            }
            
            .achievement-count {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.5);
                margin-left: auto;
            }
            
            .achievements-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .achievement-badge {
                aspect-ratio: 1;
                border-radius: 12px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 32px;
                position: relative;
                transition: all 0.3s;
            }
            
            .achievement-badge.unlocked {
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(196, 30, 58, 0.2));
                border: 2px solid rgba(212, 175, 55, 0.5);
                color: #D4AF37;
            }
            
            .achievement-badge.locked {
                background: rgba(255, 255, 255, 0.05);
                border: 2px solid rgba(255, 255, 255, 0.1);
                color: rgba(255, 255, 255, 0.2);
            }
            
            .achievement-badge:hover {
                transform: scale(1.1);
            }
            
            .unlock-dot {
                position: absolute;
                bottom: 5px;
                right: 5px;
                width: 10px;
                height: 10px;
                background: #4CAF50;
                border-radius: 50%;
                border: 2px solid #1a1a2e;
            }
            
            .tasks-list {
                display: flex;
                flex-direction: column;
                gap: 10px;
            }
            
            .task-item {
                display: flex;
                align-items: center;
                gap: 15px;
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 15px;
                transition: all 0.3s;
            }
            
            .task-item.completed {
                opacity: 0.6;
            }
            
            .task-info {
                flex: 1;
            }
            
            .task-name {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.9);
                margin-bottom: 5px;
            }
            
            .task-desc {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
            }
            
            .task-reward {
                font-size: 14px;
                color: #FFD700;
                font-weight: bold;
            }
            
            .task-status {
                color: #4CAF50;
                font-size: 24px;
            }
            
            .task-claim {
                padding: 8px 16px;
                background: linear-gradient(135deg, #D4AF37, #B8860B);
                border: none;
                border-radius: 6px;
                color: white;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .task-claim:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 10px rgba(212, 175, 55, 0.4);
            }
            
            .level-up-notification, .achievement-unlock {
                position: fixed;
                top: 20px;
                right: 20px;
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border: 2px solid #D4AF37;
                border-radius: 15px;
                padding: 20px;
                z-index: 10000;
                opacity: 0;
                transform: translateX(100px);
                transition: all 0.3s;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }
            
            .level-up-notification.show, .achievement-unlock.show {
                opacity: 1;
                transform: translateX(0);
            }
            
            .level-up-content, .achievement-content {
                text-align: center;
            }
            
            .level-up-content i, .achievement-content i {
                font-size: 48px;
                color: #D4AF37;
                margin-bottom: 10px;
            }
            
            .level-text {
                font-size: 20px;
                color: #D4AF37;
                font-weight: bold;
            }
            
            .level-detail {
                font-size: 16px;
                color: rgba(255, 255, 255, 0.8);
                margin-top: 5px;
            }
            
            .achievement-name {
                font-size: 18px;
                color: #D4AF37;
                font-weight: bold;
            }
            
            .achievement-reward {
                font-size: 14px;
                color: #FFD700;
                margin-top: 5px;
            }
            
            @media (max-width: 768px) {
                .stats-grid {
                    grid-template-columns: repeat(2, 1fr);
                }
                
                .user-card {
                    flex-direction: column;
                    text-align: center;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// 导出模块
if (typeof window !== 'undefined') {
    window.AchievementSystem = AchievementSystem;
}
