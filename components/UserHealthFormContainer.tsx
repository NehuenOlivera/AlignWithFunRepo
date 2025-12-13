"use client";

import { defaultCurrentInjuries, defaultMedicalBackground } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { ChevronUp, ChevronDown, Pen } from "lucide-react";
import { useEffect, useState } from "react";
import { Collapse } from "react-collapse";
import { UserInjuriesForm } from "./UserInjuriesForm";
import type { CurrentInjuries, MedicalBackground } from "@/types";
import { UserMedicalBackgroundForm } from "./UserMedicalBackgroundForm";

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
        .select("current_injuries, medical_background")
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
      <div
        className="flex items-center justify-between border-b-2 p-3 cursor-pointer"
        onClick={healthFormToggleCollapse}
      >
        <h1 className="text-3xl font-semibold text-(--color-beige)">
          Health form
        </h1>
        {isHealthFormOpen ? <ChevronUp /> : <ChevronDown />}
      </div>

      <Collapse isOpened={isHealthFormOpen}>
        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10 mt-4">
          {!isEditing && (
            <div className="flex justify-end mb-4">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-3 bg-[#022e14] rounded-lg font-semibold border border-white/10"
              >
                <Pen className="h-4 w-4" />
              </button>
            </div>
          )}

          <form>
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
          </form>
        </div>
      </Collapse>
    </>
  );
}
