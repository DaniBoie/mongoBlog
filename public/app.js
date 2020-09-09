let userId

document.getElementById('submit').addEventListener('click', () => {
  event.preventDefault()
  axios.post('/api/blogposts', {
    text: document.getElementById('makeBlog').value,
    user: userId
  })
    .then(function (response) {
      console.log(response)
      let blogLi = document.createElement('li')
      blogLi.innerHTML = `
      <p>${response.data.text}</p>
      `
      document.getElementById('blogs').append(blogLi)
      document.getElementById('makeBlog').value = ''
    })
    .catch(function (error) {
      console.log(error);
    });
})

document.getElementById('submitUser').addEventListener('click', () => {
  event.preventDefault()
  document.getElementById('blogEntry').style.display = ''
  document.getElementById('userEntry').style.display = 'none'
  axios.post('/api/users', {
    name: document.getElementById('name').value,
    username: document.getElementById('username').value,
    email: document.getElementById('email').value
  })
    .then(function (response) {
      userId = response.data._id
    })
    .catch(function (error) {
      console.log(error);
    });
})