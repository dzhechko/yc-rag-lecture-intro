# 🐍 Python RAG Песочница с руководством по векторным БД

[![Python](https://img.shields.io/badge/Python-3.8%2B-blue)](https://python.org)
[![License](https://img.shields.io/badge/License-MIT-green)](LICENSE)
[![Status](https://img.shields.io/badge/Status-Active-success)](https://github.com/dzhechko/yc-rag-lecture-intro)

Интерактивная песочница для изучения RAG (Retrieval-Augmented Generation) с полным руководством по векторным базам данных. Включает демонстрации, примеры кода и актуальные бенчмарки 2024-2025.

## 🚀 Быстрый старт

### Онлайн демо (если развернуто):
- [RAG Песочница - Pure Python](https://your-domain.com/rag_pure_python.html)
- [Руководство по векторным БД](https://your-domain.com/vector_databases_guide.html)

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

### 📚 Руководство по векторным БД

#### **vector_databases_guide.html** 🆕
Полное руководство включает:
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

### ✅ Проблема 1: Форматирование вывода
- Использование `textwrap.fill()` для переноса строк
- Фиксированная ширина 70 символов
- Структурированные отступы

### ✅ Проблема 2: ModuleNotFoundError
- Версия на чистом Python без зависимостей
- Pyodide для автоматической загрузки библиотек
- Работа прямо в браузере

### ✅ Проблема 3: Интеграция визуализаций
- Схема RAG pipeline встроена в HTML
- Интерактивные элементы
- Адаптивный дизайн

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

---

**Последнее обновление**: Декабрь 2024
**Статус**: ✅ Активно поддерживается