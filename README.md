# Improved Trading Time

A realistic trading time mod for X4: Foundations that makes ships spend meaningful time docking and trading.

## Description

This mod makes changes that should be in the base game. It essentially changes the time a ship stays docked while executing trades, taking into account:

- **Ware amount** getting transferred
- **Ware volume** (m³) getting transferred
- **Service crew** available on the ship (used as an efficiency multiplier)
- **Docking area crew** providing random assistance

### How It Works

- Each crew member can carry up to **14 m³** worth of ware
- Each crew member takes **2 seconds** to load/unload per volume unit
- Efficiency is calculated based on the average service crew level
- A fully leveled service crew increases efficiency by a maximum of **75%**
- A level zero crew has **0%** efficiency
- Stations provide **2-15 people** to help load/unload cargo

> [!note]
> The latest version removes built-in ware price and production time adjustments, making it easier to combine with other economy-related mods.

## Building

Build scripts are provided for Windows and Linux/macOS:

### Windows
```bash
.\build.bat
```

### Linux/macOS
```bash
chmod +x build.sh
./build.sh
```

Both scripts create a `dist/` folder containing all the mod files ready for distribution or uploading to Steam.

## Updating on Steam Workshop

> [!important]
> **Prerequisites:**
> - Download the [X Tools](http://forum.egosoft.com/viewtopic.php?t=363625) from the official Egosoft forum
> - Ensure you own X4: Foundations on Steam
> - Be logged into Steam while running the tool

### Quick Update

Use the build script to create the `dist/` folder, then run this command in the X Tools directory:

```powershell
WorkshopTool update -path "path\to\x4-real-trading-time\dist" -buildcat -changenote "Your update notes here"
```

**Example:**
```powershell
WorkshopTool update -path "F:\dev\games\mods\X4 Foundations\x4-real-trading-time\dist" -buildcat -changenote ""
```

> [!warning]
> The `-changenote` switch is required for all updates. Leave it empty with `""` if you don't want to provide a description.

### Key Update Parameters

| Parameter | Description |
|-----------|-------------|
| `-path` | Path to the mod folder (use your `dist/` folder) |
| `-buildcat` | Automatically builds catalog files |
| `-changenote` | Changelog notes visible to players on Steam |

### Additional Options

- **Change version:** Update the `version` attribute in `content.xml` (multiply by 100, e.g., v2.50 = 250)
- **Update preview:** Use `WorkshopTool updatepreview` to change only the preview image without uploading new content
- **Update title/description:** Add the `-namedesc up` switch to upload name and description changes from `content.xml`

## Debugging

> [!tip]
> To debug this mod, configure X4: Foundations with the following launch options in Steam:
> ```
> -debug all -logfile debuglog.txt
> ```
> This will generate a `debuglog.txt` file with detailed information about mod execution and any errors that occur.

## References

For more detailed information on Steam Workshop modding, see the official documentation:
- [EGOSOFT Steam Workshop Guide](https://wiki.egosoft.com/X%20Rebirth%20Wiki/Modding%20support/Steam%20Workshop%20for%20X%20Rebirth%20and%20X4/)
- [Steam Workshop Legal Agreement](https://steamcommunity.com/workshop/workshoplegalagreement)

## Credits

Created by Galahad on Steam Workshop. This is a fan-made modification for X4: Foundations.
