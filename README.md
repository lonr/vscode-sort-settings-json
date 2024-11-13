# Sort `settings.json`

Sorts the `settings.json` file according to the VSCode settings UI order.

1. Open `settings.json`
2. Open Command Palette(`Ctrl+Shift+P`), search and run `Sort settings.json`
   - If you want to break up the "Commonly Used" category, run command `Sort settings.json (No "Commonly Used")` instead
3. Done! You can then save the file

![screenshot](./images/screenshot.png)

> After running `Sort settings.json`. The sorted `settings.json` matches the order of the UI.(`modified` filter used in the screenshot)

## Limits

Some settings from Extensions are not sorted in the same manner as in the settings UI.

## For more information

Inspired by [Sort Package.json](https://github.com/keithamus/sort-package-json) and corresponding [VSCode extension](https://marketplace.visualstudio.com/items?itemName=unional.vscode-sort-package-json).

Thanks to [rich2005](https://www.gimp-forum.net/User-rich2005) for the [GIMP tutorial video](https://www.gimp-forum.net/Thread-Slicing-Filling-Image-Canvas-With-Other-Images-Diagonally?pid=18305#pid18305).
