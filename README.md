# Persian Calendar

A simple KDE Plasma widget for Persian date (a.k.a [Jalali calendar](https://en.wikipedia.org/wiki/Jalali_calendar)).

[Link to KDE store](https://store.kde.org/p/1407451/).

![screenshot](package/contents/screenshot.png)

*Latest Release: v1.1.0 `[2020-08-15]`*

[Change history](./CHANGELOG.md)

## Installing from source

```bash
git clone https://github.com/yousefvand/plasmoid-persian-calendar.git
cd plasmoid-persian-calendar
./build.sh
# Replace VERSION according to your build
kpackagetool5 -t Plasma/Applet --install persian-calendar.VERSION.plasmoid
```

## Acknowledgements

This software uses:

- [Jalali calendar algorithm](https://jdf.scr.ir/jdf/?t=java_script) by [jdf.scr.ir](http://jdf.scr.ir/jdf)
- [Vazir font](https://github.com/rastikerdar/vazir-font) by [Saber Rastikerdar](https://github.com/rastikerdar)
