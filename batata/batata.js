document.addEventListener('DOMContentLoaded', function() {
    
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', async function() {
            const recipeData = {
                title: 'Batata na Airfryer 🥔',
                text: 'Aprenda a fazer batata crocante sem fritura na airfryer!',
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
            this.style.backgroundColor = '#FFE0B2';
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
            this.style.backgroundColor = '#FFE0B2';
            this.style.transform = 'scale(1.02)';
        });
    });
    
    // Timer da airfryer - clique duplo no passo 7
    const airfryerStep = document.querySelector('.steps-list li:nth-child(7)');
    if (airfryerStep) {
        airfryerStep.addEventListener('dblclick', function() {
            let timeLeft = 25;
            this.style.backgroundColor = '#FFE0B2';
            this.innerHTML = `<strong>Assando...</strong> ⏱️ ${timeLeft} minutos restantes`;
            
            const timer = setInterval(() => {
                timeLeft--;
                if (timeLeft > 0) {
                    this.innerHTML = `<strong>Assando...</strong> ⏱️ ${timeLeft} minutos restantes`;
                } else {
                    clearInterval(timer);
                    this.innerHTML = `<strong>Pronto!</strong> 🎉 Batatas crocantes!`;
                    this.style.backgroundColor = '#C8E6C9';
                    this.style.transform = 'scale(1.05)';
                    
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                        this.innerHTML = '<strong>Asse:</strong> Coloque as batatas no cesto sem amontoar. Asse por 20-25 minutos a 200°C.';
                    }, 2000);
                }
            }, 1000);
        });
    }
    
    // Dica do molho - clique no passo 8
    const shakeStep = document.querySelector('.steps-list li:nth-child(8)');
    if (shakeStep) {
        shakeStep.addEventListener('click', function() {
            this.style.transform = 'rotate(5deg) scale(1.02)';
            this.style.backgroundColor = '#FFCC80';
            
            setTimeout(() => {
                this.style.transform = 'rotate(-3deg) scale(1.02)';
            }, 150);
            
            setTimeout(() => {
                this.style.transform = 'scale(1)';
                this.style.backgroundColor = '#FFF3E0';
            }, 400);
        });
    }
});