import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Plus, RefreshCw } from "lucide-react"
import { useState, useEffect } from "react"

const [apiKey, setApiKey] = useState(localStorage.getItem("GPT_API_KEY") || "")

// Save API key to localStorage
useEffect(() => {
  localStorage.setItem("GPT_API_KEY", apiKey)
}, [apiKey])

import { generateRecipe } from "@/actions" // Import the function

export default function RecipeList() {
  const [apiKey, setApiKey] = useState("")
  const [recipeTitle, setRecipeTitle] = useState("")
  const [recipe, setRecipe] = useState(null)

  async function handleGenerateRecipe() {
    if (!apiKey || !recipeTitle) {
      alert("Please enter an API key and recipe title.")
      return
    }

    const response = await generateRecipe(recipeTitle, apiKey)
    if (response.success) {
      setRecipe(response.recipe)
    } else {
      alert("Failed to generate recipe")
    }
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recipe Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            type="password"
            placeholder="Enter OpenAI API Key"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <Input
            placeholder="Enter recipe title..."
            value={recipeTitle}
            onChange={(e) => setRecipeTitle(e.target.value)}
          />
        </div>
        <Button onClick={handleGenerateRecipe} variant="outline">
          Generate Recipe
        </Button>

        {recipe && (
          <div className="mt-4 p-4 border rounded-lg">
            <h3 className="font-semibold">{recipe.title}</h3>
            <p>{recipe.description}</p>
            <h4 className="font-semibold mt-2">Ingredients</h4>
            <ul className="list-disc ml-4">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h4 className="font-semibold mt-2">Instructions</h4>
            <ul className="list-decimal ml-4">
              {recipe.instructions.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

