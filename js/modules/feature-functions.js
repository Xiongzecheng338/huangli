function loadCalendarContent(container) {
    const today = new Date(); 
    const year = today.getFullYear(); 
    const month = today.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); 
    const totalDays = new Date(year, month + 1, 0).getDate();
    let html = `<div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20"><div class="text-center mb-4"><div class="ancient-font text-2xl text-gold">${getGanZhiYear(year)}年</div><div class="text-bronze">${year}年${month + 1}月</div></div><div class="grid grid-cols-7 gap-1 text-center text-sm mb-2"><div class="text-cinnabar">日</div><div class="text-gold/70">一</div><div class="text-gold/70">二</div><div class="text-gold/70">三</div><div class="text-gold/70">四</div><div class="text-gold/70">五</div><div class="text-cinnabar">六</div></div><div class="grid grid-cols-7 gap-1">`;
    for (let i = 0; i < firstDay; i++) html += '<div class="aspect-square"></div>';
    for (let day = 1; day <= totalDays; day++) {
        const isToday = day === today.getDate();
        const lunar = solarToLunar(year, month + 1, day);
        html += `<div class="aspect-square rounded-lg p-1 flex flex-col items-center justify-center cursor-pointer ${isToday ? 'bg-cinnabar/30 border border-cinnabar' : 'bg-obsidian/30 hover:bg-gold/10'}"><span class="text-xs ${isToday ? 'text-gold' : 'text-parchment'}">${day}</span><span class="text-xs text-gold/50">${lunarDays[lunar.day - 1]}</span></div>`;
    }
    html += '</div></div>'; 
    container.innerHTML = html;
}

function loadFortuneContent(container) {
    const today = new Date();
    const yiji = generateYiJi(today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate());
    container.innerHTML = `<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="p-5 rounded-xl bg-jade/10 border border-jade/30"><div class="text-jade text-lg mb-3">宜</div><div class="flex flex-wrap gap-2">${yiji.yi.map(y => `<span class="px-3 py-1 rounded-lg bg-jade/20 text-jade/90 text-sm">${createTooltip(y)}</span>`).join('')}</div></div>
        <div class="p-5 rounded-xl bg-cinnabar/10 border border-cinnabar/30"><div class="text-cinnabar text-lg mb-3">忌</div><div class="flex flex-wrap gap-2">${yiji.ji.map(j => `<span class="px-3 py-1 rounded-lg bg-cinnabar/20 text-cinnabar/90 text-sm">${createTooltip(j)}</span>`).join('')}</div></div>
    </div>`;
}

function loadBaziContent(container) {
    container.innerHTML = `<div class="space-y-4"><div class="grid grid-cols-2 gap-4"><div><label class="text-parchment/70 text-sm block mb-2">出生日期</label><input type="date" id="baziDate" class="w-full bg-obsidian/50 border border-gold/30 rounded-xl px-4 py-3 text-parchment focus:border-gold focus:outline-none"></div><div><label class="text-parchment/70 text-sm block mb-2">出生时辰</label><select id="baziHour" class="w-full bg-obsidian/50 border border-gold/30 rounded-xl px-4 py-3 text-parchment focus:border-gold focus:outline-none">${diZhi.map((z, i) => `<option value="${i}">${z}时</option>`).join('')}</select></div></div><button onclick="calcBazi()" class="w-full py-3 rounded-xl bg-gradient-to-r from-gold/30 to-bronze/30 border border-gold/50 text-gold hover:from-gold/40 hover:to-bronze/40 transition-all">开始推算</button><div id="baziResult"></div></div>`;
}

