import QtQuick 2.1
import org.kde.plasma.configuration 2.0

ConfigModel
{
  ConfigCategory
  {
    name:   "General"
    icon:   "go-home"
    source: "config/general.qml"
  }
  ConfigCategory
  {
    name:   "About"
    icon:   "help-about-symbolic"
    source: "config/about.qml"
  }
}
