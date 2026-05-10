// Banco de alimentos
const foods = [
    { name: "Banana", emoji: "🍌", description: "Doce, cremosa e energética.", goodFeedback: "✅ Excelente! Rica em potássio e vitaminas. Dá energia rápida e ajuda na recuperação muscular.", moderateFeedback: "⚠️ Fruta incrivelmente versátil! Use em panquecas, vitaminas ou pura.", isGood: true },

    { name: "Frango", emoji: "🍗", description: "Proteico, versátil e saboroso.", goodFeedback: "✅ Ótima proteína magra! Fonte de vitaminas B e minerais. Prefira grelhado ou desfiado.", moderateFeedback: "⚠️ Evite frituras! Grelhado ou desfiado é sempre a melhor opção.", isGood: true },

    { name: "Pizza", emoji: "🍕", description: "Saborosa e variada.", goodFeedback: "", moderateFeedback: "⚠️ Prefira massa integral e recheios naturais. Consuma com moderação.", isGood: false },

    { name: "Cenoura", emoji: "🥕", description: "Crocante, doce e nutritiva.", goodFeedback: "✅ Perfeita! Rica em vitamina A e fibras. Ótima para a visão e pele. Snack prático e saudável.", moderateFeedback: "⚠️ Pode consumir à vontade! Crua ou cozida, é sempre uma excelente escolha.", isGood: true },

    { name: "Batata Frita", emoji: "🍟", description: "Crocante e salgada.", goodFeedback: "", moderateFeedback: "⚠️ Rica em gordura e sódio. Que tal batata assada com alecrim?", isGood: false },

    { name: "Vitamina de Banana", emoji: "🥤", description: "Cremosa, doce e energética.", goodFeedback: "✅ Bebida nutritiva! Combina carboidratos bons, fibras e proteínas. Ideal para café da manhã.", moderateFeedback: "⚠️ Substitua o açúcar por mel ou banana bem madura para adoçar naturalmente.", isGood: true },

    { name: "Refrigerante", emoji: "🥤", description: "Gaseificado, doce e gelado.", goodFeedback: "", moderateFeedback: "⚠️ Muito açúcar e aditivos químicos. Prefira água ou sucos naturais.", isGood: false },

    { name: "Sorvete", emoji: "🍦", description: "Doce e refrescante.", goodFeedback: "", moderateFeedback: "⚠️ Rico em açúcar e gordura. Aproveite como um mimo ocasional.", isGood: false },

    { name: "Ovo", emoji: "🥚", description: "Nutritivo, versátil e proteico.", goodFeedback: "✅ Excelente fonte de proteína e gorduras boas! Rico em vitaminas D e B12. Ótimo no café da manhã.", moderateFeedback: "⚠️ Prefira cozido ou mexido. Evite fritar com excesso de óleo.", isGood: true },

    { name: "Bolacha Recheada", emoji: "🍪", description: "Doce, crocante e irresistível.", goodFeedback: "", moderateFeedback: "⚠️ Muito açúcar, gordura trans e calorias vazias. Troque por uma fruta ou castanhas!", isGood: false },
];

let currentFoodIndex = 0;
let userScore = 0;
let choicesMade = 0;
let totalFoods = foods.length;
let userLevel = "Explorador Nutricional";

