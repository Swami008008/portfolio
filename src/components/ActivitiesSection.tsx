
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Plus, ChevronDown, ChevronUp } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Activity } from '@/types/activity';
import ActivityCard from './ActivityCard';
import ActivityForm, { ActivityFormData } from './ActivityForm';

interface ActivitiesSectionProps {
  isOwnerView: boolean;
}

const ActivitiesSection = ({ isOwnerView }: ActivitiesSectionProps) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
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

  const handleAddActivity = (formData: ActivityFormData) => {
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

    setShowAddDialog(false);
    setEditingActivity(null);
  };

  const handleEditActivity = (activity: Activity) => {
    setEditingActivity(activity);
    setShowAddDialog(true);
  };

  const handleCloseDialog = () => {
    setShowAddDialog(false);
    setEditingActivity(null);
  };

  const handleDeleteActivity = (id: number) => {
    const updatedActivities = activities.filter(activity => activity.id !== id);
    saveActivities(updatedActivities);
    toast({
      title: "Activity Deleted",
      description: "The activity has been successfully deleted.",
    });
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
            <ActivityCard
              key={activity.id}
              activity={activity}
              isOwnerView={isOwnerView}
              onEdit={handleEditActivity}
              onDelete={handleDeleteActivity}
            />
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

        <ActivityForm
          showDialog={showAddDialog}
          editingActivity={editingActivity}
          onClose={handleCloseDialog}
          onSubmit={handleAddActivity}
        />
      </div>
    </section>
  );
};

export default ActivitiesSection;
