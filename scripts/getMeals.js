const button = document.getElementById('get_meal');
const meal_container = document.getElementById('meal');

const random = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min)
}

const generateMeal = () => {
    let category_option = document.getElementById('categories').value;
    if(category_option == 'Random'){
        let URL = 'https://www.themealdb.com/api/json/v1/1/random.php';  
        axios.get(URL).then(response => {          
            printMeal(response.data.meals[0])   
        })
        .catch(error => {
            error => console.error(error)
        })     
    }
    else{
        let URL = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category_option}`;
        axios.get(URL).then(response => {
            random_number = random(0, response.data.meals.length);
            meal_name = response.data.meals[random_number].strMeal;
            
            generateMealByName(meal_name);
        })
        .catch(error => {
            error => console.error(error)
        })       
    }
}

const generateMealByName = (meal_name) => {
        let URL = `https://www.themealdb.com/api/json/v1/1/search.php?s=${meal_name}`;         
            axios.get(URL).then(response => {          
                printMeal(response.data.meals[0]);
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
            <h2>Category: ${meal.strCategory}</h2>
            <h2>Country: ${meal.strArea}</h2>
            <h5>Tags: ${meal.strTags}</h5>
        </div>
    </div>
    <div class="img-container">
        <img src="${meal.strMealThumb}" alt="Meal Image">
    </div>
    <div class="ingredients-container">
        <h2 class="ingredients">Ingredients:</h2>
        <ul>
            ${ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
    </div>
    <div class="recipe-container">
        <p>${meal.strInstructions}</p>
    </div>
    <div class="video-container">
        <h2>Video tutorial:</h2>
        <iframe class="video" src="https://www.youtube.com/embed/${meal.strYoutube.slice(-11)}" allowfullscreen>
    </iframe>
    </div>`;

    meal_container.innerHTML = newInnerHTML;
}

button.addEventListener('click', generateMeal)