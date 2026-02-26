<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth';

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
</script>

<main class="container mx-auto px-4 py-8">
  <div class="text-center">
    <h1 class="text-4xl font-bold text-gray-800 mb-4">Welcome to ClauseVault</h1>
    <p class="text-lg text-gray-600 mb-8">Your trusted partner for building professional contracts</p>
    
    {#if isAuthenticated}
      <div class="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
        <strong class="font-bold">Authenticated! </strong>
        <span class="block sm:inline">Welcome back, {user?.email}!</span>
      </div>
      <div class="mt-4">
        <a href="/profile" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
          View Profile
        </a>
        <a href="/logout" class="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
          Logout
        </a>
      </div>
    {:else}
      <div class="space-x-4">
        <a href="/login" class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Login
        </a>
        <a href="/register" class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
          Register
        </a>
      </div>
    {/if}
  </div>
  
  <section class="mt-12 max-w-3xl mx-auto">
    <h2 class="text-2xl font-bold text-gray-800 mb-4">About ClauseVault</h2>
    <p class="text-gray-600 mb-4">
      ClauseVault is a professional contract clause service that helps you efficiently build contracts 
      by selecting from a curated library of vetted clauses. Whether you need monolingual or bilingual 
      contracts, our platform provides all the tools you need.
    </p>
    <p class="text-gray-600">
      Our drag-and-drop interface makes contract creation simple and intuitive, allowing you to focus on 
      the legal substance rather than formatting.
    </p>
  </section>
</main>