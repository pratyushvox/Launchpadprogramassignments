interface User {
  id: number;
  name: string;
  email: string;
  company: { name: string };
  website: string;
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface Comment {
  postId: number;
  id: number;
  body: string;
}

interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  albumId: number;
  id: number;
  thumbnailUrl: string;
  title: string;
}

const app = document.getElementById('app') as HTMLElement;

async function fetchJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Failed to fetch ${url}`);
  return response.json();
}

async function loadFeed(): Promise<void> {
  app.innerHTML = '<h2>Loading feed...</h2>';

  try {
    const [posts, users, comments] = await Promise.all([
      fetchJSON<Post[]>('https://jsonplaceholder.typicode.com/posts'),
      fetchJSON<User[]>('https://jsonplaceholder.typicode.com/users'),
      fetchJSON<Comment[]>('https://jsonplaceholder.typicode.com/comments')
    ]);

    const userMap: Record<number, User> = {};
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
        if (userId) loadUserProfile(parseInt(userId));
      });
    });

  } catch (error) {
    app.innerHTML = `<p style="color:red;">Error loading feed: ${(error as Error).message}</p>`;
  }
}

async function loadUserProfile(userId: number): Promise<void> {
  app.innerHTML = '<h2>Loading user profile...</h2>';

  try {
    const [user, todos, albums] = await Promise.all([
      fetchJSON<User>(`https://jsonplaceholder.typicode.com/users/${userId}`),
      fetchJSON<Todo[]>(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`),
      fetchJSON<Album[]>(`https://jsonplaceholder.typicode.com/albums?userId=${userId}`)
    ]);

    const albumIds = albums.map(a => a.id);
    const photos = await fetchJSON<Photo[]>('https://jsonplaceholder.typicode.com/photos');
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

  } catch (error) {
    app.innerHTML = `<p style="color:red;">Error loading profile: ${(error as Error).message}</p>`;
  }
}

loadFeed();
