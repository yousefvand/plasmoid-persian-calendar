import QtQuick 2.12
import QtQuick.Layouts 1.11
import QtQuick.Controls 2.12
import org.kde.plasma.plasmoid 2.0
import org.kde.kirigami as Kirigami
import org.kde.plasma.core 2.0 as PlasmaCore
import org.kde.plasma.components 3.0 as PlasmaComponents

Item {
    id: configRoot

    signal configurationChanged

    property alias cfg_widgetWidth: widgetWidthSpinBox.value
    property alias cfg_mainText: mainTextField.text
    property alias cfg_tooltipText: tooltipTextField.text
    property alias cfg_persianDateLabel: persianDateLabel.height
    property alias cfg_showTooltip: showTooltipCheckBox.checked
    property alias cfg_updateInterval: updateIntervalSpinBox.value

    anchors.centerIn: parent

    ColumnLayout {
        RowLayout {
            Label { text: "Widget width" }
            SpinBox {
                id: widgetWidthSpinBox
                from: 10
                to: 10000
                editable: true
                stepSize: 10
                // suffix: ""
            }
        }

        RowLayout {
            Label { text: "Main" }
            TextField {
                id: mainTextField
                Layout.fillWidth: true
                placeholderText: "HTML & CSS are supported"
                text: ""
            }
        }

        RowLayout {
            Label { text: "Tooltip" }
            TextField {
                id: tooltipTextField
                Layout.fillWidth: true
                placeholderText: "HTML & CSS are supported"
                text: ""
            }
        }

        RowLayout {
            Label { text: "Persian Date Label Height" }
            TextField {
                id: persianDateLabel
                Layout.fillWidth: true
                placeholderText: "Enter height value"
                text: ""
            }
        }

        RowLayout {
            CheckBox {
                id: showTooltipCheckBox
                checked: true
                text: "Show tooltip"
            }
        }

        RowLayout {
            Label { text: "Update Interval (seconds)" }
            SpinBox {
                id: updateIntervalSpinBox
                from: 1
                to: 1000  // Reduced range for testing
                editable: true
                stepSize: 10
                // suffix: " s"  // Commented out for testing
            }
        }
    }
}
