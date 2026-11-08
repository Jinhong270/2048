# 2048

A classic number-merging game. Slide tiles on a 4×4 board so matching numbers combine into a larger one — the goal is to make **2048**.

## How to play

- Each swipe slides every tile smoothly in that direction, with slide and merge animations.
- **Two tiles with the same number** merge into one tile worth twice as much (for example 2 + 2 → 4, 4 + 4 → 8), and the merge is added to your score.
- After a successful move, a new tile appears in a random empty cell (usually a **2**, sometimes a **4**).
- The game ends when the board is full and no more merges are possible.
- Reaching **2048** is the goal; you can also keep going for even larger tiles.

The **Score** at the top is for the current round. **Best** is the highest score you have ever reached (saved on this device, so it survives a refresh).

## Controls

### Desktop

| Action | Keys / method |
|------|-------------|
| Up / Down / Left / Right | Arrow keys, or **W A S D** |
| New game | Click the **New Game** button |

### Phone / touch

| Action | Method |
|------|------|
| Move | **Swipe** on the screen, or tap the **direction pad** on the right |
| New game | Click the **New Game** button |

> Tip: A new tile appears only when tiles actually move or merge. Empty swipes do nothing.

## Languages

The game defaults to **English (United States)** and also includes 简体中文, 繁體中文, Español, Français, Deutsch, 日本語, 한국어, Português (Brasil) and Русский. Use the language picker below the controls to switch; your choice is saved on this device.

To add a language, copy `js/locales/en-US.js` to `js/locales/<code>.js`, translate the values, and add a matching `<script>` tag to `index.html` after the other locale scripts. Any missing text falls back to English (United States).

## Win and game over

### Reaching 2048

After the congratulations prompt, you can:

- **Keep Playing**: chase higher tiles (4096, 8192…)
- **New Game**: clear the board and start over

### Game over

When there are no empty cells and no adjacent matching tiles to merge, the round ends. Click **New Game** to play again.

## Tips

1. **Stick to one stacking direction** for large tiles (many people keep the biggest tile in a corner).
2. Line up matching numbers in the same row or column so they can merge in sequence.
3. Avoid filling the board with small tiles too early — leave room to move.
4. When one merge is not enough, plan a chain: 4 → 8 → 16 and so on.

## Fit and embedding

The whole game scales down to fit the visible area, so it never needs scrolling. Opened directly, it uses the size of its own window. When it is embedded in another page, it asks that page for the visible size with `{ type: "jh270:viewport-request" }` and follows the `{ type: "jh270:viewport", width, height }` messages it gets back. If the host never answers, it keeps using its own window size.

## Start a game

1. Open the page and play (two tiles appear at the start)
2. Move with arrow keys, WASD, swipes, or the direction pad
3. Go for 2048 and beat your high score
4. Stuck? Hit **New Game** and try again

Good luck — keep those numbers climbing 🔢
