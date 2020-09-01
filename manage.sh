#!/usr/bin/env bash

# Coded by Shellman
# https://marketplace.visualstudio.com/items?itemName=Remisa.shellman

# Title:         Plasmoid Manager
# Description:   Install/Remove/Upgrade plasmoid project from current directory.
# Author:        Remisa Yousefvand <remisa.yousefvand@gmail.com>
# Date:          2020-08-26
version="1.2.0"  # Script Version

# Exit codes
# ==========
# 0   no error.
# 1   unknown parameter.
# 2   requirement not satisfied.
# 3   Unknown error.

# >>>>>>>>>>>>>>>>>>>>>>>> functions >>>>>>>>>>>>>>>>>>>>>>>>

function persianNumber () {
  result="$1"
  result=$(sed "s/0/$(echo -ne '\u06F0')/g" <<< "$result")
  result=$(sed "s/1/$(echo -ne '\u06F1')/g" <<< "$result")
  result=$(sed "s/2/$(echo -ne '\u06F2')/g" <<< "$result")
  result=$(sed "s/3/$(echo -ne '\u06F3')/g" <<< "$result")
  result=$(sed "s/4/$(echo -ne '\u06F4')/g" <<< "$result")
  result=$(sed "s/5/$(echo -ne '\u06F5')/g" <<< "$result")
  result=$(sed "s/6/$(echo -ne '\u06F6')/g" <<< "$result")
  result=$(sed "s/7/$(echo -ne '\u06F7')/g" <<< "$result")
  result=$(sed "s/8/$(echo -ne '\u06F8')/g" <<< "$result")
  result=$(sed "s/9/$(echo -ne '\u06F9')/g" <<< "$result")
  echo "$result"
}

function setVersion () {
  # sed -i "0,/\"version\"\:[[:space:]]\"[[:digit:]]\+\.[[:digit:]]\+\.[[:digit:]]\+\"/s//\"version\"\: \"${plasmoidVersion}\"/" package.json package-lock.json
  sed -i "s/^\*Latest Release\:.*/*Latest Release: v${plasmoidVersion} \`[$(date -I)]\`*/" README.md
  sed -i "s/^#[[:space:]]Changes.*/# Changes: TODO/" CHANGELOG.md

  sed -i "s/PLASMOID_VERSION_PLACEHOLDER/${plasmoidVersion}/" "${outDirectory}/package/metadata.desktop"
  sed -i "s/PLASMOID_VERSION_PLACEHOLDER/$(persianNumber ${plasmoidVersion})/" "${outDirectory}/package/contents/ui/config/about.qml"
}

function prepare () {
  rm -rf "$outDirectory"
  mkdir "$outDirectory"
  cp -R package "$outDirectory"
  setVersion
  # for jsFile in `find "$outDirectory" -name "*.js" -type f`; do
  #   # Remove leading "// BUILD++: " from lines
  #   sed -i 's/^\/\/[[:space:]]BUILD++\:[[:space:]]*//g' "$jsFile"
  #   # Remove lines ending with "// BUILD--"
  #   sed -i '/\/\/[[:space:]]BUILD--[[:space:]]*$/d' "$jsFile"
  #   # Remove extra empty lines from end of the file
  #   sed -i ':a;/^[ \n]*$/{$d;N;ba}' "$jsFile"
  # done
}

function bannerSimple() {
  local msg="* $* *"
  local edge=`echo "$msg" | sed 's/./*/g'`
  echo "$edge"
  echo "`tput bold`$msg`tput sgr0`"
  echo "$edge"
  echo
}

function checkRequirements () {
  if ! [ `command -v kpackagetool5` ]; then
    echo "Error! \"kpackagetool5\" is not installed."
    exit 2
  fi
}

function installPlasmoid () {
  checkRequirements
  echo "Installing plasmoid, please wait..."
  kpackagetool5 -t Plasma/Applet --install "$outDirectory"/package
  if [[ $? == 0 ]]; then
    echo "Plasmoid installed successfully."
  else
    echo `tput setaf 1`Plasmoid installation failed!`tput sgr0`
    exit 3
  fi
}

function removePlasmoid () {
  checkRequirements
  echo "Removing plasmoid, please wait..."
  kpackagetool5 -t Plasma/Applet --remove "$outDirectory"/package
  if [[ $? == 0 ]]; then
    echo "Plasmoid removed successfully."
  else
    echo `tput setaf 1`Plasmoid removal failed!`tput sgr0`
    exit 3
  fi
}

# killall plasmashell && kstart5 plasmashell
function upgradePlasmoid () {
  echo "Upgrading plasmoid, please wait..."
  kpackagetool5 -t Plasma/Applet --remove "$outDirectory"/package
  if [[ $? != 0 ]]; then
    echo `tput setaf 1`Plasmoid upgrade failed!`tput sgr0`
    exit 3
  fi
  killall plasmashell
  sleep 1s
  kstart5 plasmashell
  kpackagetool5 -t Plasma/Applet --install "$outDirectory"/package
  # kpackagetool5 -u myplasmoid
  if [[ $? != 0 ]]; then
    echo `tput setaf 1`Plasmoid upgrade failed!`tput sgr0`
    exit 3
  fi
  echo "Plasmoid upgraded successfully."
}

