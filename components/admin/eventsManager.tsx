"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "../ui/textarea";
import { Switch } from "../ui/switch";
import { Plus, Calendar, Clock, Users, MapPin, DollarSign } from "lucide-react";
import BasicDialog from "../ui/basicDialog";

interface Event {
  id: string;
  name: string;
  start_at: string;
  duration_minutes: number;
  max_participants: number;
  location?: string;
  description?: string;
  suggested_price?: number;
}

export default function EventsManager({
  initialEvents,
}: {
  initialEvents: Event[];
}) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showPastEvents, setShowPastEvents] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [duration, setDuration] = useState("");
  const [maxParticipants, setMaxParticipants] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [suggestedPrice, setSuggestedPrice] = useState("");

  const now = new Date();
  const filteredEvents = showPastEvents
    ? events
    : events.filter((e) => new Date(e.start_at) >= now);

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // CREATE EVENT HANDLER
  const handleNewEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // combine date + time → ISO datetime
    const start_at = new Date(`${startDate}T${startTime}:00`);

    const payload = {
      name,
      start_at,
      duration_minutes: Number(duration),
      max_participants: Number(maxParticipants),
      description: description || null,
      location: location || null,
      suggested_price: suggestedPrice ? Number(suggestedPrice) : null,
    };

    const res = await fetch("/api/events/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error: " + data.error);
      setLoading(false);
      return;
    }

    // add new event to list
    setEvents((prev) => [...prev, data.event]);

    // reset form
    setName("");
    setStartDate("");
    setStartTime("");
    setDuration("");
    setMaxParticipants("");
    setDescription("");
    setLocation("");
    setSuggestedPrice("");

    setIsDialogOpen(false);
    setLoading(false);
  };

  return (
    <>
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6!">
        <div>
          <h1 className="text-3xl font-bold text-[#f5ece5] mb-1">
            Event Management
          </h1>
          <p className="text-[#f5ece5]/70">Create and manage your classes</p>
        </div>

        <Button
          className="gap-2 border-2 pr-3! pl-2!"
          onClick={() => setIsDialogOpen(true)}
        >
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      {/* // Align items to the right */}
      {/* Filter */}
      <div className="flex items-center gap-2 mb-6! justify-end">
        <Label htmlFor="show-past" className="text-[#f5ece5] cursor-pointer">
          Show past events
        </Label>
        <Switch
          id="show-past"
          checked={showPastEvents}
          onCheckedChange={setShowPastEvents}
        />
      </div>

      {/* Events Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {filteredEvents.map((ev) => (
          <Card key={ev.id} className="eventCard">
            <CardHeader>
              <CardTitle className="eventCard-title">{ev.name}</CardTitle>

              {ev.description && (
                <CardDescription className="eventCard-text">
                  {ev.description}
                </CardDescription>
              )}
            </CardHeader>

            <CardContent className="space-y-3">
              <div className="eventCard-text">
                <Calendar className="h-4 w-4" />
                <span>{formatDateTime(ev.start_at)}</span>
              </div>

              <div className="eventCard-text">
                <Clock className="h-4 w-4" />
                <span>{ev.duration_minutes} minutes</span>
              </div>

              <div className="eventCard-text">
                <Users className="h-4 w-4" />
                <span>Max {ev.max_participants}</span>
              </div>

              {ev.location && (
                <div className="eventCard-text">
                  <MapPin className="h-4 w-4" />
                  <span>{ev.location}</span>
                </div>
              )}

              {ev.suggested_price && (
                <div className="eventCard-text">
                  <DollarSign className="h-4 w-4" />
                  <span>${ev.suggested_price}</span>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-[#f5ece5]/50">No events found</p>
        </div>
      )}

      {/* Create Dialog */}
      <BasicDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        title="Create New Event"
      >
        <form className="space-y-6" onSubmit={handleNewEventSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Class Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
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
              <div className="space-y-2">
                <Label>Duration (minutes) *</Label>
                <Input
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Max Participants *</Label>
                <Input
                  type="number"
                  value={maxParticipants}
                  onChange={(e) => setMaxParticipants(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label>Suggested Price ($)</Label>
              <Input
                type="number"
                step="0.01"
                value={suggestedPrice}
                onChange={(e) => setSuggestedPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? "Creating..." : "Create Event"}
            </Button>
          </div>
        </form>
      </BasicDialog>
    </>
  );
}
