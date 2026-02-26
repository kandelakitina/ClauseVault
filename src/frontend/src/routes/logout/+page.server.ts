import { redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ cookies }) => {
		// Remove the session cookie
		cookies.delete('session', { path: '/' });

		// Also call the backend logout endpoint to clear the refresh token
		try {
			await fetch('http://localhost:8000/api/auth/logout', {
				method: 'POST',
				credentials: 'include'
			});
		} catch (err) {
			console.error('Logout API call failed:', err);
			// Continue with redirect even if backend call fails
		}

		// Redirect to login page after logout
		throw redirect(303, '/login');
	}
};