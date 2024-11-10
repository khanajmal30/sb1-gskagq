import React from 'react';
import { Video } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Video className="w-8 h-8 text-blue-500" />
            <h1 className="text-xl font-bold">4K Video Upscaler</h1>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  Tutorial
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition">
                  About
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}