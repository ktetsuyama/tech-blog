const newFormHandler = async (event) => {
  event.preventDefault();
  const postId = document.querySelector('#postId').value;

  const comment_title = document.querySelector('#comment-title').value.trim();
  const tidbit = document.querySelector('#comment-tidbit').value.trim();

  if (comment_title && tidbit) {
    const response = await fetch(`/api/post/${postId}/comment`, {
      method: 'POST',
      body: JSON.stringify({ comment_title, tidbit }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${postId}`);
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-post-comment-form')
  .addEventListener('submit', newFormHandler);
