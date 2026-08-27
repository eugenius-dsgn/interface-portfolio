# Loading Screen

## Purpose

Loading screen shows above the home page while assets load. It displays a sequence of status messages, updates progress, then exits upward.

The screen also blocks user interaction with underlying content until the overlay transition is finished.

## Entry Points

- Markup: `index.html`
- Behavior: `scripts/loadingScreen.js`
- Layout styles: `styles/layout.css`
- Interactive styles: `styles/interactive.css`
- Global loading lock styles: `styles/style.css`

## Markup Contract

Required structure:

- `.overlay.loading-screen`
- `#status-wrapper`
- `#statuses-belt`
- `.progress-bar`
- `.progress-indicator`

## Layering And Interaction Lock

Overlay is rendered as a top application layer:

- `position: fixed`
- `inset: 0`
- `height: 100vh`
- high `z-index`
- `pointer-events: auto`

During loading, `body` gets class `is-loading`. While this class is active:

- page scroll is disabled
- touch interaction is disabled
- video player pointer interaction is disabled

This prevents clicks from reaching the player before loading ends.

## Initial Visual State

- Status belt starts below viewport of `#status-wrapper` via transform.
- Progress indicator starts at `0%` width.
- Overlay is visible and interactive as the top layer.

## Behavior

1. Script generates heading nodes from `statuses` and appends them into `#statuses-belt`.
2. Wrapper height is set to one heading block height including vertical margins.
3. On `window.load`, `body` receives `is-loading` and sequence starts.
4. Each step shifts the belt and updates progress width.
5. Delay between statuses decreases from `maxSwapTime` toward `minSwapTime`.
6. After final status, overlay translates up and leaves the screen.
7. Loading lock removal is tied to `transitionend` and runs once.

## Timing

```js
const minSwapTime = 500;
const maxSwapTime = 800;
```

The pause between statuses decreases linearly and never goes below `minSwapTime`:

$$
swapTime = \max(minSwapTime,\ maxSwapTime - (maxSwapTime - minSwapTime) \times progress)
$$

Overlay exit duration is controlled by CSS transition on `.overlay`.

## Progress

After each status is displayed, progress is calculated as:

$$
progressPercent = \frac{displayedStatuses}{totalStatuses} \times 100
$$

Applied width is clamped:

```js
Math.min(100, Math.max(progress, 0))
```

With five statuses, the indicator moves through `20%`, `40%`, `60%`, `80%`, and `100%`.

## Current Status Texts

1. `Стаскиваю одеялко`
2. `Делаю зарядку`
3. `Наливаю чаёк`
4. `Включаю мак`
5. `Дизайню кодом`

## Constraints

- Keep required selectors in markup or update script accordingly.
- Script is non-module and shares global scope with other classic scripts.
- Interaction lock depends on `body.is-loading` and overlay transition completion.
