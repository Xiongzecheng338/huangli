# 天机黄历 - GitHub 部署指南

## 📋 部署前准备

### 1. 检查清单
在上传到 GitHub 之前，请确保:
- [x] 所有功能测试通过
- [x] 代码质量检查通过
- [x] 文档完整
- [x] .gitignore 已创建
- [x] LICENSE 已添加
- [x] README.md 完整

### 2. 文件清单
确保以下文件存在:
```
yellow-calendar/
├── index.html              ✅
├── README.md               ✅
├── LICENSE                 ✅
├── .gitignore              ✅
├── css/
│   └── main.css            ✅
├── js/
│   ├── data/               ✅ (14 个文件)
│   ├── modules/            ✅ (15 个文件)
│   └── utils/              ✅ (9 个文件)
├── test.html               ✅ (测试页面)
└── 文档/
    ├── FINAL_CHECKLIST.md  ✅
    ├── OPTIMIZATION_SUMMARY.md ✅
    ├── SYSTEM_OPTIMIZATION_COMPLETE.md ✅
    └── FUNCTION_EXPANSION_COMPLETE.md ✅
```

---

## 🚀 部署方式

### 方式一：GitHub 命令行 (推荐)

#### 步骤 1: 初始化 Git 仓库
```bash
cd c:\Users\X1882\Desktop\ppp\yellow-calendar
git init
git add .
git commit -m "✨ v2.0 - 系统性优化与功能扩展完成"
```

#### 步骤 2: 创建 GitHub 仓库
1. 访问 https://github.com/new
2. 仓库名称：`tianji-calendar` (或其他名称)
3. 描述：`天机黄历 - 传承千年智慧`
4. 选择 **Public** (公开)
5. **不要** 勾选 "Initialize this repository with a README"
6. 点击 "Create repository"

#### 步骤 3: 关联远程仓库
```bash
# 替换为你的 GitHub 用户名
git remote add origin https://github.com/YOUR_USERNAME/tianji-calendar.git

# 推送代码
git branch -M main
git push -u origin main
```

#### 步骤 4: 启用 GitHub Pages
1. 进入仓库 Settings
2. 点击左侧 "Pages"
3. Source 选择 "Deploy from a branch"
4. Branch 选择 "main"
5. Folder 选择 "/ (root)"
6. 点击 "Save"
7. 等待几分钟，访问生成的 URL

---

### 方式二：GitHub Desktop

#### 步骤 1: 安装 GitHub Desktop
下载地址：https://desktop.github.com/

#### 步骤 2: 添加本地仓库
1. 打开 GitHub Desktop
2. File → Add Local Repository
3. 选择项目文件夹：`c:\Users\X1882\Desktop\ppp\yellow-calendar`
4. 点击 "Add repository"

#### 步骤 3: 发布到 GitHub
1. 点击右上角 "Publish repository"
2. 填写仓库信息:
   - Name: `tianji-calendar`
   - Description: `天机黄历 - 传承千年智慧`
   - 勾选 "Keep this code private" (如需私有)
3. 点击 "Publish repository"

#### 步骤 4: 启用 GitHub Pages
同上

---

### 方式三：Vercel 部署 (推荐用于生产)

#### 步骤 1: 安装 Vercel CLI
```bash
npm install -g vercel
```

#### 步骤 2: 部署
```bash
cd c:\Users\X1882\Desktop\ppp\yellow-calendar
vercel
```

#### 步骤 3: 按提示操作
1. 首次使用需要登录
2. 选择 "Set up and deploy"
3. 接受默认配置
4. 等待部署完成

#### 步骤 4: 获取访问地址
部署完成后会提供访问 URL，如:
```
https://tianji-calendar.vercel.app
```

---

### 方式四：Netlify 部署

#### 步骤 1: 访问 Netlify
https://app.netlify.com/

#### 步骤 2: 创建新站点
1. 点击 "Add new site"
2. 选择 "Deploy manually"
3. 拖拽项目文件夹到上传区域
4. 等待部署完成

