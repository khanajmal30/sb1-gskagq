import React from 'react';
import { Settings, Download } from 'lucide-react';

interface VideoControlsProps {
  isProcessing: boolean;
  onProcess: () => void;
  onResolutionChange: (resolution: string) => void;
  onFpsChange: (fps: number) => void;
}

const VideoControls: React.FC<VideoControlsProps> = ({
  isProcessing,
  onProcess,
  onResolutionChange,
  onFpsChange,
}) => {
  return (
    <div className="flex items-center justify-between bg-gray-800/50 p-4 rounded-lg backdrop-blur-sm">
      <div className="flex items-center space-x-4">
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            isProcessing
              ? 'bg-blue-600/50 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
          onClick={onProcess}
          disabled={isProcessing}
        >
          <Settings className={`w-5 h-5 ${isProcessing ? 'animate-spin' : ''}`} />
          <span>{isProcessing ? 'Processing...' : 'Process to 4K'}</span>
        </button>
        
        <button
          className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition ${
            !isProcessing
              ? 'bg-green-600/50 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
          disabled={!isProcessing}
        >
          <Download className="w-5 h-5" />
          <span>Download</span>
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <select 
          className="bg-gray-700 rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
          onChange={(e) => onFpsChange(Number(e.target.value))}
        >
          <option value="60">60 FPS</option>
          <option value="30">30 FPS</option>
        </select>
        
        <select 
          className="bg-gray-700 rounded-lg px-3 py-2 text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
          onChange={(e) => onResolutionChange(e.target.value)}
        >
          <option value="3840x2160">4K (3840x2160)</option>
          <option value="2560x1440">1440p (2560x1440)</option>
          <option value="1920x1080">1080p (1920x1080)</option>
        </select>
      </div>
    </div>
  );
};

export default VideoControls;