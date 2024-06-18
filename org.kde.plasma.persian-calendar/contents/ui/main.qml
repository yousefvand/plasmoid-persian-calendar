import QtQuick 6.0
import QtQuick.Layouts 6.0
import org.kde.plasma.plasmoid 2.0
import org.kde.kirigami as Kirigami
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 3.0 as PlasmaComponents

import "../lib/pdp.js" as Parser

PlasmoidItem
{
  id: root

  property bool showTooltip:    plasmoid.configuration.showTooltip
  property int updateInterval:  plasmoid.configuration.updateInterval
  property int widgetWidth:     plasmoid.configuration.widgetWidth
  property string mainText:     plasmoid.configuration.mainText
  property string tooltipText:  plasmoid.configuration.tooltipText
  property var currentTime

  Layout.preferredHeight:       persianDateLabel.height + 8
  Layout.maximumHeight:         Layout.preferredHeight + 10
  Layout.preferredWidth:        widgetWidth
  Layout.maximumWidth:          widgetWidth + 4
  anchors.left:                 parent.left

  FontLoader {
    source: "../fonts/Vazir.ttf"
  }

  Timer
  {
    id:         timer
    interval:   updateInterval
    running:    true
    repeat:     true
    onTriggered: {
      interval    = updateInterval
      currentTime = new Date()
    }

    Component.onCompleted: console.log("timer completed")
  }
    
  PlasmaComponents.Label
  {
    id:               persianDateLabel
    smooth:           true
    font.family:      "Vazir"
    font.pointSize:   -1
    font.pixelSize:   parent.height * 0.6
    textFormat:       Text.RichText
    text:             Parser.parse(mainText, currentTime, true)
    wrapMode:         Text.NoWrap
    anchors.centerIn: parent
  }

  PlasmaCore.ToolTipArea
  {
    anchors.fill: parent
    visible:      showTooltip
    textFormat:   Text.RichText
    mainText:     ""
    subText:      Parser.parse(tooltipText, currentTime, true)
  }
}
