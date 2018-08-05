FROM uccser/nginx-with-gulp:1.13.3

RUN apt-get update \
    && apt-get install --no-install-suggests -y \
       libcairo2-dev \
       libpango1.0-dev \
       libjpeg-dev \
       libgif-dev \
       git \
    && rm -rf /var/lib/apt/lists/*

COPY ./csfieldguide/ /app/
RUN npm install
RUN npm ls
RUN npm ls --depth=0
ADD infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf
