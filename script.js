const commentBox = document.getElementById('comment-box');
const commentPlace = document.getElementById('comment-place');
const countText = document.getElementById('count');
const commentBtn = document.getElementById('comment-btn');

let comments = JSON.parse(localStorage.getItem('comments')) || [];
let editId = null; // track which comment is being edited

renderComments();

// Add or Update Comment
commentBtn.addEventListener('click', () => {
  const text = commentBox.value.trim();
  if (!text) return alert('Please write something!');

  // If editing
  if (editId !== null) {
    const index = comments.findIndex(c => c.id === editId);
    comments[index].text = text;
    comments[index].time = new Date().toLocaleString();

    editId = null;
    commentBtn.innerText = 'Post Comment';
    commentBox.value = '';
    saveAndRender();
    return;
  }

  // Add new comment
  const newComment = {
    id: Date.now(),
    text,
    time: new Date().toLocaleString(),
  };

  comments.push(newComment);
  saveAndRender();
  commentBox.value = '';
});

// Render
function renderComments() {
  commentPlace.innerHTML = '';

  for (let item of comments) {
    const card = document.createElement('div');
    card.className = 'comment-card';

    const text = document.createElement('p');
    text.innerText = item.text;

    const time = document.createElement('p');
    time.className = 'time';
    time.innerText = item.time;

    // Delete Button
    const delBtn = document.createElement('button');
    delBtn.className = 'del-btn';
    delBtn.innerText = 'Delete';
    delBtn.onclick = () => deleteComment(item.id);

    // Edit Button
    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerText = 'Edit';
    editBtn.onclick = () => editComment(item.id, item.text);

    card.appendChild(text);
    card.appendChild(time);
    card.appendChild(editBtn);
    card.appendChild(delBtn);

    commentPlace.appendChild(card);
  }

  countText.innerText = 'Total Comments: ' + comments.length;
}

// Delete
function deleteComment(id) {
  comments = comments.filter(c => c.id !== id);
  saveAndRender();
}

// Edit function
function editComment(id, oldText) {
  editId = id;
  commentBox.value = oldText;
  commentBtn.innerText = 'Save Changes';
  commentBox.focus();
}

// Save
function saveAndRender() {
  localStorage.setItem('comments', JSON.stringify(comments));
  renderComments();
}
