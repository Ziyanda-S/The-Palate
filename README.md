# The Palate Restaurant

Ionic + Angular app for a luxury restaurant, built to match the reference design: dark hero with hamburger + search, a "Menu Recipes" hero section with dot pagination, a cream sheet with category filters and horizontal-scroll dish cards, a reservation promo banner, and a bottom tab bar (Home / Category / + / Favorites / Save).

Built with **standalone Angular components** (no NgModules), Angular 17 + Ionic 7.

## Run it — exactly the way that worked for you

Your friend's project worked with `npm start`, not `ionic serve`. This project is set up the same way — `npm start` is wired directly to `ng serve` in `package.json`, skipping the Ionic CLI proxy layer that caused you problems (stale caching / changes not showing).

```bash
npm install
npm start
```

Then open **http://localhost:8100**. This has already been installed and build-tested end to end before being handed to you, so `npm install` should complete cleanly.

If you ever edit a file and don't see the change:
1. Confirm the terminal running `npm start` is still active and shows no errors.
2. Hard-refresh the browser (Cmd/Ctrl+Shift+R) — don't just close/reopen the tab.
3. If it's still stale, stop the server (Ctrl+C) and run `npm start` again. Do **not** switch to `ionic serve` for this project — stick with `npm start`.

## Project structure

```
src/app/
  app.component.ts          root shell (<ion-app>)
  app-routing.module.ts      redirects to /tabs/home
  tabs/
    tabs.page.ts/html/scss   bottom tab bar shell
    tabs.routes.ts           lazy-loaded tab children
    home/                    hero + menu (main screen)
    category/                browse by course
    favorites/                items you've favorited
    save/                    items you've saved
  data/menu.service.ts       shared menu state (favorites/saved)
  models/menu-item.model.ts  MenuItem type
src/theme/variables.scss     color tokens (black / cream / gold)
src/theme/_page-shared.scss  shared styles for category/favorites/save
```

## Design notes

- **Colors**: near-black (`#0d0d0d`) hero and tab-bar FAB, cream (`#f7f5f1`) content sheet, warm gold (`#d9af6c`) accent — matching the reference exactly.
- **Fonts**: Playfair Display (headings) + Manrope (body), loaded from Google Fonts in `index.html`.
- **Dish images**: the reference mock uses stock photography, which can't be reproduced here for copyright reasons. Each card instead uses a gradient "plate" placeholder (`.plate-art` in `global.scss`) — swap these for `<img [src]="item.photoUrl">` once you have real dish photos, and add a `photoUrl` field to `MenuItem`.
- **Responsive**: the whole app renders inside `.app-shell` (in `global.scss`). On mobile it's full-bleed; from 768px up it becomes a centered "device frame" with rounded corners and a shadow, so the layout doesn't stretch awkwardly on a laptop screen. Adjust `.app-shell` if you'd rather have it go full-width on desktop instead.
- **Bottom tab actions**: tapping the "..." on a menu card opens an action sheet to add/remove Favorites and Save — this is what populates the Favorites and Save tabs.

## Next steps you'll likely want

- Wire `MenuService` to Supabase instead of the hardcoded array in `menu.service.ts`.
- Add a washer/staff-style admin view if this needs a back-of-house portal, the way you did on the car wash app.
- Replace the plate placeholders with real food photography once you have licensed images.
