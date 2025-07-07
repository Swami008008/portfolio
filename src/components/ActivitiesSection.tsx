
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Calendar, Clock, Plus, Edit, Image, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Activity {
  id: number;
  eventName: string;
  description: string;
  date: string;
  time: string;
  image?: string;
}

interface ActivitiesSectionProps {
  isOwnerView: boolean;
}

const ActivitiesSection = ({ isOwnerView }: ActivitiesSectionProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    eventName: '',
    description: '',
    date: '',
    time: '',
    image: ''
  });
  const { toast } = useToast();

  useEffect(() => {
    const storedActivities = localStorage.getItem('portfolioActivities');
    if (storedActivities) {
      setActivities(JSON.parse(storedActivities));
    }
  }, []);

  const saveActivities = (newActivities: Activity[]) => {
    setActivities(newActivities);
    localStorage.setItem('portfolioActivities', JSON.stringify(newActivities));
  };

  const handleAddActivity = () => {
    if (!formData.eventName || !formData.description || !formData.date) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    const newActivity: Activity = {
      id: Date.now(),
      eventName: formData.eventName,
      description: formData.description,
      date: formData.date,
      time: formData.time,
      image: formData.image
    };

    if (editingActivity) {
      const updatedActivities = activities.map(activity => 
        activity.id === editingActivity.id ? { ...newActivity, id: editingActivity.id } : activity
      );
      saveActivities(updatedActivities);
      toast({
        title: "Activity Updated",
        description: "Your activity has been successfully updated.",
      });
    } else {
      saveActivities([...activities, newActivity]);
      toast({
        title: "Activity Added",
        description: "Your activity has been successfully added.",
      });
    }

    setFormData({ eventName: '', description: '', date: '', time: '', image: '' });
    setShowAddDialog(false);
    setEditingActivity(null);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setFormData({
      eventName: activity.eventName,
      description: activity.description,
      date: activity.date,
      time: activity.time,
      image: activity.image || ''
    });
    setShowAddDialog(true);
  };

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

  const displayedActivities = isExpanded ? activities : activities.slice(0, 3);

  return (
    <section id="activities" className="py-20 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            My <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Activities</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
        </div>

        {isOwnerView && (
          <div className="mb-8 text-center">
            <Button 
              onClick={() => setShowAddDialog(true)}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Activity
            </Button>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {displayedActivities.map((activity) => (
            <Card key={activity.id} className="card-hover group">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg font-bold text-gray-800 mb-2">
                      {activity.eventName}
                    </CardTitle>
                    <div className="flex items-center text-sm text-gray-600 space-x-4">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {activity.date}
                      </div>
                      {activity.time && (
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {activity.time}
                        </div>
                      )}
                    </div>
                  </div>
                  {isOwnerView && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditActivity(activity)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {activity.image && (
                  <img 
                    src={activity.image} 
                    alt={activity.eventName}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                )}
                <p className="text-gray-700 leading-relaxed">
                  {activity.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {activities.length > 3 && (
          <div className="text-center mt-8">
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center space-x-2"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="w-4 h-4" />
                  <span>Show Less</span>
                </>
              ) : (
                <>
                  <ChevronDown className="w-4 h-4" />
                  <span>Show More ({activities.length - 3} more)</span>
                </>
              )}
            </Button>
          </div>
        )}

        {activities.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No Activities Yet</h3>
            <p className="text-gray-500">
              {isOwnerView ? "Add your first activity to get started!" : "Activities will be displayed here."}
            </p>
          </div>
        )}

        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
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
                <Button onClick={handleAddActivity} className="flex-1">
                  {editingActivity ? 'Update Activity' : 'Add Activity'}
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setShowAddDialog(false);
                    setEditingActivity(null);
                    setFormData({ eventName: '', description: '', date: '', time: '', image: '' });
                  }}
                  className="flex-1"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};

export default ActivitiesSection;
