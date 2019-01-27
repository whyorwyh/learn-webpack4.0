import logo from './no-data.png';
let image = new Image();
image.src = logo
console.log(logo)
document.body.appendChild(image)
// let a = require('./a.js')

console.log('输出我')
require('./index.css')
require('./index.less')

let fn = () =>{
    console.log('es6')
}
fn()
class A {
    a=1
}