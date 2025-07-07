
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, ArrowLeft, Upload, FileText } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ResumeViewer = () => {
  const [resumeUrl, setResumeUrl] = useState<string | null>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Load resume from localStorage on component mount
  useEffect(() => {
    const storedResume = localStorage.getItem('portfolioResume');
    const storedFileName = localStorage.getItem('portfolioResumeFileName');
    if (storedResume) {
      setResumeUrl(storedResume);
      setResumeFileName(storedFileName || 'Resume.pdf');
    }
  }, []);

  const handleDownload = () => {
    if (resumeUrl) {
      const link = document.createElement('a');
      link.href = resumeUrl;
      link.download = resumeFileName || 'Talla_Narayana_Swami_Resume.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Started",
        description: "Your resume is being downloaded.",
      });
    } else {
      toast({
        title: "No Resume Available",
        description: "Please upload a resume first.",
        variant: "destructive"
      });
    }
  };

  const handleBack = () => {
    window.history.back();
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setIsUploading(true);
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setResumeUrl(result);
        setResumeFileName(file.name);
        
        // Store in localStorage
        localStorage.setItem('portfolioResume', result);
        localStorage.setItem('portfolioResumeFileName', file.name);
        
        setIsUploading(false);
        toast({
          title: "Resume Uploaded",
          description: "Your resume has been uploaded successfully.",
        });
      };
      reader.readAsDataURL(file);
    } else {
      toast({
        title: "Invalid File",
        description: "Please upload a PDF file only.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={handleBack} className="flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Portfolio
          </Button>
          
          <h1 className="text-xl font-bold text-gray-800">Resume - Talla Narayana Swami</h1>
          
          <div className="flex gap-2">
            <div className="relative">
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                id="resume-upload"
              />
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Upload Resume
              </Button>
            </div>
            
            <Button 
              onClick={handleDownload} 
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!resumeUrl}
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Card className="max-w-4xl mx-auto bg-white shadow-lg">
          <CardContent className="p-0">
            {isUploading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-lg text-gray-600">Uploading resume...</p>
                </div>
              </div>
            ) : resumeUrl ? (
              <div className="w-full" style={{ height: '800px' }}>
                <iframe
                  src={resumeUrl}
                  className="w-full h-full border-0 rounded-lg"
                  title="Resume PDF Viewer"
                />
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="mb-6">
                  <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No Resume Uploaded</h3>
                  <p className="text-gray-500 mb-6">Upload your PDF resume to view and share it</p>
                </div>
                
                <div className="relative inline-block">
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Resume
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ResumeViewer;
