function getLunarMonthDays(year, month) { 
    return (lunarInfo[year - 1900] & (0x10000 >> month)) ? 30 : 29; 
}

function getLunarYearDays(year) { 
    let sum = 348; 
    for (let i = 0x8000; i > 0x8; i >>= 1) 
        sum += (lunarInfo[year - 1900] & i) ? 1 : 0; 
    return sum + getLeapMonthDays(year); 
}

function getLeapMonth(year) { 
    return lunarInfo[year - 1900] & 0xf; 
}

function getLeapMonthDays(year) { 
    return getLeapMonth(year) ? ((lunarInfo[year - 1900] & 0x10000) ? 30 : 29) : 0; 
}

function solarToLunar(year, month, day) {
    const baseDate = new Date(1900, 0, 31); 
    const targetDate = new Date(year, month - 1, day);
    let offset = Math.floor((targetDate - baseDate) / 86400000);
    let lunarYear = 1900, lunarMonth = 1, lunarDay = 1, isLeap = false;
    while (lunarYear < 2100 && offset > 0) { 
        const yearDays = getLunarYearDays(lunarYear); 
        if (offset < yearDays) break; 
        offset -= yearDays; 
        lunarYear++; 
    }
    const leapMonth = getLeapMonth(lunarYear);
    for (let i = 1; i <= 12; i++) {
        let monthDays;
        if (leapMonth > 0 && i === leapMonth + 1 && !isLeap) { 
            monthDays = getLeapMonthDays(lunarYear); 
            isLeap = true; 
            i--; 
        } else { 
            monthDays = getLunarMonthDays(lunarYear, i); 
            isLeap = false; 
        }
        if (offset < monthDays) { 
            lunarMonth = i; 
            break; 
        } 
        offset -= monthDays;
    }
    lunarDay = offset + 1; 
    return { year: lunarYear, month: lunarMonth, day: lunarDay, isLeap: isLeap };
}

function getGanZhiYear(year) { 
    return tianGan[(year - 4) % 10] + diZhi[(year - 4) % 12]; 
}

function getZodiac(year) { 
    return shengXiao[(year - 4) % 12]; 
}

function generateYiJi(seed) {
    const random = (s) => Math.sin(s) * 10000 - Math.floor(Math.sin(s) * 10000);
    return {
        yi: [...yiItems].sort(() => random(seed + 2) - 0.5).slice(0, Math.floor(random(seed) * 5) + 4),
        ji: [...jiItems].sort(() => random(seed + 3) - 0.5).slice(0, Math.floor(random(seed + 1) * 4) + 2)
    };
}

function getTodayGua(date) { 
    const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate(); 
    return bagua[Math.abs(Math.floor((Math.sin(seed) * 10000) % 8))]; 
}

function createTooltip(text) {
    const term = termsExplanation[text];
    if (term) {
        return `<span class="tooltip">${text}<span class="tooltip-text">${term}</span></span>`;
    }
    return text;
}
