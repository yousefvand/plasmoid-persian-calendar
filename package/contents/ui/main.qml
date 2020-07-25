import QtQuick 2.0
import QtQuick.Layouts 1.1
import org.kde.plasma.plasmoid 2.0
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 2.0 as PlasmaComponents

Item
{
  id: root

  Plasmoid.preferredRepresentation: Plasmoid.fullRepresentation
  Layout.preferredHeight: persianDateLabel.height + 4
  Layout.preferredWidth:  persianDateLabel.width  + 4
  Layout.maximumHeight:   persianDateLabel.height + 4
  Layout.maximumWidth:    persianDateLabel.width  + 4

  /**  gregorianToJalali function License: 
  Author: JDF.SCR.IR =>> Download Full Version :  http://jdf.scr.ir/jdf
  License: GNU/LGPL _ Open Source & Free :: Version: 2.80 */

  function gregorianToJalali (gy, gm, gd) {
    var jy, jm, jd, days
    var gregorianDayMonth = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
    var gy2 = (gm > 2) ? (gy + 1) : gy
    days = 355666 + (365 * gy) + parseInt((gy2 + 3) / 4) - parseInt((gy2 + 99) / 100) + parseInt((gy2 + 399) / 400) + gd + gregorianDayMonth[gm - 1]
    jy = -1595 + (33 * parseInt(days / 12053))
    days %= 12053
    jy += 4 * parseInt(days / 1461)
    days %= 1461
    if (days > 365) {
      jy += parseInt((days - 1) / 365)
      days = (days - 1) % 365
    }
    if (days < 186) {
      jm = 1 + parseInt(days / 31)
      jd = 1 + (days % 31)
    } else {
      jm = 7 + parseInt((days - 186) / 30)
      jd = 1 + ((days - 186) % 30)
    }
    return { jy, jm, jd }
  }

  function persianDate() {
    var year  = localTime.data.Local.DateTime.getFullYear()
    var month = localTime.data.Local.DateTime.getMonth() + 1
    var day   = localTime.data.Local.DateTime.getDate()
    var jDate = gregorianToJalali(year, month, day)
    return jDate.jy + "/" + jDate.jm + "/" + jDate.jd
  }

  PlasmaCore.DataSource
  {
    id:                 localTime
    engine:             "time"
    connectedSources:   ["Local"]
    interval:           60000
  }
    
  PlasmaComponents.Label
  {
    id:                 persianDateLabel
    text:               persianDate()
    anchors.centerIn:   parent
  }
}
