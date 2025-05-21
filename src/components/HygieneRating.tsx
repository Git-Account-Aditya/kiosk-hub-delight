
import React from 'react';
import { Star, StarHalf, StarOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface HygieneRatingProps {
  rating: number;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const HygieneRating: React.FC<HygieneRatingProps> = ({ 
  rating, 
  showText = true, 
  size = 'md',
  className
}) => {
  // Calculate full stars, half stars, and empty stars
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
  
  // Determine color class based on rating
  const getColorClass = () => {
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-amber-500';
    return 'text-red-500';
  };

  const colorClass = getColorClass();
  
  // Determine size class
  const sizeClass = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6'
  }[size];

  return (
    <div className={cn('flex items-center', className)}>
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} className={cn(sizeClass, colorClass)} fill="currentColor" />
        ))}
        {hasHalfStar && <StarHalf className={cn(sizeClass, colorClass)} fill="currentColor" />}
        {[...Array(emptyStars)].map((_, i) => (
          <StarOff key={`empty-${i}`} className={cn(sizeClass, 'text-gray-300')} />
        ))}
      </div>
      {showText && (
        <span className={cn('ml-2 text-sm font-medium', colorClass)}>
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default HygieneRating;
