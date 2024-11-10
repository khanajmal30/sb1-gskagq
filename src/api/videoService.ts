const API_URL = 'http://localhost:8000/api';

export const uploadVideo = async (file: File, resolution: string, fps: number) => {
  const formData = new FormData();
  formData.append('original_file', file);
  formData.append('title', file.name);
  formData.append('resolution', resolution);
  formData.append('fps', fps.toString());

  const response = await fetch(`${API_URL}/videos/`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    throw new Error('Failed to upload video');
  }

  return response.json();
};

export const processVideo = async (videoId: number) => {
  const response = await fetch(`${API_URL}/videos/${videoId}/process/`, {
    method: 'POST',
  });

  if (!response.ok) {
    throw new Error('Failed to process video');
  }

  return response.json();
};

export const getVideoStatus = async (videoId: number) => {
  const response = await fetch(`${API_URL}/videos/${videoId}/`);
  
  if (!response.ok) {
    throw new Error('Failed to get video status');
  }

  return response.json();
};