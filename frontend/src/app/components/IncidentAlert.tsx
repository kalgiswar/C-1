import { useState } from "react";
import { AlertTriangle, CheckCircle, XCircle, Flame, Users, Swords, Video, Clock } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { Progress } from "@/app/components/ui/progress";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/app/components/ui/alert-dialog";

export type IncidentType = "stampede" | "fire" | "fighting";

export interface Incident {
  id: string;
  type: IncidentType;
  location: string;
  timestamp: Date;
  accuracy: number;
  videoUrl?: string;
  cameraId: string;
  status: "pending" | "accepted" | "rejected";
}

interface IncidentAlertProps {
  incident: Incident;
  onAccept: (id: string) => void;
  onReject: (id: string) => void;
}

const incidentConfig = {
  stampede: {
    icon: Users,
    label: "Stampede Detected",
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    description: "Abnormal crowd movement detected"
  },
  fire: {
    icon: Flame,
    label: "Fire Detected",
    color: "text-red-500",
    bgColor: "bg-red-500/10",
    description: "Potential fire hazard identified"
  },
  fighting: {
    icon: Swords,
    label: "Violence Detected",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    description: "Physical altercation detected"
  }
};

export function IncidentAlert({ incident, onAccept, onReject }: IncidentAlertProps) {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const config = incidentConfig[incident.type];
  const Icon = config.icon;

  const handleAccept = () => {
    setShowConfirmDialog(false);
    onAccept(incident.id);
  };

  const handleReject = () => {
    setShowRejectDialog(false);
    onReject(incident.id);
  };

  return (
    <>
      <Card className={`border-2 ${incident.status === 'pending' ? 'border-red-500 shadow-lg' : ''}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${config.bgColor}`}>
                <Icon className={`h-5 w-5 ${config.color}`} />
              </div>
              <div>
                <CardTitle className="text-base">{config.label}</CardTitle>
                <CardDescription>{config.description}</CardDescription>
              </div>
            </div>
            <Badge 
              variant={
                incident.status === 'accepted' ? 'default' : 
                incident.status === 'rejected' ? 'destructive' : 
                'secondary'
              }
              className="capitalize"
            >
              {incident.status}
            </Badge>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-muted-foreground mb-1">Location</p>
              <p>{incident.location}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Camera ID</p>
              <p>{incident.cameraId}</p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Time</p>
              <p className="flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {incident.timestamp.toLocaleTimeString()}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground mb-1">Confidence</p>
              <div className="space-y-1">
                <Progress value={incident.accuracy} className="h-2" />
                <p className="text-xs">{incident.accuracy}%</p>
              </div>
            </div>
          </div>

          {/* Video Playback Section */}
          <div className="mt-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm flex items-center gap-1">
                <Video className="h-4 w-4" />
                Incident Recording (10 sec)
              </p>
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
              >
                {isPlayingVideo ? "Hide" : "View"} Video
              </Button>
            </div>
            
            {isPlayingVideo && (
              <div className="relative aspect-video bg-gray-900 rounded-md overflow-hidden">
                {/* Placeholder for video player - integrate with your video URL here */}
                <div className="absolute inset-0 flex items-center justify-center text-white/50">
                  <div className="text-center">
                    <Video className="h-8 w-8 mx-auto mb-2" />
                    <p className="text-sm">10-second incident clip</p>
                    <p className="text-xs mt-1">Video URL: {incident.videoUrl || "N/A"}</p>
                    <p className="text-xs">Integrate with your video storage here</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </CardContent>

        {incident.status === 'pending' && (
          <CardFooter className="flex gap-2 pt-0">
            <Button 
              variant="destructive" 
              className="flex-1"
              onClick={() => setShowRejectDialog(true)}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Reject
            </Button>
            <Button 
              className="flex-1"
              onClick={() => setShowConfirmDialog(true)}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Accept & Alert Police
            </Button>
          </CardFooter>
        )}

        {incident.status === 'accepted' && (
          <CardFooter className="pt-0">
            <div className="w-full p-3 bg-green-500/10 border border-green-500/20 rounded-lg text-sm text-green-700">
              <CheckCircle className="h-4 w-4 inline mr-2" />
              Police have been notified of this incident
            </div>
          </CardFooter>
        )}
      </Card>

      {/* Accept Confirmation Dialog */}
      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Police Alert</AlertDialogTitle>
            <AlertDialogDescription>
              This will send an emergency alert to the police department with the incident details, 
              location, and video evidence. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleAccept}>
              Confirm & Send Alert
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Reject Confirmation Dialog */}
      <AlertDialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Reject Alert</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure this is a false alarm? The incident will be marked as rejected 
              and no alert will be sent to the police.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleReject} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Confirm Rejection
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
