const searchFood = () => {
    const searchField = document.getElementById('searchText');
    const searchText = searchField.value;
    callApiForSearchingFood(searchText);
    searchField.value = '';
}
const callApiForSearchingFood = searchText => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    fetch(url)
        .then(response => response.json())
        .then(data => displayResult(data.meals));
}

const displayResult = meals => {
    const show_result = document.getElementById('show_result');
    meals.forEach(meal => {
        console.log(meal);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100">
            <img src="${meal.strMealThumb}" class="card-img-top" alt="${meal.strMeal}_img">
            <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 300)}</p>
            </div>
        </div>
        `;
        show_result.appendChild(div);
    });
}