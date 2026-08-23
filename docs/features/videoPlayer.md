# Video Player

## Purpose

The video player presents the about me video on the home page. It starts with a muted loop preview and switches to the full video when the visitor clicks the player. A second click pauses the full video and returns the preview.

The implementation is currently specific to the home page. It will later be expanded into a reusable player that can serve both the home page and project pages.

## Entry Points

- Markup: `index.html`
- Behavior: `scripts/videoPlayer.js`
- Interactive styles: `styles/interactive.css`

`index.html` loads `scripts/videoPlayer.js` after `scripts/loadingScreen.js` and before `scripts/main.js`.

## Markup Contract

The script requires the following elements inside `#introduction-video`:

```html
<figure id="introduction-video" class="video-player">
  <video class="long" playsinline>...</video>
  <video class="loop" muted autoplay loop playsinline>...</video>
  <div class="video-controls">
    <button type="button" class="video-play-toggle" aria-label="Play">
      <div class="button-icons-wrapper">
        <svg id="play">...</svg>
        <svg id="pause">...</svg>
      </div>
    </button>
    <p></p>
  </div>
</figure>
```

- `.long` is the main video.
- `.loop` is the muted preview video.
- `.video-controls p` displays the main video's full or remaining duration in seconds.
- `.video-play-toggle` contains the visual Play and Pause icons. The click handler is registered on the full player container, so both the button and the surrounding video area use the same interaction.

## Initial Visual State

The loop preview is visible and starts automatically through its `autoplay`, `muted`, and `loop` attributes. The full video is absolutely positioned above it with zero opacity.

`.video-controls` is positioned at the centre of the player with:

```css
transform: translate(-50%, -50%);
```

The Play icon starts visible, while the Pause icon has zero opacity.

## Behavior

1. On `window.load`, the script reads `videoLong.duration`, stores it in `videoDuration`, displays its floored value followed by `с`, and sets `isPlaying` to `false`.
2. When the main video emits `play`, `isPlaying` becomes `true`.
3. When it emits `pause`, `isPlaying` becomes `false`.
4. When the main video emits `ended`, the player removes `.is-playing` and restores the full duration display.
5. A click on `#introduction-video` checks `isPlaying`:
   - When `true`, it pauses the main video, removes `.is-playing`, enables looping for the preview video, and displays the floored remaining duration.
   - When `false`, it starts the main video, adds `.is-playing`, and disables looping for the preview video.

The displayed remaining time is calculated as:

$$
\text{remainingSeconds} = \left\lfloor \text{videoDuration} - \text{videoLong.currentTime} \right\rfloor
$$

## Playing State

Adding `.is-playing` to `.video-player` changes the presentation:

- `.video-controls` fades out and scales down while remaining centred with `translate(-50%, -50%) scale(0.5)`.
- The Play icon becomes transparent and the Pause icon becomes visible.
- `.long` transitions to full opacity above the preview.

Removing `.is-playing` returns the control and main video to their initial visual state.

## Constraints

- The script is a regular script, not a JavaScript module. Its top-level variable names must not be redeclared by other regular scripts.
- The selectors in the markup are a contract with `scripts/videoPlayer.js`; rename them only together with the script.
- `videoLong.duration` is read on `window.load`. The video metadata must be available by that point for the initial duration to be valid.
- `videoLoop.loop` controls whether the preview repeats, but the current script does not explicitly call `videoLoop.pause()` or `videoLoop.play()`.

## Future Reuse

The current implementation assumes a single home-page player with the fixed selector `#introduction-video`. Before it is used on project pages, it should be refactored to initialise an individual player from a passed container element or a shared class selector.

The reusable version should avoid global state, support multiple player instances on one page, and make page-specific details configurable: video sources, poster, preview-loop behaviour, controls, and duration display. The markup contract should remain small and consistent so the home page and project pages can share the same player behavior and styles.
