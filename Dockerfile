FROM nginx:latest

RUN apt-get update && apt-get install -y inotify-tools

COPY reload-nginx.sh /usr/local/bin/reload-nginx.sh
RUN chmod +x /usr/local/bin/reload-nginx.sh

CMD ["/bin/bash", "-c", "/usr/local/bin/reload-nginx.sh & nginx -g 'daemon off;'"]