import { StarHalf, X } from "lucide-react";
import { motion } from "framer-motion";

interface TrialBannerProps {
  onDismiss?: () => void;
}

export function TrialBanner({ onDismiss }: TrialBannerProps) {
  return (
    <motion.div 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      className="bg-accent/10 border-b border-accent/30"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-6 w-6 rounded-full bg-accent text-accent-foreground items-center justify-center">
              <StarHalf size={14} />
            </div>
            <p className="text-sm font-medium">
              <span className="font-semibold">Trial Version:</span> You can create <span className="font-semibold">2</span> question papers for trial version.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <p className="hidden sm:block text-sm text-muted-foreground">
              Please contact <span className="text-primary font-medium">91-7891982757</span> or <span className="text-primary font-medium">91-9090902757</span> for Subscription.
            </p>
            <button 
              onClick={onDismiss}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Dismiss trial notification"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
