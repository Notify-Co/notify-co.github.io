# NotifyPicks Pick Tracker

Public results page for NotifyPicks subscribers: units and ROI by capper and sport, monthly results, and every graded pick.

## How it updates

`index.html` reads each capper's tab from the Google Sheet (published to the web as CSV) every time someone opens the page. Log picks in the sheet as usual; nothing here needs to change.

Each tab must keep these columns: `Date, Play, Odds, Units Risked, Result, Units Won/Lost, SPORT, BET TYPE`.

## Adding a capper

Publish the new tab (File → Share → Publish to web → pick the tab → CSV) and add a line to `SOURCES` near the top of the script in `index.html`.

If the sheet can't be reached, the page falls back to a built-in snapshot of Caleb's picks.
