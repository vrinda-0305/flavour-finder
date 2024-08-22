const searchBox=document.querySelector('.searchBox');
const searchBtn=document.querySelector('.searchBtn');
const recipeContainer=document.querySelector('.recipe-container');
const recipeDetailsContent=document.querySelector('.recipe-details-content');
const recipecloseBtn=document.querySelector('.recipe-close-btn');
const surpriseMeBtn=document.getElementById('surpriseMeBtn');

const fetchRecipes=async(query)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>";
    try 
    {
    const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response=await data.json();
    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv=document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}"/>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
        `
        const button=document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        //adding event listener to view recipe button
        button.addEventListener('click', () => {
            openRecipePopup(meal);
        })

        recipeContainer.appendChild(recipeDiv);
    });
} 
catch (error) {
    recipeContainer.innerHTML="<h2>We do not have what you requested,coming back with more recipes soon!</h2>"
        
}
    
}

//for measurements on the recipe card
const fetchIngredients = (meal) => {
    let ingredientList="";
    for(let i=1;i<=20;i++)
    {
        const ingredient=meal[`strIngredient${i}`];
        if(ingredient){
            const measure=meal[`strMeasure${i}`];
            ingredientList+=`<li>${measure} ${ingredient}</li>`
        }
        else
        {
            break;
        }
    }
    return ingredientList;
}
const openRecipePopup=(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredients:</h3>
    <ul class="ingredientList">${fetchIngredients(meal)}</ul>
    <div class="recipeInstructions">
    <h3>Instructions:</h3>
    <p>${meal.strInstructions}</p>
    </div>
    `
    recipeDetailsContent.parentElement.style.display="block";
}

recipecloseBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";

})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim();
    if(!searchInput)
    {
        recipeContainer.innerHTML=`<h2>Type the meal you want to search!</h2>`;
        return;
    }
    fetchRecipes(searchInput);
})

//added functionality surpriseMeBtn
const fetchRandomRecipe = async () => {
    try {
        recipeContainer.innerHTML = "<h2>Fetching a Random Recipe...</h2>";
        const data = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
        const response = await data.json();
        recipeContainer.innerHTML = "";
        const randomMeal = response.meals[0];
        displayRecipe(randomMeal);

    } catch (error) {
        recipeContainer.innerHTML = "<h2>Could not fetch a random recipe.Please try again later!</h2>";
    }
};

surpriseMeBtn.addEventListener('click', () => {
    fetchRandomRecipe();
});
const displayRecipe = (meal) => 
    {
    const recipeDiv = document.createElement('div');
    recipeDiv.classList.add('recipe');
    recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}"/>
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea} </span> Dish</p>
        <p>Belongs to <span>${meal.strCategory}</span> Category</p>
    `;
    
    const button = document.createElement('button');
    button.textContent = "View Recipe";
    recipeDiv.appendChild(button);
    button.addEventListener('click', () => {
        openRecipePopup(meal);
    });

    recipeContainer.appendChild(recipeDiv);
};
