document.addEventListener('DOMContentLoaded', function() {
    
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', async function() {
            const recipeData = {
                title: 'Grão de Bico Crocante 🫘',
                text: 'Aprenda a fazer esse snack saudável e crocante no forno ou airfryer!',
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
            this.style.backgroundColor = '#D7CCC8';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '#EFEBE9';
        });
    });
    
    const steps = document.querySelectorAll('.steps-list li');
    steps.forEach(step => {
        step.addEventListener('click', function() {
            steps.forEach(s => { s.style.backgroundColor = '#EFEBE9'; s.style.transform = 'scale(1)'; });
            this.style.backgroundColor = '#D7CCC8';
            this.style.transform = 'scale(1.02)';
        });
    });
    
    // Timer do forno/airfryer - clique duplo no passo 5
    const ovenStep = document.querySelector('.steps-list li:nth-child(5)');
    if (ovenStep) {
        ovenStep.addEventListener('dblclick', function() {
            let timeLeft = 25;
            this.style.backgroundColor = '#D7CCC8';
            this.innerHTML = `<strong>Assando...</strong> ⏱️ ${timeLeft} minutos restantes`;
            
            const timer = setInterval(() => {
                timeLeft--;
                if (timeLeft > 0) {
                    this.innerHTML = `<strong>Assando...</strong> ⏱️ ${timeLeft} minutos restantes`;
                } else {
                    clearInterval(timer);
                    this.innerHTML = `<strong>Pronto!</strong> 🎉 Grão de bico crocante!`;
                    this.style.backgroundColor = '#C8E6C9';
                    this.style.transform = 'scale(1.05)';
                    
                    setTimeout(() => {
                        this.style.transform = 'scale(1)';
                        this.innerHTML = '<strong>Asse:</strong> Coloque os grãos na airfryer ou em uma assadeira. Asse por 20-25 minutos.';
                    }, 2000);
                }
            }, 1000);
        });
    }
    
    // Som de crocância ao clicar no último passo
    const lastStep = document.querySelector('.steps-list li:last-child');
    if (lastStep) {
        lastStep.addEventListener('click', function() {
            this.innerHTML = '<strong>Croc!</strong> 🫘 Snack crocante e saudável!';
            this.style.backgroundColor = '#BCAAA4';
            
            setTimeout(() => {
                this.innerHTML = '<strong>Sirva:</strong> Deixe esfriar um pouco e aproveite como snack crocante!';
                this.style.backgroundColor = '#EFEBE9';
            }, 1500);
        });
    }
});