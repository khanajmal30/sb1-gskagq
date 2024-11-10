import React from 'react';

interface VideoPlayerProps {
  videoFile: File;
  processedUrl?: string | null;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoFile, processedUrl }) => {
  const videoUrl = processedUrl || URL.createObjectURL(videoFile);
  
  return (
    <div className="relative aspect-video bg-black rounded-lg overflow-hidden shadow-xl">
      <video
        className="w-full h-full"
        src={videoUrl}
        controls
        controlsList="nodownload"
      />
      {processedUrl && (
        <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
          Processed
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;