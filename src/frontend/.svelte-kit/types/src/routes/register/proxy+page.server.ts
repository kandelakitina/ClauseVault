// @ts-nocheck
import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions = {
	default: async ({ request, cookies }: import('./$types').RequestEvent) => {
		const formData = await request.formData();
		const email = formData.get('email');
		const password = formData.get('password');
		const confirmPassword = formData.get('confirmPassword');

		// Basic validation
		if (!email || !password || !confirmPassword) {
			return fail(400, { 
				email, 
				error: 'All fields are required' 
			});
		}

		if (password !== confirmPassword) {
			return fail(400, { 
				email, 
				password, 
				error: 'Passwords do not match' 
			});
		}

		if (password.length < 6) {
			return fail(400, { 
				email, 
				password, 
				error: 'Password must be at least 6 characters long' 
			});
		}

		// In a real app, you would call your backend API here
		// This is just a placeholder that redirects to the dashboard
		// after "successful" registration
		try {
			// Simulate API call to backend
			const response = await fetch('http://localhost:8000/api/auth/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password })
			});

			if (response.ok) {
				const data = await response.json();
				
				// Set cookies for authentication
				cookies.set('session', data.accessToken, {
					path: '/',
					httpOnly: true,
					sameSite: 'strict',
					secure: process.env.NODE_ENV === 'production',
					maxAge: 60 * 60 * 24 // 24 hours
				});

				// Redirect to dashboard or home
				throw redirect(303, '/');
			} else {
				const errorData = await response.json();
				return fail(response.status, {
					email,
					password,
					error: errorData.error || 'Registration failed'
				});
			}
		} catch (err) {
			console.error('Registration error:', err);
			return fail(500, {
				email,
				password,
				error: 'An unexpected error occurred during registration'
			});
		}
	}
};;null as any as Actions;