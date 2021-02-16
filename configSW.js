'use strict'

const paragraphFooter = document.querySelector('footer p')
let beforeInstallPrompt

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}

window.addEventListener('beforeinstallprompt', eventBeforeInstallPrompt => {
  eventBeforeInstallPrompt.preventDefault()

  beforeInstallPrompt = eventBeforeInstallPrompt
})

paragraphFooter.addEventListener('click', () => {
  beforeInstallPrompt.prompt()
})
