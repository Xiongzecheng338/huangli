const CacheManager = {
    set(key, value, expireTime = 3600000) {
        const data = {
            value: value,
            timestamp: Date.now(),
            expireTime: expireTime
        };
        try {
            localStorage.setItem('tianji_' + key, JSON.stringify(data));
        } catch (e) {
            console.warn('LocalStorage 写入失败:', e);
        }
    },

    get(key) {
        try {
            const item = localStorage.getItem('tianji_' + key);
            if (!item) return null;
            
            const data = JSON.parse(item);
            const now = Date.now();
            
            if (now - data.timestamp > data.expireTime) {
                localStorage.removeItem('tianji_' + key);
                return null;
            }
            
            return data.value;
        } catch (e) {
            console.warn('LocalStorage 读取失败:', e);
            return null;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem('tianji_' + key);
        } catch (e) {
            console.warn('LocalStorage 删除失败:', e);
        }
    },

    clear() {
        try {
            const keys = Object.keys(localStorage).filter(k => k.startsWith('tianji_'));
            keys.forEach(k => localStorage.removeItem(k));
        } catch (e) {
            console.warn('LocalStorage 清空失败:', e);
        }
    },

    has(key) {
        return this.get(key) !== null;
    }
};

const PerformanceOptimizer = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    lazyLoad(selector, options = {}) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        }, options);

        document.querySelectorAll(selector).forEach(el => observer.observe(el));
    },

    requestIdleCallback(callback) {
        if ('requestIdleCallback' in window) {
            return requestIdleCallback(callback);
        } else {
            return setTimeout(callback, 1);
        }
    }
};

const DateUtils = {
    formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}年${month}月${day}日`;
    },

    formatTime(date) {
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    getWeekDay(date) {
        const weekDays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
        return weekDays[date.getDay()];
    },

    getShichen(hour) {
        const shichen = ['子时', '丑时', '寅时', '卯时', '辰时', '巳时', '午时', '未时', '申时', '酉时', '戌时', '亥时'];
        const index = Math.floor(((hour + 1) % 24) / 2);
        return shichen[index];
    },

    getZodiacSign(month, day) {
        const zodiacDates = [
            { name: '摩羯座', start: [12, 22], end: [1, 19] },
            { name: '水瓶座', start: [1, 20], end: [2, 18] },
            { name: '双鱼座', start: [2, 19], end: [3, 20] },
            { name: '白羊座', start: [3, 21], end: [4, 19] },
            { name: '金牛座', start: [4, 20], end: [5, 20] },
            { name: '双子座', start: [5, 21], end: [6, 21] },
            { name: '巨蟹座', start: [6, 22], end: [7, 22] },
            { name: '狮子座', start: [7, 23], end: [8, 22] },
            { name: '处女座', start: [8, 23], end: [9, 22] },
            { name: '天秤座', start: [9, 23], end: [10, 23] },
            { name: '天蝎座', start: [10, 24], end: [11, 21] },
            { name: '射手座', start: [11, 22], end: [12, 21] }
        ];

        for (let sign of zodiacDates) {
            if ((month === sign.start[0] && day >= sign.start[1]) ||
                (month === sign.end[0] && day <= sign.end[1])) {
                return sign.name;
            }
        }
        return '摩羯座';
    }
};
