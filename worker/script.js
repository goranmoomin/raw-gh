!function(t){var i={};function e(a){if(i[a])return i[a].exports;var o=i[a]={i:a,l:!1,exports:{}};return t[a].call(o.exports,o,o.exports,e),o.l=!0,o.exports}e.m=t,e.c=i,e.d=function(t,i,a){e.o(t,i)||Object.defineProperty(t,i,{enumerable:!0,get:a})},e.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},e.t=function(t,i){if(1&i&&(t=e(t)),8&i)return t;if(4&i&&"object"==typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(e.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&i&&"string"!=typeof t)for(var o in t)e.d(a,o,function(i){return t[i]}.bind(null,o));return a},e.n=function(t){var i=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(i,"a",i),i},e.o=function(t,i){return Object.prototype.hasOwnProperty.call(t,i)},e.p="",e(e.s=0)}([function(t,i,e){const a=e(1),o=e(2),p=e(3);addEventListener("fetch",t=>{t.respondWith(async function(t){const i=new a;i.options(/.*/,()=>new Response("",{headers:{"Access-Control-Allow-Methods":"GET","Access-Control-Max-Age":2592e3,"Content-Length":0}})),i.get(/^\/(?:|index.html)$/,()=>new Response(o["index.html"],{headers:{"Content-Type":"text/html","Cache-Control":"max-age=3600"}})),i.get(/^\/(?<user>[^\/]+?)\/(?<repo>[^\/]+?)\/(?<branch>[^\/]+?)\/(?<path>.*)\/?$/,p);return await i.route(t)}(t.request))})},function(t,i){const e=t=>i=>i.method.toLowerCase()===t.toLowerCase(),a=e("connect"),o=e("delete"),p=e("get"),n=e("head"),l=e("options"),s=e("patch"),c=e("post"),r=e("put"),m=e("trace"),d=t=>i=>{const e=new URL(i.url).pathname;return t.test(e)};t.exports=class{constructor(){this.routes=[]}handle(t,i){return this.routes.push({conditions:t,handler:i}),this}connect(t,i){return this.handle([a,d(t)],i)}delete(t,i){return this.handle([o,d(t)],i)}get(t,i){return this.handle([p,d(t)],i)}head(t,i){return this.handle([n,d(t)],i)}options(t,i){return this.handle([l,d(t)],i)}patch(t,i){return this.handle([s,d(t)],i)}post(t,i){return this.handle([c,d(t)],i)}put(t,i){return this.handle([r,d(t)],i)}trace(t,i){return this.handle([m,d(t)],i)}all(t){return this.handle([],t)}async route(t){const i=this.resolve(t);return i?await i.handler(t):new Response("resource not found",{status:404,statusText:"not found",headers:{"content-type":"text/plain"}})}resolve(t){return this.routes.find(i=>!(i.conditions&&(!Array.isArray(i)||i.conditions.length))||("function"==typeof i.conditions?i.conditions(t):i.conditions.every(i=>i(t))))}}},function(t,i){t.exports={"index.html":String.raw`
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>RawGitHub - Serve files directly from GitHub</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/water.css@2/out/water.css">
        <style>
            #url {
                width: calc(100% - 20px);
            }
        </style>
    </head>
    <body>
        <h1>RawGitHub - Serve files directly from GitHub</h1>
        <p>
            RawGitHub is a service similar to <a href="https://rawgit.com/">RawGit</a>,
            but this is running on <a href="https://workers.cloudflare.com/">CloudFlare Workers</a>.
        </p>
        <p>
            The default value of URL below is the <a href="https://fishshell.com">fish-shell</a>'s tutorial page,
            <a href="https://github.com/fish-shell/fish-site/blob/master/site/docs/current/tutorial.html">pulled directly from GitHub</a>.
            Try out <a href="https://raw.githubusercontent.com/fish-shell/fish-site/master/site/docs/current/tutorial.html">GitHub's Raw link</a>
            and compare it with the RawGitHub one!
        </p>
        <form id="form">
            <fieldset>
                <legend>RawGitHub Redirector</legend>
                <label for="url">GitHub file URL: </label>
                <input type="url" id="url" value="https://github.com/fish-shell/fish-site/blob/master/site/docs/current/tutorial.html">
                <button id="button">Get sharable URL to serve file</button>
            </fieldset>
        </form>
        <script>
            let buttonEl = document.querySelector("#button");
            let urlEl = document.querySelector("#url");
            buttonEl.onclick = function (e) {
                e.preventDefault();
                const url = new URL(urlEl.value);
                if(url.hostname === "github.com" || url.hostname === "www.github.com") {
                    url.pathname = url.pathname.replace(/^\/(?<user>[^\/]+?)\/(?<repo>[^\/]+?)\/blob\/(?<branch>[^\/]+?)\/(?<path>.*)\/?$/, "/$<user>/$<repo>/$<branch>/$<path>");
                }
                url.hostname = location.hostname;
                location.href = url.toString();
            }
        </script>
    </body>
</html>
`}},function(t,i,e){const a=e(4),o=e(7);t.exports=async function(t){let i=new URL(t.url);i.hostname="raw.githubusercontent.com";let e=await fetch(i.toString()),p=a.getType(o(i.pathname));return 200!==e.status?new Response(e.body,{status:e.status,statusText:e.statusText,"Cache-Control":"max-age=300"}):new Response(e.body,{headers:{"Access-Control-Allow-Origin":"*","Content-Type":p+"; charset=utf-8","Cache-Control":"max-age=31536000"},status:200})}},function(t,i,e){"use strict";var a=e(5);t.exports=new a(e(6))},function(t,i,e){"use strict";function a(){this._types=Object.create(null),this._extensions=Object.create(null);for(var t=0;t<arguments.length;t++)this.define(arguments[t]);this.define=this.define.bind(this),this.getType=this.getType.bind(this),this.getExtension=this.getExtension.bind(this)}a.prototype.define=function(t,i){for(var e in t){var a=t[e].map((function(t){return t.toLowerCase()}));e=e.toLowerCase();for(var o=0;o<a.length;o++){if("*"!=(p=a[o])[0]){if(!i&&p in this._types)throw new Error('Attempt to change mapping for "'+p+'" extension from "'+this._types[p]+'" to "'+e+'". Pass `force=true` to allow this, otherwise remove "'+p+'" from the list of extensions for "'+e+'".');this._types[p]=e}}if(i||!this._extensions[e]){var p=a[0];this._extensions[e]="*"!=p[0]?p:p.substr(1)}}},a.prototype.getType=function(t){var i=(t=String(t)).replace(/^.*[/\\]/,"").toLowerCase(),e=i.replace(/^.*\./,"").toLowerCase(),a=i.length<t.length;return(e.length<i.length-1||!a)&&this._types[e]||null},a.prototype.getExtension=function(t){return(t=/^\s*([^;\s]*)/.test(t)&&RegExp.$1)&&this._extensions[t.toLowerCase()]||null},t.exports=a},function(t,i){t.exports={"application/andrew-inset":["ez"],"application/applixware":["aw"],"application/atom+xml":["atom"],"application/atomcat+xml":["atomcat"],"application/atomsvc+xml":["atomsvc"],"application/bdoc":["bdoc"],"application/ccxml+xml":["ccxml"],"application/cdmi-capability":["cdmia"],"application/cdmi-container":["cdmic"],"application/cdmi-domain":["cdmid"],"application/cdmi-object":["cdmio"],"application/cdmi-queue":["cdmiq"],"application/cu-seeme":["cu"],"application/dash+xml":["mpd"],"application/davmount+xml":["davmount"],"application/docbook+xml":["dbk"],"application/dssc+der":["dssc"],"application/dssc+xml":["xdssc"],"application/ecmascript":["ecma","es"],"application/emma+xml":["emma"],"application/epub+zip":["epub"],"application/exi":["exi"],"application/font-tdpfr":["pfr"],"application/geo+json":["geojson"],"application/gml+xml":["gml"],"application/gpx+xml":["gpx"],"application/gxf":["gxf"],"application/gzip":["gz"],"application/hjson":["hjson"],"application/hyperstudio":["stk"],"application/inkml+xml":["ink","inkml"],"application/ipfix":["ipfix"],"application/java-archive":["jar","war","ear"],"application/java-serialized-object":["ser"],"application/java-vm":["class"],"application/javascript":["js","mjs"],"application/json":["json","map"],"application/json5":["json5"],"application/jsonml+json":["jsonml"],"application/ld+json":["jsonld"],"application/lost+xml":["lostxml"],"application/mac-binhex40":["hqx"],"application/mac-compactpro":["cpt"],"application/mads+xml":["mads"],"application/manifest+json":["webmanifest"],"application/marc":["mrc"],"application/marcxml+xml":["mrcx"],"application/mathematica":["ma","nb","mb"],"application/mathml+xml":["mathml"],"application/mbox":["mbox"],"application/mediaservercontrol+xml":["mscml"],"application/metalink+xml":["metalink"],"application/metalink4+xml":["meta4"],"application/mets+xml":["mets"],"application/mods+xml":["mods"],"application/mp21":["m21","mp21"],"application/mp4":["mp4s","m4p"],"application/msword":["doc","dot"],"application/mxf":["mxf"],"application/n-quads":["nq"],"application/n-triples":["nt"],"application/octet-stream":["bin","dms","lrf","mar","so","dist","distz","pkg","bpk","dump","elc","deploy","exe","dll","deb","dmg","iso","img","msi","msp","msm","buffer"],"application/oda":["oda"],"application/oebps-package+xml":["opf"],"application/ogg":["ogx"],"application/omdoc+xml":["omdoc"],"application/onenote":["onetoc","onetoc2","onetmp","onepkg"],"application/oxps":["oxps"],"application/patch-ops-error+xml":["xer"],"application/pdf":["pdf"],"application/pgp-encrypted":["pgp"],"application/pgp-signature":["asc","sig"],"application/pics-rules":["prf"],"application/pkcs10":["p10"],"application/pkcs7-mime":["p7m","p7c"],"application/pkcs7-signature":["p7s"],"application/pkcs8":["p8"],"application/pkix-attr-cert":["ac"],"application/pkix-cert":["cer"],"application/pkix-crl":["crl"],"application/pkix-pkipath":["pkipath"],"application/pkixcmp":["pki"],"application/pls+xml":["pls"],"application/postscript":["ai","eps","ps"],"application/pskc+xml":["pskcxml"],"application/raml+yaml":["raml"],"application/rdf+xml":["rdf","owl"],"application/reginfo+xml":["rif"],"application/relax-ng-compact-syntax":["rnc"],"application/resource-lists+xml":["rl"],"application/resource-lists-diff+xml":["rld"],"application/rls-services+xml":["rs"],"application/rpki-ghostbusters":["gbr"],"application/rpki-manifest":["mft"],"application/rpki-roa":["roa"],"application/rsd+xml":["rsd"],"application/rss+xml":["rss"],"application/rtf":["rtf"],"application/sbml+xml":["sbml"],"application/scvp-cv-request":["scq"],"application/scvp-cv-response":["scs"],"application/scvp-vp-request":["spq"],"application/scvp-vp-response":["spp"],"application/sdp":["sdp"],"application/set-payment-initiation":["setpay"],"application/set-registration-initiation":["setreg"],"application/shf+xml":["shf"],"application/sieve":["siv","sieve"],"application/smil+xml":["smi","smil"],"application/sparql-query":["rq"],"application/sparql-results+xml":["srx"],"application/srgs":["gram"],"application/srgs+xml":["grxml"],"application/sru+xml":["sru"],"application/ssdl+xml":["ssdl"],"application/ssml+xml":["ssml"],"application/tei+xml":["tei","teicorpus"],"application/thraud+xml":["tfi"],"application/timestamped-data":["tsd"],"application/voicexml+xml":["vxml"],"application/wasm":["wasm"],"application/widget":["wgt"],"application/winhlp":["hlp"],"application/wsdl+xml":["wsdl"],"application/wspolicy+xml":["wspolicy"],"application/xaml+xml":["xaml"],"application/xcap-diff+xml":["xdf"],"application/xenc+xml":["xenc"],"application/xhtml+xml":["xhtml","xht"],"application/xml":["xml","xsl","xsd","rng"],"application/xml-dtd":["dtd"],"application/xop+xml":["xop"],"application/xproc+xml":["xpl"],"application/xslt+xml":["xslt"],"application/xspf+xml":["xspf"],"application/xv+xml":["mxml","xhvml","xvml","xvm"],"application/yang":["yang"],"application/yin+xml":["yin"],"application/zip":["zip"],"audio/3gpp":["*3gpp"],"audio/adpcm":["adp"],"audio/basic":["au","snd"],"audio/midi":["mid","midi","kar","rmi"],"audio/mp3":["*mp3"],"audio/mp4":["m4a","mp4a"],"audio/mpeg":["mpga","mp2","mp2a","mp3","m2a","m3a"],"audio/ogg":["oga","ogg","spx"],"audio/s3m":["s3m"],"audio/silk":["sil"],"audio/wav":["wav"],"audio/wave":["*wav"],"audio/webm":["weba"],"audio/xm":["xm"],"font/collection":["ttc"],"font/otf":["otf"],"font/ttf":["ttf"],"font/woff":["woff"],"font/woff2":["woff2"],"image/aces":["exr"],"image/apng":["apng"],"image/bmp":["bmp"],"image/cgm":["cgm"],"image/dicom-rle":["drle"],"image/emf":["emf"],"image/fits":["fits"],"image/g3fax":["g3"],"image/gif":["gif"],"image/heic":["heic"],"image/heic-sequence":["heics"],"image/heif":["heif"],"image/heif-sequence":["heifs"],"image/ief":["ief"],"image/jls":["jls"],"image/jp2":["jp2","jpg2"],"image/jpeg":["jpeg","jpg","jpe"],"image/jpm":["jpm"],"image/jpx":["jpx","jpf"],"image/jxr":["jxr"],"image/ktx":["ktx"],"image/png":["png"],"image/sgi":["sgi"],"image/svg+xml":["svg","svgz"],"image/t38":["t38"],"image/tiff":["tif","tiff"],"image/tiff-fx":["tfx"],"image/webp":["webp"],"image/wmf":["wmf"],"message/disposition-notification":["disposition-notification"],"message/global":["u8msg"],"message/global-delivery-status":["u8dsn"],"message/global-disposition-notification":["u8mdn"],"message/global-headers":["u8hdr"],"message/rfc822":["eml","mime"],"model/3mf":["3mf"],"model/gltf+json":["gltf"],"model/gltf-binary":["glb"],"model/iges":["igs","iges"],"model/mesh":["msh","mesh","silo"],"model/stl":["stl"],"model/vrml":["wrl","vrml"],"model/x3d+binary":["*x3db","x3dbz"],"model/x3d+fastinfoset":["x3db"],"model/x3d+vrml":["*x3dv","x3dvz"],"model/x3d+xml":["x3d","x3dz"],"model/x3d-vrml":["x3dv"],"text/cache-manifest":["appcache","manifest"],"text/calendar":["ics","ifb"],"text/coffeescript":["coffee","litcoffee"],"text/css":["css"],"text/csv":["csv"],"text/html":["html","htm","shtml"],"text/jade":["jade"],"text/jsx":["jsx"],"text/less":["less"],"text/markdown":["markdown","md"],"text/mathml":["mml"],"text/mdx":["mdx"],"text/n3":["n3"],"text/plain":["txt","text","conf","def","list","log","in","ini"],"text/richtext":["rtx"],"text/rtf":["*rtf"],"text/sgml":["sgml","sgm"],"text/shex":["shex"],"text/slim":["slim","slm"],"text/stylus":["stylus","styl"],"text/tab-separated-values":["tsv"],"text/troff":["t","tr","roff","man","me","ms"],"text/turtle":["ttl"],"text/uri-list":["uri","uris","urls"],"text/vcard":["vcard"],"text/vtt":["vtt"],"text/xml":["*xml"],"text/yaml":["yaml","yml"],"video/3gpp":["3gp","3gpp"],"video/3gpp2":["3g2"],"video/h261":["h261"],"video/h263":["h263"],"video/h264":["h264"],"video/jpeg":["jpgv"],"video/jpm":["*jpm","jpgm"],"video/mj2":["mj2","mjp2"],"video/mp2t":["ts"],"video/mp4":["mp4","mp4v","mpg4"],"video/mpeg":["mpeg","mpg","mpe","m1v","m2v"],"video/ogg":["ogv"],"video/quicktime":["qt","mov"],"video/webm":["webm"]}},function(t,i){t.exports=function(t){if("string"!=typeof t)throw new TypeError('The "path" argument must be of type string. Received type '+typeof t);let i=-1,e=0,a=-1,o=!0,p=0;for(let n=t.length-1;n>=0;--n){let l=t.charCodeAt(n);if(47!==l)-1===a&&(o=!1,a=n+1),46===l?-1===i?i=n:1!==p&&(p=1):-1!==i&&(p=-1);else if(!o){e=n+1;break}}return-1===i||-1===a||0===p||1===p&&i===a-1&&i===e+1?"":t.slice(i,a)}}]);