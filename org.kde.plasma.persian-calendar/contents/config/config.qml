import QtQuick 2.12
import org.kde.kirigami as Kirigami
import org.kde.plasma.configuration 2.0

ConfigModel {
	ConfigCategory {
		name: i18n("General")
		icon: "go-home"
		source: "GeneralConfig.qml"
	}
}
