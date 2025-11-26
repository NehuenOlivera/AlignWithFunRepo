export type Event = {
  id: string;
  name: string;
  description: string | null;
  start_at: string;
  duration_minutes: number;
  max_participants: number;
  suggested_price: number | null;
  post_schedule_message: string | null;
  location: string | null;
  // booked_count: number;
  spots_left: number;
  user_status: boolean;
};
