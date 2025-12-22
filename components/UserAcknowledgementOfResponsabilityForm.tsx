"use client";

import type { AcknowledgementOfResponsability } from "@/types";
import { ACKNOWLEDGEMENT_OPTIONS } from "@/utils/constants";

type UserAcknowledgementOfResponsabilityFormProps = {
  acknowledgement: AcknowledgementOfResponsability;
  isEditing: boolean;
  onToggle: (key: keyof AcknowledgementOfResponsability) => void;
};

export function UserAcknowledgementOfResponsabilityForm({
  acknowledgement,
  isEditing,
  onToggle,
}: UserAcknowledgementOfResponsabilityFormProps) {
  return (
    <>
      <div className="flex justify-between mt-10 mb-2 items-center">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 bg-(--color-terracota)" />
          <h2 className="text-xl sm:text-2xl font-bold text-(--color-dark-green)">
            Acknowledgement of Responsibility
          </h2>
        </div>
      </div>

      <div className="space-y-3">
        {ACKNOWLEDGEMENT_OPTIONS.map(({ key, label }) => (
          <div key={key} className="flex gap-4 items-center">
            <div className="shrink-0 pt-1">
              <input
                type="checkbox"
                className="h-5 w-5"
                checked={acknowledgement[key]}
                disabled={!isEditing}
                onChange={() => onToggle(key)}
              />
            </div>
            <label className="text-sm text-(--color-dark-green) leading-relaxed">
              {label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
}
