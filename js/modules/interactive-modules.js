function loadAdvancedNameModule(body) {
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">姓名测算</div>
                <div class="text-parchment/60 text-sm">基于传统姓名学，分析五格数理与三才配置</div>
            </div>
            
            <div class="p-6 rounded-xl bg-obsidian/50 border border-gold/20">
                <div class="mb-4">
                    <label class="text-parchment/70 text-sm block mb-2">请输入姓名</label>
                    <input type="text" id="advNameInput" placeholder="2-4 个汉字" maxlength="4" 
                        class="w-full bg-obsidian/70 border border-gold/30 rounded-xl px-4 py-3 text-parchment text-center text-xl focus:border-gold focus:outline-none">
                </div>
                <button onclick="analyzeAdvancedName()" 
                    class="w-full py-3 rounded-xl bg-gradient-to-r from-gold/30 to-bronze/30 border border-gold/50 text-gold hover:from-gold/40 hover:to-bronze/40 transition-all">
                    开始测算
                </button>
            </div>
            
            <div id="advNameResult"></div>
            
            <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
                <div class="text-gold text-sm mb-2">姓名学小知识</div>
                <div class="text-parchment/60 text-xs space-y-1">
                    <div>• 天格：代表祖业、长辈、上司</div>
                    <div>• 人格：主运，影响一生命运</div>
                    <div>• 地格：前运，影响中年时期</div>
                    <div>• 外格：副运，影响社交关系</div>
                    <div>• 总格：总运，影响晚年运势</div>
                </div>
            </div>
        </div>
    `;
}

function analyzeAdvancedName() {
    const name = document.getElementById('advNameInput').value.trim();
    if (!name || name.length < 2) {
        InteractionManager.showToast('请输入至少 2 个字的姓名', 'warning');
        return;
    }
    
    const result = NameAnalyzer.calculateNameScore(name);
    NameAnalyzer.renderNameAnalysis(result, document.getElementById('advNameResult'));
    InteractionManager.showToast('测算完成', 'success');
}

function loadMatchModule(body) {
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">姓名配对</div>
                <div class="text-parchment/60 text-sm">测试你们的缘分指数</div>
                <div class="text-cinnabar/50 text-xs mt-1">※ 仅供娱乐参考</div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                    <label class="text-parchment/70 text-sm block mb-2">你的名字</label>
                    <input type="text" id="matchName1" placeholder="姓名" maxlength="4" 
                        class="w-full bg-obsidian/70 border border-gold/30 rounded-xl px-3 py-2 text-parchment text-center focus:border-gold focus:outline-none">
                </div>
                <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                    <label class="text-parchment/70 text-sm block mb-2">TA 的名字</label>
                    <input type="text" id="matchName2" placeholder="姓名" maxlength="4" 
                        class="w-full bg-obsidian/70 border border-gold/30 rounded-xl px-3 py-2 text-parchment text-center focus:border-gold focus:outline-none">
                </div>
            </div>
            
            <button onclick="analyzeMatch()" 
                class="w-full py-3 rounded-xl bg-gradient-to-r from-cinnabar/30 to-gold/30 border border-cinnabar/50 text-gold hover:from-cinnabar/40 hover:to-gold/40 transition-all">
                <i class="fas fa-heart mr-2"></i>测试缘分
            </button>
            
            <div id="matchResult"></div>
        </div>
    `;
}

function analyzeMatch() {
    const name1 = document.getElementById('matchName1').value.trim();
    const name2 = document.getElementById('matchName2').value.trim();
    
    if (!name1 || !name2) {
        InteractionManager.showToast('请输入两个人的姓名', 'warning');
        return;
    }
    
    const result = MatchMaker.calculateCompatibility(name1, name2);
    MatchMaker.renderMatchResult(result, document.getElementById('matchResult'));
    InteractionManager.showToast('配对完成', 'success');
}

