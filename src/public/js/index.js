/* eslint-disable no-undef */
// @ts-ignore
const serverSocket = io('http://localhost:8080')

const div = document.getElementById('container') ?? null

const template = `
<h1>hola mundo2</h1>
`

const compileProducts = Handlebars.compile(template)

// serverSocket.on('reloadProducts', (data) => {
//   console.log(data)
//   if (div !== null) {
//     div.innerHTML = compileProducts({
//       faviconTitle: 'Home | Products',
//       mainTitle: 'List of products in Real Time',
//     })
//   }
// })
//
