function loadSubModule(name) {
    const container = document.getElementById('subModuleContent');
    if(!container) return;
    container.innerHTML = '<div class="text-center text-gold/50 py-8"><i class="fas fa-spinner fa-spin text-2xl"></i></div>';
    setTimeout(() => {
        switch(name) {
            case 'calendar': loadCalendarContent(container); break;
            case 'fortune': loadFortuneContent(container); break;
            case 'bazi': loadBaziContent(container); break;
            case 'name': loadNameContent(container); break;
            case 'dream': loadDreamContent(container); break;
            case 'liuyao': loadLiuyaoContent(container); break;
            case 'tarot': loadTarotContent(container); break;
            case 'fengshui': loadFengshuiContent(container); break;
            default: container.innerHTML = '<div class="text-center text-parchment/50 py-8">功能已就绪</div>';
        }
    }, 300);
}

function loadTianshiModule(body) {
    body.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button onclick="loadSubModule('calendar')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-calendar-alt text-3xl text-gold mb-2"></i><div class="text-gold ancient-font text-lg">万年历</div></button>
        <button onclick="loadSubModule('fortune')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-star text-3xl text-gold mb-2"></i><div class="text-gold ancient-font text-lg">每日运势</div></button>
        <button onclick="loadSubModule('luckyday')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-calendar-check text-3xl text-gold mb-2"></i><div class="text-gold ancient-font text-lg">择吉日</div></button>
    </div><div id="subModuleContent" class="mt-6"></div>`;
}

function loadDiliModule(body) {
    body.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button onclick="loadSubModule('fengshui')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-compass text-3xl text-jade mb-2"></i><div class="text-gold ancient-font text-lg">风水罗盘</div></button>
        <button onclick="loadSubModule('direction')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-location-arrow text-3xl text-jade mb-2"></i><div class="text-gold ancient-font text-lg">吉神方位</div></button>
    </div><div id="subModuleContent" class="mt-6"></div>`;
}

function loadRenheModule(body) {
    body.innerHTML = `<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <button onclick="loadSubModule('bazi')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-yin-yang text-3xl text-gold mb-2"></i><div class="text-gold ancient-font text-lg">八字算命</div></button>
        <button onclick="loadSubModule('name')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-signature text-3xl text-gold mb-2"></i><div class="text-gold ancient-font text-lg">姓名测算</div></button>
    </div><div id="subModuleContent" class="mt-6"></div>`;
}

function loadXuanjiModule(body) {
    body.innerHTML = `<div class="grid grid-cols-3 gap-4">
        <button onclick="loadSubModule('dream')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-moon text-3xl text-gold mb-2"></i><div class="text-gold ancient-font text-lg">解梦</div></button>
        <button onclick="loadSubModule('liuyao')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-coins text-3xl text-gold mb-2"></i><div class="text-gold ancient-font text-lg">六爻</div></button>
        <button onclick="loadSubModule('tarot')" class="jade-pendant p-6 text-center hover:scale-105 transition-transform"><i class="fas fa-cards text-3xl text-gold mb-2"></i><div class="text-gold ancient-font text-lg">塔罗</div></button>
    </div><div id="subModuleContent" class="mt-6"></div>`;
}
