
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ShoppingCart, Calendar, Clock, AlertCircle, User, Settings, Bell, LogOut } from 'lucide-react';
import HygieneRating from '@/components/HygieneRating';
import { toast } from 'sonner';

// Mock data
const vendorData = {
  name: 'Sharma Ji Chaat Corner',
  avatar: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
  hygieneRating: 3.2,
  location: 'Connaught Place, Delhi',
  status: 'active',
  orders: {
    pending: 2,
    completed: 147,
    total: 149
  },
  reviews: [
    {
      id: 'r1',
      user: 'Priya S.',
      date: '2023-09-15',
      rating: 4,
      comment: 'Great taste but the area around the stall could be cleaner.',
    },
    {
      id: 'r2',
      user: 'Rahul K.',
      date: '2023-09-10',
      rating: 3,
      comment: 'Food was good but serving utensils need to be cleaned more regularly.',
    },
    {
      id: 'r3',
      user: 'Meera P.',
      date: '2023-08-28',
      rating: 2,
      comment: 'Noticed some flies around the food. Taste was okay but hygiene is a concern.',
    },
  ],
  menuItems: [
    {
      id: 'm1',
      name: 'Golgappa (6 pcs)',
      price: 50,
      available: true,
      image: 'https://images.unsplash.com/photo-1604391382271-c31d486ab751?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm2',
      name: 'Aloo Tikki Chaat',
      price: 80,
      available: true,
      image: 'https://images.unsplash.com/photo-1606491956689-2ea866880c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm3',
      name: 'Papdi Chaat',
      price: 90,
      available: false,
      image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
    {
      id: 'm4',
      name: 'Bhalla Papdi',
      price: 100,
      available: true,
      image: 'https://images.unsplash.com/photo-1539735176222-76a18044a33d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    },
  ],
  hygieneStats: {
    current: 3.2,
    last30Days: [3.0, 3.1, 3.2, 3.0, 2.9, 3.2, 3.3, 3.4, 3.2, 3.1],
    improvementTips: [
      'Use disposable gloves when handling food',
      'Keep food covered when not serving',
      'Clean utensils regularly with hot water',
      'Install a proper handwashing station',
      'Ensure proper waste disposal'
    ]
  },
  notifications: [
    {
      id: 'n1',
      type: 'alert',
      message: 'Your hygiene rating has fallen below 3.5! Take action now to improve.',
      date: '2023-09-18'
    },
    {
      id: 'n2',
      type: 'info',
      message: 'New hygiene guidelines have been published. Check them out.',
      date: '2023-09-15'
    },
    {
      id: 'n3',
      type: 'success',
      message: 'Congrats! You received 5 positive reviews this week.',
      date: '2023-09-10'
    }
  ]
};

const VendorDashboard = () => {
  const [menuItems, setMenuItems] = useState(vendorData.menuItems);
  const [newItem, setNewItem] = useState({ name: '', price: '', image: null });
  const [editing, setEditing] = useState<string | null>(null);
  const [editValues, setEditValues] = useState({ name: '', price: 0 });

  // Toggle menu item availability
  const toggleAvailability = (id: string) => {
    setMenuItems(menuItems.map(item => 
      item.id === id ? { ...item, available: !item.available } : item
    ));
    toast.success('Item availability updated');
  };

  // Start editing an item
  const startEditing = (item: typeof menuItems[0]) => {
    setEditing(item.id);
    setEditValues({ name: item.name, price: item.price });
  };

  // Save edited item
  const saveEditing = () => {
    if (!editing) return;
    
    setMenuItems(menuItems.map(item => 
      item.id === editing 
        ? { ...item, name: editValues.name, price: editValues.price } 
        : item
    ));
    
    setEditing(null);
    toast.success('Menu item updated');
  };

  // Handle hygiene improvement action
  const implementHygieneTip = (tip: string) => {
    toast.success(`Action taken: ${tip}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <Link to="/" className="font-bold text-xl">KioskHub</Link>
              <span className="ml-4 px-2 py-1 text-xs bg-white/20 rounded">Vendor Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-white/10">
                <Bell className="h-5 w-5" />
              </button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={vendorData.avatar} alt={vendorData.name} />
                      <AvatarFallback>SJ</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{vendorData.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        vendor@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Dashboard overview */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Welcome back, {vendorData.name.split(' ')[0]}!</h1>
          <p className="text-gray-600">Here's what's happening with your business today</p>
        </div>
        
        {/* Warning alert for low hygiene rating */}
        {vendorData.hygieneRating < 3.5 && (
          <Alert className="mb-8 border-red-200 bg-red-50">
            <AlertCircle className="h-4 w-4 text-red-500" />
            <AlertDescription className="text-red-700">
              <strong>Warning:</strong> Your hygiene rating is below 3.5. This could affect your visibility on KioskHub. 
              Please check the hygiene improvement tips.
            </AlertDescription>
          </Alert>
        )}
        
        {/* Stats overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Orders Today</p>
                  <h3 className="text-2xl font-bold mt-1">2</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    <span className="text-green-600">↑ 12%</span> from yesterday
                  </p>
                </div>
                <div className="p-2 bg-blue-50 rounded-full text-blue-700">
                  <ShoppingCart className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Hygiene Rating</p>
                  <div className="mt-1">
                    <HygieneRating rating={vendorData.hygieneRating} size="md" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Based on {vendorData.reviews.length} recent reviews
                  </p>
                </div>
                <div className={`p-2 rounded-full ${vendorData.hygieneRating >= 3.5 ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                  <AlertCircle className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Orders</p>
                  <h3 className="text-2xl font-bold mt-1">{vendorData.orders.total}</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Lifetime orders processed
                  </p>
                </div>
                <div className="p-2 bg-purple-50 rounded-full text-purple-700">
                  <Calendar className="h-5 w-5" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main dashboard content */}
        <Tabs defaultValue="menu">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="menu" className="flex-1">Menu Management</TabsTrigger>
            <TabsTrigger value="hygiene" className="flex-1">Hygiene Rating</TabsTrigger>
            <TabsTrigger value="reviews" className="flex-1">Customer Reviews</TabsTrigger>
            <TabsTrigger value="orders" className="flex-1">Orders</TabsTrigger>
          </TabsList>
          
          {/* Menu Management Tab */}
          <TabsContent value="menu">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Menu Items</CardTitle>
                  <CardDescription>
                    Manage your food items, prices, and availability
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {menuItems.map(item => (
                      <div key={item.id} className="flex gap-4 border-b pb-4 last:border-0">
                        <div className="h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="h-full w-full object-cover"
                          />
                        </div>
                        
                        {editing === item.id ? (
                          <div className="flex-1">
                            <div className="flex items-center gap-4 mb-2">
                              <Input
                                value={editValues.name}
                                onChange={(e) => setEditValues({...editValues, name: e.target.value})}
                                className="flex-1"
                              />
                              <Input
                                type="number"
                                value={editValues.price}
                                onChange={(e) => setEditValues({...editValues, price: parseInt(e.target.value) || 0})}
                                className="w-24"
                              />
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm" onClick={saveEditing}>
                                Save
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => setEditing(null)}>
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <div className="flex justify-between">
                              <h3 className="font-medium">{item.name}</h3>
                              <p className="font-medium">₹{item.price}</p>
                            </div>
                            
                            <div className="flex items-center justify-between mt-2">
                              <Badge variant={item.available ? "default" : "outline"} className={item.available ? "bg-green-500 hover:bg-green-600" : ""}>
                                {item.available ? "Available" : "Unavailable"}
                              </Badge>
                              
                              <div className="flex gap-2">
                                <Button size="sm" variant="outline" onClick={() => startEditing(item)}>
                                  Edit
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant={item.available ? "outline" : "default"} 
                                  onClick={() => toggleAvailability(item.id)}
                                >
                                  {item.available ? "Mark Unavailable" : "Mark Available"}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                    
                    <div className="border-t pt-6">
                      <h3 className="font-medium mb-4">Add New Item</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input 
                          placeholder="Item Name" 
                          value={newItem.name}
                          onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                        />
                        <Input 
                          placeholder="Price (₹)" 
                          type="number"
                          value={newItem.price}
                          onChange={(e) => setNewItem({...newItem, price: e.target.value})}
                        />
                      </div>
                      <div className="mt-4">
                        <Input type="file" />
                      </div>
                      <Button className="mt-4 bg-primary hover:bg-primary-dark">
                        Add Item
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Hygiene Rating Tab */}
          <TabsContent value="hygiene">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Hygiene Rating History</CardTitle>
                    <CardDescription>
                      Track your hygiene rating over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center">
                      <p className="text-gray-500">Rating history chart would be displayed here</p>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="font-medium mb-2">Recent Reviews Mentioning Hygiene</h3>
                      <div className="space-y-4 mt-4">
                        {vendorData.reviews.map(review => (
                          <div key={review.id} className="border-b pb-4 last:border-0">
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
                  </CardContent>
                </Card>
              </div>
              
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Improvement Tips</CardTitle>
                    <CardDescription>
                      Boost your hygiene rating with these actionable tips
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-4">
                      {vendorData.hygieneStats.improvementTips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <div className="rounded-full bg-green-100 text-green-700 p-1 mt-0.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <div className="flex-1">
                            <p className="text-sm">{tip}</p>
                            <Button 
                              size="sm" 
                              variant="link" 
                              className="p-0 h-auto text-primary"
                              onClick={() => implementHygieneTip(tip)}
                            >
                              Mark as implemented
                            </Button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="mt-6">
                      <h3 className="text-sm font-medium mb-2">Request Hygiene Training</h3>
                      <p className="text-sm text-gray-600 mb-2">
                        KioskHub offers free hygiene training sessions for vendors.
                      </p>
                      <Button className="w-full bg-primary hover:bg-primary-dark">
                        Schedule Training
                      </Button>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Hygiene Certification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 mb-4">
                        Upload your FSSAI certification to improve your vendor profile
                      </p>
                      <Input type="file" />
                      <Button className="w-full mt-4 bg-primary hover:bg-primary-dark">
                        Upload Certificate
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          {/* Reviews Tab */}
          <TabsContent value="reviews">
            <Card>
              <CardHeader>
                <CardTitle>Customer Reviews</CardTitle>
                <CardDescription>
                  View and respond to customer feedback
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {vendorData.reviews.map(review => (
                    <div key={review.id} className="border-b pb-6 last:border-0">
                      <div className="flex justify-between">
                        <div className="font-medium">{review.user}</div>
                        <div className="text-sm text-gray-500">{review.date}</div>
                      </div>
                      <HygieneRating rating={review.rating} size="sm" className="my-1" />
                      <p className="text-gray-600 mb-4">{review.comment}</p>
                      
                      <div>
                        <label htmlFor={`response-${review.id}`} className="block text-sm font-medium mb-2">
                          Your Response
                        </label>
                        <Textarea 
                          id={`response-${review.id}`} 
                          placeholder="Thank you for your feedback..." 
                          className="mb-2"
                        />
                        <Button size="sm">Send Response</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  Manage your current and past orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8">
                  <Clock className="h-12 w-12 mx-auto text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium">No active orders</h3>
                  <p className="mt-1 text-gray-500">New orders will appear here when customers place them</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default VendorDashboard;
