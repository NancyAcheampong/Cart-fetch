// Signup Page with OTP Verification
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { User, Mail, Lock, Eye, EyeOff, ArrowLeft, KeyRound, UserPlus } from 'lucide-react';
import { authApi, ApiError } from '../../services/api';
import { Button } from '../../components/ui';
import styles from './GeneratePinPage.module.css';

// Schemas
const signupSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  email: z.string().email('Please enter a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(128),
});

const otpSchema = z.object({
  email: z.string().email(),
  otp: z.string().min(4, 'Please enter the OTP'),
});

type SignupFormValues = z.infer<typeof signupSchema>;
type OtpFormValues = z.infer<typeof otpSchema>;
type Step = 'FORM' | 'OTP';

const GeneratePinPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>('FORM');
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [emailForOtp, setEmailForOtp] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [isCreating, setIsCreating] = useState(false);

  // Signup Form
  const {
    register,
    handleSubmit,
    reset: resetSignup,
    getValues,
    formState: { errors: signupErrors, isSubmitting: isSignupSubmitting },
  } = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
  });

  // OTP Form
  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    setValue,
    formState: { errors: otpErrors, isSubmitting: isOtpSubmitting },
  } = useForm<OtpFormValues>({
    resolver: zodResolver(otpSchema),
    defaultValues: { email: '', otp: '' },
  });

  useEffect(() => {
    if (emailForOtp) {
      setValue('email', emailForOtp);
    }
  }, [emailForOtp, setValue]);

  const onSignup = async (data: SignupFormValues) => {
    setServerMessage(null);

    try {
      await authApi.sendOtp(data);
      setEmailForOtp(data.email);
      setStep('OTP');
    } catch (error) {
      if (error instanceof ApiError) {
        setServerMessage(error.message);
      } else {
        setServerMessage('Network error. Please try again.');
      }
    }
  };

  const onVerifyOtp = async (payload: OtpFormValues) => {
    setServerMessage(null);

    try {
      await authApi.verifyOtp(payload.email, payload.otp);

      // Create customer after OTP verification
      setIsCreating(true);
      await authApi.createCustomer({
        email: getValues().email,
        password: getValues().password,
      });

      resetSignup();
      navigate('/login');
    } catch (error) {
      setIsCreating(false);
      if (error instanceof ApiError) {
        setServerMessage(error.message);
      } else {
        setServerMessage('Verification failed. Please try again.');
      }
    }
  };

  return (
    <div className={styles.signupPage}>
      <div className={styles.signupContainer}>
        <div className={styles.brandSection}>
          <h1 className={styles.brandName}>Blondes</h1>
          <p className={styles.brandTagline}>Premium Hair Care</p>
        </div>

        <div className={styles.formSection}>
          {step === 'FORM' && (
            <>
              <h2 className={styles.formTitle}>Create Account</h2>
              <p className={styles.formSubtitle}>Join us for exclusive products</p>

              {serverMessage && (
                <div className={styles.errorMessage}>{serverMessage}</div>
              )}

              <form onSubmit={handleSubmit(onSignup)} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="username">
                    Username
                  </label>
                  <div className={styles.inputWrapper}>
                    <User size={18} className={styles.inputIcon} />
                    <input
                      id="username"
                      type="text"
                      placeholder="Choose a username"
                      className={`${styles.input} ${signupErrors.username ? styles.inputError : ''}`}
                      {...register('username')}
                    />
                  </div>
                  {signupErrors.username && (
                    <span className={styles.fieldError}>{signupErrors.username.message}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="email">
                    Email Address
                  </label>
                  <div className={styles.inputWrapper}>
                    <Mail size={18} className={styles.inputIcon} />
                    <input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      className={`${styles.input} ${signupErrors.email ? styles.inputError : ''}`}
                      {...register('email')}
                    />
                  </div>
                  {signupErrors.email && (
                    <span className={styles.fieldError}>{signupErrors.email.message}</span>
                  )}
                </div>

                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="password">
                    Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <Lock size={18} className={styles.inputIcon} />
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 8 characters"
                      className={`${styles.input} ${signupErrors.password ? styles.inputError : ''}`}
                      {...register('password')}
                    />
                    <button
                      type="button"
                      className={styles.togglePassword}
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  {signupErrors.password && (
                    <span className={styles.fieldError}>{signupErrors.password.message}</span>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  fullWidth
                  loading={isSignupSubmitting}
                >
                  <UserPlus size={18} />
                  Create Account
                </Button>
              </form>

              <p className={styles.loginPrompt}>
                Already have an account?{' '}
                <Link to="/login" className={styles.loginLink}>
                  Sign in
                </Link>
              </p>
            </>
          )}

          {step === 'OTP' && (
            <>
              <div className={styles.otpHeader}>
                <button
                  className={styles.backButton}
                  onClick={() => setStep('FORM')}
                  type="button"
                >
                  <ArrowLeft size={20} />
                </button>
                <div>
                  <h2 className={styles.formTitle}>Verify Email</h2>
                  <p className={styles.formSubtitle}>
                    Enter the OTP sent to <strong>{emailForOtp}</strong>
                  </p>
                </div>
              </div>

              {serverMessage && (
                <div className={styles.errorMessage}>{serverMessage}</div>
              )}

              <form onSubmit={handleSubmitOtp(onVerifyOtp)} className={styles.form}>
                <div className={styles.inputGroup}>
                  <label className={styles.label} htmlFor="otp">
                    One-Time Password
                  </label>
                  <div className={styles.inputWrapper}>
                    <KeyRound size={18} className={styles.inputIcon} />
                    <input
                      id="otp"
                      type="text"
                      placeholder="Enter OTP"
                      className={`${styles.input} ${otpErrors.otp ? styles.inputError : ''}`}
                      {...registerOtp('otp')}
                      autoFocus
                    />
                  </div>
                  {otpErrors.otp && (
                    <span className={styles.fieldError}>{otpErrors.otp.message}</span>
                  )}
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="large"
                  fullWidth
                  loading={isOtpSubmitting || isCreating}
                >
                  {isCreating ? 'Creating Account...' : 'Verify & Continue'}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneratePinPage;
