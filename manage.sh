#!/usr/bin/env bash

# Coded by Shellman
# https://marketplace.visualstudio.com/items?itemName=Remisa.shellman

# Title:         Plasmoid Manager
# Description:   Install/Remove/Upgrade plasmoid project from current directory.
# Author:        Remisa Yousefvand <remisa.yousefvand@gmail.com>
# Date:          2021-09-12
version="1.3.2"  # Script Version

# Exit codes
# ==========
# 0   no error.
# 1   unknown argument.
# 2   requirement not satisfied.
# 3   Unknown error.
# 4   Unknown update type.

# >>>>>>>>>>>>>>>>>>>>>>>> functions >>>>>>>>>>>>>>>>>>>>>>>>

function pac_man () {
  local string="$1"
  local interval="$2"
  : "${interval:=0.2}"
  local pad="$3"
  : "${pad:=.}"
  local length=${#string}
  local padding=""

	trap 'tput cnorm; echo' EXIT
  trap 'exit 127' HUP INT TERM

  tput civis
  tput sc
  
  for((i=0;i<=length;i++)); do
    tput rc
    echo `tput dim`"$padding"`tput setaf 3`c`tput sgr0`"${string:i:length}"
    sleep "$interval"
    tput rc
    echo `tput dim`"$padding"`tput setaf 3`C`tput sgr0`"${string:i:length}"
    sleep "$interval"
    padding+="$pad"
  done

  tput cnorm
  tput rc
  echo "$padding"
}

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

function bumpVersion () {
  local me="$1"
  echo
  case "$2" in
    Major|major)
      sed -i "s/^plasmoidVersionMajor.*/plasmoidVersionMajor=\"$((++plasmoidVersionMajor))\"/" "${me}"
      echo `tput setaf 5`version bumped to: `tput setaf 3`${plasmoidVersionMajor}`tput setaf 5`.${plasmoidVersionMinor}.${plasmoidVersionPatch}`tput sgr0`
    ;;
    Minor|minor)
      sed -i "s/^plasmoidVersionMinor.*/plasmoidVersionMinor=\"$((++plasmoidVersionMinor))\"/" "${me}"
      echo `tput setaf 5`version bumped to: ${plasmoidVersionMajor}.`tput setaf 3`${plasmoidVersionMinor}`tput setaf 5`.${plasmoidVersionPatch}`tput sgr0`
    ;;
    Patch|patch)
      sed -i "s/^plasmoidVersionPatch.*/plasmoidVersionPatch=\"$((++plasmoidVersionPatch))\"/" "${me}"
      echo `tput setaf 5`version bumped to: ${plasmoidVersionMajor}.${plasmoidVersionMinor}.`tput setaf 3`${plasmoidVersionPatch}`tput sgr0`
    ;;
    *)
      echo `tput setaf 1`Error! Unkown update type: `tput sgr0`"$2"
      exit 4
    ;;
  esac

  echo
  pac_man "previous version was ${plasmoidVersion}" 0.1 "*"
  exit 0
  
}

function setVersion () {
  sed -i "s/install persian-calendar.*zip$/install persian-calendar.v${plasmoidVersion}.zip/" README.md
  sed -i "s/^#[[:space:]]Changes.*/# Changes TODO: ## v${plasmoidVersion} \`[`date -I`]\`/" CHANGELOG.md
  sed -i "s/PLASMOID_VERSION_PLACEHOLDER/${plasmoidVersion}/" "${outDirectory}/package/metadata.desktop"
  # sed -i "s/PLASMOID_VERSION_PLACEHOLDER/$(persianNumber ${plasmoidVersion})/" "${outDirectory}/package/contents/ui/config/about.qml"
}

function prepare () {
  rm -rf "$outDirectory"
  mkdir "$outDirectory"
  cp -R package "$outDirectory"
  setVersion
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
  # kpackagetool5 -u myplasmoid # Doesn't work
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

        option                         |      Comment
  -------------------------------------+--------------------
    -b, --build                        |  Build   Plasmoid
  -------------------------------------+--------------------
    --bump-version [major|minor|patch] |  Bump    Version
  -------------------------------------+--------------------
    -h, --help                         |  Help    Message
  -------------------------------------+--------------------
    -i, --install                      |  Install Plasmoid
  -------------------------------------+--------------------
    -r, --remove                       |  Remove  Plasmoid
  -------------------------------------+--------------------
    -u, --upgrade                      |  Upgrade Plasmoid
  -------------------------------------+--------------------
    -v, --version                      |  Script  Version 
  "
}

# <<<<<<<<<<<<<<<<<<<<<<<< functions <<<<<<<<<<<<<<<<<<<<<<<<

# >>>>>>>>>>>>>>>>>>>>>>>> Variables >>>>>>>>>>>>>>>>>>>>>>>>
outDirectory="out"

plasmoidVersionMajor="1"
plasmoidVersionMinor="3"
plasmoidVersionPatch="3"
plasmoidVersion="${plasmoidVersionMajor}.${plasmoidVersionMinor}.${plasmoidVersionPatch}"
# <<<<<<<<<<<<<<<<<<<<<<<< Variables <<<<<<<<<<<<<<<<<<<<<<<<

# Entry point

bannerSimple "Plasmoid Manager"
echo `tput setaf 5; tput bold`Plasmoid version: ${plasmoidVersion}`tput sgr0`
echo

action=""

case "$1" in
  -b|--build)
    action=Build
  ;;
  --bump-version)
    action=BumpVersion
  ;;
  -i|--install)
    action=Install
  ;;
  -r|--remove)
    action=Remove
  ;;
  -u|--upgrade)
    action=Upgrade
  ;;
  -v|--version)
    action=Version
  ;;
  -h|--help)
    action=Help
  ;;
  *)
    if [ -n "$1" ]; then
      echo "Error! Unknow argument: \"$1\""
      help
      exit 1
    fi
  ;;
esac

if [ -z "$action" ]; then
  options=("Build" "Bump Version" "Install" "Remove" "Upgrade" "Help" "Exit")
  chooseOption "What do you want to do?" 4 "${options[@]}"; choice=$?
  action="${options[$choice]}"
fi

if [ "$action" = "Bump Version" ]; then
  options=("Major" "Minor" "Patch" "Exit")
  chooseOption "What do you want to do?" 2 "${options[@]}"; choice=$?
  action="${options[$choice]}"
  if [ "$action" = "Exit" ]; then
    echo `tput setaf 3`Nothing done!`tput sgr0`
    exit 0
  fi
  bumpVersion "$0" "$action"
fi

case "$action" in
  Build)
    prepare
    buildPlasmoid
  ;;
  BumpVersion)
    bumpVersion "$0" "$2"
  ;;
  Install)
    prepare
    installPlasmoid
  ;;
  Remove)
    prepare
    removePlasmoid
  ;;
  Upgrade)
    prepare
    upgradePlasmoid
  ;;
  Version)
    echo "Plasmoid manager script v${version}"
  ;;
  Help)
    help
  ;;
  Exit)
    echo `tput setaf 3`Nothing done!`tput sgr0`
  ;;
  *)
    echo "Unreachable code :)"
    exit 254
  ;;
esac

exit 0
