document.getElementById('register').addEventListener('click', (event) => {
  event.preventDefault()

  axios.post('/api/users/register', {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    username: document.getElementById('username').value,
    password: document.getElementById('password').value,
  })
    .then(() => {

      Toastify({
        text: "Registered! Go to Sign In!",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        backgroundColor: "linear-gradient(to right, #00b09b, #96c93d)",
        stopOnFocus: true, // Prevents dismissing of toast on hover
      }).showToast();

      document.getElementById('name').value = ''
      document.getElementById('email').value = ''
      document.getElementById('username').value = ''
      document.getElementById('password').value = ''
    })
    .catch(err => console.log(err))
})

document.getElementById('login').addEventListener('click', (event) => {
  event.preventDefault()

  axios.post('/api/users/login', {
    username: document.getElementById('logUser').value,
    password: document.getElementById('logPass').value
  })
  .then(({data: token}) => {
    if (token) {
      localStorage.setItem('user', token)
      window.location = '/index.html'
    } else {
      Toastify({
        text: "Invalid login credentials.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: 'right', // `left`, `center` or `right`
        backgroundColor: "red",
        stopOnFocus: true, // Prevents dismissing of toast on hover
      }).showToast();
    }
  })
  .catch(err => {
    console.log(err)
    Toastify({
      text: "Whoops, something went wrong! Try again.",
      duration: 3000,
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: 'right', // `left`, `center` or `right`
      backgroundColor: "red",
      stopOnFocus: true, // Prevents dismissing of toast on hover
    }).showToast();
  })
})