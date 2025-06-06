import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, RotateCcw, Image } from "lucide-react";

interface ResultDisplayProps {
  imageUrl: string;
  onDownload: () => void;
  onGenerateNew: () => void;
}

export function ResultDisplay({ imageUrl, onDownload, onGenerateNew }: ResultDisplayProps) {
  return (
    <Card>
      <CardContent className="p-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
          <Image className="mr-3 text-blue-600" />
          Your Historical Portrait
        </h2>

        <div className="text-center">
          <img 
            src={imageUrl} 
            alt="Generated historical portrait" 
            className="max-w-full max-h-96 mx-auto rounded-xl shadow-lg mb-6"
          />

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onDownload}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
            >
              <Download className="mr-2" size={16} />
              Download Portrait
            </Button>
            <Button 
              onClick={onGenerateNew}
              variant="secondary"
              className="bg-slate-600 hover:bg-slate-700 text-white font-medium"
            >
              <RotateCcw className="mr-2" size={16} />
              Generate Another
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}