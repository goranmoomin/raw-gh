const mime = require("mime/lite");
const extname = require("browser-extname");

async function handler(req) {
    let url = new URL(req.url);
    url.hostname = "raw.githubusercontent.com";
    let response = await fetch(url.toString());
    let contentType = mime.getType(extname(url.pathname));
    if(response.status !== 200) {
        return new Response(response.body, {
            status: response.status,
            statusText: response.statusText,
            "Cache-Control": "max-age=300" // 5 minutes
        });
    }

    return new Response(response.body, {
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": `${contentType}; charset=utf-8`,
            "Cache-Control": "max-age=31536000" // 1 year
        },
        status: 200
    });
}

module.exports = handler;
