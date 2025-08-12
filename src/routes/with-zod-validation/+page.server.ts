import { contactFormSchema } from '$lib/schema';
import type { Actions } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { flattenError, ZodError } from 'zod';

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
				const { fieldErrors } = flattenError(error);
				type FieldError = Record<string, string | string[]>;
				const validationErrors = Object.fromEntries(
					Object.entries(fieldErrors as FieldError).map(([key, value]) => [
						key,
						value.length === 1 ? value[0] : value,
					]),
				);
				const { email, message } = formEntries;
				return fail(400, {
					email: typeof email === 'string' ? email : '',
					message: typeof message === 'string' ? message : '',
					error: {
						...(validationErrors?.email
							? { field: 'email', message: validationErrors?.email }
							: {}),
						...(validationErrors?.message
							? { field: 'message', message: validationErrors.message }
							: {}),
					},
				});
			}
			// rethrow to enable redirect to work
			throw error;
		}
	},
};
