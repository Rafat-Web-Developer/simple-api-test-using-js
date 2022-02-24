const displaySports = sports => {
    const tbody = document.getElementById('all-sports');
    sports.forEach(sport => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <th scope="row">${sport.idSport}</th>
        <td><img src="${sport.strSportIconGreen}" class="img-fluid rounded-start" alt="${sport.strSport}_img"></td>
        <td>${sport.strSport}</td>
        <td>
            <button class="btn btn-success">Details</button>
        </td>
        `;
        tbody.appendChild(tr);
    });
}
const callApi = async () => {
    const url = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';
    const res = await fetch(url);
    const data = await res.json();
    displaySports(data.sports);

}
const loadSports = () => {
    callApi();
}
loadSports();
