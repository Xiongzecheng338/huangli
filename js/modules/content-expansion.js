function loadFoundationTheoryModule(body) {
    body.innerHTML = `
        <div class="space-y-8">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">基础理论</div>
                <div class="text-parchment/60 text-sm">天干地支、生肖八卦详解</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <button onclick="showTianGanDetail()" class="p-4 rounded-xl bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all text-center">
                    <div class="text-gold text-lg ancient-font mb-1">十天干</div>
                    <div class="text-parchment/60 text-xs">甲乙丙丁戊庚辛壬癸</div>
                </button>
                <button onclick="showDiZhiDetail()" class="p-4 rounded-xl bg-jade/10 border border-jade/30 hover:bg-jade/20 transition-all text-center">
                    <div class="text-gold text-lg ancient-font mb-1">十二地支</div>
                    <div class="text-parchment/60 text-xs">子丑寅卯辰巳午未申酉戌亥</div>
                </button>
                <button onclick="showShengXiaoDetail()" class="p-4 rounded-xl bg-cinnabar/10 border border-cinnabar/30 hover:bg-cinnabar/20 transition-all text-center">
                    <div class="text-gold text-lg ancient-font mb-1">十二生肖</div>
                    <div class="text-parchment/60 text-xs">鼠牛虎兔龙蛇马羊猴鸡狗猪</div>
                </button>
                <button onclick="showBaguaDetail()" class="p-4 rounded-xl bg-azure/10 border border-azure/30 hover:bg-azure/20 transition-all text-center">
                    <div class="text-gold text-lg ancient-font mb-1">八卦</div>
                    <div class="text-parchment/60 text-xs">乾坤震巽坎离艮兑</div>
                </button>
            </div>
            
            <div id="foundationDetailContainer"></div>
        </div>
    `;
}

