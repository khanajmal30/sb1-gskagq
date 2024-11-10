import React from 'react';
import { Upload } from 'lucide-react';
import { VideoInfo } from '../types';

interface VideoUploaderProps {
  onFileChange: (file: File, info: VideoInfo) => void;
}

const VideoUploader: React.FC<VideoUploaderProps> = ({ onFileChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const video = document.createElement('video');
      video.src = URL.createObjectURL(file);
      video.onloadedmetadata = () => {
        onFileChange(file, {
          width: video.videoWidth,
          height: video.videoHeight,
          duration: video.duration,
          fps: 0
        });
      };
    }
  };

  return (
    <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center transition-colors hover:border-blue-500 hover:bg-gray-800/50">
      <label className="cursor-pointer block">
        <input
          type="file"
          accept="video/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <Upload className="w-16 h-16 mx-auto mb-4 text-blue-500" />
        <p className="text-xl mb-2">Drop your video here or click to upload</p>
        <p className="text-sm text-gray-400">Supports MP4, WebM, and MOV formats</p>
      </label>
    </div>
  );
};

export default VideoUploader;