const selectedList = document.querySelector(".selectedIngList");
const generateBtn = document.querySelector(".generate-2");
const recipeCardsContainer = document.querySelector(".recipe-output");
const mealTypeSelect = document.querySelector(".meal-select");
const cuisineTypeSelect = document.querySelector(".cuisine-select");
const customInput = document.querySelector(".c-input");
const customAddBtn = document.querySelector(".c-add");

const addIngredient = (name) => {
  const p = document.createElement("p");
  p.className = "s-ing";
  p.innerHTML = `${name}<button class="cancelIng">x</button>`;
  selectedList.appendChild(p);
};

document.querySelectorAll(".drp-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    const name = btn.textContent.trim();
    const alreadyExists = Array.from(document.querySelectorAll(".s-ing")).some(p =>
      p.textContent.includes(name)
    );
    if (!alreadyExists) addIngredient(name);
  });
});

customAddBtn.addEventListener("click", () => {
  const name = customInput.value.trim();
  if (name && !Array.from(document.querySelectorAll(".s-ing")).some(p => p.textContent.includes(name))) {
    addIngredient(name);
    customInput.value = "";
  }
});

selectedList.addEventListener("click", (e) => {
  if (e.target.classList.contains("cancelIng")) {
    e.target.parentElement.remove();
  }
});

// 🧠 Prompt creator
const generateRecipePrompt = (ingredients, mealType, cuisine) => {
  return `Create 3 unique ${mealType} recipes in ${cuisine} style using the following ingredients: ${ingredients}.
Each recipe should be returned in JSON format as an array like this:

[
  {
    "readyInMinutes": number,
    "servings": number,
    "instructions": "Step-by-step instructions",
    "extendedIngredients": [
      { "original": "ingredient with quantity" }
    ]
  },
  ...
]`;
};

// 📄 Download as PDF
const downloadRecipeAsPDF = (card) => {
  const opt = {
    margin: 0.5,
    filename: 'recipe.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
  };
  html2pdf().set(opt).from(card).save();
};

// 🧪 Gemini API call
async function generateRecipe() {
  const ingredients = Array.from(document.querySelectorAll(".s-ing"))
    .map(el => el.textContent.replace("x", "").trim());

  if (!ingredients.length) {
    alert("Please select at least one ingredient.");
    return;
  }

  const mealType = mealTypeSelect.value;
  const cuisine = cuisineTypeSelect.value;
  const prompt = generateRecipePrompt(ingredients.join(", "), mealType, cuisine);

  // Clear previous output and show loading
  recipeCardsContainer.innerHTML = "<p>⏳ Generating recipe...</p>";

  const apiKey = "AIzaSyAvncD5QA-8B37ACT_nA_xY6futVoPD5Qw";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const requestBody = {
    contents: [
      {
        parts: [{ text: prompt }],
      },
    ],
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    const data = await res.json();

    if (data.error) {
      recipeCardsContainer.innerHTML = `<p style="color: red;">❌ Error: ${data.error.message}</p>`;
      return;
    }

    const content = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!content) {
      recipeCardsContainer.innerHTML = `<p style="color: red;">❌ Failed to get recipe.</p>`;
      return;
    }

    const jsonStart = content.indexOf("[");
    const jsonEnd = content.lastIndexOf("]");
    const jsonString = content.slice(jsonStart, jsonEnd + 1);

    let recipes;
    try {
      recipes = JSON.parse(jsonString);
    } catch (e) {
      recipeCardsContainer.innerHTML = `<p style="color: red;">❌ Error parsing recipe data.</p>`;
      return;
    }

    // Clear loading text
    recipeCardsContainer.innerHTML = "";

    recipes.slice(0, 3).forEach((recipe, i) => {
      const card = document.createElement("div");
      card.className = "recipe-card";
      card.innerHTML = `
        <h3>🍽️ Recipe ${i + 1}</h3>
        <p><strong>Ready in:</strong> ${recipe.readyInMinutes} minutes</p>
        <p><strong>Servings:</strong> ${recipe.servings}</p>
        <p><strong>Instructions:</strong></p>
        <p>${recipe.instructions}</p>
        <p><strong>Ingredients:</strong></p>
        <ul>${recipe.extendedIngredients.map(ing => `<li>${ing.original}</li>`).join("")}</ul>
        <button class="download-btn">📄 Download PDF</button>
      `;
      recipeCardsContainer.appendChild(card);

      card.querySelector(".download-btn").addEventListener("click", () => downloadRecipeAsPDF(card));
    });

  } catch (err) {
    console.error("Gemini error:", err);
    recipeCardsContainer.innerHTML = `<p style="color: red;">❌ Error generating recipe.</p>`;
  }
}

generateBtn.addEventListener("click", generateRecipe);

