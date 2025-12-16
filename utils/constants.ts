import {
  AcknowledgementOfResponsability,
  CurrentInjuries,
  MedicalBackground,
} from "@/types";

export const EMPTY_CURRENT_INJURIES = {
  no_injuries: false,
  back_pain: false,
  neck_pain: false,
  shoulder_pain: false,
  hip_pain: false,
  knee_pain: false,
  ankle_pain: false,
  wrist_pain: false,
  recent_surgery: false,
  pregnant: false,
  pelvic_floor_pain: false,
  chronic_pain: false,
  other_injury: false,
};

export const INJURY_OPTIONS: Array<{
  key: Exclude<
    keyof CurrentInjuries,
    "no_injuries" | "other_injury" | "other_injury_text"
  >;
  label: string;
}> = [
  { key: "back_pain", label: "Back pain" },
  { key: "neck_pain", label: "Neck pain" },
  { key: "shoulder_injury", label: "Shoulder injury" },
  { key: "hip_pain", label: "Hip pain" },
  { key: "knee_injury", label: "Knee injury" },
  { key: "ankle_injury", label: "Ankle injury" },
  { key: "wrist_issues", label: "Wrist issues" },
  { key: "recent_surgery", label: "Recent surgery" },
  { key: "pregnancy", label: "Pregnancy" },
  { key: "pelvic_floor", label: "Pelvic floor issues" },
  { key: "chronic_pain", label: "Chronic pain" },
];

export const MEDICAL_BACKGROUND_OPTIONS: Array<{
  key: Exclude<
    keyof MedicalBackground,
    | "none_apply"
    | "other_diagnosed_condition"
    | "other_diagnosed_condition_text"
  >;
  label: string;
}> = [
  { key: "asthma", label: "Asthma" },
  { key: "heart_condition", label: "Heart condition" },
  { key: "diabetes", label: "Diabetes" },
  { key: "dizziness", label: "Dizziness or fainting" },
  { key: "hypermobility", label: "Hypermobility" },
  { key: "osteoporosis", label: "Osteoporosis" },
];

export const ACKNOWLEDGEMENT_OPTIONS: Array<{
  key: keyof AcknowledgementOfResponsability;
  label: string;
}> = [
  {
    key: "physical_activity_risk",
    label:
      "I acknowledge that Pilates involves physical activity and carries a risk of injury.",
  },
  {
    key: "notify_changes",
    label:
      "I understand that it is my responsibility to notify the instructor before class if anything changes.",
  },
  {
    key: "instructor_guidance",
    label:
      "I understand that the instructor will guide me safely, but ultimately I am responsible for my own body.",
  },
  {
    key: "follow_instructions",
    label:
      "I agree to follow instructions and practice within my personal limits.",
  },
];

export const REQUIRED_PROFILE_FIELDS: (keyof UserProfile)[] = [
  "first_name",
  "last_name",
  "email",
  "phone",
  "emergency_contact_name",
  "emergency_contact_relationship",
  "emergency_contact_phone",
];

export interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string | null;
  emergency_contact_name: string | null;
  emergency_contact_relationship: string | null;
  emergency_contact_phone: string | null;
  waiver_signed: boolean;
}
