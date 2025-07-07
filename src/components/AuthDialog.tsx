
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Eye, EyeOff, Key, User } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAuth: () => void;
}

const AuthDialog = ({ isOpen, onClose, onAuth }: AuthDialogProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isResetMode, setIsResetMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { toast } = useToast();

  const handleLogin = () => {
    const storedUsername = localStorage.getItem('portfolioOwnerUsername') || 'admin';
    const storedPassword = localStorage.getItem('portfolioOwnerPassword') || 'Talla@2025';

    if (username === storedUsername && password === storedPassword) {
      localStorage.setItem('portfolioAuthToken', 'authenticated');
      localStorage.setItem('portfolioAuthTime', Date.now().toString());
      onAuth();
      onClose();
      toast({
        title: "Login Successful",
        description: "Welcome back to your portfolio dashboard!",
      });
      setUsername('');
      setPassword('');
    } else {
      toast({
        title: "Login Failed",
        description: "Invalid username or password. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePasswordReset = () => {
    if (newPassword.length < 8) {
      toast({
        title: "Password Too Short",
        description: "Password must be at least 8 characters long.",
        variant: "destructive"
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: "Passwords Don't Match",
        description: "Please ensure both passwords match.",
        variant: "destructive"
      });
      return;
    }

    // Validate password strength
    const hasUpperCase = /[A-Z]/.test(newPassword);
    const hasLowerCase = /[a-z]/.test(newPassword);
    const hasNumbers = /\d/.test(newPassword);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(newPassword);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChar) {
      toast({
        title: "Weak Password",
        description: "Password must contain uppercase, lowercase, numbers, and special characters.",
        variant: "destructive"
      });
      return;
    }

    localStorage.setItem('portfolioOwnerPassword', newPassword);
    setIsResetMode(false);
    setNewPassword('');
    setConfirmPassword('');
    toast({
      title: "Password Reset Successful",
      description: "Your password has been updated successfully.",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center">
            {isResetMode ? 'Reset Password' : 'Owner Login'}
          </DialogTitle>
        </DialogHeader>
        
        <Card className="border-0 shadow-none">
          <CardContent className="space-y-4 p-0">
            {!isResetMode ? (
              <>
                <div className="space-y-2">
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="relative">
                    <Key className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <Button onClick={handleLogin} className="w-full">
                  Sign In
                </Button>

                <Button
                  variant="link"
                  onClick={() => setIsResetMode(true)}
                  className="w-full text-sm text-blue-600"
                >
                  Forgot Password?
                </Button>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Input
                    type="password"
                    placeholder="Confirm New Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>

                <div className="text-xs text-gray-500">
                  Password must contain: uppercase, lowercase, numbers, and special characters (minimum 8 characters)
                </div>

                <div className="flex gap-2">
                  <Button onClick={handlePasswordReset} className="flex-1">
                    Reset Password
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsResetMode(false)}
                    className="flex-1"
                  >
                    Back to Login
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
