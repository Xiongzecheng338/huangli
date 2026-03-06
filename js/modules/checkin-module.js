function loadCheckInModule(body) {
    const userData = UserManager.getUserData();
    const today = new Date();
    const dateStr = DateUtils.formatDate(today);
    const weekDay = DateUtils.getWeekDay(today);
    
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-gold/20 to-bronze/20 border border-gold/30">
                <div class="ancient-font text-3xl text-gold mb-2">每日签到</div>
                <div class="text-parchment/70 text-sm">坚持签到，积累福报</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                    <div class="text-parchment/60 text-xs mb-1">今日</div>
                    <div class="text-gold text-lg">${dateStr}</div>
                    <div class="text-bronze text-xs">${weekDay}</div>
                </div>
                <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                    <div class="text-parchment/60 text-xs mb-1">连续签到</div>
                    <div class="ancient-font text-3xl text-jade">${userData.checkInStreak}天</div>
                </div>
            </div>
            
            <div class="p-4 rounded-xl bg-gold/10 border border-gold/30">
                <div class="grid grid-cols-2 gap-4 text-center">
                    <div>
                        <div class="text-parchment/60 text-xs">总签到</div>
                        <div class="text-gold text-2xl">${userData.totalCheckIns}</div>
                    </div>
                    <div>
                        <div class="text-parchment/60 text-xs">总访问</div>
                        <div class="text-gold text-2xl">${userData.totalVisits}</div>
                    </div>
                </div>
            </div>
            
            <div class="space-y-2">
                <div class="text-parchment/70 text-sm mb-2">签到奖励</div>
                <div class="grid grid-cols-5 gap-2">
                    ${[
                        { days: 1, label: '每日', icon: 'fa-sun', color: 'gold' },
                        { days: 3, label: '三日', icon: 'fa-star', color: 'jade' },
                        { days: 7, label: '周签', icon: 'fa-crown', color: 'cinnabar' },
                        { days: 15, label: '半月', icon: 'fa-gem', color: 'azure' },
                        { days: 30, label: '月签', icon: 'fa-medal', color: 'bronze' }
                    ].map(item => `
                        <div class="p-3 rounded-lg bg-obsidian/50 border ${
                            userData.checkInStreak >= item.days ? 
                            `border-${item.color}/50 ${item.color === 'gold' ? 'text-gold' : item.color === 'jade' ? 'text-jade' : item.color === 'cinnabar' ? 'text-cinnabar' : item.color === 'azure' ? 'text-azure' : 'text-bronze'}` :
                            'border-gold/20 text-gold/30'
                        } text-center transition-all">
                            <i class="fas ${item.icon} text-xl mb-1"></i>
                            <div class="text-xs">${item.label}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <button onclick="handleCheckIn()" class="w-full py-4 rounded-xl bg-gradient-to-r from-gold/40 to-bronze/40 border-2 border-gold/60 text-gold ancient-font text-xl hover:from-gold/50 hover:to-bronze/50 transition-all pulse-glow no-ripple">
                <i class="fas fa-calendar-check mr-2"></i>
                ${userData.lastVisitDate === new Date().toDateString() ? '今日已签到' : '立即签到'}
            </button>
            
            <div id="checkInResult"></div>
        </div>
    `;
}

function handleCheckIn() {
    const result = UserManager.checkIn();
    const resultDiv = document.getElementById('checkInResult');
    
    if (result.success) {
        InteractionManager.showToast('签到成功！', 'success');
        InteractionManager.showConfetti(document.querySelector('button[onclick="handleCheckIn()"]'));
        
        const rewards = result.rewards;
        resultDiv.innerHTML = `
            <div class="mt-4 p-4 rounded-xl bg-jade/10 border border-jade/30">
                <div class="text-center">
                    <div class="text-jade text-lg mb-2">获得奖励</div>
                    <div class="flex flex-wrap gap-2 justify-center">
                        ${rewards.map(r => `<span class="px-3 py-1 rounded-lg bg-jade/20 text-jade text-sm">${r}</span>`).join('')}
                    </div>
                    <div class="text-parchment/70 text-sm mt-3">连续签到 ${result.streak} 天</div>
                </div>
            </div>
        `;
        
        loadCheckInModule(document.getElementById('modalBody'));
    } else {
        InteractionManager.showToast(result.message, 'warning');
        resultDiv.innerHTML = `
            <div class="mt-4 p-4 rounded-xl bg-bronze/10 border border-bronze/30 text-center">
                <div class="text-bronze">明日再来签到吧</div>
            </div>
        `;
    }
}

function loadFortuneRecordModule(body) {
    const records = UserManager.getFortuneRecords(20);
    
    body.innerHTML = `
        <div class="space-y-4">
            <div class="text-center p-4 rounded-xl bg-gold/10 border border-gold/30 mb-4">
                <div class="ancient-font text-2xl text-gold">运势记录</div>
                <div class="text-parchment/60 text-sm mt-1">记录每日运势，洞察人生起伏</div>
            </div>
            
            ${records.length === 0 ? `
                <div class="text-center py-12 text-parchment/50">
                    <i class="fas fa-scroll text-6xl mb-4 opacity-30"></i>
                    <div>暂无运势记录</div>
                    <div class="text-xs mt-2">开始使用运势功能来创建记录</div>
                </div>
            ` : `
                <div class="space-y-3 max-h-96 overflow-y-auto">
                    ${records.map(record => `
                        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20 hover:border-gold/40 transition-all">
                            <div class="flex justify-between items-start mb-2">
                                <div class="text-gold ancient-font text-lg">${record.gua || '每日运势'}</div>
                                <div class="text-bronze text-xs">${new Date(record.date).toLocaleDateString('zh-CN')}</div>
                            </div>
                            ${record.score ? `
                                <div class="flex items-center space-x-3">
                                    <div class="flex-1">
                                        <div class="h-2 bg-obsidian rounded-full overflow-hidden">
                                            <div class="h-full ${
                                                record.score >= 85 ? 'bg-jade' :
                                                record.score >= 70 ? 'bg-gold' :
                                                'bg-bronze'
                                            }" style="width: ${record.score}%"></div>
                                        </div>
                                    </div>
                                    <div class="text-gold text-lg">${record.score}分</div>
                                </div>
                                <div class="text-parchment/60 text-xs mt-2">${record.level || ''}</div>
                            ` : ''}
                            ${record.note ? `
                                <div class="text-parchment/70 text-sm mt-2 italic">${record.note}</div>
                            ` : ''}
                        </div>
                    `).join('')}
                </div>
            `}
        </div>
    `;
}

function saveDailyFortune() {
    const fortune = FortuneTeller.getDailyFortune();
    const note = prompt('记录今日感受（可选）:');
    
    UserManager.addFortuneRecord({
        type: 'daily',
        score: fortune.score,
        level: fortune.level.name,
        gua: fortune.level.name,
        note: note || null
    });
    
    InteractionManager.showToast('运势已记录', 'success');
}
