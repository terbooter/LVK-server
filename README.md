#Live Video Kit server
This microservice is part of Live Video Kit (LVK).
LVK helps stream live video in RTMP format
LVK consists of 3 parts:
* [**LVK-server**](https://github.com/terbooter/LVK-server) Based on nginx rtmp module
* [**LVK-client**](https://github.com/terbooter/LVK-client) Has two adobe flash files (publisher.swf and player.swf)
* [**LVK-thumbs**](https://github.com/terbooter/LVK-thumbs) To make thumbnail for live streams


#How to build and start container
* `cd /docker-data`
* `git clone https://github.com/terbooter/LVK-server.git`
* `cd LVK-server`
* Make file`docker-compose.override.yml`
* Open `docker-compose.override.yml` in editor and set open ports, consul service DNS name and allowed domain
Example:
```
lvkserver:
  ports:
    - "888:80"
    - "1937:1935"
  environment:
    -  SERVICE_1935_NAME=lvk_server_0

node:
  environment:
    -  ALLOWED_DOMAINS=any
    -  ALLOWED_DOMAINS=domain1.com,domain2.com,domain3.com
```
* Run `docker-compose up -d` will build docker image and start container in background
* Watch stats by URL`http://xx.xx.xx.xx:888/stats`