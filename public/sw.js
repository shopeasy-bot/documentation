// Service worker mínimo para Web Push das notificações de vendas.
// Sem build step: servido como está pelo Next.js a partir de /public.

self.addEventListener("install", () => {
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(self.clients.claim())
})

self.addEventListener("push", (event) => {
  let payload = { title: "ShopEasy", body: "Você tem uma nova notificação." }

  if (event.data) {
    try {
      payload = { ...payload, ...event.data.json() }
    } catch {
      payload.body = event.data.text()
    }
  }

  const title = payload.title || "ShopEasy"
  const options = {
    body: payload.body,
    icon: payload.icon || "/icon.png",
    badge: payload.badge || "/icon.png",
    data: payload.data || {},
  }

  event.waitUntil(self.registration.showNotification(title, options))
})

self.addEventListener("notificationclick", (event) => {
  event.notification.close()

  const targetUrl = event.notification.data?.url

  event.waitUntil(
    self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      if (targetUrl) {
        for (const client of clientList) {
          if (client.url === targetUrl && "focus" in client) return client.focus()
        }
        return self.clients.openWindow(targetUrl)
      }

      if (clientList.length > 0) return clientList[0].focus()
      return self.clients.openWindow("/")
    }),
  )
})
