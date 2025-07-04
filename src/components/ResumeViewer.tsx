
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download, ArrowLeft } from 'lucide-react';

const ResumeViewer = () => {
  const handleDownload = () => {
    // Implement PDF download functionality
    console.log('Downloading resume...');
  };

  const handleBack = () => {
    window.history.back();
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
          
          <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-4xl mx-auto">
          <div className="text-center text-gray-500 py-20">
            <p className="text-lg">Resume viewer will be implemented here</p>
            <p className="text-sm mt-2">PDF will be displayed once uploaded</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeViewer;
