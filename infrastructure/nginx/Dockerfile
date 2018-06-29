FROM uccser/nginx-with-gulp:1.13.3

RUN apt-get update \
    && apt-get install --no-install-suggests -y \
       libcairo2-dev \
       libpango1.0-dev \
       libjpeg-dev \
       libgif-dev \
    && rm -rf /var/lib/apt/lists/*

ADD csfieldguide/package.json /app/
RUN npm install
ADD ./csfieldguide/ /app/
ADD infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf
