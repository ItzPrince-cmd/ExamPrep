import { useQuestionBank } from "@/context/QuestionBankContext";
import { Button } from "@/components/ui/button";
import { X, BarChart2, FileText, Layers, Save } from "lucide-react";
import { truncateText } from "@/lib/utils";
import { motion } from "framer-motion";

export function SelectedQuestions() {
  const { selectedIds, questions, removeFromSelection, showSummary, generatePaper, sendToExam, savePaper } = useQuestionBank();
  
  const selectedQuestions = questions.filter(q => selectedIds.includes(q.id));

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      className="lg:col-span-1 space-y-6"
    >
      {/* Actions Card */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-xl shadow-lg p-5 text-white">
        <h3 className="text-lg font-semibold mb-4">Actions</h3>
        
        <div className="space-y-3">
          <Button 
            variant="default" 
            className="w-full bg-white text-primary hover:bg-white/90"
            onClick={showSummary}
          >
            <BarChart2 className="mr-2 h-4 w-4" />
            <span>Show Summary</span>
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full bg-white/10 hover:bg-white/20 text-white"
            onClick={generatePaper}
          >
            <FileText className="mr-2 h-4 w-4" />
            <span>Generate Paper</span>
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full bg-white/10 hover:bg-white/20 text-white"
            onClick={sendToExam}
          >
            <Layers className="mr-2 h-4 w-4" />
            <span>Send To JeeNeetExam</span>
          </Button>
          
          <Button 
            variant="secondary" 
            className="w-full bg-white/10 hover:bg-white/20 text-white"
            onClick={savePaper}
          >
            <Save className="mr-2 h-4 w-4" />
            <span>Save Paper</span>
          </Button>
        </div>
      </div>
      
      {/* Selected Questions Card */}
      <div className="bg-white rounded-xl shadow-md p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-foreground">Selected Questions</h3>
          <div className="h-6 w-6 rounded-full bg-primary text-white text-xs font-medium flex items-center justify-center">
            {selectedIds.length}
          </div>
        </div>
        
        <div className="h-64 overflow-y-auto custom-scrollbar">
          <div className="space-y-3">
            {selectedQuestions.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-4">
                No questions selected. Select questions to add them here.
              </p>
            ) : (
              selectedQuestions.map((question) => (
                <motion.div 
                  key={question.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="bg-muted/50 rounded-lg p-3 text-sm flex items-start justify-between"
                >
                  <div className="flex items-start space-x-2">
                    <span className="text-xs font-semibold text-muted-foreground bg-white px-1.5 py-0.5 rounded border border-border">
                      #{question.id}
                    </span>
                    <p className="text-foreground line-clamp-2">
                      {truncateText(question.content, 40)}
                    </p>
                  </div>
                  <button 
                    className="text-destructive hover:text-destructive/80 transition-all duration-150 flex-shrink-0 ml-2"
                    onClick={() => removeFromSelection(question.id)}
                  >
                    <X size={16} />
                  </button>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
