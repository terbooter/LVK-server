#Live Video Kit server
This microservice is part of Live Video Kit (LVK).
LVK helps translate live video RTMP stream
LVK consists of 3 parts:
* [**LVK-server**](https://github.com/terbooter/LVK-server) Based on nginx rtmp module
* [**LVK-client**](https://github.com/terbooter/LVK-client) Has two adobe flash files (publisher.swf and player.swf)
* [**LVK-thumbs**](https://github.com/terbooter/LVK-thumbs) To make thumbnail for live streams


#How to build and start container
* `cd /docker-data`
* `git clone https://github.com/terbooter/LVK-server.git`
* `cd LVK-server`
* `cp docker-compose.EXAMPLE.yml docker-compose.yml`
* Open `docker-compose.yml` in editor
* Edit `SERVICE_1935_NAME` variable to set unique service name
```
  environment:
    -  SERVICE_1935_NAME=lvk_server_0
```
* Run `docker-compose up -d` will build docker image and start container in background
* Wath stats by URL`http://xx.xx.xx.xx:888/stats`