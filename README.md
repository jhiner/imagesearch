# imagesearch

A simple demo project showing using nodejs, express, and an mlab-hosted MongoDB.

You will need to set two environment variables (if using Heroku these would be "Config Variables"):

  - LURL_BASE_URL (example: http://localhost)
  - MONGO_URI (example: mongodb://usr:pwd@host.mlab.com:537)

### Usage

To create a little url:
http://host:port/new/(encoded url)

You will get back some JSON with the original_url and the short_url.

You can open the short_url in your browser to redirect to your original url.

