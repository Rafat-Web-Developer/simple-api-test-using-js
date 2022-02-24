const loadCountries = () => {
    const url = 'https://restcountries.com/v3.1/all';
    const showLoading = document.getElementById('showLoading');
    showLoading.classList.remove('d-none');
    fetch(url)
        .then(res => res.json())
        .then(data => {
            showLoading.classList.add('d-none');
            displayCountries(data)
        });
}

const displayCountries = countries => {
    countries.forEach(country => {
        // console.log(country);
        const div = document.createElement('div');
        div.classList.add('col-12');
        div.classList.add('col-sm-6');
        div.classList.add('col-md-3');
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

const setDetails = getData => {
    const country_name = document.getElementById('country_name');
    const capital_name = document.getElementById('capital_name');
    const region_name = document.getElementById('region_name');
    const population = document.getElementById('population');
    const independent = document.getElementById('independent');
    const timezones = document.getElementById('timezones');
    country_name.innerText = getData[0].name.common;
    capital_name.innerText = getData[0].capital;
    region_name.innerText = getData[0].region;
    population.innerText = getData[0].population;
    independent.innerText = getData[0].independent;
    timezones.innerText = getData[0].timezones[0];
}
const showDetails = async (countryName) => {
    const url = `https://restcountries.com/v3.1/name/${countryName}`;
    const res = await fetch(url);
    const data = await res.json();
    setDetails(data);
}
