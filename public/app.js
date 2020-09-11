if('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
  })
}

let userId

axios.get('/api/users/posts', {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('user')}`
  }
})
  .then(({ data: user }) => {
    console.log(user)
    userId = user.username
    user.Blogposts.forEach(post => {
      let itemElem = document.createElement('li')
      itemElem.textContent = post.text
      document.getElementById('blogs').append(itemElem)
    })
  })
  .catch(err => {
    console.log(err)
    window.location = '/auth.html'
  })

// Event listener to create a blogpost
document.getElementById('submit').addEventListener('click', () => {
  event.preventDefault()
  axios.post('/api/blogposts', {
    text: document.getElementById('makeBlog').value,
    user: userId
  }, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('user')}`
    }
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

document.getElementById('signOut').addEventListener('click', event => {
  localStorage.removeItem('user')
  window.location = '/auth.html'
})