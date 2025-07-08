
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { useToast } from '@/hooks/use-toast';
import { User, Mail, Lock } from 'lucide-react';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: () => void;
}

const AuthDialog = ({ isOpen, onClose, onAuth }: AuthDialogProps) => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState('');
  const { toast } = useToast();

  const OWNER_EMAIL = 'swamiself008@gmail.com';

  const handleSendOtp = () => {
    if (email !== OWNER_EMAIL) {
      toast({
        title: "Access Denied",
        description: "Only the owner email is allowed",
        variant: "destructive",
      });
      return;
    }

    // Generate 6-digit OTP
    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(newOtp);
    setShowOtpInput(true);

    // In a real app, you would send this OTP via email
    // For demo purposes, we'll show it in a toast
    toast({
      title: "OTP Generated",
      description: `Your OTP is: ${newOtp} (In production, this would be sent to your email)`,
    });
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      localStorage.setItem('portfolioAuthToken', 'authenticated');
      localStorage.setItem('portfolioAuthTime', Date.now().toString());
      onAuth();
      onClose();
      resetForm();
      toast({
        title: "Login Successful",
        description: "Welcome to owner mode!",
      });
    } else {
      toast({
        title: "Invalid OTP",
        description: "Please enter the correct OTP",
        variant: "destructive",
      });
    }
  };

  const resetForm = () => {
    setEmail('');
    setOtp('');
    setShowOtpInput(false);
    setGeneratedOtp('');
  };


  return (
    <Dialog open={isOpen} onOpenChange={() => { onClose(); resetForm(); }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Owner Login</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {!showOtpInput ? (
            <>
              <div>
                <Label htmlFor="email">Owner Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
              </div>
              <Button onClick={handleSendOtp} className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Send OTP
              </Button>
            </>
          ) : (
            <>
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Enter the 6-digit OTP sent to {email}
                </p>
                <InputOTP
                  maxLength={6}
                  value={otp}
                  onChange={(value) => setOtp(value)}
                >
                  <InputOTPGroup>
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleVerifyOtp} className="flex-1" disabled={otp.length !== 6}>
                  <Lock className="w-4 h-4 mr-2" />
                  Verify OTP
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setShowOtpInput(false)}
                  className="flex-1"
                >
                  Back
                </Button>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
