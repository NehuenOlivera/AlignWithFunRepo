"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { Pen } from "lucide-react";
import WaiverText from "@/components/WaiverText";

interface UserProfile {
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

function WaiverModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 border border-white/20 rounded-2xl p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto text-[#f5ece5]">
        <WaiverText />
        <button
          onClick={onClose}
          className="mt-6 px-6 py-2 bg-[#022e14] rounded-lg border border-white/10 font-semibold w-full active:scale-95"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function UserData() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState<Partial<UserProfile>>({});
  const [initialWaiverSigned, setInitialWaiverSigned] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const supabase = createClient();

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
        .from("users")
        .select(
          "id, first_name, last_name, email, phone, emergency_contact_name, emergency_contact_relationship, emergency_contact_phone, waiver_signed"
        )
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data as UserProfile);
        setFormData(data);
        setInitialWaiverSigned(data.waiver_signed);
      }
      setLoading(false);
    };

    fetchProfile();
  }, [supabase]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value || null,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;

    // If they already signed before -> DO NOT ALLOW ANY CHANGES
    if (initialWaiverSigned) return;

    // Allow changes only when editing
    if (!isEditing) return;

    setFormData((prev) => ({
      ...prev,
      waiver_signed: checked,
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setMessage("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return;

    const { error } = await supabase
      .from("users")
      .update({
        first_name: formData.first_name,
        last_name: formData.last_name,
        phone: formData.phone,
        emergency_contact_name: formData.emergency_contact_name,
        emergency_contact_relationship: formData.emergency_contact_relationship,
        emergency_contact_phone: formData.emergency_contact_phone,
        waiver_signed: initialWaiverSigned ? true : formData.waiver_signed,
      })
      .eq("id", user.id);
    if (formData.waiver_signed) setInitialWaiverSigned(true);

    if (error) {
      setMessage("Error updating profile");
    } else {
      setMessage("Profile updated successfully!");
      setProfile(formData as UserProfile);
      setIsEditing(false);
      setTimeout(() => setMessage(""), 3000);
    }
    setSaving(false);
  };

  const handleCancel = () => {
    setFormData(profile || {});
    setIsEditing(false);
    setMessage("");
  };

  if (loading) {
    return (
      <div className="min-h-60 flex items-center justify-center">
        <p className="text-[#f5ece5]">Loading profile...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-60 flex items-center justify-center">
        <p className="text-[#f5ece5]">Profile not found</p>
      </div>
    );
  }

  return (
    <div>
      {/* Message Alert */}
      {message && (
        <div
          className={`text-sm p-4 rounded-xl mb-6 border backdrop-blur-sm ${
            message.includes("Error")
              ? "bg-red-500/10 text-red-200 border-red-400/30"
              : "bg-green-500/10 text-green-200 border-green-400/30"
          }`}
        >
          {message}
        </div>
      )}

      {/* Main Card */}
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10">
        <form className="space-y-8">
          <div>
            <div className="flex justify-between mb-2 items-center flex-nowrap">
              {/* A div that contains one div and one h2, should be one next to the other */}
              <div className="flex items-center gap-3">
                <div className="w-1 h-6 bg-(--color-yellow)"></div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#f5ece5] whitespace-nowrap">
                  Personal Info
                </h2>
              </div>
              {!isEditing && (
                <div>
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-3 bg-[#022e14] rounded-lg font-semibold border border-white/10 whitespace-nowrap flex items-center justify-center"
                  >
                    <Pen className="inline-block h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium text-amber-20 mb-1!">
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2! rounded-lg bg-white/5 border border-white/10 text-[#f5ece5] placeholder-[#f5ece5]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus:border-[#022e14] focus:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-amber-20 mb-1!">
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2! rounded-lg bg-white/5 border border-white/10 text-[#f5ece5] placeholder-[#f5ece5]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus:border-[#022e14] focus:bg-white/10"
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="block text-sm font-medium text-amber-20 mb-1!">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email || ""}
                  disabled
                  className="w-full px-4 py-2! rounded-lg bg-white/5 border border-white/10 text-[#f5ece5]/50! cursor-not-allowed"
                />
                <p className="text-xs text-[#f5ece5]/50">
                  Email cannot be changed
                </p>
              </div>

              <div className="space-y-2 sm:col-span-2">
                <label className="block text-sm font-medium text-amber-20 mb-1!">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4! py-2! rounded-lg bg-white/5 border border-white/10 text-[#f5ece5] placeholder-[#f5ece5]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus:border-[#022e14] focus:bg-white/10"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6! mt-7!">
              <div className="w-1 h-6 bg-(--color-yellow)"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#f5ece5]">
                Emergency Contact
              </h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-amber-20 mb-1!">
                  Contact Name
                </label>
                <input
                  type="text"
                  name="emergency_contact_name"
                  value={formData.emergency_contact_name || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  className="w-full px-4 py-2! mb-2! rounded-lg bg-white/5 border border-white/10 text-[#f5ece5] placeholder-[#f5ece5]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus:border-[#022e14] focus:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-amber-20 mb-1!">
                  Relationship
                </label>
                <input
                  type="text"
                  name="emergency_contact_relationship"
                  value={formData.emergency_contact_relationship || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="e.g. Mother, Father, Spouse"
                  className="w-full px-4 py-2! mb-2! rounded-lg bg-white/5 border border-white/10 text-[#f5ece5] placeholder-[#f5ece5]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus:border-[#022e14] focus:bg-white/10"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-amber-20 mb-1!">
                  Contact Phone
                </label>
                <input
                  type="tel"
                  name="emergency_contact_phone"
                  value={formData.emergency_contact_phone || ""}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  placeholder="+1 (555) 000-0000"
                  className="w-full px-4! py-2! rounded-lg bg-white/5 border border-white/10 text-[#f5ece5] placeholder-[#f5ece5]/40 disabled:opacity-60 disabled:cursor-not-allowed transition-all focus:outline-none focus:border-[#022e14] focus:bg-white/10"
                />
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3 mb-6! mt-7!">
              <div className="w-1 h-6 bg-(--color-yellow)"></div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#f5ece5]">
                Release of Liability Agreement
              </h2>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="waiver_signed"
                  checked={!!formData.waiver_signed}
                  onChange={handleCheckboxChange}
                  disabled={!isEditing || initialWaiverSigned}
                  className="h-5 w-5 text-[#f5ece5] disabled:opacity-60 disabled:cursor-not-allowed mx-4"
                />
                <label className="text-sm">
                  I have read and agree to the{" "}
                  <button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    className="underline text-(--color-yellow) hover:text-yellow-300 transition"
                  >
                    Waiver & Release of Liability
                  </button>
                </label>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row gap-3 justify-end">
            {isEditing && (
              <>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-6! py-2! bg-white/10 rounded-lg font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving}
                  className="px-6! py-2! bg-[#022e14] rounded-lg font-semibold active:scale-95 disabled:opacity-50 border border-white/10"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </>
            )}
          </div>
        </form>
      </div>
      <WaiverModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
