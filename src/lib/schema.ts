import z from 'zod';

export const contactFormSchema = z.object({
	email: z.email({
		error: (issue) =>
			issue.input === undefined
				? 'Don’t forget to enter your email address!'
				: 'Check your email address',
	}),
	message: z
		.string({
			error: (issue) =>
				issue.input === undefined ? 'Don’t forget to leave a message!' : issue.message,
		})
		.min(1, 'Don’t forget to leave a message!')
		.max(1024, 'That’s a long message, try getting to the point quicker!'),
});
