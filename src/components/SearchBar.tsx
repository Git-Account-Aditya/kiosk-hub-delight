
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface SearchBarProps {
  className?: string;
  placeholder?: string;
  buttonText?: string;
  fullWidth?: boolean;
}

const SearchBar = ({
  className = '',
  placeholder = 'Search for street food, vendors...',
  buttonText = 'Search',
  fullWidth = true,
}: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/vendors?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className={`flex items-center ${fullWidth ? 'w-full' : ''} ${className}`}
    >
      <div className="relative flex-grow">
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="pl-10 pr-4 py-3 rounded-l-lg"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Search className="h-5 w-5 text-gray-400" />
        </div>
      </div>
      <Button 
        type="submit" 
        className="bg-primary hover:bg-primary-dark rounded-r-lg"
      >
        {buttonText}
      </Button>
    </form>
  );
};

export default SearchBar;
