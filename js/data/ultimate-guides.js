// 实用操作指南深度扩展
const practicalGuides = {
    bazi: {
        title: '八字算命完整操作指南',
        introduction: '八字算命是中国传统命理学的重要分支，通过出生年月日时的天干地支来推算一生命运。',
        
        // 基础理论
        basics: {
            concept: '八字即四柱，每柱两个字（一天干一地支），共八个字',
            components: [
                { name: '年柱', description: '出生年份的天干地支，代表祖业、父母宫' },
                { name: '月柱', description: '出生月份的天干地支，代表兄弟、事业宫' },
                { name: '日柱', description: '出生日期的天干地支，日干代表自己，日支代表配偶' },
                { name: '时柱', description: '出生时辰的天干地支，代表子女、晚年运' }
            ]
        },
        
        // 详细步骤
        steps: [
            {
                step: 1,
                title: '获取准确的出生信息',
                detail: '需要精确到时辰（2 小时为一个时辰）',
                requirements: [
                    '公历或农历的出生年月日',
                    '出生时辰（几点几分）',
                    '出生地点（用于计算真太阳时）'
                ],
                note: '如果不确定时辰，可通过人生重大事件反推'
            },
            {
                step: 2,
                title: '排八字',
                detail: '将出生时间转换为天干地支',
                method: [
                    '年柱：查万年历，如 2024 年为甲辰年',
                    '月柱：根据节气划分，如立春后为寅月',
                    '日柱：查万年历，如 2024 年 2 月 4 日为戊子日',
                    '时柱：根据日干和时辰推算，如戊日子的时为壬子时'
                ],
                example: '2024 年 2 月 4 日 10:30（农历腊月廿五）',
                result: '甲辰年 丁丑月 戊子日 丁巳时'
            },
            {
                step: 3,
                title: '排大运',
                detail: '大运是十年一个阶段的运势',
                method: [
                    '阳男阴女顺排，阴男阳女逆排',
                    '从月柱开始，顺排或逆排',
                    '起运岁数：三天为一岁，一天为四个月'
                ],
                example: '甲辰年（阳）男命，顺排',
                result: '戊寅、己卯、庚辰、辛巳、壬午、癸未...'
            },
            {
                step: 4,
                title: '分析五行强弱',
                detail: '统计八字中金木水火土的数量',
                standard: [
                    '同党：生我者（印枭）、助我者（比劫）',
                    '异党：克我者（官杀）、我克者（财星）、我生者（食伤）',
                    '判断：同党多则身旺，异党多则身弱'
                ],
                example: '戊土日主，八字火土多为身旺，金水多为身弱'
            },
            {
                step: 5,
                title: '取用神',
                detail: '用神是平衡八字的关键',
                principles: [
                    '身旺：宜克泄耗，取官杀、食伤、财星为用',
                    '身弱：宜生扶，取印枭、比劫为用',
                    '调候：寒则暖之，热则润之',
                    '通关：两神相战，取通关之神'
                ],
                example: '戊土身旺，取金（食伤）水（财星）为用神'
            },
            {
                step: 6,
                title: '分析十神',
                detail: '十神代表不同的人际关系和事物',
                list: [
                    { name: '正印', meaning: '母亲、学历、名誉' },
                    { name: '偏印', meaning: '继母、特殊才能' },
                    { name: '正官', meaning: '丈夫、事业、约束' },
                    { name: '七杀', meaning: '偏官、压力、小人' },
                    { name: '正财', meaning: '妻子、正职收入' },
                    { name: '偏财', meaning: '父亲、投资、意外之财' },
                    { name: '食神', meaning: '才华、享受、口福' },
                    { name: '伤官', meaning: '创意、叛逆、口才' },
                    { name: '比肩', meaning: '兄弟、朋友、同事' },
                    { name: '劫财', meaning: '姐妹、破财、竞争' }
                ]
            },
            {
                step: 7,
                title: '分析格局',
                detail: '格局决定命局层次',
                commonPatterns: [
                    { name: '正官格', condition: '月令正官透干', feature: '为人正直，有管理能力' },
                    { name: '七杀格', condition: '月令七杀透干', feature: '有魄力，适合军警、管理' },
                    { name: '正财格', condition: '月令正财透干', feature: '勤俭持家，适合稳定工作' },
                    { name: '偏财格', condition: '月令偏财透干', feature: '善于投资，有商业头脑' },
                    { name: '食神格', condition: '月令食神透干', feature: '有才华，适合艺术、技术' },
                    { name: '伤官格', condition: '月令伤官透干', feature: '聪明有才，但易得罪人' },
                    { name: '印绶格', condition: '月令印星透干', feature: '有学识，适合教育、研究' },
                    { name: '羊刃格', condition: '日主帝旺为月令', feature: '性格刚强，适合武职' }
                ]
            },
            {
                step: 8,
                title: '流年运势分析',
                detail: '结合大运和流年分析具体年份运势',
                method: [
                    '看流年与大运的关系',
                    '看流年与八字的作用（刑冲合害）',
                    '看流年十神对命局的影响'
                ],
                example: '2024 甲辰年，对戊土日主而言，甲木为七杀，辰土为比肩',
                analysis: '七杀主压力和挑战，比肩主帮助，说明今年有压力但也有贵人相助'
            }
        ],
        
        // 实战案例
        caseStudy: {
            title: '实际案例分析',
            background: {
                gender: '男',
                birth: '公历 1990 年 5 月 15 日 8:30',
                location: '北京',
                lunar: '庚午年 四月廿一 辰时'
            },
            bazi: {
                year: '庚午（金火）',
                month: '辛巳（金火）',
                day: '壬戌（水土）',
                hour: '甲辰（木土）'
            },
            analysis: [
                '日主壬水，生于巳月（火旺），不得月令',
                '年干庚金、月干辛金生水，但地支火土旺',
                '综合判断：壬水身弱',
                '用神：取金（印星）水（比劫）为用',
                '忌神：火（财星）土（官杀）'
            ],
            personality: [
                '壬水之人，聪明灵活',
                '身弱，性格偏内向',
                '印星为用，有学识，适合研究',
                '财旺身弱，对金钱渴望但难聚财'
            ],
            career: [
                '适合从事五行属金水的行业',
                '如金融、贸易、物流、水利等',
                '不宜从事火土行业（餐饮、房地产）',
                '适合稳定工作，不宜冒险创业'
            ],
            marriage: [
                '日支戌土为忌神，婚姻宫不佳',
                '晚婚为宜，早婚易变',
                '配偶性格强势，需多包容',
                '2024 甲辰年，辰戌冲，注意婚姻稳定'
            ],
            health: [
                '水弱，注意肾脏、泌尿系统健康',
                '火旺，注意心血管系统',
                '建议：多喝水，少吃辛辣',
                '适合游泳等水上运动'
            ],
            fortune2024: [
                '2024 甲辰年，甲木为食神，辰土为七杀',
                '食神制杀，利于事业发展和解决问题',
                '但辰戌冲日支，注意家庭和感情',
                '建议：稳中求进，不宜大变动'
            ]
        },
        
        // 常见误区
        commonMistakes: [
            {
                mistake: '只看生肖算命',
                correction: '生肖只是年支，不能代表整个命局',
                advice: '要看完整的八字'
            },
            {
                mistake: '认为八字决定一切',
                correction: '八字是先天的，但后天的努力和环境也很重要',
                advice: '知命而改运，积极面对人生'
            },
            {
                mistake: '盲目追求好八字',
                correction: '没有绝对的好八字，关键是平衡和用神',
                advice: '普通八字只要努力也能成功'
            },
            {
                mistake: '忽视大运流年',
                correction: '命好不如运好，大运流年影响很大',
                advice: '结合大运流年综合分析'
            }
        ],
        
        // 工具推荐
        tools: [
            { name: '万年历', usage: '查询八字、节气', recommendation: '推荐权威版本' },
            { name: '排盘软件', usage: '自动排八字、大运', recommendation: '多对比几个软件' },
            { name: '五行查询表', usage: '查询字五行属性和生克关系', recommendation: '打印备用' },
            { name: '十神速查表', usage: '快速查找十神', recommendation: '初学者必备' }
        ],
        
        // 学习建议
        learningPath: [
            { stage: '入门', content: '学习天干地支、五行生克', duration: '1-2 个月' },
            { stage: '基础', content: '掌握排八字、排大运', duration: '2-3 个月' },
            { stage: '进阶', content: '学习十神、格局、用神', duration: '6-12 个月' },
            { stage: '实战', content: '大量案例分析，积累经验', duration: '持续进行' },
            { stage: '提升', content: '研读古籍，如《渊海子平》《三命通会》', duration: '持续进行' }
        ]
    }
};

