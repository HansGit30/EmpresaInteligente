import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from collections import Counter

# Asegurar descargas automáticas
try:
    nltk.data.find('tokenizers/punkt')
except LookupError:
    nltk.download('punkt')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

def analizar_comentario(texto: str):
    if not texto:
        return {"cantidad_palabras": 0, "palabras_limpias": [], "palabras_frecuentes": []}
        
    tokens = word_tokenize(texto.lower())
    palabras = [t for t in tokens if t.isalnum()]
    
    stop_words = set(stopwords.words('spanish'))
    palabras_limpias = [p for p in palabras if p not in stop_words]
    
    conteo = Counter(palabras_limpias)
    palabras_frecuentes = [{"palabra": k, "frecuencia": v} for k, v in conteo.most_common(5)]
    
    return {
        "cantidad_palabras": len(palabras),
        "palabras_limpias": palabras_limpias,
        "palabras_frecuentes": palabras_frecuentes
    }