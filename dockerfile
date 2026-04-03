FROM ubuntu:latest

WORKDIR /app

RUN mkdir -p /var/www/my-site
COPY main.html /var/www/my-site/index.html
COPY style.css /var/www/my-site/style.css
COPY assets /var/www/my-site/assets

COPY nginx.conf /etc/nginx/sites-available/my-site

RUN apt-get update && apt-get install -y nginx
# RUN systemctl stop nginx
# RUN systemctl disable nginx
RUN rm -f /etc/nginx/sites-enabled/default && \
ln -s /etc/nginx/sites-available/my-site /etc/nginx/sites-enabled/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
