"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { adminLoginAction } from "@/app/actions";

type AdminLoginFormProps = {
  from: string;
  emailLabel: string;
  passwordLabel: string;
  buttonLabel: string;
};

export default function AdminLoginForm({ from, emailLabel, passwordLabel, buttonLabel }: AdminLoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form className="login-form" action={adminLoginAction}>
      <input type="hidden" name="from" value={from} />

      <label className="login-label">
        {emailLabel}
        <input
          name="email"
          type="email"
          className="login-input"
          required
          placeholder="e.g. creativelab.co.th@gmail.com"
        />
      </label>

      <label className="login-label">
        {passwordLabel}
        <span className="password-input-wrap">
          <input
            name="password"
            type={showPassword ? "text" : "password"}
            className="login-input password-input"
            required
            placeholder="••••••••••••"
          />
          <button
            type="button"
            className="password-toggle"
            aria-label={showPassword ? "Hide password" : "Show password"}
            aria-pressed={showPassword}
            onClick={() => setShowPassword((current) => !current)}
          >
            {showPassword ? <EyeOff size={18} aria-hidden="true" /> : <Eye size={18} aria-hidden="true" />}
          </button>
        </span>
      </label>

      <button type="submit" className="login-btn">
        {buttonLabel}
      </button>
    </form>
  );
}




