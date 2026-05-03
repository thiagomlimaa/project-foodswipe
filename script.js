// Banco de alimentos com informações educativas
const foods = [
    { name: "Maçã", emoji: "🍎", description: "Crocante, doce e natural.", goodFeedback: "✅ Excelente! Rica em fibras e antioxidantes. Ajuda na digestão e fortalece o sistema imunológico.", moderateFeedback: "⚠️ Pode ser consumida sem moderação porque é incrivelmente saudável! Na verdade, é uma ótima escolha sempre.", isGood: true },
    { name: "Refrigerante", emoji: "🥤", description: "Gaseificado, doce e gelado.", goodFeedback: "", moderateFeedback: "⚠️ Consumir com moderação. Muito açúcar e aditivos químicos. Prefira água ou sucos naturais. Pode causar inchaço e prejudicar os dentes.", isGood: false },
    { name: "Brócolis", emoji: "🥦", description: "Verde, rico em nutrientes.", goodFeedback: "✅ Maravilha! Fonte de vitaminas C e K, além de fibras. Ajuda na saciedade e fortalece a imunidade.", moderateFeedback: "", isGood: true },
    { name: "Batata Frita", emoji: "🍟", description: "Crocante e salgada.", goodFeedback: "", moderateFeedback: "⚠️ Consumir com moderação. Frita e rica em gordura e sódio. Que tal batata assada com alecrim? Fica uma delícia!", isGood: false },
    { name: "Abacate", emoji: "🥑", description: "Cremoso e nutritivo.", goodFeedback: "✅ Super escolha! Gordura boa, rico em potássio e fibras. Ajuda o coração e a pele.", moderateFeedback: "", isGood: true },
    { name: "Pizza", emoji: "🍕", description: "Saborosa e variada.", goodFeedback: "", moderateFeedback: "⚠️ Depende dos ingredientes. Se tiver muitos embutidos e borda recheada, consuma com moderação. Prefira massa integral e recheios naturais.", isGood: false },
    { name: "Salmão", emoji: "🐟", description: "Saboroso e suculento.", goodFeedback: "✅ Ótimo! Rico em ômega-3, proteínas e vitamina D. Faz bem para o cérebro e o coração.", moderateFeedback: "", isGood: true },
    { name: "Sorvete", emoji: "🍦", description: "Doce e refrescante.", goodFeedback: "", moderateFeedback: "⚠️ Uma delícia, mas rico em açúcar e gordura. Aproveite como um mimo ocasional e prefira versões com menos aditivos.", isGood: false }
];

let currentFoodIndex = 0;
let userScore = 0;
let choicesMade = 0;
let totalFoods = foods.length;
let userLevel = "Explorador Nutricional";
let pointsToNextLevel = 100;

// Receitas baseadas em preferência saudável
const healthyRecipes = [
    { name: "Vitamina de abacate com hortelã", time: "5 min", ingredients: "Abacate, leite vegetal, hortelã, mel", emoji: "🥤", link: "vitamina/vitamina.html"},

    { name: "Salada de frutas colorida", time: "10 min", ingredients: "Morango, kiwi, manga, laranja", emoji: "🍓", link: "salada/salada.html"},

    { name: "Brócolis gratinado com castanhas", time: "25 min", ingredients: "Brócolis, castanha, queijo, azeite", emoji: "🥦", link: "brocolis/brocolis.html"},

    { name: "Espetinho de frutas com iogurte", time: "8 min", ingredients: "Abacaxi, uva, morango, iogurte natural", emoji: "🍡", link: "receitas/espetinhos.html" }
];

