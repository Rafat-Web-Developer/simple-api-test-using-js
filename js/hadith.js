const displayCategory = (hadithCategory) => {
    const showHadithCategory = document.getElementById('showHadithCategory');
    hadithCategory.forEach(category => {
        // console.log(category);
        const option = document.createElement('option');
        option.setAttribute('value', category.id);
        option.innerText = category.title;
        showHadithCategory.appendChild(option);
    });
}
const callApi = async () => {
    const url = 'https://hadeethenc.com/api/v1/categories/list/?language=bn';
    const res = await fetch(url);
    const data = await res.json();
    displayCategory(data.slice(0, 10));
}
const loadHadith = () => {
    callApi();
}
loadHadith();

const displayHadith = (allHadith) => {
    const all_hadith = document.getElementById('all_hadith');
    allHadith.data.forEach(hadith => {
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="card h-100 bg-success">
            <div class="card-body text-white">
                <h5 class="card-title">ID : <span class="text-warning">${hadith.id}</span></h5>
                <p class="card-text fs-5 fw-bold">${hadith.title}</p>
            </div>
        </div>
        `
        all_hadith.appendChild(div);
    });
}

const callSearchHadithAPI = async (categoryId) => {
    document.getElementById('all_hadith').textContent = "";
    const showSpinner = document.getElementById('showSpinner');
    showSpinner.classList.remove('d-none');
    const url = `https://hadeethenc.com/api/v1/hadeeths/list/?language=bn&category_id=${categoryId}&page=1&per_page=20`;
    const res = await fetch(url);
    const data = await res.json();
    showSpinner.classList.add('d-none');
    displayHadith(data);
}

const searchHadith = () => {
    const showHadithCategory = document.getElementById('showHadithCategory');
    callSearchHadithAPI(showHadithCategory.value);
}