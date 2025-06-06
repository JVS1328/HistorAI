
import OpenAI, { toFile } from "openai";
import fs from "fs";

// Using gpt-image-1 as requested by the user
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

  const fullPrompt = `Transform this person into a historical military portrait from ${yearWar}, serving as a ${rank} in the ${side} ${branch}. ${extraDetails ? `Additional details: ${extraDetails}. ` : ""}${stylePrompts[artStyle]} The portrait should look authentic to the historical period, with accurate military uniform, insignia, and styling appropriate for the ${yearWar} era. Focus on creating a dignified, formal military portrait that captures the gravitas and honor of military service during this historical period. Maintain the person's key facial features, skin tone, hair color, and general appearance while transforming them into the historical military context.`;

  try {
    // Convert base64 to buffer and save as temporary file
    const imageBuffer = Buffer.from(imageBase64, 'base64');
    const tempImagePath = `/tmp/input_${Date.now()}.png`;
    fs.writeFileSync(tempImagePath, imageBuffer);

    // Convert file to OpenAI format using toFile
    const imageFile = await toFile(fs.createReadStream(tempImagePath), null, {
      type: "image/png",
    });

    // Generate the historical portrait using the images edit API with gpt-image-1
    const imageResponse = await openai.images.edit({
      model: "gpt-image-1",
      image: imageFile,
      prompt: fullPrompt,
    });

    // Clean up temporary file
    fs.unlinkSync(tempImagePath);

    // Get the base64 image data directly from response
    const imageBase64Response = imageResponse.data?.[0]?.b64_json;

    if (!imageBase64Response) {
      throw new Error("No image data received from OpenAI");
    }

    // Return the base64 encoded image
    return { url: `data:image/png;base64,${imageBase64Response}` };
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw new Error(
      `Failed to generate portrait: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
