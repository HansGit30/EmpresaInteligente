import nltk
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from collections import Counter

# Asegurar descargas automáticas de NLTK
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt')
    nltk.download('punkt_tab')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')


def clasificar_texto(palabras_limpias: list[str]) -> tuple[str, float]:
    """Determina la categoría estimada según términos clave y su confianza."""
    
    # Diccionario de palabras clave por categoría
    palabras_clave = {
        "FELICITACION": ["excelente", "rápida", "bueno", "excelente", "buena", "genial", "satisfecho", "gracias"],
        "RECLAMO": ["retraso", "demora", "problema", "malo", "pésimo", "falla", "error", "queja"],
        "SOPORTE": ["ayuda", "sistema", "configuración", "técnico", "clave", "acceso", "pantalla"],
        "CONSULTA": ["precio", "costo", "información", "horario", "ubicación", "dónde", "cuándo"]
    }

    macheos = {cat: 0 for cat in palabras_clave}

    for palabra in palabras_limpias:
        for categoria, terminos in palabras_clave.items():
            if palabra in terminos:
                macheos[categoria] += 1

    categoria_detectada = max(macheos, key=macheos.get)
    total_coincidencias = sum(macheos.values())

    # Si no hubo ninguna palabra clave detectada
    if total_coincidencias == 0:
        return "OTROS", 0.5000

    # Calcula la confianza basada en el porcentaje de coincidencia de la categoría ganadora
    confianza = round(macheos[categoria_detectada] / total_coincidencias, 4)
    return categoria_detectada, max(confianza, 0.7500)


def analizar_comentario(texto: str):
    if not texto:
        return {
            "cantidad_palabras": 0,
            "palabras_limpias": [],
            "palabras_frecuentes": [],
            "categoria": "OTROS",
            "confianza": 0.0
        }

    tokens = word_tokenize(texto.lower())
    palabras = [t for t in tokens if t.isalnum()]

    stop_words = set(stopwords.words('spanish'))
    palabras_limpias = [p for p in palabras if p not in stop_words]

    conteo = Counter(palabras_limpias)
    palabras_frecuentes = [{"palabra": k, "frecuencia": v} for k, v in conteo.most_common(5)]

    # Determinar categoría y porcentaje de confianza
    categoria, confianza = clasificar_texto(palabras_limpias)

    return {
        "cantidad_palabras": len(palabras),
        "palabras_limpias": palabras_limpias,
        "palabras_frecuentes": palabras_frecuentes,
        "categoria": categoria,
        "confianza": confianza
    }