// numberLength2Or3 - Olyan számok, melyek 2 vagy 3 számjegyet tartalmaznak
// startsWithEven - Olyan számok, melyek páros számmal kezdődnek
// startsWithNumber - Olyan szavak, melyek számmal kezdődnek és betűvel végződnek
// capitalized - Olyan szabak, melyek nagybetűből állnak
// capitalizedLengthMin3 - Olyan szavak, melyek nagybetűvel kezdődnek és legalább 3 betűsek
// startsWithVowel - Olyan szavak, melyek magánhangzóval kezdődnek
let text = "Hello WORLD! Today is the 5th of June 2024 21th century. I've 15 apples, 123 oranges, and 4567 grapes."
let regex, result
console.log(numberLength2Or3(text))

console.log(startsWithEven(text))

console.log(startsWithNumber(text))

console.log(capitalized(text))

console.log(capitalizedLengthMin3(text))

console.log(startsWithVowel(text))

function numberLength2Or3(text){
    regex = /\b\d{2,3}\b/g
    result = text.match(regex)
    console.log(`\SSzámok keresése, amelyek 2 vagy 3 karakterből állnak: ${regex}`)
    console.log(result)
}

function startsWithEven(text) {
    regex = /\b[2468][0-9]*\b/g
    result = text.match(regex)
    console.log(`\SSzámok keresése, páros számmal kezdődnek: ${regex}`)
    console.log(result)
}

function startsWithNumber(text){
    regex = /\b[0-9][a-z]*\b/g
    result = text.match(regex)
    console.log(`\SOlyan szavak, melyek számmal kezdődnek és betűvel végződnek: ${regex}`)
    console.log(result)
}

function capitalized(text){
    regex = /\b[A-Z][A-Z]*\b/g
    result = text.match(regex)
    console.log(`\SOlyan szabak, melyek nagybetűből állnak: ${regex}`)
    console.log(result)
}

function capitalizedLengthMin3(text){
    regex = /\b[A-Z][A-Za-z]{2,}*\b/g
    result = text.match(regex)
    console.log(`\SOOlyan szavak, melyek nagybetűvel kezdődnek és legalább 3 betűsek: ${regex}`)
    console.log(result)
}

function startsWithVowel(text){
    regex = /\b[aeiuoAEIUO][a-zA-Z]*\b/g
    result = text.match(regex)
    console.log(`\SOOlyan szavak, melyek nagybetűvel kezdődnek és legalább 3 betűsek: ${regex}`)
    console.log(result)
}