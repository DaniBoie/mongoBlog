// Varibles used to check if someone is either logging in or creating an account
let userId
let loginId

// Event listener to create a blogpost
document.getElementById('submit').addEventListener('click', () => {
  event.preventDefault()
  axios.post('/api/blogposts', {
    text: document.getElementById('makeBlog').value,
    user: loginId || userId
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

// Event listener to create a new user
document.getElementById('submitUser').addEventListener('click', () => {
  event.preventDefault()
  document.getElementById('blogEntry').style.display = ''
  document.getElementById('userEntry').style.display = 'none'
  document.getElementById('login').style.display = 'none'
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

// Event listener for client login
document.getElementById('submitLogin').addEventListener('click', () => {
  event.preventDefault()
  axios.get('/api/users')
    .then(res => {
      res.data.forEach(element => {
        if (document.getElementById('oldUsername').value === element.username) {
          loginId = element._id
          element.Blogposts.forEach(element => {
            console.log(element)
            let blogLi = document.createElement('li')
            blogLi.innerHTML = `
      <p>${element.text}</p>
      `
            document.getElementById('blogs').append(blogLi)
          });
          document.getElementById('blogEntry').style.display = ''
          document.getElementById('userEntry').style.display = 'none'
          document.getElementById('login').style.display = 'none'
        }
      });
    })
    .catch(function (error) {
      console.log(error);
    })
})