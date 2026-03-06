const BaziCalculator = {
    getYearGanZhi(year) {
        const gan = tianGan[(year - 4) % 10];
        const zhi = diZhi[(year - 4) % 12];
        return { gan, zhi, full: gan + zhi };
    },

    getMonthGanZhi(year, month) {
        const monthGanIndex = ((year % 10) * 2 + month + 1) % 10;
        const monthZhiIndex = (month + 2) % 12;
        const gan = tianGan[monthGanIndex];
        const zhi = diZhi[monthZhiIndex];
        return { gan, zhi, full: gan + zhi };
    },

    getDayGanZhi(date) {
        const baseDate = new Date(1900, 0, 1);
        const diffDays = Math.floor((date - baseDate) / (1000 * 60 * 60 * 24));
        const ganIndex = (diffDays + 12) % 10;
        const zIndex = (diffDays + 12) % 12;
        const gan = ganIndex < 0 ? tianGan[ganIndex + 10] : tianGan[ganIndex];
        const zhi = zIndex < 0 ? diZhi[zIndex + 12] : diZhi[zIndex];
        return { gan, zhi, full: gan + zhi };
    },

    getHourGanZhi(dayGan, hour) {
        const ganBase = (dayGan.charCodeAt(0) - '甲'.charCodeAt(0)) % 5;
        const startGanIndex = (ganBase * 2) % 10;
        const hourIndex = Math.floor((hour + 1) % 24 / 2);
        const ganIndex = (startGanIndex + hourIndex) % 10;
        const gan = tianGan[ganIndex];
        const zhi = diZhi[hourIndex];
        return { gan, zhi, full: gan + zhi, shichen: DateUtils.getShichen(hour) };
    },

    calculateBazi(birthInfo) {
        const { year, month, day, hour } = birthInfo;
        const date = new Date(year, month - 1, day, hour);
        
        const yearGanZhi = this.getYearGanZhi(year);
        const monthGanZhi = this.getMonthGanZhi(year, month);
        const dayGanZhi = this.getDayGanZhi(date);
        const hourGanZhi = this.getHourGanZhi(dayGanZhi.gan, hour);
        
        return {
            year: yearGanZhi,
            month: monthGanZhi,
            day: dayGanZhi,
            hour: hourGanZhi,
            wuxing: this.analyzeWuxing(yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi),
            score: this.calculateScore(yearGanZhi, monthGanZhi, dayGanZhi, hourGanZhi)
        };
    },

    analyzeWuxing(year, month, day, hour) {
        const wuxingMap = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水',
            '子': '水', '丑': '土', '寅': '木', '卯': '木', '辰': '土',
            '巳': '火', '午': '火', '未': '土', '申': '金', '酉': '金',
            '戌': '土', '亥': '水'
        };
        
        const elements = {
            '木': 0,
            '火': 0,
            '土': 0,
            '金': 0,
            '水': 0
        };
        
        [year, month, day, hour].forEach(pillar => {
            const ganWuxing = wuxingMap[pillar.gan];
            const zhiWuxing = wuxingMap[pillar.zhi];
            if (ganWuxing) elements[ganWuxing]++;
            if (zhiWuxing) elements[zhiWuxing]++;
        });
        
        return elements;
    },

    calculateScore(year, month, day, hour) {
        let score = 50;
        
        const pillars = [year, month, day, hour];
        const ganSet = new Set(pillars.map(p => p.gan));
        const zhiSet = new Set(pillars.map(p => p.zhi));
        
        score += (ganSet.size - 1) * 5;
        score += (zhiSet.size - 1) * 5;
        
        const wuxing = this.analyzeWuxing(year, month, day, hour);
        const presentElements = Object.values(wuxing).filter(count => count > 0).length;
        score += (presentElements - 3) * 5;
        
        score = Math.max(0, Math.min(100, score));
        return Math.round(score);
    },

    getFortuneTelling(bazi) {
        const dayMaster = bazi.day.gan;
        const wuxing = bazi.wuxing;
        
        const analysis = {
            dayMaster: dayMaster,
            strength: this.getDayMasterStrength(bazi),
            favorableElements: this.getFavorableElements(bazi),
            advice: this.getAdvice(bazi)
        };
        
        return analysis;
    },

    getDayMasterStrength(bazi) {
        const wuxing = bazi.wuxing;
        const dayMasterWuxing = this.getWuxingOfGan(bazi.day.gan);
        
        const supportCount = wuxing[dayMasterWuxing] + wuxing[this.getGeneratingElement(dayMasterWuxing)];
        
        if (supportCount >= 4) return '强';
        if (supportCount >= 2) return '中和';
        return '弱';
    },

    getWuxingOfGan(gan) {
        const map = {
            '甲': '木', '乙': '木', '丙': '火', '丁': '火', '戊': '土',
            '己': '土', '庚': '金', '辛': '金', '壬': '水', '癸': '水'
        };
        return map[gan];
    },

    getGeneratingElement(element) {
        const cycle = {
            '木': '水',
            '火': '木',
            '土': '火',
            '金': '土',
            '水': '金'
        };
        return cycle[element] || '木';
    },

    getFavorableElements(bazi) {
        const strength = this.getDayMasterStrength(bazi);
        const dayMasterWuxing = this.getWuxingOfGan(bazi.day.gan);
        
        if (strength === '强') {
            return this.getControlingElement(dayMasterWuxing);
        } else {
            return this.getGeneratingElement(dayMasterWuxing);
        }
    },

    getControlingElement(element) {
        const cycle = {
            '木': '金',
            '火': '水',
            '土': '木',
            '金': '火',
            '水': '土'
        };
        return cycle[element] || '金';
    },

    getAdvice(bazi) {
        const favorable = this.getFavorableElements(bazi);
        const adviceMap = {
            '木': '适合从事文化、教育、艺术相关工作，东方有利。',
            '火': '适合从事能源、科技、餐饮相关工作，南方有利。',
            '土': '适合从事地产、建筑、农业相关工作，中央有利。',
            '金': '适合从事金融、法律、机械相关工作，西方有利。',
            '水': '适合从事贸易、物流、旅游相关工作，北方有利。'
        };
        
        return adviceMap[favorable] || '平衡发展，顺势而为。';
    },

    renderBaziResult(bazi, container) {
        const wuxing = bazi.wuxing;
        const wuxingColors = {
            '木': 'text-jade',
            '火': 'text-cinnabar',
            '土': 'text-bronze',
            '金': 'text-gold',
            '水': 'text-azure'
        };
        
        container.innerHTML = `
            <div class="space-y-6">
                <div class="grid grid-cols-4 gap-3">
                    ${[
                        { title: '年柱', value: bazi.year.full, sub: bazi.year.gan + ' ' + bazi.year.zhi },
                        { title: '月柱', value: bazi.month.full, sub: bazi.month.gan + ' ' + bazi.month.zhi },
                        { title: '日柱', value: bazi.day.full, sub: bazi.day.gan + ' ' + bazi.day.zhi },
                        { title: '时柱', value: bazi.hour.full, sub: bazi.hour.gan + ' ' + bazi.hour.zhi }
                    ].map((pillar, i) => `
                        <div class="p-4 rounded-xl bg-gold/10 border border-gold/30 text-center">
                            <div class="text-bronze text-xs mb-2">${pillar.title}</div>
                            <div class="ancient-font text-2xl text-gold mb-1">${pillar.value}</div>
                            <div class="text-parchment/50 text-xs">${pillar.sub}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                    <div class="text-parchment/70 text-sm mb-3">五行分析</div>
                    <div class="grid grid-cols-5 gap-2 text-center">
                        ${Object.entries(wuxing).map(([element, count]) => `
                            <div class="p-3 rounded-lg ${wuxingColors[element]} bg-obsidian/50">
                                <div class="text-lg ancient-font">${element}</div>
                                <div class="text-xs mt-1">${'●'.repeat(count)}${'○'.repeat(3-count)}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
                    <div class="text-gold text-sm mb-2">八字评分</div>
                    <div class="flex items-center space-x-3">
                        <div class="flex-1 h-3 bg-obsidian rounded-full overflow-hidden">
                            <div class="h-full ${
                                bazi.score >= 80 ? 'bg-jade' :
                                bazi.score >= 60 ? 'bg-gold' :
                                'bg-bronze'
                            }" style="width: ${bazi.score}%"></div>
                        </div>
                        <div class="text-gold text-xl">${bazi.score}分</div>
                    </div>
                </div>
                
                <div class="p-4 rounded-xl bg-jade/10 border border-jade/30">
                    <div class="text-jade text-sm mb-2">命理建议</div>
                    <div class="text-parchment/80 text-sm">${this.getAdvice(bazi)}</div>
                </div>
            </div>
        `;
    }
};

function calcBazi() {
    const dateVal = document.getElementById('baziDate').value;
    const hourVal = parseInt(document.getElementById('baziHour').value);
    
    if (!dateVal) {
        InteractionManager.showToast('请选择日期', 'warning');
        return;
    }
    
    const date = new Date(dateVal);
    const bazi = BaziCalculator.calculateBazi({
        year: date.getFullYear(),
        month: date.getMonth() + 1,
        day: date.getDate(),
        hour: hourVal
    });
    
    const resultDiv = document.getElementById('baziResult');
    BaziCalculator.renderBaziResult(bazi, resultDiv);
    
    UserManager.addFortuneRecord({
        type: 'bazi',
        score: bazi.score,
        note: `八字：${bazi.year.full} ${bazi.month.full} ${bazi.day.full} ${bazi.hour.full}`
    });
}
