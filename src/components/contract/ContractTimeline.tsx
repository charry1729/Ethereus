import React from 'react';
import { Circle } from 'lucide-react';

interface TimelineEvent {
  id: string;
  title: string;
  description: string;
  timestamp: Date;
  type: 'creation' | 'update' | 'signature' | 'completion';
}

interface ContractTimelineProps {
  events: TimelineEvent[];
}

export const ContractTimeline: React.FC<ContractTimelineProps> = ({ events }) => {
  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'creation':
        return 'text-blue-400 bg-blue-400/10';
      case 'update':
        return 'text-yellow-400 bg-yellow-400/10';
      case 'signature':
        return 'text-green-400 bg-green-400/10';
      case 'completion':
        return 'text-purple-400 bg-purple-400/10';
    }
  };

  return (
    <div className="space-y-8">
      {events.map((event, index) => (
        <div key={event.id} className="relative">
          {index !== events.length - 1 && (
            <div className="absolute left-2.5 top-6 h-full w-px bg-slate-700" />
          )}
          
          <div className="flex items-start gap-4">
            <div className={`mt-2 p-1 rounded-full ${getEventColor(event.type)}`}>
              <Circle className="w-3 h-3" />
            </div>
            
            <div className="flex-1">
              <div className="bg-slate-800 p-4 rounded-lg">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="text-white font-medium">{event.title}</h4>
                  <span className="text-sm text-gray-400">
                    {event.timestamp.toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-400 text-sm">{event.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};