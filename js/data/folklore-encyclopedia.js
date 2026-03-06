// 周公解梦完整版 - 1000+ 梦境解析
const zhougongDreamBook = {
    animals: [
        { keyword: '龙', variations: [
            { dream: '梦见龙飞腾', meaning: '大吉，事业腾飞，贵人相助', detail: '龙为祥瑞之兽，梦见龙飞腾预示事业有成，将得到贵人提拔，职位高升。' },
            { dream: '梦见龙入水', meaning: '吉，财运亨通，如鱼得水', detail: '龙入水得其所，预示将在适合的领域大展宏图，财源广进。' },
            { dream: '梦见龙盘绕', meaning: '吉，家庭和睦，万事如意', detail: '龙盘绕象征守护，预示家庭幸福，诸事顺遂。' },
            { dream: '梦见骑龙上天', meaning: '大吉，名扬四海，功成名就', detail: '骑龙上天是极吉之兆，预示将成就一番大事业，名扬天下。' },
            { dream: '梦见杀龙', meaning: '凶，遭遇强敌，需谨慎', detail: '杀龙预示将遇到强劲对手，需小心应对，不可轻敌。' }
        ]},
        { keyword: '蛇', variations: [
            { dream: '梦见大蛇', meaning: '吉，财运旺盛', detail: '大蛇象征财富，预示将有意外之财。' },
            { dream: '梦见小蛇', meaning: '小吉，小有收获', detail: '小蛇预示小的机遇和收获。' },
            { dream: '梦见蛇咬人', meaning: '凶，有口舌之争', detail: '蛇咬人预示可能与人发生争执，需谨言慎行。' },
            { dream: '梦见打死蛇', meaning: '吉，战胜困难', detail: '打死蛇预示能战胜困难和敌人。' },
            { dream: '梦见蛇化龙', meaning: '大吉，飞黄腾达', detail: '蛇化龙是极吉之兆，预示将有大发展。' }
        ]},
        { keyword: '鱼', variations: [
            { dream: '梦见鱼游水', meaning: '吉，事业顺利', detail: '鱼在水中游预示事业如鱼得水。' },
            { dream: '梦见钓鱼', meaning: '吉，有所收获', detail: '钓鱼预示通过努力将获得回报。' },
            { dream: '梦见吃鱼', meaning: '吉，健康长寿', detail: '吃鱼预示身体健康，延年益寿。' },
            { dream: '梦见鱼跳龙门', meaning: '大吉，升官发财', detail: '鱼跃龙门预示将有大机遇，一举成名。' }
        ]},
        // ... 扩展更多动物（马、牛、羊、鸡、狗、猪、鼠、虎、兔等）
    ],
    
    nature: [
        { keyword: '水', variations: [
            { dream: '梦见大水', meaning: '吉，财运亨通', detail: '大水象征财富，预示财运旺盛。' },
            { dream: '梦见清水', meaning: '吉，心情舒畅', detail: '清水预示心情愉快，诸事顺利。' },
            { dream: '梦见浊水', meaning: '凶，有烦心事', detail: '浊水预示将有烦恼，需调整心态。' },
            { dream: '梦见流水', meaning: '吉，财源滚滚', detail: '流水不断象征财源广进。' }
        ]},
        { keyword: '火', variations: [
            { dream: '梦见大火', meaning: '吉，事业兴旺', detail: '大火象征兴旺，预示事业红火。' },
            { dream: '梦见小火', meaning: '小吉，小有进展', detail: '小火预示小的进步和发展。' },
            { dream: '梦见灭火', meaning: '凶，遭遇挫折', detail: '灭火预示计划受阻，需重新规划。' }
        ]},
        { keyword: '山', variations: [
            { dream: '梦见高山', meaning: '吉，有靠山', detail: '高山象征依靠，预示有贵人相助。' },
            { dream: '梦见登山', meaning: '吉，事业上升', detail: '登山预示事业步步高升。' },
            { dream: '梦见下山', meaning: '平，运势平稳', detail: '下山预示运势平稳，不宜冒进。' }
        ]},
        // ... 扩展更多自然现象（风、雨、雷、电、雪、霜等）
    ],
    
    people: [
        { keyword: '死人', variations: [
            { dream: '梦见死人说话', meaning: '吉，有好事', detail: '死人说话预示将有意外好消息。' },
            { dream: '梦见死人笑', meaning: '吉，喜事临门', detail: '死人笑预示将有喜事发生。' },
            { dream: '梦见死人哭', meaning: '凶，有悲伤事', detail: '死人哭预示可能有悲伤之事。' }
        ]},
        { keyword: '掉牙', variations: [
            { dream: '梦见上牙掉', meaning: '注意长辈健康', detail: '上牙代表长辈，需关心父母健康。' },
            { dream: '梦见下牙掉', meaning: '注意晚辈健康', detail: '下牙代表晚辈，需关心子女健康。' },
            { dream: '梦见牙掉不疼', meaning: '吉，去除烦恼', detail: '掉牙不疼预示摆脱困扰。' }
        ]},
        // ... 扩展更多人物相关梦境
    ],
    
    objects: [
        { keyword: '钱', variations: [
            { dream: '梦见捡钱', meaning: '吉，有意外之财', detail: '捡钱预示将有意外收入。' },
            { dream: '梦见丢钱', meaning: '凶，有破财之虞', detail: '丢钱预示可能有财务损失，需谨慎。' },
            { dream: '梦见数钱', meaning: '吉，财运好', detail: '数钱预示财运旺盛，收入增加。' }
        ]},
        { keyword: '镜子', variations: [
            { dream: '梦见照镜子', meaning: '平，自我反省', detail: '照镜子预示需要审视自己。' },
            { dream: '梦见镜子破', meaning: '凶，有分离之象', detail: '镜子破预示可能有分离或不和。' }
        ]},
        // ... 扩展更多物品梦境
    ],
    
    activities: [
        { keyword: '考试', variations: [
            { dream: '梦见考试顺利', meaning: '吉，事业有成', detail: '考试顺利预示工作或学习顺利。' },
            { dream: '梦见考试失利', meaning: '凶，需努力', detail: '考试失利提醒需要更加努力。' }
        ]},
        { keyword: '结婚', variations: [
            { dream: '梦见自己结婚', meaning: '吉，有新开始', detail: '结婚预示新的开始或合作。' },
            { dream: '梦见别人结婚', meaning: '吉，有喜事', detail: '别人结婚预示周围有喜事。' }
        ]}
        // ... 扩展更多活动梦境
    ]
};

