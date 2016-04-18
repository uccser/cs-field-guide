# CSS Base Files Folder

This folder contains CSS and font files available to all interactives.
Third party CSS files are stored in the `third-party` subfolder, which allows our style checker to ignore these files.
All font files are stored within the `font` folder. These files don't use a `third-party` subfolder because it breaks the existing links within the third party CSS files (Materialize CSS uses these fonts), plus our style checker already ignores font files.
