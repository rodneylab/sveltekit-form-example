import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types';
// import { POSTMARK_SERVER_TOKEN } from '$env/static/private';

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email');
		const message = form.get('message');

		if (typeof email === 'string' && typeof message === 'string') {
			/* Remember to obfuscate any real, personally identifiable information (PII) from logs,
			 * which unauthorised personnel might have access to.
			 */
			console.log({ email, message });

			/* Add logic here to process the contact form. As an example, we send the email address and
		 * message to an email account, which only personnel authorised to view PII have access to.
		 *

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
		}

		throw redirect(303, '/');
	}
};
