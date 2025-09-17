import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Enable CORS for frontend-backend communication
app.use('/api/*', cors())

// Serve static files from public directory (builds to dist/static)
app.use('/static/*', serveStatic({ root: './' }))

// Serve HTML files from root (builds to dist/)
app.use('*.html', serveStatic({ root: './' }))

// Main page route
app.get('/', (c) => {
  return c.html(`
    <!DOCTYPE html>
    <html lang="ru">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        
        <!-- SEO Meta Tags -->
        <title>RAG (Retrieval Augmented Generation) - Онлайн семинар | Практический курс с Yandex Foundation Models</title>
        <meta name="description" content="Изучите RAG: архитектуру, векторные базы данных, семантический поиск. Практические примеры с Python, FAISS, HNSW, Yandex Foundation Models. Интерактивные упражнения и код.">
        <meta name="keywords" content="RAG, Retrieval Augmented Generation, векторный поиск, эмбеддинги, FAISS, HNSW, семантический поиск, машинное обучение, Python, Yandex Foundation Models">
        
        <!-- Open Graph / Facebook -->
        <meta property="og:type" content="website">
        <meta property="og:title" content="RAG - Retrieval Augmented Generation | Интерактивный семинар">
        <meta property="og:description" content="Полный курс по RAG: от теории до практики. Изучите архитектуру, векторные БД, метрики оценки. Онлайн песочница Python с Yandex Models.">
        
        <!-- Twitter -->
        <meta property="twitter:card" content="summary_large_image">
        <meta property="twitter:title" content="RAG Семинар - Retrieval Augmented Generation">
        <meta property="twitter:description" content="Изучите RAG с нуля: архитектура, векторный поиск, практические примеры с Yandex Foundation Models">
        
        <!-- Structured Data -->
        <script type="application/ld+json">
        {
            "@context": "https://schema.org",
            "@type": "Course",
            "name": "RAG (Retrieval Augmented Generation) - Практический семинар",
            "description": "Комплексное изучение технологии RAG: архитектура, векторные базы данных, семантический поиск, практическая реализация с Yandex Foundation Models",
            "provider": {
                "@type": "Organization",
                "name": "AI Education Hub"
            },
            "courseMode": "online",
            "duration": "PT1H",
            "educationalLevel": "Intermediate",
            "teaches": ["RAG Architecture", "Vector Databases", "Semantic Search", "FAISS", "HNSW", "Recall@k", "Yandex Foundation Models"]
        }
        </script>
        
        <!-- External Libraries -->
        <script src="https://cdn.tailwindcss.com"></script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <script src="https://d3js.org/d3.v7.min.js"></script>
        <script src="https://cdn.jsdelivr.net/pyodide/v0.28.2/full/pyodide.js"></script>
        
        <!-- Custom Styles -->
        <link href="/static/styles.css" rel="stylesheet">
        
        <style>
            .gradient-bg {
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }
            .section-padding {
                padding: 4rem 1rem;
            }
            .card-shadow {
                box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            }
            .code-editor {
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.5;
                border: 1px solid #e2e8f0;
                border-radius: 8px;
                padding: 16px;
                background: #f8fafc;
            }
            .output-section {
                background: #1a202c;
                color: #e2e8f0;
                border-radius: 8px;
                padding: 16px;
                margin-top: 12px;
                font-family: 'Courier New', monospace;
                font-size: 14px;
                line-height: 1.4;
                white-space: pre-wrap;
                overflow-x: auto;
            }
            .tab {
                transition: all 0.2s ease;
                cursor: pointer;
                border-bottom: 3px solid transparent;
            }
            .tab.active {
                border-bottom-color: #667eea;
                background-color: #f7fafc;
            }
            .tab-content {
                display: none;
            }
            .tab-content.active {
                display: block;
            }
            .quiz-option {
                transition: all 0.2s ease;
                cursor: pointer;
                border: 2px solid #e2e8f0;
            }
            .quiz-option:hover {
                border-color: #667eea;
                background-color: #f7fafc;
            }
            .quiz-option.selected {
                border-color: #667eea;
                background-color: #edf2f7;
            }
            .quiz-option.correct {
                border-color: #48bb78;
                background-color: #f0fff4;
            }
            .quiz-option.incorrect {
                border-color: #f56565;
                background-color: #fed7d7;
            }
            .visualization-container {
                border: 2px solid #e2e8f0;
                border-radius: 12px;
                padding: 20px;
                background: white;
            }
            
            /* Mobile Responsiveness */
            @media (max-width: 768px) {
                .section-padding {
                    padding: 2rem 1rem;
                }
                .code-editor {
                    font-size: 12px;
                    height: 250px !important;
                }
                .grid {
                    grid-template-columns: 1fr !important;
                }
            }
            
            /* Progress Bar */
            .progress-bar {
                width: 100%;
                height: 8px;
                background: #e2e8f0;
                border-radius: 4px;
                overflow: hidden;
            }
            .progress-fill {
                height: 100%;
                background: linear-gradient(90deg, #667eea, #764ba2);
                transition: width 0.3s ease;
            }
        </style>
    </head>
    <body class="bg-gray-50">
        <!-- Navigation -->
        <nav class="bg-white shadow-lg sticky top-0 z-50">
            <div class="max-w-7xl mx-auto px-4">
                <div class="flex justify-between items-center h-16">
                    <div class="flex items-center">
                        <i class="fas fa-brain text-purple-600 text-2xl mr-3"></i>
                        <span class="text-xl font-bold text-gray-800">RAG Семинар</span>
                    </div>
                    <div class="hidden md:flex space-x-8">
                        <a href="#overview" class="text-gray-700 hover:text-purple-600 transition-colors">Обзор</a>
                        <a href="#theory" class="text-gray-700 hover:text-purple-600 transition-colors">Теория</a>
                        <a href="#practice" class="text-gray-700 hover:text-purple-600 transition-colors">Практика</a>
                        <a href="#quiz" class="text-gray-700 hover:text-purple-600 transition-colors">Квиз</a>
                        <a href="#yandex" class="text-gray-700 hover:text-purple-600 transition-colors">Yandex Models</a>
                    </div>
                    <button class="md:hidden">
                        <i class="fas fa-bars text-gray-700"></i>
                    </button>
                </div>
            </div>
        </nav>

        <!-- Hero Section -->
        <section class="gradient-bg text-white section-padding">
            <div class="max-w-6xl mx-auto text-center">
                <div class="mb-8">
                    <i class="fas fa-rocket text-6xl mb-6 opacity-90"></i>
                </div>
                <h1 class="text-5xl md:text-6xl font-bold mb-6">
                    RAG: Retrieval Augmented Generation
                </h1>
                <p class="text-xl md:text-2xl mb-8 opacity-90">
                    Интерактивный онлайн-семинар по архитектуре RAG
                </p>
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-8 max-w-4xl mx-auto">
                    <div class="grid md:grid-cols-3 gap-6 text-center">
                        <div>
                            <i class="fas fa-clock text-3xl mb-2"></i>
                            <div class="text-lg font-semibold">60 минут</div>
                            <div class="opacity-80">Продолжительность</div>
                        </div>
                        <div>
                            <i class="fas fa-code text-3xl mb-2"></i>
                            <div class="text-lg font-semibold">Практические примеры</div>
                            <div class="opacity-80">Python + Yandex Models</div>
                        </div>
                        <div>
                            <i class="fas fa-play-circle text-3xl mb-2"></i>
                            <div class="text-lg font-semibold">Интерактивность</div>
                            <div class="opacity-80">Песочница + Визуализации</div>
                        </div>
                    </div>
                </div>
                <a href="#overview" class="inline-block bg-white text-purple-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors">
                    Начать изучение <i class="fas fa-arrow-down ml-2"></i>
                </a>
            </div>
        </section>

        <!-- Progress Indicator -->
        <div class="bg-white py-4 shadow-sm">
            <div class="max-w-6xl mx-auto px-4">
                <div class="flex items-center justify-between text-sm text-gray-600 mb-2">
                    <span>Прогресс семинара</span>
                    <span id="progress-text">0%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" id="progress-fill" style="width: 0%"></div>
                </div>
            </div>
        </div>

        <!-- Overview Section -->
        <section id="overview" class="section-padding">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-map mr-3 text-purple-600"></i>
                    Структура семинара
                </h2>
                
                <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <a href="#theory" onclick="scrollToSection('theory')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-purple-50">
                        <div class="text-purple-600 text-4xl mb-4">
                            <i class="fas fa-sitemap"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">1. Введение в RAG</h3>
                        <p class="text-gray-600 mb-4">Основная концепция, архитектура, компоненты RAG системы</p>
                        <div class="text-sm text-gray-500">⏱️ 10 минут</div>
                        <div class="mt-3 text-purple-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>Перейти к разделу
                        </div>
                    </a>

                    <a href="#theory" onclick="scrollToSection('theory')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-blue-50">
                        <div class="text-blue-600 text-4xl mb-4">
                            <i class="fas fa-vector-square"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">2. Векторизация</h3>
                        <p class="text-gray-600 mb-4">Методы эмбеддингов, Sentence Transformers, модели</p>
                        <div class="text-sm text-gray-500">⏱️ 10 минут</div>
                        <div class="mt-3 text-blue-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>Перейти к разделу
                        </div>
                    </a>

                    <a href="#theory" onclick="scrollToSection('theory')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-green-50">
                        <div class="text-green-600 text-4xl mb-4">
                            <i class="fas fa-search"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">3. Семантический поиск</h3>
                        <p class="text-gray-600 mb-4">FAISS, HNSW, Annoy - сравнение алгоритмов</p>
                        <div class="text-sm text-gray-500">⏱️ 15 минут</div>
                        <div class="mt-3 text-green-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>Перейти к разделу
                        </div>
                    </a>

                    <a href="#theory" onclick="scrollToSection('theory')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-orange-50">
                        <div class="text-orange-600 text-4xl mb-4">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">4. Метрики качества</h3>
                        <p class="text-gray-600 mb-4">Recall@k, Precision@k, оценка RAG систем</p>
                        <div class="text-sm text-gray-500">⏱️ 5 минут</div>
                        <div class="mt-3 text-orange-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>Перейти к разделу
                        </div>
                    </a>

                    <a href="#practice" onclick="scrollToSection('practice')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-red-50">
                        <div class="text-red-600 text-4xl mb-4">
                            <i class="fas fa-code"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">5. Практика</h3>
                        <p class="text-gray-600 mb-4">Базовый RAG-конвейер, примеры кода</p>
                        <div class="text-sm text-gray-500">⏱️ 15 минут</div>
                        <div class="mt-3 text-red-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>Перейти к разделу
                        </div>
                    </a>

                    <a href="#yandex" onclick="scrollToSection('yandex')" class="block bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 hover:bg-indigo-50">
                        <div class="text-indigo-600 text-4xl mb-4">
                            <i class="fas fa-brain"></i>
                        </div>
                        <h3 class="text-xl font-bold mb-3">6. Yandex Foundation Models</h3>
                        <p class="text-gray-600 mb-4">Интеграция с YandexGPT, эмбеддинги, API</p>
                        <div class="text-sm text-gray-500">⏱️ 5 минут</div>
                        <div class="mt-3 text-indigo-600 text-sm font-semibold">
                            <i class="fas fa-arrow-right mr-2"></i>Перейти к разделу
                        </div>
                    </a>
                </div>
            </div>
        </section>

        <!-- Theory Section -->
        <section id="theory" class="bg-white section-padding">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-book mr-3 text-purple-600"></i>
                    Теоретические основы
                </h2>

                <!-- Tabs Navigation -->
                <div class="flex flex-wrap border-b border-gray-200 mb-8" id="theory-tabs">
                    <button class="tab px-6 py-3 text-lg font-medium active" data-tab="rag-intro">
                        RAG Архитектура
                    </button>
                    <button class="tab px-6 py-3 text-lg font-medium" data-tab="embeddings">
                        Эмбеддинги
                    </button>
                    <button class="tab px-6 py-3 text-lg font-medium" data-tab="vector-search">
                        Векторный поиск
                    </button>
                    <button class="tab px-6 py-3 text-lg font-medium" data-tab="metrics">
                        Метрики
                    </button>
                </div>

                <!-- Tab Contents -->
                <div class="tab-content active" id="rag-intro">
                    <div class="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 class="text-2xl font-bold mb-4">Что такое RAG?</h3>
                            <div class="space-y-4 text-gray-700">
                                <p><strong>RAG (Retrieval-Augmented Generation)</strong> — гибридная архитектура, объединяющая механизмы поиска с генеративными языковыми моделями.</p>
                                
                                <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                                    <p class="font-semibold">Проблема:</p>
                                    <p>LLM склонны к галлюцинациям и не имеют доступа к актуальной информации</p>
                                </div>
                                
                                <div class="bg-green-50 border-l-4 border-green-400 p-4">
                                    <p class="font-semibold">Решение:</p>
                                    <p>Внешние источники знаний + генеративная модель = точные и обоснованные ответы</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4">Архитектура RAG</h4>
                            <div class="bg-gray-100 rounded-lg p-6 font-mono text-sm">
                                <div class="text-center">
                                    <div class="mb-4">┌─────────────────┐</div>
                                    <div class="mb-2">│   Retriever     │</div>
                                    <div class="mb-4">│ (поиск данных)  │</div>
                                    <div class="mb-4">└─────────────────┘</div>
                                    <div class="mb-4">         ↓</div>
                                    <div class="mb-4">┌─────────────────┐</div>
                                    <div class="mb-2">│  Vector Store   │</div>
                                    <div class="mb-4">│ (база знаний)   │</div>
                                    <div class="mb-4">└─────────────────┘</div>
                                    <div class="mb-4">         ↓</div>
                                    <div class="mb-4">┌─────────────────┐</div>
                                    <div class="mb-2">│   Generator     │</div>
                                    <div class="mb-4">│ (генерация LLM) │</div>
                                    <div class="mb-4">└─────────────────┘</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 bg-blue-50 rounded-lg p-6">
                        <h4 class="text-lg font-semibold mb-4">Фазы работы RAG:</h4>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <h5 class="font-semibold text-blue-800 mb-2">1. Индексация (Offline)</h5>
                                <p class="text-sm text-gray-700">документы → чанки → эмбеддинги → векторная БД</p>
                            </div>
                            <div>
                                <h5 class="font-semibold text-blue-800 mb-2">2. Поиск и генерация (Online)</h5>
                                <p class="text-sm text-gray-700">запрос → поиск → контекст → LLM → ответ</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="embeddings">
                    <h3 class="text-2xl font-bold mb-6">Методы векторизации и эмбеддинги</h3>
                    
                    <div class="grid md:grid-cols-3 gap-6 mb-8">
                        <div class="bg-gray-50 rounded-lg p-6">
                            <h4 class="font-semibold mb-3 text-gray-800">Классические</h4>
                            <ul class="space-y-2 text-sm text-gray-600">
                                <li>• One-hot encoding</li>
                                <li>• Bag of words</li>
                                <li>• TF-IDF</li>
                            </ul>
                        </div>
                        <div class="bg-blue-50 rounded-lg p-6">
                            <h4 class="font-semibold mb-3 text-blue-800">Современные</h4>
                            <ul class="space-y-2 text-sm text-blue-700">
                                <li>• Word2Vec</li>
                                <li>• BERT</li>
                                <li>• Sentence Transformers</li>
                            </ul>
                        </div>
                        <div class="bg-green-50 rounded-lg p-6">
                            <h4 class="font-semibold mb-3 text-green-800">SOTA модели</h4>
                            <ul class="space-y-2 text-sm text-green-700">
                                <li>• all-MiniLM-L6-v2</li>
                                <li>• bge-base-en-v1.5</li>
                                <li>• YandexGPT Embeddings</li>
                            </ul>
                        </div>
                    </div>

                    <div class="bg-white border rounded-lg p-6">
                        <h4 class="font-semibold mb-4">Sentence Transformers</h4>
                        <div class="grid md:grid-cols-2 gap-6">
                            <div>
                                <ul class="space-y-2 text-sm">
                                    <li>✅ <strong>10,000+</strong> предобученных моделей на Hugging Face</li>
                                    <li>✅ Поддержка embedding, reranker, sparse encoder моделей</li>
                                    <li>✅ Простой API для семантического поиска</li>
                                    <li>✅ Оптимизация для различных задач</li>
                                </ul>
                            </div>
                            <div class="bg-gray-100 rounded p-4 font-mono text-xs">
                                <div class="text-green-600"># Пример использования</div>
                                <div>from sentence_transformers import SentenceTransformer</div>
                                <div><br></div>
                                <div>model = SentenceTransformer("all-MiniLM-L6-v2")</div>
                                <div>sentences = ["Пример текста", "Другой текст"]</div>
                                <div>embeddings = model.encode(sentences)</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="vector-search">
                    <h3 class="text-2xl font-bold mb-6">Семантический поиск: FAISS vs HNSW vs Annoy</h3>
                    
                    <div class="overflow-x-auto mb-8">
                        <table class="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th class="border p-4 text-left">Алгоритм</th>
                                    <th class="border p-4 text-center">Скорость</th>
                                    <th class="border p-4 text-center">Память</th>
                                    <th class="border p-4 text-center">Точность</th>
                                    <th class="border p-4 text-center">Сжатие</th>
                                    <th class="border p-4 text-center">GPU</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="hover:bg-gray-50">
                                    <td class="border p-4 font-semibold">HNSW</td>
                                    <td class="border p-4 text-center">⭐⭐⭐⭐⭐</td>
                                    <td class="border p-4 text-center">⭐⭐⭐</td>
                                    <td class="border p-4 text-center">⭐⭐⭐⭐⭐</td>
                                    <td class="border p-4 text-center">❌</td>
                                    <td class="border p-4 text-center">❌</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="border p-4 font-semibold">FAISS</td>
                                    <td class="border p-4 text-center">⭐⭐⭐</td>
                                    <td class="border p-4 text-center">⭐⭐⭐⭐⭐</td>
                                    <td class="border p-4 text-center">⭐⭐⭐⭐</td>
                                    <td class="border p-4 text-center">✅</td>
                                    <td class="border p-4 text-center">✅</td>
                                </tr>
                                <tr class="hover:bg-gray-50">
                                    <td class="border p-4 font-semibold">Annoy</td>
                                    <td class="border p-4 text-center">⭐⭐</td>
                                    <td class="border p-4 text-center">⭐⭐</td>
                                    <td class="border p-4 text-center">⭐⭐⭐</td>
                                    <td class="border p-4 text-center">❌</td>
                                    <td class="border p-4 text-center">❌</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="grid md:grid-cols-3 gap-6">
                        <div class="bg-blue-50 border-l-4 border-blue-400 p-6 rounded">
                            <h4 class="font-bold text-blue-800 mb-2">HNSW</h4>
                            <p class="text-sm text-blue-700 mb-3">Hierarchical Navigable Small World</p>
                            <div class="text-xs">
                                <div class="mb-2"><strong>Принцип:</strong> Многослойный граф с быстрой навигацией</div>
                                <div class="mb-2">✅ State-of-the-art результаты</div>
                                <div>❌ Больше памяти на рёбра графа</div>
                            </div>
                        </div>

                        <div class="bg-green-50 border-l-4 border-green-400 p-6 rounded">
                            <h4 class="font-bold text-green-800 mb-2">FAISS</h4>
                            <p class="text-sm text-green-700 mb-3">Facebook AI Similarity Search</p>
                            <div class="text-xs">
                                <div class="mb-2"><strong>Принцип:</strong> Кластеризация + Product Quantization</div>
                                <div class="mb-2">✅ Сжатие векторов, GPU ускорение</div>
                                <div>❌ Сложность настройки</div>
                            </div>
                        </div>

                        <div class="bg-orange-50 border-l-4 border-orange-400 p-6 rounded">
                            <h4 class="font-bold text-orange-800 mb-2">Annoy</h4>
                            <p class="text-sm text-orange-700 mb-3">Approximate Nearest neighbors Oh Yeah</p>
                            <div class="text-xs">
                                <div class="mb-2"><strong>Принцип:</strong> Бинарные деревья с рандомными проекциями</div>
                                <div class="mb-2">✅ Простота реализации</div>
                                <div>❌ Высокое потребление памяти</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="tab-content" id="metrics">
                    <h3 class="text-2xl font-bold mb-6">Оценка качества поиска: Recall@k</h3>
                    
                    <div class="grid md:grid-cols-2 gap-8 mb-8">
                        <div>
                            <h4 class="text-lg font-semibold mb-4 text-blue-800">Метрики поиска (Retrieval)</h4>
                            <div class="space-y-4">
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Recall@k</h5>
                                    <p class="text-sm text-gray-600">Доля релевантных документов среди топ-k результатов</p>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Precision@k</h5>
                                    <p class="text-sm text-gray-600">Точность среди топ-k результатов</p>
                                </div>
                                <div class="bg-blue-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">MRR</h5>
                                    <p class="text-sm text-gray-600">Mean Reciprocal Rank - обратный ранг первого релевантного результата</p>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="text-lg font-semibold mb-4 text-green-800">Метрики генерации</h4>
                            <div class="space-y-4">
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Answer Relevancy</h5>
                                    <p class="text-sm text-gray-600">Релевантность ответа запросу</p>
                                </div>
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Faithfulness</h5>
                                    <p class="text-sm text-gray-600">Отсутствие галлюцинаций относительно контекста</p>
                                </div>
                                <div class="bg-green-50 p-4 rounded-lg">
                                    <h5 class="font-semibold">Context Relevancy</h5>
                                    <p class="text-sm text-gray-600">Релевантность извлеченного контекста</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white border-2 border-purple-200 rounded-lg p-6">
                        <h4 class="text-lg font-semibold mb-4">Формула Recall@k</h4>
                        <div class="bg-purple-50 rounded-lg p-6 text-center">
                            <div class="text-xl font-mono">
                                Recall@k = <span class="text-purple-600 font-bold">Количество релевантных документов в топ-k</span>
                                / <span class="text-blue-600 font-bold">Общее количество релевантных документов</span>
                            </div>
                            <div class="mt-4 text-sm text-gray-600">
                                Например: если из 5 релевантных документов найдено 3 в топ-10, то Recall@10 = 3/5 = 0.6
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Practice Section -->
        <section id="practice" class="section-padding section-bg-pattern">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-code mr-3 text-green-600"></i>
                    Практические примеры
                </h2>

                <!-- Python Sandbox -->
                <div class="bg-white rounded-xl card-shadow p-8 mb-8">
                    <div class="flex items-center justify-between mb-6">
                        <h3 class="text-2xl font-bold">🐍 Python RAG Песочница</h3>
                        <div class="sandbox-status text-blue-600">
                            <i class="fas fa-spinner fa-spin"></i> Загрузка Pyodide...
                        </div>
                    </div>
                    
                    <div class="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <p class="text-sm"><strong>💡 Совет:</strong> Измените код ниже и нажмите "Запустить" для экспериментов!</p>
                    </div>
                    
                    <div class="grid lg:grid-cols-2 gap-6">
                        <div>
                            <h4 class="font-semibold mb-3">Базовый пример RAG</h4>
                            <textarea class="code-editor w-full h-80 resize-none" id="basic-rag-code">
# Простой пример RAG системы
import numpy as np
from sklearn.metrics.pairwise import cosine_similarity

class SimpleRAG:
    def __init__(self):
        self.documents = []
        self.embeddings = []
    
    def add_documents(self, docs):
        """Добавление документов (с мок-эмбеддингами)"""
        for doc in docs:
            # Простая имитация эмбеддинга
            embedding = np.random.rand(5)  # 5-мерный вектор
            self.documents.append(doc)
            self.embeddings.append(embedding)
        print(f"✅ Добавлено {len(docs)} документов")
    
    def search(self, query, top_k=2):
        """Поиск наиболее релевантных документов"""
        if not self.documents:
            return []
        
        # Мок-эмбеддинг запроса
        query_emb = np.random.rand(5)
        
        # Вычисляем сходство
        similarities = []
        for i, doc_emb in enumerate(self.embeddings):
            sim = cosine_similarity([query_emb], [doc_emb])[0][0]
            similarities.append((i, sim))
        
        # Сортируем по убыванию сходства
        similarities.sort(key=lambda x: x[1], reverse=True)
        
        # Возвращаем топ-k документов
        results = []
        for i in range(min(top_k, len(similarities))):
            doc_idx, score = similarities[i]
            results.append({
                'document': self.documents[doc_idx],
                'score': score
            })
        
        return results
    
    def ask(self, query):
        """RAG запрос: поиск + генерация ответа"""
        print(f"🔍 Поиск по запросу: '{query}'")
        
        # Поиск релевантных документов
        results = self.search(query)
        
        if not results:
            return "Нет релевантных документов"
        
        # Формирование контекста
        context = "\\n".join([r['document'] for r in results])
        
        # Простая имитация генерации
        print(f"📄 Найдено документов: {len(results)}")
        for i, result in enumerate(results, 1):
            print(f"   {i}. ({result['score']:.3f}) {result['document'][:50]}...")
        
        return f"На основе найденного контекста: {context[:100]}..."

# Демонстрация
rag = SimpleRAG()

# Добавляем тестовые документы
documents = [
    "RAG (Retrieval-Augmented Generation) объединяет поиск и генерацию для точных ответов",
    "FAISS - библиотека Facebook для быстрого поиска по векторам",
    "HNSW показывает лучшую производительность для приближенного поиска",
    "Эмбеддинги преобразуют текст в числовые векторы для семантического поиска",
    "Recall@k измеряет долю найденных релевантных документов в топ-k результатах"
]

rag.add_documents(documents)

# Тестируем запросы
queries = [
    "Что такое RAG?",
    "Какой алгоритм поиска самый быстрый?",
    "Как измерить качество поиска?"
]

for query in queries:
    print("\\n" + "="*60)
    answer = rag.ask(query)
    print(f"🤖 Ответ: {answer}")
                            </textarea>
                            <div class="flex gap-3 mt-4">
                                <button onclick="RAGSeminar.runPythonCode(document.getElementById('basic-rag-code').value, 'basic-rag-output')" 
                                        class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    <i class="fas fa-play mr-2"></i>Запустить код
                                </button>
                                <button onclick="RAGSeminar.copyToClipboard(document.getElementById('basic-rag-code').value)" 
                                        class="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                    <i class="fas fa-copy mr-2"></i>Копировать
                                </button>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-3">Результат выполнения</h4>
                            <div class="output-section min-h-80" id="basic-rag-output">
                                Нажмите "Запустить код" для выполнения примера...
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Embedding Visualization -->
                <div class="bg-white rounded-xl card-shadow p-8 mb-8">
                    <h3 class="text-2xl font-bold mb-6">
                        <i class="fas fa-project-diagram mr-3 text-blue-600"></i>
                        Интерактивная визуализация эмбеддингов
                    </h3>
                    
                    <div class="grid lg:grid-cols-3 gap-6">
                        <div class="lg:col-span-2">
                            <div id="embedding-visualization" class="visualization-container"></div>
                            
                            <!-- Query Input Section -->
                            <div class="mt-4 p-4 bg-gray-50 rounded-lg border">
                                <h5 class="font-semibold mb-3 text-gray-700">Добавить запрос:</h5>
                                
                                <!-- Quick Select Queries -->
                                <div class="mb-3">
                                    <label class="block text-sm font-medium text-gray-600 mb-2">Быстрый выбор:</label>
                                    <div class="flex flex-wrap gap-2">
                                        <button onclick="selectPresetQuery('Алгоритмы машинного обучения')" 
                                                class="preset-query-btn bg-blue-100 hover:bg-blue-200 text-blue-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            Алгоритмы ML
                                        </button>
                                        <button onclick="selectPresetQuery('Приготовление борща')" 
                                                class="preset-query-btn bg-orange-100 hover:bg-orange-200 text-orange-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            Приготовление борща
                                        </button>
                                        <button onclick="selectPresetQuery('Спортивные соревнования')" 
                                                class="preset-query-btn bg-green-100 hover:bg-green-200 text-green-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            Спорт
                                        </button>
                                        <button onclick="selectPresetQuery('Векторный поиск')" 
                                                class="preset-query-btn bg-purple-100 hover:bg-purple-200 text-purple-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            Векторный поиск
                                        </button>
                                        <button onclick="selectPresetQuery('Нейронные сети')" 
                                                class="preset-query-btn bg-indigo-100 hover:bg-indigo-200 text-indigo-800 text-sm px-3 py-1 rounded-full transition-colors">
                                            Нейросети
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Custom Query Input -->
                                <div class="mb-3">
                                    <label for="custom-query-input" class="block text-sm font-medium text-gray-600 mb-2">Или введите свой запрос:</label>
                                    <div class="flex gap-2">
                                        <input type="text" 
                                               id="custom-query-input" 
                                               placeholder="Введите ваш поисковый запрос..." 
                                               class="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                                               onkeypress="if(event.key==='Enter') addCustomQueryToVisualization()">
                                        <button onclick="addCustomQueryToVisualization()" 
                                                class="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors whitespace-nowrap">
                                            ➕ Добавить
                                        </button>
                                    </div>
                                </div>
                                
                                <!-- Control Buttons -->
                                <div class="flex gap-3 flex-wrap">
                                    <button onclick="findSimilarInVisualization()" 
                                            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
                                            id="find-similar-btn" disabled>
                                        🔍 Найти похожие
                                    </button>
                                    <button onclick="resetVisualization()" 
                                            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                        🔄 Сброс
                                    </button>
                                    <button onclick="showVisualizationHelp()" 
                                            class="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors">
                                        ❓ Справка
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h4 class="font-semibold mb-3">Как работает семантический поиск:</h4>
                            <div class="space-y-3 text-sm text-gray-700">
                                <div class="flex items-start">
                                    <i class="fas fa-circle text-blue-500 mt-2 mr-3 text-xs"></i>
                                    <span><strong>Синие точки</strong> - документы в векторном пространстве</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-circle text-red-500 mt-2 mr-3 text-xs"></i>
                                    <span><strong>Красные точки</strong> - пользовательские запросы</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-minus text-green-500 mt-2 mr-3"></i>
                                    <span><strong>Зеленая линия</strong> - наилучшее семантическое соответствие</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-minus text-blue-500 mt-2 mr-3"></i>
                                    <span><strong>Синие линии</strong> - семантически связанные документы</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-minus text-yellow-500 mt-2 mr-3"></i>
                                    <span><strong>Желтые линии</strong> - низкое сходство (разные категории)</span>
                                </div>
                                <div class="flex items-start">
                                    <i class="fas fa-percent mt-2 mr-3 text-purple-600"></i>
                                    <span><strong>Проценты</strong> - точная семантическая похожесть</span>
                                </div>
                            </div>
                            
                            <div class="mt-6 bg-orange-50 rounded-lg p-4 border border-orange-200">
                                <h5 class="font-semibold text-orange-800 mb-2">🧠 Алгоритм учитывает:</h5>
                                <ul class="text-sm text-orange-700 space-y-1">
                                    <li>• <strong>Семантические категории:</strong> ИИ/ML, Кулинария, Спорт</li>
                                    <li>• <strong>Точное совпадение слов:</strong> приготовление ≈ готовить</li>
                                    <li>• <strong>Межкатегорийные связи:</strong> борщ ≠ машинное обучение</li>
                                    <li>• <strong>Контекстуальное понимание:</strong> реальный анализ значений</li>
                                </ul>
                            </div>
                            
                            <div class="mt-4 bg-blue-50 rounded-lg p-4">
                                <h5 class="font-semibold text-blue-800 mb-2">💡 Попробуйте:</h5>
                                <ul class="text-sm text-blue-700 space-y-1">
                                    <li>• Запрос "Приготовление борща" → высокое сходство с кулинарией</li>
                                    <li>• Запрос про ИИ → найдет только ML-документы</li>
                                    <li>• Смешанный запрос → покажет межкатегорийные различия</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Quiz Section -->
        <section id="quiz" class="bg-white section-padding">
            <div class="max-w-4xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-brain mr-3 text-purple-600"></i>
                    Проверьте свои знания
                </h2>
                
                <div class="bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 mb-8">
                    <div class="text-center">
                        <i class="fas fa-trophy text-4xl text-yellow-500 mb-4"></i>
                        <h3 class="text-2xl font-bold mb-4">Квиз по RAG технологиям</h3>
                        <p class="text-gray-600 mb-6">Проверьте, насколько хорошо вы усвоили материал семинара. 5 вопросов о ключевых концепциях RAG.</p>
                        
                        <div class="grid md:grid-cols-3 gap-6 text-center">
                            <div class="bg-white rounded-lg p-4">
                                <i class="fas fa-question-circle text-2xl text-blue-600 mb-2"></i>
                                <div class="font-semibold">5 вопросов</div>
                                <div class="text-sm text-gray-600">О ключевых концепциях</div>
                            </div>
                            <div class="bg-white rounded-lg p-4">
                                <i class="fas fa-clock text-2xl text-green-600 mb-2"></i>
                                <div class="font-semibold">Без ограничения</div>
                                <div class="text-sm text-gray-600">Времени на обдумывание</div>
                            </div>
                            <div class="bg-white rounded-lg p-4">
                                <i class="fas fa-medal text-2xl text-yellow-600 mb-2"></i>
                                <div class="font-semibold">Мгновенный</div>
                                <div class="text-sm text-gray-600">Результат с объяснениями</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- Quiz Container -->
                <div id="rag-quiz"></div>
            </div>
        </section>

        <!-- Yandex Models Section -->
        <section id="yandex" class="section-padding bg-gradient-to-br from-orange-50 to-red-50">
            <div class="max-w-6xl mx-auto">
                <h2 class="text-4xl font-bold text-center mb-12 text-gray-800">
                    <i class="fas fa-rocket mr-3 text-orange-600"></i>
                    Yandex Foundation Models для RAG
                </h2>

                <!-- Model Comparison -->
                <div class="grid lg:grid-cols-3 gap-6 mb-8">
                    <div class="bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-star text-2xl text-yellow-500 mr-3"></i>
                            <h3 class="text-xl font-bold">YandexGPT Pro</h3>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span>Контекст:</span>
                                <span class="font-semibold">32,000 токенов</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Качество:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <span>Скорость:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                </div>
                            </div>
                            <div class="pt-3 border-t">
                                <p class="text-gray-600">Лучший выбор для сложных RAG задач с длинным контекстом</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-balance-scale text-2xl text-blue-500 mr-3"></i>
                            <h3 class="text-xl font-bold">YandexGPT</h3>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span>Контекст:</span>
                                <span class="font-semibold">8,000 токенов</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Качество:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <span>Скорость:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                </div>
                            </div>
                            <div class="pt-3 border-t">
                                <p class="text-gray-600">Сбалансированное решение для большинства RAG применений</p>
                            </div>
                        </div>
                    </div>

                    <div class="bg-white rounded-xl card-shadow p-6 hover:shadow-xl transition-all duration-300">
                        <div class="flex items-center mb-4">
                            <i class="fas fa-bolt text-2xl text-green-500 mr-3"></i>
                            <h3 class="text-xl font-bold">YandexGPT Lite</h3>
                        </div>
                        <div class="space-y-3 text-sm">
                            <div class="flex justify-between">
                                <span>Контекст:</span>
                                <span class="font-semibold">4,000 токенов</span>
                            </div>
                            <div class="flex justify-between">
                                <span>Качество:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                    <i class="fas fa-star text-gray-300"></i>
                                </div>
                            </div>
                            <div class="flex justify-between">
                                <span>Скорость:</span>
                                <div class="flex">
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                    <i class="fas fa-star text-yellow-400"></i>
                                </div>
                            </div>
                            <div class="pt-3 border-t">
                                <p class="text-gray-600">Быстрые ответы для простых RAG запросов</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Enhanced Code Configuration Tool -->
                <div class="bg-white rounded-xl card-shadow p-8">
                    <h3 class="text-2xl font-bold mb-6">
                        <i class="fas fa-cog mr-3 text-orange-600"></i>
                        Конфигуратор RAG с Yandex Models
                    </h3>

                    <!-- Configuration Tabs -->
                    <div class="flex border-b border-gray-200 mb-6" id="yandex-config-tabs">
                        <button class="tab px-6 py-3 text-lg font-medium active" data-tab="yandex-config">
                            <i class="fas fa-sliders-h mr-2"></i>Конфигурация
                        </button>
                        <button class="tab px-6 py-3 text-lg font-medium" data-tab="yandex-code">
                            <i class="fas fa-code mr-2"></i>Сгенерированный код
                        </button>
                        <button class="tab px-6 py-3 text-lg font-medium" data-tab="yandex-sandbox">
                            <i class="fas fa-play-circle mr-2"></i>Песочница
                        </button>
                    </div>

                    <!-- Configuration Tab -->
                    <div class="tab-content active" id="yandex-config">
                        <div class="grid lg:grid-cols-2 gap-8">
                            <div>
                                <h4 class="font-semibold mb-4 text-gray-800">Параметры RAG системы:</h4>
                                
                                <div class="space-y-4">
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            <i class="fas fa-brain mr-1 text-orange-500"></i>Модель для генерации:
                                        </label>
                                        <select id="yandex-model-select" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                                            <option value="yandexgpt-pro">YandexGPT Pro (32K контекст, лучшее качество)</option>
                                            <option value="yandexgpt" selected>YandexGPT (8K контекст, сбалансированный)</option>
                                            <option value="yandexgpt-lite">YandexGPT Lite (4K контекст, быстрый)</option>
                                        </select>
                                    </div>
                                    
                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            <i class="fas fa-plug mr-1 text-blue-500"></i>API подход:
                                        </label>
                                        <select id="api-approach-select" class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
                                            <option value="sdk">Yandex Cloud SDK (рекомендуется)</option>
                                            <option value="openai" selected>OpenAI Compatible API</option>
                                        </select>
                                    </div>
                                    
                                    <div class="grid grid-cols-2 gap-4">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                <i class="fas fa-list-ol mr-1 text-green-500"></i>Top-K результатов:
                                            </label>
                                            <input type="number" id="topk-input" value="3" min="1" max="10" 
                                                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                            <p class="text-xs text-gray-500 mt-1">Количество документов для контекста</p>
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-2">
                                                <i class="fas fa-cut mr-1 text-purple-500"></i>Размер чанка:
                                            </label>
                                            <input type="number" id="chunk-size-input" value="1000" min="100" max="4000" step="100"
                                                   class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                            <p class="text-xs text-gray-500 mt-1">Токенов на чанк</p>
                                        </div>
                                    </div>

                                    <div>
                                        <label class="block text-sm font-medium text-gray-700 mb-2">
                                            <i class="fas fa-folder mr-1 text-indigo-500"></i>Folder ID (опционально):
                                        </label>
                                        <input type="text" id="folder-id-input" placeholder="b1g2b3c4d5e6f7g8h9i0" 
                                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500">
                                        <p class="text-xs text-gray-500 mt-1">Ваш Folder ID из Yandex Cloud</p>
                                    </div>
                                    
                                    <button onclick="generateYandexRAGCode()" 
                                            class="w-full bg-gradient-to-r from-orange-600 to-red-600 text-white py-4 px-6 rounded-lg font-semibold hover:from-orange-700 hover:to-red-700 transition-all duration-200 transform hover:scale-105">
                                        <i class="fas fa-magic mr-2"></i>Сгенерировать код RAG
                                    </button>
                                </div>
                            </div>
                            
                            <div>
                                <h4 class="font-semibold mb-4 text-gray-800">Предварительный просмотр:</h4>
                                <div class="bg-gray-50 rounded-lg p-6 h-96 overflow-y-auto border-2 border-dashed border-gray-300">
                                    <div class="text-center text-gray-500 mt-20">
                                        <i class="fas fa-code text-4xl mb-4"></i>
                                        <p class="text-lg mb-2">Код будет сгенерирован здесь</p>
                                        <p class="text-sm">Настройте параметры слева и нажмите "Сгенерировать код"</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Generated Code Tab -->
                    <div class="tab-content" id="yandex-code">
                        <div class="mb-4 flex items-center justify-between">
                            <h4 class="font-semibold text-gray-800">
                                <i class="fas fa-file-code mr-2 text-blue-600"></i>Сгенерированный Python код
                            </h4>
                            <div class="flex gap-2">
                                <button onclick="copyGeneratedCode()" 
                                        class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                    <i class="fas fa-copy mr-2"></i>Копировать
                                </button>
                                <button onclick="downloadGeneratedCode()" 
                                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                                    <i class="fas fa-download mr-2"></i>Скачать
                                </button>
                                <button onclick="sendCodeToSandbox()" 
                                        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
                                    <i class="fas fa-play mr-2"></i>В песочницу
                                </button>
                            </div>
                        </div>
                        
                        <!-- Enhanced Code Editor -->
                        <div class="relative">
                            <div class="absolute top-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded z-10">
                                Python
                            </div>
                            <textarea id="yandex-generated-code-editor" 
                                      class="w-full h-96 p-4 font-mono text-sm bg-gray-900 text-gray-100 rounded-lg border border-gray-600 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 resize-none overflow-auto"
                                      placeholder="Настройте параметры на вкладке 'Конфигурация' и сгенерируйте код..."
                                      spellcheck="false"></textarea>
                        </div>

                        <div class="mt-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-4">
                            <h5 class="font-semibold text-blue-800 mb-2">
                                <i class="fas fa-lightbulb mr-2"></i>Возможности редактора:
                            </h5>
                            <ul class="text-sm text-blue-700 space-y-1">
                                <li>• ✏️ Редактируйте код прямо в браузере</li>
                                <li>• 🚀 Отправьте код в песочницу для выполнения</li>
                                <li>• 📋 Копируйте или скачайте готовый файл</li>
                                <li>• 🔧 Настройки сохраняются автоматически</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Interactive Sandbox Tab -->
                    <div class="tab-content" id="yandex-sandbox">
                        <div class="mb-4">
                            <h4 class="font-semibold text-gray-800 mb-2">
                                <i class="fas fa-flask mr-2 text-green-600"></i>Интерактивная песочница Yandex RAG
                            </h4>
                            <p class="text-gray-600 text-sm">Выполните сгенерированный код с реальными данными (без моков)</p>
                        </div>

                        <!-- Yandex Cloud Credentials Input -->
                        <div class="mb-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h5 class="font-semibold text-blue-800 mb-3">
                                <i class="fas fa-key mr-2"></i>Yandex Cloud авторизация (обязательно для реального выполнения)
                            </h5>
                            <div class="grid md:grid-cols-2 gap-4">
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <i class="fas fa-folder mr-1 text-blue-500"></i>Folder ID:
                                    </label>
                                    <input type="text" 
                                           id="sandbox-folder-id" 
                                           placeholder="b1g2b3c4d5e6f7g8h9i0" 
                                           class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono">
                                    <p class="text-xs text-gray-500 mt-1">Ваш Folder ID из Yandex Cloud</p>
                                </div>
                                <div>
                                    <label class="block text-sm font-medium text-gray-700 mb-2">
                                        <i class="fas fa-key mr-1 text-orange-500"></i>API Key:
                                    </label>
                                    <input type="password" 
                                           id="sandbox-api-key" 
                                           placeholder="AQVN..." 
                                           class="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono">
                                    <p class="text-xs text-gray-500 mt-1">API ключ или IAM токен</p>
                                </div>
                            </div>
                            <div class="mt-3 flex items-center gap-3">
                                <button onclick="injectCredentialsIntoCode()" 
                                        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                                    <i class="fas fa-inject mr-2"></i>Внедрить в код
                                </button>
                                <button onclick="validateCredentials()" 
                                        class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm">
                                    <i class="fas fa-check mr-2"></i>Проверить
                                </button>
                                <div id="credentials-status" class="text-sm text-gray-600">
                                    <i class="fas fa-info-circle mr-1"></i>Введите данные для авторизации
                                </div>
                            </div>
                        </div>

                        <div class="grid lg:grid-cols-2 gap-6">
                            <div>
                                <div class="flex items-center justify-between mb-3">
                                    <h5 class="font-medium text-gray-700">Исполняемый код:</h5>
                                    <div class="flex gap-2">
                                        <button onclick="loadCodeFromEditor()" 
                                                class="text-sm bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition-colors">
                                            <i class="fas fa-sync mr-1"></i>Загрузить из редактора
                                        </button>
                                        <div class="sandbox-status text-blue-600 text-sm">
                                            <i class="fas fa-spinner fa-spin"></i> Pyodide загружается...
                                        </div>
                                    </div>
                                </div>
                                
                                <textarea id="yandex-sandbox-code" 
                                          class="w-full h-64 p-3 font-mono text-sm bg-gray-50 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none"
                                          placeholder="Код для выполнения загрузится сюда автоматически..."></textarea>
                                
                                <div class="flex gap-3 mt-3">
                                    <button onclick="runYandexSandboxCode()" 
                                            class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex-1">
                                        <i class="fas fa-play mr-2"></i>Выполнить код
                                    </button>
                                    <button onclick="clearSandboxOutput()" 
                                            class="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors">
                                        <i class="fas fa-trash mr-2"></i>Очистить
                                    </button>
                                </div>

                                <div class="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                                    <h6 class="font-semibold text-yellow-800 mb-2">
                                        <i class="fas fa-exclamation-triangle mr-2"></i>Важно:
                                    </h6>
                                    <ul class="text-sm text-yellow-700 space-y-1">
                                        <li>• Код выполняется локально в браузере</li>
                                        <li>• API ключи Yandex нужно устанавливать отдельно</li>
                                        <li>• Поддерживаются numpy, pandas, requests</li>
                                        <li>• Реальные HTTP запросы возможны</li>
                                    </ul>
                                </div>
                            </div>
                            
                            <div>
                                <h5 class="font-medium text-gray-700 mb-3">Результат выполнения:</h5>
                                <div class="output-section min-h-64 max-h-80 overflow-y-auto" id="yandex-sandbox-output">
                                    Выполните код для просмотра результатов...
                                </div>

                                <div class="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
                                    <h6 class="font-semibold text-green-800 mb-2">
                                        <i class="fas fa-rocket mr-2"></i>Возможности:
                                    </h6>
                                    <ul class="text-sm text-green-700 space-y-1">
                                        <li>• 🔄 Реальное выполнение Python кода</li>
                                        <li>• 📦 Автоматическая установка пакетов</li>
                                        <li>• 🌐 HTTP запросы к внешним API</li>
                                        <li>• 📊 Визуализация данных с matplotlib</li>
                                        <li>• 🧪 Тестирование RAG алгоритмов</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Getting Started Guide -->
                    <div class="mt-8 bg-gradient-to-r from-orange-50 to-red-50 border-l-4 border-orange-400 rounded-lg p-6">
                        <div class="flex items-start">
                            <i class="fas fa-rocket text-orange-600 text-2xl mt-1 mr-4"></i>
                            <div>
                                <p class="font-semibold text-orange-800 mb-3 text-lg">🚀 Быстрый старт с Yandex Foundation Models</p>
                                <div class="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <h6 class="font-semibold text-orange-800 mb-2">Подготовка:</h6>
                                        <ol class="text-sm text-orange-700 space-y-1">
                                            <li>1. 📝 Зарегистрируйтесь в <a href="https://cloud.yandex.ru" target="_blank" class="underline hover:text-orange-900">Yandex Cloud</a></li>
                                            <li>2. 🔑 Создайте сервисный аккаунт</li>
                                            <li>3. 🛠️ Получите API ключ или IAM токен</li>
                                            <li>4. 📦 Установите SDK: <code class="bg-orange-100 px-1 rounded font-mono">pip install yandexcloud</code></li>
                                        </ol>
                                    </div>
                                    <div>
                                        <h6 class="font-semibold text-orange-800 mb-2">Использование:</h6>
                                        <ol class="text-sm text-orange-700 space-y-1">
                                            <li>5. ⚙️ Настройте параметры на вкладке "Конфигурация"</li>
                                            <li>6. 🔄 Сгенерируйте код RAG</li>
                                            <li>7. ✏️ Отредактируйте код под свои нужды</li>
                                            <li>8. 🧪 Протестируйте в песочнице</li>
                                        </ol>
                                    </div>
                                </div>
                                
                                <div class="mt-4 p-3 bg-orange-100 rounded-lg">
                                    <p class="text-sm text-orange-800">
                                        <i class="fas fa-info-circle mr-2"></i>
                                        <strong>Совет:</strong> Начните с OpenAI Compatible API - это самый простой способ интеграции с существующими проектами.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Conclusion Section -->
        <section class="gradient-bg text-white section-padding">
            <div class="max-w-4xl mx-auto text-center">
                <i class="fas fa-graduation-cap text-6xl mb-6 opacity-90"></i>
                <h2 class="text-4xl font-bold mb-6">Поздравляем!</h2>
                <p class="text-xl mb-8 opacity-90">
                    Вы изучили основы RAG технологии и готовы применить знания на практике
                </p>
                
                <div class="bg-white/10 backdrop-blur-sm rounded-xl p-8 mb-8">
                    <h3 class="text-2xl font-bold mb-6">Что вы изучили:</h3>
                    <div class="grid md:grid-cols-2 gap-6 text-left">
                        <div>
                            <ul class="space-y-3">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>Архитектуру RAG систем</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>Методы векторизации и эмбеддинги</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>Алгоритмы семантического поиска</span>
                                </li>
                            </ul>
                        </div>
                        <div>
                            <ul class="space-y-3">
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>Метрики оценки качества</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>Практическую реализацию RAG</span>
                                </li>
                                <li class="flex items-start">
                                    <i class="fas fa-check-circle text-green-300 mt-1 mr-3"></i>
                                    <span>Интеграцию с Yandex Foundation Models</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <div class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#overview" class="bg-white text-purple-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                        <i class="fas fa-redo mr-2"></i>Пройти еще раз
                    </a>
                    <a href="/vector_databases_enhanced_guide" class="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                        <i class="fas fa-database mr-2"></i>Векторные БД: Подробно
                    </a>
                    <button onclick="RAGSeminar.downloadCode(getFullSeminarNotes(), 'rag-seminar-notes.txt')" 
                            class="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-purple-700 transition-colors">
                        <i class="fas fa-download mr-2"></i>Скачать конспект
                    </button>
                </div>
                
                <div class="mt-8 text-sm opacity-75">
                    <p>Спасибо за участие в семинаре! Удачи в изучении RAG технологий 🚀</p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <footer class="bg-gray-800 text-white py-12">
            <div class="max-w-6xl mx-auto px-4">
                <div class="grid md:grid-cols-3 gap-8">
                    <div>
                        <h3 class="text-xl font-bold mb-4">
                            <i class="fas fa-brain mr-2"></i>RAG Семинар
                        </h3>
                        <p class="text-gray-300 mb-4">
                            Интерактивное изучение технологий Retrieval-Augmented Generation
                        </p>
                        <div class="flex space-x-4">
                            <a href="#" class="text-gray-300 hover:text-white transition-colors" title="GitHub">
                                <i class="fab fa-github text-xl"></i>
                            </a>
                            <a href="https://t.me/llm_notes" target="_blank" class="text-gray-300 hover:text-white transition-colors" title="Telegram канал LLM Notes">
                                <i class="fab fa-telegram text-xl"></i>
                            </a>
                        </div>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">Разделы</h4>
                        <ul class="space-y-2 text-gray-300">
                            <li><a href="#overview" class="hover:text-white transition-colors">Обзор</a></li>
                            <li><a href="#theory" class="hover:text-white transition-colors">Теория</a></li>
                            <li><a href="#practice" class="hover:text-white transition-colors">Практика</a></li>
                            <li><a href="#quiz" class="hover:text-white transition-colors">Квиз</a></li>
                            <li><a href="/vector_databases_enhanced_guide" class="hover:text-white transition-colors text-blue-400">📚 Векторные БД: Подробно</a></li>
                        </ul>
                    </div>
                    
                    <div>
                        <h4 class="font-semibold mb-4">Технологии</h4>
                        <ul class="space-y-2 text-gray-300">
                            <li>Python & Pyodide</li>
                            <li>D3.js Визуализации</li>
                            <li>Yandex Foundation Models</li>
                            <li>Cloudflare Pages</li>
                        </ul>
                    </div>
                </div>
                
                <div class="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
                    <p>&copy; 2025 RAG Семинар. Сделано с ❤️ для изучения AI технологий</p>
                    <p class="mt-2 text-sm">
                        Подписывайтесь на наш 
                        <a href="https://t.me/llm_notes" target="_blank" class="text-blue-400 hover:text-blue-300 transition-colors">
                            <i class="fab fa-telegram mr-1"></i>Telegram канал
                        </a> 
                        для получения новых материалов по AI
                    </p>
                </div>
            </div>
        </footer>

        <!-- Load scripts -->
        <script src="/static/app.js"></script>
        
        <script>
            // Visualization and interaction functions
            let visualizationSvg = null;
            let queries = [];
            let currentQuery = null;
            
            // Document data for visualization
            const documents = [
                {id: "doc1", x: 100, y: 150, text: "Машинное обучение", type: "document"},
                {id: "doc2", x: 120, y: 170, text: "Нейронные сети", type: "document"},
                {id: "doc3", x: 300, y: 100, text: "Приготовление пасты", type: "document"},
                {id: "doc4", x: 320, y: 120, text: "Итальянская кухня", type: "document"},
                {id: "doc5", x: 200, y: 300, text: "Футбольный матч", type: "document"},
                {id: "doc6", x: 180, y: 280, text: "Спортивные новости", type: "document"}
            ];
            
            function initializeVisualization() {
                const container = document.getElementById('embedding-visualization');
                if (!container || visualizationSvg) return;
                
                const width = 600, height = 400;
                
                visualizationSvg = d3.select(container)
                    .append('svg')
                    .attr('width', '100%')
                    .attr('height', height)
                    .attr('viewBox', \`0 0 \${width} \${height}\`)
                    .style('background', 'white');
                
                // Add documents
                const dots = visualizationSvg.selectAll('.document')
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
                
                // Add labels
                visualizationSvg.selectAll('.label')
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
                
                // Tooltips
                dots.on('mouseover', function(event, d) {
                    d3.select('body').append('div')
                        .attr('class', 'tooltip')
                        .style('position', 'absolute')
                        .style('background', 'rgba(0,0,0,0.8)')
                        .style('color', 'white')
                        .style('padding', '8px')
                        .style('border-radius', '4px')
                        .style('pointer-events', 'none')
                        .style('opacity', 0)
                        .html(\`<strong>\${d.text}</strong><br>ID: \${d.id}\`)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 10) + 'px')
                        .transition()
                        .duration(200)
                        .style('opacity', 1);
                })
                .on('mouseout', function() {
                    d3.selectAll('.tooltip').remove();
                });
            }
            
            // Preset queries with strategic positioning for better demonstration
            const presetQueries = {
                'Алгоритмы машинного обучения': { x: 110, y: 160, category: 'AI' },
                'Нейронные сети': { x: 130, y: 180, category: 'AI' },
                'Векторный поиск': { x: 140, y: 140, category: 'AI' },
                'Рецепты итальянской кухни': { x: 310, y: 110, category: 'Food' },
                'Приготовление пасты': { x: 290, y: 130, category: 'Food' },
                'Приготовление борща': { x: 320, y: 90, category: 'Food' },
                'Варка супа': { x: 280, y: 140, category: 'Food' },
                'Спортивные соревнования': { x: 190, y: 290, category: 'Sports' },
                'Футбольные матчи': { x: 210, y: 310, category: 'Sports' }
            };
            
            function selectPresetQuery(queryText) {
                document.getElementById('custom-query-input').value = queryText;
                RAGSeminar.showNotification(\`Выбран запрос: "\${queryText}"\`, 'info');
            }
            
            function addCustomQueryToVisualization() {
                const input = document.getElementById('custom-query-input');
                const queryText = input.value.trim();
                
                if (!queryText) {
                    RAGSeminar.showNotification('Введите текст запроса!', 'warning');
                    return;
                }
                
                addQueryToVisualization(queryText);
                input.value = '';
            }
            
            function addQueryToVisualization(queryText = null) {
                if (!visualizationSvg) return;
                
                const finalQueryText = queryText || \`Запрос \${queries.length + 1}\`;
                let x, y;
                
                // Use strategic positioning for preset queries
                if (queryText && presetQueries[queryText]) {
                    const preset = presetQueries[queryText];
                    x = preset.x + (Math.random() - 0.5) * 20; // Small random offset
                    y = preset.y + (Math.random() - 0.5) * 20;
                } else {
                    x = Math.random() * 500 + 50;
                    y = Math.random() * 300 + 50;
                }
                
                const queryId = \`query_\${queries.length + 1}\`;
                
                const query = {
                    id: queryId,
                    x: x,
                    y: y,
                    text: finalQueryText,
                    type: "query"
                };
                
                queries.push(query);
                currentQuery = query;
                
                // Clear previous connections when adding new query
                visualizationSvg.selectAll('.connection').remove();
                visualizationSvg.selectAll('.similarity-text').remove();
                
                visualizationSvg.append('circle')
                    .attr('class', 'query')
                    .attr('id', queryId)
                    .attr('cx', x)
                    .attr('cy', y)
                    .attr('r', 10)
                    .attr('fill', '#ea4335')
                    .attr('stroke', '#fff')
                    .attr('stroke-width', 2)
                    .style('cursor', 'pointer')
                    .on('click', function() {
                        currentQuery = query;
                        // Highlight selected query
                        visualizationSvg.selectAll('.query').attr('stroke-width', 2);
                        d3.select(this).attr('stroke-width', 4);
                        updateFindButton();
                    });
                
                const label = visualizationSvg.append('text')
                    .attr('class', 'query-label')
                    .attr('id', \`\${queryId}-label\`)
                    .attr('x', x)
                    .attr('y', y - 18)
                    .attr('text-anchor', 'middle')
                    .attr('font-size', '11px')
                    .attr('font-weight', 'bold')
                    .attr('fill', '#ea4335')
                    .style('cursor', 'pointer')
                    .on('click', function() {
                        currentQuery = query;
                        updateFindButton();
                    });
                
                // Wrap long text
                const words = finalQueryText.split(' ');
                if (words.length > 2) {
                    label.text('');
                    label.append('tspan')
                        .attr('x', x)
                        .attr('dy', 0)
                        .text(words.slice(0, 2).join(' '));
                    if (words.length > 2) {
                        label.append('tspan')
                            .attr('x', x)
                            .attr('dy', '1.2em')
                            .text(words.slice(2).join(' '));
                    }
                } else {
                    label.text(finalQueryText);
                }
                
                updateFindButton();
                RAGSeminar.showNotification(\`Запрос "\${finalQueryText}" добавлен!\`, 'success');
            }
            
            function updateFindButton() {
                const findBtn = document.getElementById('find-similar-btn');
                if (currentQuery) {
                    findBtn.disabled = false;
                    findBtn.classList.remove('disabled:bg-gray-400', 'disabled:cursor-not-allowed');
                } else {
                    findBtn.disabled = true;
                    findBtn.classList.add('disabled:bg-gray-400', 'disabled:cursor-not-allowed');
                }
            }
            
            function findSimilarInVisualization() {
                if (!currentQuery || !visualizationSvg) {
                    RAGSeminar.showNotification('Сначала добавьте или выберите запрос!', 'warning');
                    return;
                }
                
                // Advanced semantic similarity calculation
                const similarities = documents.map(doc => {
                    const queryLower = currentQuery.text.toLowerCase();
                    const docLower = doc.text.toLowerCase();
                    
                    // Расширенные семантические категории с более точными терминами
                    const semanticCategories = {
                        ai: {
                            terms: ['машинное', 'обучение', 'нейронн', 'алгоритм', 'векторн', 'поиск', 'искусственн', 'модел', 'данн', 'ai', 'ml'],
                            boost: 0.9
                        },
                        food: {
                            terms: ['кухн', 'паст', 'приготов', 'рецепт', 'италь', 'еда', 'блюд', 'готов', 'борщ', 'суп', 'варить', 'жарить'],
                            boost: 0.85
                        },
                        sports: {
                            terms: ['спорт', 'футбол', 'матч', 'соревнов', 'игра', 'команда', 'тренир', 'физическ'],
                            boost: 0.8
                        }
                    };
                    
                    // Определение категории запроса и документа
                    let queryCategory = null;
                    let docCategory = null;
                    let maxQueryScore = 0;
                    let maxDocScore = 0;
                    
                    for (const [category, data] of Object.entries(semanticCategories)) {
                        // Подсчет совпадений для запроса
                        const queryMatches = data.terms.filter(term => queryLower.includes(term)).length;
                        const queryScore = queryMatches / data.terms.length;
                        
                        if (queryScore > maxQueryScore) {
                            maxQueryScore = queryScore;
                            queryCategory = category;
                        }
                        
                        // Подсчет совпадений для документа
                        const docMatches = data.terms.filter(term => docLower.includes(term)).length;
                        const docScore = docMatches / data.terms.length;
                        
                        if (docScore > maxDocScore) {
                            maxDocScore = docScore;
                            docCategory = category;
                        }
                    }
                    
                    // Расчет семантической похожести
                    let semanticSimilarity = 0;
                    let isSemanticMatch = false;
                    
                    if (queryCategory && docCategory) {
                        if (queryCategory === docCategory) {
                            // Одна категория - высокое сходство
                            semanticSimilarity = Math.min(maxQueryScore, maxDocScore) * semanticCategories[queryCategory].boost;
                            isSemanticMatch = true;
                        } else {
                            // Разные категории - очень низкое сходство
                            semanticSimilarity = 0.1;
                        }
                    } else {
                        // Если категория не определена - средне-низкое сходство
                        semanticSimilarity = 0.2;
                    }
                    
                    // Дополнительная проверка на прямое совпадение слов
                    const queryWords = queryLower.split(/\\s+/);
                    const docWords = docLower.split(/\\s+/);
                    let directWordMatches = 0;
                    
                    queryWords.forEach(qword => {
                        docWords.forEach(dword => {
                            if (qword.length > 3 && dword.includes(qword.substring(0, 4))) {
                                directWordMatches++;
                            }
                        });
                    });
                    
                    const directMatchBonus = Math.min(directWordMatches * 0.2, 0.4);
                    
                    // Финальная похожесть (0-1)
                    const finalSimilarity = Math.min(1, semanticSimilarity + directMatchBonus);
                    
                    // Геометрическое расстояние для визуализации (менее важно)
                    const euclideanDist = Math.sqrt(
                        Math.pow(doc.x - currentQuery.x, 2) + 
                        Math.pow(doc.y - currentQuery.y, 2)
                    );
                    
                    return { 
                        doc, 
                        distance: euclideanDist, 
                        similarity: finalSimilarity,
                        semanticMatch: isSemanticMatch,
                        queryCategory,
                        docCategory,
                        directMatches: directWordMatches
                    };
                });
                
                // Sort by similarity (higher is better)
                similarities.sort((a, b) => b.similarity - a.similarity);
                const topK = similarities.slice(0, 3);
                
                // Clear previous connections
                visualizationSvg.selectAll('.connection').remove();
                visualizationSvg.selectAll('.similarity-text').remove();
                
                // Draw connections with enhanced visualization
                topK.forEach((item, index) => {
                    const doc = item.doc;
                    const similarity = item.similarity;
                    const isSemanticMatch = item.semanticMatch;
                    
                    // Color coding: green for best match, blue for semantic matches, yellow for distance-based
                    let strokeColor;
                    if (index === 0) {
                        strokeColor = '#34a853'; // Green for best match
                    } else if (isSemanticMatch) {
                        strokeColor = '#4285f4'; // Blue for semantic matches
                    } else {
                        strokeColor = '#fbbc04'; // Yellow for distance-based
                    }
                    
                    visualizationSvg.append('line')
                        .attr('class', 'connection')
                        .attr('x1', currentQuery.x)
                        .attr('y1', currentQuery.y)
                        .attr('x2', doc.x)
                        .attr('y2', doc.y)
                        .attr('stroke', strokeColor)
                        .attr('stroke-width', 4 - index * 0.8)
                        .attr('stroke-dasharray', index === 0 ? '0' : '8,4')
                        .attr('opacity', 0.8);
                    
                    const midX = (currentQuery.x + doc.x) / 2;
                    const midY = (currentQuery.y + doc.y) / 2;
                    
                    // Similarity score with background for better readability
                    const scoreGroup = visualizationSvg.append('g')
                        .attr('class', 'similarity-text');
                    
                    scoreGroup.append('rect')
                        .attr('x', midX - 15)
                        .attr('y', midY - 8)
                        .attr('width', 30)
                        .attr('height', 16)
                        .attr('fill', 'white')
                        .attr('stroke', strokeColor)
                        .attr('stroke-width', 1)
                        .attr('rx', 8)
                        .attr('opacity', 0.9);
                    
                    scoreGroup.append('text')
                        .attr('x', midX)
                        .attr('y', midY + 4)
                        .attr('text-anchor', 'middle')
                        .attr('font-size', '10px')
                        .attr('font-weight', 'bold')
                        .attr('fill', strokeColor)
                        .text(similarity.toFixed(2));
                });
                
                // Show detailed results summary
                const bestMatch = topK[0];
                const semanticMatches = topK.filter(item => item.semanticMatch).length;
                
                let message = \`🔍 Анализ запроса "\${currentQuery.text}":\\n\`;
                
                // Analyze query category
                if (bestMatch.queryCategory) {
                    const categoryNames = { ai: 'ИИ/ML', food: 'Кулинария', sports: 'Спорт' };
                    message += \`📂 Категория запроса: \${categoryNames[bestMatch.queryCategory]}\\n\`;
                }
                
                // Show top matches with detailed explanation
                topK.forEach((item, i) => {
                    const categoryNames = { ai: 'ИИ/ML', food: 'Кулинария', sports: 'Спорт' };
                    const matchReason = item.semanticMatch ? 
                        \`семантическое сходство (\${categoryNames[item.docCategory]})\` : 
                        'низкое сходство (разные категории)';
                    
                    message += \`\\n\${i + 1}. "\${item.doc.text}" - \${(item.similarity * 100).toFixed(0)}% (\${matchReason})\`;
                });
                
                if (semanticMatches === 0) {
                    message += '\\n\\n⚠️ Семантически похожих документов не найдено!';
                } else {
                    message += \`\\n\\n✅ Найдено \${semanticMatches} семантически связанных документов\`;
                }
                
                // Show alert with detailed explanation
                alert(message);
                
                // Also show a shorter notification
                const shortMessage = semanticMatches > 0 ? 
                    \`Найдено \${semanticMatches} семантически связанных документов\` :
                    'Семантически похожих документов не найдено';
                    
                RAGSeminar.showNotification(shortMessage, semanticMatches > 0 ? 'success' : 'warning', 4000);
                
                // Update progress
                RAGSeminar.updateProgress(65);
            }
            
            function showVisualizationHelp() {
                const helpText = \`
📊 Как работает интерактивная визуализация эмбеддингов:

🔵 Синие точки - документы в векторном пространстве
🔴 Красные точки - пользовательские запросы
🟢 Зеленые линии - наилучшее соответствие
🔵 Синие линии - семантические соответствия
🟡 Желтые линии - соответствия по расстоянию
📊 Числа - показатели сходства (0-1)

💡 Попробуйте:
• Выберите готовый запрос из категорий
• Добавьте запрос рядом с группой документов
• Посмотрите, как алгоритм находит семантически похожие документы
• Обратите внимание на различные типы соответствий

🎯 Алгоритм учитывает:
• Геометрическое расстояние в пространстве
• Семантическую близость по тематикам
• Весовые коэффициенты для разных категорий
                \`;
                
                alert(helpText);
            }
            
            function resetVisualization() {
                if (!visualizationSvg) return;
                
                visualizationSvg.selectAll('.query, .query-label, .connection, .similarity-text').remove();
                queries = [];
                currentQuery = null;
                
                // Reset input and button states
                document.getElementById('custom-query-input').value = '';
                updateFindButton();
                
                // Reset document styling
                visualizationSvg.selectAll('.document')
                    .attr('fill', '#4285f4')
                    .attr('r', 8);
                
                RAGSeminar.showNotification('Визуализация сброшена', 'info');
            }
            
            // Enhanced Yandex code generator with improved formatting and real implementations
            function generateYandexRAGCode() {
                const model = document.getElementById('yandex-model-select').value;
                const apiApproach = document.getElementById('api-approach-select').value;
                const topK = document.getElementById('topk-input').value;
                const chunkSize = document.getElementById('chunk-size-input').value;
                const folderId = document.getElementById('folder-id-input').value || 'your-folder-id';
                
                let code = '';
                
                if (apiApproach === 'openai') {
                    code = generateOpenAICode(model, topK, chunkSize, folderId);
                } else if (apiApproach === 'sdk') {
                    code = generateSDKCode(model, topK, chunkSize, folderId);
                }
                
                // Update both display areas
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                if (codeEditor) {
                    codeEditor.value = code;
                }
                
                // Switch to code tab
                switchYandexTab('yandex-code');
                
                RAGSeminar.showNotification('Код сгенерирован и готов к редактированию!', 'success');
            }

            function generateOpenAICode(model, topK, chunkSize, folderId) {
                return \`"""
RAG система с Yandex Foundation Models через OpenAI Compatible API
Автоматически сгенерированный код для интеграции
"""

import openai
import numpy as np
import os
import requests
from typing import List, Dict
import json

class YandexRAG:
    """
    RAG система с использованием Yandex Foundation Models
    через OpenAI Compatible API
    """
    
    def __init__(self):
        """Инициализация RAG системы"""
        self.api_key = os.getenv("YANDEX_CLOUD_API_KEY")
        self.folder_id = "\${folderId}"
        self.base_url = "https://llm.api.cloud.yandex.net/foundationModels/v1/"
        
        if not self.api_key:
            raise ValueError("Установите переменную окружения YANDEX_CLOUD_API_KEY")
        
        # Настройка OpenAI клиента для Yandex
        self.client = openai.OpenAI(
            api_key=self.api_key,
            base_url=self.base_url
        )
        
        self.embedding_model = f"emb://\${folderId}/text-search-doc/latest"
        self.generation_model = f"gpt://\${folderId}/\${model}/latest"
        self.documents = []
        
        print(f"✅ YandexRAG инициализирован с моделью: \${model}")
    
    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Получение эмбеддингов через Yandex API
        
        Args:
            texts: Список текстов для векторизации
            
        Returns:
            Список векторов эмбеддингов
        """
        embeddings = []
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json"
        }
        
        for text in texts:
            payload = {
                "modelUri": self.embedding_model,
                "text": text
            }
            
            try:
                response = requests.post(
                    f"{self.base_url}textEmbedding",
                    headers=headers,
                    json=payload,
                    timeout=30
                )
                response.raise_for_status()
                
                embedding = response.json()["embedding"]
                embeddings.append(embedding)
                
            except requests.exceptions.RequestException as e:
                print(f"❌ Ошибка получения эмбеддинга: {e}")
                # Возвращаем случайный вектор как fallback
                embeddings.append(np.random.rand(256).tolist())
        
        return embeddings
    
    def split_documents(self, docs: List[str], chunk_size: int = \${chunkSize}) -> List[str]:
        """
        Разбиение документов на чанки
        
        Args:
            docs: Список документов
            chunk_size: Размер чанка в словах
            
        Returns:
            Список чанков
        """
        chunks = []
        for doc in docs:
            words = doc.split()
            for i in range(0, len(words), chunk_size):
                chunk = " ".join(words[i:i + chunk_size])
                if chunk.strip():  # Избегаем пустых чанков
                    chunks.append(chunk)
        
        print(f"📄 Создано {len(chunks)} чанков из {len(docs)} документов")
        return chunks
    
    def add_documents(self, docs: List[str]) -> None:
        """
        Добавление документов в векторную базу
        
        Args:
            docs: Список текстов документов
        """
        print(f"🔄 Обработка {len(docs)} документов...")
        
        # Разбиение на чанки
        chunks = self.split_documents(docs)
        
        # Получение эмбеддингов
        embeddings = self.get_embeddings(chunks)
        
        # Сохранение в векторную БД
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            self.documents.append({
                "id": i,
                "text": chunk,
                "embedding": np.array(embedding)
            })
        
        print(f"✅ Добавлено {len(chunks)} чанков в векторную базу")
    
    def search(self, query: str, top_k: int = \${topK}) -> List[Dict]:
        """
        Семантический поиск по запросу
        
        Args:
            query: Поисковый запрос
            top_k: Количество результатов
            
        Returns:
            Список наиболее релевантных документов
        """
        if not self.documents:
            print("⚠️ Векторная база пустая!")
            return []
        
        print(f"🔍 Поиск по запросу: '{query}'")
        
        # Получение эмбеддинга запроса
        query_embeddings = self.get_embeddings([query])
        query_vector = np.array(query_embeddings[0])
        
        # Вычисление сходства
        similarities = []
        for doc in self.documents:
            similarity = np.dot(query_vector, doc["embedding"]) / (
                np.linalg.norm(query_vector) * np.linalg.norm(doc["embedding"])
            )
            similarities.append({
                "document": doc,
                "similarity": float(similarity)
            })
        
        # Сортировка по убыванию сходства
        similarities.sort(key=lambda x: x["similarity"], reverse=True)
        
        results = similarities[:top_k]
        print(f"📊 Найдено {len(results)} релевантных документов")
        
        return results
    
    def generate_answer(self, query: str, context_docs: List[Dict]) -> str:
        """
        Генерация ответа на основе найденного контекста
        
        Args:
            query: Вопрос пользователя
            context_docs: Найденные документы
            
        Returns:
            Сгенерированный ответ
        """
        # Формирование контекста
        context_texts = []
        for i, doc_info in enumerate(context_docs, 1):
            doc = doc_info["document"]
            similarity = doc_info["similarity"]
            context_texts.append(f"Документ {i} (релевантность: {similarity:.3f}):\\n{doc['text']}")
        
        context = "\\n\\n".join(context_texts)
        
        # Создание промпта
        messages = [
            {
                "role": "system",
                "content": "Ты - помощник по поиску информации. Отвечай на вопросы пользователя, используя только предоставленный контекст. Если в контексте нет ответа, честно скажи об этом."
            },
            {
                "role": "user",
                "content": f"""Контекст:
{context}

Вопрос: {query}

Ответь на вопрос, основываясь только на предоставленном контексте:"""
            }
        ]
        
        try:
            print("🤖 Генерация ответа...")
            response = self.client.chat.completions.create(
                model=self.generation_model,
                messages=messages,
                max_tokens=1500,
                temperature=0.2
            )
            
            answer = response.choices[0].message.content
            return answer
            
        except Exception as e:
            error_msg = f"❌ Ошибка генерации ответа: {e}"
            print(error_msg)
            return error_msg
    
    def ask(self, query: str) -> Dict:
        """
        Полный RAG запрос: поиск + генерация
        
        Args:
            query: Вопрос пользователя
            
        Returns:
            Результат с ответом и метаданными
        """
        # Поиск релевантных документов
        search_results = self.search(query)
        
        if not search_results:
            return {
                "answer": "Извините, не удалось найти релевантные документы.",
                "sources": [],
                "query": query
            }
        
        # Генерация ответа
        answer = self.generate_answer(query, search_results)
        
        # Формирование источников
        sources = []
        for result in search_results:
            doc = result["document"]
            sources.append({
                "text": doc["text"][:200] + "..." if len(doc["text"]) > 200 else doc["text"],
                "similarity": result["similarity"],
                "id": doc["id"]
            })
        
        return {
            "answer": answer,
            "sources": sources,
            "query": query,
            "model": "\${model}"
        }

# Пример использования
def demo_yandex_rag():
    """Демонстрация работы YandexRAG"""
    
    # Инициализация
    rag = YandexRAG()
    
    # Тестовые документы
    documents = [
        "Yandex Foundation Models - это семейство больших языковых моделей от Яндекса для различных задач обработки естественного языка.",
        "YandexGPT Pro поддерживает контекст до 32000 токенов и обеспечивает высокое качество генерации на русском и английском языках.",
        "RAG (Retrieval-Augmented Generation) позволяет языковым моделям использовать внешние источники знаний для генерации более точных ответов.",
        "Векторные эмбеддинги преобразуют текст в числовые векторы, что позволяет выполнять семантический поиск по документам.",
        "Семантический поиск находит документы не по ключевым словам, а по смыслу и контексту запроса."
    ]
    
    # Добавление документов
    rag.add_documents(documents)
    
    # Тестовые запросы
    queries = [
        "Что такое YandexGPT Pro?",
        "Как работает RAG?",
        "Что такое семантический поиск?"
    ]
    
    print("\\n" + "="*80)
    print("🎯 ДЕМОНСТРАЦИЯ YANDEX RAG СИСТЕМЫ")
    print("="*80)
    
    for query in queries:
        print(f"\\n❓ Запрос: {query}")
        print("-" * 60)
        
        result = rag.ask(query)
        
        print(f"🤖 Ответ: {result['answer']}")
        print(f"\\n📚 Источники ({len(result['sources'])}):")
        
        for i, source in enumerate(result['sources'], 1):
            print(f"   {i}. Сходство: {source['similarity']:.3f}")
            print(f"      {source['text']}")
        
        print("\\n" + "-" * 60)

if __name__ == "__main__":
    # Запуск демонстрации
    demo_yandex_rag()
\`;
            }

            function generateSDKCode(model, topK, chunkSize, folderId) {
                return \`"""
RAG система с Yandex Foundation Models через официальный SDK
Автоматически сгенерированный код для интеграции
"""

import os
import numpy as np
from typing import List, Dict
from yandexcloud import SDK
from yandex.cloud.ai.foundation_models.v1 import embedding_service_pb2_grpc
from yandex.cloud.ai.foundation_models.v1 import embedding_service_pb2
from yandex.cloud.ai.foundation_models.v1 import text_generation_service_pb2_grpc
from yandex.cloud.ai.foundation_models.v1 import text_generation_service_pb2

class YandexRAGSDK:
    """
    RAG система с использованием Yandex Foundation Models SDK
    """
    
    def __init__(self):
        """Инициализация RAG системы через SDK"""
        
        # Получение токена авторизации
        iam_token = os.getenv("YANDEX_CLOUD_IAM_TOKEN")
        api_key = os.getenv("YANDEX_CLOUD_API_KEY")
        
        if not (iam_token or api_key):
            raise ValueError("Установите YANDEX_CLOUD_IAM_TOKEN или YANDEX_CLOUD_API_KEY")
        
        # Инициализация SDK
        if iam_token:
            self.sdk = SDK(token=iam_token)
        else:
            # Для API ключа нужен сервисный аккаунт
            self.sdk = SDK(service_account_key=api_key)
        
        self.folder_id = "\${folderId}"
        self.embedding_model = f"emb://\${folderId}/text-search-doc/latest"
        self.generation_model = f"gpt://\${folderId}/\${model}/latest"
        self.documents = []
        
        print(f"✅ YandexRAG SDK инициализирован с моделью: \${model}")
    
    def get_embeddings(self, texts: List[str]) -> List[List[float]]:
        """
        Получение эмбеддингов через Yandex Foundation Models SDK
        
        Args:
            texts: Список текстов для векторизации
            
        Returns:
            Список векторов эмбеддингов
        """
        service = self.sdk.client(embedding_service_pb2_grpc.EmbeddingsServiceStub)
        embeddings = []
        
        for text in texts:
            try:
                request = embedding_service_pb2.TextEmbeddingRequest(
                    model_uri=self.embedding_model,
                    text=text
                )
                
                response = service.TextEmbedding(request)
                embeddings.append(list(response.embedding))
                
            except Exception as e:
                print(f"❌ Ошибка получения эмбеддинга: {e}")
                # Fallback на случайный вектор
                embeddings.append(np.random.rand(256).tolist())
        
        return embeddings
    
    def split_documents(self, docs: List[str], chunk_size: int = \${chunkSize}) -> List[str]:
        """
        Разбиение документов на чанки
        
        Args:
            docs: Список документов
            chunk_size: Размер чанка в словах
            
        Returns:
            Список чанков
        """
        chunks = []
        for doc in docs:
            words = doc.split()
            for i in range(0, len(words), chunk_size):
                chunk = " ".join(words[i:i + chunk_size])
                if chunk.strip():
                    chunks.append(chunk)
        
        print(f"📄 Создано {len(chunks)} чанков из {len(docs)} документов")
        return chunks
    
    def add_documents(self, docs: List[str]) -> None:
        """
        Добавление документов в векторную базу
        
        Args:
            docs: Список текстов документов
        """
        print(f"🔄 Обработка {len(docs)} документов...")
        
        # Разбиение на чанки
        chunks = self.split_documents(docs)
        
        # Получение эмбеддингов
        embeddings = self.get_embeddings(chunks)
        
        # Сохранение в векторную БД
        for i, (chunk, embedding) in enumerate(zip(chunks, embeddings)):
            self.documents.append({
                "id": i,
                "text": chunk,
                "embedding": np.array(embedding)
            })
        
        print(f"✅ Добавлено {len(chunks)} чанков в векторную базу")
    
    def search(self, query: str, top_k: int = \${topK}) -> List[Dict]:
        """
        Семантический поиск по запросу
        
        Args:
            query: Поисковый запрос
            top_k: Количество результатов
            
        Returns:
            Список наиболее релевантных документов
        """
        if not self.documents:
            print("⚠️ Векторная база пустая!")
            return []
        
        print(f"🔍 Поиск по запросу: '{query}'")
        
        # Получение эмбеддинга запроса
        query_embeddings = self.get_embeddings([query])
        query_vector = np.array(query_embeddings[0])
        
        # Вычисление сходства
        similarities = []
        for doc in self.documents:
            similarity = np.dot(query_vector, doc["embedding"]) / (
                np.linalg.norm(query_vector) * np.linalg.norm(doc["embedding"])
            )
            similarities.append({
                "document": doc,
                "similarity": float(similarity)
            })
        
        # Сортировка по убыванию сходства
        similarities.sort(key=lambda x: x["similarity"], reverse=True)
        
        results = similarities[:top_k]
        print(f"📊 Найдено {len(results)} релевантных документов")
        
        return results
    
    def generate_answer(self, query: str, context_docs: List[Dict]) -> str:
        """
        Генерация ответа через YandexGPT SDK
        
        Args:
            query: Вопрос пользователя
            context_docs: Найденные документы
            
        Returns:
            Сгенерированный ответ
        """
        # Формирование контекста
        context_texts = []
        for i, doc_info in enumerate(context_docs, 1):
            doc = doc_info["document"]
            similarity = doc_info["similarity"]
            context_texts.append(f"Документ {i} (релевантность: {similarity:.3f}):\\n{doc['text']}")
        
        context = "\\n\\n".join(context_texts)
        
        # Создание промпта
        prompt = f"""Используя следующий контекст, ответь на вопрос пользователя:

КОНТЕКСТ:
{context}

ВОПРОС: {query}

ОТВЕТ:"""
        
        try:
            print("🤖 Генерация ответа через SDK...")
            
            service = self.sdk.client(text_generation_service_pb2_grpc.TextGenerationServiceStub)
            
            request = text_generation_service_pb2.CompletionRequest(
                model_uri=self.generation_model,
                completion_options=text_generation_service_pb2.CompletionOptions(
                    stream=False,
                    temperature=0.2,
                    max_tokens=1500
                ),
                messages=[
                    text_generation_service_pb2.Message(
                        role="user",
                        text=prompt
                    )
                ]
            )
            
            response = service.Completion(request)
            answer = response.result.alternatives[0].message.text
            
            return answer
            
        except Exception as e:
            error_msg = f"❌ Ошибка генерации через SDK: {e}"
            print(error_msg)
            return error_msg
    
    def ask(self, query: str) -> Dict:
        """
        Полный RAG запрос через SDK
        
        Args:
            query: Вопрос пользователя
            
        Returns:
            Результат с ответом и метаданными
        """
        # Поиск релевантных документов
        search_results = self.search(query)
        
        if not search_results:
            return {
                "answer": "Извините, не удалось найти релевантные документы.",
                "sources": [],
                "query": query
            }
        
        # Генерация ответа
        answer = self.generate_answer(query, search_results)
        
        # Формирование источников
        sources = []
        for result in search_results:
            doc = result["document"]
            sources.append({
                "text": doc["text"][:200] + "..." if len(doc["text"]) > 200 else doc["text"],
                "similarity": result["similarity"],
                "id": doc["id"]
            })
        
        return {
            "answer": answer,
            "sources": sources,
            "query": query,
            "model": "\${model}",
            "api": "Yandex Cloud SDK"
        }

# Пример использования
def demo_yandex_rag_sdk():
    """Демонстрация работы YandexRAG через SDK"""
    
    # Инициализация
    rag = YandexRAGSDK()
    
    # Тестовые документы
    documents = [
        "Yandex Foundation Models обеспечивает высокое качество понимания и генерации текста на русском языке.",
        "SDK позволяет использовать все возможности Yandex Cloud AI платформы с максимальной производительностью.",
        "Векторные эмбеддинги размерностью 256 оптимизированы для семантического поиска по русским текстам.",
        "Интеграция через SDK обеспечивает лучшую производительность и стабильность по сравнению с REST API."
    ]
    
    # Добавление документов
    rag.add_documents(documents)
    
    # Тестовые запросы
    queries = [
        "Какие преимущества у SDK?",
        "Какой размер эмбеддингов?",
        "Для каких языков оптимизированы модели?"
    ]
    
    print("\\n" + "="*80)
    print("🎯 ДЕМОНСТРАЦИЯ YANDEX RAG SDK")
    print("="*80)
    
    for query in queries:
        print(f"\\n❓ Запрос: {query}")
        print("-" * 60)
        
        result = rag.ask(query)
        
        print(f"🤖 Ответ: {result['answer']}")
        print(f"\\n📚 Источники ({len(result['sources'])}):")
        
        for i, source in enumerate(result['sources'], 1):
            print(f"   {i}. Сходство: {source['similarity']:.3f}")
            print(f"      {source['text']}")

if __name__ == "__main__":
    # Запуск демонстрации
    demo_yandex_rag_sdk()
\`;
            }

            // New functions for enhanced configurator
            function switchYandexTab(tabName) {
                // Remove active from all tabs and contents
                document.querySelectorAll('#yandex-config-tabs .tab').forEach(t => t.classList.remove('active'));
                document.querySelectorAll('#yandex-config, #yandex-code, #yandex-sandbox').forEach(content => content.classList.remove('active'));
                
                // Add active to selected tab and content
                document.querySelector(\`[data-tab="\${tabName}"]\`).classList.add('active');
                document.getElementById(tabName).classList.add('active');
            }

            function copyGeneratedCode() {
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                if (codeEditor && codeEditor.value) {
                    RAGSeminar.copyToClipboard(codeEditor.value);
                } else {
                    RAGSeminar.showNotification('Сначала сгенерируйте код!', 'warning');
                }
            }

            function downloadGeneratedCode() {
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                if (codeEditor && codeEditor.value) {
                    const model = document.getElementById('yandex-model-select').value;
                    const apiType = document.getElementById('api-approach-select').value;
                    const filename = \`yandex_rag_\${apiType}_\${model.replace('-', '_')}.py\`;
                    RAGSeminar.downloadCode(codeEditor.value, filename);
                } else {
                    RAGSeminar.showNotification('Сначала сгенерируйте код!', 'warning');
                }
            }

            function sendCodeToSandbox() {
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                const sandboxEditor = document.getElementById('yandex-sandbox-code');
                
                if (codeEditor && codeEditor.value && sandboxEditor) {
                    sandboxEditor.value = codeEditor.value;
                    switchYandexTab('yandex-sandbox');
                    RAGSeminar.showNotification('Код отправлен в песочницу!', 'success');
                } else {
                    RAGSeminar.showNotification('Сначала сгенерируйте код!', 'warning');
                }
            }

            function loadCodeFromEditor() {
                const codeEditor = document.getElementById('yandex-generated-code-editor');
                const sandboxEditor = document.getElementById('yandex-sandbox-code');
                
                if (codeEditor && codeEditor.value && sandboxEditor) {
                    sandboxEditor.value = codeEditor.value;
                    RAGSeminar.showNotification('Код загружен из редактора!', 'info');
                } else {
                    RAGSeminar.showNotification('Код в редакторе отсутствует!', 'warning');
                }
            }

            async function runYandexSandboxCode() {
                const sandboxCode = document.getElementById('yandex-sandbox-code').value;
                const outputElement = document.getElementById('yandex-sandbox-output');
                
                if (!sandboxCode.trim()) {
                    RAGSeminar.showNotification('Добавьте код для выполнения!', 'warning');
                    return;
                }

                await RAGSeminar.runPythonCode(sandboxCode, 'yandex-sandbox-output');
                RAGSeminar.updateProgress(95);
            }

            function clearSandboxOutput() {
                const outputElement = document.getElementById('yandex-sandbox-output');
                if (outputElement) {
                    outputElement.innerHTML = 'Выполните код для просмотра результатов...';
                }
                RAGSeminar.showNotification('Вывод песочницы очищен', 'info');
            }

            // Initialize Yandex configurator tabs
            function initYandexConfigTabs() {
                document.querySelectorAll('#yandex-config-tabs .tab').forEach(tab => {
                    tab.addEventListener('click', () => {
                        const targetTab = tab.getAttribute('data-tab');
                        switchYandexTab(targetTab);
                    });
                });
            }
            
            // Get full seminar notes
            function getFullSeminarNotes() {
                return \`RAG (Retrieval-Augmented Generation) - Конспект семинара

=== ОСНОВНЫЕ КОНЦЕПЦИИ ===
- RAG объединяет поиск информации с генерацией текста
- Решает проблему галлюцинаций LLM
- Состоит из Retriever + Generator компонентов

=== АРХИТЕКТУРА ===
1. Индексация: документы → чанки → эмбеддинги → векторная БД
2. Поиск и генерация: запрос → поиск → контекст → LLM → ответ

=== АЛГОРИТМЫ ПОИСКА ===
- HNSW: лучшая производительность на CPU
- FAISS: сжатие векторов, GPU поддержка  
- Annoy: простота реализации

=== МЕТРИКИ ===
- Recall@k: доля найденных релевантных документов
- Precision@k: точность среди топ-k
- Faithfulness: отсутствие галлюцинаций

=== YANDEX FOUNDATION MODELS ===
- YandexGPT Pro: 32K контекст, высокое качество
- YandexGPT: 8K контекст, сбалансированность
- YandexGPT Lite: 4K контекст, высокая скорость

=== ПРАКТИЧЕСКИЕ СОВЕТЫ ===
- Выбирайте размер чанков в зависимости от задачи
- Настраивайте top-k для оптимального контекста
- Используйте метрики для оценки качества
- Экспериментируйте с разными моделями эмбеддингов\`;
            }
            
            // Initialize everything when DOM is loaded
            document.addEventListener('DOMContentLoaded', function() {
                console.log('🎯 Инициализация интерактивных элементов...');
                
                // Initialize tabs
                RAGSeminar.initTabs('theory-tabs');
                
                // Initialize quiz
                RAGSeminar.initQuiz('rag-quiz');
                
                // Initialize visualization
                setTimeout(initializeVisualization, 500);
                
                console.log('✅ Все интерактивные элементы инициализированы');
            });
        </script>
    </body>
    </html>
  `)
})

