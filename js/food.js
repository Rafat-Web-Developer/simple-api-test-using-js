const searchFood = () => {
    const searchField = document.getElementById('searchText');
    const searchText = searchField.value;
    callApiForSearchingFood(searchText);
    searchField.value = '';
}
const callApiForSearchingFood = async searchText => {
    document.getElementById('showOneMeal').textContent = "";
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`;
    const res = await fetch(url);
    const data = await res.json();
    displayResult(data.meals);
}

const displayResult = meals => {
    const show_result = document.getElementById('show_result');
    show_result.textContent = "";
    meals.forEach(meal => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 rafat-food-click" onclick="showDetails(${meal.idMeal})">
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

const showDetails = async mealId => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    const res = await fetch(url);
    const data = await res.json();
    displayMeal(data.meals[0]);
}

const displayMeal = meal => {
    const showOneMeal = document.getElementById('showOneMeal');
    showOneMeal.textContent = '';
    const div = document.createElement('div');
    div.classList.add('card');
    div.classList.add('w-75');
    div.innerHTML = `
    <div class="row g-0">
        <div class="col-md-4">
        <img src="${meal.strMealThumb}" class="img-fluid rounded-start" alt="${meal.strMeal}_img">
        </div>
        <div class="col-md-8">
        <div class="card-body">
            <h5 class="card-title">${meal.strMeal}</h5>
            <p class="card-text">${meal.strInstructions.slice(0, 500)}</p>
            <p class="card-text">
                <small class="text-muted">Food Category : ${meal.strCategory}</small><br>
                <small class="text-muted">Country : ${meal.strArea}</small>
            </p>
            <a href="${meal.strSource}" target="_blank" class="btn btn-danger">Get Food</a>
        </div>
        </div>
    </div>
    `;
    showOneMeal.appendChild(div);
}