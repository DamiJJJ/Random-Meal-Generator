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
    console.log(meal)

    const newInnerHTML = `
    <div class="imgContainer">
        <img src="${meal.strMealThumb}" alt="Meal Image">
    </div>`;

    meal_container.innerHTML = newInnerHTML;
}

button.addEventListener('click', generateMeal)
