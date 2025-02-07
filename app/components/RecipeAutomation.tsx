// RecipeAutomation Component

"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

async function generateRecipe(title, apiKey) {
  if (!apiKey) throw new Error("Missing API Key");

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-4-turbo",
      messages: [{ role: "user", content: `Generate a recipe for ${title}` }],
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "Error generating recipe";
}

export default function RecipeAutomation() {
  const [apiKey, setApiKey] = useState("");
  const [recipeTitle, setRecipeTitle] = useState("");
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const storedKey = localStorage.getItem("GPT_API_KEY");
    if (storedKey) setApiKey(storedKey);
  }, []);

  useEffect(() => {
    if (apiKey) localStorage.setItem("GPT_API_KEY", apiKey);
  }, [apiKey]);

  async function handleGenerateRecipe() {
    if (!apiKey || !recipeTitle) {
      alert("Please enter an API key and recipe title.");
      return;
    }

    try {
      const generatedText = await generateRecipe(recipeTitle, apiKey);
      setRecipe({ title: recipeTitle, description: generatedText });
    } catch {
      alert("Failed to generate recipe");
    }
  }

  return (
    <div className="max-w-2xl mx-auto mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Recipe Automation</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="password" placeholder="Enter API Key" value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
          <Input placeholder="Enter recipe title..." value={recipeTitle} onChange={(e) => setRecipeTitle(e.target.value)} className="mt-2" />
          <Button onClick={handleGenerateRecipe} variant="outline" className="mt-2">Generate Recipe</Button>

          {recipe && (
            <div className="mt-4 p-4 border rounded-lg">
              <h3 className="font-semibold">{recipe.title}</h3>
              <p>{recipe.description}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}