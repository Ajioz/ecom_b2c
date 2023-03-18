import React, { useState } from 'react';

function PushNotifications() {
  const [subscription, setSubscription] = useState(null);

  async function askPermission() {
    // Ask the user for permission to receive push notifications
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      // Get the service worker registration
      const registration = await navigator.serviceWorker.ready;
      // Subscribe the user to push notifications
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(PUBLIC_VAPID_KEY)
      });
      // Send the subscription data to your server
      await fetch('/api/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      // Update the state to show that the user is subscribed
      setSubscription(subscription);
    }
  }

  return (
    <button onClick={askPermission}>
      Enable Push Notifications
    </button>
  )
}

export default PushNotifications;