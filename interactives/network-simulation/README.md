
This interactive uses browserify to generate a single javascript file from CoffeeScript source, if you want to edit the source files run these commands once (make sure you have npm installed):
```bash
npm install -g browserify # Possibly sudo if nodejs is installed as root
                          # consider using nvm if you need npm as non-root
npm install # In the interactive directory
```
and any time code is changed run:
```bash
npm run build-js
```
