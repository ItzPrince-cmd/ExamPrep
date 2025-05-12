import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { useQuestionBank } from "@/context/QuestionBankContext";
import { QuestionItem } from "./QuestionItem";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { motion } from "framer-motion";

export function QuestionList() {
  const { questions, toggleQuestionSelection, selectAll, selectedIds } = useQuestionBank();
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 5;
  
  // Calculate pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = questions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(questions.length / questionsPerPage);
  
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.2 }}
      className="lg:col-span-3"
    >
      {/* Questions Header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-foreground">Questions</h2>
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="selectAll" 
              checked={selectedIds.length > 0 && selectedIds.length === questions.length}
              onCheckedChange={selectAll}
            />
            <label 
              htmlFor="selectAll" 
              className="text-sm cursor-pointer"
            >
              Select All
            </label>
          </div>
        </div>
      </div>
      
      {/* Questions Card */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {currentQuestions.map((question) => (
          <QuestionItem 
            key={question.id}
            question={question}
            isSelected={selectedIds.includes(question.id)}
            onToggleSelection={() => toggleQuestionSelection(question.id)}
          />
        ))}
        
        {questions.length === 0 && (
          <div className="p-8 text-center">
            <p className="text-muted-foreground">No questions found. Try changing the filters or retrieve questions.</p>
          </div>
        )}
      </div>
      
      {/* Pagination */}
      {questions.length > 0 && (
        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-medium">{indexOfFirstQuestion + 1}-{Math.min(indexOfLastQuestion, questions.length)}</span> of <span className="font-medium">{questions.length}</span> questions
          </p>
          
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: Math.min(5, totalPages) }).map((_, idx) => {
                let pageNum: number;
                
                // Logic to display pages around the current page
                if (totalPages <= 5) {
                  pageNum = idx + 1;
                } else {
                  if (currentPage <= 3) {
                    pageNum = idx + 1;
                  } else if (currentPage >= totalPages - 2) {
                    pageNum = totalPages - 4 + idx;
                  } else {
                    pageNum = currentPage - 2 + idx;
                  }
                }
                
                return (
                  <PaginationItem key={idx}>
                    <PaginationLink 
                      isActive={pageNum === currentPage}
                      onClick={() => paginate(pageNum)}
                    >
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                  <PaginationItem>
                    <PaginationLink onClick={() => paginate(totalPages)}>
                      {totalPages}
                    </PaginationLink>
                  </PaginationItem>
                </>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}
    </motion.div>
  );
}
