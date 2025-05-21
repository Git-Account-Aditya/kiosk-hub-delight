
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HygieneRating from '@/components/HygieneRating';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock, Phone, Star, Plus, Minus, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';

// Mock vendor data
const vendorData = {
  id: '1',
  name: 'Sharma Ji Chaat Corner',
  images: [
    'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1533630018502-93712df7bae9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1568044733993-62bdbb83b7a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  ],
  cuisineType: ['Chaat', 'Snacks', 'Street Food'],
  location: 'Connaught Place, Delhi',
  coordinates: { lat: 28.6329, lng: 77.2195 },
  phone: '+91 9876543210',
  openingHours: '11:00 AM - 9:00 PM',
  hygieneRating: 4.5,
  reviewCount: 128,
  description: 'Sharma Ji Chaat Corner offers authentic Delhi-style chaat with a focus on cleanliness and quality. Our specialty is Golgappas and Aloo Tikki that have been loved by customers for over 25 years.',
  menu: [
    {
      id: 'm1',
      name: 'Golgappa (6 pcs)',
      price: 50,
      description: 'Crispy hollow puris filled with flavored water, potatoes, and chickpeas',
      image: 'https://images.unsplash.com/photo-1604391382271-c31d486ab751?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm2',
      name: 'Aloo Tikki Chaat',
      price: 80,
      description: 'Potato patties topped with yogurt, chutneys, and spices',
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm3',
      name: 'Papdi Chaat',
      price: 90,
      description: 'Crispy fried dough wafers with potatoes, chickpeas, yogurt, and chutneys',
      image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm4',
      name: 'Bhalla Papdi',
      price: 100,
      description: 'Soft lentil dumplings with yogurt and tangy chutneys',
      image: 'https://images.unsplash.com/photo-1539735176222-76a18044a33d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
  ],
  reviews: [
    {
      id: 'r1',
      user: 'Priya S.',
      date: '2023-09-15',
      rating: 5,
      comment: 'Best golgappas in Delhi! Very clean preparation and fresh ingredients.',
    },
    {
      id: 'r2',
      user: 'Rahul K.',
      date: '2023-09-10',
      rating: 4,
      comment: 'Great taste and good hygiene. The aloo tikki is amazing but the service can be a bit slow during peak hours.',
    },
    {
      id: 'r3',
      user: 'Meera P.',
      date: '2023-08-28',
      rating: 5,
      comment: 'I was surprised by how clean the stall was. The papdi chaat was delicious and perfectly balanced.',
    },
  ],
};

const VendorDetail = () => {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [cart, setCart] = useState<{id: string, name: string, price: number, quantity: number}[]>([]);
  const [ratingValue, setRatingValue] = useState<number>(5);
  const [reviewComment, setReviewComment] = useState('');

  // Handle adding items to cart
  const addToCart = (item: {id: string, name: string, price: number}) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
      setCart(cart.map(cartItem => 
        cartItem.id === item.id 
          ? { ...cartItem, quantity: cartItem.quantity + 1 } 
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
    
    toast.success(`Added ${item.name} to cart`);
  };

  // Handle changing item quantity in cart
  const updateQuantity = (itemId: string, change: number) => {
    const updatedCart = cart.map(item => {
      if (item.id === itemId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
      }
      return item;
    }).filter(Boolean) as typeof cart;
    
    setCart(updatedCart);
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  // Handle submitting a review
  const submitReview = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Thank you for your review!');
    setReviewComment('');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Vendor Header */}
          <div className="mb-6">
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">{vendorData.name}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-2">
                  {vendorData.cuisineType.map(cuisine => (
                    <Badge key={cuisine} variant="outline">
                      {cuisine}
                    </Badge>
                  ))}
                  <div className="flex items-center ml-2 text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{vendorData.location}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <HygieneRating rating={vendorData.hygieneRating} size="lg" />
                <p className="text-sm text-gray-500 mt-1">{vendorData.reviewCount} reviews</p>
              </div>
            </div>
          </div>

          {/* Vendor Image Gallery */}
          <div className="mb-8">
            <div className="h-80 overflow-hidden rounded-lg mb-2">
              <img 
                src={vendorData.images[selectedImage]} 
                alt={vendorData.name} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2 overflow-x-auto">
              {vendorData.images.map((image, index) => (
                <div 
                  key={index}
                  className={`h-20 w-20 flex-shrink-0 cursor-pointer rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-primary' : ''}`}
                  onClick={() => setSelectedImage(index)}
                >
                  <img 
                    src={image} 
                    alt={`${vendorData.name} - image ${index + 1}`} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Vendor Info and Tabs */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Basic Info */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">About this Vendor</h2>
                  <p className="text-gray-600 mb-4">{vendorData.description}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center">
                      <Clock className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">Opening Hours</p>
                        <p className="text-gray-600">{vendorData.openingHours}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Phone className="h-5 w-5 text-gray-500 mr-2" />
                      <div>
                        <p className="text-sm font-medium">Contact</p>
                        <p className="text-gray-600">{vendorData.phone}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Tabs for Menu and Reviews */}
              <Tabs defaultValue="menu">
                <TabsList className="w-full">
                  <TabsTrigger value="menu" className="flex-1">Menu</TabsTrigger>
                  <TabsTrigger value="reviews" className="flex-1">Reviews</TabsTrigger>
                  <TabsTrigger value="location" className="flex-1">Location</TabsTrigger>
                </TabsList>
                
                {/* Menu Tab */}
                <TabsContent value="menu">
                  <Card>
                    <CardContent className="p-6">
                      <div className="space-y-6">
                        {vendorData.menu.map(item => (
                          <div key={item.id} className="flex gap-4">
                            <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                              <img 
                                src={item.image} 
                                alt={item.name} 
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex justify-between">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="font-medium">₹{item.price}</p>
                              </div>
                              <p className="text-sm text-gray-500 mt-1">{item.description}</p>
                              <Button 
                                size="sm" 
                                className="mt-2 bg-primary hover:bg-primary-dark"
                                onClick={() => addToCart({id: item.id, name: item.name, price: item.price})}
                              >
                                <Plus className="h-4 w-4 mr-1" /> Add to Cart
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-6">
                        <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
                        <div className="space-y-4">
                          {vendorData.reviews.map(review => (
                            <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                              <div className="flex justify-between">
                                <div className="font-medium">{review.user}</div>
                                <div className="text-sm text-gray-500">{review.date}</div>
                              </div>
                              <HygieneRating rating={review.rating} size="sm" className="my-1" />
                              <p className="text-gray-600">{review.comment}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Write a Review</h3>
                        <form onSubmit={submitReview}>
                          <div className="mb-4">
                            <label className="block text-sm font-medium mb-2">Your Hygiene Rating</label>
                            <div className="flex gap-2">
                              {[1, 2, 3, 4, 5].map(rating => (
                                <button
                                  key={rating}
                                  type="button"
                                  onClick={() => setRatingValue(rating)}
                                  className="focus:outline-none"
                                >
                                  <Star 
                                    className={`h-6 w-6 ${rating <= ratingValue ? 'text-amber-500 fill-amber-500' : 'text-gray-300'}`} 
                                  />
                                </button>
                              ))}
                            </div>
                          </div>
                          <div className="mb-4">
                            <label htmlFor="comment" className="block text-sm font-medium mb-2">
                              Your Review
                            </label>
                            <Textarea
                              id="comment"
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              placeholder="Share your experience about food quality and hygiene..."
                              className="h-24"
                              required
                            />
                          </div>
                          <Button type="submit" className="bg-primary hover:bg-primary-dark">
                            Submit Review
                          </Button>
                        </form>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                {/* Location Tab */}
                <TabsContent value="location">
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-medium mb-4">Vendor Location</h3>
                      <div className="bg-gray-200 h-64 rounded-lg flex items-center justify-center mb-4">
                        <div className="text-center p-4">
                          <MapPin className="h-8 w-8 mx-auto text-primary" />
                          <p className="mt-2">
                            Interactive map would be displayed here in a production environment.
                          </p>
                          <p className="text-sm text-gray-600">
                            Location: {vendorData.location}
                          </p>
                        </div>
                      </div>
                      <Button className="w-full">
                        Get Directions
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Order Summary Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Your Order</h2>
                    
                    {cart.length > 0 ? (
                      <div className="space-y-4">
                        {cart.map(item => (
                          <div key={item.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{item.name}</p>
                              <p className="text-sm text-gray-600">₹{item.price} x {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => updateQuantity(item.id, -1)}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span>{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, 1)}
                                className="p-1 rounded-full hover:bg-gray-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                        
                        <Separator />
                        
                        <div className="flex justify-between font-medium">
                          <span>Total</span>
                          <span>₹{cartTotal}</span>
                        </div>
                        
                        <div className="space-y-4 mt-4">
                          <Input placeholder="Any special instructions?" />
                          <Button className="w-full bg-primary hover:bg-primary-dark">
                            <ShoppingCart className="h-4 w-4 mr-2" />
                            Checkout
                          </Button>
                          <Button variant="outline" className="w-full" onClick={() => setCart([])}>
                            Clear Cart
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <ShoppingCart className="h-12 w-12 mx-auto text-gray-400" />
                        <p className="mt-2 text-gray-600">Your cart is empty</p>
                        <p className="text-sm text-gray-500">Add items from the menu to place an order</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorDetail;
