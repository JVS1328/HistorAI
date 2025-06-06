import { Card, CardContent } from "@/components/ui/card";

export function LoadingState() {
  return (
    <Card className="mb-8">
      <CardContent className="p-8 text-center">
        <div className="animate-spin inline-block w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full mb-4"></div>
        <h3 className="text-lg font-semibold text-slate-800 mb-2">Creating Your Historical Portrait</h3>
        <p className="text-slate-600">Please wait while our AI crafts your masterpiece...</p>
      </CardContent>
    </Card>
  );
}