function calcBazi() {
    const dateVal = document.getElementById('baziDate').value; 
    const hourVal = parseInt(document.getElementById('baziHour').value);
    if (!dateVal) { alert('请选择日期'); return; }
    const date = new Date(dateVal); 
    const lunar = solarToLunar(date.getFullYear(), date.getMonth() + 1, date.getDate());
    const yearGan = tianGan[(lunar.year - 4) % 10]; 
    const yearZhi = diZhi[(lunar.year - 4) % 12];
    const monthGan = tianGan[(lunar.year * 12 + lunar.month + 2) % 10]; 
    const monthZhi = diZhi[(lunar.month + 1) % 12];
    const dayGan = tianGan[(date.getDate() + 5) % 10]; 
    const dayZhi = diZhi[(date.getDate() + 5) % 12];
    const hourGan = tianGan[(date.getDate() * 2 + hourVal) % 10]; 
    const hourZhi = diZhi[hourVal];
    document.getElementById('baziResult').innerHTML = `<div class="grid grid-cols-4 gap-3 mt-4">${[ {t:'年', v: yearGan+yearZhi}, {t:'月', v: monthGan+monthZhi}, {t:'日', v: dayGan+dayZhi}, {t:'时', v: hourGan+hourZhi} ].map(c => `<div class="p-4 rounded-xl bg-gold/10 border border-gold/30 text-center"><div class="text-bronze text-xs">${c.t}柱</div><div class="ancient-font text-2xl text-gold">${c.v}</div></div>`).join('')}</div>`;
}

function loadNameContent(container) {
    container.innerHTML = `<div class="space-y-4"><input type="text" id="nameInput" placeholder="请输入姓名" maxlength="4" class="w-full bg-obsidian/50 border border-gold/30 rounded-xl px-4 py-4 text-parchment text-center text-xl focus:border-gold focus:outline-none"><button onclick="calcName()" class="w-full py-3 rounded-xl bg-gradient-to-r from-gold/30 to-bronze/30 border border-gold/50 text-gold hover:from-gold/40 hover:to-bronze/40 transition-all">开始测算</button><div id="nameResult"></div></div>`;
}

function calcName() {
    const name = document.getElementById('nameInput').value.trim(); 
    if (name.length < 2) { alert('请输入至少2个字'); return; }
    const score = Math.floor(Math.random() * 20) + 80;
    document.getElementById('nameResult').innerHTML = `<div class="text-center p-5 rounded-xl bg-gold/10 border border-gold/30 mt-4"><div class="text-gold text-lg mb-2">姓名评分</div><div class="ancient-font text-5xl text-gold text-glow">${score}</div><div class="text-bronze mt-2">${score >= 90 ? '上上签' : '上签'}</div></div>`;
}

function loadDreamContent(container) {
    container.innerHTML = `<div class="space-y-4"><input type="text" id="dreamInput" placeholder="请输入梦境关键词（如：水、龙、蛇）" class="w-full bg-obsidian/50 border border-gold/30 rounded-xl px-4 py-4 text-parchment text-center text-xl focus:border-gold focus:outline-none"><button onclick="interpDream()" class="w-full py-3 rounded-xl bg-gradient-to-r from-gold/30 to-bronze/30 border border-gold/50 text-gold hover:from-gold/40 hover:to-bronze/40 transition-all">解梦</button><div id="dreamResult"></div></div>`;
}

function interpDream() {
    const keyword = document.getElementById('dreamInput').value.trim(); 
    if (!keyword) { alert('请输入关键词'); return; }
    const found = dreamDict.find(d => keyword.includes(d.keyword)) || { keyword: keyword, meaning: '此梦寓意深远，需结合个人实际情况解读。', detail: '梦境往往反映内心深处的想法和担忧。建议保持平和心态。' };
    document.getElementById('dreamResult').innerHTML = `<div class="p-5 rounded-xl bg-obsidian/50 border border-gold/20 mt-4"><div class="text-gold text-center text-lg mb-2">${found.meaning}</div><div class="text-parchment/60 text-sm text-center">${found.detail}</div></div>`;
}

function loadLiuyaoContent(container) {
    container.innerHTML = `<div class="text-center space-y-4"><div class="text-parchment/70">请默念你的问题，点击下方铜钱起卦</div><div id="liuyaoCoins" class="flex justify-center space-x-4 text-4xl text-gold/80"><i class="fas fa-circle"></i><i class="fas fa-circle"></i><i class="fas fa-circle"></i></div><button onclick="performLiuyao()" class="px-8 py-3 rounded-xl bg-gradient-to-r from-gold/30 to-bronze/30 border border-gold/50 text-gold">起卦</button><div id="liuyaoResult" class="mt-4"></div></div>`;
}

