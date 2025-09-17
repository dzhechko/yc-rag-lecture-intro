// Главный JavaScript файл для RAG семинара

// Глобальные переменные
let pyodide = null;
let currentProgress = 0;

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Инициализация RAG семинара...');
    
    // Инициализация всех компонентов
    initNavigation();
    initProgressTracking();
    initPyodide();
    initNotifications();
    initScrollEffects();
    
    console.log('✅ RAG семинар инициализирован');
});

// === НАВИГАЦИЯ И ИНТЕРФЕЙС ===

function initNavigation() {
    // Плавная прокрутка для навигационных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                updateProgress(Math.min(currentProgress + 10, 100));
            }
        });
    });

    // Мобильное меню (если будет добавлено)
    const mobileMenuButton = document.querySelector('.md\\:hidden button');
    if (mobileMenuButton) {
        mobileMenuButton.addEventListener('click', toggleMobileMenu);
    }
}

function toggleMobileMenu() {
    // Реализация мобильного меню
    console.log('Мобильное меню переключено');
}

// === ОТСЛЕЖИВАНИЕ ПРОГРЕССА ===

function initProgressTracking() {
    // Intersection Observer для отслеживания прогресса
    const sections = document.querySelectorAll('section[id]');
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const sectionId = entry.target.id;
                updateProgressBasedOnSection(sectionId);
            }
        });
    }, {
        threshold: 0.3
    });

    sections.forEach(section => {
        progressObserver.observe(section);
    });

    // Кнопка "наверх"
    createBackToTopButton();
}

function updateProgress(percent) {
    currentProgress = Math.max(currentProgress, percent);
    document.getElementById('progress-fill').style.width = currentProgress + '%';
    document.getElementById('progress-text').textContent = currentProgress + '%';
    
    // Сохранение прогресса в localStorage
    localStorage.setItem('rag_seminar_progress', currentProgress);
}

function updateProgressBasedOnSection(sectionId) {
    const progressMap = {
        'overview': 20,
        'theory': 40,
        'practice': 60,
        'quiz': 80,
        'yandex': 90
    };
    
    if (progressMap[sectionId]) {
        updateProgress(progressMap[sectionId]);
    }
}

function createBackToTopButton() {
    const backToTopButton = document.createElement('button');
    backToTopButton.className = 'nav-arrow';
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopButton.setAttribute('aria-label', 'Наверх');
    
    document.body.appendChild(backToTopButton);
    
    // Показать/скрыть кнопку при прокрутке
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });
    
    // Прокрутка наверх при клике
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// === PYODIDE И ВЫПОЛНЕНИЕ КОДА ===

async function initPyodide() {
    try {
        console.log('🐍 Загрузка Pyodide...');
        updateSandboxStatus('loading');
        
        pyodide = await loadPyodide({
            indexURL: "https://cdn.jsdelivr.net/pyodide/v0.28.2/full/"
        });
        
        // Установка базовых пакетов
        console.log('📦 Установка пакетов...');
        await pyodide.loadPackage(['numpy']);
        
        // Установка scikit-learn может быть медленной, делаем это опционально
        try {
            await pyodide.loadPackage(['scikit-learn']);
            console.log('✅ scikit-learn загружен');
        } catch (e) {
            console.warn('⚠️ scikit-learn недоступен, используем базовые функции');
        }
        
        console.log('✅ Pyodide готов для выполнения Python кода');
        
        // Обновление статуса песочниц
        updateSandboxStatus('ready');
        
    } catch (error) {
        console.error('❌ Ошибка инициализации Pyodide:', error);
        updateSandboxStatus('error');
    }
}

