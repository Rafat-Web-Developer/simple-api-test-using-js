
const showContent = getId => {
    const showLoading = document.getElementById(getId);
    showLoading.classList.remove('d-none');
}
const removeContent = getId => {
    const showLoading = document.getElementById(getId);
    showLoading.classList.add('d-none');
}

const loadCountries = () => {
    showContent('showLoading');
    const url = 'https://restcountries.com/v3.1/all';
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeContent('showLoading');
            displayCountries(data)
        });
}

const displayCountries = countries => {
    console.log(countries);
    const all_posts = document.getElementById('all_posts');
    countries.forEach(country => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card text-white mb-3" style="max-width: 18rem;">
            <div class="card-header bg-success fw-bold">UserID : <span class="text-warning">${country.name.common}</span></div>
            <div class="card-body bg-secondary text-center">
                <img src="${country.flags.svg}" class="img-fluid rounded" alt="flags">
                <button class="btn btn-warning w-50 m-3" onclick="showDetails('${country.name.common}')">Details</button>
            </div>
        </div>
        `
        all_posts.appendChild(div);
    });
}
loadCountries();

const setDetails = (getCountriesData, getWeatherData) => {
    const country_name = document.getElementById('country_name');
    const capital_name = document.getElementById('capital_name');
    const region_name = document.getElementById('region_name');
    const population = document.getElementById('population');
    const independent = document.getElementById('independent');
    const timezones = document.getElementById('timezones');
    const weather = document.getElementById('weather');
    country_name.innerText = getCountriesData[0].name.common;
    capital_name.innerText = getCountriesData[0].capital;
    region_name.innerText = getCountriesData[0].region;
    population.innerText = getCountriesData[0].population;
    independent.innerText = getCountriesData[0].independent;
    timezones.innerText = getCountriesData[0].timezones[0];
    weather.innerText = `${getWeatherData.current.temp_c} celsius`;
}
const showDetails = async (countryName) => {
    removeContent('detailsDiv');
    showContent('showLoading');
    const CountryUrl = `https://restcountries.com/v3.1/name/${countryName}`;
    const countriesRes = await fetch(CountryUrl);
    const countriesData = await countriesRes.json();
    
    const WeatherUrl = `https://api.weatherapi.com/v1/current.json?key=6aa1712ae73e42ee98c104058222402&q=${countryName}&aqi=no`;
    const weatherRes = await fetch(WeatherUrl);
    const weatherData = await weatherRes.json();

    removeContent('showLoading');
    showContent('detailsDiv');
    setDetails(countriesData, weatherData);
}

document.getElementById('searchBTN').addEventListener('click', (event) => {
    const all_posts = document.getElementById('all_posts');
    all_posts.textContent = '';
    removeContent('notFound');
    showContent('showCountrySection');
    showContent('showLoading');
    const searchText = document.getElementById('searchCountryFiled').value;
    const url = `https://restcountries.com/v3.1/name/${searchText}/?fullText=true`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            if(data.status === 404){
                removeContent('showCountrySection');
                removeContent('showLoading')
                showContent('notFound');
            }else{
                removeContent('notFound');
                removeContent('showLoading')
                showContent('showCountrySection');
                displayCountries(data);
            }
        });
});