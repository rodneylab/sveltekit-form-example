<script lang="ts">
	import type { ActionData } from './$types';
	export let form: ActionData;

	let { email, error, message } = form ?? {};
	$: ({ email, error, message } = form ?? {
		email: '',
		error: { field: '', message: '' },
		message: ''
	});
</script>

<svelte:head>
	<title>Svelte Form Example</title>
	<meta
		title="description"
		content="SvelteKit form example 📝 code to get a contact form working with SvelteKit actions, and 10 tips to avoid common pitfalls 🍀"
	/>
</svelte:head>

<main>
	<h1>Contact form</h1>
	<form action="?/contact" method="POST">
		<p>Leave a message</p>
		<label for="email">Email</label>
		<input
			value={email}
			id="email"
			name="email"
			autocomplete="username"
			placeholder="trinidad@example.com"
			aria-invalid={error?.field === 'email'}
			aria-describedby={error?.field === 'email' ? 'email-error' : undefined}
		/>
		{#if error?.field === 'email'}
			<small id="email-error">{error?.message}</small>
		{/if}
		<label for="message">Message</label>
		<textarea
			value={message}
			id="message"
			name="message"
			placeholder="Leave your message…"
			rows={4}
			aria-invalid={error?.field === 'message'}
			aria-describedby={error?.field === 'message' ? 'message-error' : undefined}
		/>
		{#if error?.field === 'message'}
			<small id="message-error">{error.message}</small>
		{/if}
		<button type="submit">Send</button>
	</form>
</main>

<style>
	form p {
		font-weight: var(--font-weight-medium);
	}
</style>
