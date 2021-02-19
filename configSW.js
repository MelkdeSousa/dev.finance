'use strict'

const installPWA = document.querySelector('#install-pwa')
let beforeInstallPrompt

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

if ('onbeforeinstallprompt' in window) {
  window.addEventListener('beforeinstallprompt', eventBeforeInstallPrompt => {
    eventBeforeInstallPrompt.preventDefault()

    beforeInstallPrompt = eventBeforeInstallPrompt
  })

  installPWA.addEventListener('click', () => {
    beforeInstallPrompt.prompt()
  })
}