function performLiuyao() {
    const gua = [];
    for(let i=0; i<6; i++) {
        gua.push(Math.random() > 0.5 ? '—' : '- -');
    }
    document.getElementById('liuyaoResult').innerHTML = `<div class="p-4 rounded-xl bg-gold/10 border border-gold/30 inline-block mx-auto"><div class="flex flex-col space-y-1 text-2xl text-gold">${gua.map(l => `<div>${l}</div>`).join('')}</div></div><div class="text-parchment/70 text-sm mt-2">此卦象暗示：顺势而为，静待时机。</div>`;
}

function loadTarotContent(container) {
    const cards = ['愚者', '魔术师', '女祭司', '女皇', '皇帝', '教皇', '恋人', '战车', '力量', '隐士', '命运之轮', '正义', '倒吊人', '死神', '节制', '恶魔', '塔', '星星', '月亮', '太阳', '审判', '世界'];
    container.innerHTML = `<div class="text-center space-y-4"><div class="text-parchment/70">请静心冥想，选择一张牌</div><div id="tarotCards" class="grid grid-cols-3 gap-4">${Array.from({length: 6}).map(() => `<div onclick="revealTarot()" class="aspect-square rounded-xl bg-gradient-to-br from-mystic to-obsidian border border-gold/30 flex items-center justify-center cursor-pointer hover:border-gold transition-all"><i class="fas fa-star text-gold text-2xl"></i></div>`).join('')}</div><div id="tarotResult"></div></div>`;
}

function revealTarot() {
    const cards = ['愚者', '魔术师', '女祭司', '女皇', '皇帝', '教皇', '恋人', '战车', '力量', '隐士', '命运之轮', '正义', '倒吊人', '死神', '节制', '恶魔', '塔', '星星', '月亮', '太阳', '审判', '世界'];
    const meanings = ['新的开始', '创造力', '直觉', '丰盛', '权威', '传统', '选择', '胜利', '勇气', '内省', '命运', '公正', '牺牲', '结束', '平衡', '诱惑', '突变', '希望', '幻觉', '快乐', '觉醒', '完成'];
    const idx = Math.floor(Math.random() * cards.length);
    document.getElementById('tarotResult').innerHTML = `<div class="p-6 rounded-xl bg-gold/10 border border-gold/30 mt-4"><div class="ancient-font text-3xl text-gold mb-2">${cards[idx]}</div><div class="text-parchment">${meanings[idx]}</div></div>`;
}

function loadFengshuiContent(container) {
    container.innerHTML = `<div class="flex justify-center mb-6"><div class="relative w-64 h-64"><div class="absolute inset-0 rounded-full border-2 border-gold/30 bagua-rotate"><svg viewBox="0 0 200 200" class="w-full h-full"><text x="100" y="15" text-anchor="middle" fill="#D4AF37" font-size="14">南</text><text x="190" y="105" text-anchor="middle" fill="#D4AF37" font-size="14">西</text><text x="100" y="195" text-anchor="middle" fill="#D4AF37" font-size="14">北</text><text x="10" y="105" text-anchor="middle" fill="#D4AF37" font-size="14">东</text></svg></div><div class="absolute inset-12 rounded-full border border-gold/20 flex items-center justify-center"><div class="text-center"><div class="text-xs text-bronze">今日吉方</div><div class="ancient-font text-2xl text-gold">东南</div></div></div></div></div><div class="grid grid-cols-2 gap-4"><div class="p-4 rounded-xl bg-jade/10 border border-jade/30 text-center"><div class="text-jade text-sm">财神方位</div><div class="text-gold text-lg">正南</div></div><div class="p-4 rounded-xl bg-jade/10 border border-jade/30 text-center"><div class="text-jade text-sm">喜神方位</div><div class="text-gold text-lg">东南</div></div></div>`;
}

document.addEventListener('DOMContentLoaded', function() { 
    createParticles('chaosParticles', 150); 
});
