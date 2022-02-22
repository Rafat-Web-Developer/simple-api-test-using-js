function loadUsers(){
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => setUsers(data));
}
const setUsers = users => {
    const tbody = document.getElementById('all-users');
    for (const user of users) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <th scope="row">${user.id}</th>
        <td>${user.name}</td>
        <td>${user.email}</td>
        `;
        tbody.appendChild(tr);
    }
};
loadUsers();