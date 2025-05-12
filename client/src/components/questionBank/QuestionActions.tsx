import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuestionBank } from "@/context/QuestionBankContext";
import { RefreshCcw, RotateCw, RotateCcw } from "lucide-react";
import { Label } from "@/components/ui/label";
import { motion } from "framer-motion";

export function QuestionActions() {
  const { 
    availableQuestions,
    usedQuestions,
    removeUsedQuestions,
    toggleRemoveUsedQuestions,
    toggleAutoGenerate,
    autoGenerate,
    fetchQuestions,
    resetFilters
  } = useQuestionBank();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="flex flex-wrap items-center justify-between gap-4 mb-6"
    >
      {/* Left Side Buttons */}
      <div className="flex flex-wrap items-center gap-3">
        <Button variant="default" className="flex items-center gap-2">
          <RefreshCcw size={16} />
          <span>Import Question</span>
        </Button>
        
        <div className="flex items-center bg-white rounded-lg shadow-sm overflow-hidden">
          <span className="px-3 py-2.5 bg-muted text-foreground font-medium text-sm">
            Available Ques: <span className="font-bold text-primary">{availableQuestions}</span>
          </span>
          <span className="px-3 py-2.5 text-foreground border-l text-sm">
            Used Ques: <span className="font-bold">{usedQuestions}</span>
          </span>
        </div>
        
        <div className="flex items-center gap-4 bg-white rounded-lg shadow-sm px-4 py-2.5">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="removeUsed" 
              checked={removeUsedQuestions}
              onCheckedChange={() => toggleRemoveUsedQuestions()}
            />
            <Label htmlFor="removeUsed" className="text-sm cursor-pointer">
              Remove Used Ques.
            </Label>
          </div>
          
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="autoGenerate" 
              checked={autoGenerate}
              onCheckedChange={() => toggleAutoGenerate()}
            />
            <Label htmlFor="autoGenerate" className="text-sm cursor-pointer">
              Auto Generate
            </Label>
          </div>
        </div>
      </div>
      
      {/* Right Side Buttons */}
      <div className="flex items-center space-x-3">
        <Button 
          variant="subtle" 
          className="flex items-center gap-2"
          onClick={fetchQuestions}
        >
          <RotateCw size={16} />
          <span>Retrieve Questions</span>
        </Button>
        
        <Button 
          variant="subtle" 
          className="flex items-center gap-2"
          onClick={resetFilters}
        >
          <RotateCcw size={16} />
          <span>Reset</span>
        </Button>
      </div>
    </motion.div>
  );
}
