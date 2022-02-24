const loadPost = () => {
    const showSpinner = document.getElementById('showSpinner');
    showSpinner.classList.remove('d-none');
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(res => res.json())
    .then(data => {
            showSpinner.classList.add('d-none');
            setPost(data)
        });
}

const setPost = posts => {
    const all_posts = document.getElementById('all_posts');
    for(const post of posts) {
        const div = document.createElement('div');
        div.classList.add('col-12');
        div.classList.add('col-sm-6');
        div.classList.add('col-md-3');
        div.innerHTML = `
        <div class="card text-white bg-success mb-3" style="max-width: 18rem;">
            <div class="card-header fw-bold">UserID : <span class="text-warning">${post.userId}</span></div>
            <div class="card-body">
                <h5 class="card-title text-warning">${post.title}</h5>
                <p class="card-text">${post.body}</p>
            </div>
        </div>
        `
        all_posts.appendChild(div);
    }
}

loadPost();

const newPost = {
    title: 'New Post',
    body: 'This is my new post.',
    userId: 1
};

const addPost = () => {
    fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    }).then(res => res.json()).then(data => {
        if(data){
           const showMessage = document.getElementById('showMessage');
           const showText = document.getElementById('showText');
           showText.innerText = `Post created successfully!! All information : Title = ${data.title}, Body = ${data.body}.`;
           showMessage.classList.remove('d-none');
        }
    });
}