from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Video
from .serializers import VideoSerializer
from PIL import Image
import io
import os
from django.conf import settings
import threading

class VideoViewSet(viewsets.ModelViewSet):
    queryset = Video.objects.all()
    serializer_class = VideoSerializer

    def process_video(self, video_id):
        video = Video.objects.get(id=video_id)
        video.status = 'processing'
        video.save()

        try:
            input_path = os.path.join(settings.MEDIA_ROOT, str(video.original_file))
            output_filename = f'processed_{os.path.basename(input_path)}'
            output_path = os.path.join(settings.MEDIA_ROOT, 'processed', output_filename)

            # Since we can't use OpenCV, we'll process the video as a series of frames
            # using PIL for basic video processing
            with open(input_path, 'rb') as f:
                frames = []
                while True:
                    try:
                        frame = Image.open(io.BytesIO(f.read()))
                        width = int(video.resolution.split('x')[0])
                        height = int(video.resolution.split('x')[1])
                        frame_resized = frame.resize((width, height), Image.Resampling.LANCZOS)
                        frames.append(frame_resized)
                    except EOFError:
                        break

            # Save processed frames
            if frames:
                frames[0].save(
                    output_path,
                    save_all=True,
                    append_images=frames[1:],
                    duration=int(1000/video.fps),
                    loop=0
                )

            video.processed_file = f'processed/{output_filename}'
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