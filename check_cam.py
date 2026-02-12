
import cv2
import sys

def check(index):
    try:
        cap = cv2.VideoCapture(index, cv2.CAP_DSHOW)
        if cap.isOpened():
            ret, frame = cap.read()
            if ret:
                print(f"CAMERA_FOUND:{index}")
            else:
                print(f"CAMERA_OPENED_BUT_NO_FRAME:{index}")
            cap.release()
        else:
            print(f"CAMERA_FAILED:{index}")
    except Exception as e:
        print(f"CAMERA_ERROR:{index}:{e}")

if __name__ == "__main__":
    print("STARTING_CHECK")
    check(0)
    check(1)
    check(2)
    print("ENDING_CHECK")
