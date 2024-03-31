const editButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');
    try {
      const response = await fetch(`/post/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ postId: id }),
      });

      if (response.ok) {
        document.location.replace(`/post/${id}`);
      } else {
        const responseData = await response.json();
        alert(responseData.message || 'Failed to edit post');
      }
    } catch (error) {
      console.error('Error editing post:', error);
      alert('An error occurred while editing post');
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    try {
      const response = await fetch(`/post/${id}`, {
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

document
  .querySelector('.btn-warning')
  .addEventListener('submit', editButtonHandler);

document
  .querySelector('.btn-danger')
  .addEventListener('submit', delButtonHandler);
