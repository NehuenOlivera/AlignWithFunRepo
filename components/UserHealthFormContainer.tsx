"use client";

import {
  defaultAcknowledgementOfResponsability,
  defaultCurrentInjuries,
  defaultMedicalBackground,
} from "@/types";
import { createClient } from "@/utils/supabase/client";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { UserInjuriesForm } from "./UserInjuriesForm";
import type {
  AcknowledgementOfResponsability,
  CurrentInjuries,
  MedicalBackground,
} from "@/types";
import { UserMedicalBackgroundForm } from "./UserMedicalBackgroundForm";
import { UserAcknowledgementOfResponsabilityForm } from "./UserAcknowledgementOfResponsabilityForm";
import { ToggableHeader } from "./ui/ToggableHeader";

export function UserHealthFormContainer() {
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isHealthFormOpen, setIsHealthFormOpen] = useState(false);
  const [currentInjuries, setCurrentInjuries] = useState<CurrentInjuries>(
    defaultCurrentInjuries
  );
  const [medicalBackground, setMedicalBackground] = useState<MedicalBackground>(
    defaultMedicalBackground
  );
  const [acknowledgement, setAcknowledgement] =
    useState<AcknowledgementOfResponsability>(
      defaultAcknowledgementOfResponsability
    );
  const [saving, setSaving] = useState(false);

  const isCurrentInjuriesValid = (() => {
    if (currentInjuries.no_injuries) return true;

    return Object.entries(currentInjuries).some(
      ([key, value]) =>
        key !== "no_injuries" && key !== "other_injury_text" && value === true
    );
  })();

  const isMedicalBackgroundValid = (() => {
    if (medicalBackground.none_apply) return true;

    return Object.entries(medicalBackground).some(
      ([key, value]) =>
        key !== "none_apply" &&
        key !== "other_diagnosed_condition_text" &&
        value === true
    );
  })();

  const isAcknowledgementComplete =
    Object.values(acknowledgement).every(Boolean);

  const canSave =
    isAcknowledgementComplete &&
    isCurrentInjuriesValid &&
    isMedicalBackgroundValid &&
    !saving;

  const supabase = createClient();

  const healthFormToggleCollapse = () => {
    setIsHealthFormOpen((prev) => !prev);
  };

  const handleToggleInjury = (key: keyof CurrentInjuries) => {
    setCurrentInjuries((prev) => {
      // If "no injuries" is selected → reset everything
      if (key === "no_injuries") {
        return prev.no_injuries
          ? { ...prev, no_injuries: false }
          : { ...defaultCurrentInjuries, no_injuries: true };
      }

      const next = {
        ...prev,
        no_injuries: false,
        [key]: !prev[key],
      };

      // If "other injury" unchecked → clear text
      if (key === "other_injury" && prev.other_injury) {
        next.other_injury_text = "";
      }

      return next;
    });
  };

  const handleOtherInjuryTextChange = (value: string) => {
    setCurrentInjuries((prev) => ({
      ...prev,
      other_injury_text: value,
    }));
  };

  const handleToggleMedicalBackground = (key: keyof MedicalBackground) => {
    setMedicalBackground((prev) => {
      // none_apply selected → reset everything
      if (key === "none_apply") {
        return prev.none_apply
          ? { ...prev, none_apply: false }
          : { ...defaultMedicalBackground, none_apply: true };
      }

      const next = {
        ...prev,
        none_apply: false,
        [key]: !prev[key],
      };

      // Clear text if unchecked
      if (
        key === "other_diagnosed_condition" &&
        prev.other_diagnosed_condition
      ) {
        next.other_diagnosed_condition_text = "";
      }

      return next;
    });
  };

  const handleOtherDiagnosedConditionTextChange = (value: string) => {
    setMedicalBackground((prev) => ({
      ...prev,
      other_diagnosed_condition_text: value,
    }));
  };

  const handleToggleAcknowledgement = (
    key: keyof AcknowledgementOfResponsability
  ) => {
    setAcknowledgement((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAcknowledgementComplete) {
      alert("You must acknowledge all statements before saving the form.");
      return;
    }

    setSaving(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      return;
    }

    const { error } = await supabase.from("user_health_forms").upsert(
      {
        user_id: user.id,
        current_injuries: currentInjuries,
        medical_background: medicalBackground,
        acknowledgement_of_responsability: acknowledgement,
        completed_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );

    setSaving(false);

    if (error) {
      console.error(error);
      alert("Something went wrong while saving the form.");
      return;
    }

    setIsEditing(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("user_health_forms")
        .select(
          "current_injuries, medical_background, acknowledgement_of_responsability"
        )
        .eq("user_id", user.id)
        .maybeSingle();

      if (!error && data) {
        if (data.current_injuries) {
          setCurrentInjuries({
            ...defaultCurrentInjuries,
            ...data.current_injuries,
          });
        }

        if (data.medical_background) {
          setMedicalBackground({
            ...defaultMedicalBackground,
            ...data.medical_background,
          });
        }

        if (data.acknowledgement_of_responsability) {
          setAcknowledgement({
            ...defaultAcknowledgementOfResponsability,
            ...data.acknowledgement_of_responsability,
          });
        }
      }

      if (!data) {
        setIsEditing(true);
      }

      setLoading(false);
    };

    fetchProfile();
  }, [supabase]);

  if (loading) {
    return (
      <div className="min-h-60 flex items-center justify-center">
        <p className="text-[#f5ece5]">Loading health info...</p>
      </div>
    );
  }

  return (
    <>
      <ToggableHeader
        title="Health form"
        isOpen={isHealthFormOpen}
        onToggle={healthFormToggleCollapse}
      />

      <Collapse isOpened={isHealthFormOpen}>
        <div className="bg-(--color-light-green) rounded-2xl p-6 sm:p-8 md:p-10 mt-4">
          {!isEditing && (
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-3 bg-(--color-dark-green) rounded-lg font-semibold border border-white/10"
              >
                <Pen className="h-4 w-4" />
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <UserInjuriesForm
              currentInjuries={currentInjuries}
              isEditing={isEditing}
              onToggle={handleToggleInjury}
              onOtherInjuryTextChange={handleOtherInjuryTextChange}
            />

            <UserMedicalBackgroundForm
              medicalBackground={medicalBackground}
              isEditing={isEditing}
              onToggle={handleToggleMedicalBackground}
              onOtherConditionTextChange={
                handleOtherDiagnosedConditionTextChange
              }
            />

            <UserAcknowledgementOfResponsabilityForm
              acknowledgement={acknowledgement}
              isEditing={isEditing}
              onToggle={handleToggleAcknowledgement}
            />

            {isEditing && (
              <div className="flex justify-end mt-8">
                <button
                  type="submit"
                  disabled={!canSave}
                  className={`px-6 py-3 rounded-lg font-semibold transition
        ${
          !canSave
            ? "bg-gray-500 cursor-not-allowed opacity-60"
            : "bg-(--color-terracota) text-(--color-beige) hover:opacity-90"
        }
      `}
                >
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </form>
        </div>
      </Collapse>
    </>
  );
}
