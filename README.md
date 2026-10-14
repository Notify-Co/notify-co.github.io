# NotifyPicks Pick Tracker

Public results page for NotifyPicks subscribers: units and ROI by capper and sport, monthly results, and every graded pick.

## How it updates

`index.html` reads each capper's tab from the Google Sheet (published to the web as CSV) every time someone opens the page. Log picks in the sheet as usual; nothing here needs to change.

Each tab must keep these columns: `Date, Play, Odds, Units Risked, Result, Units Won/Lost, SPORT, BET TYPE`.

## Adding a capper

Publish the new tab (File → Share → Publish to web → pick the tab → CSV) and add a line to `SOURCES` near the top of the script in `index.html`.

If the sheet can't be reached, the page falls back to a built-in snapshot of Caleb's picks.

## Tabs and links

The page has one tab for the whole team and one per capper, each with its own link:
`#team` (Notify), `#caleb`, `#sammy`, `#quentin`, `#footy`. Every tab has Sport and Date filters, and the running-total chart has a date-range slider.

## Look

Night-navy design with Archivo for text and Archivo Black for headlines. Each tab has its own accent color, set near the top of the stylesheet: Notify pink and blue, Caleb green, Sammy red, Quentin yellow, Footy purple. Wins are always green and losses red.
