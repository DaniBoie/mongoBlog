self.addEventListener('install', event => {
  event.waitUntil(
    caches.open('mongoblog-cache-v1').then(cache => {
      console.log('Opened Cache')
      return cache.addAll([
        '/',
        '/auth.html',
        'index.html',
        'manifest.json',
        '/auth.js',
        '/app.js',
        ''
      ])
    })
  )
})

self.addEventListener('fetch', event => {
  if (event.request.url.includes('/api/')) {
    // event.respondWith(
    //   caches.open('data-cache-v1').then(cache => {
    //     return fetch(event.request)
    //     .then(res => {
    //       if (res.status === 200){
    //         cache.put(event.request.url, res.clone())
    //       }
    //     })
    //     .catch(err => {
    //       return cache.match(event.request)
    //     })
    //   })
    //   .catch(err => console.error(err))
    // )
    return
  }

  event.respondWith(
    fetch(event.request).catch(err => {
      return caches.match(event.request).then(res => {
        if (res) {
          return res
        } else if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/')
        }
      })
    })
  )
})