# Sort `settings.json` – VSCode Extension

Sorts your settings.json file to match the order used in the Visual Studio Code settings UI.
 
## Features

- **Sort by UI Order**: Organizes your `settings.json` with the same order as the VSCode settings interface, making it easier to compare and manage your settings.
- **Flexible Sorting**: Optionally break up the "Commonly Used" category to further customize your sorting.
- **Preserve Comments**: All comments in your `settings.json` are preserved.

## Usage

1. Open your `settings.json` file in VSCode.
2. Open the Command Palette (`Ctrl+Shift+P`) and search for:
   - `Sort settings.json` – Sorts settings according to VSCode UI order, keeping "Commonly Used" settings together.
   - `Sort settings.json (No "Commonly Used")` – Sorts settings strictly by UI order, ignoring the "Commonly Used" group.
3. Review the sorted file and save your changes.

![Screenshot](./images/screenshot.png)

> After sorting, your `settings.json` will match the order of the VSCode Settings UI.  
> *(Screenshot uses the "modified" filter.)*

## Limitations

- Some extension-contributed settings may not be sorted identically to the VSCode Settings UI due to the way they are registered.

## Credits & Inspiration

- Inspired by [Sort Package.json](https://github.com/keithamus/sort-package-json) and the [VSCode extension](https://marketplace.visualstudio.com/items?itemName=unional.vscode-sort-package-json).
- Special thanks to [rich2005](https://www.gimp-forum.net/User-rich2005) for the [GIMP tutorial video](https://www.gimp-forum.net/Thread-Slicing-Filling-Image-Canvas-With-Other-Images-Diagonally?pid=18305#pid18305).
