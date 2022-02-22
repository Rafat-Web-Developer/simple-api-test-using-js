const loadCountries = () => {
    // const url = '';
    fetch('https://restcountries.com/v3.1/all')
        .then(res => res.json())
        .then(data => displayCountries(data));
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
                <img src="${country.flags.png}" class="img-fluid rounded" alt="flags">
            </div>
        </div>
        `
        all_posts.appendChild(div);
    });
}

loadCountries();