import QtQuick 2.0
import QtQuick.Layouts 1.1
import QtQuick.Controls 1.3
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 3.0 as PlasmaComponents

Item
{
  property alias cfg_updateInterval: updateInterval.value
  property alias cfg_showTooltip:    showTooltip.checked
  property alias cfg_mainText:       mainText.text
  property alias cfg_tooltipText:    tooltipText.text

  anchors.centerIn:     parent

  ColumnLayout
  {
    RowLayout
    {
      CheckBox
      {
        id: showTooltip
        text: "Show tooltip"
      }
    }

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
    }

    RowLayout
    {
      Label { text: "Main" }
      TextField
      {
        id:               mainText
        Layout.fillWidth: true
        placeholderText:  "something"
        text:             ""
      }
    }

    RowLayout
    {
      Label { text: "Tooltip" }
      TextField
      {
        id:               tooltipText
        Layout.fillWidth: true
        placeholderText:  "something else"
        text:             ""
      }
    }
  }
}
