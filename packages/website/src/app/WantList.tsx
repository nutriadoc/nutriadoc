'use client'

import {useCallback, useEffect, useLayoutEffect, useRef} from "react";

export default function WantList() {

  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    console.debug("on load")
    if (!ref.current) return
    if (ref.current.children.length > 0) return

    (async () => {
      const component = await window['components']
      console.debug(component)
      new component.WantList().addTo(ref.current)
    })()

    // window.wantList.addTo(ref.current)
  }, [])

  const onLoad = useCallback(() => {

  }, [])

  return (
    <div className={""}>
      <div ref={ref} className={"subscribe-container"} />
      <script
        type={"module"}
        dangerouslySetInnerHTML={{__html: `
const components = await import("@nutriadoc/components")
console.debug("hello components", components)
// import { WantList } from "@nutriadoc/components"
// window.wantList = () => new WantList()`
}}>
      </script>
    </div>
  )
}