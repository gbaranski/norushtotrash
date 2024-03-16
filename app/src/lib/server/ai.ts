import { OPENAI_API_KEY } from '$env/static/private';
import { categories } from '$lib';
import OpenAI from 'openai';

const openai = new OpenAI({
	apiKey: OPENAI_API_KEY
});

export type Classification = {
	title: string;
	category: string;
	description: string;
};

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const classify = async (image: File) => {
	const imageBuffer = Buffer.from(await image.arrayBuffer());
	const imageBase64 = imageBuffer.toString('base64');
	const response = await openai.chat.completions.create({
		messages: [
			{
				role: 'system',
				content: `
You're a professional marketplace assistant, your responsibility is to write a new marketplace offer based on the image provided.  
User will upload an image and you will write a description for a new marketplace offer, for reference use the item visible on the attached picture, focus just on the main subject.
Respond with a json of the following fields: "title", "category", "description".
For the category, use the code from the list below: 
${Object.entries(categories)
	.map(([key, value]) => `${key}: ${value}`)
	.join('\n')}

Markdown output is prohibited, you are communicating with an API, not a user.
Begin all AI responses with the character '{' to produce valid JSON.
`
			},
			{
				role: 'user',
				content: [
					{
						type: 'image_url',
						image_url: {
							url: `data:image/jpeg;base64,${imageBase64}`
						}
					}
				]
			}
		],
		model: 'gpt-4-vision-preview',
		max_tokens: 300
	});
	const json = JSON.parse(response.choices[0].message.content!);
	return json as Classification;
};
