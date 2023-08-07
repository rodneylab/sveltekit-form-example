import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
import { ZodError } from 'zod';
import { contactFormSchema } from '$lib/schema';
// import { POSTMARK_SERVER_TOKEN } from '$env/static/private';

export const actions: Actions = {
	contact: async ({ request }) => {
		const form = await request.formData();
		const formEntries = Object.fromEntries(form);

		try {
			const { email, message } = contactFormSchema.parse(formEntries);

			/* Remember to obfuscate any real, personally identifiable information (PII) from logs,
			 * which unauthorised personnel might have access to.
			 */
			console.log({ email, message });

			/* Add logic here to process the contact form. As an example, we send the email address and
			 * message to an email account with limited access, which only personnel authorised to view PII
			 * have access to.

			await fetch('https://api.postmarkapp.com/email', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
					'X-Postmark-Server-Token': POSTMARK_SERVER_TOKEN
				},
				body: JSON.stringify({
					From: 'admin@example.com',
					To: email,
					Subject: 'Contact form message',
					TextBody: JSON.stringify({
						email,
						message
					}),
					MessageStream: 'outbound'
				})
			});

      */
			throw redirect(303, '/');
		} catch (error: unknown) {
			if (error instanceof ZodError) {
				const errors = error.flatten();
				const { email, message } = formEntries;
				const { fieldErrors } = errors;
				return fail(400, {
					email: typeof email === 'string' ? email : '',
					message: typeof message === 'string' ? message : '',
					error: {
						...(fieldErrors?.email ? { field: 'email', message: fieldErrors.email[0] } : {}),
						...(fieldErrors?.message ? { field: 'message', message: fieldErrors.message[0] } : {})
					}
				});
			}
			// rethrow to enable redirect to work
			throw error;
		}
	}
};
