'use client';
import { ArrowRight, DollarSign, Heart, Users, Star, LineChart, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const LandingPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-light-green-50">
      <main className="flex-1">
        <section className="w-full py-16 lg:py-32 bg-light-green-100">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-6xl text-light-green-900">
                    Create and Discover Premium Blogs
                  </h1>
                  <p className="max-w-lg text-light-green-700 md:text-xl">
                    Join our community of passionate writers and readers. Create premium blogs and subscribe to exclusive content for just $10 a month.
                  </p>
                </div>
                <div className="flex space-x-4">
                  <Button>Get Started</Button>
                  <Button variant="outline">Learn More</Button>
                </div>
              </div>
              <img
                src="https://fastly.picsum.photos/id/13/2500/1667.jpg?hmac=SoX9UoHhN8HyklRA4A3vcCWJMVtiBXUg0W4ljWTor7s"
                alt="Blogging"
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </section>

        <section className="w-full py-16 lg:py-32">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold sm:text-5xl text-light-green-900">Why Choose Us?</h2>
              <p className="max-w-2xl mx-auto text-light-green-700 md:text-xl">
                Discover the benefits of joining our blog platform.
              </p>
            </div>
            <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-center space-y-4 p-6">
                <Heart className="h-12 w-12 text-light-green-900" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Exclusive Content</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-light-green-700">Get access to premium blogs not available anywhere else.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-4 p-6">
                <DollarSign className="h-12 w-12 text-light-green-900" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Affordable</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-light-green-700">Subscribe to high-quality content for just $10 a month.</p>
                </CardContent>
              </Card>
              <Card className="flex flex-col items-center space-y-4 p-6">
                <Users className="h-12 w-12 text-light-green-900" />
                <CardHeader>
                  <CardTitle className="text-lg font-bold">Community</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-light-green-700">Join a growing community of passionate writers and readers.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-16 lg:py-32 bg-light-green-100">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold sm:text-5xl text-light-green-900">What Our Users Say</h2>
              <p className="max-w-2xl mx-auto text-light-green-700 md:text-xl">
                Hear from our happy subscribers and bloggers.
              </p>
            </div>
            <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-start space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">John Doe</p>
                    <p className="text-xs text-light-green-700">Blogger</p>
                  </div>
                </div>
                <p className="text-light-green-700">
                  "This platform has given me the opportunity to reach a wider audience with my premium content. It's amazing!"
                </p>
              </Card>
              <Card className="flex flex-col items-start space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                    <AvatarFallback>SM</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">Sarah Miller</p>
                    <p className="text-xs text-light-green-700">Subscriber</p>
                  </div>
                </div>
                <p className="text-light-green-700">
                  "I love the variety of premium blogs available. The content is worth every penny."
                </p>
              </Card>
              <Card className="flex flex-col items-start space-y-4 p-6">
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src="https://picsum.photos/seed/picsum/200/300" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium leading-none">Michael Johnson</p>
                    <p className="text-xs text-light-green-700">Blogger</p>
                  </div>
                </div>
                <p className="text-light-green-700">
                  "The subscription model is a game-changer. It motivates me to create high-quality content."
                </p>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-16 lg:py-32">
          <div className="container px-6 md:px-12 lg:px-24">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold sm:text-5xl text-light-green-900">Pricing</h2>
              <p className="max-w-2xl mx-auto text-light-green-700 md:text-xl">
                Choose the plan that works best for you.
              </p>
            </div>
            <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-3">
              <Card className="flex flex-col items-start space-y-4 p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Basic</CardTitle>
                  <CardDescription className="text-4xl font-bold">
                    $5<span className="text-2xl font-medium text-light-green-700">/mo</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-light-green-700">
                    <li>Access to Free Blogs</li>
                    <li>Community Support</li>
                  </ul>
                </CardContent>
                <CardFooter className="w-full">
                  <Button className="w-full">Subscribe</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-start space-y-4 p-6 bg-light-green-900 text-light-green-100">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Premium</CardTitle>
                  <CardDescription className="text-4xl font-bold">
                    $10<span className="text-2xl font-medium">/mo</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li>Access to Premium Blogs</li>
                    <li>Exclusive Content</li>
                    <li>Priority Support</li>
                  </ul>
                </CardContent>
                <CardFooter className="w-full">
                  <Button className="w-full bg-light-green-100 text-light-green-900">Subscribe</Button>
                </CardFooter>
              </Card>
              <Card className="flex flex-col items-start space-y-4 p-6">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold">Pro</CardTitle>
                  <CardDescription className="text-4xl font-bold">
                    $20<span className="text-2xl font-medium text-light-green-700">/mo</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-light-green-700">
                    <li>All Premium Features</li>
                    <li>Dedicated Support</li>
                    <li>Early Access to New Features</li>
                  </ul>
                </CardContent>
                <CardFooter className="w-full">
                  <Button className="w-full">Subscribe</Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-light-green-900 text-light-green-100 py-8">
        <div className="container px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="font-semibold mb-2">Product</h3>
              <ul>
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Integrations</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">Security</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Company</h3>
              <ul>
                <li><a href="#" className="hover:underline">About Us</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Resources</h3>
              <ul>
                <li><a href="#" className="hover:underline">Documentation</a></li>
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Community</a></li>
                <li><a href="#" className="hover:underline">Templates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Legal</h3>
              <ul>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                <li><a href="#" className="hover:underline">Terms of Service</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;