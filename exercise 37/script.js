const postForm = document.querySelector("#post-form");
const postTitle = document.querySelector("#post-title");
const postImage = document.querySelector("#post-image");
const postBody = document.querySelector("#post-body");

postForm.addEventListener("submit", addPosts);

function addPosts(event) {
  event.preventDefault();
  const title = postTitle.value.trim();
  const image = postImage.value.trim();
  const body = postBody.value.trim();
  if (title !== "" && body !== "") {
    const post = {
      id: Date.now(),
      title: title,
      body: body,
      image: image,
    };
     addPostToDOM(post);
   

    postTitle.value = "";
    postImage.value = "";
    postBody.value = "";
  }
}
function addPostToDOM(post){

}
