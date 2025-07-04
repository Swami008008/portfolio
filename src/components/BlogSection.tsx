
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Edit, BookOpen, Calendar, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface BlogSectionProps {
  isOwnerView: boolean;
}

const BlogSection = ({ isOwnerView }: BlogSectionProps) => {
  const { toast } = useToast();

  const upcomingBlogs = [
    {
      title: "Introduction to SystemVerilog for VLSI Design",
      description: "A comprehensive guide to SystemVerilog features and their applications in modern VLSI design workflows.",
      category: "SystemVerilog",
      estimatedDate: "Coming Soon",
      readTime: "10 min read"
    },
    {
      title: "FPGA vs ASIC: Choosing the Right Platform",
      description: "Comparative analysis of FPGA and ASIC technologies for different design requirements and constraints.",
      category: "VLSI Design",
      estimatedDate: "Coming Soon",
      readTime: "8 min read"
    },
    {
      title: "Understanding FinFET Technology",
      description: "Deep dive into FinFET transistor technology and its impact on modern semiconductor design.",
      category: "Semiconductor Physics",
      estimatedDate: "Coming Soon",
      readTime: "12 min read"
    }
  ];

  const handleAddBlog = () => {
    toast({
      title: "Add New Blog",
      description: "Creating new blog post...",
    });
  };

  return (
    <section id="blog" className="py-20 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Technical <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Blog</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
          <p className="text-xl text-gray-600 mt-6 max-w-2xl mx-auto">
            Sharing knowledge and insights about VLSI design and digital electronics
          </p>
        </div>

        <div className="space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-bold text-gray-800">Upcoming Articles</h3>
            {isOwnerView && (
              <Button onClick={handleAddBlog}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Blog
              </Button>
            )}
          </div>

          {/* Coming Soon Message */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50">
            <CardContent className="p-8 text-center">
              <BookOpen className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Blog Coming Soon!</h3>
              <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
                I'm preparing high-quality technical content covering SystemVerilog, VLSI design methodologies, 
                and industry insights. Stay tuned for in-depth articles that will help you master digital design concepts.
              </p>
            </CardContent>
          </Card>

          {/* Upcoming Blog Posts Preview */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingBlogs.map((blog, index) => (
              <Card key={index} className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
                {isOwnerView && (
                  <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <div className="h-2 bg-gradient-to-r from-blue-500 to-indigo-500"></div>

                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mb-4">
                      <BookOpen className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  
                  <CardTitle className="text-lg font-bold text-gray-800 leading-tight group-hover:text-blue-600 transition-colors">
                    {blog.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {blog.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {blog.estimatedDate}
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {blog.readTime}
                    </div>
                  </div>

                  <div className="pt-2">
                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                      {blog.category}
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Newsletter Signup */}
          <Card className="border-0 shadow-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Be the first to know when new technical articles are published. 
                Get insights into VLSI design, SystemVerilog, and industry trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-white/50"
                />
                <Button className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 font-semibold rounded-lg transition-colors">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
