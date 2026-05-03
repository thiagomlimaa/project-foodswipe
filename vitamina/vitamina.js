// Aguarda o DOM carregar completamente
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== BOTÃO COMPARTILHAR =====
    const btnShare = document.getElementById('btn-share');
    
    if (btnShare) {
        btnShare.addEventListener('click', async function() {
            const recipeData = {
                title: 'Vitamina de Abacate com Hortelã 🥑',
                text: 'Aprenda a fazer essa receita deliciosa e saudável!',
                url: window.location.href
            };
            
            // Verifica se a Web Share API está disponível
            if (navigator.share) {
                try {
                    await navigator.share(recipeData);
                    console.log('Receita compartilhada com sucesso!');
                } catch (err) {
                    console.log('Erro ao compartilhar:', err);
                    // Se o usuário cancelar, não faz nada
                }
            } else {
                // Fallback: copia o link para a área de transferência
                try {
                    await navigator.clipboard.writeText(window.location.href);
                    alert('📋 Link da receita copiado para a área de transferência!');
                } catch (err) {
                    // Fallback manual
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
    
    // Aplica animação em todas as seções
    const sections = document.querySelectorAll('.recipe-section');
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.5s ease ${index * 0.1}s`;
        observer.observe(section);
    });
    
    // ===== DESTAQUE DOS INGREDIENTES AO PASSAR O MOUSE =====
    const ingredients = document.querySelectorAll('.ingredients-list li');
    
    ingredients.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(5px)';
            this.style.backgroundColor = '#C8E6C9';
            this.style.transition = 'all 0.3s';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
            this.style.backgroundColor = '#F1F8E9';
        });
    });
    
    // ===== CONTADOR DE TEMPO VISUAL (OPCIONAL) =====
    const timerDisplay = document.querySelector('.meta-item:first-child');
    
    if (timerDisplay) {
        timerDisplay.addEventListener('click', function() {
            const timeInMinutes = 5;
            const message = `⏱️ Esta receita fica pronta em apenas ${timeInMinutes} minutinhos!`;
            
            // Cria um tooltip temporário
            const tooltip = document.createElement('div');
            tooltip.textContent = message;
            tooltip.style.cssText = `
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: #2E7D32;
                color: white;
                padding: 1rem 2rem;
                border-radius: 30px;
                font-weight: 500;
                z-index: 1000;
                box-shadow: 0 10px 20px rgba(0,0,0,0.2);
                animation: slideDown 0.5s ease;
            `;
            
            document.body.appendChild(tooltip);
            
            // Remove o tooltip após 3 segundos
            setTimeout(() => {
                tooltip.style.animation = 'slideUp 0.5s ease';
                setTimeout(() => {
                    document.body.removeChild(tooltip);
                }, 500);
            }, 3000);
        });
    }
});

// Adiciona animações ao CSS dinamicamente
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
        to {
            opacity: 1;
            transform: translate(-50%, 0);
        }
    }
    
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translate(-50%, 0);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -20px);
        }
    }
`;
document.head.appendChild(style);