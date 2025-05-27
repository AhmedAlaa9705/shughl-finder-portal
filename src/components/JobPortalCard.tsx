
import { LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface JobPortalCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradientFrom: string;
  gradientTo: string;
  onClick: () => void;
}

const JobPortalCard = ({ 
  title, 
  description, 
  icon: Icon, 
  gradientFrom, 
  gradientTo, 
  onClick 
}: JobPortalCardProps) => {
  return (
    <Card 
      className={`cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl bg-gradient-to-br ${gradientFrom} ${gradientTo} border-0 text-white group`}
      onClick={onClick}
    >
      <CardContent className="p-8 text-center">
        <div className="mb-6 flex justify-center">
          <div className="rounded-full bg-white/20 p-4 group-hover:bg-white/30 transition-colors">
            <Icon size={48} className="text-white" />
          </div>
        </div>
        <h2 className="text-2xl font-bold mb-3 text-white">{title}</h2>
        <p className="text-white/90 leading-relaxed">{description}</p>
        <div className="mt-6 inline-flex items-center text-white/80 group-hover:text-white transition-colors">
          <span className="ml-2">ابدأ الآن</span>
          <svg 
            className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobPortalCard;
