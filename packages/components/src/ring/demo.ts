import Ring from './index'

const ring = new Ring({
  container: "#loading",
  size: 14,
  borderWidth: 2,
  color: "rgb(0 0 0 / 0.2)"
})

ring.infinite = true

/*
let i = 0

const handle = setInterval(() => {
  ring.progress = (i * 10) > 100 ? 100 : i * 10
  console.debug(ring.progress)
  if (i * 10 > 100) {
    clearInterval(handle)
    return
  }
  i ++
}, 50)*/
