import QtQuick 2.0
import QtQuick.Layouts 1.1
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 3.0 as PlasmaComponents

import "../lib/pdp.js" as Parser

Item
{
  id: root

  property bool showTooltip:         plasmoid.configuration.showTooltip
  property int updateInterval:       plasmoid.configuration.updateInterval * 1000
  property int widgetWidth:          plasmoid.configuration.widgetWidth
  property string mainText:          plasmoid.configuration.mainText
  property string tooltipText:       plasmoid.configuration.tooltipText

  Plasmoid.preferredRepresentation:  Plasmoid.fullRepresentation
  Layout.preferredHeight:            persianDateLabel.height + 8
  Layout.preferredWidth:             widgetWidth
  Layout.maximumHeight:              persianDateLabel.height + 8
  Layout.maximumWidth:               widgetWidth
  anchors.left: parent.left

  FontLoader {
    source: "../fonts/Vazir.ttf"
  }

  PlasmaCore.DataSource
  {
    id:                   localTime
    engine:               "time"
    connectedSources:     ["Local"]
    interval:             updateInterval
  }
    
  PlasmaComponents.Label
  {
    id:                   persianDateLabel
    smooth:               true
    font.family:          "Vazir"
    font.pointSize:       -1
    font.pixelSize:       parent.height * 0.6
    textFormat:           Text.RichText
    text:                 Parser.parse(mainText, localTime.data.Local.DateTime, true)
    wrapMode:             Text.NoWrap
    anchors.centerIn:     parent
  }

  PlasmaCore.ToolTipArea
  {
    anchors.fill: parent
    visible:      showTooltip
    textFormat:   Text.RichText
    mainText:     ""
    subText:      Parser.parse(tooltipText, localTime.data.Local.DateTime, true)
  }
}
