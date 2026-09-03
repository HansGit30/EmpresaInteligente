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
            "asimetria": 0.0,
            "curtosis": 0.0,
            "total_muestras": 0
        }
    
    arr = np.array(longitudes)
    
    # Manejo de la moda para compatibilidad de versiones de SciPy
    moda_res = stats.mode(arr, keepdims=True)
    val_moda = moda_res.mode[0] if len(moda_res.mode) > 0 else 0

    n_muestras = len(arr)
    ddof_val = 1 if n_muestras > 1 else 0

    return {
        "media": float(round(np.mean(arr), 2)),
        "mediana": float(round(np.median(arr), 2)),
        "moda": int(val_moda),
        "desviacion_estandar": float(round(np.std(arr, ddof=ddof_val), 2)),
        "varianza": float(round(np.var(arr, ddof=ddof_val), 2)),
        "minimo": int(np.min(arr)),
        "maximo": int(np.max(arr)),
        "asimetria": float(round(stats.skew(arr), 2)) if n_muestras > 2 else 0.0,
        "curtosis": float(round(stats.kurtosis(arr), 2)) if n_muestras > 2 else 0.0,
        "total_muestras": n_muestras
    }