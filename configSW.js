'use strict'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('/sw.js')
    .then(() => console.log('sw registered'))
    .catch(err => console.error('error registering sw', err))
}

let deferredPrompt

window.addEventListener('beforeinstallprompt', eventBeforeInstallPrompt => {
  eventBeforeInstallPrompt.preventDefault()

  eventBeforeInstallPrompt.prompt()

  eventBeforeInstallPrompt.userChoice.then(choiceResult => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted')
    } else {
      console.log('User dismissed')
    }
    deferredPrompt = null
  })
})

window.addEventListener('appinstalled', _ => {
  console.log('PWA was installed')
})
