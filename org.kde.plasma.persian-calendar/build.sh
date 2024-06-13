#!/usr/bin/env bash

# Temporary for debugging

zip -r org.kde.plasma.persian-calendar.zip ./ -x build.sh
mv org.kde.plasma.persian-calendar.zip org.kde.plasma.persian-calendar.plasmoid
rm -rf /data/Public/org.kde.plasma.persian-calendar.plasmoid
mv org.kde.plasma.persian-calendar.plasmoid /data/Public/

rm -rf ~/.local/share/plasma/plasmoids/org.kde.plasma.persian-calendar
