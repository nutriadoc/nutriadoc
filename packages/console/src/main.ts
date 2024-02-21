import { Console } from "@nutriadoc/cloud"

import "./style.css"

document.querySelector("#app")?.append(new Console().renderNode())