async function runPythonCode(code, outputElementId) {
    const outputElement = document.getElementById(outputElementId);
    
    if (!outputElement) {
        console.error(`Элемент вывода ${outputElementId} не найден`);
        return;
    }
    
    if (!pyodide) {
        outputElement.innerHTML = '<div class="text-yellow-600">⚠️ Pyodide не инициализирован. Инициализация...</div>';
        await initPyodide();
        if (!pyodide) {
            outputElement.innerHTML = '<div class="text-red-600">❌ Не удалось инициализировать Pyodide</div>';
            return;
        }
    }
    
    outputElement.innerHTML = '<div class="text-blue-600">🔄 Выполнение кода...</div>';
    
    try {
        // Исправляем отступы в коде
        const cleanCode = code.replace(/^\t/gm, '    ');
        
        // Перехват print для вывода
        await pyodide.runPythonAsync(`
import sys
from io import StringIO
old_stdout = sys.stdout
sys.stdout = buffer = StringIO()
        `);
        
        // Выполнение пользовательского кода
        const startTime = performance.now();
        await pyodide.runPythonAsync(cleanCode);
        const executionTime = performance.now() - startTime;
        
        // Получение результата
        const output = await pyodide.runPythonAsync(`
sys.stdout = old_stdout
buffer.getvalue()
        `);
        
        // Форматированный вывод
        outputElement.innerHTML = `
            <div class="text-green-600 text-xs mb-2">✅ Выполнено за ${executionTime.toFixed(1)}мс</div>
            <pre class="text-gray-100 whitespace-pre-wrap">${output || 'Код выполнен успешно (без вывода)'}</pre>
        `;
        
    } catch (error) {
        console.error('Ошибка выполнения Python кода:', error);
        outputElement.innerHTML = `
            <div class="text-red-500">
                <strong>❌ Ошибка выполнения:</strong><br>
                <pre class="text-red-400 mt-2">${error.message}</pre>
            </div>
        `;
    }
}

function updateSandboxStatus(status) {
    const statusElements = document.querySelectorAll('.sandbox-status');
    statusElements.forEach(element => {
        switch(status) {
            case 'ready':
                element.innerHTML = '<i class="fas fa-check-circle text-green-500"></i> Python готов';
                element.className = 'sandbox-status text-green-600';
                break;
            case 'loading':
                element.innerHTML = '<i class="fas fa-spinner fa-spin text-blue-500"></i> Загрузка...';
                element.className = 'sandbox-status text-blue-600';
                break;
            case 'error':
                element.innerHTML = '<i class="fas fa-exclamation-triangle text-red-500"></i> Ошибка загрузки';
                element.className = 'sandbox-status text-red-600';
                break;
        }
    });
}

// === УВЕДОМЛЕНИЯ ===

function initNotifications() {
    // Создание контейнера для уведомлений
    const notificationContainer = document.createElement('div');
    notificationContainer.id = 'notification-container';
    notificationContainer.className = 'fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(notificationContainer);
}

function showNotification(message, type = 'success', duration = 3000) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    const icon = {
        'success': 'fas fa-check-circle',
        'error': 'fas fa-exclamation-triangle', 
        'warning': 'fas fa-exclamation-circle',
        'info': 'fas fa-info-circle'
    }[type];
    
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="${icon} mr-2"></i>
            <span>${message}</span>
            <button class="ml-4 text-white hover:text-gray-200" onclick="this.parentElement.parentElement.remove()">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    document.getElementById('notification-container').appendChild(notification);
    
    // Показать уведомление
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Автоматическое скрытие
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// === ЭФФЕКТЫ ПРОКРУТКИ ===

function initScrollEffects() {
    // Анимация появления элементов при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const slideInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-in');
                slideInObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Применение к карточкам и разделам
    document.querySelectorAll('.card-shadow, .bg-white.rounded-xl').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        slideInObserver.observe(element);
    });
}

