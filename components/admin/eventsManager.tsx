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
import {
  Plus,
  Calendar,
  Clock,
  Users,
  MapPin,
  DollarSign,
  Pencil,
  Trash2,
} from "lucide-react";
import BasicDialog from "../ui/basicDialog";

interface Attendee {
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
}

interface Event {
  id: string;
  name: string;
  start_at: string;
  duration_minutes: number;
  max_participants: number;
  location?: string;
  description?: string;
  suggested_price?: number;
  attendees_amount: number;
  attendees: Attendee[];
  is_cancelled: boolean;
}

export default function EventsManager({
  initialEvents,
}: {
  initialEvents: Event[];
}) {
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [showPastEvents, setShowPastEvents] = useState(true);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [deletingEvent, setDeletingEvent] = useState<Event | null>(null);
  const [cancelEvent, setCancelEvent] = useState(false);

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

  const resetForm = () => {
    setName("");
    setStartDate("");
    setStartTime("");
    setDuration("");
    setMaxParticipants("");
    setDescription("");
    setLocation("");
    setSuggestedPrice("");
    setCancelEvent(false);

    setEditingEvent(null);
    setDeletingEvent(null);
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
      is_cancelled: cancelEvent,
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

    resetForm();

    setIsCreateDialogOpen(false);
    setLoading(false);
  };

  const populateEditForm = (ev: Event) => {
    setName(ev.name);
    setStartDate(ev.start_at.slice(0, 10)); // YYYY-MM-DD
    setStartTime(new Date(ev.start_at).toISOString().slice(11, 16));
    setDuration(String(ev.duration_minutes));
    setMaxParticipants(String(ev.max_participants));
    setDescription(ev.description || "");
    setLocation(ev.location || "");
    setSuggestedPrice(ev.suggested_price ? String(ev.suggested_price) : "");
    setCancelEvent(ev.is_cancelled);
  };

  const populateDeleteForm = (ev: Event) => {
    setName(ev.name);
    setDescription(ev.description || "");
  };

  const handleEditEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!editingEvent) return;

    const start_at = new Date(`${startDate}T${startTime}:00`);

    const payload = {
      name,
      start_at,
      duration_minutes: Number(duration),
      max_participants: Number(maxParticipants),
      description: description || null,
      location: location || null,
      suggested_price: suggestedPrice ? Number(suggestedPrice) : null,
      is_cancelled: cancelEvent,
    };

    const res = await fetch(`/api/events/${editingEvent.id}/update`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (!res.ok) {
      alert("Error: " + data.error);
      setLoading(false);
      return;
    }

    // update list
    setEvents((prev) =>
      prev.map((ev) => (ev.id === editingEvent.id ? data.event : ev))
    );

    setIsEditDialogOpen(false);
    setLoading(false);
  };

  const handleDeleteEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!deletingEvent) return;

    const res = await fetch(`/api/events/${deletingEvent.id}/delete`, {
      method: "DELETE",
    });

    const data = await res.json();

    // update list
    setEvents((prev) => prev.filter((ev) => ev.id !== deletingEvent.id));

    if (!res.ok) {
      alert("Error: " + data.error);
      setLoading(false);
      return;
    }
    setIsDeleteDialogOpen(false);
    setLoading(false);
  };

  return (
    <>
      {/* Page Title */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-[#f5ece5] mb-1">
            Event Management
          </h1>
          <p className="text-[#f5ece5]/70">Create and manage your classes</p>
        </div>

        <Button
          className="gap-2 border-2 pr-3 pl-2"
          onClick={() => {
            resetForm();
            setIsCreateDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4" />
          New
        </Button>
      </div>

      {/* Filter */}
      <div className="flex items-center gap-2 mb-6 justify-end">
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
            <button
              className="absolute top-7 right-5 p-1 rounded-md hover:bg-white/10 transition text-green border border-green"
              onClick={() => {
                setEditingEvent(ev);
                populateEditForm(ev);
                setIsEditDialogOpen(true);
              }}
            >
              <Pencil className="h-4 w-4" />
            </button>
            <button
              className="absolute top-7 right-14 p-1 rounded-md hover:bg-white/10 transition text-red-600 border border-red-600"
              onClick={() => {
                setDeletingEvent(ev);
                populateDeleteForm(ev);
                setIsDeleteDialogOpen(true);
              }}
            >
              <Trash2 className="h-4 w-4" />
            </button>
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
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        title="Create New Event"
      >
        <form className="space-y-6" onSubmit={handleNewEventSubmit}>
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
                step="0.01"
                value={suggestedPrice}
                onChange={(e) => setSuggestedPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="modalCancelButton"
              onClick={() => setIsCreateDialogOpen(false)}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="modalSubmitButton"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Event"}
            </button>
          </div>
        </form>
      </BasicDialog>

      {/* Edit Dialog */}
      <BasicDialog
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        title="Edit Event"
      >
        <form className="space-y-6" onSubmit={handleEditEventSubmit}>
          <div className="space-y-4">
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
                  step="0.01"
                  value={suggestedPrice}
                  onChange={(e) => setSuggestedPrice(e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="modalCancelButton"
              onClick={() => setIsEditDialogOpen(false)}
            >
              Close
            </button>

            <button
              type="submit"
              className="modalSubmitButton"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
        <div>
          <Label>Cancel Event</Label>
          <div className="flex items-center gap-2 mt-1">
            <Switch checked={cancelEvent} onCheckedChange={setCancelEvent} />
            <span className="text-sm text-[#f5ece5]/70">Mark as cancelled</span>
          </div>
        </div>
      </BasicDialog>

      {/* Delete Dialog */}
      <BasicDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        title="Are you sure you want to delete this event?"
      >
        <Label className="mb-4 block text-red-600">
          This action cannot be undone
        </Label>
        <form className="space-y-6" onSubmit={handleDeleteEvent}>
          <div className="space-y-4">
            <div className="space-y-4">
              <div>
                {/*Populate label with event name */}
                <Label>Class Name </Label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  readOnly
                />
              </div>

              <div>
                <Label>Description</Label>
                <Textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  readOnly
                />
              </div>
            </div>
          </div>
        </form>

        <div className="flex gap-3 justify-end mt-6">
          <button
            type="button"
            className="modalCancelButton"
            onClick={() => setIsDeleteDialogOpen(false)}
          >
            Cancel
          </button>

          <button
            className="modalDeleteButton"
            disabled={loading}
            onClick={handleDeleteEvent}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </BasicDialog>
    </>
  );
}
