
import sys
print(f"Python: {sys.version}")

try:
    import numpy
    print(f"Numpy: {numpy.__version__} file: {numpy.__file__}")
except ImportError as e:
    print(f"Numpy Import Error: {e}")

try:
    import cv2
    print(f"CV2: {cv2.__version__}")
except ImportError as e:
    print(f"CV2 Import Error: {e}")

try:
    import fastapi
    print(f"FastAPI: {fastapi.__version__}")
except ImportError as e:
    print(f"FastAPI Import Error: {e}")

try:
    import uvicorn
    print(f"Uvicorn: {uvicorn.__version__}")
except ImportError as e:
    print(f"Uvicorn Import Error: {e}")
