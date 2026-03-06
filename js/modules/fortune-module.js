function loadDailyFortuneModule(body) {
    const today = new Date();
    const fortune = FortuneTeller.getDailyFortune(today);
    const lunar = solarToLunar(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const yiji = generateYiJi(today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate());
    
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-gold/20 to-bronze/20 border border-gold/30">
                <div class="ancient-font text-3xl text-gold mb-2">今日运势</div>
                <div class="text-parchment/70 text-sm">${DateUtils.formatDate(today)} ${DateUtils.getWeekDay(today)}</div>
                <div class="text-bronze text-xs mt-1">农历${getGanZhiYear(lunar.year)}年 ${lunarMonths[lunar.month - 1]}月${lunarDays[lunar.day - 1]}</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="p-5 rounded-xl bg-gold/10 border border-gold/30 text-center">
                    <div class="text-parchment/60 text-xs mb-2">运势评分</div>
                    <div class="ancient-font text-5xl ${
                        fortune.score >= 85 ? 'text-jade' :
                        fortune.score >= 70 ? 'text-gold' :
                        'text-bronze'
                    }">${fortune.score}</div>
                    <div class="text-gold text-sm mt-2">${fortune.level.name}</div>
                    <div class="text-parchment/50 text-xs mt-1">${fortune.level.desc}</div>
                </div>
                
                <div class="space-y-2">
                    <div class="p-3 rounded-lg bg-obsidian/50 border border-gold/20">
                        <div class="text-parchment/60 text-xs">值日吉神</div>
                        <div class="text-gold ancient-font text-lg">${fortune.god}</div>
                    </div>
                    <div class="p-3 rounded-lg bg-obsidian/50 border border-gold/20">
                        <div class="text-parchment/60 text-xs">吉利方位</div>
                        <div class="text-jade ancient-font text-lg">${fortune.direction}</div>
                    </div>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-3">
                <div class="p-4 rounded-xl bg-cinnabar/10 border border-cinnabar/30 text-center">
                    <div class="text-parchment/60 text-xs mb-1">幸运色</div>
                    <div class="text-cinnabar ancient-font text-xl">${fortune.color}</div>
                </div>
                <div class="p-4 rounded-xl bg-jade/10 border border-jade/30 text-center">
                    <div class="text-parchment/60 text-xs mb-1">幸运数</div>
                    <div class="text-jade ancient-font text-xl">${fortune.number}</div>
                </div>
                <div class="p-4 rounded-xl bg-bronze/10 border border-bronze/30 text-center">
                    <div class="text-parchment/60 text-xs mb-1">吉时</div>
                    <div class="text-bronze ancient-font text-xl">${DateUtils.getShichen(new Date().getHours())}</div>
                </div>
            </div>
            
            <div class="p-5 rounded-xl bg-obsidian/50 border border-gold/20">
                <div class="text-gold text-sm mb-3 flex items-center">
                    <i class="fas fa-quote-left mr-2 opacity-50"></i>
                    今日建议
                </div>
                <div class="text-parchment/80 leading-relaxed">${fortune.advice}</div>
            </div>
            
            <div>
                <div class="text-gold text-sm mb-3 flex items-center">
                    <i class="fas fa-sun mr-2"></i>
                    宜
                </div>
                <div class="flex flex-wrap gap-2">
                    ${yiji.yi.map(item => `
                        <span class="px-3 py-1 rounded-lg bg-jade/20 text-jade text-sm">${item}</span>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <div class="text-cinnabar text-sm mb-3 flex items-center">
                    <i class="fas fa-moon mr-2"></i>
                    忌
                </div>
                <div class="flex flex-wrap gap-2">
                    ${yiji.ji.map(item => `
                        <span class="px-3 py-1 rounded-lg bg-cinnabar/20 text-cinnabar text-sm">${item}</span>
                    `).join('')}
                </div>
            </div>
            
            <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
                <div class="text-gold text-sm mb-3">十二时辰吉凶</div>
                <div class="grid grid-cols-3 gap-2">
                    ${[0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22].map(hour => {
                        const hourFortune = FortuneTeller.getHourlyFortune(hour);
                        return `
                            <div class="p-2 rounded-lg bg-obsidian/50 text-center ${
                                hourFortune.quality === '大吉' ? 'border border-jade/30' :
                                hourFortune.quality === '吉' ? 'border border-gold/30' :
                                hourFortune.quality === '凶' ? 'border border-cinnabar/30' :
                                ''
                            }">
                                <div class="text-bronze text-xs">${hourFortune.shichen}</div>
                                <div class="text-gold text-xs ${
                                    hourFortune.quality === '大吉' ? 'text-jade' :
                                    hourFortune.quality === '凶' ? 'text-cinnabar' :
                                    ''
                                }">${hourFortune.quality}</div>
                            </div>
                        `;
                    }).join('')}
                </div>
            </div>
            
            <div class="flex space-x-3">
                <button onclick="saveDailyFortune()" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-gold/30 to-bronze/30 border border-gold/50 text-gold hover:from-gold/40 hover:to-bronze/40 transition-all">
                    <i class="fas fa-bookmark mr-2"></i>记录运势
                </button>
                <button onclick="shareFortune()" class="flex-1 py-3 rounded-xl bg-gradient-to-r from-jade/30 to-cyan/30 border border-jade/50 text-jade hover:from-jade/40 hover:to-cyan/40 transition-all">
                    <i class="fas fa-share mr-2"></i>分享运势
                </button>
            </div>
        </div>
    `;
}

