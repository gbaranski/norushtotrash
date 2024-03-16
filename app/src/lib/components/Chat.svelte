<!-- <script lang="ts">
	import { xmtp } from '$lib/store';

	// Start a conversation with XMTP
	const conversation = await $xmtp.conversations.newConversation(
		'0x3F11b27F323b62B159D2642964fa27C46C841897'
	);
	// Load all messages in the conversation
	const messages = await conversation.messages();
	// Send a message
	await conversation.send('gm');
	// Listen for new messages in the conversation
	for await (const message of await conversation.streamMessages()) {
		console.log(`[${message.senderAddress}]: ${message.content}`);
	}
</script> -->