<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth';
  
  let user = null;
  let loading = true;
  let isAuthenticated = false;

  onMount(async () => {
    // Subscribe to auth store
    const unsubscribe = auth.subscribe((state) => {
      user = state.user;
      isAuthenticated = state.isAuthenticated;
      loading = state.loading;
    });

    // Check auth status
    await auth.checkAuth();

    return () => unsubscribe();
  });
</script>

<main class="container mx-auto px-4 py-8">
  <h1 class="text-3xl font-bold mb-6">Profile</h1>

  {#if loading}
    <div class="flex justify-center items-center">
      <p>Loading...</p>
    </div>
  {:else if !isAuthenticated}
    <div class="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded relative" role="alert">
      <strong class="font-bold">Not authenticated! </strong>
      <span class="block sm:inline">Please <a href="/login" class="underline">log in</a> to view your profile.</span>
    </div>
  {:else}
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
          Email
        </label>
        <div class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100" id="email">
          {user?.email}
        </div>
      </div>
      
      <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="id">
          User ID
        </label>
        <div class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 bg-gray-100" id="id">
          {user?.id}
        </div>
      </div>
      
      <div class="flex items-center justify-between">
        <a 
          href="/"
          class="inline-block align-baseline font-bold text-sm text-blue-600 hover:text-blue-800"
        >
          Back to Home
        </a>
      </div>
    </div>
  {/if}
</main>