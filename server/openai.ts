import OpenAI from "openai";

// Using gpt-4.1-mini-2025-04-14 as requested by the user
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY_ENV_VAR,
});

export interface GeneratePortraitParams {
  imageBase64: string;
  yearWar: string;
  side: string;
  rank: string;
  branch: string;
  extraDetails?: string;
  artStyle: "oil" | "watercolor";
}

export async function generateHistoricalPortrait(
  params: GeneratePortraitParams,
): Promise<{ url: string }> {
  const { imageBase64, yearWar, side, rank, branch, extraDetails, artStyle } =
    params;

  // Create style-specific prompt
  const stylePrompts = {
    oil: "Create an oil painting portrait in the style of classical military portraiture. Use painterly realism with loose brushstrokes when viewed up close, but highly realistic at a distance. Apply dramatic lighting with heavy use of contrast, often with spotlight-like illumination or glowing atmospheres. Use muted, earthy palettes with lots of browns, greys, deep blues, and ochres, giving a grounded, natural feel. Compose it cinematically, framed like a historical painting with strong use of depth, scale, and storytelling.",
    watercolor:
      "Create an old watercolor portrait in the style of historical military watercolor paintings. Use traditional watercolor techniques with dramatic lighting and muted, earthy palettes giving a grounded natural feel. Apply an authentic old parchment/paper texture background. The style should evoke vintage military watercolor portraits from historical archives.",
  };

  const basePrompt = `Transform this person into a historical military portrait from ${yearWar}, serving as a ${rank} in the ${side} ${branch}. ${extraDetails ? `Additional details: ${extraDetails}. ` : ""}${stylePrompts[artStyle]} The portrait should look authentic to the historical period, with accurate military uniform, insignia, and styling appropriate for the ${yearWar} era. Focus on creating a dignified, formal military portrait that captures the gravitas and honor of military service during this historical period.`;

  try {
    // First, analyze the uploaded image to understand the person's features
    const analysisResponse = await openai.chat.completions.create({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this person's facial features, hair color, approximate age, and other distinguishing characteristics that should be preserved in a historical military portrait. Provide a detailed description.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const personDescription = analysisResponse.choices[0].message.content;

    // Generate the historical portrait with both description and original image
    const fullPrompt = `${basePrompt}

Person's characteristics to preserve: ${personDescription}

Important: Maintain the person's key facial features, skin tone, hair color, and general appearance while transforming them into the historical military context. The uniform and setting should be historically accurate for a ${rank} during ${yearWar} fighting for the ${side} in the ${branch}. Base this portrait off both the detailed description provided above and the reference image of the person.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1-mini-2025-04-14",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: fullPrompt,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${imageBase64}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    const generatedContent = response.choices[0].message.content;
    if (!generatedContent) {
      throw new Error("No content received from OpenAI");
    }
    
    // Since we're using chat completion, we need to generate the actual image
    const imageResponse = await openai.images.generate({
      model: "gpt-image-1",
      prompt: generatedContent,
      n: 1,
      size: "1024x1024",
      quality: "auto",
    });

    const imageUrl = imageResponse.data?.[0]?.url;
    if (!imageUrl) {
      throw new Error("No image URL received from OpenAI");
    }
    return { url: imageUrl };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(
      `Failed to generate portrait: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
