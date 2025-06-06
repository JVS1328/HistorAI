import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Settings } from "lucide-react";

interface HistoricalSettingsFormProps {
  formData: {
    yearWar: string;
    side: string;
    rank: string;
    branch: string;
    extraDetails: string;
  };
  onFormChange: (field: string, value: string) => void;
}

export function HistoricalSettingsForm({ formData, onFormChange }: HistoricalSettingsFormProps) {
  return (
    <Card className="mb-8">
      <CardContent className="p-8">
        <h2 className="text-xl font-semibold text-slate-800 dark:text-white mb-6 flex items-center">
          <Settings className="mr-3 text-blue-600" />
          Historical Settings
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Year/War</Label>
            <Input 
              type="text" 
              placeholder="e.g., World War I, 1863"
              value={formData.yearWar}
              onChange={(e) => onFormChange('yearWar', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Side/Faction</Label>
            <Input 
              type="text" 
              placeholder="e.g., Union, Confederate, British"
              value={formData.side}
              onChange={(e) => onFormChange('side', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Military Rank</Label>
            <Input 
              type="text" 
              placeholder="e.g., Captain, Lieutenant, General"
              value={formData.rank}
              onChange={(e) => onFormChange('rank', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Branch of Service</Label>
            <Select value={formData.branch} onValueChange={(value) => onFormChange('branch', value)}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select Branch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="infantry">Infantry</SelectItem>
                <SelectItem value="cavalry">Cavalry</SelectItem>
                <SelectItem value="artillery">Artillery</SelectItem>
                <SelectItem value="navy">Navy</SelectItem>
                <SelectItem value="airforce">Air Force</SelectItem>
                <SelectItem value="marines">Marines</SelectItem>
                <SelectItem value="engineers">Engineers</SelectItem>
                <SelectItem value="medical">Medical Corps</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-6">
          <Label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Additional Details</Label>
          <Textarea 
            placeholder="Any specific details about uniform, decorations, setting, etc."
            value={formData.extraDetails}
            onChange={(e) => onFormChange('extraDetails', e.target.value)}
            className="mt-1 h-24 resize-none"
          />
        </div>
      </CardContent>
    </Card>
  );
}