function shareFortune() {
    const fortune = FortuneTeller.getDailyFortune();
    const today = new Date();
    const shareText = `【天机黄历】${DateUtils.formatDate(today)}\n运势评分：${fortune.score}分（${fortune.level.name}）\n吉利方位：${fortune.direction}\n幸运色：${fortune.color}\n${fortune.advice}`;
    
    if (navigator.share) {
        navigator.share({
            title: '天机黄历 - 今日运势',
            text: shareText
        }).catch(err => {
            copyToClipboard(shareText);
        });
    } else {
        copyToClipboard(shareText);
    }
}

function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    InteractionManager.showToast('已复制到剪贴板', 'success');
}

function loadUserCenterModule(body) {
    const userData = UserManager.getUserData();
    const today = new Date();
    
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center p-6 rounded-2xl bg-gradient-to-br from-mystic/50 to-chaos/50 border border-gold/30">
                <div class="w-20 h-20 rounded-full bg-gold/20 mx-auto mb-3 flex items-center justify-center pulse-glow">
                    <i class="fas fa-user-circle text-4xl text-gold"></i>
                </div>
                <div class="ancient-font text-2xl text-gold mb-1">${userData.nickname}</div>
                <div class="text-parchment/60 text-sm">善信</div>
            </div>
            
            <div class="grid grid-cols-3 gap-3">
                <div class="p-4 rounded-xl bg-gold/10 border border-gold/30 text-center">
                    <div class="text-2xl ancient-font text-gold">${userData.totalVisits}</div>
                    <div class="text-parchment/60 text-xs mt-1">总访问</div>
                </div>
                <div class="p-4 rounded-xl bg-jade/10 border border-jade/30 text-center">
                    <div class="text-2xl ancient-font text-jade">${userData.checkInStreak}</div>
                    <div class="text-parchment/60 text-xs mt-1">连续签到</div>
                </div>
                <div class="p-4 rounded-xl bg-bronze/10 border border-bronze/30 text-center">
                    <div class="text-2xl ancient-font text-bronze">${userData.totalCheckIns}</div>
                    <div class="text-parchment/60 text-xs mt-1">总签到</div>
                </div>
            </div>
            
            <div class="space-y-2">
                <button onclick="openModule('checkin')" class="w-full p-4 rounded-xl bg-gold/10 border border-gold/30 text-gold hover:bg-gold/20 transition-all flex items-center justify-between">
                    <span><i class="fas fa-calendar-check mr-2"></i>每日签到</span>
                    <i class="fas fa-chevron-right text-xs"></i>
                </button>
                <button onclick="openModule('fortune-record')" class="w-full p-4 rounded-xl bg-jade/10 border border-jade/30 text-jade hover:bg-jade/20 transition-all flex items-center justify-between">
                    <span><i class="fas fa-history mr-2"></i>运势记录</span>
                    <i class="fas fa-chevron-right text-xs"></i>
                </button>
                <button onclick="toggleSound()" class="w-full p-4 rounded-xl bg-bronze/10 border border-bronze/30 text-bronze hover:bg-bronze/20 transition-all flex items-center justify-between">
                    <span><i class="fas ${SoundManager.enabled ? 'fa-volume-up' : 'fa-volume-mute'} mr-2"></i>音效 ${SoundManager.enabled ? '开启' : '关闭'}</span>
                    <i class="fas fa-toggle-on text-xs"></i>
                </button>
            </div>
            
            <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20 text-center">
                <div class="text-parchment/60 text-xs mb-2">加入时间</div>
                <div class="text-gold text-sm">${new Date(userData.createdAt).toLocaleDateString('zh-CN')}</div>
            </div>
        </div>
    `;
}

function toggleSound() {
    SoundManager.toggle();
    loadUserCenterModule(document.getElementById('modalBody'));
    InteractionManager.showToast(SoundManager.enabled ? '音效已开启' : '音效已关闭', 'info');
}
