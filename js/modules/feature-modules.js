function loadCosmosModule(body) {
    body.innerHTML = `
    <div class="space-y-8 text-center">
        <div class="p-6 rounded-2xl bg-gradient-to-br from-chaos to-obsidian border border-gold/30">
            <div class="text-gold text-2xl ancient-font mb-2">无极生太极</div>
            <div class="text-parchment/70">天地未判，元气未分，混沌无物，曰无极。静极生动，一气产生，是为太极。</div>
            <div class="mt-4 text-6xl text-gold/20">☯</div>
        </div>
        <div><i class="fas fa-arrow-down text-gold/50 text-2xl"></i></div>
        <div class="grid grid-cols-2 gap-6">
            <div class="p-4 rounded-xl bg-gold/10 border border-gold/20">
                <div class="text-2xl ancient-font text-gold">两仪</div>
                <div class="text-parchment/60 text-sm mt-2">太极动而生阳，静而生阴。一阴一阳，天地始分。</div>
                <div class="mt-2 text-3xl">⚊ ⚋</div>
            </div>
        </div>
        <div><i class="fas fa-arrow-down text-gold/50 text-2xl"></i></div>
        <div class="grid grid-cols-4 gap-4">
            <div class="p-3 rounded-lg bg-jade/10 border border-jade/20">
                <div class="text-lg ancient-font text-jade">太阳</div>
                <div class="text-xs text-parchment/50">⚌</div>
            </div>
            <div class="p-3 rounded-lg bg-jade/10 border border-jade/20">
                <div class="text-lg ancient-font text-jade">少阴</div>
                <div class="text-xs text-parchment/50">⚍</div>
            </div>
            <div class="p-3 rounded-lg bg-jade/10 border border-jade/20">
                <div class="text-lg ancient-font text-jade">少阳</div>
                <div class="text-xs text-parchment/50">⚎</div>
            </div>
            <div class="p-3 rounded-lg bg-jade/10 border border-jade/20">
                <div class="text-lg ancient-font text-jade">太阴</div>
                <div class="text-xs text-parchment/50">⚏</div>
            </div>
        </div>
        <div><i class="fas fa-arrow-down text-gold/50 text-2xl"></i></div>
        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
            <div class="text-xl ancient-font text-gold">八卦</div>
            <div class="mt-2 flex justify-center space-x-2 text-xl text-gold/70">
                <span>☰</span><span>☱</span><span>☲</span><span>☳</span><span>☷</span><span>☶</span><span>☵</span><span>☴</span>
            </div>
        </div>
    </div>`;
}

function loadMythModule(body) {
    const categoryMap = {};
    advancedMyths.forEach(myth => {
        if (!categoryMap[myth.category]) {
            categoryMap[myth.category] = [];
        }
        categoryMap[myth.category].push(myth);
    });
    
    let html = `<div class="space-y-8">
        <div class="text-center mb-6">
            <div class="text-gold text-2xl ancient-font mb-2">神话传说</div>
            <div class="text-parchment/60 text-sm">聆听古老文明的声音，感受中华文化的博大精深</div>
        </div>`;
    
    for (const [category, myths] of Object.entries(categoryMap)) {
        html += `
        <div>
            <div class="text-jade text-lg mb-3 flex items-center">
                <i class="fas fa-bookmark mr-2"></i>${category}
            </div>
            <div class="grid grid-cols-1 gap-4">
                ${myths.map(m => `
                    <div class="p-5 rounded-xl bg-obsidian/50 border border-gold/20 hover:border-gold/40 transition-all cursor-pointer" onclick="showMythDetail('${m.title.replace(/'/g, "\\'")}')">
                        <h4 class="text-gold text-xl ancient-font mb-2">${m.title}</h4>
                        <p class="text-parchment/70 leading-relaxed text-sm line-clamp-3">${m.content}</p>
                        <div class="mt-3 text-jade text-xs flex items-center">
                            <i class="fas fa-info-circle mr-1"></i>点击查看详情
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>`;
    }
    
    html += `
        <div id="mythDetailContainer"></div>
    </div>`;
    
    body.innerHTML = html;
}

function showMythDetail(title) {
    const myth = advancedMyths.find(m => m.title === title);
    if (!myth) return;
    
    const container = document.getElementById('mythDetailContainer');
    container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick="this.innerHTML=''">
            <div class="max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-obsidian to-chaos rounded-2xl border-2 border-gold/30 p-6" onclick="event.stopPropagation()">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-gold text-2xl ancient-font">${myth.title}</div>
                    <button onclick="document.getElementById('mythDetailContainer').innerHTML=''" class="w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all">
                        <i class="fas fa-times text-gold"></i>
                    </button>
                </div>
                <div class="text-parchment/70 leading-relaxed whitespace-pre-line mb-4">${myth.content}</div>
                <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
                    <div class="text-jade text-sm mb-1"><i class="fas fa-lightbulb mr-1"></i>寓意</div>
                    <div class="text-parchment/60 text-sm">${myth.meaning}</div>
                </div>
            </div>
        </div>
    `;
}