// Elementos DOM
const sections = document.querySelectorAll('.section');
const navBtns = document.querySelectorAll('.nav-btn');
const startBtn = document.querySelector('.btn-start');
const goodChoiceBtn = document.getElementById('good-choice');
const moderateChoiceBtn = document.getElementById('moderate-choice');
const nextBtn = document.getElementById('next-food');
const foodNameEl = document.getElementById('food-name');
const foodImageEl = document.getElementById('food-image');
const foodDescEl = document.getElementById('food-description');
const feedbackCard = document.getElementById('feedback-card');
const feedbackTitle = document.getElementById('feedback-title');
const feedbackText = document.getElementById('feedback-text');
const choicesCountSpan = document.getElementById('choices-count');
const totalChoicesSpan = document.getElementById('total-choices');
const userScoreSpan = document.getElementById('user-score');
const levelNameSpan = document.getElementById('level-name');
const progressBar = document.getElementById('progress-bar');
const levelMessage = document.getElementById('level-message');
const recipesGrid = document.getElementById('recipes-grid');

// Inicialização
function init() {
    totalChoicesSpan.textContent = totalFoods;
    showFood(currentFoodIndex);
    updateProfileUI();
    displayHealthyRecipes();
    
    // Event listeners de navegação com scroll suave
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault(); // Prevenir comportamento padrão
            const sectionId = btn.getAttribute('data-section');
            if (sectionId) {
                scrollToSection(sectionId);
                updateActiveNav(btn);
                
                // Fechar menu mobile após clique
                const navMenu = document.querySelector('.main-nav');
                if (navMenu) {
                    navMenu.classList.remove('show');
                }
            }
        });
    });
    
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('choices');
            const choicesNav = Array.from(navBtns).find(b => b.getAttribute('data-section') === 'choices');
            if (choicesNav) updateActiveNav(choicesNav);
            
            // Fechar menu mobile após clique
            const navMenu = document.querySelector('.main-nav');
            if (navMenu) {
                navMenu.classList.remove('show');
            }
        });
    }
    
    if (goodChoiceBtn) goodChoiceBtn.addEventListener('click', () => handleChoice(true));
    if (moderateChoiceBtn) moderateChoiceBtn.addEventListener('click', () => handleChoice(false));
    if (nextBtn) nextBtn.addEventListener('click', nextFood);
    
    // Mobile menu
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.main-nav');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }
    
    // Ativar o nav inicial baseado na posição de scroll
    updateActiveNavOnScroll();
    
    // Adicionar listener de scroll para atualizar nav ativo
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(`${sectionId}-section`);
    if (section) {
        const headerOffset = document.querySelector('.main-header').offsetHeight;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    }
}

function updateActiveNavOnScroll() {
    const scrollPosition = window.pageYOffset;
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    
    let currentSectionId = 'home'; // Default
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 20; // 20px buffer
        const sectionBottom = sectionTop + section.offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = section.id.replace('-section', '');
        }
    });
    
    // Update active nav
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === currentSectionId) {
            btn.classList.add('active');
        }
    });
}

function updateActiveNav(activeBtn) {
    navBtns.forEach(btn => {
        btn.classList.remove('active');
    });
    activeBtn.classList.add('active');
}

function showFood(index) {
    if (index >= totalFoods) {
        // Finalizou todos alimentos
        foodNameEl.textContent = "Parabéns!";
        foodImageEl.textContent = "🏆";
        foodDescEl.textContent = "Você analisou todos os alimentos! Volte amanhã para o desafio do dia.";
        goodChoiceBtn.style.display = "none";
        moderateChoiceBtn.style.display = "none";
        nextBtn.style.display = "none";
        feedbackCard.style.display = "none";
        return;
    }
    goodChoiceBtn.style.display = "inline-flex";
    moderateChoiceBtn.style.display = "inline-flex";
    const food = foods[index];
    foodNameEl.textContent = food.name;
    foodImageEl.textContent = food.emoji;
    foodDescEl.textContent = food.description;
    feedbackCard.style.display = "none";
}

