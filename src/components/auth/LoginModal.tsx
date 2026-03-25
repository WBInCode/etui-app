import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Mail, Lock, User, Loader2 } from 'lucide-react';
import { useAuthStore } from '@/stores/useAuthStore';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function LoginModal() {
  const {
    isLoginModalOpen,
    loginModalMode,
    isLoading,
    error,
    login,
    register,
    closeLoginModal,
    setLoginModalMode,
    clearError,
  } = useAuthStore();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
    setFirstName('');
    setLastName('');
    setRememberMe(false);
    setAcceptTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleClose = () => {
    resetForm();
    closeLoginModal();
  };

  const handleModeSwitch = (mode: 'login' | 'register') => {
    resetForm();
    clearError();
    setLoginModalMode(mode);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await login({ email, password, rememberMe });
    if (success) {
      resetForm();
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await register({
      email,
      password,
      confirmPassword,
      firstName,
      lastName,
      acceptTerms,
    });
    if (success) {
      resetForm();
    }
  };

  return (
    <AnimatePresence>
      {isLoginModalOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-background rounded-2xl shadow-2xl border border-border overflow-hidden">
              {/* Header */}
              <div className="relative px-6 pt-6 pb-4 border-b border-border">
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <h2 className="text-2xl font-bold text-foreground">
                  {loginModalMode === 'login' ? 'Zaloguj się' : 'Utwórz konto'}
                </h2>
                <p className="text-muted-foreground mt-1">
                  {loginModalMode === 'login'
                    ? 'Witaj z powrotem! Zaloguj się do swojego konta.'
                    : 'Dołącz do YourBrand i twórz unikalne etui.'}
                </p>
              </div>

              {/* Body */}
              <div className="p-6">
                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-500 text-sm"
                    >
                      {error.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                {loginModalMode === 'login' ? (
                  /* Login Form */
                  <form onSubmit={handleLogin} className="space-y-4">
                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="twoj@email.pl"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-accent/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Hasło
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                          className="w-full pl-10 pr-12 py-3 bg-accent/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Remember me & Forgot password */}
                    <div className="flex items-center justify-between">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          className="w-4 h-4 rounded border-border text-primary focus:ring-primary"
                        />
                        <span className="text-sm text-muted-foreground">Zapamiętaj mnie</span>
                      </label>
                      <button
                        type="button"
                        className="text-sm text-primary hover:underline"
                      >
                        Zapomniałeś hasła?
                      </button>
                    </div>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="w-full h-12"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Logowanie...
                        </>
                      ) : (
                        'Zaloguj się'
                      )}
                    </Button>
                  </form>
                ) : (
                  /* Register Form */
                  <form onSubmit={handleRegister} className="space-y-4">
                    {/* Name fields */}
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Imię
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="Jan"
                            required
                            className="w-full pl-10 pr-4 py-3 bg-accent/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Nazwisko
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Kowalski"
                          required
                          className="w-full px-4 py-3 bg-accent/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="twoj@email.pl"
                          required
                          className={cn(
                            "w-full pl-10 pr-4 py-3 bg-accent/50 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
                            error?.field === 'email' ? 'border-red-500' : 'border-border'
                          )}
                        />
                      </div>
                    </div>

                    {/* Password */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Hasło
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Min. 6 znaków"
                          required
                          minLength={6}
                          className="w-full pl-10 pr-12 py-3 bg-accent/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Potwierdź hasło
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          placeholder="Powtórz hasło"
                          required
                          className={cn(
                            "w-full pl-10 pr-12 py-3 bg-accent/50 border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all",
                            error?.field === 'confirmPassword' ? 'border-red-500' : 'border-border'
                          )}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>

                    {/* Accept terms */}
                    <label className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                        required
                        className="w-4 h-4 mt-0.5 rounded border-border text-primary focus:ring-primary"
                      />
                      <span className="text-sm text-muted-foreground">
                        Akceptuję{' '}
                        <a href="/terms" className="text-primary hover:underline">
                          Regulamin
                        </a>{' '}
                        oraz{' '}
                        <a href="/privacy" className="text-primary hover:underline">
                          Politykę prywatności
                        </a>
                      </span>
                    </label>

                    {/* Submit */}
                    <Button
                      type="submit"
                      disabled={isLoading || !acceptTerms}
                      className="w-full h-12"
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Tworzenie konta...
                        </>
                      ) : (
                        'Utwórz konto'
                      )}
                    </Button>
                  </form>
                )}

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-background text-muted-foreground">lub</span>
                  </div>
                </div>

                {/* Social login buttons */}
                <div className="space-y-3">
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-accent/50 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Kontynuuj z Google
                  </button>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-3 px-4 py-3 bg-accent/50 border border-border rounded-lg text-foreground hover:bg-accent transition-colors"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Kontynuuj z Facebook
                  </button>
                </div>

                {/* Switch mode */}
                <p className="text-center text-muted-foreground mt-6">
                  {loginModalMode === 'login' ? (
                    <>
                      Nie masz konta?{' '}
                      <button
                        type="button"
                        onClick={() => handleModeSwitch('register')}
                        className="text-primary font-medium hover:underline"
                      >
                        Zarejestruj się
                      </button>
                    </>
                  ) : (
                    <>
                      Masz już konto?{' '}
                      <button
                        type="button"
                        onClick={() => handleModeSwitch('login')}
                        className="text-primary font-medium hover:underline"
                      >
                        Zaloguj się
                      </button>
                    </>
                  )}
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
