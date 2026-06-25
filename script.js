 // ==================== AGRO FORTE - JAVASCRIPT ====================

document.addEventListener('DOMContentLoaded', () => {

    // ========== 1. MENU HAMBURGER (MOBILE) ==========
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // ========== 2. SMOOTH SCROLL + FECHAR MENU NO MOBILE ==========
    document.querySelectorAll('nav a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
            // Fecha o menu mobile
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        });
    });

    // ========== 3. FORMULÁRIO COM FEEDBACK ==========
    const form = document.querySelector('#contato form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const successMsg = document.createElement('div');
            successMsg.className = 'success-message';
            successMsg.style.cssText = 'background:#e8f5e9; color:#1b5e20; padding:20px; border-radius:12px; margin-top:20px; text-align:center;';
            successMsg.innerHTML = `<strong>✅ Mensagem enviada com sucesso!</strong><br>Obrigado pelo contato. Em breve responderemos.`;
            
            form.appendChild(successMsg);
            form.reset();

            setTimeout(() => {
                successMsg.remove();
            }, 4500);
        });
    }

    // ========== 4. CALCULADORA DE IMPACTO AMBIENTAL ==========
    window.calcularImpacto = function() {
        const area = parseFloat(document.getElementById('area').value) || 0;
        const pratica = document.getElementById('pratica').value;
        const resultadosDiv = document.getElementById('resultados');

        if (area <= 0) {
            alert('Por favor, insira uma área válida.');
            return;
        }

        // Valores base (educativos)
        let aguaBase = 8500;   // m³ por hectare/ano (exemplo)
        let co2Base = 2800;    // kg CO₂ por hectare/ano (exemplo)

        let economiaAgua = 0;
        let reducaoCO2 = 0;

        switch(pratica) {
            case 'convencional':
                economiaAgua = 0;
                reducaoCO2 = 0;
                break;
            case 'precisao':
                economiaAgua = Math.round(area * aguaBase * 0.32);
                reducaoCO2 = Math.round(area * co2Base * 0.28);
                break;
            case 'regenerativa':
                economiaAgua = Math.round(area * aguaBase * 0.47);
                reducaoCO2 = Math.round(area * co2Base * 0.41);
                break;
        }

        resultadosDiv.innerHTML = `
            <div class="result-card">
                <h4>💧 Economia de Água</h4>
                <div class="value">${economiaAgua.toLocaleString('pt-BR')}</div>
                <p>m³ por ano</p>
            </div>
            <div class="result-card">
                <h4>🌍 Redução de CO₂</h4>
                <div class="value">${reducaoCO2.toLocaleString('pt-BR')}</div>
                <p>kg por ano</p>
            </div>
        `;
    };

    // ========== 5. QUIZ DE SUSTENTABILIDADE ==========
    const quizQuestions = [
        {
            question: "O que é Agricultura de Precisão?",
            options: [
                "Uso de sensores, GPS e dados para aplicar insumos de forma exata",
                "Plantio manual sem uso de máquinas",
                "Uso apenas de fertilizantes químicos",
                "Irrigação feita manualmente com balde"
            ],
            correct: 0
        },
        {
            question: "Qual prática ajuda mais na conservação do solo?",
            options: [
                "Queimadas para limpeza do terreno",
                "Rotação de culturas e agricultura regenerativa",
                "Uso intensivo de máquinas pesadas",
                "Monocultura por muitos anos"
            ],
            correct: 1
        },
        {
            question: "Os drones agrícolas são usados principalmente para:",
            options: [
                "Transportar colheita",
                "Monitorar lavouras, detectar pragas e mapear áreas",
                "Fazer irrigação manual",
                "Substituir todos os trabalhadores do campo"
            ],
            correct: 1
        },
        {
            question: "O que significa 'produzir hoje pensando no amanhã'?",
            options: [
                "Aumentar a produção sem se preocupar com o meio ambiente",
                "Equilibrar produção agrícola com preservação dos recursos naturais",
                "Usar apenas energia fóssil nas máquinas",
                "Expandir o desmatamento para mais áreas de cultivo"
            ],
            correct: 1
        },
        {
            question: "Qual é uma vantagem da irrigação inteligente?",
            options: [
                "Aumenta o desperdício de água",
                "Economiza água ao irrigar somente quando a planta precisa",
                "Funciona apenas em dias de chuva",
                "Não precisa de tecnologia"
            ],
            correct: 1
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = [];

    window.iniciarQuiz = function() {
        currentQuestion = 0;
        score = 0;
        userAnswers = [];
        document.getElementById('quiz-result').style.display = 'none';
        mostrarPergunta();
    };

    function mostrarPergunta() {
        const container = document.getElementById('quiz-container');
        const q = quizQuestions[currentQuestion];

        let html = `<div class="question">
            <h3>${currentQuestion + 1}. ${q.question}</h3>`;

        q.options.forEach((option, index) => {
            html += `<div class="option" onclick="selecionarResposta(${index})">${option}</div>`;
        });

        html += `</div>`;
        container.innerHTML = html;
    }

    window.selecionarResposta = function(selectedIndex) {
        const q = quizQuestions[currentQuestion];
        userAnswers[currentQuestion] = selectedIndex;

        // Marca visualmente a opção escolhida
        const options = document.querySelectorAll('.option');
        options.forEach(opt => opt.classList.remove('selected'));
        options[selectedIndex].classList.add('selected');

        // Avança automaticamente após 600ms
        setTimeout(() => {
            if (selectedIndex === q.correct) {
                score++;
            }
            currentQuestion++;

            if (currentQuestion < quizQuestions.length) {
                mostrarPergunta();
            } else {
                mostrarResultado();
            }
        }, 650);
    };

    function mostrarResultado() {
        const container = document.getElementById('quiz-container');
        const resultDiv = document.getElementById('quiz-result');
        
        container.innerHTML = '';
        resultDiv.style.display = 'block';

        let mensagem = '';
        const percentual = Math.round((score / quizQuestions.length) * 100);

        if (percentual >= 80) {
            mensagem = 'Excelente! Você entende muito bem sobre sustentabilidade no agronegócio!';
        } else if (percentual >= 60) {
            mensagem = 'Bom resultado! Você já tem uma boa base sobre o tema.';
        } else {
            mensagem = 'Continue estudando! O equilíbrio entre produção e meio ambiente é fundamental.';
        }

        document.getElementById('score-text').innerHTML = `
            Você acertou <strong>${score} de ${quizQuestions.length}</strong> perguntas (${percentual}%)<br><br>
            ${mensagem}
        `;
    }

    window.reiniciarQuiz = function() {
        document.getElementById('quiz-result').style.display = 'none';
        window.iniciarQuiz();
    };

    // Inicia o quiz automaticamente quando a seção aparecer (opcional)
    // Ou chame window.iniciarQuiz() manualmente

    // ========== INICIALIZAÇÃO ==========
    console.log('%c[Agro Forte] JavaScript carregado com sucesso!', 'color:#2e7d32');
});
