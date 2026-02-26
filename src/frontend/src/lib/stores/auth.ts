import { writable } from 'svelte/store';

// Define the user type
interface User {
  id: string;
  email: string;
}

// Create a writable store for authentication state
const createAuthStore = () => {
  const { subscribe, set, update } = writable({
    user: null as User | null,
    isAuthenticated: false,
    loading: true
  });

  return {
    subscribe,
    
    // Login function
    login: async (email: string, password: string) => {
      try {
        const response = await fetch('/api/auth/login', {
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
          return { success: false, error: data.error };
        }
      } catch (error) {
        console.error('Login error:', error);
        return { success: false, error: 'Network error' };
      }
    },

    // Register function
    register: async (email: string, password: string) => {
      try {
        const response = await fetch('/api/auth/register', {
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
          return { success: false, error: data.error };
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
        await fetch('/api/auth/logout', {
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
        // For now, we'll just set the state based on token presence
        // In a real app, you'd validate the token server-side
        
        // Placeholder: assume token is valid
        // In practice, you'd make a request to validate the token
        set({
          user: { id: 'temp-id', email: 'temp@example.com' }, // This would come from token validation
          isAuthenticated: true,
          loading: false
        });
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