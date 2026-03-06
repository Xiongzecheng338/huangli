const InteractionManager = {
    showToast(message, type = 'info', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 rounded-xl shadow-lg transition-all duration-300 ${
            type === 'success' ? 'bg-jade/90' :
            type === 'error' ? 'bg-cinnabar/90' :
            type === 'warning' ? 'bg-bronze/90' :
            'bg-gold/90'
        } text-parchment`;
        toast.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas ${
                    type === 'success' ? 'fa-check-circle' :
                    type === 'error' ? 'fa-exclamation-circle' :
                    type === 'warning' ? 'fa-exclamation-triangle' :
                    'fa-info-circle'
                }"></i>
                <span>${message}</span>
            </div>
        `;
        
        document.body.appendChild(toast);
        
        setTimeout(() => {
            toast.style.opacity = '0';
            toast.style.transform = 'translate(-50%, -20px)';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    },

    showLoading(container, message = '加载中...') {
        const loading = document.createElement('div');
        loading.id = 'loadingOverlay';
        loading.className = 'absolute inset-0 bg-obsidian/80 backdrop-blur-sm flex items-center justify-center z-50 rounded-xl';
        loading.innerHTML = `
            <div class="text-center">
                <i class="fas fa-spinner fa-spin text-4xl text-gold mb-3"></i>
                <div class="text-parchment">${message}</div>
            </div>
        `;
        
        const targetContainer = document.querySelector(container);
        if (targetContainer) {
            targetContainer.style.position = 'relative';
            targetContainer.appendChild(loading);
        }
    },

    hideLoading() {
        const loading = document.getElementById('loadingOverlay');
        if (loading) {
            loading.remove();
        }
    },

    showConfetti(element) {
        const rect = element.getBoundingClientRect();
        const colors = ['#D4AF37', '#C41E3A', '#00A86B', '#CD7F32'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'fixed pointer-events-none z-50';
            particle.style.cssText = `
                width: ${Math.random() * 8 + 4}px;
                height: ${Math.random() * 8 + 4}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${rect.left + rect.width / 2}px;
                top: ${rect.top + rect.height / 2}px;
                border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            `;
            
            document.body.appendChild(particle);
            
            const angle = Math.random() * Math.PI * 2;
            const velocity = Math.random() * 100 + 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity - 50;
            
            let posX = rect.left + rect.width / 2;
            let posY = rect.top + rect.height / 2;
            let velX = vx;
            let velY = vy;
            let opacity = 1;
            
            const animate = () => {
                posX += velX * 0.016;
                posY += velY * 0.016;
                velY += 200 * 0.016;
                opacity -= 0.02;
                
                particle.style.left = posX + 'px';
                particle.style.top = posY + 'px';
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animate);
                } else {
                    particle.remove();
                }
            };
            
            requestAnimationFrame(animate);
        }
    },

    addRipple(event, element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = event.clientX - rect.left - size / 2;
        const y = event.clientY - rect.top - size / 2;
        
        ripple.className = 'absolute rounded-full bg-white/30 transform scale-0 animate-ping';
        ripple.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
        `;
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    },

    initTooltips() {
        document.querySelectorAll('[data-tooltip]').forEach(element => {
            const tooltip = document.createElement('div');
            tooltip.className = 'tooltip-text';
            tooltip.textContent = element.getAttribute('data-tooltip');
            element.appendChild(tooltip);
            element.classList.add('tooltip');
        });
    },

    addSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    },

    initButtonEffects() {
        document.querySelectorAll('button, .cursor-pointer').forEach(button => {
            button.addEventListener('click', function(e) {
                if (!this.classList.contains('no-ripple')) {
                    InteractionManager.addRipple(e, this);
                }
            });
            
            button.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px)';
                this.style.transition = 'transform 0.2s ease';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
            });
        });
    },

    showNotification(title, message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = 'fixed bottom-4 right-4 z-50 glass rounded-xl p-4 max-w-sm shadow-2xl transform transition-all duration-300 translate-y-20 opacity-0';
        notification.innerHTML = `
            <div class="flex items-start space-x-3">
                <div class="flex-shrink-0">
                    <i class="fas ${
                        type === 'success' ? 'fa-check-circle text-jade' :
                        type === 'error' ? 'fa-exclamation-circle text-cinnabar' :
                        'fa-info-circle text-gold'
                    } text-xl"></i>
                </div>
                <div class="flex-1">
                    <h4 class="text-gold ancient-font text-sm mb-1">${title}</h4>
                    <p class="text-parchment/80 text-xs">${message}</p>
                </div>
                <button onclick="this.closest('.fixed').remove()" class="text-gold/50 hover:text-gold">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        requestAnimationFrame(() => {
            notification.classList.remove('translate-y-20', 'opacity-0');
        });
        
        setTimeout(() => {
            notification.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    },

    init() {
        this.initButtonEffects();
        this.addSmoothScroll();
        this.initTooltips();
    }
};

const SoundManager = {
    enabled: true,
    
    play(type = 'click') {
        if (!this.enabled) return;
        
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        switch(type) {
            case 'click':
                oscillator.frequency.value = 800;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.1);
                break;
            case 'success':
                oscillator.frequency.value = 1000;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start(audioContext.currentTime);
                oscillator.stop(audioContext.currentTime + 0.3);
                break;
        }
    },
    
    toggle() {
        this.enabled = !this.enabled;
        return this.enabled;
    }
};
