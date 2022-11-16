const button = document.getElementById('get_meal');

const generateMeal = () => {

    const URL = 'https://www.themealdb.com/api/json/v1/1/random.php'

    axios.get(URL).then(response => {
        console.log(response.data)     
    })
    .catch(error => {
        error => console.error(error)
    })   
}
button.addEventListener('click', generateMeal)
