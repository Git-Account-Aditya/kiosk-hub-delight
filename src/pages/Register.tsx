
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Register = () => {
  // User registration state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userPhone, setUserPhone] = useState('');
  
  // Vendor registration state
  const [vendorName, setVendorName] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorBusinessName, setVendorBusinessName] = useState('');
  const [vendorBusinessType, setVendorBusinessType] = useState('');
  
  const handleUserRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to an authentication service
    console.log('User registration:', { userName, userEmail, userPassword, userPhone });
    toast.success('Registration successful!');
  };

  const handleVendorRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to a vendor registration service
    console.log('Vendor registration:', { 
      vendorName, 
      vendorEmail, 
      vendorPassword, 
      vendorPhone, 
      vendorBusinessName, 
      vendorBusinessType 
    });
    toast.success('Vendor registration submitted for approval!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">Customer Registration</TabsTrigger>
              <TabsTrigger value="vendor">Vendor Registration</TabsTrigger>
            </TabsList>
            
            {/* User Registration */}
            <TabsContent value="user">
              <Card>
                <CardHeader>
                  <CardTitle>Create a customer account</CardTitle>
                  <CardDescription>
                    Join KioskHub to discover and order from the best street food vendors
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUserRegister}>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <div className="grid gap-2">
                          <Label htmlFor="user-name">Full Name</Label>
                          <Input
                            id="user-name"
                            type="text"
                            placeholder="John Doe"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            required
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="user-phone">Phone Number</Label>
                          <Input
                            id="user-phone"
                            type="tel"
                            placeholder="+91 98765 43210"
                            value={userPhone}
                            onChange={(e) => setUserPhone(e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="user-email">Email</Label>
                        <Input
                          id="user-email"
                          type="email"
                          placeholder="name@example.com"
                          value={userEmail}
                          onChange={(e) => setUserEmail(e.target.value)}
                          required
                        />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="user-password">Password</Label>
                        <Input
                          id="user-password"
                          type="password"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          required
                        />
                        <p className="text-xs text-gray-500">
                          Password must be at least 8 characters long
                        </p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="user-terms" required />
                        <label
                          htmlFor="user-terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{' '}
                          <Link to="/terms" className="text-primary hover:underline">
                            terms of service
                          </Link>{' '}
                          and{' '}
                          <Link to="/privacy-policy" className="text-primary hover:underline">
                            privacy policy
                          </Link>
                        </label>
                      </div>
                      
                      <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                        Create Account
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{' '}
                    <Link to="/login" className="text-primary font-medium hover:underline">
                      Sign in
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Vendor Registration */}
            <TabsContent value="vendor">
              <Card>
                <CardHeader>
                  <CardTitle>Register as a Vendor</CardTitle>
                  <CardDescription>
                    Join KioskHub to expand your business and reach more customers
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVendorRegister}>
                    <div className="grid gap-6">
                      <div>
                        <h3 className="text-lg font-medium mb-4">Personal Information</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="vendor-name">Full Name</Label>
                            <Input
                              id="vendor-name"
                              type="text"
                              placeholder="John Doe"
                              value={vendorName}
                              onChange={(e) => setVendorName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="vendor-phone">Phone Number</Label>
                            <Input
                              id="vendor-phone"
                              type="tel"
                              placeholder="+91 98765 43210"
                              value={vendorPhone}
                              onChange={(e) => setVendorPhone(e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="vendor-email">Email</Label>
                            <Input
                              id="vendor-email"
                              type="email"
                              placeholder="vendor@example.com"
                              value={vendorEmail}
                              onChange={(e) => setVendorEmail(e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="vendor-password">Password</Label>
                            <Input
                              id="vendor-password"
                              type="password"
                              value={vendorPassword}
                              onChange={(e) => setVendorPassword(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Business Information</h3>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label htmlFor="vendor-business-name">Business Name</Label>
                            <Input
                              id="vendor-business-name"
                              type="text"
                              placeholder="Delhi Street Chaat"
                              value={vendorBusinessName}
                              onChange={(e) => setVendorBusinessName(e.target.value)}
                              required
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="vendor-business-type">Business Type</Label>
                            <Input
                              id="vendor-business-type"
                              type="text"
                              placeholder="Street Food Stall, Food Cart, etc."
                              value={vendorBusinessType}
                              onChange={(e) => setVendorBusinessType(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-lg font-medium mb-4">Required Documents</h3>
                        <p className="text-sm text-gray-600 mb-4">
                          To complete your registration, you'll need to provide the following documents:
                        </p>
                        <ul className="list-disc pl-5 text-sm text-gray-600 mb-4">
                          <li>Identity proof (Aadhar Card/PAN Card)</li>
                          <li>FSSAI certificate (if available)</li>
                          <li>Business location proof</li>
                          <li>Recent photographs of your food stall</li>
                        </ul>
                        <div className="grid gap-4">
                          <div className="grid gap-2">
                            <Label htmlFor="id-proof">Identity Proof</Label>
                            <Input id="id-proof" type="file" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="fssai">FSSAI Certificate (optional)</Label>
                            <Input id="fssai" type="file" />
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="stall-photo">Stall Photographs</Label>
                            <Input id="stall-photo" type="file" multiple />
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="vendor-terms" required />
                        <label
                          htmlFor="vendor-terms"
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                          I agree to the{' '}
                          <Link to="/vendor/terms" className="text-primary hover:underline">
                            vendor terms
                          </Link>{' '}
                          and hygiene standards
                        </label>
                      </div>
                      
                      <Button type="submit" className="w-full bg-primary hover:bg-primary-dark">
                        Submit Application
                      </Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <p className="text-sm text-gray-600">
                    Already registered?{' '}
                    <Link to="/login?tab=vendor" className="text-primary font-medium hover:underline">
                      Sign in to vendor dashboard
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Register;
