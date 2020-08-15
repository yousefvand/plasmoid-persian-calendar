#!/usr/bin/env bash

# Coded by Shellman
# https://marketplace.visualstudio.com/items?itemName=Remisa.shellman

# Title:         Plasmoid Manager
# Description:   Install/Remove/Upgrade plasmoid project from current directory.
# Author:        Remisa Yousefvand <remisa.yousefvand@gmail.com>
# Date:          2020-07-26
version="1.0.0"  # Script Version

# Exit codes
# ==========
# 0   no error.
# 1   unknown parameter.
# 2   requirement not satisfied.
# 3   Unknown error.

# >>>>>>>>>>>>>>>>>>>>>>>> functions >>>>>>>>>>>>>>>>>>>>>>>>

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
  kpackagetool5 -t Plasma/Applet --install package
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
  kpackagetool5 -t Plasma/Applet --remove package
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
  kpackagetool5 -t Plasma/Applet --remove package
  if [[ $? != 0 ]]; then
    echo `tput setaf 1`Plasmoid upgrade failed!`tput sgr0`
    exit 3
  fi
  killall plasmashell
  sleep 1s
  kstart5 plasmashell
  kpackagetool5 -t Plasma/Applet --install package
  # kpackagetool5 -u myplasmoid
  if [[ $? != 0 ]]; then
    echo `tput setaf 1`Plasmoid upgrade failed!`tput sgr0`
    exit 3
  fi
  echo "Plasmoid upgraded successfully."
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
    -i, --install  |  Install Plasmoid
    -r, --remove   |  Remove  Plasmoid
    -u, --upgrade  |  Upgrade Plasmoid
    -v, --version  |  Script  Version 
    -h, --help     |  Help    Message
  "
}

# <<<<<<<<<<<<<<<<<<<<<<<< functions <<<<<<<<<<<<<<<<<<<<<<<<

bannerSimple "Plasmoid Manager"
action=""

case "$1" in
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
  options=("Install" "Remove" "Upgrade" "Exit")
  chooseOption "What do you want to do?" 2 "${options[@]}"; choice=$?
fi

action="${options[$choice]}"

case "$action" in
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