function buildPlasmoid () {
  if [ ! -f out/package/metadata.desktop ]; then
    echo "`tput setaf 1`Error: `tput sgr0`Cannot find `tput setaf 6`metadata.desktop`tput sgr0` at `tput setaf 5`/package`tput sgr0` directory."
    exit 2
  fi

  packageFile="persian-calendar.v${plasmoidVersion}.plasmoid"

  if [ ! `command -v zip` ]; then
    echo "`tput setaf 1`Error: `tput sgr0`You need `tput setaf 6`zip`tput sgr0` installed on your sytem."
    exit 2
  fi

  echo `tput setaf 2`Building package...`tput sgr0`
  here=$(pwd)
  cd out
  zip -r "$packageFile" package
  mv "$packageFile" ..
  cd "$here"
  echo `tput setaf 2`Done!`tput sgr0`
  echo "`tput dim`Plasmoid package saved at \"$(pwd)/${packageFile}\"`tput sgr0`"
}

function chooseOption() {
  echo "$1"; shift
  echo `tput sitm``tput dim`-"Change selection: [up/down]  Select: [ENTER]" `tput sgr0`
  local selected="$1"; shift

  ESC=`echo -e "\033"`
  cursor_blink_on()  { tput cnorm; }
  cursor_blink_off() { tput civis; }
  cursor_to()        { tput cup $(($1-1)); }
  print_option()     { echo  `tput dim` "   $1" `tput sgr0`; }
  print_selected()   { echo `tput bold` "=> $1" `tput sgr0`; }
  get_cursor_row()   { IFS=';' read -sdR -p $'\E[6n' ROW COL; echo ${ROW#*[}; }
  key_input()        { read -s -n3 key 2>/dev/null >&2; [[ $key = $ESC[A ]] && echo up; [[ $key = $ESC[B ]] && echo down; [[ $key = "" ]] && echo enter; }

  for opt; do echo; done

  local lastrow=`get_cursor_row`
  local startrow=$(($lastrow - $#))
  trap "cursor_blink_on; echo; echo; exit" 2
  cursor_blink_off

  : selected:=0

  while true; do
    local idx=0
    for opt; do
      cursor_to $(($startrow + $idx))
      if [ $idx -eq $selected ]; then
        print_selected "$opt"
      else
        print_option "$opt"
      fi
      ((idx++))
    done

    case `key_input` in
      enter) break;;
      up)    ((selected--)); [ $selected -lt 0 ] && selected=$(($# - 1));;
      down)  ((selected++)); [ $selected -ge $# ] && selected=0;;
    esac
  done

  cursor_to $lastrow
  cursor_blink_on
  echo

  return $selected
}

function help () {
  echo "
  Plasmoid Manager

  Usage
    wizard mode: $0
    silent mode: $0 [option]

        option     |      Comment
  -----------------+-------------------
    -b, --build    |  Build   Plasmoid
    -h, --help     |  Help    Message
    -i, --install  |  Install Plasmoid
    -r, --remove   |  Remove  Plasmoid
    -u, --upgrade  |  Upgrade Plasmoid
    -v, --version  |  Script  Version 
  "
}

# <<<<<<<<<<<<<<<<<<<<<<<< functions <<<<<<<<<<<<<<<<<<<<<<<<

# >>>>>>>>>>>>>>>>>>>>>>>> Variables >>>>>>>>>>>>>>>>>>>>>>>>
outDirectory="out"
plasmoidVersion="1.3.1"
# <<<<<<<<<<<<<<<<<<<<<<<< Variables <<<<<<<<<<<<<<<<<<<<<<<<

# Entry point

bannerSimple "Plasmoid Manager"
echo `tput setaf 5`Plasmoid version: ${plasmoidVersion}`tput sgr0`

action=""

case "$1" in
  -b|--build)
    action=Build
  ;;
  -i|--install)
    action=Install
  ;;
  -r|--remove)
    action=Remove
  ;;
  -u|--upgrade)
    action=Upgrsde
  ;;
  -v|--version)
    echo "Plasmoid Manager v${version}"
    exit 0
  ;;
  -h|--help)
    help
    exit 0
  ;;
  *)
    if [ -n "$1" ]; then
      echo "Error! Unknow parameter: \"$1\""
      help
      exit 1
    fi
  ;;
esac

if [ -z "$action" ]; then
  options=("Build" "Install" "Remove" "Upgrade" "Exit")
  chooseOption "What do you want to do?" 3 "${options[@]}"; choice=$?
  action="${options[$choice]}"
fi

prepare # deletes "out" directory

case "$action" in
  Build)
    buildPlasmoid
  ;;
  Install)
    installPlasmoid
  ;;
  Remove)
    removePlasmoid
  ;;
  Upgrade)
    upgradePlasmoid
  ;;
  Exit)
    echo `tput setaf 3`Nothing done!`tput sgr0`
    exit 0
  ;;
  *)
    echo "Unreachable code :)"
  ;;
esac
