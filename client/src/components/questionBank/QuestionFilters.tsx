import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useQuestionBank } from "@/context/QuestionBankContext";
import { 
  classOptions, 
  subjectOptions, 
  levelOptions, 
  typeOptions, 
  chapterOptions, 
  topicOptions 
} from "@/lib/utils";
import { motion } from "framer-motion";

export function QuestionFilters() {
  const { 
    filters, 
    updateFilter,
  } = useQuestionBank();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md p-5 mb-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Class Select */}
        <div>
          <Label htmlFor="class" className="text-sm font-medium mb-1.5 block">Class</Label>
          <Select value={filters.classLevel} onValueChange={(value) => updateFilter("classLevel", value)}>
            <SelectTrigger id="class" className="w-full focus:ring-primary">
              <SelectValue placeholder="Select class" />
            </SelectTrigger>
            <SelectContent>
              {classOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Subject Select */}
        <div>
          <Label htmlFor="subject" className="text-sm font-medium mb-1.5 block">Subject</Label>
          <Select value={filters.subject} onValueChange={(value) => updateFilter("subject", value)}>
            <SelectTrigger id="subject" className="w-full focus:ring-primary">
              <SelectValue placeholder="Select subject" />
            </SelectTrigger>
            <SelectContent>
              {subjectOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Question Level Select */}
        <div>
          <Label htmlFor="level" className="text-sm font-medium mb-1.5 block">Question Level</Label>
          <Select value={filters.level} onValueChange={(value) => updateFilter("level", value)}>
            <SelectTrigger id="level" className="w-full focus:ring-primary">
              <SelectValue placeholder="Select level" />
            </SelectTrigger>
            <SelectContent>
              {levelOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Question Type Select */}
        <div>
          <Label htmlFor="type" className="text-sm font-medium mb-1.5 block">Question Type</Label>
          <Select value={filters.type} onValueChange={(value) => updateFilter("type", value)}>
            <SelectTrigger id="type" className="w-full focus:ring-primary">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {typeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {/* Second Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        {/* Chapter Select */}
        <div className="lg:col-span-3">
          <Label htmlFor="chapter" className="text-sm font-medium mb-1.5 block">Chapter</Label>
          <Select value={filters.chapter} onValueChange={(value) => updateFilter("chapter", value)}>
            <SelectTrigger id="chapter" className="w-full focus:ring-primary">
              <SelectValue placeholder="Select chapter" />
            </SelectTrigger>
            <SelectContent>
              {chapterOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {/* Topic Select */}
        <div>
          <Label htmlFor="topic" className="text-sm font-medium mb-1.5 block">Topic</Label>
          <Select value={filters.topic} onValueChange={(value) => updateFilter("topic", value)}>
            <SelectTrigger id="topic" className="w-full focus:ring-primary">
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {topicOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
}