const healthyRecipes = [
    { name: "Panqueca de Banana", time: "10 min", ingredients: "Banana, ovos, canela, aveia", emoji: "🍌", link: "banana/banana.html" },
    { name: "Wrap de Frango Rápido", time: "10 min", ingredients: "Frango, tortilha, iogurte, alface, tomate", emoji: "🍗", link: "wrap-frango/frango.html" },
    { name: "Palitinhos de Cenoura", time: "5 min", ingredients: "Cenoura, iogurte, limão, azeite", emoji: "🥕", link: "cenoura/cenoura.html" },
    { name: "Vitamina de Banana", time: "2 min", ingredients: "Banana, leite, aveia, mel", emoji: "🥤", link: "vitaminaBanana/vitamina.html" },
    { name: "Mini Pizza de Pão Integral", time: "8 min", ingredients: "Pão integral, molho, queijo, orégano", emoji: "🍕", link: "minipizza/minipizza.html" },
    { name: "Iogurte com Frutas e Granola", time: "3 min", ingredients: "Iogurte natural, frutas, granola, mel", emoji: "🥣", link: "iogurte/iogurte.html" },
    { name: "Batata na Airfryer", time: "40 min", ingredients: "Batata, azeite, páprica, orégano", emoji: "🥔", link: "batata/batata.html" },
    { name: "Omelete Recheado", time: "10 min", ingredients: "Ovos, queijo, presunto, tomate", emoji: "🍳", link: "ovo/ovo.html"} 
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

function init() {
    totalChoicesSpan.textContent = totalFoods;
    showFood(currentFoodIndex);
    updateProfileUI();
    displayHealthyRecipes();
    
    navBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const sectionId = btn.getAttribute('data-section');
            if (sectionId) {
                scrollToSection(sectionId);
                updateActiveNav(btn);
                document.querySelector('.main-nav')?.classList.remove('show');
            }
        });
    });
    
    if (startBtn) {
        startBtn.addEventListener('click', (e) => {
            e.preventDefault();
            scrollToSection('choices');
            const choicesNav = Array.from(navBtns).find(b => b.getAttribute('data-section') === 'choices');
            if (choicesNav) updateActiveNav(choicesNav);
            document.querySelector('.main-nav')?.classList.remove('show');
        });
    }
    
    if (goodChoiceBtn) goodChoiceBtn.addEventListener('click', () => handleChoice(true));
    if (moderateChoiceBtn) moderateChoiceBtn.addEventListener('click', () => handleChoice(false));
    if (nextBtn) nextBtn.addEventListener('click', () => { feedbackCard.style.display = 'none'; nextFood(); });
    
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.main-nav');
    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => navMenu.classList.toggle('show'));
    }
    
    updateActiveNavOnScroll();
    window.addEventListener('scroll', updateActiveNavOnScroll);
}

function scrollToSection(sectionId) {
    const section = document.getElementById(`${sectionId}-section`);
    if (section) {
        const headerOffset = document.querySelector('.main-header').offsetHeight;
        const elementPosition = section.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
}

function updateActiveNavOnScroll() {
    const scrollPosition = window.pageYOffset;
    const headerHeight = document.querySelector('.main-header').offsetHeight;
    let currentSectionId = 'home';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - headerHeight - 20;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
            currentSectionId = section.id.replace('-section', '');
        }
    });
    navBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-section') === currentSectionId) btn.classList.add('active');
    });
}

function updateActiveNav(activeBtn) {
    navBtns.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

function showFood(index) {
    if (index >= totalFoods) {
        foodNameEl.textContent = "Parabéns!";
        foodImageEl.textContent = "🏆";
        foodDescEl.textContent = "Você analisou todos os alimentos!";
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
            feedbackText.textContent = food.goodFeedback;
        } else {
            feedbackTitle.textContent = "⚠️ Consumir com moderação!";
            feedbackText.textContent = food.moderateFeedback;
        }
    } else {
        pointsEarned = 5;
        userScore += pointsEarned;
        choicesMade++;
        if (isGoodChoice && !expectedGood) {
            feedbackTitle.textContent = "⚠️ Atenção!";
            feedbackText.textContent = `Este alimento não é tão saudável. ${food.moderateFeedback}`;
        } else {
            feedbackTitle.textContent = "✅ Quase lá!";
            feedbackText.textContent = `Na verdade, ${food.name} é uma ótima escolha! ${food.goodFeedback}`;
        }
    }
    
    updateProfileUI();
    choicesCountSpan.textContent = choicesMade;
    feedbackCard.style.display = "block";
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
        alert("Você já finalizou todos os alimentos! Parabéns!");
    }
}

function updateProfileUI() {
    if (userScore >= 140) userLevel = "Mestre da Alimentação";
    else if (userScore >= 80) userLevel = "Nutricionista em Formação";
    else if (userScore >= 30) userLevel = "Explorador Nutricional";
    else userLevel = "Aprendiz Curioso";
    
    levelNameSpan.textContent = userLevel;
    userScoreSpan.textContent = userScore;
    let maxScore = totalFoods * 20;
    let progressPercent = (userScore / maxScore) * 100;
    progressPercent = Math.min(100, progressPercent);
    progressBar.style.width = `${progressPercent}%`;
    
    if (userScore >= 140) levelMessage.textContent = "Você arrasa! Continue inspirando outros!";
    else if (userScore >= 80) levelMessage.textContent = "Muito bem! Você está no caminho!";
    else levelMessage.textContent = "Continue fazendo escolhas para evoluir!";
}

function displayHealthyRecipes() {
    if (!recipesGrid) return;
    recipesGrid.innerHTML = "";
    healthyRecipes.forEach(recipe => {
        const card = document.createElement('div');
        card.className = 'recipe-card';
        card.innerHTML = `
            <div class="recipe-img">${recipe.emoji}</div>
            <h4>${recipe.name}</h4>
            <a href="${recipe.link}" class="btn-recipe" style="text-decoration:none;text-align:center;">Ver Receita</a>
        `;
        recipesGrid.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', init);