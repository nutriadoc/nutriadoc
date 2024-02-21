import {PackageManager, Package} from "@nutriadoc/core"

// const pkg = PackageManager.shared
//
// const isDev = true
//
// let packages = [] as Package[]


let packages =  [

  {
    name: '@nutriadoc/classes',
    version: '0.0.4',
    module: '/dist/classes.es.js'
  },
  {
    name: '@nutriadoc/components',
    version: '0.0.5',
    module: '/dist/main.es.js'
  },
  {
    name: '@nutriadoc/cloud',
    version: '0.0.7',
    module: '/dist/index.es.js'
  },
  {
    name: 'nutria',
    version: '0.0.27',
    module: '/dist/nutria.es.js',
    main: '/dist/nutria.umd.js',
  },
  {
    name: 'history',
    version: '5.3.0',
    module: '/index.js',
    debuggable: false,
  }
] as Package[]

PackageManager.shared.register(...packages)
PackageManager.shared.devMode()

export default function ClientScript() {
  const importMap = JSON.stringify(PackageManager.shared.dumpImportMap(), undefined, 4)

  return (
    <>
      <script type="importmap" dangerouslySetInnerHTML={{__html: importMap}}></script>
      <script
        type={"module"}
        defer={true}
        dangerouslySetInnerHTML={{
          __html: `
import { PackageManager } from '@nutriadoc/classes'
PackageManager.shared.register(...JSON.parse('${JSON.stringify(packages)}'))
`
        }}></script>
      <script
        type="module"
        dangerouslySetInnerHTML={{ __html: `
import * as CloudModule from '@nutriadoc/cloud'
console.debug("cloud", CloudModule)
var cloud = CloudModule
        `}}>

      </script>
    </>
  )
}