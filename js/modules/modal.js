function openModule(moduleName) {
    const overlay = document.getElementById('modalOverlay');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    overlay.classList.remove('hidden'); 
    body.scrollTop = 0;
    
    const modules = {
        'tianshi': { title: '天时 · 历法卦象', loader: loadTianshiModule },
        'dili': { title: '地利 · 风水方位', loader: loadDiliModule },
        'renhe': { title: '人和 · 命理运势', loader: loadRenheModule },
        'xuanji': { title: '玄机 · 占卜解梦', loader: loadXuanjiModule },
        'cosmos': { title: '道法自然 · 宇宙演化', loader: loadCosmosModule },
        'myth': { title: '神话传说', loader: loadMythModule },
        'health': { title: '养生之道', loader: loadHealthModule },
        'culture': { title: '国学经典', loader: loadCultureModule },
        'history': { title: '历史今日', loader: loadHistoryModule },
        'festival': { title: '节日节气', loader: loadFestivalModule },
        'foundation': { title: '基础理论', loader: loadFoundationTheoryModule },
        'culture-history': { title: '历史文化', loader: loadCultureHistoryModule },
        'fengshui': { title: '风水知识', loader: loadFengShuiModule },
        'physiognomy': { title: '传统相术', loader: loadPhysiognomyModule },
        'daily-fortune': { title: '每日运势详解', loader: loadDailyFortuneModule },
        'checkin': { title: '每日签到', loader: loadCheckInModule },
        'fortune-record': { title: '运势记录', loader: loadFortuneRecordModule },
        'user-center': { title: '个人中心', loader: loadUserCenterModule },
        'advanced-name': { title: '姓名测算', loader: loadAdvancedNameModule },
        'match': { title: '姓名配对', loader: loadMatchModule },
        'career': { title: '事业方向', loader: loadCareerModule },
        'daily-wisdom': { title: '每日智慧', loader: loadDailyWisdomModule },
        'lucky-draw': { title: '每日一签', loader: loadLuckyDrawModule },
        'shichen': { title: '十二时辰', loader: loadShichenModule },
        // 新增功能模块
        'settings': { title: '应用设置', loader: (body) => { body.innerHTML = '<div id="settingsContainer"></div>'; setTimeout(() => SettingsModule.init(), 100); } },
        'almanac': { title: '万年历', loader: (body) => { body.innerHTML = '<div id="almanacContainer"></div>'; setTimeout(() => AlmanacModule.init(), 100); } },
        'date-selection': { title: '择吉日', loader: (body) => { body.innerHTML = '<div id="dateSelectionContainer"></div>'; setTimeout(() => DateSelectionModule.init(), 100); } },
        'achievements': { title: '成就系统', loader: (body) => { body.innerHTML = '<div id="achievementContainer"></div>'; setTimeout(() => AchievementSystem.init(), 100); } }
    };
    const mod = modules[moduleName];
    if (mod) { 
        title.textContent = mod.title; 
        mod.loader(body); 
    }
}

function closeModal() { 
    document.getElementById('modalOverlay').classList.add('hidden'); 
}

document.getElementById('modalOverlay').addEventListener('click', function(e) { 
    if (e.target === this) closeModal(); 
});
