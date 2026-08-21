# Loading Screen

## Purpose

The loading screen is displayed above the home screen while the page loads. It introduces the portfolio through a sequence of status messages, fills a progress indicator, then moves out of view.

## Entry Points

- Markup: `index.html`
- Behavior: `scripts/loadingScreen.js`
- Interactive styles: `styles/interactive.css`

`index.html` loads `scripts/loadingScreen.js` before `scripts/main.js`.

## Markup Contract

The script requires these elements:

```html
<div class="overlay dark">
  <div id="status-wrapper">
    <div id="statuses-belt"></div>
  </div>
  <div class="progress-bar">
    <div class="progress-indicator"></div>
  </div>
</div>
```

- `.overlay` covers the page and leaves the screen after the sequence finishes.
- `#status-wrapper` hides all but one status with `overflow: hidden`.
- `#statuses-belt` contains every generated status heading.
- `.progress-indicator` represents the completed portion of the sequence.

## Initial Visual State

CSS sets the status belt to `translateY(100%)`, placing the first status below the visible wrapper. Its `transform` transition lasts `0.25s`.

The progress indicator starts at `0%` width and changes width with a `0.25s` CSS transition.

## Behavior

1. The script creates an `h1` for each item in `statuses` and appends it to `#statuses-belt`.
2. It measures a generated heading including vertical margins and sets `#status-wrapper` to that height.
3. On `window.load`, `showNextStatus()` begins the sequence.
4. On every call, the belt is moved to `translateY(-100% * currentStatusIndex)`.
5. The current index is incremented. The progress indicator is updated to the percentage of displayed statuses and clamped to the range from `0%` to `100%`.
6. If statuses remain, the next call is scheduled with a dynamically decreasing delay.
7. Once the final status is shown and the indicator is at `100%`, the overlay waits for the minimum delay, then moves upward with `translateY(-100%)`.

## Status Sequence

The current messages are:

1. `Стаскиваю одеялко`
2. `Делаю зарядку`
3. `Наливаю чаёк`
4. `Включаю мак`
5. `Дизайню кодом`

The list may be changed in `scripts/loadingScreen.js`; the number of status messages determines the progress increments and delay calculation.

## Timing

```js
const minSwapTime = 500;
const maxSwapTime = 800;
```

The pause between statuses decreases linearly from the maximum toward the minimum. The value is never lower than `minSwapTime`:

$$
\text{swapTime} = \max(\text{minSwapTime},\ \text{maxSwapTime} - (\text{maxSwapTime} - \text{minSwapTime}) \times \text{progress})
$$

The calculated pause schedules the next status; it does not change the duration of the CSS movement or progress-bar transitions.

## Progress

After each status is displayed, progress is calculated as:

$$
\text{progressPercent} = \frac{\text{displayed statuses}}{\text{total statuses}} \times 100
$$

The width applied to `.progress-indicator` is clamped:

```js
Math.min(100, Math.max(progress, 0))
```

With five statuses, the indicator moves through `20%`, `40%`, `60%`, `80%`, and `100%`.

## Constraints

- Keep the required selectors in the page markup or update the script with any selector changes.
- `scripts/loadingScreen.js` is a regular script, not a JavaScript module. Top-level `const` and `let` names must not be redeclared in other regular scripts.
- The sequence begins after `window.load`, so it simulates loading progress rather than measuring outstanding network resources.
