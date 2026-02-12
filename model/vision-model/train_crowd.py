from ultralytics import YOLO
import os

def train_model():
    # Initialize YOLOv8n (nano) model
    model = YOLO("yolov8n.pt")
    
    # Path to dataset yaml
    # Resolve relative to this script: ../../crowdshield_dataset/data.yaml
    script_dir = os.path.dirname(os.path.abspath(__file__))
    dataset_path = os.path.abspath(os.path.join(script_dir, "../../crowdshield_dataset/data.yaml"))
    
    print(f"Starting training on {dataset_path}...")
    
    # Train the model
    # epochs=50 is a reasonable starting point. 
    # imgsz=640 is standard.
    results = model.train(
        data=dataset_path,
        epochs=50,
        imgsz=640,
        plots=True,
        project="crowd_detection/runs",
        name="train"
    )
    
    print("Training complete.")
    
    # Save the best model
    best_model_path = "crowd_detection/runs/train/weights/best.pt"
    target_path = "crowd_detection/crowd_model.pt"
    
    if os.path.exists(best_model_path):
        import shutil
        shutil.copy(best_model_path, target_path)
        print(f"Best model copied to {target_path}")
    else:
        print("Could not find best.pt to copy.")

if __name__ == "__main__":
    train_model()
