FROM ubuntu

RUN DEBIAN_FRONTEND=noninteractive apt update
RUN DEBIAN_FRONTEND=noninteractive apt upgrade -y
RUN DEBIAN_FRONTEND=noninteractive apt install libpcre3-dev libssl-dev zlib1g-dev nginx libnginx-mod-rtmp -y
RUN mkdir /tmp/live

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
EXPOSE 1935

ENTRYPOINT [ "/usr/sbin/nginx", "-g", "daemon off;" ]