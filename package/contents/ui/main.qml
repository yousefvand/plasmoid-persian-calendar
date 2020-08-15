import QtQuick 2.0
import QtQuick.Layouts 1.1
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 3.0 as PlasmaComponents

import "../lib/jcal.js" as JCal

Item
{
  id: root

  Plasmoid.preferredRepresentation: Plasmoid.fullRepresentation
  Layout.preferredHeight: persianDateLabel.height + 4
  Layout.preferredWidth:  persianDateLabel.width  + 4
  Layout.maximumHeight:   persianDateLabel.height + 4
  Layout.maximumWidth:    persianDateLabel.width  + 4

  FontLoader {
    source: "../fonts/Vazir.ttf"
  }

  PlasmaCore.DataSource
  {
    id:                   localTime
    engine:               "time"
    connectedSources:     ["Local"]
    interval:             60000
  }
    
  PlasmaComponents.Label
  {
    id:                   persianDateLabel
    smooth:               true
    font.family:          "Vazir"
    font.weight:          Font.Normal
    font.pointSize:       -1
    font.pixelSize:       parent.height * 0.6
    text:                 JCal.persianDate()
    wrapMode:             Text.NoWrap
    anchors.centerIn:     parent
    horizontalAlignment:  Text.AlignHCenter
    verticalAlignment:    Text.AlignVCenter
  }
}
