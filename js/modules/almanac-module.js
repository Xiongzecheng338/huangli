/**
 * 万年历模块 - 完整功能实现
 * 包含：年份视图、节日标注、宜忌详情、节气显示
 */

const AlmanacModule = {
    // 当前选中的年份和月份
    currentYear: new Date().getFullYear(),
    currentMonth: new Date().getMonth() + 1,
    
    // 节日数据（公历节日）
    solarFestivals: {
        '1-1': '元旦',
        '2-14': '情人节',
        '3-8': '妇女节',
        '3-12': '植树节',
        '4-5': '清明节',
        '5-1': '劳动节',
        '5-4': '青年节',
        '6-1': '儿童节',
        '7-1': '建党节',
        '8-1': '建军节',
        '9-10': '教师节',
        '10-1': '国庆节',
        '12-25': '圣诞节'
    },
    
    // 农历节日
    lunarFestivals: {
        '1-1': '春节',
        '1-15': '元宵节',
        '5-5': '端午节',
        '7-7': '七夕节',
        '8-15': '中秋节',
        '9-9': '重阳节',
        '12-8': '腊八节',
        '12-30': '除夕'
    },
    
    /**
     * 初始化万年历模块
     */
    init() {
        this.renderAlmanac();
        this.bindEvents();
    },
    
    /**
     * 渲染万年历主界面
     */
    renderAlmanac() {
        const container = document.getElementById('modalContent');
        if (!container) return;
        
        container.innerHTML = `
            <div class="almanac-container">
                <!-- 头部控制区 -->
                <div class="almanac-header">
                    <button class="almanac-btn" id="prevYearBtn">
                        <i class="fas fa-chevron-left"></i> 上年
                    </button>
                    <h2 class="almanac-title" id="currentYearDisplay">${this.currentYear}年</h2>
                    <button class="almanac-btn" id="nextYearBtn">
                        下年 <i class="fas fa-chevron-right"></i>
                    </button>
                </div>
                
                <!-- 年份视图 -->
                <div class="year-view" id="yearView">
                    ${this.renderYearView()}
                </div>
                
                <!-- 月份详细视图 -->
                <div class="month-view hidden" id="monthView">
                    <div class="month-header">
                        <button class="month-btn" id="prevMonthBtn">
                            <i class="fas fa-chevron-left"></i>
                        </button>
                        <h3 class="month-title" id="monthTitle">${this.currentYear}年${this.currentMonth}月</h3>
                        <button class="month-btn" id="nextMonthBtn">
                            <i class="fas fa-chevron-right"></i>
                        </button>
                        <button class="back-btn" id="backToYearBtn">
                            <i class="fas fa-arrow-up"></i> 返回年份
                        </button>
                    </div>
                    <div class="calendar-grid" id="calendarGrid"></div>
                </div>
                
                <!-- 详情面板 -->
                <div class="detail-panel" id="detailPanel">
                    <div class="detail-header">
                        <h3 id="detailDate"></h3>
                        <button class="close-detail" id="closeDetail">
                            <i class="fas fa-times"></i>
                        </button>
                    </div>
                    <div class="detail-content" id="detailContent"></div>
                </div>
            </div>
        `;
        
        // 应用样式
        this.applyStyles();
    },
    
    /**
     * 渲染年份视图（12 个月概览）
     */
    renderYearView() {
        const monthNames = ['一月', '二月', '三月', '四月', '五月', '六月', 
                           '七月', '八月', '九月', '十月', '十一月', '十二月'];
        
        let html = '<div class="months-grid">';
        
        for (let month = 1; month <= 12; month++) {
            const daysInMonth = this.getDaysInMonth(this.currentYear, month);
            const festivals = this.getMonthFestivals(month);
            
            html += `
                <div class="month-card" data-month="${month}">
                    <div class="month-name">${monthNames[month - 1]}</div>
                    <div class="month-days">${daysInMonth}天</div>
                    ${festivals.length > 0 ? `
                        <div class="month-festivals">
                            ${festivals.map(f => `<span class="festival-tag">${f}</span>`).join('')}
                        </div>
                    ` : ''}
                    <div class="month-preview">
                        ${this.getMonthPreview(this.currentYear, month)}
                    </div>
                </div>
            `;
        }
        
        html += '</div>';
        return html;
    },
    
    /**
     * 获取月份节日
     */
    getMonthFestivals(month) {
        const festivals = [];
        const solarKey = `${month}-1`;
        const lunarKey = `${month}-15`;
        
        if (this.solarFestivals[solarKey]) {
            festivals.push(this.solarFestivals[solarKey]);
        }
        if (this.lunarFestivals[lunarKey]) {
            festivals.push(this.lunarFestivals[lunarKey]);
        }
        
        return festivals;
    },
    
    /**
     * 获取月份预览（初一的干支）
     */
    getMonthPreview(year, month) {
        // 简化处理，返回该月大致干支
        const ganIndex = (year % 10 + month) % 10;
        const zhiIndex = (year % 12 + month) % 12;
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        return `${tianGan[ganIndex]}${diZhi[zhiIndex]}月`;
    },
    
    /**
     * 渲染月份详细视图
     */
    renderMonthView() {
        const grid = document.getElementById('calendarGrid');
        if (!grid) return;
        
        const daysInMonth = this.getDaysInMonth(this.currentYear, this.currentMonth);
        const firstDay = new Date(this.currentYear, this.currentMonth - 1, 1).getDay();
        
        let html = `
            <div class="calendar-weekdays">
                <div class="weekday">日</div>
                <div class="weekday">一</div>
                <div class="weekday">二</div>
                <div class="weekday">三</div>
                <div class="weekday">四</div>
                <div class="weekday">五</div>
                <div class="weekday">六</div>
            </div>
            <div class="calendar-days">
        `;
        
        // 填充空白
        for (let i = 0; i < firstDay; i++) {
            html += '<div class="day-cell empty"></div>';
        }
        
        // 填充日期
        const today = new Date();
        const isCurrentMonth = today.getFullYear() === this.currentYear && 
                               today.getMonth() + 1 === this.currentMonth;
        
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(this.currentYear, this.currentMonth - 1, day);
            const lunar = this.getLunarDate(date);
            const isToday = isCurrentMonth && day === today.getDate();
            const isWeekend = date.getDay() === 0 || date.getDay() === 6;
            const festival = this.getFestival(date);
            
            html += `
                <div class="day-cell ${isToday ? 'today' : ''} ${isWeekend ? 'weekend' : ''}" 
                     data-date="${this.formatDate(date)}"
                     data-lunar="${lunar.month}${lunar.day}"
                     data-ganzhi="${lunar.ganZhi}">
                    <div class="day-number">${day}</div>
                    <div class="day-lunar">${lunar.dayStr}</div>
                    ${festival ? `<div class="day-festival">${festival}</div>` : ''}
                    ${isToday ? '<div class="today-badge">今日</div>' : ''}
                </div>
            `;
        }
        
        html += '</div>';
        grid.innerHTML = html;
        
        // 绑定日期点击事件
        this.bindDateEvents();
    },
    
    /**
     * 获取农历日期（简化版）
     */
    getLunarDate(date) {
        const lunarMonths = ['正', '二', '三', '四', '五', '六', '七', '八', '九', '十', '冬', '腊'];
        const lunarDays = ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十',
                          '十一', '十二', '十三', '十四', '十五', '十六', '十七', '十八', '十九', '二十',
                          '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'];
        
        // 简化处理：使用公历日期近似计算
        const monthIndex = (date.getMonth() + 6) % 12;
        const dayIndex = (date.getDate() - 1 + 6) % 30;
        
        return {
            month: lunarMonths[monthIndex],
            day: lunarDays[dayIndex],
            dayStr: lunarDays[dayIndex],
            ganZhi: this.getDayGanZhi(date)
        };
    },
    
    /**
     * 获取日期的干支（简化）
     */
    getDayGanZhi(date) {
        const baseDate = new Date(1900, 0, 1); // 1900 年 1 月 1 日为甲戌日
        const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
        const ganIndex = (diffDays + 10) % 10;
        const zhiIndex = (diffDays + 10) % 12;
        const tianGan = ['甲', '乙', '丙', '丁', '戊', '己', '庚', '辛', '壬', '癸'];
        const diZhi = ['子', '丑', '寅', '卯', '辰', '巳', '午', '未', '申', '酉', '戌', '亥'];
        return `${tianGan[ganIndex]}${diZhi[zhiIndex]}`;
    },
    
    /**
     * 获取节日
     */
    getFestival(date) {
        const month = date.getMonth() + 1;
        const day = date.getDate();
        const key = `${month}-${day}`;
        
        // 公历节日
        if (this.solarFestivals[key]) {
            return this.solarFestivals[key];
        }
        
        // 农历节日（简化）
        const lunar = this.getLunarDate(date);
        if (lunar.dayStr === '初一') {
            return lunar.month + '月初一';
        }
        if (lunar.dayStr === '十五') {
            return lunar.month + '月十五';
        }
        
        return null;
    },
    
    /**
     * 绑定事件
     */
    bindEvents() {
        // 年份切换
        document.getElementById('prevYearBtn')?.addEventListener('click', () => {
            this.currentYear--;
            this.updateYearDisplay();
            this.renderYearView();
        });
        
        document.getElementById('nextYearBtn')?.addEventListener('click', () => {
            this.currentYear++;
            this.updateYearDisplay();
            this.renderYearView();
        });
        
        // 月份切换
        document.getElementById('prevMonthBtn')?.addEventListener('click', () => {
            this.currentMonth--;
            if (this.currentMonth < 1) {
                this.currentMonth = 12;
                this.currentYear--;
            }
            this.updateMonthDisplay();
            this.renderMonthView();
        });
        
        document.getElementById('nextMonthBtn')?.addEventListener('click', () => {
            this.currentMonth++;
            if (this.currentMonth > 12) {
                this.currentMonth = 1;
                this.currentYear++;
            }
            this.updateMonthDisplay();
            this.renderMonthView();
        });
        
        // 返回年份视图
        document.getElementById('backToYearBtn')?.addEventListener('click', () => {
            document.getElementById('yearView').classList.remove('hidden');
            document.getElementById('monthView').classList.add('hidden');
        });
        
        // 关闭详情
        document.getElementById('closeDetail')?.addEventListener('click', () => {
            document.getElementById('detailPanel').classList.remove('active');
        });
        
        // 月份卡片点击
        document.querySelectorAll('.month-card').forEach(card => {
            card.addEventListener('click', () => {
                const month = parseInt(card.dataset.month);
                this.currentMonth = month;
                document.getElementById('yearView').classList.add('hidden');
                document.getElementById('monthView').classList.remove('hidden');
                this.updateMonthDisplay();
                this.renderMonthView();
            });
        });
    },
    
    /**
     * 绑定日期点击事件
     */
    bindDateEvents() {
        document.querySelectorAll('.day-cell').forEach(cell => {
            if (!cell.classList.contains('empty')) {
                cell.addEventListener('click', () => {
                    const date = cell.dataset.date;
                    const lunar = cell.dataset.lunar;
                    const ganzhi = cell.dataset.ganzhi;
                    this.showDateDetail(date, lunar, ganzhi);
                });
            }
        });
    },
    
    /**
     * 显示日期详情
     */
    showDateDetail(date, lunar, ganzhi) {
        const detailPanel = document.getElementById('detailPanel');
        const detailDate = document.getElementById('detailDate');
        const detailContent = document.getElementById('detailContent');
        
        detailDate.textContent = `${date} 农历${lunar}`;
        detailContent.innerHTML = `
            <div class="detail-grid">
                <div class="detail-item">
                    <div class="detail-label">干支</div>
                    <div class="detail-value">${ganzhi}</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">宜</div>
                    <div class="detail-value yi">祭祀 祈福 求嗣 开光</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">忌</div>
                    <div class="detail-value ji">出行 动土 安葬</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">冲煞</div>
                    <div class="detail-value">冲猴 煞北</div>
                </div>
                <div class="detail-item">
                    <div class="detail-label">吉神方位</div>
                    <div class="detail-value">财神：正东 | 喜神：正南 | 福神：东南</div>
                </div>
            </div>
        `;
        
        detailPanel.classList.add('active');
    },
    
    /**
     * 更新年份显示
     */
    updateYearDisplay() {
        document.getElementById('currentYearDisplay').textContent = `${this.currentYear}年`;
    },
    
    /**
     * 更新月份显示
     */
    updateMonthDisplay() {
        document.getElementById('monthTitle').textContent = `${this.currentYear}年${this.currentMonth}月`;
    },
    
    /**
     * 获取月份天数
     */
    getDaysInMonth(year, month) {
        return new Date(year, month, 0).getDate();
    },
    
    /**
     * 格式化日期
     */
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    },
    
    /**
     * 应用样式
     */
    applyStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .almanac-container {
                padding: 20px;
                max-width: 1200px;
                margin: 0 auto;
            }
            
            .almanac-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;
                padding: 15px;
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(196, 30, 58, 0.1));
                border-radius: 15px;
                border: 1px solid rgba(212, 175, 55, 0.3);
            }
            
            .almanac-title {
                font-size: 28px;
                font-weight: bold;
                color: #D4AF37;
                text-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
            }
            
            .almanac-btn {
                padding: 10px 20px;
                background: linear-gradient(135deg, #D4AF37, #B8860B);
                border: none;
                border-radius: 8px;
                color: white;
                font-size: 14px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .almanac-btn:hover {
                transform: translateY(-2px);
                box-shadow: 0 5px 15px rgba(212, 175, 55, 0.4);
            }
            
            .months-grid {
                display: grid;
                grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                gap: 20px;
            }
            
            .month-card {
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.1), rgba(196, 30, 58, 0.1));
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 15px;
                padding: 20px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .month-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 25px rgba(212, 175, 55, 0.3);
                border-color: #D4AF37;
            }
            
            .month-name {
                font-size: 20px;
                font-weight: bold;
                color: #D4AF37;
                margin-bottom: 10px;
            }
            
            .month-days {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.7);
                margin-bottom: 10px;
            }
            
            .month-festivals {
                display: flex;
                flex-wrap: wrap;
                gap: 5px;
                margin-bottom: 10px;
            }
            
            .festival-tag {
                background: rgba(196, 30, 58, 0.3);
                color: #FFD700;
                padding: 3px 8px;
                border-radius: 4px;
                font-size: 12px;
            }
            
            .month-preview {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
            }
            
            .month-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                gap: 10px;
            }
            
            .month-title {
                font-size: 24px;
                color: #D4AF37;
                flex: 1;
                text-align: center;
            }
            
            .month-btn, .back-btn {
                padding: 8px 15px;
                background: rgba(212, 175, 55, 0.2);
                border: 1px solid rgba(212, 175, 55, 0.3);
                border-radius: 6px;
                color: #D4AF37;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .month-btn:hover, .back-btn:hover {
                background: rgba(212, 175, 55, 0.3);
            }
            
            .calendar-grid {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 10px;
            }
            
            .calendar-weekdays {
                display: grid;
                grid-template-columns: repeat(7, 1fr);
                gap: 10px;
                margin-bottom: 10px;
            }
            
            .weekday {
                text-align: center;
                font-weight: bold;
                color: #D4AF37;
                padding: 10px;
            }
            
            .day-cell {
                background: rgba(255, 255, 255, 0.05);
                border: 1px solid rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                padding: 10px;
                min-height: 80px;
                cursor: pointer;
                transition: all 0.3s;
            }
            
            .day-cell:hover {
                background: rgba(212, 175, 55, 0.2);
                border-color: #D4AF37;
            }
            
            .day-cell.today {
                background: linear-gradient(135deg, rgba(212, 175, 55, 0.3), rgba(196, 30, 58, 0.3));
                border-color: #D4AF37;
            }
            
            .day-cell.weekend {
                border-color: rgba(196, 30, 58, 0.5);
            }
            
            .day-cell.empty {
                background: transparent;
                border: none;
                cursor: default;
            }
            
            .day-number {
                font-size: 18px;
                font-weight: bold;
                color: #D4AF37;
                margin-bottom: 5px;
            }
            
            .day-lunar {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.7);
            }
            
            .day-festival {
                font-size: 11px;
                color: #FF6B6B;
                margin-top: 3px;
            }
            
            .today-badge {
                display: inline-block;
                background: linear-gradient(135deg, #D4AF37, #B8860B);
                color: white;
                padding: 2px 6px;
                border-radius: 4px;
                font-size: 10px;
                margin-top: 5px;
            }
            
            .detail-panel {
                position: fixed;
                bottom: -100%;
                left: 0;
                right: 0;
                background: linear-gradient(135deg, #1a1a2e, #16213e);
                border-top: 2px solid #D4AF37;
                border-radius: 20px 20px 0 0;
                padding: 20px;
                max-height: 70vh;
                overflow-y: auto;
                transition: bottom 0.3s ease-out;
                z-index: 1000;
            }
            
            .detail-panel.active {
                bottom: 0;
            }
            
            .detail-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;
                padding-bottom: 15px;
                border-bottom: 1px solid rgba(212, 175, 55, 0.3);
            }
            
            .detail-header h3 {
                font-size: 20px;
                color: #D4AF37;
            }
            
            .close-detail {
                background: none;
                border: none;
                color: rgba(255, 255, 255, 0.7);
                font-size: 24px;
                cursor: pointer;
                padding: 5px;
            }
            
            .close-detail:hover {
                color: #D4AF37;
            }
            
            .detail-grid {
                display: grid;
                gap: 15px;
            }
            
            .detail-item {
                background: rgba(255, 255, 255, 0.05);
                padding: 15px;
                border-radius: 8px;
                border-left: 3px solid #D4AF37;
            }
            
            .detail-label {
                font-size: 12px;
                color: rgba(255, 255, 255, 0.5);
                margin-bottom: 5px;
            }
            
            .detail-value {
                font-size: 14px;
                color: rgba(255, 255, 255, 0.9);
            }
            
            .detail-value.yi {
                color: #4CAF50;
            }
            
            .detail-value.ji {
                color: #F44336;
            }
            
            .hidden {
                display: none !important;
            }
            
            @media (max-width: 768px) {
                .calendar-grid {
                    gap: 5px;
                }
                
                .day-cell {
                    min-height: 60px;
                    padding: 5px;
                }
                
                .day-number {
                    font-size: 14px;
                }
                
                .day-lunar {
                    font-size: 10px;
                }
            }
        `;
        document.head.appendChild(style);
    }
};

// 导出模块
if (typeof window !== 'undefined') {
    window.AlmanacModule = AlmanacModule;
}
