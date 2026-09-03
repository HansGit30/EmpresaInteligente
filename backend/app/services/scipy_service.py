import numpy as np
from scipy import stats

def calcular_metricas_longitud(longitudes: list[int]) -> dict:
    if not longitudes:
        return {
            "media": 0.0,
            "mediana": 0.0,
            "moda": 0,
            "desviacion_estandar": 0.0,
            "varianza": 0.0,
            "minimo": 0,
            "maximo": 0,
            "total_muestras": 0
        }
    
    arr = np.array(longitudes)
    
    # Cálculo de la moda usando SciPy
    moda_res = stats.mode(arr, keepdims=False)
    
    return {
        "media": float(round(np.mean(arr), 2)),
        "mediana": float(round(np.median(arr), 2)),
        "moda": int(moda_res.mode),
        "desviacion_estandar": float(round(np.std(arr, ddof=1 if len(arr) > 1 else 0), 2)),
        "varianza": float(round(np.var(arr, ddof=1 if len(arr) > 1 else 0), 2)),
        "minimo": int(np.min(arr)),
        "maximo": int(np.max(arr)),
        "total_muestras": len(arr)
    }