function loadCareerModule(body) {
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">事业方向</div>
                <div class="text-parchment/60 text-sm">根据八字五行，找到适合你的行业</div>
            </div>
            
            <div class="p-6 rounded-xl bg-obsidian/50 border border-gold/20">
                <div class="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <label class="text-parchment/70 text-sm block mb-2">出生日期</label>
                        <input type="date" id="careerDate" 
                            class="w-full bg-obsidian/70 border border-gold/30 rounded-xl px-3 py-2 text-parchment focus:border-gold focus:outline-none">
                    </div>
                    <div>
                        <label class="text-parchment/70 text-sm block mb-2">出生时辰</label>
                        <select id="careerHour" 
                            class="w-full bg-obsidian/70 border border-gold/30 rounded-xl px-3 py-2 text-parchment focus:border-gold focus:outline-none">
                            ${diZhi.map((z, i) => `<option value="${i}">${z}时</option>`).join('')}
                        </select>
                    </div>
                </div>
                <button onclick="analyzeCareer()" 
                    class="w-full py-3 rounded-xl bg-gradient-to-r from-gold/30 to-bronze/30 border border-gold/50 text-gold hover:from-gold/40 hover:to-bronze/40 transition-all">
                    分析事业方向
                </button>
            </div>
            
            <div id="careerResult"></div>
        </div>
    `;
}

function analyzeCareer() {
    const dateVal = document.getElementById('careerDate').value;
    const hourVal = parseInt(document.getElementById('careerHour').value);
    
    if (!dateVal) {
        InteractionManager.showToast('请选择出生日期', 'warning');
        return;
    }
    
    const date = new Date(dateVal);
    const lunar = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    
    const bazi = BaziCalculator.calculateBazi({
        year: lunar.year,
        month: lunar.month,
        day: lunar.day,
        hour: hourVal
    });
    
    const result = CareerAdvisor.findSuitableCareers(bazi);
    CareerAdvisor.renderCareerAdvice(result, document.getElementById('careerResult'));
    InteractionManager.showToast('分析完成', 'success');
}

function loadDailyWisdomModule(body) {
    const today = new Date();
    const quote = dailyQuotes[Math.floor(Math.random() * dailyQuotes.length)];
    const advancedQuote = advancedClassics[0].quotes[Math.floor(Math.random() * advancedClassics[0].quotes.length)];
    
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">每日智慧</div>
                <div class="text-parchment/60 text-sm">${formatDate(today)}</div>
            </div>
            
            <div class="p-6 rounded-xl bg-gradient-to-br from-gold/10 to-bronze/10 border border-gold/30">
                <div class="text-center">
                    <i class="fas fa-quote-left text-gold/30 text-4xl mb-4"></i>
                    <div class="text-gold text-xl ancient-font mb-3">${advancedQuote.text}</div>
                    <div class="text-parchment/60 text-sm mb-2">—— ${advancedQuote.explain}</div>
                    <div class="text-bronze text-xs">${advancedQuote.source}</div>
                </div>
            </div>
            
            <div class="grid grid-cols-2 gap-4">
                <div class="p-4 rounded-xl bg-jade/10 border border-jade/30">
                    <div class="text-jade text-sm mb-2">今日宜</div>
                    <div class="text-parchment text-xs">学习、思考、修身养性</div>
                </div>
                <div class="p-4 rounded-xl bg-cinnabar/10 border border-cinnabar/30">
                    <div class="text-cinnabar text-sm mb-2">今日忌</div>
                    <div class="text-parchment text-xs">急躁、冲动、与人争执</div>
                </div>
            </div>
            
            <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
                <div class="text-gold text-sm mb-2">修身建议</div>
                <div class="text-parchment/70 text-xs">
                    每日诵读经典，涵养心性；行善积德，广结善缘；
                    早睡早起，养生保健；知足常乐，心安自在。
                </div>
            </div>
        </div>
    `;
}

