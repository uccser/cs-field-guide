FROM uccser/nginx-with-gulp:1.15.5

COPY ./csfieldguide/ /app/
RUN chmod 755 /app/
RUN npm install
RUN npm ls
RUN npm ls --depth=0
ADD infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf
