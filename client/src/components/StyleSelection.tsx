import { Card, CardContent } from "@/components/ui/card";
import { Palette } from "lucide-react";

interface StyleSelectionProps {
  selectedStyle: 'oil' | 'watercolor' | '';
  onStyleChange: (style: 'oil' | 'watercolor') => void;
}

export function StyleSelection({ selectedStyle, onStyleChange }: StyleSelectionProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
          <Palette className="mr-3 text-blue-600" />
          Art Style
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <label className="cursor-pointer">
            <input 
              type="radio" 
              name="artStyle" 
              value="oil" 
              className="hidden peer" 
              checked={selectedStyle === 'oil'}
              onChange={() => onStyleChange('oil')}
            />
            <div className="p-6 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-400 peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/30 dark:peer-checked:border-blue-400 transition-all">
              <div className="w-full h-32 bg-gradient-to-br from-amber-100 to-amber-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-amber-700 font-medium">Oil Painting Style</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Oil Painting</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Painterly realism with loose brushstrokes, dramatic lighting, and muted earthy palettes. Cinematic composition with rich textures.</p>
            </div>
          </label>

          <label className="cursor-pointer">
            <input 
              type="radio" 
              name="artStyle" 
              value="watercolor" 
              className="hidden peer"
              checked={selectedStyle === 'watercolor'}
              onChange={() => onStyleChange('watercolor')}
            />
            <div className="p-6 border-2 border-slate-200 dark:border-slate-700 rounded-xl hover:border-blue-300 dark:hover:border-blue-400 peer-checked:border-blue-600 peer-checked:bg-blue-50 dark:peer-checked:bg-blue-900/30 dark:peer-checked:border-blue-400 transition-all">
              <div className="w-full h-32 bg-gradient-to-br from-blue-100 to-slate-200 rounded-lg mb-4 flex items-center justify-center">
                <span className="text-slate-700 font-medium">Watercolor Style</span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 dark:text-white mb-2">Old Watercolor</h3>
              <p className="text-sm text-slate-600 dark:text-slate-300">Traditional watercolor portrait with dramatic lighting, muted earth tones, and authentic old parchment texture.</p>
            </div>
          </label>
        </div>
      </CardContent>
    </Card>
  );
}