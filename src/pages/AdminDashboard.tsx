
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { LogOut, Settings, User, Search, AlertCircle, CheckCircle, XCircle, MoreHorizontal } from 'lucide-react';
import HygieneRating from '@/components/HygieneRating';
import { toast } from 'sonner';

// Mock data
const vendorsData = [
  {
    id: '1',
    name: 'Sharma Ji Chaat Corner',
    owner: 'Rakesh Sharma',
    location: 'Connaught Place, Delhi',
    hygieneRating: 4.5,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    lastReview: '2023-09-18'
  },
  {
    id: '2',
    name: 'Mumbai Pav Bhaji',
    owner: 'Sanjay Patel',
    location: 'Juhu Beach, Mumbai',
    hygieneRating: 4.2,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    lastReview: '2023-09-15'
  },
  {
    id: '3',
    name: 'Chennai Dosa House',
    owner: 'Ramesh Iyer',
    location: 'T. Nagar, Chennai',
    hygieneRating: 1.7,
    status: 'warning',
    image: 'https://images.unsplash.com/photo-1505253758473-96b7015fcd40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    lastReview: '2023-09-10'
  },
  {
    id: '4',
    name: 'Kolkata Roll Centre',
    owner: 'Amit Das',
    location: 'Park Street, Kolkata',
    hygieneRating: 3.8,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1606755456206-b25206cde27e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    lastReview: '2023-09-05'
  },
  {
    id: '5',
    name: 'Punjabi Dhaba',
    owner: 'Gurpreet Singh',
    location: 'Chandigarh',
    hygieneRating: 3.0,
    status: 'warning',
    image: 'https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    lastReview: '2023-09-01'
  },
  {
    id: '6',
    name: 'Hyderabadi Biryani Stall',
    owner: 'Faisal Mohammed',
    location: 'Charminar, Hyderabad',
    hygieneRating: 4.3,
    status: 'active',
    image: 'https://images.unsplash.com/photo-1589302168068-964664d93dc0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
    lastReview: '2023-08-28'
  },
];

const pendingVendors = [
  {
    id: 'p1',
    name: 'Lucknow Kebabs',
    owner: 'Ali Khan',
    location: 'Hazratganj, Lucknow',
    submittedOn: '2023-09-18',
    status: 'pending',
    documents: {
      id: true,
      fssai: false,
      stall: true
    }
  },
  {
    id: 'p2',
    name: 'Amritsar Kulcha Corner',
    owner: 'Jaspreet Kaur',
    location: 'Hall Bazaar, Amritsar',
    submittedOn: '2023-09-17',
    status: 'pending',
    documents: {
      id: true,
      fssai: true,
      stall: true
    }
  }
];

