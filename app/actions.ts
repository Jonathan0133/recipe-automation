export async function generateRecipe(title: string, apiKey: string) {
  try {
    const prompt = `Generate a recipe for "${title}". Include a description, ingredients list, and step-by-step instructions.`

    const { text } = await generateText({
      model: openai({
        model: "gpt-4-turbo",
        apiKey: apiKey, // Ensure API key is passed
      }),
      prompt,
      temperature: 0.7,
    })

    // Parse the generated text into structured data
    const recipe = {
      title,
      description: "Generated description",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      instructions: ["Step 1", "Step 2"],
    }

    return { success: true, recipe }
  } catch (error) {
    console.error("Error generating recipe:", error)
    return { success: false, error: "Failed to generate recipe" }
  }
}

