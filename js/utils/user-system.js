const UserManager = {
    getUserData() {
        const userData = CacheManager.get('user_data');
        if (!userData) {
            const defaultData = {
                nickname: '善信',
                totalVisits: 0,
                lastVisitDate: null,
                checkInStreak: 0,
                totalCheckIns: 0,
                fortuneRecords: [],
                favoriteModules: [],
                createdAt: Date.now()
            };
            CacheManager.set('user_data', defaultData, 31536000000);
            return defaultData;
        }
        return userData;
    },

    saveUserData(userData) {
        CacheManager.set('user_data', userData, 31536000000);
    },

    checkIn() {
        const userData = this.getUserData();
        const today = new Date().toDateString();
        
        if (userData.lastVisitDate === today) {
            return { success: false, message: '今日已签到', streak: userData.checkInStreak };
        }

        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (userData.lastVisitDate === yesterday.toDateString()) {
            userData.checkInStreak += 1;
        } else {
            userData.checkInStreak = 1;
        }

        userData.totalVisits += 1;
        userData.totalCheckIns += 1;
        userData.lastVisitDate = today;

        this.saveUserData(userData);

        const rewards = this.getCheckInReward(userData.checkInStreak);
        
        return {
            success: true,
            message: '签到成功',
            streak: userData.checkInStreak,
            rewards: rewards
        };
    },

    getCheckInReward(streak) {
        const rewards = [];
        
        if (streak >= 1) rewards.push('每日吉言');
        if (streak >= 3) rewards.push('运势加成');
        if (streak >= 7) rewards.push('贵人相助');
        if (streak >= 15) rewards.push('财源广进');
        if (streak >= 30) rewards.push('福寿安康');

        return rewards;
    },

    addFortuneRecord(record) {
        const userData = this.getUserData();
        userData.fortuneRecords.unshift({
            date: new Date().toISOString(),
            ...record
        });
        
        if (userData.fortuneRecords.length > 100) {
            userData.fortuneRecords = userData.fortuneRecords.slice(0, 100);
        }
        
        this.saveUserData(userData);
    },

    getFortuneRecords(limit = 10) {
        const userData = this.getUserData();
        return userData.fortuneRecords.slice(0, limit);
    },

    incrementVisit() {
        const userData = this.getUserData();
        const today = new Date().toDateString();
        
        if (userData.lastVisitDate !== today) {
            userData.totalVisits += 1;
            this.saveUserData(userData);
        }
    }
};

const FortuneTeller = {
    getDailyFortune(date = new Date()) {
        const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
        const random = (s) => Math.sin(s) * 10000 - Math.floor(Math.sin(s) * 10000);
        
        const score = Math.floor(random(seed) * 40) + 60;
        const level = this.getFortuneLevel(score);
        const god = this.getTodayGod(date);
        const direction = this.getLuckyDirection(seed);
        
        return {
            score: score,
            level: level,
            god: god,
            direction: direction,
            color: this.getLuckyColor(seed),
            number: this.getLuckyNumber(seed),
            advice: this.getFortuneAdvice(score, level)
        };
    },

    getFortuneLevel(score) {
        if (score >= 95) return { name: '上上大吉', desc: '万事亨通，诸事顺遂' };
        if (score >= 85) return { name: '上吉', desc: '吉星高照，顺势而为' };
        if (score >= 75) return { name: '中吉', desc: '平稳安康，小有所获' };
        if (score >= 65) return { name: '小吉', desc: '平平淡淡，无灾无难' };
        return { name: '平', desc: '守成为上，静待时机' };
    },

    getTodayGod(date) {
        const gods = ['喜神', '财神', '福神', '贵神', '阳神', '阴神'];
        const index = (date.getMonth() + date.getDate()) % gods.length;
        return gods[index];
    },

    getLuckyDirection(seed) {
        const directions = ['正东', '东南', '正南', '西南', '正西', '西北', '正北', '东北'];
        const index = Math.abs(Math.floor(Math.sin(seed) * 10000)) % directions.length;
        return directions[index];
    },

    getLuckyColor(seed) {
        const colors = ['红色', '金色', '绿色', '蓝色', '黄色', '紫色', '白色', '黑色'];
        const index = Math.abs(Math.floor(Math.sin(seed + 1) * 10000)) % colors.length;
        return colors[index];
    },

    getLuckyNumber(seed) {
        const numbers = [3, 6, 8, 9, 12, 18, 21, 27];
        const index = Math.abs(Math.floor(Math.sin(seed + 2) * 10000)) % numbers.length;
        return numbers[index];
    },

    getFortuneAdvice(score, level) {
        const advices = {
            '上上大吉': '今日运势极佳，可大胆行动，把握良机！',
            '上吉': '运势旺盛，适合推进重要事务，但需谨慎细节。',
            '中吉': '运势平稳，按部就班即可有所收获。',
            '小吉': '宜守不宜攻，保持现状为佳。',
            '平': '韬光养晦，积蓄力量，等待更好时机。'
        };
        return advices[level.name] || '顺其自然，心安即是福。';
    },

    getHourlyFortune(hour) {
        const shichen = DateUtils.getShichen(hour);
        const quality = ['大吉', '吉', '平', '小吉', '凶'][Math.floor(Math.random() * 5)];
        const activity = this.getShichenActivity(shichen, quality);
        
        return {
            shichen: shichen,
            quality: quality,
            activity: activity
        };
    },

    getShichenActivity(shichen, quality) {
        const activities = {
            '子时': '静养休息，不宜外出',
            '丑时': '安守本分，宜静不宜动',
            '寅时': '早起 planning，一日之计',
            '卯时': '晨练养生，呼吸新鲜空气',
            '辰时': '处理要事，精力充沛',
            '巳时': '商务洽谈，事半功倍',
            '午时': '小憩养神，不宜劳累',
            '未时': '处理琐事，整理内务',
            '申时': '学习思考，效率颇高',
            '酉时': '社交聚会，广结善缘',
            '戌时': '陪伴家人，享受天伦',
            '亥时': '准备休息，放松身心'
        };
        return activities[shichen] || '顺势而为';
    }
};
