# imagesearch

A simple demo project showing using nodejs, express, and an mlab-hosted MongoDB.

You will need to set two environment variables (if using Heroku these would be "Config Variables"):

  - BING_API_KEY
  - MONGO_URI (example: mongodb://usr:pwd@host.mlab.com:537)

### Usage

To search: 
http://host:port/(search term)

To get the 10 latest searches:
http://host:port/latest
