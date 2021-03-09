export function randomCharacterString (length) {
    let possibleLetters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let randomString = ''
    let randomCharacter = null
    for (let i = 0; i < length; i++) 
        randomString += possibleLetters[Math.floor(Math.random()*possibleLetters.length)]
    return(randomString)
}