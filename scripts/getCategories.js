category_box = document.getElementById('category');

const getCategories = () => {

    const URL = 'https://www.themealdb.com/api/json/v1/1/categories.php'

    axios.get(URL).then(response => {
        printCategories(response.data.categories)     
    })
    .catch(error => {
        error => console.error(error)
    })   
}

const printCategories = (category) => {
    const categories = [];

    // list all categories
    for(let i = 0; i < category.length; i++){
        categories.push(category[i].strCategory)
    }

    const newCategorySelect = `
    <label for="categories">Kategoria:</label>
            <select name="categories" id="categories">           
    <option value="Dowolny">Dowolna</option>
    ${categories.map(category => `<option value="${category}">${category}</option>`)}
    </select>`;

    category_box.innerHTML = newCategorySelect;
}

window.addEventListener('load', getCategories)