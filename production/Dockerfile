FROM richarvey/nginx-php-fpm

         WORKDIR /var/www/
         RUN rm -rf *

         COPY . /var/www/
         RUN mv public_html html

         EXPOSE 80