#### 步骤 3: 配置自定义域名 (可选)
1. 进入 "Domain settings"
2. 点击 "Add custom domain"
3. 输入域名
4. 按提示配置 DNS

---

## 📊 性能优化建议

### 1. CDN 加速
将第三方库改为 CDN 链接:
```html
<!-- TailwindCSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- FontAwesome -->
<link rel="stylesheet" 
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

<!-- Google Fonts -->
<link href="https://fonts.googleapis.com/css2?family=Ma+Shan+Zheng&family=ZCOOL+XiaoWei&display=swap" 
      rel="stylesheet">
```

### 2. 资源压缩
```bash
# 安装 HTML 压缩工具
npm install -g html-minifier

# 压缩 HTML
html-minifier --collapse-whitespace --minify-css true --minify-js true index.html -o index.min.html

# 压缩 CSS
npm install -g clean-css-cli
cleancss -o main.min.css main.css

# 压缩 JS
npm install -g uglify-js
uglifyjs js/**/*.js -o bundle.min.js
```

### 3. 启用 Gzip
如果使用 Nginx:
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
gzip_min_length 1000;
```

---

## 🔧 部署后验证

### 1. 功能验证
访问部署后的 URL，检查:
- [ ] 页面正常加载
- [ ] 样式渲染正确
- [ ] 所有功能可用
- [ ] 无控制台错误
- [ ] 响应式布局正常

### 2. 性能验证
使用 Lighthouse 测试:
1. 打开 Chrome DevTools
2. 切换到 "Lighthouse" 标签
3. 点击 "Analyze page load"
4. 检查各项分数

**目标分数**:
- Performance: ≥ 90
- Accessibility: ≥ 95
- Best Practices: ≥ 95
- SEO: ≥ 95

### 3. 兼容性验证
在以下浏览器测试:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] 手机浏览器

---

## 📝 常见问题

### Q1: GitHub Pages 访问慢？
**解决方案**:
1. 使用 CDN 加速静态资源
2. 启用 Gzip 压缩
3. 使用第三方 CDN (如 Cloudflare)

### Q2: 自定义域名如何配置？
**解决方案**:
1. GitHub Pages Settings → Pages
2. Custom domain 输入域名
3. 在域名提供商处配置 CNAME

### Q3: HTTPS 证书如何获取？
**解决方案**:
GitHub Pages 自动提供 HTTPS 证书，启用后自动生效

### Q4: 如何更新代码？
**解决方案**:
```bash
git add .
git commit -m "更新说明"
git push
```

### Q5: 如何回退版本？
**解决方案**:
```bash
# 查看历史版本
git log

# 回退到指定版本
git reset --hard COMMIT_HASH

# 强制推送
git push -f origin main
```

---

## 🎯 部署检查清单

### 部署前
- [ ] 所有测试通过
- [ ] 代码审查完成
- [ ] 文档完整
- [ ] .gitignore 配置
- [ ] LICENSE 添加

### 部署中
- [ ] 仓库创建成功
- [ ] 代码推送成功
- [ ] GitHub Pages 启用
- [ ] HTTPS 启用

### 部署后
- [ ] 网站可访问
- [ ] 功能正常
- [ ] 性能达标
- [ ] 兼容性良好
- [ ] 无控制台错误

---

## 📈 监控与维护

### 1. 访问统计
- GitHub Pages 自带统计
- 集成 Google Analytics
- 使用第三方统计工具

### 2. 错误监控
- 浏览器控制台
- ErrorHandler 日志
- 用户反馈

### 3. 定期更新
- 每月检查依赖更新
- 每季度性能优化
- 及时修复 bug

---

## 🎊 部署成功标志

当你看到以下内容时，表示部署成功:

✅ 网站可通过 URL 访问  
✅ 所有功能正常工作  
✅ 性能指标达标  
✅ 无控制台错误  
✅ 响应式布局正常  

**恭喜！你的天机黄历已成功部署!** 🎉

---

**部署日期**: 2026-03-06  
**版本**: v2.0  
**开发团队**: 天机黄历开发组
