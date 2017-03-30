import {
	AppRegistry
} from "react-native";

import SquareGridExample from "./SquareGridExample.js";

AppRegistry.registerComponent("SquareGridExample", () => SquareGridExample);

// Mount onto web
AppRegistry.runApplication("SquareGridExample", {
	rootTag: document.getElementById("root")
});
