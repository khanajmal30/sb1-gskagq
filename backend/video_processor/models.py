from django.db import models
import os

class Video(models.Model):
    title = models.CharField(max_length=255)
    original_file = models.FileField(upload_to='uploads/')
    processed_file = models.FileField(upload_to='processed/', null=True, blank=True)
    resolution = models.CharField(max_length=20, default='3840x2160')
    fps = models.IntegerField(default=60)
    status = models.CharField(
        max_length=20,
        choices=[
            ('pending', 'Pending'),
            ('processing', 'Processing'),
            ('completed', 'Completed'),
            ('failed', 'Failed'),
        ],
        default='pending'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        if self.original_file:
            if os.path.isfile(self.original_file.path):
                os.remove(self.original_file.path)
        if self.processed_file:
            if os.path.isfile(self.processed_file.path):
                os.remove(self.processed_file.path)
        super().delete(*args, **kwargs)