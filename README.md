## RawGitHub - Serve files directly from GitHub

[RawGitHub](https://raw-gh.goranmoomin.workers.dev) is a service similar to
[RawGit](https://rawgit.com/), but this is running on
[CloudFlare Workers](https://workers.cloudflare.com/).

### Why is this service needed?

When you request certain type of files like HTML, JS, etc... from
`raw.githubusercontent.com`, GitHub serves the raw files with `Content-Type`
set as `text/plain`. As a result, browsers won't interpret the files as HTML/JS,
but instead display them as plain text.

RawGitHub acts as a proxy between `raw.githubusercontent.com` and you, setting
the appropriate `Content-Type` header so that you can view the files straight
from GitHub.

### Try it out!

Compare the [`raw.githubusercontent.com` version](https://raw.githubusercontent.com/fish-shell/fish-site/master/site/docs/current/tutorial.html)
with [RawGitHub's version](https://raw-gh.pcr910303.workers.dev/fish-shell/fish-site/master/site/docs/current/tutorial.html)
of the repo [fish-shell/fish-site](https://github.com/fish-shell/fish-site/)'s
[tutorial](https://github.com/fish-shell/fish-site/blob/master/site/docs/current/tutorial.html).

You'll see the difference.