function loadHealthModule(body) {
    const today = new Date();
    const month = today.getMonth();
    let seasonKey = 'spring';
    let seasonName = '春';
    
    if (month >= 2 && month <= 4) { seasonKey = 'spring'; seasonName = '春'; }
    else if (month >= 5 && month <= 7) { seasonKey = 'summer'; seasonName = '夏'; }
    else if (month >= 8 && month <= 10) { seasonKey = 'autumn'; seasonName = '秋'; }
    else { seasonKey = 'winter'; seasonName = '冬'; }
    
    const seasonData = advancedHealthTips[seasonKey];
    
    let html = `
    <div class="space-y-6">
        <div class="text-center mb-6">
            <div class="text-gold text-2xl ancient-font">${seasonName}季养生</div>
            <div class="text-parchment/60 text-sm">${seasonData.period} | 重点养护：${seasonData.organ}</div>
        </div>
        
        <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
            <div class="text-parchment/70 text-sm italic">"${seasonData.principle}"</div>
            <div class="text-bronze text-xs mt-2">——《黄帝内经》</div>
        </div>
        
        <div class="grid grid-cols-2 gap-3">
            <div class="p-4 rounded-xl bg-jade/10 border border-jade/30">
                <div class="text-jade text-sm mb-2"><i class="fas fa-heartbeat mr-1"></i>重点脏腑</div>
                <div class="text-gold text-xl">${seasonData.organ}</div>
            </div>
            <div class="p-4 rounded-xl bg-cinnabar/10 border border-cinnabar/30">
                <div class="text-cinnabar text-sm mb-2"><i class="fas fa-wind mr-1"></i>对应情绪</div>
                <div class="text-gold text-xl">${seasonData.emotion}</div>
            </div>
        </div>
        
        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
            <div class="text-gold text-sm mb-3"><i class="fas fa-utensils mr-1"></i>推荐食物</div>
            <div class="flex flex-wrap gap-2">
                ${seasonData.food.map(f => `<span class="px-3 py-1 rounded-lg bg-jade/20 text-jade/90 text-xs">${f}</span>`).join('')}
            </div>
        </div>
        
        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
            <div class="text-gold text-sm mb-3"><i class="fas fa-tint mr-1"></i>养生茶饮</div>
            <div class="flex flex-wrap gap-2">
                ${seasonData.tea.map(t => `<span class="px-3 py-1 rounded-lg bg-azure/20 text-azure/90 text-xs">${t}</span>`).join('')}
            </div>
        </div>
        
        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
            <div class="text-gold text-sm mb-3"><i class="fas fa-running mr-1"></i>适宜运动</div>
            <div class="flex flex-wrap gap-2">
                ${seasonData.exercise.map(e => `<span class="px-3 py-1 rounded-lg bg-gold/20 text-gold/90 text-xs">${e}</span>`).join('')}
            </div>
        </div>
        
        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
            <div class="text-gold text-sm mb-2"><i class="fas fa-exclamation-triangle mr-1"></i>养生禁忌</div>
            <div class="text-parchment/60 text-sm">${seasonData.avoid}</div>
        </div>
        
        <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
            <div class="text-gold text-sm mb-2"><i class="fas fa-lightbulb mr-1"></i>养生要点</div>
            <div class="space-y-1">
                ${seasonData.tips.map(tip => `
                    <div class="text-parchment/60 text-xs">• ${tip}</div>
                `).join('')}
            </div>
        </div>
    </div>`;
    
    body.innerHTML = html;
}

