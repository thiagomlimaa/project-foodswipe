document.addEventListener('DOMContentLoaded', function() {
    
    const btnShare = document.getElementById('btn-share');
    if (btnShare) {
        btnShare.addEventListener('click', async function() {
            const recipeData = {
                title: 'Omelete Recheado 🍳',
                text: 'Aprenda a fazer esse omelete recheado delicioso em 10 minutos!',
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
            this.style.backgroundColor = '#FFF9C4';
        });
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '#FFFDE7';
        });
    });
    
    const steps = document.querySelectorAll('.steps-list li');
    steps.forEach(step => {
        step.addEventListener('click', function() {
            steps.forEach(s => { s.style.backgroundColor = '#FFFDE7'; s.style.transform = 'scale(1)'; });
            this.style.backgroundColor = '#FFF9C4';
            this.style.transform = 'scale(1.02)';
        });
    });
    
    // Efeito de dobrar o omelete - clique duplo no passo 6
    const foldStep = document.querySelector('.steps-list li:nth-child(6)');
    if (foldStep) {
        foldStep.addEventListener('dblclick', function() {
            this.innerHTML = '<strong>Dobrando...</strong> 🍳 Formando a meia-lua!';
            this.style.backgroundColor = '#FFE082';
            this.style.transform = 'scale(1.05)';
            
            setTimeout(() => {
                this.innerHTML = '<strong>Pronto!</strong> 🎉 Omelete dobrado com sucesso!';
                this.style.backgroundColor = '#C8E6C9';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                    this.innerHTML = '<strong>Dobre:</strong> Com uma espátula, dobre a outra metade sobre o recheio.';
                }, 1500);
            }, 800);
        });
    }
    
    // Efeito de chiado na frigideira - hover no passo 2
    const panStep = document.querySelector('.steps-list li:nth-child(2)');
    if (panStep) {
        panStep.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#FFE082';
            this.style.transform = 'scale(1.03)';
        });
        panStep.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '#FFFDE7';
            this.style.transform = 'scale(1)';
        });
    }
});