function handleChoice(isGoodChoice) {
    const food = foods[currentFoodIndex];
    const expectedGood = food.isGood;
    let pointsEarned = 0;
    let isCorrect = (isGoodChoice === expectedGood);
    
    if (isCorrect) {
        pointsEarned = 20;
        userScore += pointsEarned;
        choicesMade++;
        if (isGoodChoice) {
            feedbackTitle.textContent = "✅ Boa Escolha!";
            feedbackText.textContent = food.goodFeedback || "Você acertou! Esse alimento traz benefícios para o corpo e mente.";
        } else {
            feedbackTitle.textContent = "⚠️ Consumir com moderação!";
            feedbackText.textContent = food.moderateFeedback || "Esse alimento merece atenção. Consuma com equilíbrio e prefira opções mais naturais.";
        }
    } else {
        // Escolha incorreta - mas ensina
        pointsEarned = 5;
        userScore += pointsEarned;
        choicesMade++;
        if (isGoodChoice && !expectedGood) {
            feedbackTitle.textContent = "⚠️ Atenção!";
            feedbackText.textContent = `Este alimento não é tão saudável assim. ${food.moderateFeedback || "Tente consumir com moderação e busque alternativas mais nutritivas."}`;
        } else {
            feedbackTitle.textContent = "✅ Quase lá!";
            feedbackText.textContent = `Na verdade, ${food.name} é uma ótima escolha! ${food.goodFeedback || "Que tal incluí-lo mais vezes na sua rotina?"}`;
        }
    }
    
    updateProfileUI();
    choicesCountSpan.textContent = choicesMade;
    feedbackCard.style.display = "block";
    
    // Avança automaticamente após um tempo? Não, usuário clica em próximo
}

function nextFood() {
    if (currentFoodIndex < totalFoods - 1) {
        currentFoodIndex++;
        showFood(currentFoodIndex);
    } else if (currentFoodIndex === totalFoods - 1) {
        currentFoodIndex++;
        showFood(currentFoodIndex);
        choicesCountSpan.textContent = totalFoods;
        updateProfileUI();
    } else {
        alert("Você já finalizou todos os alimentos! Parabéns pela jornada!");
    }
}

function updateProfileUI() {
    // Define nível baseado na pontuação
    if (userScore >= 140) userLevel = "Mestre da Alimentação 🌟";
    else if (userScore >= 80) userLevel = "Nutricionista em Formação 🥑";
    else if (userScore >= 30) userLevel = "Explorador Nutricional 🌿";
    else userLevel = "Aprendiz Curioso 🍎";
    
    levelNameSpan.textContent = userLevel;
    userScoreSpan.textContent = userScore;
    let maxScore = totalFoods * 20; // máximo 160 pontos se acertar tudo
    let progressPercent = (userScore / maxScore) * 100;
    progressPercent = Math.min(100, progressPercent);
    progressBar.style.width = `${progressPercent}%`;
    
    if (userScore >= 140) levelMessage.textContent = "Você arrasa! Continue inspirando outros com suas escolhas!";
    else if (userScore >= 80) levelMessage.textContent = "Muito bem! Você está no caminho para hábitos incríveis.";
    else levelMessage.textContent = "Continue fazendo escolhas para evoluir! Cada clique conta!";
}

// BTN DE VER RECEITA
function displayHealthyRecipes() {
    if (!recipesGrid) return;
    recipesGrid.innerHTML = "";
    healthyRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="recipe-img">${recipe.emoji}</div>
            <h4>${recipe.name}</h4>
            <a href="${recipe.link}" target="_blank" class="btn-recipe" style="text-decoration: none; text-align: center;">Ver Receita</a> 
        `;
        recipesGrid.appendChild(card);
    });
}

// Iniciar tudo quando carregar
document.addEventListener('DOMContentLoaded', init);


// Toda vez que o usuário clicar no botão "Próximo Alimento", o JavaScript vai puxar a tela de volta para o topo do card automaticamente, sem ele precisar usar o dedo.

// function nextFood() {
//     // 1. FAZ A TELA ROLAR SUAVEMENTE DE VOLTA PARA O CARD
//     document.getElementById('choices-section').scrollIntoView({ behavior: 'smooth' });

//     // ... o restante do código que já estava na sua função ...
//     currentFoodIndex++;
    
//     // ...
// }