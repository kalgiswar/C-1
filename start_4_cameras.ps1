# script to start 4 instances of the vision model
# change the URLs to your DroidCam URLs

$urls = @(
    "http://172.28.84.104:4747/video", # cam1 (User DroidCam 1)
    "http://172.28.84.87:4747/video",  # cam2 (User DroidCam 2)
    "0", # cam3 (Fallback to local webcam)
    "0"  # cam4 (Fallback to local webcam)
)

for ($i = 0; $i -lt 4; $i++) {
    $camId = "cam" + ($i + 1)
    $url = $urls[$i]
    
    $runArgs = "/k `"set CAMERA_ID=$camId && set VISION_CAMERA_SOURCE=$url && cd model/vision-model && python main.py`""
    
    Write-Host "Starting $camId with source $url..."
    Start-Process -FilePath "cmd" -ArgumentList $runArgs
}

Write-Host "Launched 4 vision models."
