'use client'

import Link from "next/link"
import {useCallback, useEffect, useRef, useState} from "react";

let login: any | undefined = undefined

export default function LoginButton() {


  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const isDeveloper = window?.localStorage?.getItem("developer")
    setVisible(true)
  })

  const onClick = useCallback(() => {
    const Login = cloud.Login

    if (login === undefined) {
      login = new Login()
      login.render()
      document.body.append(login.element)
    }
    const link = ref.current!.querySelector("a")
    login.visible(link)
  }, [])

  return (
    <>
      {visible &&
      <div
        ref={ref}
        style={{
          position: "relative"
        }}
      >
        <Link style={{position: "relative"}} href={"#"} onClick={onClick}>Login</Link>
      </div>
        }
    </>
  )
}