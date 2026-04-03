FROM ubuntu:24.04

WORKDIR /app

RUN mkdir -p /var/www/my-site
COPY ./pages /var/www/my-site/pages
COPY ./styles /var/www/my-site/styles
COPY ./scripts /var/www/my-site/scripts
COPY ./assets /var/www/my-site/assets

COPY nginx.conf /etc/nginx/sites-available/my-site

RUN apt-get update && apt-get install -y nginx
# RUN systemctl stop nginx
# RUN systemctl disable nginx
RUN rm -f /etc/nginx/sites-enabled/default && \
ln -s /etc/nginx/sites-available/my-site /etc/nginx/sites-enabled/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
