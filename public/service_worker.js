console.log("hi from service worker")
self.addEventListener("push", (event) => {
  let title = (event.data && event.data.text()) || "Yay a message";
  const options = {
  body: "We have received a push message",
  tag: "push-simple-demo-notification-tag",
  icon: 'https://media.istockphoto.com/vectors/flat-icon-check-vector-id496603666?k=20&m=496603666&s=170667a&w=0&h=QOfI-aqzv1dEamb2evpWUvKkukJwtH4YRF_Ugwksk6Y=',
  actions: [
    {
      action: 'explore', title: 'Explore this new world',
      icon: 'https://media.istockphoto.com/vectors/flat-icon-check-vector-id496603666?k=20&m=496603666&s=170667a&w=0&h=QOfI-aqzv1dEamb2evpWUvKkukJwtH4YRF_Ugwksk6Y='
    },
    {
      action: 'close', title: 'Close notification',
      icon: 'https://media.istockphoto.com/vectors/flat-icon-check-vector-id496603666?k=20&m=496603666&s=170667a&w=0&h=QOfI-aqzv1dEamb2evpWUvKkukJwtH4YRF_Ugwksk6Y='
    },
  ]
  }
  event.waitUntil(
    self.registration.showNotification(title, options)
  )
});
