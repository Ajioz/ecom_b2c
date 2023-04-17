self.addEventListener('push', event => {
  const data = event.data.json()
  const options = {
    body: data.body,
    icon: 'images/icon.png',
    badge: 'images/badge.png',
    data: data.url,
    vibrate: data.vibrate.push(24 * 60 * 60)
  }
  event.waitUntil(self.registration.showNotification(data.title, options)
  );
})


self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  event.waitUntil(this.clients.openWindow(event.notification.data));
})