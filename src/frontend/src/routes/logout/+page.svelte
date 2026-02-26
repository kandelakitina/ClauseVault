<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth';
  import { goto } from '$app/navigation';

  let isLoggingOut = false;

  onMount(async () => {
    isLoggingOut = true;
    await auth.logout();
    isLoggingOut = false;
    // Redirect to home or login page after logout
    goto('/');
  });
</script>

<main class="logout-container">
  <div class="logout-content">
    {#if isLoggingOut}
      <p>Logging out...</p>
    {:else}
      <p>You have been logged out.</p>
      <a href="/">Go to Home</a>
    {/if}
  </div>
</main>

<style>
  .logout-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
  }
  
  .logout-content {
    text-align: center;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
</style>