# 🐍 Python RAG Песочница с руководством по векторным БД

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success)](https://github.com/dzhechko/yc-rag-lecture-intro)

Интерактивная песочница для изучения RAG (Retrieval-Augmented Generation) с полным руководством по векторным базам данных. Включает демонстрации, примеры кода и актуальные бенчмарки 2024-2025.

## 🚀 Быстрый старт

### ✨ Онлайн демо:
- 🌐 **Главная страница**: https://rag-sandbox-guide.pages.dev
- 🎓 **Интерактивный семинар Yandex**: Доступен через главную страницу
- 🔧 **RAG Конфигуратор**: Полностью функциональный интерфейс с исправленными JavaScript функциями
- 🐍 **Python Песочница**: Интегрированная Pyodide среда для выполнения кода
- 📚 **Расширенное руководство по векторным БД**: https://rag-sandbox-guide.pages.dev/vector_databases_enhanced_guide ✅ **ИСПРАВЛЕНО**

### Локальный запуск:
```bash
git clone https://github.com/dzhechko/yc-rag-lecture-intro.git
cd yc-rag-lecture-intro
python -m http.server 3000
# Откройте http://localhost:3000/rag_index.html
```

## 📋 Содержание проекта

### 🎯 Интерактивные демонстрации RAG

#### 1. **rag_pure_python.html** ⭐ РЕКОМЕНДУЕТСЯ
- Работает без установки библиотек
- Показывает все 7 шагов RAG pipeline
- Детальная визуализация каждого этапа
- Включает схему RAG pipeline

#### 2. **rag_pyodide_demo.html**
- Использует настоящий TF-IDF из scikit-learn
- Автоматическая загрузка библиотек в браузере
- Более реалистичная векторизация

#### 3. **rag_web_demo.html**
- Анализ проблем форматирования
- Интерактивное редактирование кода

### 📚 Руководства по векторным БД

#### **vector_databases_enhanced_guide.html** 🆕 НОВОЕ!
Подробное руководство для студентов 2024-2025:
- **Хронология развития** технологий (2013-2025)
- **Детальное сравнение** FAISS, HNSW, Annoy с проверенными фактами
- **Современные бенчмарки** и параметры настройки
- **Обновленные примеры кода** для FAISS 1.10+ и cuVS
- **Практические советы** от ведущих компаний (Meta, Spotify, NVIDIA)

#### **vector_databases_guide.html** 
Базовое руководство включает:
- **Хронология развития** (2013-2025)
  - Spotify Annoy (2013)
  - HNSW публикация (2016)
  - Meta FAISS (2017)
  - Spotify Voyager (2023)
  - NVIDIA cuVS интеграция (2024-2025)

- **Детальное сравнение технологий**:
  - FAISS: "Швейцарский нож" векторного поиска
  - HNSW: Умная навигация по графу
  - Annoy: Быстрые деревья решений

- **Актуальные бенчмарки**:
  - FAISS + cuVS: ×8.1 ускорение на GPU
  - HNSW: O(log n) сложность
  - Конкретные метрики SIFT1M

- **Практические примеры кода** с современными параметрами

## 🔍 RAG Pipeline - 7 этапов

```
📍 Шаг 1: Encode - Документы → Векторы
📍 Шаг 2: Index - Сохранение в Vector Database
📍 Шаг 3: Encode Query - Запрос → Вектор
📍 Шаг 4: Similarity Search - Поиск похожих
📍 Шаг 5: Retrieve - Извлечение документов
📍 Шаг 6: Prompt - Формирование промпта
📍 Шаг 7: Response - Генерация ответа
```

## 📊 Решенные проблемы

### ✅ Проблема 1: JavaScript функции отсутствуют (ИСПРАВЛЕНО 16.09.2025)
- **Ошибка**: `ReferenceError: injectCredentialsIntoCode is not defined`
- **Ошибка**: `ReferenceError: validateCredentials is not defined` 
- **Решение**: Добавлены функции в `public/static/app.js`
- **Результат**: Полностью функциональный интерфейс авторизации Yandex Cloud

### ✅ Проблема 2: Форматирование вывода
- Использование `textwrap.fill()` для переноса строк
- Фиксированная ширина 70 символов
- Структурированные отступы

### ✅ Проблема 3: ModuleNotFoundError
- Версия на чистом Python без зависимостей
- Pyodide для автоматической загрузки библиотек
- Работа прямо в браузере

### ✅ Проблема 4: Интеграция визуализаций
- Схема RAG pipeline встроена в HTML
- Интерактивные элементы
- Адаптивный дизайн

### ✅ Проблема 5: Расширенное руководство по векторным БД (ИСПРАВЛЕНО 17.09.2025)
- **Проблема**: Страница `/vector_databases_enhanced_guide` показывала только заглушку вместо детального содержимого
- **Причина**: Некорректная конфигурация статических файлов в Cloudflare Workers + циклические редиректы
- **Решение**: Замена статического файлового сервинга на inline HTML контент в маршруте Hono
- **Результат**: Полностью функциональное руководство с хронологией 2013-2025, актуальными бенчмарками и проверенными фактами

## 🛠 Технологии

- **Frontend**: HTML5, TailwindCSS, JavaScript
- **Python в браузере**: Pyodide
- **Векторизация**: TF-IDF, Bag-of-Words
- **Визуализация**: Inline SVG, CSS анимации

## 📖 Структура файлов

```
yc-rag-lecture-intro/
├── rag_index.html              # Главная страница
├── rag_pure_python.html        # Pure Python демо
├── rag_pyodide_demo.html       # Scikit-learn демо
├── rag_web_demo.html           # Web демо версия
├── vector_databases_guide.html # Руководство по векторным БД
├── rag_example_formatted.py    # Python скрипт с форматированием
├── rag_advanced.py             # Продвинутая версия с эмбеддингами
└── README.md                   # Этот файл
```

## 🎓 Для преподавателей

Материалы подготовлены для использования в лекциях:
- Все факты проверены по первоисточникам
- Актуальные данные на 2024-2025 год
- Интерактивные примеры для демонстрации
- Готовые к использованию без настройки

## 📚 Источники и ссылки

### Научные статьи:
- [HNSW: Malkov & Yashunin (2016)](https://arxiv.org/pdf/1603.09320)
- [FAISS: Johnson et al. (2019)](https://arxiv.org/abs/1702.08734)

### Технические блоги:
- [Meta Engineering - FAISS + cuVS](https://engineering.fb.com/2025/05/08/data-infrastructure/accelerating-gpu-indexes-in-faiss-with-nvidia-cuvs/)
- [Spotify Engineering - Voyager](https://engineering.atspotify.com/introducing-voyager-spotifys-new-nearest-neighbor-search-library)

### Ресурсы:
- [FAISS GitHub Wiki](https://github.com/facebookresearch/faiss/wiki)
- [ANN-Benchmarks](https://ann-benchmarks.com/)
- [hnswlib](https://github.com/nmslib/hnswlib)

## 🤝 Вклад в проект

Приветствуются:
- Исправления ошибок
- Добавление новых примеров
- Улучшение документации
- Обновление бенчмарков

## 📄 Лицензия

MIT License - свободное использование для образовательных целей

## 👨‍💻 Автор

Создано для образовательных целей в рамках изучения RAG и векторных баз данных.

## 🚀 Развертывание

### Текущее развертывание
Проект запущен в sandbox среде:
- **Current URL**: https://3000-igm3kecoaozuvr92vda4l-6532622b.e2b.dev
- **Local URL**: http://localhost:3000  
- **Last Update**: 17 сентября 2025
- **Status**: ✅ Active и полностью функциональный
- **JavaScript**: ✅ Все функции работают корректно

### Cloudflare Pages (Production) ✅
Текущее развертывание на production:
- **Production URL**: https://rag-sandbox-guide.pages.dev
- **Latest Deploy**: https://ae6a73ee.rag-sandbox-guide.pages.dev
- **Deploy Date**: 17 сентября 2025, 05:55 UTC
- **Status**: 🟢 Active and fully functional

### Локальное развертывание
```bash
npm install -g wrangler
wrangler pages deploy dist --project-name your-project-name
```

---

**Последнее обновление**: 17 сентября 2025, 06:15 UTC  
**Статус**: ✅ Активно поддерживается  
**Развернуто на**: Cloudflare Pages  
**JavaScript Status**: ✅ Все функции исправлены и работают  
**Новое**: 📚 Добавлено подробное руководство по векторным БД  
**Telegram канал**: [https://t.me/llm_notes](https://t.me/llm_notes)