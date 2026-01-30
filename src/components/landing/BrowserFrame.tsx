import { ReactNode } from "react";
import { motion } from "framer-motion";

interface BrowserFrameProps {
  children: ReactNode;
  className?: string;
}

export const BrowserFrame = ({ children, className = "" }: BrowserFrameProps) => {
  return (
    <div className={`relative ${className}`}>
      {/* Browser chrome */}
      <div className="bg-card border border-border/50 rounded-t-xl overflow-hidden">
        {/* Title bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border/50">
        {/* Traffic lights */}
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-destructive/70" />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(45, 93%, 47%, 0.7)" }} />
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "hsl(142, 71%, 45%, 0.7)" }} />
        </div>
          
          {/* URL bar */}
          <div className="flex-1 mx-4">
            <div className="flex items-center gap-2 bg-background/50 rounded-lg px-3 py-1.5 text-sm text-muted-foreground">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-xs sm:text-sm">app.safespend.com</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content area */}
      <div className="bg-card border-x border-b border-border/50 rounded-b-xl overflow-hidden">
        {children}
      </div>

      {/* Live preview badge */}
      <motion.div
        className="absolute -top-3 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium shadow-lg">
          <motion.span
            className="w-2 h-2 rounded-full bg-primary-foreground"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          Live Preview
        </div>
      </motion.div>
    </div>
  );
};
