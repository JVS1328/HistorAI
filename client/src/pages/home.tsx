import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ImageUpload } from "@/components/ImageUpload";
import { HistoricalSettingsForm } from "@/components/HistoricalSettingsForm";
import { StyleSelection } from "@/components/StyleSelection";
import { GenerateButton } from "@/components/GenerateButton";
import { LoadingState } from "@/components/LoadingState";
import { ResultDisplay } from "@/components/ResultDisplay";
import type { GeneratePortraitResponse } from "@/lib/types";

export default function Home() {
  const { toast } = useToast();
  
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    yearWar: '',
    side: '',
    rank: '',
    branch: '',
    extraDetails: ''
  });
  const [selectedStyle, setSelectedStyle] = useState<'oil' | 'watercolor' | ''>('');
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);

  const generateMutation = useMutation({
    mutationFn: async () => {
      if (!selectedImage) throw new Error('No image selected');
      
      const formDataToSend = new FormData();
      formDataToSend.append('image', selectedImage);
      formDataToSend.append('yearWar', formData.yearWar);
      formDataToSend.append('side', formData.side);
      formDataToSend.append('rank', formData.rank);
      formDataToSend.append('branch', formData.branch);
      formDataToSend.append('extraDetails', formData.extraDetails);
      formDataToSend.append('artStyle', selectedStyle);

      const response = await fetch('/api/generate-portrait', {
        method: 'POST',
        body: formDataToSend,
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate portrait');
      }

      return response.json() as Promise<GeneratePortraitResponse>;
    },
    onSuccess: (data) => {
      setGeneratedImageUrl(data.imageUrl);
      toast({
        title: "Portrait Generated!",
        description: "Your historical portrait has been created successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFormChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = selectedImage && 
    formData.yearWar.trim() && 
    formData.side.trim() && 
    formData.rank.trim() && 
    formData.branch && 
    selectedStyle;

  const handleGenerate = () => {
    if (isFormValid) {
      generateMutation.mutate();
    }
  };

  const handleDownload = () => {
    if (generatedImageUrl) {
      const link = document.createElement('a');
      link.download = 'historical-portrait.jpg';
      link.href = generatedImageUrl;
      link.click();
    }
  };

  const handleGenerateNew = () => {
    setGeneratedImageUrl(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen py-8 px-4 bg-gray-50">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-slate-800 mb-4">HistorAI</h1>
          <p className="text-lg text-slate-600 max-w-xl mx-auto">
            Transform your photo into a stunning historical military portrait using AI. 
            Simply upload your image and customize the historical details.
          </p>
        </div>

        <ImageUpload 
          onImageSelect={setSelectedImage}
          selectedImage={selectedImage}
        />

        <HistoricalSettingsForm 
          formData={formData}
          onFormChange={handleFormChange}
        />

        <StyleSelection 
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
        />

        <GenerateButton 
          isEnabled={isFormValid}
          isGenerating={generateMutation.isPending}
          onGenerate={handleGenerate}
        />

        {generateMutation.isPending && <LoadingState />}

        {generatedImageUrl && (
          <ResultDisplay 
            imageUrl={generatedImageUrl}
            onDownload={handleDownload}
            onGenerateNew={handleGenerateNew}
          />
        )}

        {/* Footer */}
        <div className="text-center mt-12 text-slate-500 text-sm">
          <p>Powered by OpenAI's newest image generation models</p>
        </div>
      </div>
    </div>
  );
}
