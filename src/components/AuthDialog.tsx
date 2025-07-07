
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { User, Lock, RotateCcw } from 'lucide-react';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: () => void;
}

const AuthDialog = ({ isOpen, onClose, onAuth }: AuthDialogProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showReset, setShowReset] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = () => {
    const storedUsername = localStorage.getItem('portfolioUsername') || 'admin';
    const storedPassword = localStorage.getItem('portfolioPassword') || 'Talla@2025';

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('portfolioAuthToken', 'authenticated');
      localStorage.setItem('portfolioAuthTime', Date.now().toString());
      onAuth();
      onClose();
      toast({
        title: "Login Successful",
        description: "Welcome to owner mode!",
      });
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password",
        variant: "destructive",
      });
    }
  };

  const handlePasswordReset = () => {
    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long",
        variant: "destructive",
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please make sure both passwords match",
        variant: "destructive",
      });
      return;
    }

    localStorage.setItem('portfolioPassword', newPassword);
    setShowReset(false);
    setNewPassword('');
    setConfirmPassword('');
    toast({
      title: "Password Reset",
      description: "Your password has been successfully reset",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>{showReset ? 'Reset Password' : 'Owner Login'}</span>
          </DialogTitle>
        </DialogHeader>

        {!showReset ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <Button onClick={handleLogin} className="w-full">
                <Lock className="w-4 h-4 mr-2" />
                Login
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowReset(true)}
                className="w-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Forgot Password?
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password (min 8 chars)"
              />
            </div>
            <div>
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
              />
            </div>
            <div className="flex space-x-2">
              <Button onClick={handlePasswordReset} className="flex-1">
                Reset Password
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setShowReset(false)}
                className="flex-1"
              >
                Back to Login
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
