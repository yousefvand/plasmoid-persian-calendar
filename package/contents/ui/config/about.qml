import QtQuick 2.0
import QtQuick.Layouts 1.1
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 3.0 as PlasmaComponents

ColumnLayout
{
  FontLoader
  {
    source: "../../fonts/Vazir.ttf"
  }

  PlasmaComponents.Label
  {
    id:                  aboutLabel
    Layout.fillWidth:    true
    font.family:         "Vazir"
    font.weight:         Font.Normal
    font.pointSize:      16
    horizontalAlignment: Text.AlignHCenter
    text:                '<b>تقویم فارسی</b><br/>نسخه ۱.۱.۳<br/><br/>'
  }

  PlasmaComponents.Label
  {
    id:                  bugReportLink
    anchors.fill:        parent
    Layout.fillWidth:    true
    font.family:         "Vazir"
    font.weight:         Font.Normal
    font.pointSize:      12
    horizontalAlignment: Text.AlignHCenter
    linkColor:           PlasmaCore.ColorScope.highlightColor
    onLinkActivated:     Qt.openUrlExternally(link)
    text:                '<a href="https://github.com/yousefvand/plasmoid-persian-calendar/issues">گزارش خطا</a>'

    MouseArea
    {
      acceptedButtons: Qt.NoButton
      anchors.fill:    parent
      cursorShape:     parent.hoveredLink ? Qt.PointingHandCursor : Qt.ArrowCursor
    }
  }
}
