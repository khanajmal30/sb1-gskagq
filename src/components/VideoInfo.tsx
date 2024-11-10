import React from 'react';
import { Info } from 'lucide-react';
import { VideoInfo as VideoInfoType } from '../types';

interface VideoInfoProps {
  info: VideoInfoType;
  targetResolution: string;
  targetFps: number;
}

const VideoInfo: React.FC<VideoInfoProps> = ({ info, targetResolution, targetFps }) => {
  return (
    <div className="bg-gray-800/50 rounded-lg p-4 backdrop-blur-sm">
      <h3 className="text-lg font-semibold mb-3 flex items-center">
        <Info className="w-5 h-5 mr-2 text-blue-500" />
        Video Information
      </h3>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-gray-400">Original Resolution</p>
          <p className="font-medium">{info.width} x {info.height}</p>
        </div>
        <div>
          <p className="text-gray-400">Target Resolution</p>
          <p className="font-medium">{targetResolution}</p>
        </div>
        <div>
          <p className="text-gray-400">Duration</p>
          <p className="font-medium">{Math.round(info.duration)}s</p>
        </div>
        <div>
          <p className="text-gray-400">Target FPS</p>
          <p className="font-medium">{targetFps} FPS</p>
        </div>
      </div>
    </div>
  );
};

export default VideoInfo;