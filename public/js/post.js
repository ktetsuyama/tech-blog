let titleElement, opusElement;

const editButtonHandler = (event) => {
  event.preventDefault();

  const postElement = document.querySelector('#post');

  titleElement = postElement.querySelector('#post-title');
  opusElement = postElement.querySelector('#post-opus');
  const currentTitle = titleElement.textContent.trim();
  const currentOpus = opusElement.textContent.trim();

  titleElement.innerHTML = `<input type="text" class="post-title-input" value="" placeholder="${currentTitle}">`;
  opusElement.innerHTML = `<textarea class="post-opus-input" placeholder="${currentOpus}"></textarea>`;

  const editButton = document.querySelector('.btn-warning');
  editButton.textContent = 'Submit';
  editButton.removeEventListener('click', editButtonHandler);
  editButton.addEventListener('click', submitButtonHandler);
};

const submitButtonHandler = async (event) => {
  const title = titleElement.querySelector('.post-title-input').value.trim();
  const opus = opusElement.querySelector('.post-opus-input').value.trim();
  console.log(title);
  console.log(opus);
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    try {
      console.log('Request body:', { title, opus });
      const response = await fetch(`/api/post/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify({ title, opus }),
      });

      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        const responseData = await response.json();
        alert(responseData.message || 'Failed to edit post');
      }
    } catch (error) {
      console.log('Error editing post:', error);
      alert('An error occurred while editing post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/api/post/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        document.location.replace('/profile');
      } else {
        const responseData = await response.json();
        alert(responseData.message || 'Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting post');
    }
  }
};

const editButton = document.querySelector('.btn-warning');
editButton.addEventListener('click', editButtonHandler);

document
  .querySelector('.btn-danger')
  .addEventListener('click', delButtonHandler);
