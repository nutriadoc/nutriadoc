import en from "./family/en.ts"
import zh from "./family/zh.ts"
import Lang from "../../ui/lang/Lang.ts";

const family = Lang.lang() === "en" ? en : zh

export default family