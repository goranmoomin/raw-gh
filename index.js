const Router = require("./router.js");
const staticPages = require("./static.js");
const handler = require("./handler.js");

addEventListener("fetch", event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    const router = new Router();

    // handle CORS preflighted requests
    // https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods/OPTIONS#Preflighted_requests_in_CORS
    router.options(/.*/, () => new Response("", {
        headers: {
            "Access-Control-Allow-Methods": "GET",
            "Access-Control-Max-Age": 2592000,
            "Content-Length": 0
        }
    }));

    // return default screen for root route
    router.get(/^\/(?:|index.html)$/, () => new Response(staticPages["index.html"], {
        headers: {
            "Content-Type": "text/html",
            "Cache-Control": "max-age=3600" // 1 hour
        }
    }));

    router.get(/^\/(?<user>[^\/]+?)\/(?<repo>[^\/]+?)\/(?<branch>[^\/]+?)\/(?<path>.*)\/?$/, handler);

    const resp = await router.route(request);
    return resp;
}
