var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const app = document.getElementById('app');
function fetchJSON(url) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(url);
        if (!response.ok)
            throw new Error(`Failed to fetch ${url}`);
        return response.json();
    });
}
function loadFeed() {
    return __awaiter(this, void 0, void 0, function* () {
        app.innerHTML = '<h2>Loading feed...</h2>';
        try {
            const [posts, users, comments] = yield Promise.all([
                fetchJSON('https://jsonplaceholder.typicode.com/posts'),
                fetchJSON('https://jsonplaceholder.typicode.com/users'),
                fetchJSON('https://jsonplaceholder.typicode.com/comments')
            ]);
            const userMap = {};
            users.forEach(user => userMap[user.id] = user);
            app.innerHTML = '<h2>Feed</h2>';
            posts.slice(0, 5).forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.className = 'post';
                postDiv.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.body}</p>
        <p>By: <span class="user-name" data-user-id="${post.userId}">${userMap[post.userId].name}</span></p>
        <h4>Comments:</h4>
      `;
                const postComments = comments.filter(c => c.postId === post.id);
                postComments.forEach(comment => {
                    const cDiv = document.createElement('div');
                    cDiv.className = 'comment';
                    cDiv.textContent = comment.body;
                    postDiv.appendChild(cDiv);
                });
                app.appendChild(postDiv);
            });
            // Attach click handlers to usernames
            document.querySelectorAll('.user-name').forEach(elem => {
                elem.addEventListener('click', () => {
                    const userId = elem.getAttribute('data-user-id');
                    if (userId)
                        loadUserProfile(parseInt(userId));
                });
            });
        }
        catch (error) {
            app.innerHTML = `<p style="color:red;">Error loading feed: ${error.message}</p>`;
        }
    });
}
function loadUserProfile(userId) {
    return __awaiter(this, void 0, void 0, function* () {
        app.innerHTML = '<h2>Loading user profile...</h2>';
        try {
            const [user, todos, albums] = yield Promise.all([
                fetchJSON(`https://jsonplaceholder.typicode.com/users/${userId}`),
                fetchJSON(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`),
                fetchJSON(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
            ]);
            const albumIds = albums.map(a => a.id);
            const photos = yield fetchJSON('https://jsonplaceholder.typicode.com/photos');
            const userPhotos = photos.filter(p => albumIds.includes(p.albumId)).slice(0, 12);
            app.innerHTML = `
      <div class="user-detail">
        <h2>${user.name}</h2>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Company:</strong> ${user.company.name}</p>
        <p><strong>Website:</strong> ${user.website}</p>
        <div class="back-btn">← Back to Feed</div>
      </div>

      <h3>Photo Gallery</h3>
      <div class="gallery">
        ${userPhotos.map(p => `<img src="${p.thumbnailUrl}" alt="${p.title}">`).join('')}
      </div>

      <h3>Todos</h3>
      ${todos.map(todo => `
        <div class="todo">
          <input type="checkbox" ${todo.completed ? 'checked' : ''} disabled>
          ${todo.title}
        </div>
      `).join('')}
    `;
            // Back button event
            const backBtn = document.querySelector('.back-btn');
            if (backBtn) {
                backBtn.addEventListener('click', () => {
                    loadFeed();
                });
            }
        }
        catch (error) {
            app.innerHTML = `<p style="color:red;">Error loading profile: ${error.message}</p>`;
        }
    });
}
loadFeed();
