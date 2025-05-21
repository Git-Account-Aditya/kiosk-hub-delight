
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import SearchBar from '@/components/SearchBar';
import VendorCard from '@/components/VendorCard';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HygieneRating from '@/components/HygieneRating';

// Mock data for featured vendors
const featuredVendors = [
  {
    id: '1',
    name: 'Sharma Ji Chaat Corner',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['Chaat', 'Snacks'],
    location: 'Connaught Place, Delhi',
    hygieneRating: 4.5,
    distance: '1.2 km',
    featured: true,
  },
  {
    id: '2',
    name: 'Mumbai Pav Bhaji',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['Pav Bhaji', 'Mumbai Street Food'],
    location: 'Juhu Beach, Mumbai',
    hygieneRating: 4.2,
    featured: true,
  },
  {
    id: '3',
    name: 'Chennai Dosa House',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    cuisineType: ['South Indian', 'Dosa'],
    location: 'T. Nagar, Chennai',
    hygieneRating: 4.7,
    featured: true,
  },
];

// Categories for food categories section
const categories = [
  { name: 'Chaat', image: 'https://images.unsplash.com/photo-1602833280958-1485791beded?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
  { name: 'Street Wraps', image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
  { name: 'South Indian', image: 'https://images.unsplash.com/photo-1630383249896-25914cc86d9c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
  { name: 'Kebabs', image: 'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80' },
];

const HomePage = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-primary to-primary-dark text-white py-20">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary opacity-70"></div>
          </div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Discover Authentic Street Food Near You
              </h1>
              <p className="text-lg md:text-xl mb-8">
                Connecting food lovers to hygiene-certified street vendors across India
              </p>
              <div className="max-w-xl mx-auto">
                <SearchBar />
              </div>
              <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
                <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
                  <Link to="/vendors">Browse Vendors</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
                  <Link to="/vendor/register">Join as Vendor</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Vendors Section */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Featured Vendors</h2>
              <Link to="/vendors" className="text-primary hover:text-primary-dark font-medium">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredVendors.map((vendor) => (
                <VendorCard key={vendor.id} {...vendor} />
              ))}
            </div>
          </div>
        </section>

        {/* Food Categories */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
              Explore Food Categories
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Link 
                  key={category.name}
                  to={`/vendors?category=${encodeURIComponent(category.name)}`} 
                  className="group relative overflow-hidden rounded-lg h-40"
                >
                  <img 
                    src={category.image} 
                    alt={category.name} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end">
                    <span className="text-white font-medium p-4">{category.name}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How KioskHub Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our platform helps street food vendors improve their hygiene practices while connecting them with food lovers.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="mx-auto bg-primary rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  1
                </div>
                <h3 className="text-xl font-semibold mb-2">Find Local Vendors</h3>
                <p className="text-gray-600">
                  Discover street food vendors in your area with transparent hygiene ratings and reviews.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto bg-primary rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  2
                </div>
                <h3 className="text-xl font-semibold mb-2">Rate the Experience</h3>
                <p className="text-gray-600">
                  Provide feedback about food quality and hygiene practices to help vendors improve.
                </p>
              </div>
              
              <div className="text-center">
                <div className="mx-auto bg-primary rounded-full w-16 h-16 flex items-center justify-center text-white text-2xl font-bold mb-4">
                  3
                </div>
                <h3 className="text-xl font-semibold mb-2">Support Local Vendors</h3>
                <p className="text-gray-600">
                  Order food directly or visit vendors with confidence, knowing their hygiene standards.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Hygiene Standards */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white rounded-xl overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:w-1/2">
                  <img 
                    src="https://images.unsplash.com/photo-1612859840537-8e9635ac95ec?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Hygiene Standards" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:w-1/2 p-8">
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Hygiene Rating System</h2>
                  <p className="text-gray-600 mb-6">
                    We've developed a comprehensive hygiene rating system to ensure that street food can be both delicious and safe.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <HygieneRating rating={5} />
                      <span className="ml-3 font-medium">Excellent hygiene practices</span>
                    </div>
                    <div className="flex items-center">
                      <HygieneRating rating={4} />
                      <span className="ml-3 font-medium">Very good standards</span>
                    </div>
                    <div className="flex items-center">
                      <HygieneRating rating={3} />
                      <span className="ml-3 font-medium">Acceptable standards</span>
                    </div>
                    <div className="flex items-center">
                      <HygieneRating rating={2} />
                      <span className="ml-3 font-medium">Needs improvement</span>
                    </div>
                    <div className="flex items-center">
                      <HygieneRating rating={1} />
                      <span className="ml-3 font-medium">Poor hygiene standards</span>
                    </div>
                  </div>
                  
                  <Button asChild className="mt-6 bg-primary hover:bg-primary-dark">
                    <Link to="/hygiene-standards">Learn More</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-primary to-primary-dark text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Are You a Street Food Vendor?</h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Join KioskHub to reach more customers, improve your hygiene practices, and grow your business.
            </p>
            <Button asChild size="lg" className="bg-white text-primary hover:bg-gray-100">
              <Link to="/vendor/register">Register as a Vendor</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
