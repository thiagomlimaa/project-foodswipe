document.addEventListener('DOMContentLoaded', function() {
    
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', async function() {
            const recipeData = {
                title: 'Iogurte com Frutas e Granola 🥣',
                text: 'Aprenda a montar esse café da manhã saudável em 3 minutos!',
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
            this.style.backgroundColor = '#C8E6C9';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '#F1F8E9';
        });
    });
    
    const steps = document.querySelectorAll('.steps-list li');
    steps.forEach(step => {
        step.addEventListener('click', function() {
            steps.forEach(s => { s.style.backgroundColor = '#F1F8E9'; s.style.transform = 'scale(1)'; });
            this.style.backgroundColor = '#C8E6C9';
            this.style.transform = 'scale(1.02)';
        });
    });
    
    // Animação de montagem - clique no último passo
    const lastStep = document.querySelector('.steps-list li:last-child');
    if (lastStep) {
        lastStep.addEventListener('dblclick', function() {
            this.innerHTML = '<strong>Montando...</strong> ✨ Preparando sua tigela!';
            this.style.backgroundColor = '#C8E6C9';
            
            setTimeout(() => {
                this.innerHTML = '<strong>Pronto!</strong> 🎉 É só montar e aproveitar!';
                this.style.backgroundColor = '#A5D6A7';
                this.style.transform = 'scale(1.05)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.innerHTML = '<strong>Sirva:</strong> Pronto! É só montar e aproveitar. Não precisa cozinhar nada!';
                }, 1500);
            }, 500);
        });
    }
});