import QtQuick 2.12
import QtQuick.Layouts 1.11
import QtQuick.Controls 2.12
import org.kde.plasma.plasmoid 2.0
import org.kde.kirigami as Kirigami
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 3.0 as PlasmaComponents

Item
{
  id: configRoot

  signal configurationChanged

  property alias cfg_widgetWidth:    widgetWidth.value
  property alias cfg_showTooltip:    showTooltip.checked
  property alias cfg_updateInterval: updateInterval.value
  property alias cfg_mainText:       mainText.text
  property alias cfg_tooltipText:    tooltipText.text
  
  property alias cfg_persianDateLabel: persianDateLabel.height

  anchors.centerIn: parent

  ColumnLayout
  {
    /*
    RowLayout
    {
      Label { text: "Widget width" }
      SpinBox
      {
        id:           widgetWidth
        from:         10
        to:           10000
        editable:     true
        stepSize:     10
        // suffix:       ""
      }
    } */

    RowLayout
    {
      CheckBox
      {
        id: showTooltip
        checked: true
        text: "Show tooltip"
      }
    }
    /*
    RowLayout
    {
      Label { text: "Update Interval (seconds)" }
      SpinBox
      {
        id:           updateInterval
        minimumValue: 0.001
        maximumValue: 86399
        decimals:     3
        stepSize:     1
        suffix:       " s"
      }
    } */
    /*
    RowLayout
    {
      Label { text: "Main" }
      TextField
      {
        id:               mainText
        Layout.fillWidth: true
        placeholderText:  "HTML & CSS are supported"
        text:             ""
      }
    } */
    /*
    RowLayout
    {
      Label { text: "Tooltip" }
      TextField
      {
        id:               tooltipText
        Layout.fillWidth: true
        placeholderText:  "HTML & CSS are supported"
        text:             ""
      }
    } */
  }
}