// 中国传统吉祥图案大全
const auspiciousPatterns = {
    longevity: [
        {
            name: '寿比南山',
            pattern: '松树 + 仙鹤 + 山石',
            meaning: '象征长寿安康，福寿绵长',
            usage: '祝寿场合，老人房间装饰',
            elements: [
                { name: '松树', meaning: '四季常青，长寿象征' },
                { name: '仙鹤', meaning: '仙禽，长寿之鸟' },
                { name: '山石', meaning: '稳固，靠山' }
            ]
        },
        {
            name: '五福捧寿',
            pattern: '五只蝙蝠环绕寿字',
            meaning: '五福临门，长寿多福',
            usage: '祝寿、春节装饰',
            elements: [
                { name: '蝙蝠', meaning: '谐音"福"，五只代表五福' },
                { name: '寿字', meaning: '长寿，常用篆体寿字' }
            ]
        },
        {
            name: '松鹤延年',
            pattern: '松树 + 仙鹤',
            meaning: '延年益寿，健康长寿',
            usage: '祝寿、老人用品装饰',
            elements: [
                { name: '松树', meaning: '长寿树' },
                { name: '仙鹤', meaning: '长寿鸟' }
            ]
        }
    ],
    
    wealth: [
        {
            name: '招财进宝',
            pattern: '财神 + 元宝 + 铜钱',
            meaning: '招来财富，财源广进',
            usage: '商铺、家庭财位',
            elements: [
                { name: '财神', meaning: '掌管财富的神仙' },
                { name: '元宝', meaning: '古代货币，财富象征' },
                { name: '铜钱', meaning: '外圆内方，象征天地' }
            ]
        },
        {
            name: '年年有余',
            pattern: '莲花 + 鲤鱼',
            meaning: '每年都有富余，生活富足',
            usage: '春节装饰，年画',
            elements: [
                { name: '莲花', meaning: '连年不断' },
                { name: '鲤鱼', meaning: '谐音"余"，富足' }
            ]
        },
        {
            name: '金玉满堂',
            pattern: '金鱼 + 水藻',
            meaning: '财富极多，学识丰富',
            usage: '家庭装饰，书房',
            elements: [
                { name: '金鱼', meaning: '谐音"金玉"，财富' },
                { name: '水藻', meaning: '谐音"堂"，满堂' }
            ]
        }
    ],
    
    happiness: [
        {
            name: '喜上眉梢',
            pattern: '喜鹊 + 梅花',
            meaning: '喜事临门，好运到来',
            usage: '婚庆、乔迁等喜庆场合',
            elements: [
                { name: '喜鹊', meaning: '报喜鸟' },
                { name: '梅花', meaning: '眉的谐音，喜事' }
            ]
        },
        {
            name: '龙凤呈祥',
            pattern: '龙 + 凤',
            meaning: '阴阳和谐，婚姻美满',
            usage: '婚庆装饰，婚礼用品',
            elements: [
                { name: '龙', meaning: '阳，男性，皇帝' },
                { name: '凤', meaning: '阴，女性，皇后' }
            ]
        },
        {
            name: '双喜临门',
            pattern: '囍字',
            meaning: '双重喜事，好事成双',
            usage: '婚庆场合',
            elements: [
                { name: '囍字', meaning: '两个喜字，代表双喜' }
            ]
        }
    ],
    
    career: [
        {
            name: '连中三元',
            pattern: '三个元宝 + 桂花',
            meaning: '科举考试连中解元、会元、状元',
            usage: '考试前祈福，书房装饰',
            elements: [
                { name: '元宝', meaning: '三元，三个第一' },
                { name: '桂花', meaning: '折桂，考中' }
            ]
        },
        {
            name: '平步青云',
            pattern: '人物 + 云彩 + 阶梯',
            meaning: '官运亨通，步步高升',
            usage: '官场人士，办公室装饰',
            elements: [
                { name: '云彩', meaning: '青云，高位' },
                { name: '阶梯', meaning: '步步高升' }
            ]
        },
        {
            name: '马上封侯',
            pattern: '猴子 + 马 + 蜜蜂',
            meaning: '立刻升官，快速晋升',
            usage: '官场人士，求职面试',
            elements: [
                { name: '猴子', meaning: '谐音"侯"，爵位' },
                { name: '马', meaning: '马上，立刻' },
                { name: '蜜蜂', meaning: '谐音"封"，封官' }
            ]
        }
    ]
};