function loadLuckyDrawModule(body) {
    const prizes = [
        { name: '上上签', probability: 0.05, color: 'text-gold', desc: '大吉大利，万事亨通' },
        { name: '上吉', probability: 0.15, color: 'text-jade', desc: '吉星高照，顺势而为' },
        { name: '中吉', probability: 0.30, color: 'text-azure', desc: '平稳安康，小有所获' },
        { name: '小吉', probability: 0.30, color: 'text-bronze', desc: '平平淡淡，无灾无难' },
        { name: '平', probability: 0.20, color: 'text-parchment', desc: '守成为上，静待时机' }
    ];
    
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">每日一签</div>
                <div class="text-parchment/60 text-sm">诚心默念问题，抽取今日运势</div>
            </div>
            
            <div class="text-center">
                <div id="qianTong" class="w-32 h-32 mx-auto rounded-full bg-gradient-to-br from-gold/30 to-bronze/30 border-2 border-gold/50 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform" onclick="drawLottery()">
                    <i class="fas fa-scroll text-5xl text-gold"></i>
                </div>
                <div class="text-parchment/50 text-xs mt-4">点击签筒抽签</div>
            </div>
            
            <div id="lotteryResult" class="hidden">
                <div class="p-6 rounded-xl bg-gradient-to-br from-gold/20 to-bronze/20 border border-gold/30 text-center">
                    <div class="text-gold text-lg mb-2">你抽到了</div>
                    <div id="lotteryName" class="ancient-font text-4xl text-gold mb-2"></div>
                    <div id="lotteryDesc" class="text-parchment/70 text-sm"></div>
                </div>
            </div>
        </div>
    `;
}

function drawLottery() {
    const prizes = [
        { name: '上上签', probability: 0.05, desc: '大吉大利，万事亨通。今日运势极佳，可大胆行动，把握良机！' },
        { name: '上吉', probability: 0.15, desc: '吉星高照，顺势而为。运势旺盛，适合推进重要事务。' },
        { name: '中吉', probability: 0.30, desc: '平稳安康，小有所获。运势平稳，按部就班即可。' },
        { name: '小吉', probability: 0.30, desc: '平平淡淡，无灾无难。宜守不宜攻，保持现状为佳。' },
        { name: '平', probability: 0.20, desc: '守成为上，静待时机。韬光养晦，积蓄力量。' }
    ];
    
    const rand = Math.random();
    let cumulative = 0;
    let selected = prizes[prizes.length - 1];
    
    for (const prize of prizes) {
        cumulative += prize.probability;
        if (rand <= cumulative) {
            selected = prize;
            break;
        }
    }
    
    document.getElementById('lotteryName').textContent = selected.name;
    document.getElementById('lotteryDesc').textContent = selected.desc;
    document.getElementById('lotteryResult').classList.remove('hidden');
    
    InteractionManager.showConfetti(document.getElementById('qianTong'));
    InteractionManager.showToast(`抽到${selected.name}`, 'success');
}

function loadShichenModule(body) {
    const currentHour = new Date().getHours();
    const currentShichen = twelveShichen.find(s => {
        const [start] = s.time.split('-')[0].split(':').map(Number);
        return currentHour >= start || (start === 23 && currentHour >= 23);
    }) || twelveShichen[0];
    
    body.innerHTML = `
        <div class="space-y-6">
            <div class="text-center mb-6">
                <div class="text-gold text-2xl ancient-font mb-2">十二时辰</div>
                <div class="text-parchment/60 text-sm">古代计时智慧，顺应天时养生</div>
            </div>
            
            <div class="p-6 rounded-xl bg-gradient-to-br from-${currentShichen.element === '木' ? 'jade' : currentShichen.element === '火' ? 'cinnabar' : currentShichen.element === '土' ? 'bronze' : currentShichen.element === '金' ? 'gold' : 'azure'}/10 to-obsidian/50 border border-gold/20">
                <div class="text-center mb-4">
                    <div class="text-parchment/60 text-sm mb-2">当前时辰</div>
                    <div class="ancient-font text-4xl text-gold mb-2">${currentShichen.name}</div>
                    <div class="text-bronze">${currentShichen.time}</div>
                </div>
                <div class="grid grid-cols-2 gap-3 text-sm">
                    <div class="text-parchment/70">生肖：<span class="text-gold">${currentShichen.animal}</span></div>
                    <div class="text-parchment/70">五行：<span class="text-gold">${currentShichen.element}</span></div>
                    <div class="text-parchment/70">宜：<span class="text-jade">${currentShichen.activity}</span></div>
                    <div class="text-parchment/70">忌：<span class="text-cinnabar">${currentShichen.taboo}</span></div>
                </div>
                <div class="mt-4 p-3 rounded-lg bg-obsidian/50 border border-gold/20">
                    <div class="text-parchment/60 text-xs">${currentShichen.description}</div>
                </div>
            </div>
            
            <div class="grid grid-cols-3 gap-2">
                ${twelveShichen.map(shichen => `
                    <div class="p-3 rounded-lg ${shichen.name === currentShichen.name ? 'bg-gold/20 border border-gold/40' : 'bg-obsidian/50 border border-gold/20'} text-center cursor-pointer hover:scale-105 transition-transform" onclick="showShichenDetail('${shichen.name}')">
                        <div class="text-gold text-sm">${shichen.name}</div>
                        <div class="text-parchment/50 text-xs">${shichen.time.split('-')[0]}</div>
                    </div>
                `).join('')}
            </div>
            
            <div id="shichenDetail"></div>
        </div>
    `;
}

function showShichenDetail(name) {
    const shichen = twelveShichen.find(s => s.name === name);
    const container = document.getElementById('shichenDetail');
    
    container.innerHTML = `
        <div class="mt-4 p-4 rounded-xl bg-gold/5 border border-gold/20">
            <div class="text-gold text-lg mb-2">${shichen.name}详解</div>
            <div class="text-parchment/70 text-sm space-y-2">
                <div>时间：${shichen.time}</div>
                <div>生肖：${shichen.animal} | 五行：${shichen.element} | 阴阳：${shichen.yinyang}</div>
                <div>养生：${shichen.health}</div>
                <div>宜：${shichen.activity}</div>
                <div>忌：${shichen.taboo}</div>
                <div class="mt-2 text-parchment/60">${shichen.description}</div>
            </div>
        </div>
    `;
}

window.loadAdvancedNameModule = loadAdvancedNameModule;
window.loadMatchModule = loadMatchModule;
window.loadCareerModule = loadCareerModule;
window.loadDailyWisdomModule = loadDailyWisdomModule;
window.loadLuckyDrawModule = loadLuckyDrawModule;
window.loadShichenModule = loadShichenModule;
window.drawLottery = drawLottery;
window.showShichenDetail = showShichenDetail;
