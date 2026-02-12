import cv2

def list_ports():
    print("Searching for available camera ports...")
    is_working = True
    dev_port = 0
    working_ports = []
    
    # Check first 5 indices
    while dev_port < 5:
        camera = cv2.VideoCapture(dev_port, cv2.CAP_DSHOW)
        if not camera.isOpened():
            is_working = False
            # print(f"Port {dev_port} is not working.")
        else:
            is_reading, img = camera.read()
            w = camera.get(3)
            h = camera.get(4)
            if is_reading:
                print(f"Port {dev_port}: Working (Resolution: {w}x{h})")
                working_ports.append(dev_port)
            else:
                 print(f"Port {dev_port}: Opened but failed to read frame.")
        dev_port += 1
    
    print("\nSummary:")
    if working_ports:
        print(f"Available Camera Indices: {working_ports}")
        print("Update VISION_CAMERA_SOURCE in model/vision-model/.env with one of these.")
    else:
        print("No working cameras found on first 5 indices.")

if __name__ == "__main__":
    list_ports()
