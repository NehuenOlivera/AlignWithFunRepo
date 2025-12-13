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
  spots_left: number;
  user_status: string;
};

export type CurrentInjuries = {
  no_injuries: boolean;
  back_pain: boolean;
  neck_pain: boolean;
  shoulder_injury: boolean;
  hip_pain: boolean;
  knee_injury: boolean;
  ankle_injury: boolean;
  wrist_issues: boolean;
  recent_surgery: boolean;
  pregnancy: boolean;
  pelvic_floor: boolean;
  chronic_pain: boolean;
  other_injury: boolean;
  other_injury_text: string;
};

export type MedicalBackground = {
  none_apply: boolean;
  asthma: boolean;
  heart_condition: boolean;
  diabetes: boolean;
  dizziness: boolean;
  hypermobility: boolean;
  osteoporosis: boolean;
  other_diagnosed_condition: boolean;
  other_diagnosed_condition_text: string;
};

export type AcknowledgementOfResponsability = {
  physical_activity_risk: boolean;
  notify_changes: boolean;
  instructor_guidance: boolean;
  follow_instructions: boolean;
};

export type UserHealthForm = {
  user_id: string;
  current_injuries: CurrentInjuries;
  medical_background: MedicalBackground;
  acknowledgement: AcknowledgementOfResponsability;
  other_injuries?: string | null;
  completed_at?: string | null;
  created_at?: string;
  updated_at?: string;
};

export type UserHealthFormPayload = Omit<
  UserHealthForm,
  "user_id" | "created_at" | "updated_at" | "completed_at"
> & {
  completed?: boolean;
};

export const defaultCurrentInjuries: CurrentInjuries = {
  no_injuries: false,
  back_pain: false,
  neck_pain: false,
  shoulder_injury: false,
  hip_pain: false,
  knee_injury: false,
  ankle_injury: false,
  wrist_issues: false,
  recent_surgery: false,
  pregnancy: false,
  pelvic_floor: false,
  chronic_pain: false,
  other_injury: false,
  other_injury_text: "",
};

export const defaultMedicalBackground: MedicalBackground = {
  asthma: false,
  heart_condition: false,
  diabetes: false,
  dizziness: false,
  hypermobility: false,
  osteoporosis: false,
  other_diagnosed_condition: false,
  other_diagnosed_condition_text: "",
  none_apply: false,
};

export const defaultAcknowledgementOfResponsability: AcknowledgementOfResponsability =
  {
    physical_activity_risk: false,
    notify_changes: false,
    instructor_guidance: false,
    follow_instructions: false,
  };
