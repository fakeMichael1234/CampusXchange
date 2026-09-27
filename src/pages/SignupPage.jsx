import React, { useState } from 'react';
import {
  ShieldCheck, Mail, Lock, User, GraduationCap, ArrowRight, ArrowLeft,
  Phone, Building2, BookOpen, CheckCircle2, Eye, EyeOff, AlertCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { Footer } from '../components/layout/Footer';
import { Navbar } from '../components/layout/Navbar';
import { INDIAN_CAMPUSES } from '../data/mockData';
import { HeroParticles } from '../components/3d/HeroParticles';

const YEARS = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year', 'Post Graduate'];
const COURSES = [
  'B.Tech Computer Science & Engineering',
  'B.Tech Electronics & Communication Engineering',
  'B.Tech Mechanical Engineering',
  'B.Tech Civil Engineering',
  'B.Tech Information Technology',
  'B.Tech Electrical Engineering',
  'B.E. Computer Science',
  'B.Sc Computer Science',
  'BCA',
  'MBA',
  'M.Tech',
  'M.Sc',
  'B.Arch',
  'B.Pharm',
  'MBBS',
  'Other',
];

/* ─── Step indicators ──────────────────────────────────────────────────────── */
const STEPS = [
  { num: 1, label: 'Personal Info' },
  { num: 2, label: 'College Info' },
  { num: 3, label: 'Security' },
  { num: 4, label: 'Verification' },
];

function StepIndicator({ current }) {
  return (
    <div className="flex items-center justify-center gap-0 mb-8">
      {STEPS.map((s, idx) => (
        <React.Fragment key={s.num}>
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                s.num < current
                  ? 'bg-cx-0 text-cx-950'
                  : s.num === current
                  ? 'bg-cx-900 border-2 border-cx-0 text-cx-0'
                  : 'bg-cx-900 border border-cx-700 text-cx-600'
              }`}
            >
              {s.num < current ? <CheckCircle2 className="w-4 h-4" /> : s.num}
            </div>
            <span
              className={`text-[9px] font-mono mt-1.5 tracking-wider uppercase transition-colors ${
                s.num === current ? 'text-cx-300' : 'text-cx-600'
              }`}
            >
              {s.label}
            </span>
          </div>
          {idx < STEPS.length - 1 && (
            <div
              className={`w-12 sm:w-16 h-px mb-6 transition-colors duration-300 ${
                s.num < current ? 'bg-cx-0' : 'bg-cx-800'
              }`}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

/* ─── Field wrapper ────────────────────────────────────────────────────────── */
function Field({ label, children, error }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[11px] font-mono uppercase tracking-wider text-cx-400 block">{label}</label>
      {children}
      {error && <p className="text-[11px] text-cx-300 font-mono">{error}</p>}
    </div>
  );
}

/* ─── Text input ───────────────────────────────────────────────────────────── */
function TextInput({ icon: Icon, type = 'text', placeholder, value, onChange, required, rightElement, ...rest }) {
  return (
    <div className="relative flex items-center bg-cx-900 border border-cx-700 rounded-xl focus-within:border-cx-500 transition-colors">
      {Icon && <Icon className="w-4 h-4 text-cx-500 ml-3.5 shrink-0" />}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-transparent px-3 py-3 text-sm text-cx-0 placeholder-cx-600 focus:outline-none font-sans"
        {...rest}
      />
      {rightElement}
    </div>
  );
}

/* ─── Select input ─────────────────────────────────────────────────────────── */
function SelectInput({ icon: Icon, value, onChange, children, placeholder }) {
  return (
    <div className="relative flex items-center bg-cx-900 border border-cx-700 rounded-xl focus-within:border-cx-500 transition-colors">
      {Icon && <Icon className="w-4 h-4 text-cx-500 ml-3.5 shrink-0" />}
      <select
        value={value}
        onChange={onChange}
        className="w-full bg-transparent px-3 py-3 text-sm text-cx-0 focus:outline-none font-sans appearance-none cursor-pointer"
      >
        {placeholder && <option value="">{placeholder}</option>}
        {children}
      </select>
    </div>
  );
}

export const SignupPage = ({ onNavigate }) => {
  const { signup, accounts } = useStore();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    college: INDIAN_CAMPUSES[0],
    campus: '',
    course: COURSES[0],
    department: '',
    year: YEARS[0],
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  /* ── Mock email verification ─────────────────────────────────────────────── */
  const [verificationCode, setVerificationCode] = useState('');
  const [sentCode, setSentCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [verificationDone, setVerificationDone] = useState(false);
  const [verifyError, setVerifyError] = useState('');
  const [sendingCode, setSendingCode] = useState(false);

  const set = (key) => (e) => {
    setFormData((f) => ({ ...f, [key]: e.target.value }));
    setErrors((prev) => ({ ...prev, [key]: '' }));
  };

  /* ── Validation per step ─────────────────────────────────────────────────── */
  const validateStep = () => {
    const errs = {};
    if (step === 1) {
      if (!formData.name.trim()) errs.name = 'Full name is required.';
      if (!formData.email.trim()) errs.email = 'Email is required.';
      else {
        const e = formData.email.toLowerCase();
        if (!/^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/.test(e))
          errs.email = 'Please use a valid email address.';
        else if (accounts?.find((a) => a.email === e))
          errs.email = 'An account with this email already exists. Please log in.';
      }
      if (formData.mobile && !/^[6-9]\d{9}$/.test(formData.mobile.replace(/\s/g, '')))
        errs.mobile = 'Enter a valid 10-digit Indian mobile number.';
    }
    if (step === 2) {
      if (!formData.college) errs.college = 'Please select your college.';
      if (!formData.course) errs.course = 'Please select your course.';
      if (!formData.year) errs.year = 'Please select your year of study.';
    }
    if (step === 3) {
      if (!formData.password) errs.password = 'Password is required.';
      else if (formData.password.length < 8) errs.password = 'Password must be at least 8 characters.';
      if (formData.password !== formData.confirmPassword) errs.confirmPassword = 'Passwords do not match.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const nextStep = () => {
    if (validateStep()) setStep((s) => s + 1);
  };

  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  /* ── Send verification code (mocked) ─────────────────────────────────────── */
  const sendVerificationCode = () => {
    setSendingCode(true);
    const code = String(100000 + Math.floor(Math.random() * 900000));
    setSentCode(code);
    setTimeout(() => {
      setSendingCode(false);
      setCodeSent(true);
      // Show the code in a toast-like banner (development mode)
      console.info(`[CampusXchange Dev] Verification code for ${formData.email}: ${code}`);
    }, 1000);
  };

  const verifyCode = () => {
    setVerifyError('');
    if (verificationCode.trim() === sentCode) {
      setVerificationDone(true);
    } else {
      setVerifyError('Incorrect code. Please check and try again.');
    }
  };

  /* ── Final registration ───────────────────────────────────────────────────── */
  const handleFinish = () => {
    setIsLoading(true);
    setTimeout(() => {
      const res = signup({ ...formData, verified: true });
      setIsLoading(false);
      if (res.success) {
        onNavigate('/marketplace');
      } else {
        setErrors({ general: res.error });
        setStep(1);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen bg-cx-950 text-cx-0 font-sans flex flex-col selection:bg-cx-0 selection:text-cx-950">
      <Navbar currentPath="/signup" onNavigate={onNavigate} />

      <main className="flex-1 flex items-center justify-center relative py-12 px-4">
        {/* Particle background */}
        <HeroParticles className="absolute inset-0 opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-cx-950/60 to-cx-950/90 pointer-events-none" />

        <div className="relative z-10 w-full max-w-lg">
          {/* Header */}
          <div className="text-center mb-8 space-y-2">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-cx-0 text-cx-950 mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold uppercase tracking-tight text-cx-0">Create Your Account</h1>
            <p className="text-xs font-mono text-cx-500">
              Step {step} of {STEPS.length} — {STEPS[step - 1].label}
            </p>
          </div>

          {/* Step indicator */}
          <StepIndicator current={step} />

          {/* Card */}
          <div className="bg-cx-900/80 backdrop-blur-xl border border-cx-800 rounded-2xl p-8">

            {/* ── STEP 1: Personal Information ─────────────────────────────────── */}
            {step === 1 && (
              <div className="space-y-5">
                <h2 className="text-base font-bold text-cx-0 mb-5">Personal Information</h2>

                <Field label="Full Name" error={errors.name}>
                  <TextInput
                    icon={User}
                    placeholder="e.g. Michael Sebastian"
                    value={formData.name}
                    onChange={set('name')}
                    required
                  />
                </Field>

                <Field label="Email" error={errors.email}>
                  <TextInput
                    icon={Mail}
                    type="email"
                    placeholder="student@example.com"
                    value={formData.email}
                    onChange={set('email')}
                    required
                  />
                </Field>

                <Field label="Mobile Number (optional)" error={errors.mobile}>
                  <TextInput
                    icon={Phone}
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.mobile}
                    onChange={set('mobile')}
                  />
                </Field>

                <Button variant="primary" size="lg" fullWidth rightIcon={<ArrowRight className="w-4 h-4" />} onClick={nextStep}>
                  Continue
                </Button>
              </div>
            )}

            {/* ── STEP 2: College Information ──────────────────────────────────── */}
            {step === 2 && (
              <div className="space-y-5">
                <h2 className="text-base font-bold text-cx-0 mb-5">College Information</h2>

                <Field label="College / University" error={errors.college}>
                  <SelectInput icon={Building2} value={formData.college} onChange={set('college')}>
                    {INDIAN_CAMPUSES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </SelectInput>
                </Field>

                <Field label="Campus / Branch" error={errors.campus}>
                  <TextInput
                    icon={Building2}
                    placeholder="e.g. Kattankulathur, Chennai"
                    value={formData.campus}
                    onChange={set('campus')}
                  />
                </Field>

                <Field label="Course / Degree" error={errors.course}>
                  <SelectInput icon={BookOpen} value={formData.course} onChange={set('course')}>
                    {COURSES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </SelectInput>
                </Field>

                <Field label="Department (optional)" error={errors.department}>
                  <TextInput
                    icon={BookOpen}
                    placeholder="e.g. School of Computing"
                    value={formData.department}
                    onChange={set('department')}
                  />
                </Field>

                <Field label="Year of Study" error={errors.year}>
                  <SelectInput icon={GraduationCap} value={formData.year} onChange={set('year')}>
                    {YEARS.map((y) => (
                      <option key={y} value={y}>{y}</option>
                    ))}
                  </SelectInput>
                </Field>

                <div className="flex gap-3">
                  <Button variant="secondary" size="lg" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={prevStep} className="flex-1">
                    Back
                  </Button>
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={nextStep} className="flex-1">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 3: Account Security ─────────────────────────────────────── */}
            {step === 3 && (
              <div className="space-y-5">
                <h2 className="text-base font-bold text-cx-0 mb-5">Account Security</h2>

                <Field label="Password" error={errors.password}>
                  <TextInput
                    icon={Lock}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Minimum 8 characters"
                    value={formData.password}
                    onChange={set('password')}
                    required
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        className="mr-3 text-cx-500 hover:text-cx-0 transition-colors shrink-0"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                </Field>

                {formData.password && (
                  <div className="space-y-1">
                    {[
                      { label: 'At least 8 characters', ok: formData.password.length >= 8 },
                      { label: 'Contains a number', ok: /\d/.test(formData.password) },
                      { label: 'Contains a letter', ok: /[a-zA-Z]/.test(formData.password) },
                    ].map((r) => (
                      <div key={r.label} className="flex items-center space-x-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${r.ok ? 'bg-cx-0' : 'bg-cx-700'}`} />
                        <span className={`text-[11px] font-mono ${r.ok ? 'text-cx-300' : 'text-cx-600'}`}>
                          {r.label}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                <Field label="Confirm Password" error={errors.confirmPassword}>
                  <TextInput
                    icon={Lock}
                    type={showConfirm ? 'text' : 'password'}
                    placeholder="Re-enter your password"
                    value={formData.confirmPassword}
                    onChange={set('confirmPassword')}
                    required
                    rightElement={
                      <button
                        type="button"
                        onClick={() => setShowConfirm((v) => !v)}
                        className="mr-3 text-cx-500 hover:text-cx-0 transition-colors shrink-0"
                      >
                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    }
                  />
                </Field>

                <p className="text-[11px] font-mono text-cx-600 leading-relaxed">
                  Your password is hashed and never stored in plaintext. We never expose your password anywhere in the application.
                </p>

                <div className="flex gap-3">
                  <Button variant="secondary" size="lg" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={prevStep} className="flex-1">
                    Back
                  </Button>
                  <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />} onClick={nextStep} className="flex-1">
                    Continue
                  </Button>
                </div>
              </div>
            )}

            {/* ── STEP 4: Email Verification ───────────────────────────────────── */}
            {step === 4 && (
              <div className="space-y-5">
                <h2 className="text-base font-bold text-cx-0 mb-2">Verify Your Student Identity</h2>
                <p className="text-xs text-cx-400 leading-relaxed mb-5">
                  CampusXchange is designed for verified student communities. We send a 6-digit code to your email to confirm your identity.
                </p>

                {/* Email display */}
                <div className="flex items-center space-x-3 bg-cx-950 border border-cx-700 rounded-xl px-4 py-3">
                  <Mail className="w-4 h-4 text-cx-400 shrink-0" />
                  <div>
                    <div className="text-xs text-cx-400 font-mono">Sending code to</div>
                    <div className="text-sm font-semibold text-cx-0">{formData.email}</div>
                  </div>
                </div>

                {!verificationDone ? (
                  <>
                    {!codeSent ? (
                      <Button
                        variant="primary"
                        size="lg"
                        fullWidth
                        isLoading={sendingCode}
                        onClick={sendVerificationCode}
                      >
                        Send Verification Code
                      </Button>
                    ) : (
                      <div className="space-y-4">
                        {/* Dev mode notice */}
                        <div className="bg-cx-950 border border-cx-750 rounded-xl p-4 space-y-1">
                          <div className="flex items-center space-x-2 text-cx-400 font-mono text-[10px] uppercase tracking-wider">
                            <AlertCircle className="w-3.5 h-3.5" />
                            <span>Development Mode</span>
                          </div>
                          <p className="text-xs text-cx-500 leading-relaxed">
                            A real email would be sent in production. For now, your verification code is:
                          </p>
                          <div className="text-lg font-bold font-mono text-cx-0 tracking-[0.3em] mt-1">{sentCode}</div>
                        </div>

                        <Field label="Enter Verification Code" error={verifyError}>
                          <TextInput
                            icon={ShieldCheck}
                            placeholder="6-digit code"
                            value={verificationCode}
                            onChange={(e) => { setVerificationCode(e.target.value); setVerifyError(''); }}
                            maxLength={6}
                          />
                        </Field>

                        <Button variant="primary" size="lg" fullWidth onClick={verifyCode}>
                          Verify Code
                        </Button>
                        <button
                          onClick={sendVerificationCode}
                          className="w-full text-center text-xs font-mono text-cx-500 hover:text-cx-300 transition-colors"
                        >
                          Resend code
                        </button>
                      </div>
                    )}

                    <div className="flex gap-3 pt-2">
                      <Button variant="secondary" size="md" leftIcon={<ArrowLeft className="w-4 h-4" />} onClick={prevStep} className="flex-1">
                        Back
                      </Button>
                    </div>
                  </>
                ) : (
                  /* Verified state */
                  <div className="space-y-5">
                    <div className="bg-cx-950 border border-cx-700 rounded-2xl p-6 text-center space-y-3">
                      <CheckCircle2 className="w-10 h-10 text-cx-0 mx-auto" />
                      <div className="text-base font-bold text-cx-0">Identity Verified</div>
                      <p className="text-xs font-mono text-cx-500">
                        Your email has been confirmed. Your account is ready.
                      </p>
                    </div>

                    {/* Profile summary */}
                    <div className="bg-cx-950 border border-cx-800 rounded-xl p-5 space-y-3 text-xs font-mono">
                      <div className="text-cx-500 uppercase tracking-wider text-[10px] mb-3">Account Summary</div>
                      {[
                        { label: 'Name', value: formData.name },
                        { label: 'Email', value: formData.email },
                        { label: 'Mobile', value: formData.mobile || '—' },
                        { label: 'College', value: formData.college },
                        { label: 'Course', value: formData.course },
                        { label: 'Year', value: formData.year },
                      ].map((row) => (
                        <div key={row.label} className="flex items-start justify-between gap-4">
                          <span className="text-cx-600">{row.label}</span>
                          <span className="text-cx-200 text-right">{row.value}</span>
                        </div>
                      ))}
                    </div>

                    {errors.general && (
                      <div className="p-3 rounded-xl border border-cx-700 bg-cx-950 text-xs font-mono text-cx-300">
                        {errors.general}
                      </div>
                    )}

                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      isLoading={isLoading}
                      rightIcon={<ArrowRight className="w-4 h-4" />}
                      onClick={handleFinish}
                    >
                      Create Account & Enter Marketplace
                    </Button>
                  </div>
                )}
              </div>
            )}

          </div>

          {/* Footer link */}
          <p className="text-center text-xs font-mono text-cx-600 mt-6">
            Already registered?{' '}
            <button onClick={() => onNavigate('/login')} className="text-cx-300 hover:text-cx-0 transition-colors underline underline-offset-2">
              Log in here
            </button>
          </p>
        </div>
      </main>

      <Footer onNavigate={onNavigate} />
    </div>
  );
};