// CSS для анимаций (добавляется динамически)
const animationStyles = `
.animate-slide-in {
    opacity: 1 !important;
    transform: translateY(0) !important;
}
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = animationStyles;
document.head.appendChild(styleSheet);

// === ТАБЫ ===

function initTabs(tabsContainerId) {
    const tabsContainer = document.getElementById(tabsContainerId);
    if (!tabsContainer) {
        console.error(`Контейнер табов ${tabsContainerId} не найден`);
        return;
    }
    
    const tabs = tabsContainer.querySelectorAll('.tab');
    const parentSection = tabsContainer.closest('section');
    const tabContents = parentSection ? parentSection.querySelectorAll('.tab-content') : [];
    
    console.log(`Инициализация табов: найдено ${tabs.length} табов и ${tabContents.length} контентов`);
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            const targetTab = this.getAttribute('data-tab');
            
            console.log(`Переключение на таб: ${targetTab}`);
            
            // Удаление активного состояния
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Добавление активного состояния
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log(`Таб ${targetTab} активирован`);
            } else {
                console.error(`Контент для таба ${targetTab} не найден`);
            }
            
            // Аналитика переключения табов
            trackTabSwitch(targetTab);
        });
    });
}

function trackTabSwitch(tabName) {
    console.log(`📊 Переключение на таб: ${tabName}`);
    // Здесь можно добавить отправку аналитики
}

// === КВИЗ ФУНКЦИОНАЛ ===

function initQuiz(quizContainerId) {
    const quizContainer = document.getElementById(quizContainerId);
    if (!quizContainer) return;
    
    const questions = [
        {
            id: 1,
            question: "Что означает аббревиатура RAG?",
            options: [
                "Retrieval-Augmented Generation",
                "Random Access Generator", 
                "Recursive Algorithm Graph",
                "Real-time AI Gateway"
            ],
            correct: 0,
            explanation: "RAG расшифровывается как Retrieval-Augmented Generation — генерация, дополненная поиском."
        },
        {
            id: 2,
            question: "Какая метрика оценивает долю найденных релевантных документов?",
            options: [
                "Precision@k",
                "Recall@k",
                "F1-score", 
                "Accuracy"
            ],
            correct: 1,
            explanation: "Recall@k показывает, какую долю всех релевантных документов мы смогли найти среди топ-k результатов."
        },
        {
            id: 3,
            question: "Какой алгоритм показывает лучшую производительность на CPU?",
            options: [
                "FAISS",
                "Annoy",
                "HNSW",
                "Linear Search"
            ],
            correct: 2,
            explanation: "HNSW (Hierarchical Navigable Small World) показывает state-of-the-art результаты по скорости на CPU."
        },
        {
            id: 4,
            question: "Что такое 'chunk' в контексте RAG?",
            options: [
                "Целый документ",
                "Небольшой фрагмент документа",
                "Векторное представление",
                "База данных"
            ],
            correct: 1,
            explanation: "Chunk — это небольшой фрагмент документа, на которые разбивается исходный текст для индексации."
        },
        {
            id: 5,
            question: "Какие компоненты входят в архитектуру RAG?",
            options: [
                "Только генеративная модель",
                "Retriever + Generator",
                "Только векторная база данных",
                "Только эмбеддинги"
            ],
            correct: 1,
            explanation: "RAG состоит из двух ключевых компонентов: Retriever (поисковая система) и Generator (генеративная модель)."
        }
    ];
    
    renderQuiz(quizContainer, questions);
}

function renderQuiz(container, questions) {
    let currentAnswers = {};
    let quizCompleted = false;
    
    const quizHTML = `
        <div class="quiz-stats bg-gray-100 rounded-lg p-4 mb-6 text-center">
            <span class="text-gray-600">Прогресс: <span id="quiz-progress">0/${questions.length}</span></span> | 
            <span class="text-gray-600">Правильных ответов: <span id="quiz-score">0</span></span>
        </div>
        
        <div id="quiz-questions"></div>
        
        <button id="submit-quiz" class="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-purple-700 transition-colors mt-6" style="display: none;">
            Показать результаты
        </button>
        
        <div id="final-results" class="bg-blue-50 rounded-lg p-6 mt-6 text-center" style="display: none;"></div>
    `;
    
    container.innerHTML = quizHTML;
    
    // Рендер вопросов
    const questionsContainer = container.querySelector('#quiz-questions');
    
    questions.forEach((q, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'bg-white rounded-lg p-6 mb-6 border border-gray-200';
        questionDiv.innerHTML = `
            <h4 class="text-lg font-semibold mb-4">Вопрос ${index + 1}:</h4>
            <p class="mb-4"><strong>${q.question}</strong></p>
            <div class="space-y-3" data-question="${q.id}">
                ${q.options.map((option, optIndex) => `
                    <div class="quiz-option p-3 rounded-lg cursor-pointer" data-option="${optIndex}">
                        ${option}
                    </div>
                `).join('')}
            </div>
            <div class="quiz-result mt-4 p-4 rounded-lg" id="result-${q.id}" style="display: none;"></div>
        `;
        questionsContainer.appendChild(questionDiv);
    });
    
    // Обработчики событий
    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('quiz-option') && !quizCompleted) {
            handleQuizOptionClick(e, questions, currentAnswers);
        } else if (e.target.id === 'submit-quiz') {
            showQuizResults(container, questions, currentAnswers);
            quizCompleted = true;
        }
    });
    
    function handleQuizOptionClick(event, questions, answers) {
        const option = event.target;
        const questionContainer = option.closest('[data-question]');
        const questionId = parseInt(questionContainer.dataset.question);
        const selectedOption = parseInt(option.dataset.option);
        
        // Убираем предыдущий выбор
        questionContainer.querySelectorAll('.quiz-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        // Отмечаем новый выбор
        option.classList.add('selected');
        answers[questionId] = selectedOption;
        
        updateQuizProgress(container, Object.keys(answers).length, questions.length);
        
        // Показываем кнопку если все вопросы отвечены
        if (Object.keys(answers).length === questions.length) {
            container.querySelector('#submit-quiz').style.display = 'block';
        }
    }
}

function updateQuizProgress(container, answered, total) {
    container.querySelector('#quiz-progress').textContent = `${answered}/${total}`;
}

function showQuizResults(container, questions, answers) {
    let correctCount = 0;
    
    questions.forEach(q => {
        const userAnswer = answers[q.id];
        const isCorrect = userAnswer === q.correct;
        
        if (isCorrect) correctCount++;
        
        // Подсвечиваем правильные/неправильные ответы
        const questionContainer = container.querySelector(`[data-question="${q.id}"]`);
        const options = questionContainer.querySelectorAll('.quiz-option');
        
        options.forEach((option, index) => {
            option.classList.remove('selected');
            if (index === q.correct) {
                option.classList.add('correct');
            } else if (index === userAnswer && !isCorrect) {
                option.classList.add('incorrect');
            }
        });
        
        // Показываем объяснение
        const resultDiv = container.querySelector(`#result-${q.id}`);
        resultDiv.style.display = 'block';
        resultDiv.className = `quiz-result mt-4 p-4 rounded-lg ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`;
        resultDiv.innerHTML = `
            <div class="flex items-start">
                <i class="fas ${isCorrect ? 'fa-check-circle text-green-600' : 'fa-times-circle text-red-600'} mt-1 mr-3"></i>
                <div>
                    <strong>${isCorrect ? 'Правильно!' : 'Неправильно'}</strong><br>
                    <span class="text-sm">${q.explanation}</span>
                </div>
            </div>
        `;
    });
    
    // Обновляем счетчик и показываем итоговый результат
    container.querySelector('#quiz-score').textContent = correctCount;
    
    const finalResults = container.querySelector('#final-results');
    const percentage = Math.round((correctCount / questions.length) * 100);
    let message = '';
    let emoji = '';
    
    if (percentage >= 80) {
        message = 'Отлично! Вы отлично разбираетесь в RAG!';
        emoji = '🏆';
    } else if (percentage >= 60) {
        message = 'Хорошо! У вас есть базовые знания RAG.';
        emoji = '👍';
    } else {
        message = 'Стоит изучить материал еще раз.';
        emoji = '📚';
    }
    
    finalResults.innerHTML = `
        <div class="text-6xl mb-4">${emoji}</div>
        <h3 class="text-2xl font-bold mb-4">Результаты квиза</h3>
        <div class="text-5xl font-bold text-purple-600 mb-4">${percentage}%</div>
        <p class="text-lg mb-4">${message}</p>
        <p class="text-gray-600">Правильных ответов: ${correctCount} из ${questions.length}</p>
    `;
    finalResults.style.display = 'block';
    
    container.querySelector('#submit-quiz').style.display = 'none';
    
    // Обновление общего прогресса
    updateProgress(85);
    showNotification(`Квиз завершен! Результат: ${percentage}%`, 'success');
}