function loadCultureModule(body) {
    let html = `<div class="space-y-6">
        <div class="text-center mb-6">
            <div class="text-gold text-2xl ancient-font mb-2">国学经典</div>
            <div class="text-parchment/60 text-sm">品读千年智慧，涵养浩然之气</div>
        </div>`;
    
    advancedClassics.forEach(classic => {
        html += `
        <div class="p-6 rounded-xl bg-obsidian/50 border border-gold/20 hover:border-gold/40 transition-all cursor-pointer" onclick="showClassicDetail('${classic.name.replace(/'/g, "\\'")}')">
            <div class="flex justify-between items-center mb-3">
                <h4 class="text-gold text-xl ancient-font">${classic.name}</h4>
                <div class="flex items-center space-x-2">
                    <span class="text-xs text-parchment/50">${classic.period}</span>
                    <span class="text-xs text-jade px-2 py-1 rounded bg-jade/10">${classic.category}</span>
                </div>
            </div>
            <p class="text-parchment/70 text-sm mb-3 line-clamp-2">${classic.desc}</p>
            <div class="p-3 rounded-lg bg-gold/5 border-l-2 border-gold italic text-parchment/80 text-sm">
                "${classic.quotes[0].text}"
            </div>
            <div class="mt-3 text-jade text-xs flex items-center">
                <i class="fas fa-info-circle mr-1"></i>点击查看详情
            </div>
        </div>`;
    });
    
    html += `<div id="classicDetailContainer"></div></div>`;
    body.innerHTML = html;
}

function showClassicDetail(name) {
    const classic = advancedClassics.find(c => c.name === name);
    if (!classic) return;
    
    const container = document.getElementById('classicDetailContainer');
    container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick="this.innerHTML=''">
            <div class="max-w-2xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-obsidian to-chaos rounded-2xl border-2 border-gold/30 p-6" onclick="event.stopPropagation()">
                <div class="flex items-center justify-between mb-4">
                    <div class="text-gold text-2xl ancient-font">${classic.name}</div>
                    <button onclick="document.getElementById('classicDetailContainer').innerHTML=''" class="w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all">
                        <i class="fas fa-times text-gold"></i>
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-3 mb-4">
                    <div class="text-sm">
                        <div class="text-parchment/50 mb-1">作者</div>
                        <div class="text-gold">${classic.author}</div>
                    </div>
                    <div class="text-sm">
                        <div class="text-parchment/50 mb-1">时期</div>
                        <div class="text-gold">${classic.period}</div>
                    </div>
                </div>
                <div class="text-parchment/70 text-sm mb-4">${classic.desc}</div>
                <div class="p-4 rounded-xl bg-gold/5 border border-gold/20 mb-4">
                    <div class="text-jade text-sm mb-2"><i class="fas fa-book-open mr-1"></i>历史影响</div>
                    <div class="text-parchment/60 text-sm">${classic.influence}</div>
                </div>
                <div class="mb-4">
                    <div class="text-gold text-sm mb-3"><i class="fas fa-quote-left mr-1"></i>名句赏析</div>
                    <div class="space-y-3">
                        ${classic.quotes.map(q => `
                            <div class="p-3 rounded-lg bg-obsidian/50 border border-gold/10">
                                <div class="text-parchment text-sm mb-1">${q.text}</div>
                                <div class="text-parchment/50 text-xs">${q.explain}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `;
}

function loadHistoryModule(body) {
    const events = [ { year: '公元前221年', event: '秦始皇统一六国，建立秦朝。' }, { year: '公元105年', event: '蔡伦改进造纸术，被称为"纸神"。' }, { year: '公元1405年', event: '郑和首次下西洋，开启了伟大的航海时代。' } ];
    body.innerHTML = `<div class="space-y-4">${events.map(e => `<div class="flex items-start p-4 rounded-xl bg-gold/5 border border-gold/10 hover:border-gold/30 transition-all"><div class="w-28 text-bronze text-sm flex-shrink-0">${e.year}</div><div class="text-parchment/80">${e.event}</div></div>`).join('')}</div>`;
}

function loadFestivalModule(body) {
    const solarTerms = ['小寒', '大寒', '立春', '雨水', '惊蛰', '春分', '清明', '谷雨', '立夏', '小满', '芒种', '夏至', '小暑', '大暑', '立秋', '处暑', '白露', '秋分', '寒露', '霜降', '立冬', '小雪', '大雪', '冬至'];
    body.innerHTML = `<div class="grid grid-cols-4 gap-3">${solarTerms.map(t => `<div class="p-3 rounded-xl bg-gold/5 border border-gold/20 text-center text-gold text-sm">${t}</div>`).join('')}</div>`;
}