// Enhanced Vector Databases Guide routes
// Both routes serve the same detailed content
app.get('/vector_databases_enhanced_guide', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- SEO Meta Tags -->
    <title>📚 Полное руководство по векторным базам данных | FAISS, HNSW, Annoy - Студентам 2024-2025</title>
    <meta name="description" content="Исчерпывающее руководство по векторным БД: FAISS, HNSW, Annoy. Хронология 2013-2025, проверенные факты, бенчмарки SIFT1M, параметры настройки. Для студентов и разработчиов.">
    <meta name="keywords" content="векторные базы данных, FAISS, HNSW, Annoy, ANN поиск, эмбеддинги, машинное обучение, Meta, Spotify, NVIDIA cuVS">
    
    <!-- External Libraries -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    
    <style>
        .gradient-bg {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        .section-padding {
            padding: 4rem 1rem;
        }
        .card-shadow {
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
        }
        .code-block {
            background: #1a202c;
            color: #e2e8f0;
            border-radius: 8px;
            padding: 16px;
            font-family: 'Courier New', monospace;
            font-size: 14px;
            line-height: 1.4;
            overflow-x: auto;
        }
        .timeline-item {
            position: relative;
            padding-left: 2rem;
            margin-bottom: 2rem;
        }
        .timeline-item::before {
            content: '';
            position: absolute;
            left: 0;
            top: 0.5rem;
            width: 1rem;
            height: 1rem;
            background: #4f46e5;
            border-radius: 50%;
        }
        .benchmark-table {
            overflow-x: auto;
        }
        .fact-box {
            border-left: 4px solid #10b981;
            background: #f0fdf4;
            padding: 1rem;
            margin: 1rem 0;
        }
        .warning-box {
            border-left: 4px solid #f59e0b;
            background: #fffbeb;
            padding: 1rem;
            margin: 1rem 0;
        }
        .error-box {
            border-left: 4px solid #ef4444;
            background: #fef2f2;
            padding: 1rem;
            margin: 1rem 0;
        }
        .nav-sticky {
            position: sticky;
            top: 20px;
        }
    </style>
</head>
<body class="bg-gray-50">
    <!-- Header -->
    <header class="gradient-bg text-white">
        <div class="container mx-auto px-4 py-8">
            <div class="flex items-center justify-between">
                <div class="flex items-center">
                    <i class="fas fa-database text-4xl mr-4"></i>
                    <div>
                        <h1 class="text-4xl font-bold">Векторные базы данных</h1>
                        <p class="text-xl opacity-90">Полное руководство для студентов | 2024-2025</p>
                    </div>
                </div>
                <div class="hidden md:flex space-x-4">
                    <a href="/" class="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
                        <i class="fas fa-home mr-2"></i>Главная
                    </a>
                    <a href="/vector_databases_guide.html" class="bg-white bg-opacity-20 px-4 py-2 rounded-lg hover:bg-opacity-30 transition-colors">
                        <i class="fas fa-book mr-2"></i>Основное руководство
                    </a>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Content -->
    <div class="container mx-auto px-4 py-8">
        <div class="grid lg:grid-cols-4 gap-8">
            <!-- Navigation Sidebar -->
            <div class="lg:col-span-1">
                <nav class="nav-sticky bg-white rounded-xl p-6 card-shadow">
                    <h3 class="font-bold text-lg mb-4">📋 Содержание</h3>
                    <ul class="space-y-2 text-sm">
                        <li><a href="#timeline" class="text-blue-600 hover:text-blue-800 block py-1">🕐 Хронология развития</a></li>
                        <li><a href="#what-is" class="text-blue-600 hover:text-blue-800 block py-1">🔍 Что такое векторный поиск</a></li>
                        <li><a href="#approaches" class="text-blue-600 hover:text-blue-800 block py-1">⚙️ Три подхода</a></li>
                        <li><a href="#faiss" class="text-blue-600 hover:text-blue-800 block py-1 pl-4">🔧 FAISS</a></li>
                        <li><a href="#hnsw" class="text-blue-600 hover:text-blue-800 block py-1 pl-4">🕸️ HNSW</a></li>
                        <li><a href="#annoy" class="text-blue-600 hover:text-blue-800 block py-1 pl-4">🌳 Annoy</a></li>
                        <li><a href="#comparison" class="text-blue-600 hover:text-blue-800 block py-1">📊 Сравнение</a></li>
                        <li><a href="#code-examples" class="text-blue-600 hover:text-blue-800 block py-1">💻 Примеры кода</a></li>
                        <li><a href="#sources" class="text-blue-600 hover:text-blue-800 block py-1">📚 Источники</a></li>
                        <li><a href="#practical-tips" class="text-blue-600 hover:text-blue-800 block py-1">🎯 Практические советы</a></li>
                    </ul>
                </nav>
            </div>

            <!-- Content -->
            <div class="lg:col-span-3 space-y-8">
                
                <!-- Timeline -->
                <section id="timeline" class="bg-white rounded-xl p-8 card-shadow">
                    <h2 class="text-3xl font-bold mb-6">
                        <i class="fas fa-history mr-3 text-blue-600"></i>
                        🕐 Хронология развития технологий
                    </h2>
                    
                    <div class="space-y-4">
                        <div class="timeline-item">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold text-lg">2013</span>
                                    <span class="text-blue-600 font-medium">Spotify</span>
                                </div>
                                <p>Spotify выпускает <strong>Annoy</strong> (первая популярная ANN библиотека)</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold text-lg">2016</span>
                                    <span class="text-green-600 font-medium">Академия</span>
                                </div>
                                <p>Публикация алгоритма <strong>HNSW</strong> (Malkov & Yashunin, arXiv:1603.09320)</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold text-lg">2017</span>
                                    <span class="text-purple-600 font-medium">Meta FAIR</span>
                                </div>
                                <p>Meta FAIR выпускает <strong>FAISS</strong> с GPU поддержкой</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold text-lg">2018</span>
                                    <span class="text-blue-600 font-medium">Spotify</span>
                                </div>
                                <p>Spotify начинает эксперименты с <strong>hnswlib</strong></p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold text-lg">2023</span>
                                    <span class="text-blue-600 font-medium">Spotify</span>
                                </div>
                                <p>Spotify анонсирует <strong>Voyager</strong> (замена Annoy на HNSW)</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="bg-gray-50 p-4 rounded-lg">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold text-lg">2024</span>
                                    <span class="text-green-600 font-medium">NVIDIA + Meta</span>
                                </div>
                                <p><strong>FAISS 1.10</strong> интегрирует NVIDIA cuVS для ускорения</p>
                            </div>
                        </div>
                        
                        <div class="timeline-item">
                            <div class="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                                <div class="flex justify-between items-center mb-2">
                                    <span class="font-bold text-lg text-blue-700">2025</span>
                                    <span class="text-blue-600 font-medium">Meta Engineering</span>
                                </div>
                                <p><strong>Meta публикует данные о ×8.1 ускорении с cuVS</strong></p>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- What is Vector Search -->
                <section id="what-is" class="bg-white rounded-xl p-8 card-shadow">
                    <h2 class="text-3xl font-bold mb-6">
                        <i class="fas fa-search mr-3 text-green-600"></i>
                        🔍 Что такое векторный поиск
                    </h2>
                    
                    <div class="prose max-w-none">
                        <p class="text-lg leading-relaxed mb-6">
                            Представьте, что у вас есть библиотека с миллионом книг, но каталог построен не по алфавиту, 
                            а по "смыслу" - похожие по содержанию книги стоят рядом. Векторный поиск работает похожим образом.
                        </p>

                        <h3 class="text-2xl font-semibold mb-4">🚀 Современные применения (2024-2025):</h3>
                        <div class="grid md:grid-cols-2 gap-4 mb-6">
                            <div class="bg-blue-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-blue-700">ChatGPT и Claude</h4>
                                <p>поиск релевантной информации в базе знаний</p>
                            </div>
                            <div class="bg-green-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-green-700">Spotify/Apple Music</h4>
                                <p>рекомендации похожих треков</p>
                            </div>
                            <div class="bg-purple-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-purple-700">Google/Яндекс</h4>
                                <p>поиск похожих изображений</p>
                            </div>
                            <div class="bg-orange-50 p-4 rounded-lg">
                                <h4 class="font-semibold text-orange-700">E-commerce</h4>
                                <p>"товары, похожие на этот"</p>
                            </div>
                        </div>

                        <div class="fact-box">
                            <strong>📊 Проверенный факт:</strong> По данным исследований 2024 года, рынок векторных баз данных 
                            вырос на 300%+ за последние 2 года благодаря буму LLM-приложений.
                        </div>
                    </div>
                </section>

                <!-- Three Approaches -->
                <section id="approaches" class="bg-white rounded-xl p-8 card-shadow">
                    <h2 class="text-3xl font-bold mb-6">
                        <i class="fas fa-cogs mr-3 text-purple-600"></i>
                        ⚙️ Три подхода к решению задачи
                    </h2>
                    
                    <!-- FAISS -->
                    <div id="faiss" class="mb-10">
                        <h3 class="text-2xl font-bold mb-4">🔧 FAISS: "Швейцарский нож" (Meta, 2017-2025)</h3>
                        
                        <p class="text-lg mb-4">
                            <strong>Суть простыми словами:</strong> Как большой ящик с инструментами - есть молоток для одних задач, 
                            отвертка для других. FAISS предлагает разные "инструменты" для разных случаев.
                        </p>

                        <div class="fact-box">
                            <strong>📈 Проверенный факт (май 2025):</strong> FAISS + NVIDIA cuVS показал ускорение до ×8.1 
                            по latency для IVFPQ на датасете 5M×1536 при тестировании на NVIDIA H100 vs Intel Xeon Platinum 8480CL<br>
                            <em>Источник: <a href="https://engineering.fb.com/2025/05/08/data-infrastructure/accelerating-gpu-indexes-in-faiss-with-nvidia-cuvs/" class="text-blue-600">Meta Engineering Blog</a></em>
                        </div>

                        <h4 class="text-xl font-semibold mb-3">📊 Рекомендуемые параметры:</h4>
                        <div class="code-block mb-4">
• IVF: 
  nlist = 100-100,000 (количество кластеров)

• IVFPQ: 
  m = 8-64 субвекторов
  code_size = 4-8 бит

• HNSW: 
  M = 16-64
  efConstruction = 100-500

• GPU: 
  батчи 100+ запросов для оптимальной производительности
                        </div>
                    </div>

                    <!-- HNSW -->
                    <div id="hnsw" class="mb-10">
                        <h3 class="text-2xl font-bold mb-4">🕸️ HNSW: "Умная навигация по графу" (2016)</h3>
                        
                        <p class="text-lg mb-4">
                            <strong>Суть простыми словами:</strong> Как GPS-навигатор с разными "слоями" дорог - сначала едем по 
                            автостраде (верхние слои), потом по городским улицам (нижние слои).
                        </p>

                        <div class="fact-box">
                            <strong>🎯 Проверенный факт:</strong> Алгоритм достигает логарифмической сложности O(log n) для поиска 
                            и построения, что подтверждено оригинальной статьей и множественными практическими тестами.<br>
                            <em>Источник: <a href="https://arxiv.org/pdf/1603.09320" class="text-blue-600">Malkov & Yashunin, 2016</a></em>
                        </div>

                        <h4 class="text-xl font-semibold mb-3">📈 Конкретные бенчмарки SIFT1M</h4>
                        <p class="text-sm text-gray-600 mb-2">(Intel Xeon E5-2680 v2, 20 потоков, 2018):</p>
                        <div class="code-block mb-4">
• HNSW Flat (efSearch=32): 0.020 мс/запрос, R@1=94.9%
• HNSW + SQ (efSearch=32):  0.008 мс/запрос, R@1=85.1%  
• IVF Flat (nprobe=64):     0.141 мс/запрос, R@1=94.7%
                        </div>
                        <p class="text-sm text-gray-600 mb-4">
                            <em>Источник: <a href="https://github.com/facebookresearch/faiss/wiki/Indexing-1M-vectors" class="text-blue-600">FAISS Wiki - Indexing 1M vectors</a></em>
                        </p>

                        <h4 class="text-xl font-semibold mb-3">📊 Настройка параметров:</h4>
                        <div class="code-block mb-4">
• M = 16-32: 
  для экономии памяти

• M = 32-64: 
  для высокой точности  

• efConstruction = 100-200: 
  баланс время/качество

• efSearch = 50-500: 
  настройка в runtime под SLA
                        </div>
                    </div>

                    <!-- Annoy -->
                    <div id="annoy" class="mb-10">
                        <h3 class="text-2xl font-bold mb-4">🌳 Annoy: "Быстрые деревья решений" (Spotify, 2013-2023)</h3>
                        
                        <p class="text-lg mb-4">
                            <strong>Суть простыми словами:</strong> Как игра "20 вопросов" - строим много деревьев с вопросами 
                            "левее/правее этой линии?" и находим ответ за несколько шагов.
                        </p>

                        <div class="warning-box">
                            <strong>📅 Историческая справка:</strong> В октябре 2023 Spotify анонсировал переход с Annoy на Voyager 
                            (на основе HNSW), заявив о ×10 ускорении скорости при той же точности.<br>
                            <em>Источник: <a href="https://engineering.atspotify.com/introducing-voyager-spotifys-new-nearest-neighbor-search-library" class="text-blue-600">Spotify Engineering Blog</a></em>
                        </div>

                        <h4 class="text-xl font-semibold mb-3">📊 Параметры настройки:</h4>
                        <div class="code-block mb-4">
• n_trees = 10-50: 
  для быстрого поиска

• n_trees = 50-100: 
  для высокой точности

• search_k = n_trees × 100-1000: 
  компромисс скорость/качество

• Ограничения: 
  int32 IDs, max(id)+1 аллокация памяти
                        </div>
                    </div>
                </section>

                <!-- Comparison -->
                <section id="comparison" class="bg-white rounded-xl p-8 card-shadow">
                    <h2 class="text-3xl font-bold mb-6">
                        <i class="fas fa-balance-scale mr-3 text-orange-600"></i>
                        📊 Практическое сравнение (обновлено 2024-2025)
                    </h2>
                    
                    <h3 class="text-2xl font-semibold mb-4">Когда использовать что:</h3>
                    <div class="benchmark-table">
                        <table class="w-full border-collapse border border-gray-300 mb-6">
                            <thead>
                                <tr class="bg-gray-50">
                                    <th class="border border-gray-300 p-3 text-left font-semibold">Сценарий</th>
                                    <th class="border border-gray-300 p-3 text-center font-semibold">FAISS</th>
                                    <th class="border border-gray-300 p-3 text-center font-semibold">HNSW</th>
                                    <th class="border border-gray-300 p-3 text-center font-semibold">Annoy</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td class="border border-gray-300 p-3 font-medium">Миллиарды векторов + GPU</td>
                                    <td class="border border-gray-300 p-3 text-center text-green-600">✅ Лучший выбор</td>
                                    <td class="border border-gray-300 p-3 text-center text-red-600">❌ Только CPU</td>
                                    <td class="border border-gray-300 p-3 text-center text-red-600">❌ Устарел</td>
                                </tr>
                                <tr class="bg-gray-50">
                                    <td class="border border-gray-300 p-3 font-medium">Высокая точность на CPU</td>
                                    <td class="border border-gray-300 p-3 text-center text-green-600">✅ Хорош</td>
                                    <td class="border border-gray-300 p-3 text-center text-green-600">✅ Идеален</td>
                                    <td class="border border-gray-300 p-3 text-center text-yellow-600">⚠️ Средне</td>
                                </tr>
                                <tr>
                                    <td class="border border-gray-300 p-3 font-medium">Быстрый старт приложения</td>
                                    <td class="border border-gray-300 p-3 text-center text-yellow-600">⚠️ Медленнее</td>
                                    <td class="border border-gray-300 p-3 text-center text-yellow-600">⚠️ Средне</td>
                                    <td class="border border-gray-300 p-3 text-center text-green-600">✅ Отлично</td>
                                </tr>
                                <tr class="bg-gray-50">
                                    <td class="border border-gray-300 p-3 font-medium">Динамические обновления</td>
                                    <td class="border border-gray-300 p-3 text-center text-green-600">✅ Да</td>
                                    <td class="border border-gray-300 p-3 text-center text-green-600">✅ Да</td>
                                    <td class="border border-gray-300 p-3 text-center text-red-600">❌ Только rebuild</td>
                                </tr>
                                <tr>
                                    <td class="border border-gray-300 p-3 font-medium">Память критична</td>
                                    <td class="border border-gray-300 p-3 text-center text-green-600">✅ IVFPQ сжатие</td>
                                    <td class="border border-gray-300 p-3 text-center text-yellow-600">⚠️ Настройка M</td>
                                    <td class="border border-gray-300 p-3 text-center text-green-600">✅ mmap</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div class="warning-box">
                        <strong>⚠️ Практические ограничения (2024):</strong>
                        <div class="code-block mt-2">
• FAISS GPU: 
  k ≤ 2048, nprobe ≤ 2048, нужен батчинг

• HNSW: 
  память ~линейно растет с M, планируйте max_elements  

• Annoy: 
  полная иммутабельность после build()
  int32 ID лимиты
                        </div>
                    </div>
                </section>

                <!-- Code Examples -->
                <section id="code-examples" class="bg-white rounded-xl p-8 card-shadow">
                    <h2 class="text-3xl font-bold mb-6">
                        <i class="fas fa-code mr-3 text-blue-600"></i>
                        💻 Обновленные примеры кода
                    </h2>
                    
                    <h3 class="text-2xl font-semibold mb-4">FAISS с современными возможностями (2024-2025)</h3>
                    <div class="code-block mb-6">
# Актуально для FAISS 1.10+ с cuVS поддержкой
import faiss
import numpy as np

# Параметры на основе проверенных рекомендаций  
d, nb = 128, 1_000_000
data = np.random.randn(nb, d).astype('float32')

# HNSW индекс (параметры из SIFT1M бенчмарков)
M = 32                  # диапазон 16-64
ef_construction = 200   # диапазон 100-500  
ef_search = 128         # настройка runtime 50-500

# Создание и настройка индекса
index = faiss.IndexHNSWFlat(d, M)
index.hnsw.efConstruction = ef_construction
index.add(data)

# Поиск с настройкой точности
index.hnsw.efSearch = ef_search
D, I = index.search(queries, k=10)

# Сохранение (совместимо между версиями)
faiss.write_index(index, "modern_hnsw.index")
                    </div>

                    <h3 class="text-2xl font-semibold mb-4">GPU ускорение (требует NVIDIA GPU + cuVS)</h3>
                    <div class="code-block mb-6">
# Проверьте наличие cuVS: pip install faiss-gpu-cuvs
if faiss.get_num_gpus() > 0:
    
    # GPU IVFPQ для больших датасетов
    quantizer = faiss.IndexFlatL2(d)
    nlist = 4096    # диапазон 100-100000
    m = 32          # диапазон 8-64  
    nbits = 8       # обычно 4-8
    
    # Создание GPU индекса
    gpu_index = faiss.IndexIVFPQ(quantizer, d, nlist, m, nbits)
    gpu_index = faiss.index_cpu_to_all_gpus(gpu_index)
    
    # Тренировка (критично для качества)
    gpu_index.train(data[:100000])    # минимум 1000×nlist
    gpu_index.add(data)
    
    # Настройка поиска
    gpu_index.nprobe = 64    # диапазон 1-2048
                    </div>
                </section>

                <!-- Sources -->
                <section id="sources" class="bg-white rounded-xl p-8 card-shadow">
                    <h2 class="text-3xl font-bold mb-6">
                        <i class="fas fa-book-open mr-3 text-green-600"></i>
                        📚 Проверенные источники для углублённого изучения
                    </h2>
                    
                    <div class="grid md:grid-cols-1 gap-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-3">🔬 Научные статьи (первоисточники):</h3>
                            <ul class="space-y-2 mb-6">
                                <li>
                                    <strong>HNSW:</strong> 
                                    <a href="https://arxiv.org/pdf/1603.09320" class="text-blue-600 hover:text-blue-800">
                                        Malkov & Yashunin (2016)
                                    </a> 
                                    - оригинальная статья с теоретическим обоснованием
                                </li>
                                <li>
                                    <strong>FAISS:</strong> 
                                    <a href="https://arxiv.org/abs/1702.08734" class="text-blue-600 hover:text-blue-800">
                                        Johnson et al. (2019)
                                    </a> 
                                    - архитектура библиотеки
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">🏢 Официальные технические блоги:</h3>
                            <ul class="space-y-2 mb-6">
                                <li>
                                    <a href="https://engineering.fb.com/2025/05/08/data-infrastructure/accelerating-gpu-indexes-in-faiss-with-nvidia-cuvs/" class="text-blue-600 hover:text-blue-800">
                                        Meta Engineering
                                    </a> 
                                    - FAISS + cuVS (май 2025)
                                </li>
                                <li>
                                    <a href="https://engineering.atspotify.com/introducing-voyager-spotifys-new-nearest-neighbor-search-library" class="text-blue-600 hover:text-blue-800">
                                        Spotify Engineering
                                    </a> 
                                    - Voyager анонс (октябрь 2023)
                                </li>
                                <li>
                                    <a href="https://developer.nvidia.com/blog/accelerating-vector-search-nvidia-cuvs-ivf-pq-deep-dive-part-1/" class="text-blue-600 hover:text-blue-800">
                                        NVIDIA Developer
                                    </a> 
                                    - cuVS подробности (2024)
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">🛠 Практические ресурсы (постоянно обновляемые):</h3>
                            <ul class="space-y-2 mb-6">
                                <li>
                                    <a href="https://github.com/facebookresearch/faiss/wiki" class="text-blue-600 hover:text-blue-800">
                                        FAISS GitHub Wiki
                                    </a> 
                                    - официальная документация
                                </li>
                                <li>
                                    <a href="https://ann-benchmarks.com/" class="text-blue-600 hover:text-blue-800">
                                        ANN-Benchmarks
                                    </a> 
                                    - актуальные сравнения (обновляется регулярно)
                                </li>
                                <li>
                                    <a href="https://github.com/nmslib/hnswlib" class="text-blue-600 hover:text-blue-800">
                                        hnswlib README
                                    </a> 
                                    - документация и примеры
                                </li>
                            </ul>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-3">📊 Бенчмарк-ресурсы:</h3>
                            <ul class="space-y-2">
                                <li><strong>ANN-Benchmarks:</strong> интерактивные графики для всех датасетов</li>
                                <li><strong>Последнее обновление:</strong> регулярно, проверяйте на сайте актуальные результаты</li>
                                <li><strong>Включают:</strong> faiss-ivf, hnswlib, annoy, scann, pgvector и другие</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <!-- Practical Tips -->
                <section id="practical-tips" class="bg-white rounded-xl p-8 card-shadow">
                    <h2 class="text-3xl font-bold mb-6">
                        <i class="fas fa-lightbulb mr-3 text-yellow-600"></i>
                        🎯 Практические советы для ваших проектов
                    </h2>
                    
                    <div class="grid md:grid-cols-2 gap-6">
                        <div>
                            <h3 class="text-xl font-semibold mb-4">🚀 Быстрый старт (выбор за 30 секунд):</h3>
                            <div class="code-block mb-4">
1. Учебный проект (&lt;100K векторов): 
   → hnswlib

2. Продакшн на CPU (высокая точность): 
   → hnswlib  

3. Продакшн с GPU (масштаб): 
   → FAISS IVFPQ

4. Легаси система (простота): 
   → можно Annoy, но лучше hnswlib
                            </div>
                        </div>
                        
                        <div>
                            <h3 class="text-xl font-semibold mb-4">⚠️ Типичные ошибки новичков:</h3>
                            <ul class="space-y-2 text-sm">
                                <li><strong>FAISS:</strong> забыть train() для IVF индексов</li>
                                <li><strong>HNSW:</strong> не планировать max_elements заранее</li>
                                <li><strong>Annoy:</strong> ожидать онлайн-обновления после build()</li>
                                <li><strong>Общее:</strong> не нормализовать векторы для cosine similarity</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-8 mt-12">
        <div class="container mx-auto px-4 text-center">
            <p class="text-lg mb-2">📅 <strong>Материал обновлен:</strong> декабрь 2024</p>
            <p class="text-sm text-gray-400">✅ Все факты проверены по первоисточникам</p>
            <div class="mt-4">
                <a href="/" class="text-blue-400 hover:text-blue-300 mr-4">
                    <i class="fas fa-home mr-2"></i>Главная страница
                </a>
                <a href="/vector_databases_guide.html" class="text-blue-400 hover:text-blue-300">
                    <i class="fas fa-book mr-2"></i>Базовое руководство
                </a>
            </div>
        </div>
    </footer>

    <!-- Scroll to Top Button -->
    <button id="scrollToTop" class="fixed bottom-6 right-6 bg-blue-600 text-white p-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors opacity-0 invisible">
        <i class="fas fa-arrow-up"></i>
    </button>

    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Scroll to top button
        const scrollToTopBtn = document.getElementById('scrollToTop');
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                scrollToTopBtn.classList.remove('opacity-0', 'invisible');
            } else {
                scrollToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });
        
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });

        // Highlight current section in navigation
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('nav a[href^="#"]');
        
        window.addEventListener('scroll', () => {
            let currentSection = '';
            
            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section.id;
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('font-bold', 'text-purple-600');
                if (link.getAttribute('href') === \`#\${currentSection}\`) {
                    link.classList.add('font-bold', 'text-purple-600');
                }
            });
        });

        console.log('📚 Улучшенное руководство по векторным БД загружено');
    </script>
</body>
</html>`)
})

// Also handle .html extension for backward compatibility 
app.get('/vector_databases_enhanced_guide.html', (c) => {
  return c.redirect('/vector_databases_enhanced_guide')
})

export default app
