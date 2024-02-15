'use client'

const code = {
  __html: `
import { Console } from "@nutriadoc/cloud"

`}

export default function ConsoleScript() {
  return (
    <script type={"module"} dangerouslySetInnerHTML={code}></script>
  )
}