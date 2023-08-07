<script lang="ts">
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
	<form method="POST">
		<p>Leave a message</p>
		<label for="email">Email</label>
		<input
			id="email"
			type="email"
			required
			name="email"
			autocomplete="username"
			placeholder="trinidad@example.com"
		/>
		<label for="message">Message</label>
		<textarea id="message" required name="message" placeholder="Leave your message…" rows={4} />
		<button type="submit">Send</button>
	</form>
</main>

<style>
	form p {
		font-weight: var(--font-weight-medium);
	}
</style>
