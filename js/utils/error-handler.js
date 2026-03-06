/**
 * 错误处理与日志记录模块
 * 提供统一的错误捕获、日志记录、异常处理机制
 * @module ErrorHandler
 */

const ErrorHandler = {
    /**
     * 日志级别
     */
    LOG_LEVELS: {
        DEBUG: 0,
        INFO: 1,
        WARN: 2,
        ERROR: 3,
        FATAL: 4
    },
    
    /**
     * 当前日志级别
     */
    currentLevel: 0,
    
    /**
     * 错误日志存储
     */
    errorLogs: [],
    
    /**
     * 最大日志条数
     */
    maxLogs: 100,
    
    /**
     * 是否启用错误报告
     */
    enableErrorReporting: true,
    
    /**
     * 初始化错误处理器
     */
    init() {
        this.setupGlobalHandlers();
        this.setupPromiseHandler();
        this.loadErrorLogs();
        console.log('[ErrorHandler] 初始化完成');
    },
    
    /**
     * 设置全局错误处理器
     */
    setupGlobalHandlers() {
        window.onerror = (message, source, lineno, colno, error) => {
            this.handleError({
                message,
                source,
                lineno,
                colno,
                stack: error?.stack,
                type: 'global'
            });
            return true; // 阻止默认错误处理
        };
    },
    
    /**
     * 设置 Promise 错误处理器
     */
    setupPromiseHandler() {
        window.onunhandledrejection = (event) => {
            this.handleError({
                message: event.reason?.message || 'Unhandled Promise Rejection',
                stack: event.reason?.stack,
                type: 'promise'
            });
        };
    },
    
    /**
     * 处理错误
     */
    handleError(errorInfo) {
        const error = {
            timestamp: new Date().toISOString(),
            ...errorInfo,
            userAgent: navigator.userAgent,
            url: window.location.href
        };
        
        // 添加到错误日志
        this.errorLogs.push(error);
        if (this.errorLogs.length > this.maxLogs) {
            this.errorLogs.shift();
        }
        
        // 保存到 LocalStorage
        this.saveErrorLogs();
        
        // 控制台输出
        this.logToConsole(error);
        
        // 显示错误提示
        this.showErrorNotification(error);
        
        // 发送错误报告（如果启用）
        if (this.enableErrorReporting) {
            this.sendErrorReport(error);
        }
    },
    
    /**
     * 日志输出到控制台
     */
    logToConsole(error) {
        const prefix = '[ERROR]';
        const time = new Date(error.timestamp).toLocaleTimeString();
        
        console.group(`${prefix} ${time}`);
        console.error('消息:', error.message);
        console.error('位置:', error.source, `L${error.lineno}:C${error.colno}`);
        if (error.stack) {
            console.error('堆栈:', error.stack);
        }
        console.groupEnd();
    },
    
    /**
     * 显示错误通知
     */
    showErrorNotification(error) {
        // 生产环境显示友好提示
        const isProd = !window.location.hostname.includes('localhost');
        
        if (isProd && window.ToastUtils) {
            ToastUtils.show('发生错误，已记录日志', 'error');
        }
    },
    
    /**
     * 发送错误报告
     */
    sendErrorReport(error) {
        // 实际项目中可以发送到服务器
        // 这里仅做本地存储
        const reports = JSON.parse(localStorage.getItem('tianji_error_reports') || '[]');
        reports.push(error);
        
        // 限制报告数量
        if (reports.length > 50) {
            reports.shift();
        }
        
        localStorage.setItem('tianji_error_reports', JSON.stringify(reports));
    },
    
    /**
     * 保存错误日志
     */
    saveErrorLogs() {
        try {
            localStorage.setItem('tianji_error_logs', JSON.stringify(this.errorLogs));
        } catch (e) {
            console.error('[ErrorHandler] 保存错误日志失败:', e);
        }
    },
    
    /**
     * 加载错误日志
     */
    loadErrorLogs() {
        try {
            const logs = localStorage.getItem('tianji_error_logs');
            if (logs) {
                this.errorLogs = JSON.parse(logs);
            }
        } catch (e) {
            console.error('[ErrorHandler] 加载错误日志失败:', e);
            this.errorLogs = [];
        }
    },
    
    /**
     * 通用日志方法
     */
    log(level, message, data = null) {
        if (level < this.currentLevel) return;
        
        const entry = {
            timestamp: new Date().toISOString(),
            level,
            message,
            data
        };
        
        const levelNames = ['DEBUG', 'INFO', 'WARN', 'ERROR', 'FATAL'];
        const consoleMethods = ['log', 'log', 'warn', 'error', 'error'];
        
        console.log(`[${levelNames[level]}] ${entry.timestamp} - ${message}`);
        if (data) {
            consoleMethods[level](data);
        }
    },
    
    debug(message, data) {
        this.log(this.LOG_LEVELS.DEBUG, message, data);
    },
    
    info(message, data) {
        this.log(this.LOG_LEVELS.INFO, message, data);
    },
    
    warn(message, data) {
        this.log(this.LOG_LEVELS.WARN, message, data);
    },
    
    error(message, data) {
        this.log(this.LOG_LEVELS.ERROR, message, data);
    },
    
    fatal(message, data) {
        this.log(this.LOG_LEVELS.FATAL, message, data);
    },
    
    /**
     * 性能监控 - 开始计时
     */
    startTimer(label) {
        if (!this.timers) this.timers = {};
        this.timers[label] = performance.now();
    },
    
    /**
     * 性能监控 - 结束计时
     */
    endTimer(label) {
        if (!this.timers || !this.timers[label]) return;
        
        const duration = performance.now() - this.timers[label];
        delete this.timers[label];
        
        this.info(`性能 [${label}]: ${duration.toFixed(2)}ms`);
        return duration;
    },
    
    /**
     * 获取错误统计
     */
    getErrorStats() {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekAgo = new Date(today.getTime() - 7 * 24 * 60 * 60 * 1000);
        
        const stats = {
            total: this.errorLogs.length,
            today: 0,
            thisWeek: 0,
            byType: {}
        };
        
        this.errorLogs.forEach(error => {
            const errorDate = new Date(error.timestamp);
            
            if (errorDate >= today) stats.today++;
            if (errorDate >= weekAgo) stats.thisWeek++;
            
            const type = error.type || 'unknown';
            stats.byType[type] = (stats.byType[type] || 0) + 1;
        });
        
        return stats;
    },
    
    /**
     * 清除错误日志
     */
    clearErrorLogs() {
        this.errorLogs = [];
        localStorage.removeItem('tianji_error_logs');
        localStorage.removeItem('tianji_error_reports');
        this.info('错误日志已清除');
    },
    
    /**
     * 导出错误日志
     */
    exportErrorLogs() {
        const dataStr = JSON.stringify(this.errorLogs, null, 2);
        const blob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `tianji-error-logs-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    },
    
    /**
     * 安全执行函数（带错误捕获）
     */
    safeExecute(fn, context = null, ...args) {
        try {
            return fn.apply(context, args);
        } catch (error) {
            this.handleError({
                message: error.message,
                stack: error.stack,
                type: 'function_execution',
                functionName: fn.name || 'anonymous'
            });
            return null;
        }
    },
    
    /**
     * 异步安全执行函数
     */
    async safeExecuteAsync(fn, context = null, ...args) {
        try {
            return await fn.apply(context, args);
        } catch (error) {
            this.handleError({
                message: error.message,
                stack: error.stack,
                type: 'async_function_execution',
                functionName: fn.name || 'anonymous'
            });
            return null;
        }
    },
    
    /**
     * 重试机制
     */
    async retry(fn, maxRetries = 3, delay = 1000) {
        let lastError;
        
        for (let i = 0; i < maxRetries; i++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error;
                this.warn(`重试 ${i + 1}/${maxRetries} 失败:`, error.message);
                
                if (i < maxRetries - 1) {
                    await this.sleep(delay * Math.pow(2, i)); // 指数退避
                }
            }
        }
        
        this.error(`重试 ${maxRetries} 次后仍然失败:`, lastError);
        throw lastError;
    },
    
    /**
     * 延迟函数
     */
    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    },
    
    /**
     * 设置日志级别
     */
    setLogLevel(level) {
        this.currentLevel = level;
        this.info(`日志级别已设置为：${this.LOG_LEVELS[level]}`);
    }
};

// 导出模块
if (typeof window !== 'undefined') {
    window.ErrorHandler = ErrorHandler;
}
