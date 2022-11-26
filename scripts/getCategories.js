const category_box = document.getElementById('category');

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
    <form>
    <label for="categories">Category:</label>
            <select name="categories" id="categories">           
    <option value="Random">Random</option>
    ${categories.map(category => `<option value="${category}">${category}</option>`).join('')}
    </select>
    </form>`;

    category_box.innerHTML = newCategorySelect;
}