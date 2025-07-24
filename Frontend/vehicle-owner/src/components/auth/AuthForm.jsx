import { useState } from 'react';
import Link from "next/link";
import UsernameInput from '@/components/auth/UsernameInput';
import PasswordInput from '@/components/auth/PasswordInput';
import SubmitButton from '@/components/auth/SubmitButton';

export default function AuthForm({ onSubmit, submitLabel, showSignUpLink = false, showSignInLink = false }) {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    await onSubmit(formData);
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Email Input */}
      <UsernameInput value={formData.username} onChange={handleInputChange} />

      {/* Password Input */}
      <PasswordInput
        value={formData.password}
        onChange={handleInputChange}
        show={showPassword}
        toggle={() => setShowPassword(!showPassword)}
      />

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center space-x-2 cursor-pointer group">
          <input
            type="checkbox"
            className="w-4 h-4 text-indigo-700 bg-white border-indigo-300 rounded focus:ring-indigo-700 focus:ring-2"
          />
          <span className="text-indigo-700 group-hover:text-black transition-colors">Remember me</span>
        </label>
        <a href="#" className="text-indigo-700 hover:text-black transition-colors font-medium">
          Forgot password?
        </a>
      </div>

      {/* Submit Button */}
      <SubmitButton
        isLoading={isLoading}
        onClick={handleSubmit}
        label={submitLabel}
      />

      {/* Sign up link */}
      {showSignUpLink && (
        <p className="text-center text-indigo-700 mt-8">
          Don't have an account?{' '}
          <Link href="/Signup" className="text-indigo hover:text-indigo-800 font-medium transition-colors">
            Sign up
          </Link>
        </p>
      )}

      {showSignInLink && (
        <p className="text-center text-indigo-700 mt-8">
          Already have an account?{' '}
          <Link href="/" className="text-indigo hover:text-indigo-800 font-medium transition-colors">
            Sign In
          </Link>
        </p>
      )}
    </div>
  );
}