import { writable } from 'svelte/store';

// Define the user type
export interface User {
  id: string;
  email: string;
}

// Define the authentication state interface
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

// Create a writable store for authentication state
const createAuthStore = () => {
  const { subscribe, set, update } = writable<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true
  });

  return {
    subscribe,
    
    // Login function
    login: async (email: string, password: string) => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          const { user, accessToken } = data;
          
          // Store access token in localStorage
          localStorage.setItem('accessToken', accessToken);
          
          // Update store state
          set({
            user,
            isAuthenticated: true,
            loading: false
          });

          return { success: true, user };
        } else {
          return { success: false, error: data.error || 'Login failed' };
        }
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Network error' };
      }
    },

    // Register function
    register: async (email: string, password: string) => {
      try {
        const response = await fetch('http://localhost:8000/api/auth/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          const { user, accessToken } = data;
          
          // Store access token in localStorage
          localStorage.setItem('accessToken', accessToken);
          
          // Update store state
          set({
            user,
            isAuthenticated: true,
            loading: false
          });

          return { success: true, user };
        } else {
          return { success: false, error: data.error || 'Registration failed' };
        }
      } catch (error) {
        console.error('Registration error:', error);
        return { success: false, error: 'Network error' };
      }
    },

    // Logout function
    logout: async () => {
      try {
        // Clear access token from localStorage
        localStorage.removeItem('accessToken');
        
        // Clear refresh token cookie by calling the logout endpoint
        await fetch('http://localhost:8000/api/auth/logout', {
          method: 'POST'
        });
        
        // Update store state
        set({
          user: null,
          isAuthenticated: false,
          loading: false
        });
      } catch (error) {
        console.error('Logout error:', error);
        // Still clear local state even if network request fails
        localStorage.removeItem('accessToken');
        set({
          user: null,
          isAuthenticated: false,
          loading: false
        });
      }
    },

    // Check authentication status
    checkAuth: async () => {
      const token = localStorage.getItem('accessToken');
      
      if (!token) {
        set({
          user: null,
          isAuthenticated: false,
          loading: false
        });
        return;
      }

      try {
        // Verify token by making a request to a protected endpoint
        const response = await fetch('http://localhost:8000/api/auth/verify', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.ok) {
          const userData = await response.json();
          
          set({
            user: userData,
            isAuthenticated: true,
            loading: false
          });
        } else {
          // Token is invalid, clear it
          localStorage.removeItem('accessToken');
          set({
            user: null,
            isAuthenticated: false,
            loading: false
          });
        }
      } catch (error) {
        console.error('Auth check error:', error);
        localStorage.removeItem('accessToken');
        set({
          user: null,
          isAuthenticated: false,
          loading: false
        });
      }
    }
  };
};

export const auth = createAuthStore();