// 风水布局完整指南
const fengShuiLayoutGuide = {
    residential: {
        title: '家居风水布局完整指南',
        
        // 基本原则
        principles: [
            { name: '藏风聚气', explanation: '气流宜缓不宜急，能留住好的气场' },
            { name: '阴阳平衡', explanation: '明暗、高低、动静要平衡' },
            { name: '五行调和', explanation: '金木水火土五种元素要平衡' },
            { name: '因地制宜', explanation: '根据具体环境灵活调整' }
        ],
        
        // 各区域布局
        areas: {
            entrance: {
                name: '大门',
                importance: '气口，影响整个家庭的运势',
                good: [
                    '开阔明亮',
                    '干净整洁',
                    '朝向吉利（根据主人命理）',
                    '有玄关缓冲'
                ],
                bad: [
                    '正对电梯（开口煞）',
                    '正对楼梯（退财煞）',
                    '正对厕所（秽气）',
                    '正对厨房（火气）',
                    '门对门（口舌是非）'
                ],
                solutions: [
                    '设置玄关或屏风',
                    '摆放麒麟、貔貅化煞',
                    '挂八卦镜（慎用）',
                    '放置绿植缓冲'
                ],
                colors: '根据朝向：东向用绿色，南向用红色，西向用白色，北向用黑色',
                lighting: '宜明亮，安装暖色灯'
            },
            
            livingRoom: {
                name: '客厅',
                importance: '家庭活动中心，影响事业和财运',
                layout: [
                    '宜在房屋中央或前半部分',
                    '宜方正，不宜缺角',
                    '宜宽敞明亮',
                    '沙发宜靠墙，形成"靠山"'
                ],
                furniture: [
                    { item: '沙发', position: '靠实墙，面向开阔', taboo: '不背对大门' },
                    { item: '电视', position: '与沙发相对，距离适中', taboo: '不对镜子' },
                    { item: '茶几', position: '在沙发前，不宜过高', taboo: '不尖角对冲' },
                    { item: '柜子', position: '靠墙放置，不宜压迫', taboo: '不高过人头' }
                ],
                decoration: [
                    '可挂山水画（水流向屋内）',
                    '可摆放鱼缸催财（6 条或 9 条）',
                    '可放置绿植（富贵竹、发财树）',
                    '不宜挂猛兽图、抽象画'
                ],
                colors: '根据朝向和个人命理选择，一般用暖色调'
            },
            
            bedroom: {
                name: '卧室',
                importance: '休息的地方，影响健康和感情',
                layout: [
                    '宜在房屋后半部分',
                    '宜方正，不宜多角',
                    '宜安静，不宜靠近马路',
                    '大小适中，不宜过大（15-20 平米为宜）'
                ],
                bed: [
                    { principle: '床头靠实墙', reason: '有靠山，睡眠安稳' },
                    { principle: '不对门', reason: '避免气流直冲' },
                    { principle: '不对镜', reason: '避免惊吓，影响睡眠' },
                    { principle: '不压梁', reason: '避免心理压力' },
                    { principle: '不靠窗', reason: '避免漏气，影响健康' }
                ],
                colors: [
                    '主卧：温馨色调（米色、粉色）',
                    '老人房：沉稳色调（棕色、灰色）',
                    '儿童房：活泼色调（浅蓝、浅绿）',
                    '避免：黑色、大红色'
                ],
                taboo: [
                    '不宜摆放电器（电视、电脑）',
                    '不宜放置尖锐物品',
                    '不宜养鱼（阴气重）',
                    '不宜堆放杂物'
                ]
            },
            
            kitchen: {
                name: '厨房',
                importance: '财库，影响财运和健康',
                layout: [
                    '宜在房屋后半部分',
                    '不宜在房屋中央（火烧心）',
                    '不宜正对大门',
                    '保持通风良好'
                ],
                stove: [
                    { principle: '靠实墙', reason: '有靠山' },
                    { principle: '不对水槽', reason: '水火相冲' },
                    { principle: '不对冰箱', reason: '冷热冲突' },
                    { principle: '不压梁', reason: '影响健康' }
                ],
                elements: [
                    { element: '灶台（火）', position: '南方或东方' },
                    { element: '水槽（水）', position: '北方', taboo: '不与灶台相对' },
                    { element: '冰箱（金）', position: '西方或北方' },
                    { element: '米缸（土）', position: '西南或东北' }
                ],
                colors: '宜用浅色（白色、米色），不宜用黑色、红色'
            },
            
            bathroom: {
                name: '卫生间',
                importance: '污秽之地，影响健康',
                layout: [
                    '不宜在房屋中央',
                    '不宜正对大门',
                    '不宜正对厨房',
                    '不宜正对卧室'
                ],
                solutions: [
                    '保持干燥通风',
                    '门常关',
                    '放置绿植净化',
                    '放置盐吸收负能量',
                    '使用香薰除味'
                ],
                colors: '宜用浅色（白色、米色）',
                taboo: [
                    '不宜放置杂物',
                    '不宜养植物（除净化类）',
                    '不宜有破损'
                ]
            }
        },
        
        // 常见问题及化解
        commonProblems: [
            {
                problem: '横梁压顶',
                effect: '心理压力大，影响健康和运势',
                solution: [
                    '吊顶隐藏横梁',
                    '在梁下放置柜子',
                    '挂葫芦化煞',
                    '避免在梁下放置床、沙发、办公桌'
                ]
            },
            {
                problem: '门对门',
                effect: '口舌是非，家庭不和',
                solution: [
                    '常关门',
                    '挂门帘',
                    '放置屏风',
                    '挂五帝钱'
                ]
            },
            {
                problem: '缺角',
                effect: '对应方位的人或事受影响',
                solution: [
                    '放置泰山石敢当',
                    '摆放对应五行的物品',
                    '挂八卦补角'
                ]
            },
            {
                problem: '穿堂煞',
                effect: '气流直冲，不聚财',
                solution: [
                    '设置玄关',
                    '摆放屏风',
                    '放置高大绿植',
                    '挂珠帘'
                ]
            }
        ],
        
        // 催财方法
        wealthEnhancement: [
            {
                method: '财位布局',
                steps: [
                    '找到明财位（大门对角线）',
                    '保持干净明亮',
                    '摆放催财物品（金蟾、貔貅、聚宝盆）',
                    '放置常绿植物（发财树、富贵竹）'
                ]
            },
            {
                method: '鱼缸催财',
                steps: [
                    '选择合适位置（客厅财位）',
                    '确定大小（不宜过大）',
                    '养鱼数量（6 条或 9 条）',
                    '鱼的种类（金鱼、锦鲤）',
                    '保持水质清洁'
                ]
            },
            {
                method: '灯光催财',
                steps: [
                    '财位安装长明灯',
                    '使用暖色灯光',
                    '保持灯具清洁',
                    '及时更换损坏的灯'
                ]
            }
        ],
        
        // 实操步骤
        implementationSteps: [
            { step: '测量房屋坐向', detail: '使用罗盘，站在房屋中心测量' },
            { step: '绘制户型图', detail: '标注方向、门窗位置' },
            { step: '分析风水格局', detail: '找出吉凶方位' },
            { step: '制定布局方案', detail: '根据分析结果设计布局' },
            { step: '择日实施', detail: '选择吉日进行调整' },
            { step: '观察效果', detail: '调整后观察 1-3 个月' },
            { step: '微调优化', detail: '根据效果进行微调' }
        ]
    }
};

window.practicalGuides = practicalGuides;
window.fengShuiLayoutGuide = fengShuiLayoutGuide;
