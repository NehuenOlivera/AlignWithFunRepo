"use client";

import { useState } from "react";
import { signup } from "@/app/signup/actions";
import PasswordStrengthBar from "@/components/ui/passwordStrengthBar";
import PasswordInput from "@/components/ui/passwordInput";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { SubmitButton } from "./SubmitButton";

export default function SignupForm({ serverError }: { serverError?: string }) {
  const [firstname, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState(0);

  function validateEmails(newEmail = email, newConfirmEmail = confirmEmail) {
    if (newEmail !== newConfirmEmail) {
      setEmailError("Emails do not match");
      return false;
    }
    setEmailError("");
    return true;
  }

  const isFormValid =
    firstname.trim() !== "" &&
    lastName.trim() !== "" &&
    email.trim() !== "" &&
    confirmEmail.trim() !== "" &&
    password.trim() !== "" &&
    passwordStrength === 3;

  return (
    <form
      id="signup-form"
      className="space-y-4"
      action={signup}
      onSubmit={(e) => {
        if (!validateEmails()) {
          e.preventDefault();
        }
      }}
    >
      {/* Name */}
      <div>
        <Label htmlFor="name" className="text-(--color-dark-green) font-medium">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          required
          placeholder="First name"
          className="bg-white/60 border border-(--color-dark-green)/20 text-(--color-dark-green) placeholder-(--color-dark-green)/40 rounded-xl h-11"
          onChange={(e) => setFirstName(e.target.value)}
        />
      </div>

      {/* Lastname */}
      <div>
        <Label
          htmlFor="lastname"
          className="text-(--color-dark-green) font-medium"
        >
          Lastname
        </Label>
        <Input
          id="lastname"
          name="lastname"
          required
          placeholder="Last name"
          className="bg-white/60 border border-(--color-dark-green)/20 text-(--color-dark-green) placeholder-(--color-dark-green)/40 rounded-xl h-11"
          onChange={(e) => setLastName(e.target.value)}
        />
      </div>

      {/* Email */}
      <div>
        <Label
          htmlFor="email"
          className="text-(--color-dark-green) font-medium"
        >
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmails(e.target.value, confirmEmail);
          }}
          placeholder="you@example.com"
          className="bg-white/60 border border-(--color-dark-green)/20 text-(--color-dark-green) placeholder-(--color-dark-green)/40 rounded-xl h-11"
        />
      </div>

      {/* Confirm Email */}
      <div>
        <Label
          htmlFor="confirmEmail"
          className="text-(--color-dark-green) font-medium"
        >
          Confirm Email
        </Label>
        <Input
          id="confirmEmail"
          name="confirmEmail"
          type="email"
          required
          value={confirmEmail}
          onChange={(e) => {
            setConfirmEmail(e.target.value);
            validateEmails(email, e.target.value);
          }}
          placeholder="you@example.com"
          className="bg-white/60 border border-(--color-dark-green)/20 text-(--color-dark-green) placeholder-(--color-dark-green)/40 rounded-xl h-11"
        />

        {emailError && (
          <p className="text-sm text-red-600 mt-1">{emailError}</p>
        )}
      </div>

      {/* Password w/ strength meter */}
      <div>
        <Label
          htmlFor="password"
          className="text-(--color-dark-green) font-medium"
        >
          Password
        </Label>

        <PasswordInput
          id="password"
          name="password"
          value={password}
          onChange={setPassword}
        />

        <PasswordStrengthBar
          password={password}
          onStrengthChange={setPasswordStrength}
        />
      </div>

      {/* SERVER ERROR */}
      {serverError && (
        <div className="text-sm p-3 bg-red-50 text-red-700 rounded-xl border border-red-200">
          {serverError}
        </div>
      )}

      <SubmitButton
        disabled={!isFormValid}
        text="Register"
        pendingText="Registering..."
      />
    </form>
  );
}
