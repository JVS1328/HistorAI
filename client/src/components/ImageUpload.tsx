import { useState, useCallback } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Upload, Camera } from "lucide-react";

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  selectedImage: File | null;
}

export function ImageUpload({ onImageSelect, selectedImage }: ImageUploadProps) {
  const [dragOver, setDragOver] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleFileSelect = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload a valid image file.');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert('Image size should be less than 10MB.');
      return;
    }

    onImageSelect(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }, [onImageSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  }, [handleFileSelect]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileSelect(e.target.files[0]);
    }
  }, [handleFileSelect]);

  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
          <Camera className="mr-3 text-blue-600" />
          Upload Your Photo
        </h2>

        <div 
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all ${
            dragOver 
              ? 'border-blue-500 bg-blue-50/30' 
              : 'border-slate-300 hover:border-blue-500 hover:bg-blue-50/30'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => document.getElementById('imageInput')?.click()}
        >
          {previewUrl ? (
            <div>
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-w-full max-h-64 mx-auto rounded-lg shadow-sm"
              />
              <p className="text-sm text-slate-600 mt-4">Click to change image</p>
            </div>
          ) : (
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500 mb-4" size={48} />
              <p className="text-lg font-medium text-slate-700 dark:text-gray-300 mb-2">Drop your image here or click to browse</p>
              <p className="text-sm text-slate-500 dark:text-gray-400">Supports JPG, PNG, WebP up to 10MB</p>
            </div>
          )}
        </div>

        <input 
          type="file" 
          id="imageInput" 
          className="hidden" 
          accept="image/*"
          onChange={handleInputChange}
        />
      </CardContent>
    </Card>
  );
}