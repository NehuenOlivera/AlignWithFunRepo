"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "../ui/switch";
import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import BasicDialog from "../ui/basicDialog";
import EventCard from "./EventCard";
import EventForm from "./EventForm";
import EventDeleteDialog from "./EventDeleteDialog";
import { Collapse } from "react-collapse";

interface Attendee {
  id: string;
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
  const [isEventManagementOpen, setIsEventManagementOpen] = useState(false);

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

  const eventsManagerToggleCollapse = () => {
    setIsEventManagementOpen(!isEventManagementOpen);
  };

  return (
    <>
      <div
        className="flex items-center justify-between border-b-2 p-3"
        onClick={eventsManagerToggleCollapse}
      >
        <h1 className="text-3xl font-semibold text-(--color-beige)">Events</h1>
        {isEventManagementOpen ? <ChevronUp /> : <ChevronDown />}
      </div>
      {/* Page Title */}
      <Collapse isOpened={isEventManagementOpen}>
        <div className="flex items-center justify-between my-5">
          <div>
            <p className="text-[#f5ece5] pl-2 text-2xl">Manage your classes</p>
          </div>

          <Button
            className="gap-2 border-2 pr-3 pl-2"
            onClick={() => {
              resetForm();
              setIsCreateDialogOpen(true);
              setDuration("45");
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
            <EventCard
              key={ev.id}
              ev={ev}
              onEdit={() => {
                setEditingEvent(ev);
                populateEditForm(ev);
                setIsEditDialogOpen(true);
              }}
              onDelete={() => {
                setDeletingEvent(ev);
                populateDeleteForm(ev);
                setIsDeleteDialogOpen(true);
              }}
            />
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-[#f5ece5]/50">No events found</p>
          </div>
        )}
      </Collapse>

      {/* Create Dialog */}
      <BasicDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        title="Create New Event"
      >
        <form className="space-y-6" onSubmit={handleNewEventSubmit}>
          <EventForm
            name={name}
            setName={setName}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            duration={duration}
            setDuration={setDuration}
            maxParticipants={maxParticipants}
            setMaxParticipants={setMaxParticipants}
            description={description}
            setDescription={setDescription}
            location={location}
            setLocation={setLocation}
            suggestedPrice={suggestedPrice}
            setSuggestedPrice={setSuggestedPrice}
            cancelEvent={cancelEvent}
            setCancelEvent={setCancelEvent}
            showCancelSwitch={false}
          />

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
          <EventForm
            name={name}
            setName={setName}
            startDate={startDate}
            setStartDate={setStartDate}
            startTime={startTime}
            setStartTime={setStartTime}
            duration={duration}
            setDuration={setDuration}
            maxParticipants={maxParticipants}
            setMaxParticipants={setMaxParticipants}
            description={description}
            setDescription={setDescription}
            location={location}
            setLocation={setLocation}
            suggestedPrice={suggestedPrice}
            setSuggestedPrice={setSuggestedPrice}
            cancelEvent={cancelEvent}
            setCancelEvent={setCancelEvent}
            showCancelSwitch={true}
          />

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
          <EventDeleteDialog name={name} description={description} />

          <div className="flex gap-3 justify-end">
            <button
              type="button"
              className="modalCancelButton"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="modalSubmitButton"
              disabled={loading}
            >
              {loading ? "Deleting..." : "Delete"}
            </button>
          </div>
        </form>
      </BasicDialog>
    </>
  );
}
