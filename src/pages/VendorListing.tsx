
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import VendorCard from '@/components/VendorCard';
import SearchBar from '@/components/SearchBar';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { MapPin, Search, Filter } from 'lucide-react';

// Mock data for vendors
const allVendors = [
  {
    id: '1',
    name: 'Sharma Ji Chaat Corner',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['Chaat', 'Snacks'],
    location: 'Connaught Place, Delhi',
    hygieneRating: 4.5,
    distance: '1.2 km',
  },
  {
    id: '2',
    name: 'Mumbai Pav Bhaji',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['Pav Bhaji', 'Mumbai Street Food'],
    location: 'Juhu Beach, Mumbai',
    hygieneRating: 4.2,
  },
  {
    id: '3',
    name: 'Chennai Dosa House',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['South Indian', 'Dosa'],
    location: 'T. Nagar, Chennai',
    hygieneRating: 4.7,
  },
  {
    id: '4',
    name: 'Kolkata Roll Centre',
    image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['Rolls', 'Bengali'],
    location: 'Park Street, Kolkata',
    hygieneRating: 3.8,
  },
  {
    id: '5',
    name: 'Punjabi Dhaba',
    image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['North Indian', 'Punjabi'],
    location: 'Chandigarh',
    hygieneRating: 4.0,
    distance: '0.8 km',
  },
  {
    id: '6',
    name: 'Hyderabadi Biryani Stall',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['Biryani', 'Hyderabadi'],
    location: 'Charminar, Hyderabad',
    hygieneRating: 4.3,
  },
];

// Define available cuisine types
const cuisineTypes = [
  'Chaat', 
  'Snacks', 
  'Pav Bhaji', 
  'Mumbai Street Food', 
  'South Indian', 
  'Dosa', 
  'Rolls', 
  'Bengali', 
  'North Indian', 
  'Punjabi', 
  'Biryani', 
  'Hyderabadi'
];

const VendorListing = () => {
  const [searchParams] = useSearchParams();
  const [vendors, setVendors] = useState(allVendors);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    minRating: 0,
    cuisines: [] as string[],
  });

  // Effect to filter vendors based on URL parameters
  useEffect(() => {
    const searchQuery = searchParams.get('search') || '';
    const categoryQuery = searchParams.get('category') || '';
    
    let filtered = allVendors;
    
    // Filter by search term
    if (searchQuery) {
      filtered = filtered.filter(vendor => 
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.cuisineType.some(cuisine => cuisine.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (categoryQuery) {
      filtered = filtered.filter(vendor => 
        vendor.cuisineType.some(cuisine => cuisine.toLowerCase() === categoryQuery.toLowerCase())
      );
    }
    
    setVendors(filtered);
    
    // Update filters state
    setFilters(prev => ({
      ...prev, 
      search: searchQuery,
      category: categoryQuery,
    }));
  }, [searchParams]);

  // Apply additional filters
  const applyFilters = () => {
    let filtered = allVendors;
    
    // Apply hygiene rating filter
    if (filters.minRating > 0) {
      filtered = filtered.filter(vendor => vendor.hygieneRating >= filters.minRating);
    }
    
    // Apply cuisine filters
    if (filters.cuisines.length > 0) {
      filtered = filtered.filter(vendor => 
        vendor.cuisineType.some(cuisine => filters.cuisines.includes(cuisine))
      );
    }
    
    // Apply search filter
    if (filters.search) {
      filtered = filtered.filter(vendor => 
        vendor.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        vendor.location.toLowerCase().includes(filters.search.toLowerCase()) ||
        vendor.cuisineType.some(cuisine => cuisine.toLowerCase().includes(filters.search.toLowerCase()))
      );
    }
    
    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(vendor => 
        vendor.cuisineType.some(cuisine => cuisine.toLowerCase() === filters.category.toLowerCase())
      );
    }
    
    setVendors(filtered);
  };

  // Handle cuisine checkbox change
  const handleCuisineChange = (cuisine: string, checked: boolean) => {
    setFilters(prev => {
      const cuisines = checked 
        ? [...prev.cuisines, cuisine] 
        : prev.cuisines.filter(c => c !== cuisine);
      
      return { ...prev, cuisines };
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Find Street Food Vendors</h1>
            <p className="text-gray-600 mt-2">Discover the best street food vendors with hygiene ratings</p>
          </div>
          
          {/* Search bar */}
          <div className="mb-6">
            <SearchBar 
              placeholder="Search by vendor name, location, or cuisine..."
              buttonText="Search"
            />
          </div>
          
          <div className="lg:flex gap-8">
            {/* Filters */}
            <div className="lg:w-1/4 mb-6 lg:mb-0">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-medium">Filters</h2>
                  <button 
                    className="text-sm text-primary"
                    onClick={() => setFilters({ search: '', category: '', minRating: 0, cuisines: [] })}
                  >
                    Clear all
                  </button>
                </div>
                
                {/* Hygiene Rating Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Minimum Hygiene Rating</h3>
                  <div className="flex items-center space-x-2">
                    <Slider
                      defaultValue={[0]}
                      max={5}
                      step={1}
                      onValueChange={(value) => setFilters(prev => ({ ...prev, minRating: value[0] }))}
                    />
                    <span className="text-sm font-medium">{filters.minRating}</span>
                  </div>
                </div>
                
                {/* Cuisine Types */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Cuisine Types</h3>
                  <div className="space-y-2">
                    {cuisineTypes.slice(0, 6).map((cuisine) => (
                      <div key={cuisine} className="flex items-center">
                        <Checkbox 
                          id={`cuisine-${cuisine}`} 
                          checked={filters.cuisines.includes(cuisine)}
                          onCheckedChange={(checked) => handleCuisineChange(cuisine, checked as boolean)}
                        />
                        <Label htmlFor={`cuisine-${cuisine}`} className="ml-2 text-sm">
                          {cuisine}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
                
                <Button 
                  className="w-full bg-primary hover:bg-primary-dark"
                  onClick={applyFilters}
                >
                  Apply Filters
                </Button>
              </div>
            </div>
            
            {/* Vendor listings */}
            <div className="lg:w-3/4">
              {vendors.length > 0 ? (
                <>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-sm text-gray-600">{vendors.length} results found</p>
                    <Select defaultValue="rating">
                      <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Sort by" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="distance">Distance</SelectItem>
                        <SelectItem value="name">Name</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                    {vendors.map((vendor) => (
                      <VendorCard key={vendor.id} {...vendor} />
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <Search className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No vendors found</h3>
                  <p className="mt-1 text-gray-500">Try adjusting your search or filter criteria</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorListing;
