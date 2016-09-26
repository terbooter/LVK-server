# Set the base image to Ubuntu
FROM ubuntu:14.04

# File Author / Maintainer
MAINTAINER Dmitry Zinovyev

RUN apt-get update

# Add libs
RUN apt-get install -y git-core gcc pkg-config make libpcre3 libpcre3-dev libssl-dev wget 
RUN apt-get install -y libav-tools curl

# get latest rtmp-module
RUN git clone git://github.com/arut/nginx-rtmp-module.git

# get nginx
ENV NGINX_VERSION=1.8.0
RUN wget http://nginx.org/download/nginx-$NGINX_VERSION.tar.gz
RUN tar xzf nginx-$NGINX_VERSION.tar.gz

# compile nginx with rtmp-module
RUN cd /nginx-$NGINX_VERSION && ./configure --add-module=/nginx-rtmp-module
RUN cd /nginx-$NGINX_VERSION && make && make install

RUN ln -sf /usr/local/nginx/sbin/nginx /usr/local/bin/nginx

EXPOSE 80
EXPOSE 1935

RUN rm /nginx-$NGINX_VERSION.tar.gz && rm -r /nginx-$NGINX_VERSION
ADD nginx.conf /usr/local/nginx/conf/

CMD ["nginx"]