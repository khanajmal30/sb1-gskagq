import React, { useState, useRef } from 'react';
import { Upload, Play, Pause, Download, Settings } from 'lucide-react';

interface VideoState {
  file: File | null;
  isPlaying: boolean;
  currentTime: number;
}

export default function VideoEditor() {
  const [videoState, setVideoState] = useState<VideoState>({
    file: null,
    isPlaying: false,
    currentTime: 0,
  });
  const [processing, setProcessing] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setVideoState(prev => ({ ...prev, file }));
      const videoUrl = URL.createObjectURL(file);
      if (videoRef.current) {
        videoRef.current.src = videoUrl;
      }
    }
  };

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (videoState.isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setVideoState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setVideoState(prev => ({ ...prev, currentTime: videoRef.current?.currentTime || 0 }));
    }
  };

  const processVideo = async () => {
    setProcessing(true);
    // Here we would implement WebAssembly-based video processing
    // For now, we'll just simulate processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setProcessing(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">4K Video Editor</h1>
          <p className="text-gray-400">Convert and edit your videos to 4K (3840 x 2160) at 60fps</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 shadow-xl">
          {!videoState.file ? (
            <div className="border-2 border-dashed border-gray-600 rounded-lg p-12 text-center">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Upload className="w-12 h-12 mx-auto mb-4 text-blue-500" />
                <p className="text-lg mb-2">Drop your video here or click to upload</p>
                <p className="text-sm text-gray-500">Supports MP4, WebM, and MOV formats</p>
              </label>
            </div>
          ) : (
            <div>
              <video
                ref={videoRef}
                className="w-full rounded-lg mb-4"
                onTimeUpdate={handleTimeUpdate}
                controls={false}
              />
              
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={togglePlayPause}
                    className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 transition"
                  >
                    {videoState.isPlaying ? (
                      <Pause className="w-6 h-6" />
                    ) : (
                      <Play className="w-6 h-6" />
                    )}
                  </button>
                  <div className="text-sm text-gray-400">
                    {Math.floor(videoState.currentTime)}s
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={processVideo}
                    disabled={processing}
                    className="flex items-center space-x-2 px-4 py-2 bg-green-600 rounded hover:bg-green-700 transition disabled:opacity-50"
                  >
                    <Settings className="w-4 h-4" />
                    <span>{processing ? 'Processing...' : 'Process to 4K'}</span>
                  </button>
                  <button
                    disabled={processing}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 transition disabled:opacity-50"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Processing Settings</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Output Resolution
              </label>
              <select className="w-full bg-gray-700 rounded-md px-3 py-2 text-white">
                <option value="3840x2160">3840 x 2160 (4K UHD)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                Frame Rate
              </label>
              <select className="w-full bg-gray-700 rounded-md px-3 py-2 text-white">
                <option value="60">60 FPS</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}