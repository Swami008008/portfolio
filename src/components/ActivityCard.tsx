
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, Edit, Trash2 } from 'lucide-react';
import { Activity } from '@/types/activity';

interface ActivityCardProps {
  activity: Activity;
  isOwnerView: boolean;
  onEdit: (activity: Activity) => void;
  onDelete: (id: number) => void;
}

const ActivityCard = ({ activity, isOwnerView, onEdit, onDelete }: ActivityCardProps) => {
  return (
    <Card className="card-hover group">
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
            <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEdit(activity)}
              >
                <Edit className="w-4 h-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onDelete(activity.id)}
                className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
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
  );
};

export default ActivityCard;
