"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface EventFormProps {
  name: string;
  setName: (v: string) => void;

  startDate: string;
  setStartDate: (v: string) => void;

  startTime: string;
  setStartTime: (v: string) => void;

  duration: string;
  setDuration: (v: string) => void;

  maxParticipants: string;
  setMaxParticipants: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  location: string;
  setLocation: (v: string) => void;

  suggestedPrice: string;
  setSuggestedPrice: (v: string) => void;
}

export default function EventForm({
  name,
  setName,
  startDate,
  setStartDate,
  startTime,
  setStartTime,
  duration,
  setDuration,
  maxParticipants,
  setMaxParticipants,
  description,
  setDescription,
  location,
  setLocation,
  suggestedPrice,
  setSuggestedPrice,
}: EventFormProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div>
          <Label>Class Name *</Label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Start Date *</Label>
            <Input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          <div>
            <Label>Start Time *</Label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label>Duration (minutes) *</Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              required
            />
          </div>
          <div>
            <Label>Max Participants *</Label>
            <Input
              type="number"
              value={maxParticipants}
              onChange={(e) => setMaxParticipants(e.target.value)}
              required
            />
          </div>
        </div>

        <div>
          <Label>Description</Label>
          <Textarea
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <Label>Location</Label>
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <Label>Suggested Price ($)</Label>
          <Input
            type="number"
            step="1"
            value={suggestedPrice}
            onChange={(e) => setSuggestedPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}
