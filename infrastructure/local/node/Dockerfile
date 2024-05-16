FROM node:20-bookworm

ARG DOCKER_UID=1000
RUN usermod -u $DOCKER_UID node

# Install required system dependencies
RUN apt-get update && apt-get install --no-install-recommends -y \
    build-essential \
    g++ \
    libcairo2-dev \
    libpango1.0-dev \
    libjpeg-dev \
    libpng-dev \
    libgif-dev \
    librsvg2-dev \
    make \
    # Cleaning up unused files
    && apt-get purge -y --auto-remove -o APT::AutoRemove::RecommendsImportant=false \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
RUN chown -R node:node /app

USER node
COPY --chown=node:node ./csfieldguide/ /app
RUN npm install

WORKDIR /app/static/interactives/algorithm-timer/
RUN npm install
WORKDIR /app/static/interactives/big-number-calculator/
RUN npm install
WORKDIR /app/static/interactives/bin-packing/
RUN npm install
WORKDIR /app/static/js/translation-rotation-interactives/
RUN npm install
WORKDIR /app/static/interactives/caesar-cipher/
RUN npm install
WORKDIR /app/static/interactives/city-trip/
RUN npm install
WORKDIR /app/static/interactives/cmy-mixer/
RUN npm install
WORKDIR /app/static/interactives/colour-matcher/
RUN npm install
WORKDIR /app/static/interactives/data-bias/
RUN npm install
WORKDIR /app/static/interactives/data-visualisation/
RUN npm install
WORKDIR /app/static/interactives/frequency-analysis/
RUN npm install
WORKDIR /app/static/interactives/jpeg-compression/
RUN npm install
WORKDIR /app/static/interactives/matrix-simplifier/
RUN npm install
WORKDIR /app/static/interactives/packet-attack/
RUN npm install
WORKDIR /app/static/interactives/password-guesser/
RUN npm install
WORKDIR /app/static/interactives/product-code-check-digit-calculation/
RUN npm install
WORKDIR /app/static/interactives/python-interpreter/
RUN npm install
WORKDIR /app/static/interactives/qr-code-generator/
RUN npm install
WORKDIR /app/static/interactives/rgb-mixer/
RUN npm install
WORKDIR /app/static/interactives/rsa-decryption/
RUN npm install
WORKDIR /app/static/interactives/rsa-encryption/
RUN npm install
WORKDIR /app/static/interactives/rsa-key-generator/
RUN npm install
WORKDIR /app/static/interactives/scene-editor/
RUN npm install
WORKDIR /app/static/interactives/sha2/
RUN npm install
WORKDIR /app/static/interactives/shannon-experiment/
RUN npm install
WORKDIR /app/static/interactives/sorting-algorithms/
RUN npm install
WORKDIR /app/static/interactives/training-ground/
RUN npm install
WORKDIR /app/static/interactives/unicode-binary/
RUN npm install
WORKDIR /app/static/interactives/unicode-chars/
RUN npm install
WORKDIR /app/static/interactives/viola-jones-face-detector/
RUN npm install

WORKDIR /app
