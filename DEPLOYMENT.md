# 🚀 Развертывание на Cloudflare Pages

## ✅ Проект успешно развернут!

### 🌐 Публичные URL-адреса:

#### Основные страницы:
- **🏠 Главная страница**: https://rag-sandbox-guide.pages.dev
- **📋 Список всех демо**: https://rag-sandbox-guide.pages.dev/rag_index
- **🐍 Pure Python RAG (рекомендуется)**: https://rag-sandbox-guide.pages.dev/rag_pure_python
- **🔬 Scikit-learn версия**: https://rag-sandbox-guide.pages.dev/rag_pyodide_demo
- **🌐 Web демо**: https://rag-sandbox-guide.pages.dev/rag_web_demo
- **📚 Руководство по векторным БД**: https://rag-sandbox-guide.pages.dev/vector_databases_guide

#### Preview URLs:
- Production: https://rag-sandbox-guide.pages.dev
- Latest deployment: https://7ed9bdf2.rag-sandbox-guide.pages.dev

### 📊 Информация о развертывании:

- **Платформа**: Cloudflare Pages
- **Проект**: rag-sandbox-guide
- **Account ID**: 8e5f561d7027708353f4ca9b5c3ce53b
- **Дата развертывания**: 16 декабря 2024
- **Статус**: ✅ Активен

### 🔧 Команды для управления:

```bash
# Просмотр информации о проекте
npx wrangler pages project list

# Новое развертывание
npx wrangler pages deploy dist --project-name rag-sandbox-guide

# Удаление проекта (осторожно!)
npx wrangler pages project delete rag-sandbox-guide
```

### 📝 Структура развернутых файлов:

```
rag-sandbox-guide.pages.dev/
├── index.html                    # Редирект на rag_index
├── rag_index.html               # Главная страница со списком демо
├── rag_pure_python.html        # Pure Python демо
├── rag_pyodide_demo.html       # Scikit-learn демо
├── rag_web_demo.html           # Web демо версия
├── vector_databases_guide.html # Руководство по векторным БД
├── rag_example_formatted.py    # Python примеры
├── rag_advanced.py             # Продвинутые примеры
├── README.md                   # Документация проекта
└── LICENSE                     # MIT лицензия
```

### 🎯 Особенности Cloudflare Pages:

1. **Автоматическое удаление .html из URL** - страницы доступны как с .html, так и без
2. **Глобальная CDN** - быстрая загрузка по всему миру
3. **HTTPS по умолчанию** - безопасное соединение
4. **Неограниченная пропускная способность** - бесплатно для статических сайтов

### 📈 Следующие шаги:

1. **Настройка автоматического деплоя из GitHub**:
   - Перейдите в [Cloudflare Dashboard](https://dash.cloudflare.com)
   - Выберите Pages → rag-sandbox-guide → Settings
   - Подключите GitHub репозиторий для автоматического деплоя

2. **Добавление кастомного домена** (опционально):
   ```bash
   npx wrangler pages domain add your-domain.com --project-name rag-sandbox-guide
   ```

3. **Мониторинг и аналитика**:
   - Доступны в Cloudflare Dashboard
   - Просмотр трафика, ошибок, производительности

### 🔗 Полезные ссылки:

- **GitHub репозиторий**: https://github.com/dzhechko/yc-rag-lecture-intro
- **Cloudflare Dashboard**: https://dash.cloudflare.com
- **Wrangler документация**: https://developers.cloudflare.com/workers/wrangler/

---

**Развернуто с помощью**: Wrangler CLI v4.37.1
**Cloudflare Pages**: Бесплатный план (достаточно для данного проекта)