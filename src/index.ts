const ORG = "https://github.com/gopherly";
const DOMAIN = "gopherly.dev";
const PAGES_ORIGIN = "https://gopherly-www.pages.dev";

const PACKAGES: Record<string, string> = {
  synthra: `${ORG}/synthra`,
};

function vanityHTML(pkg: string, repo: string): string {
  return `<!DOCTYPE html>
<html>
<head>
  <meta name="go-import" content="${DOMAIN}/${pkg} git ${repo}">
  <meta name="go-source" content="${DOMAIN}/${pkg} ${repo} ${repo}/tree/main{/dir} ${repo}/blob/main{/dir}/{file}#L{line}">
  <meta http-equiv="refresh" content="0; url=${repo}">
</head>
<body>Redirecting to <a href="${repo}">${repo}</a></body>
</html>`;
}

export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    const pkg = url.pathname.split("/").filter(Boolean)[0];
    const repo = pkg ? PACKAGES[pkg] : undefined;

    if (url.searchParams.get("go-get") === "1") {
      if (!repo) {
        return new Response("Not Found", { status: 404 });
      }
      return new Response(vanityHTML(pkg, repo), {
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }

    if (repo) {
      return Response.redirect(repo, 302);
    }

    const pagesUrl = new URL(url.pathname + url.search, PAGES_ORIGIN);
    const proxiedRequest = new Request(pagesUrl.toString(), request);
    return fetch(proxiedRequest);
  },
};
