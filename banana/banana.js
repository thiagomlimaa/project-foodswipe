// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== BOTÃO COMPARTILHAR =====
    const btnShare = document.getElementById('btn-share');
    
    if (btnShare) {
        btnShare.addEventListener('click', async function() {
            const recipeData = {
                title: 'Panqueca de Banana 🍌',
                text: 'Aprenda a fazer essa panqueca saudável e deliciosa em 10 minutos!',
                url: window.location.href
            };
            
            if (navigator.share) {
                try {
                    await navigator.share(recipeData);
                    console.log('Receita compartilhada com sucesso!');
                } catch (err) {
                    console.log('Erro ao compartilhar:', err);
                }
            } else {
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('📋 Link da receita copiado para a área de transferência!');
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
    
    // ===== BOTÃO IMPRIMIR =====
    const btnPrint = document.getElementById('btn-print');
    
    if (btnPrint) {
        btnPrint.addEventListener('click', function() {
            window.print();
        });
    }
    
    // ===== ANIMAÇÃO DE ENTRADA DOS ELEMENTOS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const sections = document.querySelectorAll('.recipe-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(section);
    });
    
    // ===== DESTAQUE DOS INGREDIENTES =====
    const ingredients = document.querySelectorAll('.ingredients-list li');
    
    ingredients.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = '#FFF9C4';
            this.style.transition = 'all 0.3s';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '#FFFDE7';
        });
    });
    
    // ===== MODO DE PREPARO INTERATIVO =====
    const steps = document.querySelectorAll('.steps-list li');
    
    steps.forEach(step => {
        step.addEventListener('click', function() {
            steps.forEach(s => {
                s.style.backgroundColor = '#FFFDE7';
                s.style.transform = 'scale(1)';
            });
            
            this.style.backgroundColor = '#FFF9C4';
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'all 0.3s';
        });
    });
});

// Adiciona animações ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from { opacity: 0; transform: translate(-50%, -20px); }
        to { opacity: 1; transform: translate(-50%, 0); }
    }
    @keyframes slideUp {
        from { opacity: 1; transform: translate(-50%, 0); }
        to { opacity: 0; transform: translate(-50%, -20px); }
    }
`;
document.head.appendChild(style);