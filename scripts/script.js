const button = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

const generateMeal = () => {

    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php'

    axios.get(URL).then(response => {
        printMeal(response.data.meals[0])     
    })
    .catch(error => {
        error => console.error(error)
    })
}

const printMeal = (meal) => {
    const ingredients = [];
    // Put all ingredients in array 
    for(let i = 1; i <= 20; i++){
        if(meal[`strIngredient${i}`]){
            ingredients.push(
                `${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}`
            );
        }   else {
            break;
        }
    }

    const newInnerHTML = `
    <div class="meal-title-container">
        <div class="titles">
            <h1>${meal.strMeal}</h1>
            <h2>Kategoria: ${meal.strCategory}</h2>
            <h2>Kraj: ${meal.strArea}</h2>
            <h5>Tagi: ${meal.strTags}</h5>
        </div>
    </div>
    <div class="img-container">
        <img src="${meal.strMealThumb}" alt="Meal Image">
    </div>
    <div class="ingredients-container">
        <h2 class="ingredients">Składniki:</h2>
        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
    </div>
    <div class="recipe-container">
        <p>${meal.strInstructions}</p>
    </div>
    <div class="video-container">
        <h2>Poradnik wideo:</h2>
        <iframe class="video" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" allowfullscreen>
    </iframe>
    </div>`;

    meal_container.innerHTML = newInnerHTML;
}

button.addEventListener('click', generateMeal)