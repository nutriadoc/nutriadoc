// import Quill from 'quill'
// import 'quill/dist/quill.core.css'

// import { QuillBinding } from 'y-quill'
// import * as Y from "yjs"
// import { WebsocketProvider} from "y-websocket"

// var editor = new Quill('#app', {
//   modules: { toolbar: '#toolbar' },
//   theme: 'snow',
// });

// const ydoc = new Y.Doc()
// const text = ydoc.getText("quill")
// const binding = new QuillBinding(text, editor)
// const websocket = new WebsocketProvider("ws://localhost:1234", "quill-demo", ydoc)

import MainToolbar from './toolbar/main/MainToolbar'
import 'bootstrap-icons/font/bootstrap-icons.css'

const app = document.getElementById("app")
var toolbar = MainToolbar.simple()
app?.appendChild(toolbar.render() as Node)

const insert = toolbar.findItem("insert")!
const helloworld = document.createElement("div")
helloworld.innerHTML = "Hello World"
// const menu = new ContextualMenu(insert.element, ContextualMenuPosition.BottomLeft, [new AbstractElement(helloworld)])
// toolbar.addElement(menu)
// toolbar.active("insert")