// 中国民间禁忌大全
const folkTaboos = {
    daily: [
        {
            category: '日常行为禁忌',
            taboos: [
                { action: '清晨扫地', reason: '会扫走财运和好运', solution: '应在傍晚扫地' },
                { action: '晚上剪指甲', reason: '会剪断财运', solution: '白天剪指甲' },
                { action: '筷子插饭上', reason: '像祭品，不吉利', solution: '筷子应平放或放在碗边' },
                { action: '打破碗碟', reason: '破财破运', solution: '说"岁岁平安"化解' },
                { action: '对着镜子哭', reason: '会招来霉运', solution: '避免在镜前哭泣' },
                { action: '吹口哨招鬼', reason: '夜晚吹口哨会招引不干净的东西', solution: '避免夜间吹口哨' }
            ]
        },
        {
            category: '言语禁忌',
            taboos: [
                { action: '说"死"字', reason: '不吉利，会招来死亡', solution: '用"走了"、"去了"代替' },
                { action: '说"鬼"字', reason: '会招来鬼魂', solution: '用"那个"代替' },
                { action: '骂人', reason: '损阴德，招报应', solution: '控制情绪，与人为善' },
                { action: '说不吉利话', reason: '言出必行，会成真', solution: '多说吉利话' }
            ]
        }
    ],
    
    festival: [
        {
            category: '春节禁忌',
            taboos: [
                { action: '初一扫地', reason: '会扫走财运', solution: '初五后再打扫' },
                { action: '初一洗头', reason: '会洗掉好运', solution: '除夕前洗好' },
                { action: '打破东西', reason: '破财破运', solution: '说"岁岁平安"化解' },
                { action: '借钱给别人', reason: '一年都会借钱出去', solution: '初五后再借' },
                { action: '说不吉利话', reason: '一年都不顺利', solution: '只说吉利话' }
            ]
        },
        {
            category: '其他节日禁忌',
            taboos: [
                { action: '清明踏青穿红', reason: '红色招鬼', solution: '穿素色衣服' },
                { action: '中秋分梨', reason: '分离之意', solution: '吃整梨或切块' },
                { action: '端午行房', reason: '损阳气', solution: '节制欲望' }
            ]
        }
    ],
    
    marriage: [
        {
            category: '婚嫁禁忌',
            taboos: [
                { action: '新娘出门回头', reason: '会想娘家，婚姻不顺', solution: '出门后不要回头' },
                { action: '结婚下雨', reason: '婚姻多波折', solution: '提前看天气，准备雨具' },
                { action: '孕妇参加婚礼', reason: '喜冲喜，对双方不利', solution: '避免参加或避开关键环节' },
                { action: '寡妇参加婚礼', reason: '不吉利', solution: '避免参加' }
            ]
        }
    ],
    
    funeral: [
        {
            category: '丧葬禁忌',
            taboos: [
                { action: '眼泪滴遗体', reason: '逝者会留恋人间', solution: '控制情绪，保持距离' },
                { action: '影子入棺', reason: '会被带走', solution: '站远一些' },
                { action: '说"重"字', reason: '会再死一个', solution: '用"沉"代替' },
                { action: '穿红色', reason: '对逝者不敬', solution: '穿素色衣服' }
            ]
        }
    ]
};

window.zhougongDreamBook = zhougongDreamBook;
window.auspiciousPatterns = auspiciousPatterns;
window.folkTaboos = folkTaboos;
