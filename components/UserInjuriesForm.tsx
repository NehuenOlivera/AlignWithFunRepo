"use client";

import type { CurrentInjuries } from "@/types";
import { INJURY_OPTIONS } from "@/utils/constants";
import { Collapse } from "react-collapse";

type UserInjuriesFormProps = {
  currentInjuries: CurrentInjuries;
  isEditing: boolean;
  onToggle: (key: keyof CurrentInjuries) => void;
  onOtherInjuryTextChange: (value: string) => void;
};

export function UserInjuriesForm({
  currentInjuries,
  isEditing,
  onToggle,
  onOtherInjuryTextChange,
}: UserInjuriesFormProps) {
  return (
    <>
      <div className="flex justify-between mb-2 items-center">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-(--color-yellow)" />
          <h2 className="text-xl sm:text-2xl font-bold text-[#f5ece5]">
            Current Injuries or Conditions
          </h2>
        </div>
      </div>

      <div className="flex space-x-2 items-center">
        <input
          type="checkbox"
          className="size-6"
          checked={currentInjuries.no_injuries}
          disabled={!isEditing}
          onChange={() => onToggle("no_injuries")}
        />
        <label>I currently have no injuries or conditions.</label>
      </div>

      <Collapse isOpened={!currentInjuries.no_injuries}>
        <hr className="my-3" />

        <div className="space-y-2.5">
          {INJURY_OPTIONS.map(({ key, label }) => (
            <div className="flex space-x-2 items-center" key={key}>
              <input
                type="checkbox"
                className="size-6"
                checked={currentInjuries[key]}
                disabled={!isEditing}
                onChange={() => onToggle(key)}
              />
              <label>{label}</label>
            </div>
          ))}

          <div className="flex space-x-2 items-center">
            <input
              type="checkbox"
              className="size-6"
              checked={currentInjuries.other_injury}
              disabled={!isEditing}
              onChange={() => onToggle("other_injury")}
            />
            <label>Other injury</label>

            <input
              type="text"
              className="border-b bg-transparent flex-1"
              disabled={!isEditing || !currentInjuries.other_injury}
              value={currentInjuries.other_injury_text}
              onChange={(e) => onOtherInjuryTextChange(e.target.value)}
              placeholder={currentInjuries.other_injury ? "Please specify" : ""}
            />
          </div>
        </div>
      </Collapse>
    </>
  );
}
