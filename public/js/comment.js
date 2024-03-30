const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#comment-title').value.trim();
  const tidbit = document.querySelector('#comment-tidbit').value.trim();

  if (title && tidbit) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, opus }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/post/:id');
    } else {
      alert('Failed to create comment');
    }
  }
};

document
  .querySelector('.new-post-comment-form')
  .addEventListener('submit', newFormHandler);
