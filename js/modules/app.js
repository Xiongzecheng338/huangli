function enterApp() {
    const chaos = document.getElementById('chaosEntry');
    const main = document.getElementById('mainApp');
    chaos.style.transition = 'opacity 1s';
    chaos.style.opacity = '0';
    setTimeout(() => {
        chaos.classList.add('hidden');
        main.classList.remove('hidden');
        main.style.animation = 'fadeIn 1s ease-out';
        createParticles('bgStars', 150);
        
        // 初始化新模块
        if (typeof ConfigManager !== 'undefined') {
            ConfigManager.init();
        }
        if (typeof ErrorHandler !== 'undefined') {
            ErrorHandler.init();
        }
        
        updateMainInfo();
    }, 500);
}

function updateMainInfo() {
    const today = new Date();
    const lunar = solarToLunar(today.getFullYear(), today.getMonth() + 1, today.getDate());
    const yiji = generateYiJi(today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate());
    const gua = getTodayGua(today);

    document.getElementById('headerDate').textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
    document.getElementById('headerLunar').textContent = `农历${getGanZhiYear(lunar.year)}年 ${lunarMonths[lunar.month - 1]}月${lunarDays[lunar.day - 1]}`;
    document.getElementById('todaySolar').textContent = `${today.getMonth() + 1}月${today.getDate()}日`;
    document.getElementById('todayLunar').textContent = `${getGanZhiYear(lunar.year)}年 ${lunarMonths[lunar.month - 1]}月${lunarDays[lunar.day - 1]}`;
    document.getElementById('todayGua').textContent = gua;
    document.getElementById('todayGuaName').textContent = baguaName[gua];
    
    document.getElementById('quickYi').innerHTML = yiji.yi.slice(0, 2).map(y => createTooltip(y)).join(' ');
    document.getElementById('quickJi').innerHTML = yiji.ji.slice(0, 2).map(j => createTooltip(j)).join(' ');
    
    const quoteIndex = (today.getDate()) % quotes.length;
    document.getElementById('dailyQuote').textContent = `"${quotes[quoteIndex].text}"`;
}
