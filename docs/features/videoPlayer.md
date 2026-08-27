# Video Player

## Purpose

Home page player shows a loop preview by default and switches to the main video on click. A second click pauses the main video and returns to preview-like behavior.

Player interaction is protected while loading screen is active.

## Entry Points

- Markup: `index.html`
- Behavior: `scripts/videoPlayer.js`
- Visual states: `styles/interactive.css`
- Loading interaction lock: `styles/style.css` and `scripts/loadingScreen.js`

## Markup Contract

Required elements inside `#introduction-video`:

- `video.long`
- `video.loop`
- `.video-controls`
- `.video-play-toggle`
- `.video-controls p`

## Initial State

- Loop video starts with `autoplay`, `muted`, and `loop`.
- Main video is present but hidden via opacity.
- Controls are centered over the player.

## Runtime State Model

- `isPlaying` is synchronized by main video `play` and `pause` events.
- On `ended`, player removes `.is-playing` and restores full duration text.

## Click Handling

Click listener is attached to full player container.

Before any play or pause action, handler checks loading lock:

- if `body` has `is-loading`, handler exits immediately.

This guarantees no accidental start while loading overlay is active.

## Loading-Time Interaction Block

There are two independent protections:

1. CSS level
- while `body.is-loading`, `.video-player` has `pointer-events: none`

2. JS level
- click handler returns early when `body.is-loading` is present

Together they prevent race conditions from layering or transition timing.

## Playing State

When `.is-playing` is added:

- controls fade and scale down
- play icon hides and pause icon appears
- main video opacity transitions in

When `.is-playing` is removed, visual state returns to preview layout.

## Time Display

- On load: full duration in seconds
- On pause by click: remaining seconds using floored `videoDuration - currentTime`

$$
remainingSeconds = \lfloor videoDuration - videoLong.currentTime \rfloor
$$

## Constraints

- Script assumes one player with selector `#introduction-video`.
- Script is classic non-module JavaScript in shared global scope.
- Metadata availability at `window.load` affects initial duration value.

## Future Reuse

For multi-instance reuse, refactor initialization to accept container nodes and avoid single global selector.
