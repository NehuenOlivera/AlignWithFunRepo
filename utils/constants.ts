import { CurrentInjuries } from "@/types";

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
  key: Exclude<keyof CurrentInjuries, "no_injuries" | "other_injury_text">;
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
  { key: "other_injury", label: "Other injury" },
];
