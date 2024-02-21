'use client'

import {useLayoutEffect, useRef} from "react";

export default function ConsoleScript() {

  const ref = useRef<HTMLDivElement>(null)

  // const win = window as unknown as any
  // const Console = win.cloud
  // console.debug("console", Console)

  useLayoutEffect(() => {
    if (!ref.current) return

    if (ref.current.children.length > 0) return

    const console = new cloud.Console()
    ref.current?.append(console.renderNode())
  }, [])

  return (
    <>
      <div
        ref={ref}
        className={"console-container"}
      ></div>
    </>
  )
}