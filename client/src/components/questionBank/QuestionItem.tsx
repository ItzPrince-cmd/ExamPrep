import { Question } from "@/types";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface QuestionItemProps {
  question: Question;
  isSelected: boolean;
  onToggleSelection: () => void;
}

export function QuestionItem({ question, isSelected, onToggleSelection }: QuestionItemProps) {
  const { id, content, options, correctAnswer, hasDiagram, diagramSvg } = question;
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="border-b border-border hover:bg-muted/50 transition-all duration-200 question-card"
    >
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Question Selection Column */}
          <div className="flex flex-col items-center pt-1">
            <div className="w-5 h-5 rounded-md border border-border bg-white shadow-sm flex items-center justify-center">
              <Checkbox 
                className="h-3.5 w-3.5" 
                checked={isSelected}
                onCheckedChange={onToggleSelection}
              />
            </div>
            <div className="text-xs font-semibold text-muted-foreground mt-2">#{id}</div>
          </div>
          
          {/* Question Content */}
          <div className="flex-1">
            <div className="bg-muted/30 rounded-lg p-3 mb-3">
              <p className="text-foreground">{content}</p>
              
              {hasDiagram && (
                <div className="mt-3 flex justify-center">
                  <div className="bg-white rounded-lg border border-border p-2 w-32 h-32 flex items-center justify-center">
                    {diagramSvg ? (
                      <div dangerouslySetInnerHTML={{ __html: diagramSvg }} />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        Diagram
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
            
            {/* Question Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {options.map((option, index) => {
                const optionLabel = String.fromCharCode(97 + index); // a, b, c, d
                const isCorrect = correctAnswer === optionLabel;
                
                return (
                  <div key={index} className="flex items-start space-x-2">
                    <motion.div 
                      whileHover={{ scale: 1.05 }}
                      className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium option-circle",
                        isCorrect 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-muted text-foreground"
                      )}
                    >
                      {optionLabel}
                    </motion.div>
                    <div className={cn(
                      "flex items-center space-x-1 text-foreground",
                      isCorrect && "font-medium"
                    )}>
                      <span>{option}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
