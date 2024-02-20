'use client'

import {useLayoutEffect} from "react";


/**
 * renders the want list, and adds it to the page
 *
 * @constructor
 */
export default function WantList() {

  useLayoutEffect(() => {
    const container = document.querySelector(".subscribe-container")
    if (!container) return
    if (document.getElementById("want-list-script")) return

    const script = document.createElement("script")
    script.id = "want-list-script"
    script.type = 'module'
    script.defer = true
    script.innerText  = `
    console.debug("test");
    console.debug(document.querySelectorAll("script"));
  import { WantList } from "@nutriadoc/cloud";
  var container = document.querySelector('.subscribe-container');
  new WantList().addTo(container)
 `
    // container.appendChild(script)
    // setTimeout(() => {
    //   container.appendChild(script)
    // }, 2000)

  }, []);

  return (
    <>
      <div className={"subscribe-container"}></div>
    </>
  )
}