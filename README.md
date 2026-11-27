# Diastasis

## Initial Plan =>
**Timi**: Backend & API ; Work on the backend over the first few days

**Gabriel**: Frontend ; Working together with xTofuub on the Frontend (Credits, Settings)

**xTofuub**: Frontend ; Working together with Gabriel on the Frontend (Main menu, CSS)

**Saint**: Client-Side JS ; ~~Work on the client-side tick server~~, Implements API usage

**Roope**: Map design with Cavas


--- 
# Game Design

The game is a 2D platformer game. Game is played by 2 players, which in turns control the same character with the WASD & Arrow keys correspondingly. Only one player may move the character at a time, which will be decided in intervals. 

# What I added

I added doors and buttons. A door blocks the way until someone presses the button linked to it. Buttons can be locked to a player, so the black player can only use black buttons and the white player only white ones. Level 1 is now a small puzzle built around this.

It's roughly 185 lines of JavaScript across the frontend files, plus the level data in `backend/levels.json`.

# Logic design

## Doors & Buttons

I added doors and buttons as new element types in `backend/levels.json`. They just sit in the `elements` array like the floors and spikes.

```json
{
    "type": "door",
    "id": "door_1",
    "player": "black",
    "location": { "x": 12, "y": 16 }
}
```

```json
{
    "type": "button",
    "door_id": "door_1",
    "player": "black",
    "location": { "x": 8, "y": 15 }
}
```

The door is 1 tile wide and 2 tall, `location` is the top tile. The button is 1 tile and its `door_id` has to match the door's `id` or nothing happens. `player` is optional, you can put `"black"` or `"white"` there and then only that player can press the button and open the door.

How it works: `frontend/level.js` draws them and `openDoor()` removes the door from the level. `frontend/player.js` checks if you're standing on a button and stops you from walking through a closed door. `frontend/game.js` listens to the interact keys and calls `openDoor()`.

Level 1 has two of each. Black opens the first door and white opens the second.

P1 is black, WASD + E. P2 is white, arrows + Enter.

