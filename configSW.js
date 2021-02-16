'use strict'

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

window.addEventListener('beforeinstallprompt', eventBeforeInstallPrompt => {
  eventBeforeInstallPrompt.preventDefault()

  eventBeforeInstallPrompt.prompt()
})
