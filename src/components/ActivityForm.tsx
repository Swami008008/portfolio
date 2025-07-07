
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, Image } from 'lucide-react';
import { Activity } from '@/types/activity';

interface ActivityFormProps {
  showDialog: boolean;
  editingActivity: Activity | null;
  onClose: () => void;
  onSubmit: (formData: ActivityFormData) => void;
}

export interface ActivityFormData {
  eventName: string;
  description: string;
  date: string;
  time: string;
  image: string;
}

const ActivityForm = ({ showDialog, editingActivity, onClose, onSubmit }: ActivityFormProps) => {
  const [formData, setFormData] = useState<ActivityFormData>({
    eventName: '',
    description: '',
    date: '',
    time: '',
    image: ''
  });

  useEffect(() => {
    if (editingActivity) {
      setFormData({
        eventName: editingActivity.eventName,
        description: editingActivity.description,
        date: editingActivity.date,
        time: editingActivity.time,
        image: editingActivity.image || ''
      });
    } else {
      setFormData({
        eventName: '',
        description: '',
        date: '',
        time: '',
        image: ''
      });
    }
  }, [editingActivity, showDialog]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setFormData({ ...formData, image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    onSubmit(formData);
  };

  const handleClose = () => {
    setFormData({ eventName: '', description: '', date: '', time: '', image: '' });
    onClose();
  };

  return (
    <Dialog open={showDialog} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Calendar className="w-5 h-5" />
            <span>{editingActivity ? 'Edit Activity' : 'Add New Activity'}</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="eventName">Event Name *</Label>
            <Input
              id="eventName"
              value={formData.eventName}
              onChange={(e) => setFormData({ ...formData, eventName: e.target.value })}
              placeholder="Enter event name"
            />
          </div>
          
          <div>
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Describe the activity"
              rows={3}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="image">Event Photo</Label>
            <div className="flex items-center space-x-2">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="flex-1"
              />
              <Image className="w-5 h-5 text-gray-400" />
            </div>
            {formData.image && (
              <img 
                src={formData.image} 
                alt="Preview" 
                className="mt-2 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
          
          <div className="flex space-x-2 pt-4">
            <Button onClick={handleSubmit} className="flex-1">
              {editingActivity ? 'Update Activity' : 'Add Activity'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActivityForm;
