import { Button } from "@/components/ui/button";
import { Wand2 } from "lucide-react";

interface GenerateButtonProps {
  isEnabled: boolean;
  isGenerating: boolean;
  onGenerate: () => void;
}

export function GenerateButton({ isEnabled, isGenerating, onGenerate }: GenerateButtonProps) {
  return (
    <div className="text-center mb-8">
      <Button 
        onClick={onGenerate}
        disabled={!isEnabled || isGenerating}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-8 text-lg shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        size="lg"
      >
        <Wand2 className="mr-2" />
        Generate Historical Portrait
      </Button>
      <p className="text-sm text-slate-500 mt-3">Processing typically takes 30-60 seconds</p>
    </div>
  );
}
