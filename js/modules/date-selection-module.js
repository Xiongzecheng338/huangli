/**
 * 择吉日模块 - 完整功能实现
 * 包含：事件类型选择、吉日推荐、宜忌分析
 */

const DateSelectionModule = {
    // 事件类型定义
    eventTypes: [
        { id: 'wedding', name: '嫁娶', icon: 'fa-heart', color: '#E91E63' },
        { id: 'travel', name: '出行', icon: 'fa-plane', color: '#2196F3' },
        { id: 'business', name: '开业', icon: 'fa-store', color: '#4CAF50' },
        { id: 'move', name: '入宅', icon: 'fa-home', color: '#FF9800' },
        { id: 'construction', name: '动土', icon: 'fa-trowel', color: '#795548' },
        { id: 'sacrifice', name: '祭祀', icon: 'fa-pray', color: '#9C27B0' },
        { id: 'cut', name: '剃头', icon: 'fa-scissors', color: '#607D8B' },
        { id: 'doctor', name: '求医', icon: 'fa-user-md', color: '#00BCD4' }
    ],
    
    // 当前选择的事件类型
    selectedEventType: null,
    
    // 月份数据
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    
    /**
     * 初始化模块
     */
    init() {
        this.renderInterface();
        this.bindEvents();
    },
    
    /**
     * 渲染界面
     */
    renderInterface() {
        const container = document.getElementById('modalContent');
        if (!container) return;
        
        container.innerHTML = `
            <div class="date-selection-container">
                <!-- 头部 -->
                <div class="selection-header">
                    <h2 class="selection-title">
                        <i class="fas fa-calendar-check"></i> 择吉日
                    </h2>
                    <p class="selection-desc">选择事件类型，获取吉日推荐</p>
                </div>
                
                <!-- 事件类型选择 -->
                <div class="event-types">
                    ${this.eventTypes.map(type => `
                        <div class="event-type-card" data-type="${type.id}">
                            <div class="event-icon" style="background: ${type.color}">
                                <i class="fas ${type.icon}"></i>
                            </div>
                            <div class="event-name">${type.name}</div>
                        </div>
                    `).join('')}
                </div>
                
                <!-- 时间选择器 -->
                <div class="time-selector hidden" id="timeSelector">
                    <div class="selector-header">
                        <button class="selector-btn" id="prevMonthBtn">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <h3 class="selector-title" id="currentMonthDisplay">
                            ${this.currentYear}年${this.currentMonth}月
                        </h3>
                        <button class="selector-btn" id="nextMonthBtn">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
                
                <!-- 吉日推荐 -->
                <div class="auspicious-days hidden" id="auspiciousDays">
                    <h3 class="days-title">
                        <i class="fas fa-star"></i> 吉日推荐
                    </h3>
                    <div class="days-grid" id="daysGrid"></div>
                </div>
                
                <!-- 详情面板 -->
                <div class="selection-detail hidden" id="selectionDetail">
                    <div class="detail-card">
                        <div class="detail-header">
                            <h3 id="detailTitle"></h3>
                            <button class="close-btn" id="closeDetail">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>
                        <div class="detail-body" id="detailBody"></div>
                    </div>
                </div>
            </div>
        `;
        
        this.applyStyles();
    },
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 事件类型选择
        document.querySelectorAll('.event-type-card').forEach(card => {
            card.addEventListener('click', () => {
                const typeId = card.dataset.type;
                this.selectEventType(typeId);
            });
        });
        
        // 月份切换
        document.getElementById('prevMonthBtn')?.addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 1) {
                this.currentMonth = 12;
                this.currentYear--;
            }
            this.updateMonthDisplay();
            this.generateAuspiciousDays();
        });
        
        document.getElementById('nextMonthBtn')?.addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 12) {
                this.currentMonth = 1;
                this.currentYear++;
            }
            this.updateMonthDisplay();
            this.generateAuspiciousDays();
        });
        
        // 关闭详情
        document.getElementById('closeDetail')?.addEventListener('click', () => {
            document.getElementById('selectionDetail').classList.add('hidden');
        });
    },
    
    /**
     * 选择事件类型
     */
    selectEventType(typeId) {
        // 移除其他选中状态
        document.querySelectorAll('.event-type-card').forEach(card => {
            card.classList.remove('selected');
        });
        
        // 选中当前
        document.querySelector(`[data-type="${typeId}"]`).classList.add('selected');
        this.selectedEventType = typeId;
        
        // 显示时间选择器和吉日推荐
        document.getElementById('timeSelector').classList.remove('hidden');
        document.getElementById('auspiciousDays').classList.remove('hidden');
        
        // 生成吉日
        this.generateAuspiciousDays();
    },
    
    /**
     * 更新月份显示
     */
    updateMonthDisplay() {
        document.getElementById('currentMonthDisplay').textContent = 
            `${this.currentYear}年${this.currentMonth}月`;
    },
    
    /**
     * 生成吉日推荐
     */
    generateAuspiciousDays() {
        const grid = document.getElementById('daysGrid');
        if (!grid) return;
        
        const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
        const auspiciousDays = [];
        
        // 根据事件类型生成吉日
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, this.currentMonth - 1, day);
            const info = this.calculateDayInfo(date, this.selectedEventType);
            
            if (info.score >= 80) {
                auspiciousDays.push({
                    day,
                    date,
                    ...info
                });
            }
        }
        
        // 渲染吉日
        if (auspiciousDays.length === 0) {
            grid.innerHTML = '<div class="no-days">本月暂无吉日，请切换月份</div>';
        } else {
            grid.innerHTML = auspiciousDays.map(d => `
                <div class="auspicious-day-card score-${Math.floor(d.score / 10)}" 
                     data-day="${d.day}" data-score="${d.score}">
                    <div class="day-number">${d.day}</div>
                    <div class="day-score">
                        <i class="fas fa-star"></i> ${d.score}
                    </div>
                    <div class="day-ganzhi">${d.ganZhi}</div>
                    <div class="day-reason">${d.reason}</div>
                </div>
            `).join('');
            
            // 绑定点击事件
            grid.querySelectorAll('.auspicious-day-card').forEach(card => {
                card.addEventListener('click', () => {
                    const day = parseInt(card.dataset.day);
                    const date = new Date(this.currentYear, this.currentMonth - 1, day);
                    this.showDayDetail(date, card.dataset.score);
                });
            });
        }
    },
    
    /**
     * 计算日期信息
     */
    calculateDayInfo(date, eventType) {
        const dayOfWeek = date.getDay();
        const day = date.getDate();
        const ganzhi = this.getDayGanZhi(date);
        
        // 基础分数（避开凶日）
        let score = 70;
        
        // 避开三煞日、月破日等
        if (day === 5 || day === 14 || day === 23) {
            score -= 30; // 月煞日
        }
        
        // 周末加分
        if (dayOfWeek === 0 || dayOfWeek === 6) {
            score += 5;
        }
        
        // 根据事件类型调整
        const eventBonuses = {
            'wedding': { good: [2, 8, 16, 28], bad: [3, 7, 13, 19] },
            'travel': { good: [1, 6, 11, 16, 21, 26], bad: [4, 14, 24] },
            'business': { good: [8, 18, 28], bad: [5, 15, 25] },
            'move': { good: [6, 12, 18, 24], bad: [1, 11, 21] },
            'construction': { good: [3, 9, 15, 21, 27], bad: [6, 16, 26] },
            'sacrifice': { good: [1, 15], bad: [5, 10, 20] },
            'cut': { good: [7, 17, 27], bad: [2, 12, 22] },
            'doctor': { good: [4, 14, 24], bad: [8, 18, 28] }
        };
        
        const bonus = eventBonuses[eventType];
        if (bonus) {
            if (bonus.good.includes(day)) {
                score += 20;
            }
            if (bonus.bad.includes(day)) {
                score -= 20;
            }
        }
        
        // 确保分数在合理范围
        score = Math.max(30, Math.min(100, score));
        
        // 生成理由
        const reasons = this.generateReason(score, eventType, ganzhi);
        
        return {
            score,
            ganZhi: ganzhi,
            reason: reasons,
            yi: this.generateYi(eventType, score),
            ji: this.generateJi(score),
            shichen: this.generateShichen(score)
        };
    },
    
    /**
     * 生成理由
     */
    generateReason(score, eventType, ganzhi) {
        const event = this.eventTypes.find(e => e.id === eventType);
        const eventName = event ? eventName : '事宜';
        
        if (score >= 90) {
            return `大吉之日，${ganzhi}相合，特别适合${eventName}`;
        } else if (score >= 80) {
            return `吉日，${ganzhi}相生，适宜${eventName}`;
        } else if (score >= 70) {
            return `平日，可酌情进行${eventName}`;
        } else {
            return `凶日，不建议${eventName}`;
        }
    },
    
    /**
     * 生成宜
     */
    generateYi(eventType, score) {
        if (score < 60) return '';
        
        const yis = {
            'wedding': '嫁娶 订婚 会亲友',
            'travel': '出行 旅游 出差',
            'business': '开业 签约 交易',
            'move': '入宅 移徙 安床',
            'construction': '动土 修造 盖屋',
            'sacrifice': '祭祀 祈福 求嗣',
            'cut': '剃头 整容 修饰',
            'doctor': '求医 治病 养生'
        };
        
        return yis[eventType] || '宜';
    },
    
    /**
     * 生成忌
     */
    generateJi(score) {
        if (score >= 80) {
            return '忌动土 安葬';
        } else if (score >= 60) {
            return '忌远行 投资';
        } else {
            return '忌大事勿用';
        }
    },
    
    /**
     * 生成时辰吉凶
     */
    generateShichen(score) {
        const shichens = [
            { name: '子时', time: '23:00-01:00', level: score >= 80 ? '吉' : '凶' },
            { name: '丑时', time: '01:00-03:00', level: '平' },
            { name: '寅时', time: '03:00-05:00', level: score >= 70 ? '吉' : '凶' },
            { name: '卯时', time: '05:00-07:00', level: '吉' },
            { name: '辰时', time: '07:00-09:00', level: '吉' },
            { name: '巳时', time: '09:00-11:00', level: score >= 60 ? '吉' : '平' },
            { name: '午时', time: '11:00-13:00', level: '平' },
            { name: '未时', time: '13:00-15:00', level: '吉' },
            { name: '申时', time: '15:00-17:00', level: '吉' },
            { name: '酉时', time: '17:00-19:00', level: score >= 70 ? '吉' : '凶' },
            { name: '戌时', time: '19:00-21:00', level: '平' },
            { name: '亥时', time: '21:00-23:00', level: '凶' }
        ];
        
        return shichens.filter(s => s.level === '吉').slice(0, 3);
    },
    
    /**
     * 显示日期详情
     */
    showDayDetail(date, score) {
        const detail = document.getElementById('selectionDetail');
        const title = document.getElementById('detailTitle');
        const body = document.getElementById('detailBody');
        
        const info = this.calculateDayInfo(date, this.selectedEventType);
        const event = this.eventTypes.find(e => e.id === this.selectedEventType);
        
        title.innerHTML = `
            <span>${this.currentYear}年${this.currentMonth}月${date.getDate()}日</span>
            <span class="score-badge score-${Math.floor(score / 10)}">${score}分</span>
        `;
        
        body.innerHTML = `
            <div class="detail-section">
                <div class="section-label">干支</div>
                <div class="section-value">${info.ganZhi}</div>
            </div>
            
            <div class="detail-section">
                <div class="section-label">宜</div>
                <div class="section-value yi">${info.yi}</div>
            </div>
            
            <div class="detail-section">
                <div class="section-label">忌</div>
                <div class="section-value ji">${info.ji}</div>
            </div>
            
            <div class="detail-section">
                <div class="section-label">吉神方位</div>
                <div class="section-value">
                    财神：正东 | 喜神：正南 | 福神：东南
                </div>
            </div>
            
            <div class="detail-section">
                <div class="section-label">吉时推荐</div>
                <div class="shichen-list">
                    ${info.shichen.map(s => `
                        <span class="shichen-tag">${s.name} (${s.time})</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="detail-section">
                <div class="section-label">建议</div>
                <div class="section-value">${info.reason}</div>
            </div>
            
            <div class="detail-actions">
                <button class="action-btn" id="saveDayBtn">
                    <i class="fas fa-bookmark"></i> 保存此日
                </button>
                <button class="action-btn" id="shareDayBtn">
                    <i class="fas fa-share"></i> 分享
                </button>
            </div>
        `;
        
        detail.classList.remove('hidden');
        
        // 绑定保存和分享事件
        document.getElementById('saveDayBtn')?.addEventListener('click', () => {
            this.saveDate(date, info);
        });
        
        document.getElementById('shareDayBtn')?.addEventListener('click', () => {
            this.shareDate(date, info, event);
        });
    },
    
    /**
     * 保存日期
     */
    saveDate(date, info) {
        const saved = JSON.parse(localStorage.getItem('savedDates') || '[]');
        saved.push({
            date: date.toISOString(),
            eventType: this.selectedEventType,
            info
        });
        localStorage.setItem('savedDates', JSON.stringify(saved));
        
        // 显示提示
        if (window.ToastUtils) {
            ToastUtils.show('日期已保存', 'success');
        } else {
            alert('日期已保存');
        }
    },
    
    /**
     * 分享日期
     */
    shareDate(date, info, event) {
        const text = `【吉日推荐】${this.currentYear}年${this.currentMonth}月${date.getDate()}日\n` +
                     `事件：${event.name}\n` +
                     `评分：${info.score}分\n` +
                     `干支：${info.ganZhi}\n` +
                     `宜：${info.yi}\n` +
                     `推荐理由：${info.reason}`;
        
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(() => {
                if (window.ToastUtils) {
                    ToastUtils.show('已复制到剪贴板', 'success');
                }
            });
        } else {
            alert('请手动复制：\n' + text);
        }
    },
    
    /**
     * 获取月份天数
     */
    getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    },
    
    /**
     * 获取日期的干支
     */
    getDayGanZhi(date) {
        const baseDate = new Date(1900, 0, 1);
        const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
        const ganIndex = (diffDays + 10) % 10;
        const zhiIndex = (diffDays + 10) % 12;
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        return `${tianGan[ganIndex]}${diZhi[zhiIndex]}`;
    },
    
    /**
     * 应用样式
     */
    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .date-selection-container {
                padding: 20px;
                max-width: 1000px;
                margin: 0 auto;
            }
            
            .selection-header {
                text-align: center;
                margin-bottom: 30px;
            }
            
            .selection-title {
                font-size: 28px;
                color: #D4AF37;
                margin-bottom: 10px;
            }
            
            .selection-desc {
                color: rgba(255, 255, 255, 0.7);
                font-size: 14px;
            }
            
            .event-types {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
                gap: 15px;
                margin-bottom: 30px;
            }
            
            .event-type-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 15px;
                text-align: center;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .event-type-card:hover {
                background: rgba(212, 175, 55, 0.1);
                border-color: rgba(212, 175, 55, 0.3);
                transform: translateY(-3px);
            }
            
            .event-type-card.selected {
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(196, 30, 58, 0.2));
                border-color: #D4AF37;
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.3);
            }
            
            .event-icon {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 10px;
                font-size: 20px;
                color: white;
            }
            
            .event-name {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .selector-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(212, 175, 55, 0.1);
                border-radius: 12px;
            }
            
            .selector-btn {
                background: rgba(212, 175, 55, 0.2);
                border: 1px solid rgba(212, 175, 55, 0.3);
                color: #D4AF37;
                padding: 8px 15px;
                border-radius: 6px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .selector-btn:hover {
                background: rgba(212, 175, 55, 0.3);
            }
            
            .selector-title {
                font-size: 20px;
                color: #D4AF37;
            }
            
            .days-title {
                font-size: 20px;
                color: #D4AF37;
                margin-bottom: 15px;
            }
            
            .days-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                gap: 15px;
            }
            
            .auspicious-day-card {
                background: linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02));
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 12px;
                padding: 15px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .auspicious-day-card:hover {
                transform: translateY(-3px);
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.2);
            }
            
            .score-9 { border-left: 3px solid #4CAF50; }
            .score-8 { border-left: 3px solid #8BC34A; }
            .score-7 { border-left: 3px solid #FFC107; }
            .score-6 { border-left: 3px solid #FF9800; }
            .score-5 { border-left: 3px solid #FF5722; }
            
            .day-number {
                font-size: 24px;
                font-weight: bold;
                color: #D4AF37;
                margin-bottom: 5px;
            }
            
            .day-score {
                color: #FFD700;
                font-size: 14px;
                margin-bottom: 5px;
            }
            
            .day-ganzhi {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.6);
                margin-bottom: 8px;
            }
            
            .day-reason {
                font-size: 13px;
                color: rgba(255, 255, 255, 0.8);
                line-height: 1.5;
            }
            
            .no-days {
                text-align: center;
                padding: 40px;
                color: rgba(255, 255, 255, 0.5);
            }
            
            .detail-card {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 15px;
                padding: 20px;
            }
            
            .detail-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .detail-header h3 {
                font-size: 20px;
                color: #D4AF37;
            }
            
            .close-btn {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                font-size: 20px;
                cursor: pointer;
                padding: 5px;
            }
            
            .detail-body {
                display: flex;
                flex-direction: column;
                gap: 15px;
            }
            
            .detail-section {
                background: rgba(255, 255, 255, 0.03);
                padding: 15px;
                border-radius: 8px;
            }
            
            .section-label {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
                margin-bottom: 5px;
            }
            
            .section-value {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .section-value.yi {
                color: #4CAF50;
            }
            
            .section-value.ji {
                color: #F44336;
            }
            
            .shichen-list {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
            }
            
            .shichen-tag {
                background: rgba(212, 175, 55, 0.2);
                color: #D4AF37;
                padding: 5px 10px;
                border-radius: 4px;
                font-size: 12px;
            }
            
            .detail-actions {
                display: flex;
                gap: 10px;
                margin-top: 20px;
            }
            
            .action-btn {
                flex: 1;
                padding: 12px;
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.2), rgba(196, 30, 58, 0.2));
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 8px;
                color: #D4AF37;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .action-btn:hover {
                background: rgba(212, 175, 55, 0.3);
                transform: translateY(-2px);
            }
            
            .score-badge {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: bold;
                margin-left: 10px;
            }
            
            .score-badge.score-9 { background: #4CAF50; color: white; }
            .score-badge.score-8 { background: #8BC34A; color: white; }
            .score-badge.score-7 { background: #FFC107; color: black; }
            .score-badge.score-6 { background: #FF9800; color: white; }
            .score-badge.score-5 { background: #FF5722; color: white; }
            
            .hidden {
                display: none !important;
            }
        `;
        document.head.appendChild(style);
    }
};

// 导出模块
if (typeof window !== 'undefined') {
    window.DateSelectionModule = DateSelectionModule;
}
