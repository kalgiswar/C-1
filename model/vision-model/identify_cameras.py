import cv2

def identify_cameras():
    print("Enumerating camera indices (0-10)...")
    working_indices = []
    
    for i in range(10):
        # Try default and DSHOW
        for backend in [None, cv2.CAP_DSHOW, cv2.CAP_MSMF]:
            try:
                if backend is not None:
                    cap = cv2.VideoCapture(i, backend)
                else:
                    cap = cv2.VideoCapture(i)
                
                if cap.isOpened():
                    ret, frame = cap.read()
                    if ret:
                        backend_name = "Default" if backend is None else ("DSHOW" if backend == cv2.CAP_DSHOW else "MSMF")
                        print(f"Index {i}: WORKING with {backend_name} backend")
                        working_indices.append(i)
                        cap.release()
                        break # Found a working backend for this index
                    cap.release()
            except Exception:
                continue
                
    if not working_indices:
        print("No working cameras found.")
    else:
        print(f"\nSummary of working indices: {list(set(working_indices))}")
        print("Try these numbers one by one in your .env file.")

if __name__ == "__main__":
    identify_cameras()
