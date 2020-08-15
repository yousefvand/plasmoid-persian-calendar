#!/usr/bin/env bash

if [ ! -f package/metadata.desktop ]; then
  echo "`tput setaf 1`Error: `tput sgr0`Cannot find `tput setaf 6`metadata.desktop`tput sgr0` at `tput setaf 5`/package`tput sgr0` directory."
  exit 1
fi

version=$(sed -n -E 's/X-KDE-PluginInfo-Version=(.+)/\1/p' package/metadata.desktop)
packageFile="persian-calendar.v${version}.plasmoid"

if [ ! `command -v zip` ]; then
  echo "`tput setaf 1`Error: `tput sgr0`You need `tput setaf 6`zip`tput sgr0` installed on your sytem."
  exit 1
fi

echo `tput setaf 2`Building package...`tput sgr0`
zip -r "$packageFile" package
echo `tput setaf 2`Done!`tput sgr0`
echo "`tput dim`Plasmoid package saved at \"$(pwd)/${packageFile}\"`tput sgr0`"

exit 0
