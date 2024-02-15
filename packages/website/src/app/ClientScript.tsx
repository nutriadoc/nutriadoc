import {PackageManager} from "@nutriadoc/classes"

const pkg = PackageManager.shared

pkg.register([
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
  }
])

pkg.isDevMode()

export default function ClientScript() {
  return (
    <>
      <script type="importmap" dangerouslySetInnerHTML={{__html: JSON.stringify(pkg.dumpImportMap())}}></script>
      <script type={"module"} defer={true} dangerouslySetInnerHTML={{
        __html: `
import { PackageManager } from '@nutriadoc/classes'
PackageManager.shared.load("@nutriadoc/components/dist/style.css")
`
      }}></script>
    </>
  )
}