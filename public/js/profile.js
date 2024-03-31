const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const opus = document.querySelector('#post-opus').value.trim();

  if (title && opus) {
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({ title, opus }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      document.location.replace('/profile');
    } else {
      alert('Failed to create post');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
