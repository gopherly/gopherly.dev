# gopherly.dev

Go vanity imports and routing for [gopherly.dev](https://gopherly.dev).

This Cloudflare Worker handles `go get gopherly.dev/<pkg>` requests and
proxies browser traffic to the [website](https://github.com/gopherly/www).

## Adding a new package

Add an entry to `PACKAGES` in `src/index.ts`:

    synthra: "https://github.com/gopherly/synthra",
    newpkg:  "https://github.com/gopherly/newpkg",

## Development

    npm install
    npm run dev

## Deploy

    npm run deploy

## License

Licensed under the [Apache License 2.0](LICENSE).