// === ВИЗУАЛИЗАЦИИ ===

function createEmbeddingVisualization(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    // Пример данных эмбеддингов (2D проекция)
    const documents = [
        {id: "doc1", x: 100, y: 150, text: "Машинное обучение", type: "document"},
        {id: "doc2", x: 120, y: 170, text: "Нейронные сети", type: "document"},
        {id: "doc3", x: 300, y: 100, text: "Приготовление пасты", type: "document"},
        {id: "doc4", x: 320, y: 120, text: "Итальянская кухня", type: "document"},
        {id: "doc5", x: 200, y: 300, text: "Футбольный матч", type: "document"},
        {id: "doc6", x: 180, y: 280, text: "Спортивные новости", type: "document"}
    ];
    
    const width = 600, height = 400;
    
    // Создание SVG
    const svg = d3.select(container)
        .append('svg')
        .attr('width', '100%')
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`)
        .style('border', '2px solid #e2e8f0')
        .style('border-radius', '8px')
        .style('background', 'white');
    
    // Добавление документов
    const dots = svg.selectAll('.document')
        .data(documents)
        .enter()
        .append('circle')
        .attr('class', 'document')
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
        .attr('r', 8)
        .attr('fill', '#4285f4')
        .attr('stroke', '#fff')
        .attr('stroke-width', 2)
        .style('cursor', 'pointer');
    
    // Добавление подписей
    svg.selectAll('.label')
        .data(documents)
        .enter()
        .append('text')
        .attr('class', 'label')
        .attr('x', d => d.x)
        .attr('y', d => d.y - 15)
        .attr('text-anchor', 'middle')
        .attr('font-size', '12px')
        .attr('fill', '#333')
        .text(d => d.text);
    
    // Тултипы
    const tooltip = d3.select('body').append('div')
        .attr('class', 'tooltip')
        .style('opacity', 0);
    
    dots.on('mouseover', function(event, d) {
            tooltip.transition()
                .duration(200)
                .style('opacity', .9);
            tooltip.html(`<strong>${d.text}</strong><br>ID: ${d.id}`)
                .style('left', (event.pageX + 10) + 'px')
                .style('top', (event.pageY - 28) + 'px');
        })
        .on('mouseout', function() {
            tooltip.transition()
                .duration(500)
                .style('opacity', 0);
        });
}

// === УТИЛИТЫ ===

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showNotification('Код скопирован в буфер обмена!', 'success');
    }).catch(err => {
        showNotification('Ошибка копирования в буфер обмена', 'error');
        console.error('Ошибка копирования:', err);
    });
}

function downloadCode(code, filename) {
    const blob = new Blob([code], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    
    showNotification(`Файл ${filename} загружен`, 'success');
}

// === ЭКСПОРТ ФУНКЦИЙ ===

// Глобальные функции для использования в HTML
window.RAGSeminar = {
    runPythonCode,
    initTabs,
    initQuiz,
    createEmbeddingVisualization,
    showNotification,
    copyToClipboard,
    downloadCode,
    updateProgress
};

// === YANDEX RAG ФУНКЦИИ ===

// Функция для внедрения учетных данных в код
function injectCredentialsIntoCode() {
    console.log('🔑 Функция внедрения учетных данных в код');
    
    const folderId = document.getElementById('sandbox-folder-id')?.value || '';
    const apiKey = document.getElementById('sandbox-api-key')?.value || '';
    
    if (!folderId || !apiKey) {
        showNotification('Пожалуйста, заполните Folder ID и API ключ', 'error');
        return;
    }
    
    // Найти активную текстовую область с кодом
    const activeCodeArea = document.querySelector('textarea[id*="code"]:not([style*="display: none"])') || 
                          document.querySelector('textarea.code-editor') ||
                          document.getElementById('yandex-rag-code');
    
    if (!activeCodeArea) {
        showNotification('Не найдена область для редактирования кода', 'error');
        return;
    }
    
    let code = activeCodeArea.value;
    
    // Заменить placeholder'ы в коде
    code = code.replace(/your_folder_id_here|YOUR_FOLDER_ID/g, folderId);
    code = code.replace(/your_api_key_here|YOUR_API_KEY/g, apiKey);
    
    // Обновить код в текстовой области
    activeCodeArea.value = code;
    
    // Обновить статус
    const statusElement = document.getElementById('credentials-status');
    if (statusElement) {
        statusElement.innerHTML = '<i class="fas fa-check-circle mr-1 text-green-600"></i>Учетные данные внедрены в код';
        statusElement.className = 'text-sm text-green-600';
    }
    
    showNotification('✅ Учетные данные успешно внедрены в код!', 'success');
    updateProgress(Math.min(currentProgress + 5, 100));
}

// Функция для валидации учетных данных
function validateCredentials() {
    console.log('✅ Функция валидации учетных данных');
    
    const folderId = document.getElementById('sandbox-folder-id')?.value || '';
    const apiKey = document.getElementById('sandbox-api-key')?.value || '';
    const statusElement = document.getElementById('credentials-status');
    
    if (!folderId || !apiKey) {
        showNotification('Пожалуйста, заполните все поля для проверки', 'error');
        if (statusElement) {
            statusElement.innerHTML = '<i class="fas fa-exclamation-circle mr-1 text-red-600"></i>Заполните все поля';
            statusElement.className = 'text-sm text-red-600';
        }
        return;
    }
    
    // Базовая валидация формата
    const folderIdPattern = /^b1[a-zA-Z0-9]{17}$/;
    const apiKeyPattern = /^AQVN[a-zA-Z0-9_-]{40,}$/;
    
    let isValid = true;
    let errorMessage = '';
    
    if (!folderIdPattern.test(folderId)) {
        isValid = false;
        errorMessage = 'Неверный формат Folder ID (должен начинаться с "b1" и содержать 19 символов)';
    } else if (!apiKeyPattern.test(apiKey)) {
        isValid = false;
        errorMessage = 'Неверный формат API ключа (должен начинаться с "AQVN")';
    }
    
    if (statusElement) {
        if (isValid) {
            statusElement.innerHTML = '<i class="fas fa-check-circle mr-1 text-green-600"></i>Формат учетных данных корректен';
            statusElement.className = 'text-sm text-green-600';
            showNotification('✅ Формат учетных данных корректен!', 'success');
            updateProgress(Math.min(currentProgress + 5, 100));
        } else {
            statusElement.innerHTML = `<i class="fas fa-times-circle mr-1 text-red-600"></i>${errorMessage}`;
            statusElement.className = 'text-sm text-red-600';
            showNotification(errorMessage, 'error');
        }
    }
}

// Функция для отображения уведомлений
function showNotification(message, type = 'info') {
    // Создать уведомление, если его нет
    let notification = document.getElementById('notification-container');
    if (!notification) {
        notification = document.createElement('div');
        notification.id = 'notification-container';
        notification.className = 'fixed top-4 right-4 z-50';
        document.body.appendChild(notification);
    }
    
    // Создать элемент уведомления
    const notificationElement = document.createElement('div');
    const bgColor = {
        success: 'bg-green-500',
        error: 'bg-red-500', 
        warning: 'bg-yellow-500',
        info: 'bg-blue-500'
    }[type] || 'bg-gray-500';
    
    notificationElement.className = `${bgColor} text-white px-4 py-2 rounded-lg shadow-lg mb-2 transform transition-all duration-300 translate-x-full`;
    notificationElement.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-white hover:text-gray-200">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `;
    
    notification.appendChild(notificationElement);
    
    // Анимация появления
    setTimeout(() => {
        notificationElement.classList.remove('translate-x-full');
    }, 10);
    
    // Автоматическое скрытие через 5 секунд
    setTimeout(() => {
        if (notificationElement.parentNode) {
            notificationElement.classList.add('translate-x-full');
            setTimeout(() => {
                if (notificationElement.parentNode) {
                    notificationElement.remove();
                }
            }, 300);
        }
    }, 5000);
}

// Добавляем функции в глобальную область
window.injectCredentialsIntoCode = injectCredentialsIntoCode;
window.validateCredentials = validateCredentials;
window.showNotification = showNotification;

// Для отладки
window.pyodide = pyodide;

console.log('📚 RAG семинар JS модуль загружен');