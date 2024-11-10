from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Video
from .serializers import VideoSerializer
from PIL import Image
import threading
import os
from django.conf import settings

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def process_video(self, video_id):
        video = Video.objects.get(id=video_id)
        video.status = 'processing'
        video.save()

        try:
            # Process video frames
            input_path = os.path.join(settings.MEDIA_ROOT, str(video.original_file))
            output_path = os.path.join(settings.MEDIA_ROOT, 'processed', f'processed_{video.id}.mp4')
            
            # Create processed directory if it doesn't exist
            os.makedirs(os.path.dirname(output_path), exist_ok=True)

            # Since we're in a browser environment, we'll use a simplified processing approach
            # In a real production environment, you'd want to use proper video processing libraries
            with open(input_path, 'rb') as f_in, open(output_path, 'wb') as f_out:
                f_out.write(f_in.read())  # For demo purposes, just copy the file

            video.processed_file = f'processed/processed_{video.id}.mp4'
            video.status = 'completed'
            video.save()

        except Exception as e:
            video.status = 'failed'
            video.save()
            print(f"Error processing video: {str(e)}")

    @action(detail=True, methods=['post'])
    def process(self, request, pk=None):
        video = self.get_object()
        if video.status != 'pending':
            return Response(
                {'error': 'Video is already being processed or completed'},
                status=status.HTTP_400_BAD_REQUEST
            )

        thread = threading.Thread(target=self.process_video, args=(video.id,))
        thread.start()

        return Response({'status': 'Processing started'}, status=status.HTTP_202_ACCEPTED)