const AdminDashboard = () => {
  const [vendors, setVendors] = useState(vendorsData);
  const [pending, setPending] = useState(pendingVendors);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Handle vendor status change
  const handleVendorStatusChange = (id: string, newStatus: 'active' | 'suspended' | 'warned') => {
    setVendors(vendors.map(vendor => 
      vendor.id === id ? { ...vendor, status: newStatus === 'warned' ? 'warning' : newStatus } : vendor
    ));
    
    toast.success(`Vendor status updated to ${newStatus}`);
  };
  
  // Handle approval of pending vendors
  const handleVendorApproval = (id: string, approve: boolean) => {
    // Remove from pending list
    setPending(pending.filter(vendor => vendor.id !== id));
    
    if (approve) {
      // Add to active vendors with initial data
      const approvedVendor = pending.find(vendor => vendor.id === id);
      if (approvedVendor) {
        setVendors([...vendors, {
          id: approvedVendor.id,
          name: approvedVendor.name,
          owner: approvedVendor.owner,
          location: approvedVendor.location,
          hygieneRating: 3.0, // Default initial rating
          status: 'active',
          image: 'https://images.unsplash.com/photo-1625242662167-a3ce27c203b1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80',
          lastReview: new Date().toISOString().split('T')[0]
        }]);
        toast.success(`${approvedVendor.name} has been approved`);
      }
    } else {
      toast.error(`Vendor application rejected`);
    }
  };
  
  // Filter vendors based on search query
  const filteredVendors = searchQuery 
    ? vendors.filter(vendor => 
        vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        vendor.location.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : vendors;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-primary text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center">
              <div className="font-bold text-xl">KioskHub</div>
              <span className="ml-4 px-2 py-1 text-xs bg-white/20 rounded">Admin Panel</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin User</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@kioskhub.com
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
        <div className="mb-8">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-gray-600">Manage vendors and monitor platform health</p>
        </div>
        
        {/* Dashboard stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Total Vendors</p>
                <h3 className="text-2xl font-bold mt-1">{vendors.length}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  <span className="text-green-600">↑ 2</span> new this week
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Approvals</p>
                <h3 className="text-2xl font-bold mt-1">{pending.length}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  Submitted in the last 7 days
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Low Hygiene Vendors</p>
                <h3 className="text-2xl font-bold mt-1">
                  {vendors.filter(v => v.hygieneRating < 3).length}
                </h3>
                <p className="text-xs text-text-gray-500 mt-1">
                  Require attention
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg. Hygiene Rating</p>
                <h3 className="text-2xl font-bold mt-1">
                  {(vendors.reduce((acc, v) => acc + v.hygieneRating, 0) / vendors.length).toFixed(1)}
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Across all active vendors
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Main content */}
        <Tabs defaultValue="all-vendors">
          <TabsList className="w-full mb-6">
            <TabsTrigger value="all-vendors" className="flex-1">All Vendors</TabsTrigger>
            <TabsTrigger value="approval" className="flex-1">
              Pending Approval
              {pending.length > 0 && (
                <Badge className="ml-2 bg-red-500">{pending.length}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="hygiene" className="flex-1">Hygiene Monitoring</TabsTrigger>
          </TabsList>
          
          {/* All Vendors Tab */}
          <TabsContent value="all-vendors">
            <Card>
              <CardHeader>
                <CardTitle>Registered Vendors</CardTitle>
                <CardDescription>
                  View and manage all vendors on KioskHub
                </CardDescription>
                <div className="mt-4 relative">
                  <Search className="absolute top-3 left-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search vendors by name or location..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Hygiene Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Review</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredVendors.map(vendor => (
                      <TableRow key={vendor.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-2">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={vendor.image} alt={vendor.name} />
                              <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{vendor.name}</p>
                              <p className="text-xs text-gray-500">{vendor.owner}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{vendor.location}</TableCell>
                        <TableCell>
                          <HygieneRating rating={vendor.hygieneRating} />
                        </TableCell>
                        <TableCell>
                          <Badge 
                            className={
                              vendor.status === 'active' 
                                ? 'bg-green-500' 
                                : vendor.status === 'warning' 
                                ? 'bg-amber-500' 
                                : 'bg-red-500'
                            }
                          >
                            {vendor.status === 'active' ? 'Active' : vendor.status === 'warning' ? 'Warning' : 'Suspended'}
                          </Badge>
                        </TableCell>
                        <TableCell>{vendor.lastReview}</TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={() => {}}>
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleVendorStatusChange(vendor.id, 'active')}>
                                Set as Active
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={() => handleVendorStatusChange(vendor.id, 'warned')}>
                                Issue Warning
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-500"
                                onClick={() => handleVendorStatusChange(vendor.id, 'suspended')}
                              >
                                Suspend Vendor
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Approval Tab */}
          <TabsContent value="approval">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Applications</CardTitle>
                <CardDescription>
                  Review and approve new vendor applications
                </CardDescription>
              </CardHeader>
              <CardContent>
                {pending.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Business Name</TableHead>
                        <TableHead>Owner</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Submitted On</TableHead>
                        <TableHead>Documents</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {pending.map(vendor => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">
                            {vendor.name}
                          </TableCell>
                          <TableCell>{vendor.owner}</TableCell>
                          <TableCell>{vendor.location}</TableCell>
                          <TableCell>{vendor.submittedOn}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Badge variant={vendor.documents.id ? "default" : "outline"}>
                                ID
                              </Badge>
                              <Badge variant={vendor.documents.fssai ? "default" : "outline"}>
                                FSSAI
                              </Badge>
                              <Badge variant={vendor.documents.stall ? "default" : "outline"}>
                                Photos
                              </Badge>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                onClick={() => handleVendorApproval(vendor.id, true)}
                                className="bg-green-500 hover:bg-green-600"
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Approve
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-red-500 border-red-300 hover:bg-red-50"
                                onClick={() => handleVendorApproval(vendor.id, false)}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <div className="text-center py-12">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <h3 className="mt-2 text-lg font-medium">All caught up!</h3>
                    <p className="mt-1 text-gray-500">There are no pending vendor applications</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Hygiene Tab */}
          <TabsContent value="hygiene">
            <Card>
              <CardHeader>
                <CardTitle>Hygiene Monitoring</CardTitle>
                <CardDescription>
                  Track and manage vendor hygiene ratings
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-100 h-64 rounded-lg flex items-center justify-center mb-6">
                  <p className="text-gray-500">Hygiene rating trends chart would be displayed here</p>
                </div>
                
                <h3 className="text-lg font-medium mb-4">Vendors Requiring Attention</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {vendors
                      .filter(vendor => vendor.hygieneRating < 3)
                      .map(vendor => (
                        <TableRow key={vendor.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={vendor.image} alt={vendor.name} />
                                <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{vendor.name}</p>
                                <p className="text-xs text-gray-500">{vendor.owner}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{vendor.location}</TableCell>
                          <TableCell>
                            <HygieneRating rating={vendor.hygieneRating} />
                          </TableCell>
                          <TableCell>
                            <Badge 
                              className={
                                vendor.status === 'active' 
                                  ? 'bg-green-500' 
                                  : vendor.status === 'warning' 
                                  ? 'bg-amber-500' 
                                  : 'bg-red-500'
                              }
                            >
                              {vendor.status === 'active' ? 'Active' : vendor.status === 'warning' ? 'Warning' : 'Suspended'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {}}
                              >
                                Contact
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                className="text-red-500 border-red-300 hover:bg-red-50"
                                onClick={() => handleVendorStatusChange(vendor.id, 'suspended')}
                              >
                                Suspend
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
                
                {vendors.filter(v => v.hygieneRating < 3).length === 0 && (
                  <div className="text-center py-6">
                    <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
                    <h3 className="mt-2 text-lg font-medium">All vendors are doing well!</h3>
                    <p className="mt-1 text-gray-500">No vendors with low hygiene ratings</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminDashboard;
