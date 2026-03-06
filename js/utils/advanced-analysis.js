const NameAnalyzer = {
    calculateNameScore(name) {
        const strokes = this.calculateStrokes(name);
        const wuge = this.calculateWuge(strokes);
        const sangu = this.calculateSangu(wuge);
        const score = this.calculateTotalScore(wuge, sangu);
        
        return {
            strokes: strokes,
            wuge: wuge,
            sangu: sangu,
            score: score,
            analysis: this.generateAnalysis(wuge, sangu, score)
        };
    },

    calculateStrokes(name) {
        const strokeMap = {
            '一': 1, '乙': 1, '二': 2, '十': 2, '丁': 2, '厂': 2, '七': 2, '八': 2, '人': 2, '入': 2,
            '三': 3, '千': 3, '个': 3, '大': 3, '小': 3, '口': 3, '山': 3, '巾': 3, '亿': 3,
            '王': 4, '天': 4, '夫': 4, '元': 4, '云': 4, '木': 4, '水': 4, '火': 4, '心': 4,
            '玉': 5, '正': 5, '功': 5, '可': 5, '丙': 5, '石': 5, '龙': 5, '业': 5,
            '安': 6, '宇': 6, '守': 6, '宇': 6, '羽': 6, '阳': 6, '收': 6, '帆': 6,
            '志': 7, '宏': 7, '良': 7, '君': 7, '言': 7, '辛': 7, '秀': 7, '见': 7,
            '明': 8, '国': 8, '昌': 8, '忠': 8, '欣': 8, '金': 8, '长': 8, '雨': 8,
            '春': 9, '星': 9, '品': 9, '思': 9, '科': 9, '信': 9, '亮': 9, '建': 9,
            '家': 10, '高': 10, '原': 10, '海': 10, '涛': 10, '刚': 10, '峰': 10, '桂': 10,
            '伟': 11, '健': 11, '国': 11, '启': 11, '培': 11, '基': 11, '振': 11, '晨': 11,
            '智': 12, '辉': 12, '强': 12, '斌': 12, '富': 12, '贵': 12, '雄': 12, '杰': 12,
            '瑞': 13, '福': 13, '嘉': 13, '源': 13, '豪': 13, '铭': 13, '新': 13, '靖': 13,
            '赫': 14, '嘉': 14, '豪': 14, '歌': 14, '愿': 14, '荣': 14, '华': 14, '凤': 14,
            '德': 15, '毅': 15, '锐': 15, '庆': 15, '辉': 15, '磊': 15, '贤': 15, '庆': 15,
            '翰': 16, '霖': 16, '学': 16, '达': 16, '锦': 16, '翰': 16, '儒': 16, '燕': 16,
            '泽': 17, '鸿': 17, '涛': 17, '骏': 17, '远': 17, '灿': 17, '阳': 17, '隆': 17,
            '鹏': 18, '麒': 18, '涛': 18, '滨': 18, '礼': 18, '丰': 18, '镇': 18, '颜': 18,
            '韵': 19, '鹏': 19, '麒': 19, '丽': 19, '露': 19, '韵': 19, '怀': 19, '耀': 19,
            '瀚': 20, '耀': 20, '怀': 20, '宝': 20, '琼': 20, '露': 20, '馨': 20, '严': 20
        };

        const result = { surname: 0, givenName: 0, total: 0 };
        const chars = name.split('');
        
        if (chars.length > 0) {
            result.surname = strokeMap[chars[0]] || this.calculateStrokeByRadical(chars[0]);
        }
        
        for (let i = 1; i < chars.length; i++) {
            result.givenName += strokeMap[chars[i]] || this.calculateStrokeByRadical(chars[i]);
        }
        
        result.total = result.surname + result.givenName;
        return result;
    },

    calculateStrokeByRadical(char) {
        return Math.floor(char.charCodeAt(0) % 20) + 1;
    },

    calculateWuge(strokes) {
        const surname = strokes.surname;
        const given = strokes.givenName;
        
        const tianGe = surname + 1;
        const renGe = surname + (given > 0 ? Math.floor(given / 2) + 1 : 1);
        const diGe = given + 1;
        const waiGe = tianGe + diGe - renGe;
        const zongGe = surname + given;
        
        return {
            tian: { value: tianGe, meaning: this.getGeMeaning(tianGe, '天') },
            ren: { value: renGe, meaning: this.getGeMeaning(renGe, '人') },
            di: { value: diGe, meaning: this.getGeMeaning(diGe, '地') },
            wai: { value: waiGe, meaning: this.getGeMeaning(waiGe, '外') },
            zong: { value: zongGe, meaning: this.getGeMeaning(zongGe, '总') }
        };
    },

    getGeMeaning(value, type) {
        const meanings = {
            '天': ['祖业运', '影响事业成败', '早年运势'],
            '人': ['主运', '影响一生', '性格特征'],
            '地': ['前运', '影响中年', '家庭关系'],
            '外': ['副运', '影响社交', '外部环境'],
            '总': ['总运', '影响晚年', '综合运势']
        };
        
        const quality = value % 5;
        const qualities = ['大吉', '吉', '平', '凶', '大凶'];
        
        return {
            quality: qualities[quality],
            description: meanings[type][0],
            influence: meanings[type][1]
        };
    },

    calculateSangu(wuge) {
        const tian = wuge.tian.value % 5;
        const ren = wuge.ren.value % 5;
        const di = wuge.di.value % 5;
        
        const elements = ['木', '火', '土', '金', '水'];
        
        return {
            tianCai: { element: elements[tian], meaning: '天赋才能' },
            renGe: { element: elements[ren], meaning: '主性格' },
            diGe: { element: elements[di], meaning: '基础运' }
        };
    },

    calculateTotalScore(wuge, sangu) {
        let score = 75;
        
        const ges = [wuge.tian, wuge.ren, wuge.di, wuge.wai, wuge.zong];
        ges.forEach(ge => {
            if (ge.quality === '大吉') score += 5;
            else if (ge.quality === '吉') score += 3;
            else if (ge.quality === '凶') score -= 5;
            else if (ge.quality === '大凶') score -= 10;
        });
        
        const elements = [sangu.tianCai.element, sangu.renGe.element, sangu.diGe.element];
        const uniqueElements = new Set(elements).size;
        if (uniqueElements >= 3) score += 5;
        
        return Math.max(50, Math.min(99, score));
    },

    generateAnalysis(wuge, sangu, score) {
        const analyses = [];
        
        if (wuge.ren.quality === '大吉' || wuge.ren.quality === '吉') {
            analyses.push('人格吉利，主一生运势顺遂，性格温和，易得贵人相助。');
        }
        
        if (wuge.zong.quality === '大吉' || wuge.zong.quality === '吉') {
            analyses.push('总运吉利，晚年福寿双全，子孙满堂。');
        }
        
        if (sangu.tianCai.element === '木' || sangu.tianCai.element === '火') {
            analyses.push('天赋才能出众，适合从事文化、艺术、教育等工作。');
        }
        
        if (score >= 90) {
            analyses.push('此名大吉大利，五行配置优良，三才配置得当，主一生富贵荣华。');
        } else if (score >= 80) {
            analyses.push('此名吉利，配置较好，主一生平稳安康，小有所成。');
        } else {
            analyses.push('此名平平，建议结合八字进一步分析。');
        }
        
        return analyses.join('\n');
    },

    renderNameAnalysis(result, container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="text-center p-6 rounded-xl bg-gradient-to-r from-gold/20 to-bronze/20 border border-gold/30">
                    <div class="text-gold text-lg mb-2">姓名评分</div>
                    <div class="ancient-font text-6xl text-gold text-glow">${result.score}</div>
                    <div class="text-bronze mt-2">${result.score >= 90 ? '上上大吉' : result.score >= 80 ? '上吉' : '中吉'}</div>
                </div>
                
                <div class="grid grid-cols-5 gap-2 text-center">
                    ${Object.entries(result.wuge).map(([key, value]) => `
                        <div class="p-3 rounded-lg ${value.quality.includes('吉') ? 'bg-jade/10 border border-jade/30' : 'bg-cinnabar/10 border border-cinnabar/30'}">
                            <div class="text-xs text-parchment/60">${key === 'tian' ? '天格' : key === 'ren' ? '人格' : key === 'di' ? '地格' : key === 'wai' ? '外格' : '总格'}</div>
                            <div class="text-gold text-lg">${value.value}</div>
                            <div class="text-xs ${value.quality.includes('吉') ? 'text-jade' : 'text-cinnabar'}">${value.quality}</div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                    <div class="text-gold text-sm mb-2">三才配置</div>
                    <div class="flex justify-around text-center">
                        ${Object.entries(result.sangu).map(([key, value]) => `
                            <div>
                                <div class="text-xs text-parchment/60">${value.meaning}</div>
                                <div class="text-gold text-lg">${value.element}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
                    <div class="text-gold text-sm mb-2">综合分析</div>
                    <div class="text-parchment/70 text-sm whitespace-pre-line">${result.analysis}</div>
                </div>
            </div>
        `;
    }
};

const MatchMaker = {
    calculateCompatibility(name1, name2) {
        const score1 = NameAnalyzer.calculateNameScore(name1);
        const score2 = NameAnalyzer.calculateNameScore(name2);
        
        const baseScore = Math.floor((score1.score + score2.score) / 2);
        const harmonyScore = this.calculateHarmony(score1.sangu, score2.sangu);
        const finalScore = Math.min(99, baseScore + harmonyScore);
        
        return {
            score: finalScore,
            level: this.getCompatibilityLevel(finalScore),
            analysis: this.generateMatchAnalysis(score1, score2, harmonyScore)
        };
    },

    calculateHarmony(sangu1, sangu2) {
        const element1 = sangu1.renGe.element;
        const element2 = sangu2.renGe.element;
        
        const generating = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
        const overcoming = { '木': '土', '土': '水', '水': '火', '火': '金', '金': '木' };
        
        if (generating[element1] === element2 || generating[element2] === element1) {
            return 10;
        } else if (element1 === element2) {
            return 5;
        } else if (overcoming[element1] === element2 || overcoming[element2] === element1) {
            return -5;
        }
        return 0;
    },

    getCompatibilityLevel(score) {
        if (score >= 90) return { name: '天作之合', desc: '百年好合，白头偕老' };
        if (score >= 80) return { name: '佳偶天成', desc: '琴瑟和鸣，幸福美满' };
        if (score >= 70) return { name: '良缘美眷', desc: '相互扶持，携手一生' };
        if (score >= 60) return { name: '平淡是真', desc: '细水长流，安稳度日' };
        return { name: '需要磨合', desc: '相互理解，共同努力' };
    },

    generateMatchAnalysis(score1, score2, harmonyScore) {
        const analyses = [];
        
        if (harmonyScore > 5) {
            analyses.push('两人五行相生，性格互补，相处融洽，是理想的配对。');
        } else if (harmonyScore < 0) {
            analyses.push('两人五行相克，需要更多包容和理解，共同努力维护感情。');
        } else {
            analyses.push('两人五行配置平稳，相处和谐，需要相互扶持。');
        }
        
        if (score1.score >= 85 && score2.score >= 85) {
            analyses.push('两人姓名评分都很高，各自运势都不错，结合后更能互相旺运。');
        }
        
        return analyses.join('\n');
    },

    renderMatchResult(result, container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="text-center p-6 rounded-xl bg-gradient-to-r from-cinnabar/20 to-gold/20 border border-gold/30">
                    <div class="text-gold text-lg mb-2">缘分指数</div>
                    <div class="ancient-font text-6xl text-gold text-glow">${result.score}</div>
                    <div class="text-bronze mt-2">${result.level.name}</div>
                    <div class="text-parchment/60 text-sm mt-1">${result.level.desc}</div>
                </div>
                
                <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
                    <div class="text-gold text-sm mb-2">配对分析</div>
                    <div class="text-parchment/70 text-sm whitespace-pre-line">${result.analysis}</div>
                </div>
                
                <div class="text-center text-parchment/50 text-xs">
                    <div>※ 此结果仅供娱乐参考</div>
                    <div>真正的幸福需要双方共同经营</div>
                </div>
            </div>
        `;
    }
};

const CareerAdvisor = {
    findSuitableCareers(bazi) {
        const wuxing = bazi.wuxing;
        const favorable = this.findFavorableElement(wuxing);
        const careers = this.getCareersByElement(favorable);
        
        return {
            favorableElement: favorable,
            careers: careers,
            advice: this.getCareerAdvice(favorable)
        };
    },

    findFavorableElement(wuxing) {
        const elements = Object.entries(wuxing);
        const minElement = elements.reduce((min, curr) => curr[1] < min[1] ? curr : min);
        const generatingMap = { '木': '火', '火': '土', '土': '金', '金': '水', '水': '木' };
        return generatingMap[minElement[0]];
    },

    getCareersByElement(element) {
        const careerMap = {
            '木': ['教育', '文化', '艺术', '医疗', '林业', '园艺', '出版', '设计'],
            '火': ['能源', '电力', '餐饮', '娱乐', '广告', '演艺', '美容', '化工'],
            '土': ['房地产', '建筑', '农业', '矿产', '陶瓷', '中介', '管理', '行政'],
            '金': ['金融', '法律', '机械', '汽车', '珠宝', '五金', '军警', '外科医生'],
            '水': ['贸易', '物流', '旅游', '媒体', '销售', '渔业', '水利', '咨询']
        };
        return careerMap[element] || ['通用行业'];
    },

    getCareerAdvice(element) {
        const advices = {
            '木': '适合从事与人打交道、需要创造力的工作。东方有利发展。',
            '火': '适合从事热情奔放、需要表现力的工作。南方有利发展。',
            '土': '适合从事稳定踏实、需要耐心的工作。中央有利发展。',
            '金': '适合从事严谨细致、需要决断力的工作。西方有利发展。',
            '水': '适合从事灵活多变、需要沟通能力的工作。北方有利发展。'
        };
        return advices[element] || '平衡发展，顺势而为。';
    },

    renderCareerAdvice(result, container) {
        container.innerHTML = `
            <div class="space-y-6">
                <div class="text-center p-4 rounded-xl bg-gold/10 border border-gold/30">
                    <div class="text-gold text-sm mb-2">有利五行</div>
                    <div class="ancient-font text-4xl text-gold">${result.favorableElement}</div>
                </div>
                
                <div class="p-4 rounded-xl bg-obsidian/50 border border-gold/20">
                    <div class="text-gold text-sm mb-3">适合行业</div>
                    <div class="flex flex-wrap gap-2">
                        ${result.careers.map(career => `
                            <span class="px-3 py-1 rounded-lg bg-jade/20 text-jade/90 text-sm">${career}</span>
                        `).join('')}
                    </div>
                </div>
                
                <div class="p-4 rounded-xl bg-gold/5 border border-gold/20">
                    <div class="text-gold text-sm mb-2">发展建议</div>
                    <div class="text-parchment/70 text-sm">${result.advice}</div>
                </div>
            </div>
        `;
    }
};

window.NameAnalyzer = NameAnalyzer;
window.MatchMaker = MatchMaker;
window.CareerAdvisor = CareerAdvisor;
