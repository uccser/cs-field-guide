# Packet Attack Interactive

**Original Author:** Sam Jarman  
**Modified By:** Jack Morgan, Alasdair Smith

This interactive is created for illustrating network issues to the user.
The user delays/corrupts/kills packets of data to prevent messages being sent, working through levels with increasing amounts of data protection.

## Commands

The user can press one of three command buttons to affect packets in the 'danger zone':

- `Delay` - Sends the packet back to the start, potentially affecting the order in which packets are received.
- `Corrupt` - Destroys the character within the packet, so the receiver doesn't know what it was.
- `Kill` - Destroys the packet, so it is never received.

There is also a `Pause/Play` button which affects all timers & packets, but not UI elements.

## Configuration

Each level and its configuration can be found in `packet-attack/js/config.js`.
There are eight in total, with Level 0 reserved for a level created from URL parameter input.

The last level in the array is, by design, impossible to beat.
The program will return to Level 1 if the last level is beaten.

## URL Parameters

*NOTE: `start=0` or `start=custom` is required for other URL parameters to take effect.*

All possible URL parameters are listed here:

- `start=level` (default: 1) - where `level` is:
  - `0|custom` - Sets Packet Attack to run the customised Level 0.
  - `[1-7]` - Sets Packet Attack to begin at the given level and progress normally.
- `message=` (default: 'LONDON') - Sets the custom level to use the given message.
- `shields=true|false` (default: false) - Sets all sent packets (excluding ACKs/NACKs) to have shields, which protect from a single corruption.
- `numbers=true|false` (default: false) - Sets all packets (including ACKs/NACKs) to have numbers, which allows the preservation of order.
- `acksnacks=true|false` (default: false) - Sets the receiver to reply to each received packet with an ACK or NACK, depending on the state of itself and the received packet.
- `attackreplies=true|false` (default: false) - Sets all ACKs & NACKs to be vulnerable to attack. This will also set `acksnacks=true` because it is pointless otherwise.
- `timeouts=true|false` (default: false) - Sets the sender to resend a packet if it doesn't receive an ACK or NACK within 17 seconds. This time limit ensures both destroyed and delayed packets are affected. If this is set to `true`, include `acksnacks=true` or the level will never end.
- `delays=` (default: 1) - Sets the number of delays the user can apply to packets.
- `corrupts=` (default: 1) - Sets the number of corrupts the user can apply to packets.
- `kills=` (default: 1) - Sets the number of kills the user can apply to packets.

## Required Files

The interactive loads from a base website template which includes a JavaScript file containing jQuery, Bootstrap, and a few other utilities and polyfills.
See `static/js/website.js` for a full list.

## Licences

This interactive was created using [Phaser 3](https://www.phaser.io/phaser3).
The licence for this is listed in the LICENCE-THIRD-PARTY file, with a full copy available in the `third-party-licences` directory.

## Assets

All image assets created for Packet Attack, including sprites and backgrounds, are found in the `packet-attack/assets/` directory.
These were created by Jack Morgan and Alasdair Smith, and are freely available under the project's MIT Licence.

Email: jack.morgan@canterbury.ac.nz

## Known Issues

- The question mark (`?`) is used to show that a packet has been corrupted. Therefore, *if ACKs and NACKs are not enabled*, a packet sent with the character `?` isn't affected by corruption.
- Packets `X` and `X+3(n-1)` can potentially overlap perfectly if `X` is delayed `n` times and `X+3(n-1)` once. This is no less than 3 delays on two specific packets.
- If `timeouts=true` but `acksnacks=false`, the game shouldn't ever end, but it often does after three repetitions.
- Occasionally, the Information screen doesn't load after the player refreshes the page and then presses 'start'. This is fixed by re-refreshing the page.

## Future Plans

- Allow full screen in phaser, but HTML button below interactive.
- Create separate classes for the sending and receiving pipes, to improve readability.
