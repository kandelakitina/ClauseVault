<script>
  import { onMount } from 'svelte';
  import { auth } from '$lib/stores/auth';

  let email = '';
  let password = '';
  let error = '';
  let loading = false;

  async function handleSubmit(e) {
    e.preventDefault();
    loading = true;
    error = '';

    const result = await auth.login(email, password);
    
    if (!result.success) {
      error = result.error || 'Login failed';
    }
    
    loading = false;
  }

  // Check auth status on mount
  onMount(() => {
    auth.checkAuth();
  });
</script>

<main class="auth-container">
  <div class="auth-form">
    <h1>Login to ClauseVault</h1>
    
    {#if error}
      <div class="error-message">{error}</div>
    {/if}
    
    <form on:submit={handleSubmit}>
      <div class="form-group">
        <label for="email">Email:</label>
        <input 
          id="email"
          type="email" 
          bind:value={email} 
          required 
          disabled={loading}
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password:</label>
        <input 
          id="password"
          type="password" 
          bind:value={password} 
          required 
          disabled={loading}
        />
      </div>
      
      <button type="submit" disabled={loading}>
        {#if loading}
          Logging in...
        {:else}
          Login
        {/if}
      </button>
    </form>
    
    <p>
      Don't have an account? <a href="/register">Register here</a>
    </p>
  </div>
</main>

<style>
  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    padding: 1rem;
  }
  
  .auth-form {
    width: 100%;
    max-width: 400px;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
  }
  
  .form-group {
    margin-bottom: 1rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: #555;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  input:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
  
  button {
    width: 100%;
    padding: 0.75rem;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
  }
  
  button:hover:not(:disabled) {
    background-color: #0056b3;
  }
  
  button:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
  
  .error-message {
    padding: 0.75rem;
    margin-bottom: 1rem;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 4px;
  }
  
  p {
    text-align: center;
    margin-top: 1.5rem;
    color: #666;
  }
  
  a {
    color: #007bff;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
</style>