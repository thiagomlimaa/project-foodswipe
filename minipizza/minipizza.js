document.addEventListener('DOMContentLoaded', function() {
    
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', async function() {
            const recipeData = {
                title: 'Mini Pizza de Pão Integral 🍕',
                text: 'Aprenda a fazer essa pizza saudável em 8 minutos!',
                url: window.location.href
            };
            if (navigator.share) {
                try { await navigator.share(recipeData); } catch (err) {}
            } else {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('📋 Link da receita copiado!');
                } catch (err) {
                    const textarea = document.createElement('textarea');
                    textarea.value = window.location.href;
                    document.body.appendChild(textarea);
                    textarea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textarea);
                    alert('📋 Link da receita copiado!');
                }
            }
        });
    }
    
    const btnPrint = document.getElementById('btn-print');
    if (btnPrint) btnPrint.addEventListener('click', () => window.print());
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.recipe-section').forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(section);
    });
    
    document.querySelectorAll('.ingredients-list li').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = '#FFCDD2';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '#FFF3E0';
        });
    });
    
    const steps = document.querySelectorAll('.steps-list li');
    steps.forEach(step => {
        step.addEventListener('click', function() {
            steps.forEach(s => { s.style.backgroundColor = '#FFF3E0'; s.style.transform = 'scale(1)'; });
            this.style.backgroundColor = '#FFCDD2';
            this.style.transform = 'scale(1.02)';
        });
    });
    
    // Efeito de forno - clique duplo no passo 6
    const ovenStep = document.querySelector('.steps-list li:nth-child(6)');
    if (ovenStep) {
        ovenStep.addEventListener('dblclick', function() {
            let timeLeft = 8;
            this.style.backgroundColor = '#FFCDD2';
            this.innerHTML = `<strong>Assando...</strong> ⏱️ ${timeLeft} minutos restantes`;
            
            const timer = setInterval(() => {
                timeLeft--;
                if (timeLeft > 0) {
                    this.innerHTML = `<strong>Assando...</strong> ⏱️ ${timeLeft} minutos restantes`;
                } else {
                    clearInterval(timer);
                    this.innerHTML = `<strong>Pronto!</strong> 🎉 Pizza quentinha!`;
                    this.style.backgroundColor = '#C8E6C9';
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                        this.innerHTML = '<strong>Asse:</strong> Leve ao forno ou airfryer por 5-8 minutos até o queijo derreter.';
                    }, 2000);
                }
            }, 1000);
        });
    }
});