# 天机黄历 - 传承千年智慧

<div align="center">

![天机黄历](https://img.shields.io/badge/天机黄历-v2.0-gold)
![License](https://img.shields.io/badge/license-MIT-blue)
![Build](https://img.shields.io/badge/build-2026.03.06-green)

**洞察天机 · 顺应天命**

[在线体验](#) | [文档](#) | [反馈](#)

</div>

---

## 📖 项目简介

天机黄历是一款基于中国传统历法的现代化应用，融合了天干地支、阴阳五行、八卦周易等传统文化精髓，提供日历查询、运势分析、命理测算、风水布局等多种功能，帮助用户了解传统文化、指导日常生活。

### ✨ 核心特性

- 📅 **万年历查询** - 公历农历对照、节日节气标注、宜忌详情
- 🎯 **择吉日推荐** - 智能算法推荐嫁娶、出行、开业等吉日
- 🔮 **命理测算** - 八字算命、姓名测算、姓名配对
- 🏆 **成就系统** - 10 级等级、12 个成就徽章、每日任务
- ⚙️ **个性化设置** - 主题切换、字体调节、音效控制
- 📊 **运势分析** - 每日运势、时辰吉凶、运势记录

---

## 🚀 快速开始

### 本地运行

1. **克隆项目**
```bash
git clone https://github.com/your-username/tianji-calendar.git
cd tianji-calendar
```

2. **直接打开**
```bash
# 使用浏览器打开 index.html
# 或使用本地服务器
python -m http.server 8080
# 访问 http://localhost:8080
```

3. **无需构建**
   - 纯前端项目，无需安装依赖
   - 无需后端服务器
   - 支持 CDN 部署

### 部署方式

#### Vercel 部署
```bash
# 安装 Vercel CLI
npm i -g vercel

# 部署
vercel
```

#### Netlify 部署
```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod
```

#### GitHub Pages
1. 将项目推送到 GitHub
2. 进入 Settings → Pages
3. 选择 main branch 保存

---

## 📁 项目结构

```
yellow-calendar/
├── index.html              # 主页面
├── css/
│   └── main.css           # 样式表
├── js/
│   ├── data/              # 数据模块
│   │   ├── calendar-data.js      # 基础历法数据
│   │   ├── content-data.js       # 名言警句、神话
│   │   ├── lunar-info.js         # 农历计算
│   │   ├── expanded-data.js      # 扩展数据
│   │   ├── advanced-content.js   # 高级内容
│   │   ├── foundation-theory.js  # 基础理论
│   │   ├── culture-history.js    # 历史文化
│   │   ├── divination-art.js     # 占卜艺术
│   │   ├── comprehensive-theory.js # 综合理论
│   │   ├── extensive-culture.js  # 广博文化
│   │   ├── folklore-encyclopedia.js # 民俗百科
│   │   ├── deep-expansion.js     # 深度扩展
│   │   ├── advanced-deep-content.js # 高级深度内容
│   │   └── ultimate-guides.js    # 终极指南
│   │
│   ├── modules/           # 功能模块
│   │   ├── app.js                # 主应用
│   │   ├── modal.js              # 模态框
│   │   ├── content-loaders.js    # 内容加载器
│   │   ├── feature-modules.js    # 功能模块
│   │   ├── feature-functions.js  # 功能函数
│   │   ├── bazi-module.js        # 八字算命
│   │   ├── checkin-module.js     # 签到功能
│   │   ├── fortune-module.js     # 运势功能
│   │   ├── interactive-modules.js # 互动模块
│   │   ├── content-expansion.js  # 内容扩展
│   │   ├── almanac-module.js     # 万年历 ⭐
│   │   ├── date-selection-module.js # 择吉日 ⭐
│   │   ├── achievement-system.js # 成就系统 ⭐
│   │   └── settings-module.js    # 设置中心 ⭐
│   │
│   └── utils/             # 工具函数
│       ├── calendar-utils.js     # 日历工具
│       ├── effects-utils.js      # 特效工具
│       ├── performance-utils.js  # 性能优化
│       ├── user-system.js        # 用户系统
│       ├── interaction-utils.js  # 交互工具
│       ├── optimization.js       # 资源优化
│       ├── advanced-analysis.js  # 高级分析
│       ├── config-manager.js     # 配置管理 ⭐
│       └── error-handler.js      # 错误处理 ⭐
│
├── README.md              # 项目文档
├── DEEP_EXPANSION_COMPLETE.md   # 扩展报告
└── FUNCTION_EXPANSION_COMPLETE.md # 功能报告
```

---

## 🎯 功能模块

### 核心功能

#### 1. 万年历模块 (`almanac-module.js`)
- 年份视图：12 个月概览卡片
- 月份视图：完整日历网格
- 节日标注：公历农历节日
- 宜忌详情：点击日期显示详情
- 干支纪年：自动计算

**使用示例**:
```javascript
// 打开万年历
openModule('almanac');
```

#### 2. 择吉日模块 (`date-selection-module.js`)
- 8 种事件类型：嫁娶、出行、开业、入宅、动土、祭祀、剃头、求医
- 智能评分：30-100 分
- 吉日推荐：显示干支、理由、时辰
- 保存分享：一键保存或分享

**使用示例**:
```javascript
// 打开择吉日
openModule('date-selection');
```

#### 3. 成就系统 (`achievement-system.js`)
- 10 个等级：初学者 → 天机传人
- 12 个成就：初次见面、持之以恒等
- 5 个每日任务：签到、浏览、体验等
- 经验值系统：行为→经验→升级

**使用示例**:
```javascript
// 打开成就系统
openModule('achievements');

// 记录使用次数
AchievementSystem.recordUsage('bazi');

// 记录分享
AchievementSystem.recordShare();
```

#### 4. 设置中心 (`settings-module.js`)
- 主题切换：深色/浅色/经典
- 字体调节：小/中/大
- 音效控制：开关/音量
- 性能设置：懒加载/缓存
- 数据管理：导入/导出/清空

**使用示例**:
```javascript
// 打开设置中心
openModule('settings');

// 修改配置
ConfigManager.set('theme', 'light');
ConfigManager.set('fontSize', 'large');
```

---

## ⚙️ 配置管理

### ConfigManager API

```javascript
// 获取配置
ConfigManager.get('theme');
ConfigManager.get('fontSize');

// 设置配置
ConfigManager.set('theme', 'dark');
ConfigManager.set('soundEnabled', false);

// 批量设置
ConfigManager.setAll({
    theme: 'classic',
    fontSize: 'medium',
    animationsEnabled: true
});

// 重置配置
ConfigManager.reset();

// 导出配置
ConfigManager.exportConfig();

// 导入配置
ConfigManager.importConfig(file);

// 添加监听器
ConfigManager.addListener((config) => {
    console.log('配置变更:', config);
});
```

### 配置项说明

| 配置项 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| theme | string | 'dark' | 主题：dark/light/classic |
| primaryColor | string | '#D4AF37' | 主色调 |
| fontSize | string | 'medium' | 字体：small/medium/large |
| soundEnabled | boolean | true | 启用音效 |
| soundVolume | number | 0.5 | 音量：0-1 |
| animationsEnabled | boolean | true | 启用动画 |
| reduceMotion | boolean | false | 减少动态效果 |
| enableLazyLoad | boolean | true | 启用懒加载 |
| enableCache | boolean | true | 启用缓存 |
| enableAnalytics | boolean | false | 数据分析 |
| enableErrorReporting | boolean | true | 错误报告 |
| language | string | 'zh-CN' | 语言 |

---

## 🛠️ 错误处理

### ErrorHandler API

```javascript
// 日志记录
ErrorHandler.debug('调试信息', data);
ErrorHandler.info('提示信息', data);
ErrorHandler.warn('警告信息', data);
ErrorHandler.error('错误信息', data);
ErrorHandler.fatal('致命错误', data);

// 性能监控
ErrorHandler.startTimer('load');
// ... 执行代码
ErrorHandler.endTimer('load');

// 安全执行
ErrorHandler.safeExecute(() => {
    // 可能出错的代码
});

// 异步安全执行
await ErrorHandler.safeExecuteAsync(async () => {
    // 异步代码
});

// 重试机制
await ErrorHandler.retry(async () => {
    // 可能失败的操作
}, 3, 1000);

// 获取错误统计
const stats = ErrorHandler.getErrorStats();

// 清除错误日志
ErrorHandler.clearErrorLogs();

// 导出错误日志
ErrorHandler.exportErrorLogs();
```

---

## 📊 性能指标

### 加载性能

| 指标 | 目标值 | 当前值 |
|------|--------|--------|
| 首次内容绘制 (FCP) | < 1.5s | ~0.8s |
| 最大内容绘制 (LCP) | < 2.5s | ~1.2s |
| 首次输入延迟 (FID) | < 100ms | ~20ms |
| 累积布局偏移 (CLS) | < 0.1 | ~0.05 |

### 优化策略

1. **懒加载**: 按需加载模块
2. **缓存优化**: LocalStorage 数据缓存
3. **代码分割**: 模块化设计
4. **资源压缩**: CSS/JS 压缩
5. **CDN 加速**: 使用 CDN 加载第三方库

---

## 🎨 主题定制

### CSS 变量

```css
:root {
    --primary-color: #D4AF37;
    --base-font-size: 14px;
    --cinnabar: #C41E3A;
    --gold: #D4AF37;
    --ink: #1A1A1A;
    --bronze: #CD7F32;
    --jade: #00A86B;
    --vermilion: #E34234;
    --obsidian: #0B0B0B;
    --parchment: #F5E6D3;
    --mystic: #2D1B4E;
    --chaos: #1A0A2E;
}
```

### 主题切换

```javascript
// 深色主题
ConfigManager.set('theme', 'dark');

// 浅色主题
ConfigManager.set('theme', 'light');

// 经典主题
ConfigManager.set('theme', 'classic');
```

---

## 📱 浏览器兼容性

| 浏览器 | 最低版本 | 支持度 |
|--------|----------|--------|
| Chrome | 90+ | ✅ 完全支持 |
| Firefox | 88+ | ✅ 完全支持 |
| Safari | 14+ | ✅ 完全支持 |
| Edge | 90+ | ✅ 完全支持 |
| iOS Safari | 14+ | ✅ 完全支持 |
| Chrome Mobile | 90+ | ✅ 完全支持 |

---

## 🔧 开发指南

### 添加新功能模块

1. **创建模块文件**
```javascript
// js/modules/my-module.js
const MyModule = {
    init() {
        this.render();
        this.bindEvents();
    },
    
    render() {
        const container = document.getElementById('modalContent');
        container.innerHTML = '<div>我的模块</div>';
    },
    
    bindEvents() {
        // 绑定事件
    }
};

window.MyModule = MyModule;
```

2. **在 index.html 中引入**
```html
<script src="js/modules/my-module.js"></script>
```

3. **在 modal.js 中注册**
```javascript
'my-module': { 
    title: '我的模块', 
    loader: (body) => { 
        body.innerHTML = '<div id="myModuleContainer"></div>'; 
        setTimeout(() => MyModule.init(), 100); 
    } 
}
```

4. **添加入口按钮**
```html
<button onclick="openModule('my-module')">
    我的模块
</button>
```

---

## � 常见问题

### Q1: 如何修改默认主题？
修改 `ConfigManager.defaults.theme` 的值，或在设置中心切换。

### Q2: 数据存储在何处？
所有数据存储在 LocalStorage，无需后端服务器。

### Q3: 如何清空所有数据？
在设置中心 → 数据管理 → 清空所有数据。

### Q4: 如何导出配置？
在设置中心 → 数据管理 → 导出配置。

### Q5: 如何查看错误日志？
打开浏览器控制台，或导出错误日志查看。

---

## 🤝 贡献指南

### 提交代码

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

### 代码规范

- 使用 ES6+ 语法
- 函数添加 JSDoc 注释
- 变量使用有意义的命名
- 保持代码格式一致

---

## 📄 开源协议

MIT License - 详见 [LICENSE](LICENSE)

---

## 👥 开发团队

- **开发**: 天机黄历开发组
- **设计**: 天机黄历设计组
- **版本**: v2.0
- **更新日期**: 2026-03-06

---

## 📞 联系方式

- **项目主页**: [GitHub](https://github.com/your-username/tianji-calendar)
- **问题反馈**: [Issues](https://github.com/your-username/tianji-calendar/issues)
- **邮箱**: support@tianji-calendar.com

---

## 🙏 致谢

感谢所有为这个项目做出贡献的开发者和用户！

**传承千年智慧，洞察天机奥秘。**

---

<div align="center">

![天机黄历](https://img.shields.io/badge/天机黄历-v2.0-gold?style=for-the-badge)

Made with ❤️ by 天机黄历开发组

</div>
