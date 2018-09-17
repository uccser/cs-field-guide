FROM uccser/nginx-with-gulp:1.13.3

RUN apt-get update \
    && apt-get install --no-install-suggests -y \
        gconf-service \
        git \
        libasound2 \
        libatk1.0-0 \
        libc6 \
        libcairo2 \
        libcairo2-dev \
        libcups2 \
        libdbus-1-3 \
        libexpat1 \
        libfontconfig1 \
        libgcc1 \
        libgconf-2-4 \
        libgdk-pixbuf2.0-0 \
        libgif-dev \
        libglib2.0-0 \
        libgtk-3-0 \
        libjpeg-dev \
        libnspr4 \
        libpango-1.0-0 \
        libpango1.0-dev \
        libpangocairo-1.0-0 \
        libstdc++6 \
        libx11-6 \
        libx11-xcb1 \
        libxcb1 \
        libxcomposite1 \
        libxcursor1 \
        libxdamage1 \
        libxext6 \
        libxfixes3 \
        libxi6 \
        libxrandr2 \
        libxrender1 \
        libxss1 \
        libxtst6 \
        ca-certificates \
        fonts-liberation \
        libappindicator1 \
        libnss3 \
        lsb-release \
        xdg-utils \
        wget \
        && rm -rf /var/lib/apt/lists/*

COPY ./csfieldguide/ /app/
RUN npm install
RUN npm ls
RUN npm ls --depth=0
ADD infrastructure/nginx/nginx.conf /etc/nginx/nginx.conf
