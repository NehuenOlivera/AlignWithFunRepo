"use client";

import type { MedicalBackground } from "@/types";
import { MEDICAL_BACKGROUND_OPTIONS } from "@/utils/constants";
import { Collapse } from "react-collapse";

type UserMedicalBackgroundFormProps = {
  medicalBackground: MedicalBackground;
  isEditing: boolean;
  onToggle: (key: keyof MedicalBackground) => void;
  onOtherConditionTextChange: (value: string) => void;
};

export function UserMedicalBackgroundForm({
  medicalBackground,
  isEditing,
  onToggle,
  onOtherConditionTextChange,
}: UserMedicalBackgroundFormProps) {
  return (
    <>
      <div className="flex justify-between mt-10 mb-2 items-center">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-(--color-terracota)" />
          <h2 className="text-xl sm:text-2xl font-bold text-(--color-dark-green)">
            Medical Background
          </h2>
        </div>
      </div>

      <div className="flex space-x-2 items-center">
        <input
          type="checkbox"
          className="size-6"
          checked={medicalBackground.none_apply}
          disabled={!isEditing}
          onChange={() => onToggle("none_apply")}
        />
        <label className="text-(--color-dark-green)">None apply</label>
      </div>

      <Collapse isOpened={!medicalBackground.none_apply}>
        <hr className="my-3" />

        <div className="space-y-2.5">
          {MEDICAL_BACKGROUND_OPTIONS.map(({ key, label }) => (
            <div className="flex space-x-2 items-center" key={key}>
              <input
                type="checkbox"
                className="size-6"
                checked={medicalBackground[key]}
                disabled={!isEditing}
                onChange={() => onToggle(key)}
              />
              <label className="text-(--color-dark-green)">{label}</label>
            </div>
          ))}

          <div className="flex space-x-2 items-center">
            <input
              type="checkbox"
              className="size-6"
              checked={medicalBackground.other_diagnosed_condition}
              disabled={!isEditing}
              onChange={() => onToggle("other_diagnosed_condition")}
            />
            <label className="text-(--color-dark-green)">Other condition</label>

            <input
              type="text"
              className="border-b bg-transparent flex-1 text-(--color-dark-green)"
              disabled={
                !isEditing || !medicalBackground.other_diagnosed_condition
              }
              value={medicalBackground.other_diagnosed_condition_text}
              onChange={(e) => onOtherConditionTextChange(e.target.value)}
              placeholder={
                medicalBackground.other_diagnosed_condition
                  ? "Please specify"
                  : ""
              }
            />
          </div>
        </div>
      </Collapse>
    </>
  );
}
