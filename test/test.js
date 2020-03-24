function isIdle() {
    return lastAction + idleThresholdTime < Date.now()
}

function showNotification(e, t, n, i, a, s, o) {
    var c = {
        body: t,
        icon: n,
        badge: i,
        data: {
            url: o,
            baseUrl: s
        },
        tag: a
    };
    return self.registration.showNotification(e, c)
}

if (/(android)/i.test(navigator.userAgent)) {
    CURRENT_CACHES = {
        offline: "offline-v1"
    };
    OFFLINE_URL = "offline.html";
    createCacheBustedRequest = function (e) {
        var t = new Headers({
            "Discourse-Track-View": "0"
        });
        n = new Request(e, {
            cache: "reload",
            headers: t
        });
        if ("cache" in n) return n;
        var i = new URL(e, self.location.href);
        return i.search += (i.search ? "&" : "") + "cachebust=" + Date.now(),
            new Request(i, {
                headers: t
            })
    };
    self.addEventListener("install",
        function (e) {
            e.waitUntil(fetch(createCacheBustedRequest(OFFLINE_URL)).then(function (e) {
                return caches.open(CURRENT_CACHES.offline).then(function (t) {
                    return t.put(OFFLINE_URL, e)
                })
            }).then(function (e) {
                self.skipWaiting()
            }))
        });
    self.addEventListener("activate",
        function (e) {
            var t = Object.keys(CURRENT_CACHES).map(function (e) {
                return CURRENT_CACHES[e]
            });
            e.waitUntil(caches.keys().then(function (e) {
                return Promise.all(e.map(function (e) {
                    if (- 1 === t.indexOf(e)) return caches.delete(e)
                }))
            }).then(function () {
                self.clients.claim()
            }))
        });
    self.addEventListener("fetch",
        function (e) {
            /\?.*token/i.test(e.request.url) || ("navigate" === e.request.mode || "GET" === e.request.method && e.request.headers.get("accept").includes("text/html")) && e.respondWith(fetch(e.request).
                catch(function (e) {
                    if (navigator.onLine) throw new Error(e);
                    return caches.match(OFFLINE_URL)
                }))
        })
}



const idleThresholdTime = 1e4;
var lastActionn = -1;

self.addEventListener("push",
    function (e) {
        var t = e.data.json();
        if (!isIdle() && t.hide_when_active) return !1;
        e.waitUntil(self.registration.getNotifications({
            tag: t.tag
        }).then(function (e) {
            return e && e.length > 0 && e.forEach(function (e) {
                e.close()
            }),
                showNotification(t.title, t.body, t.icon, t.badge, t.tag, t.base_url, t.url)
        }))
    });

self.addEventListener("notificationclick",
    function (e) {
        e.notification.close();
        var t = e.notification.data.url,
            n = e.notification.data.baseUrl;
        e.waitUntil(clients.matchAll({
            type: "window"
        }).then(function (e) {
            if (!e.some(function (e) {
                return e.url === n + t && "focus" in e ? (e.focus(), !0) : "postMessage" in e && "focus" in e && (e.focus(), e.postMessage({
                    url: t
                }), !0)
            }) && clients.openWindow) return clients.openWindow(n + t)
        }))
    });
self.addEventListener("message",
    function (e) {
        "lastAction" in e.data && (lastAction = e.data.lastAction)
    });