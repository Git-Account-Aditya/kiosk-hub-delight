
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [vendorEmail, setVendorEmail] = useState('');
  const [vendorPassword, setVendorPassword] = useState('');

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to an authentication service
    console.log('User login attempt:', { userEmail, userPassword });
    toast.success('Login successful!');
  };

  const handleVendorLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would connect to a vendor authentication service
    console.log('Vendor login attempt:', { vendorEmail, vendorPassword });
    toast.success('Vendor login successful!');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <Tabs defaultValue="user" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="user">Customer</TabsTrigger>
              <TabsTrigger value="vendor">Vendor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="user">
              <Card>
                <CardHeader>
                  <CardTitle>Customer Login</CardTitle>
                  <CardDescription>
                    Sign in to access your KioskHub account
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleUserLogin}>
                    <div className="grid gap-4">
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
                        <div className="flex items-center justify-between">
                          <Label htmlFor="user-password">Password</Label>
                          <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="user-password"
                          type="password"
                          value={userPassword}
                          onChange={(e) => setUserPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary-dark" type="submit">Sign in</Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                  <div className="text-sm text-gray-600">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary font-medium hover:underline">
                      Sign up
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="vendor">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Login</CardTitle>
                  <CardDescription>
                    Sign in to your vendor dashboard
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleVendorLogin}>
                    <div className="grid gap-4">
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
                        <div className="flex items-center justify-between">
                          <Label htmlFor="vendor-password">Password</Label>
                          <Link to="/vendor/forgot-password" className="text-sm text-primary hover:underline">
                            Forgot password?
                          </Link>
                        </div>
                        <Input
                          id="vendor-password"
                          type="password"
                          value={vendorPassword}
                          onChange={(e) => setVendorPassword(e.target.value)}
                          required
                        />
                      </div>
                      <Button className="w-full bg-primary hover:bg-primary-dark" type="submit">Sign in</Button>
                    </div>
                  </form>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                  <div className="text-sm text-gray-600">
                    Not registered as a vendor?{' '}
                    <Link to="/vendor/register" className="text-primary font-medium hover:underline">
                      Join KioskHub
                    </Link>
                  </div>
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

export default Login;
