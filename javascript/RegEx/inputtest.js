import input from './input.js'

//let name = await input('kerem a nevedet: ')
//console.log(`a neved ${name}`)

let txt = 'sdfoiuasgiufskjerreojjkgfeeewiopqadjascmejd'
//1.feladat
console.log(txt.slice(0,6))
//2.feladat
console.log(txt.slice(2,7))
//3.feladat
console.log(txt.slice(5))
//4.feladat
console.log(txt.slice(5,12))
//5.feladat
console.log(txt.toUpperCase())
//6.feladat
let result = ""
for (let i = 1; i<txt.length; i++){
    if(i%2===1){
        result+=txt[i].toUpperCase();
    }
    
    else result += txt[i]
}
console.log(result)
//7.feladat
console.log(txt.replaceAll("e", "E"))
//8.feladat
console.log(txt.split('e'))