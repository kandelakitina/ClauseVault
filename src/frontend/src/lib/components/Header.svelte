<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let isAuthenticated = false;
  let user = null;

  onMount(() => {
    // Subscribe to auth store
    const unsubscribe = auth.subscribe((state) => {
      isAuthenticated = state.isAuthenticated;
      user = state.user;
    });

    // Check auth status
    auth.checkAuth();

    return () => unsubscribe();
  });

  async function handleLogout() {
    await auth.logout();
    await goto('/login');
  }
</script>

<header class="bg-gray-800 text-white shadow-md">
  <nav class="container mx-auto px-4 py-3">
    <div class="flex justify-between items-center">
      <div class="flex items-center space-x-2">
        <a href="/" class="text-xl font-bold hover:text-gray-300 transition-colors">
          ClauseVault
        </a>
      </div>

      <div class="flex items-center space-x-6">
        {#if isAuthenticated}
          <span class="hidden md:inline text-sm">Welcome, {user?.email}</span>
          
          <a href="/profile" class="hover:text-gray-300 transition-colors">
            Profile
          </a>
          
          <button 
            on:click={handleLogout}
            class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
          >
            Logout
          </button>
        {:else}
          <a 
            href="/login" 
            class="hover:text-gray-300 transition-colors"
          >
            Login
          </a>
          
          <a 
            href="/register" 
            class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Register
          </a>
        {/if}
      </div>
      
      <!-- Mobile menu button -->
      <div class="md:hidden">
        <button class="text-white focus:outline-none">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</header>