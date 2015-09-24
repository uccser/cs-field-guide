# Packet Attack Interactive

**Original Author:** Sam Jarman  
**Modified By:** Jack Morgan

This interactive is created for illustrating network issues to the user, but delaying/corrupting/killing packets of data.

This interactive currently does not work in Google Chrome when viewed locally (by opening `index.html`). Either view this interactive in a different browser when viewing offline, or view it online in Google Chrome.

Currently this interactive can only be added to a page in external mode (using `interactive-external`) as the links to assets are broken in `in-page` mode.

## Required Files

- [jQuery](https://jquery.com/) (loaded from base-files folder)
- [Phaser](https://github.com/photonstorm/phaser)
- [Moment](http://momentjs.com/)
- [Moment duration format](https://github.com/jsmreese/moment-duration-format)
- [Lodash Compat](https://github.com/lodash/lodash-compat)

## Future plans

- There are still some references of birds and
  flying from the original messenger birds
  prototype. These should be updated.
- Allow full screen in phaser, but HTML button
  below interactive.
- Adapt code to align with standard Phaser
  function breakdown (preload/create/etc).
