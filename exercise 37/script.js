const postForm = document.querySelector("#post-form");
const postTitle = document.querySelector("#post-title");
const postImage = document.querySelector("#post-image");
const postBody = document.querySelector("#post-body");
const postListContainer = document.querySelector(".post-list-container");

document.addEventListener("DOMContentLoaded", loadPostsFromStorage);

postForm.addEventListener("submit", addPosts);

function addPosts(event) {
  event.preventDefault();
  const title = postTitle.value.trim();
  const image = postImage.value.trim();
  const body = postBody.value.trim();

  if (title !== "" && body !== "") {
    const post = {
      id: Date.now(),
      title,
      body,
      image,
    };

    addPostToDOM(post);
    savePostToLocalStorage(post);

    postTitle.value = "";
    postImage.value = "";
    postBody.value = "";
  }
}

function addPostToDOM(post) {
  const postDiv = document.createElement("div");
  postDiv.className = "post";
  postDiv.dataset.id = post.id;

  postDiv.innerHTML = `
    ${
      post.image
        ? `<img class="post-img" src="${post.image}" alt="post image">`
        : ""
    }
    <div class="post-text">
      <h4 class="title">${post.title}</h4>
      <p>${post.body}</p>
      <button class="edit-btn">Edit</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

  postListContainer.appendChild(postDiv);

  const deleteBtn = postDiv.querySelector(".delete-btn");
  const editBtn = postDiv.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", () => deletePost(post.id, postDiv));
  editBtn.addEventListener("click", () => editPost(post.id, postDiv));
}

function savePostToLocalStorage(post) {
  const posts = getPostsFromStorage();
  posts.push(post);
  localStorage.setItem("posts", JSON.stringify(posts));
}

function getPostsFromStorage() {
  return JSON.parse(localStorage.getItem("posts")) || [];
}

function loadPostsFromStorage() {
  const posts = getPostsFromStorage();
  posts.forEach(addPostToDOM);
}

function deletePost(postId, postDiv) {
  let posts = getPostsFromStorage();
  posts = posts.filter((post) => post.id != postId);
  localStorage.setItem("posts", JSON.stringify(posts));
  postDiv.remove();
}

function editPost(postId, postDiv) {
  const posts = getPostsFromStorage();
  const post = posts.find((p) => p.id == postId);
  if (!post) return;

  const newTitle = prompt("Edit title:", post.title);
  const newBody = prompt("Edit body:", post.body);

  if (
    newTitle !== null &&
    newTitle.trim() !== "" &&
    newBody !== null &&
    newBody.trim() !== ""
  ) {
    post.title = newTitle;
    post.body = newBody;
    localStorage.setItem("posts", JSON.stringify(posts));

    const titleEl = postDiv.querySelector(".title");
    const bodyEl = postDiv.querySelector("p");
    titleEl.textContent = newTitle;
    bodyEl.textContent = newBody;
  }
}