function showTianGanDetail() {
    const container = document.getElementById('foundationDetailContainer');
    container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick="this.innerHTML=''">
            <div class="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-obsidian to-chaos rounded-2xl border-2 border-gold/30 p-6" onclick="event.stopPropagation()">
                <div class="flex items-center justify-between mb-6">
                    <div class="text-gold text-2xl ancient-font">十天干详解</div>
                    <button onclick="document.getElementById('foundationDetailContainer').innerHTML=''" class="w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all">
                        <i class="fas fa-times text-gold"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${tianGanDetailed.map(gan => `
                        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                            <div class="flex items-center justify-between mb-2">
                                <div class="text-3xl ancient-font text-gold">${gan.name}</div>
                                <div class="text-xs text-parchment/50">${gan.pinyin}</div>
                            </div>
                            <div class="text-sm text-parchment/70 space-y-1">
                                <div>五行：<span class="text-jade">${gan.element}</span></div>
                                <div>方位：<span class="text-azure">${gan.direction}</span></div>
                                <div>季节：<span class="text-bronze">${gan.season}</span></div>
                                <div>脏腑：<span class="text-cinnabar">${gan.organ}</span></div>
                            </div>
                            <div class="mt-3 text-xs text-parchment/60">${gan.meaning}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showDiZhiDetail() {
    const container = document.getElementById('foundationDetailContainer');
    container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick="this.innerHTML=''">
            <div class="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-obsidian to-chaos rounded-2xl border-2 border-gold/30 p-6" onclick="event.stopPropagation()">
                <div class="flex items-center justify-between mb-6">
                    <div class="text-gold text-2xl ancient-font">十二地支详解</div>
                    <button onclick="document.getElementById('foundationDetailContainer').innerHTML=''" class="w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all">
                        <i class="fas fa-times text-gold"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    ${diZhiDetailed.map(zhi => `
                        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                            <div class="flex items-center justify-between mb-2">
                                <div class="text-2xl ancient-font text-gold">${zhi.name}</div>
                                <div class="text-lg">${zhi.animal}</div>
                            </div>
                            <div class="text-xs text-parchment/70 space-y-1">
                                <div>时间：${zhi.time}</div>
                                <div>五行：<span class="text-jade">${zhi.element}</span></div>
                                <div>方位：${zhi.direction}</div>
                            </div>
                            <div class="mt-2 text-xs text-parchment/60">${zhi.character}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showShengXiaoDetail() {
    const container = document.getElementById('foundationDetailContainer');
    container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick="this.innerHTML=''">
            <div class="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-obsidian to-chaos rounded-2xl border-2 border-gold/30 p-6" onclick="event.stopPropagation()">
                <div class="flex items-center justify-between mb-6">
                    <div class="text-gold text-2xl ancient-font">十二生肖详解</div>
                    <button onclick="document.getElementById('foundationDetailContainer').innerHTML=''" class="w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all">
                        <i class="fas fa-times text-gold"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${shengXiaoDetailed.map(animal => `
                        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                            <div class="flex items-center justify-between mb-2">
                                <div class="text-2xl ancient-font text-gold">${animal.animal}</div>
                                <div class="text-xs text-parchment/50">第${animal.position}位</div>
                            </div>
                            <div class="text-xs text-parchment/70 mb-2">
                                年份：${animal.years.join('、')}
                            </div>
                            <div class="text-xs text-parchment/60 mb-2">${animal.character}</div>
                            <div class="text-xs text-jade/80">幸运色：${animal.luckyColor} | 幸运数字：${animal.luckyNumber.join('、')}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showBaguaDetail() {
    const container = document.getElementById('foundationDetailContainer');
    container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick="this.innerHTML=''">
            <div class="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-obsidian to-chaos rounded-2xl border-2 border-gold/30 p-6" onclick="event.stopPropagation()">
                <div class="flex items-center justify-between mb-6">
                    <div class="text-gold text-2xl ancient-font">八卦详解</div>
                    <button onclick="document.getElementById('foundationDetailContainer').innerHTML=''" class="w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all">
                        <i class="fas fa-times text-gold"></i>
                    </button>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${baguaDetailed.map(bagua => `
                        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                            <div class="flex items-center justify-between mb-2">
                                <div class="text-4xl text-gold">${bagua.symbol}</div>
                                <div class="text-lg ancient-font text-gold">${bagua.name}</div>
                            </div>
                            <div class="text-xs text-parchment/70 space-y-1 mb-2">
                                <div>自然：${bagua.element} | 属性：${bagua.attribute}</div>
                                <div>方位：${bagua.direction} | 家庭：${bagua.family}</div>
                                <div>身体：${bagua.body} | 动物：${bagua.animal}</div>
                            </div>
                            <div class="text-xs text-parchment/60">${bagua.meaning}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function loadCultureHistoryModule(body) {
    body.innerHTML = `
        <div class="space-y-8">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">历史文化</div>
                <div class="text-parchment/60 text-sm">传统节日、历史事件、民俗文化</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <button onclick="showHistoricalEvents()" class="p-4 rounded-xl bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all text-center">
                    <i class="fas fa-history text-3xl text-gold mb-2"></i>
                    <div class="text-gold text-lg ancient-font mb-1">传统节日</div>
                    <div class="text-parchment/60 text-xs">春节、端午、中秋等</div>
                </button>
                <button onclick="showTraditionalCulture()" class="p-4 rounded-xl bg-jade/10 border border-jade/30 hover:bg-jade/20 transition-all text-center">
                    <i class="fas fa-palette text-3xl text-jade mb-2"></i>
                    <div class="text-gold text-lg ancient-font mb-1">传统艺术</div>
                    <div class="text-parchment/60 text-xs">书法、国画、戏曲等</div>
                </button>
            </div>
            
            <div id="cultureHistoryContainer"></div>
        </div>
    `;
}

function showHistoricalEvents() {
    const container = document.getElementById('cultureHistoryContainer');
    container.innerHTML = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick="this.innerHTML=''">
            <div class="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-obsidian to-chaos rounded-2xl border-2 border-gold/30 p-6" onclick="event.stopPropagation()">
                <div class="flex items-center justify-between mb-6">
                    <div class="text-gold text-2xl ancient-font">传统节日</div>
                    <button onclick="document.getElementById('cultureHistoryContainer').innerHTML=''" class="w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all">
                        <i class="fas fa-times text-gold"></i>
                    </button>
                </div>
                <div class="space-y-4">
                    ${historicalEvents.map(event => `
                        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                            <div class="flex items-center justify-between mb-2">
                                <div class="text-lg ancient-font text-gold">${event.title}</div>
                                <div class="text-xs text-bronze">${event.date}</div>
                            </div>
                            <div class="text-xs text-parchment/70 mb-2">${event.description}</div>
                            <div class="text-xs text-jade mb-2">${event.significance}</div>
                            <div class="flex flex-wrap gap-1">
                                ${event.customs.map(custom => `<span class="px-2 py-1 rounded bg-gold/10 text-gold/70 text-xs">${custom}</span>`).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
}

function showTraditionalCulture() {
    const container = document.getElementById('cultureHistoryContainer');
    let html = `
        <div class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onclick="this.innerHTML=''">
            <div class="max-w-4xl w-full max-h-[80vh] overflow-y-auto bg-gradient-to-br from-obsidian to-chaos rounded-2xl border-2 border-gold/30 p-6" onclick="event.stopPropagation()">
                <div class="flex items-center justify-between mb-6">
                    <div class="text-gold text-2xl ancient-font">传统艺术</div>
                    <button onclick="document.getElementById('cultureHistoryContainer').innerHTML=''" class="w-8 h-8 rounded-full bg-gold/10 hover:bg-gold/20 flex items-center justify-center transition-all">
                        <i class="fas fa-times text-gold"></i>
                    </button>
                </div>
                <div class="space-y-6">
    `;
    
    traditionalCulture.forEach(category => {
        html += `
            <div>
                <div class="text-jade text-lg mb-3">${category.category}</div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${category.items.map(item => `
                        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                            <div class="text-gold text-lg mb-2">${item.name}</div>
                            <div class="text-xs text-parchment/70 mb-2">${item.description}</div>
                            <div class="text-xs text-bronze mb-1">历史：${item.history}</div>
                            ${item.masters ? `<div class="text-xs text-jade">名家：${item.masters.join('、')}</div>` : ''}
                            ${item.types ? `<div class="text-xs text-jade">类型：${item.types.join('、')}</div>` : ''}
                            ${item.classics ? `<div class="text-xs text-jade">经典：${item.classics.join('、')}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    html += `</div></div></div>`;
    container.innerHTML = html;
}

function loadFengShuiModule(body) {
    body.innerHTML = `
        <div class="space-y-8">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">风水知识</div>
                <div class="text-parchment/60 text-sm">家居风水、办公风水、风水物品</div>
            </div>
            
            <div class="grid grid-cols-3 gap-4">
                <button onclick="showFengShuiCategory('家居风水')" class="p-4 rounded-xl bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all text-center">
                    <i class="fas fa-home text-2xl text-gold mb-2"></i>
                    <div class="text-gold text-sm">家居风水</div>
                </button>
                <button onclick="showFengShuiCategory('办公风水')" class="p-4 rounded-xl bg-jade/10 border border-jade/30 hover:bg-jade/20 transition-all text-center">
                    <i class="fas fa-building text-2xl text-jade mb-2"></i>
                    <div class="text-gold text-sm">办公风水</div>
                </button>
                <button onclick="showFengShuiCategory('风水物品')" class="p-4 rounded-xl bg-cinnabar/10 border border-cinnabar/30 hover:bg-cinnabar/20 transition-all text-center">
                    <i class="fas fa-gem text-2xl text-cinnabar mb-2"></i>
                    <div class="text-gold text-sm">风水物品</div>
                </button>
            </div>
            
            <div id="fengShuiContainer"></div>
        </div>
    `;
}

function showFengShuiCategory(categoryName) {
    const container = document.getElementById('fengShuiContainer');
    const category = fengShuiKnowledge.find(cat => cat.category === categoryName);
    
    if (!category) return;
    
    let html = `
        <div class="mt-6 p-6 rounded-xl bg-gold/5 border border-gold/20">
            <div class="text-gold text-xl mb-4">${categoryName}</div>
            <div class="space-y-4">
    `;
    
    category.principles.forEach(principle => {
        html += `
            <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                <div class="text-gold text-lg mb-2">${principle.name}</div>
                <div class="text-parchment/70 text-sm mb-3">${principle.description}</div>
                ${principle.tips ? `
                    <div class="space-y-1">
                        ${principle.tips.map(tip => `
                            <div class="text-xs text-jade">• ${tip}</div>
                        `).join('')}
                    </div>
                ` : ''}
                ${principle.usage ? `
                    <div class="text-xs text-parchment/60 mt-2">使用方法：${principle.usage}</div>
                ` : ''}
            </div>
        `;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function loadPhysiognomyModule(body) {
    body.innerHTML = `
        <div class="space-y-8">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">传统相术</div>
                <div class="text-parchment/60 text-sm">面相、手相、痣相、测字</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <button onclick="showFaceReading()" class="p-4 rounded-xl bg-gold/10 border border-gold/30 hover:bg-gold/20 transition-all text-center">
                    <i class="fas fa-user text-2xl text-gold mb-2"></i>
                    <div class="text-gold text-sm">面相</div>
                </button>
                <button onclick="showHandReading()" class="p-4 rounded-xl bg-jade/10 border border-jade/30 hover:bg-jade/20 transition-all text-center">
                    <i class="fas fa-hand-paper text-2xl text-jade mb-2"></i>
                    <div class="text-gold text-sm">手相</div>
                </button>
                <button onclick="showMolesReading()" class="p-4 rounded-xl bg-cinnabar/10 border border-cinnabar/30 hover:bg-cinnabar/20 transition-all text-center">
                    <i class="fas fa-circle text-2xl text-cinnabar mb-2"></i>
                    <div class="text-gold text-sm">痣相</div>
                </button>
                <button onclick="showCharacterDivination()" class="p-4 rounded-xl bg-azure/10 border border-azure/30 hover:bg-azure/20 transition-all text-center">
                    <i class="fas fa-font text-2xl text-azure mb-2"></i>
                    <div class="text-gold text-sm">测字</div>
                </button>
            </div>
            
            <div id="physiognomyContainer"></div>
        </div>
    `;
}

function showFaceReading() {
    const container = document.getElementById('physiognomyContainer');
    const parts = physiognomyKnowledge.faceReading;
    
    let html = `
        <div class="mt-6 space-y-4">
            <div class="text-gold text-lg mb-4">面相详解</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;
    
    parts.forEach(part => {
        html += `
            <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                <div class="text-gold text-lg mb-2">${part.part}</div>
                <div class="text-xs text-parchment/70 mb-2">${part.description}</div>
                <div class="space-y-1">
                    ${part.good.map(g => `<div class="text-xs text-jade">✓ ${g}</div>`).join('')}
                    ${part.bad.map(b => `<div class="text-xs text-cinnabar">✗ ${b}</div>`).join('')}
                </div>
            </div>
        `;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function showHandReading() {
    const container = document.getElementById('physiognomyContainer');
    const lines = physiognomyKnowledge.handReading;
    
    let html = `
        <div class="mt-6 space-y-4">
            <div class="text-gold text-lg mb-4">手相详解</div>
            <div class="grid grid-cols-1 gap-4">
    `;
    
    lines.forEach(line => {
        html += `
            <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                <div class="text-gold text-lg mb-2">${line.line}</div>
                <div class="text-xs text-parchment/70 mb-2">${line.description}</div>
                <div class="space-y-1">
                    ${line.good.map(g => `<div class="text-xs text-jade">✓ ${g}</div>`).join('')}
                    ${line.bad.map(b => `<div class="text-xs text-cinnabar">✗ ${b}</div>`).join('')}
                </div>
            </div>
        `;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function showMolesReading() {
    const container = document.getElementById('physiognomyContainer');
    const moles = physiognomyKnowledge.moles;
    
    let html = `
        <div class="mt-6 space-y-4">
            <div class="text-gold text-lg mb-4">痣相详解</div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
    `;
    
    moles.forEach(mole => {
        html += `
            <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                <div class="text-gold mb-1">${mole.position}</div>
                <div class="text-xs text-parchment/60 mb-2">${mole.meaning}</div>
                <div class="text-xs text-jade">吉：${mole.good}</div>
                <div class="text-xs text-cinnabar">凶：${mole.bad}</div>
            </div>
        `;
    });
    
    html += `</div></div>`;
    container.innerHTML = html;
}

function showCharacterDivination() {
    const container = document.getElementById('physiognomyContainer');
    const methods = characterDivination.methods;
    const chars = characterDivination.commonCharacters;
    
    let html = `
        <div class="mt-6 space-y-6">
            <div>
                <div class="text-gold text-lg mb-3">测字方法</div>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    ${methods.map(method => `
                        <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                            <div class="text-gold mb-2">${method.name}</div>
                            <div class="text-xs text-parchment/70 mb-2">${method.description}</div>
                            <div class="text-xs text-bronze">步骤：${method.steps.join('→')}</div>
                            <div class="text-xs text-jade mt-1">例：${method.example}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div>
                <div class="text-gold text-lg mb-3">常用字解析</div>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                    ${chars.map(char => `
                        <div class="p-3 rounded-xl bg-gold/10 border border-gold/30 text-center">
                            <div class="text-2xl ancient-font text-gold mb-1">${char.character}</div>
                            <div class="text-xs text-parchment/50 mb-1">${char.pinyin} | ${char.strokes}画</div>
                            <div class="text-xs text-jade mb-1">${char.meaning}</div>
                            <div class="text-xs text-parchment/60">${char.divination}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

window.loadFoundationTheoryModule = loadFoundationTheoryModule;
window.loadCultureHistoryModule = loadCultureHistoryModule;
window.loadFengShuiModule = loadFengShuiModule;
window.loadPhysiognomyModule = loadPhysiognomyModule;
