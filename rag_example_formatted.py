#!/usr/bin/env python3
"""
Улучшенный пример RAG с красивым форматированием вывода
"""

import textwrap
from typing import List, Dict, Any

class SimpleRAG:
    def __init__(self):
        self.documents = []
        self.embeddings = None
        
    def add_documents(self, docs: List[str]):
        """Добавление документов в базу"""
        self.documents = docs
        return len(docs)
    
    def search(self, query: str, k: int = 2) -> List[Dict[str, Any]]:
        """Поиск релевантных документов"""
        # Простая имитация поиска по ключевым словам
        results = []
        query_lower = query.lower()
        
        for i, doc in enumerate(self.documents):
            doc_lower = doc.lower()
            # Простая оценка релевантности на основе общих слов
            score = 0
            for word in query_lower.split():
                if word in doc_lower:
                    score += 0.2
            
            if score > 0:
                results.append({
                    'document': doc,
                    'score': min(0.9, score + 0.5),  # Нормализация score
                    'index': i
                })
        
        # Сортировка по релевантности
        results.sort(key=lambda x: x['score'], reverse=True)
        return results[:k]

def format_output(text: str, width: int = 70) -> str:
    """Форматирование текста с переносом строк"""
    return textwrap.fill(text, width=width)

def print_separator(char: str = "=", width: int = 70):
    """Печать разделителя фиксированной ширины"""
    print(char * width)

def print_search_results(query: str, results: List[Dict[str, Any]], width: int = 70):
    """Красивый вывод результатов поиска"""
    print_separator("=", width)
    print(f"🔍 Поиск по запросу: '{query}'")
    print(f"📊 Найдено документов: {len(results)}")
    
    for i, result in enumerate(results, 1):
        print(f"\n{i}. (Релевантность: {result['score']:.3f})")
        
        # Форматирование документа с переносом строк
        doc_formatted = format_output(result['document'], width - 3)
        for line in doc_formatted.split('\n'):
            print(f"   {line}")
    
    print_separator("=", width)

def main():
    """Основная функция с демонстрацией RAG"""
    
    # Инициализация
    print("🚀 Python RAG Песочница")
    print_separator()
    
    rag = SimpleRAG()
    
    # Добавление тестовых документов
    documents = [
        "RAG (Retrieval-Augmented Generation) объединяет поиск и генерацию для точных ответов",
        "FAISS - библиотека Facebook для быстрого поиска по векторам",
        "HNSW показывает лучшую производительность для приближенного поиска",
        "Эмбеддинги преобразуют текст в числовые векторы для семантического поиска",
        "Recall@k измеряет долю найденных релевантных документов"
    ]
    
    # Добавление документов
    num_docs = rag.add_documents(documents)
    print(f"✅ Добавлено {num_docs} документов\n")
    
    # Примеры запросов
    queries = [
        "Что такое RAG?",
        "Какой алгоритм поиска самый быстрый?"
    ]
    
    # Выполнение поиска
    for query in queries:
        results = rag.search(query, k=2)
        print_search_results(query, results)
        print()  # Пустая строка между запросами
    
    # Итоговая информация
    print("\n📈 Статистика:")
    print(f"   • Всего документов: {len(documents)}")
    print(f"   • Выполнено запросов: {len(queries)}")
    print(f"   • Метод поиска: простое сопоставление ключевых слов")
    
    print_separator()
    print("✨ Готово! Результаты отформатированы для удобного чтения.")

if __name__ == "__main__":
    main()