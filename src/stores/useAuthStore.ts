import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { User, LoginCredentials, RegisterCredentials, AuthError } from '@/types/auth';

// ============================================
// MOCK USER DATABASE (for demo purposes)
// ============================================

const mockUsers: Array<{ email: string; password: string; user: User }> = [
  {
    email: 'demo@yourbrand.pl',
    password: 'demo123',
    user: {
      id: '1',
      email: 'demo@yourbrand.pl',
      firstName: 'Jan',
      lastName: 'Kowalski',
      createdAt: new Date('2024-01-15'),
    },
  },
];

// ============================================
// STORE INTERFACE
// ============================================

interface AuthStore {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: AuthError | null;
  isLoginModalOpen: boolean;
  loginModalMode: 'login' | 'register';

  // Actions
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (credentials: RegisterCredentials) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
  openLoginModal: (mode?: 'login' | 'register') => void;
  closeLoginModal: () => void;
  setLoginModalMode: (mode: 'login' | 'register') => void;
}

// ============================================
// AUTH STORE
// ============================================

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      isLoginModalOpen: false,
      loginModalMode: 'login',

      // Login action
      login: async (credentials: LoginCredentials) => {
        set({ isLoading: true, error: null });

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 800));

        const foundUser = mockUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        );

        if (foundUser) {
          set({
            user: foundUser.user,
            isAuthenticated: true,
            isLoading: false,
            isLoginModalOpen: false,
          });
          return true;
        } else {
          set({
            error: { message: 'Nieprawidłowy email lub hasło' },
            isLoading: false,
          });
          return false;
        }
      },

      // Register action
      register: async (credentials: RegisterCredentials) => {
        set({ isLoading: true, error: null });

        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // Check if email already exists
        const existingUser = mockUsers.find((u) => u.email === credentials.email);
        if (existingUser) {
          set({
            error: { field: 'email', message: 'Ten email jest już zarejestrowany' },
            isLoading: false,
          });
          return false;
        }

        // Validate passwords match
        if (credentials.password !== credentials.confirmPassword) {
          set({
            error: { field: 'confirmPassword', message: 'Hasła nie są identyczne' },
            isLoading: false,
          });
          return false;
        }

        // Create new user
        const newUser: User = {
          id: String(mockUsers.length + 1),
          email: credentials.email,
          firstName: credentials.firstName,
          lastName: credentials.lastName,
          createdAt: new Date(),
        };

        // Add to mock database
        mockUsers.push({
          email: credentials.email,
          password: credentials.password,
          user: newUser,
        });

        set({
          user: newUser,
          isAuthenticated: true,
          isLoading: false,
          isLoginModalOpen: false,
        });

        return true;
      },

      // Logout action
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          error: null,
        });
      },

      // Clear error
      clearError: () => {
        set({ error: null });
      },

      // Modal actions
      openLoginModal: (mode = 'login') => {
        set({ isLoginModalOpen: true, loginModalMode: mode, error: null });
      },

      closeLoginModal: () => {
        set({ isLoginModalOpen: false, error: null });
      },

      setLoginModalMode: (mode) => {
        set({ loginModalMode: mode, error: null });
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
