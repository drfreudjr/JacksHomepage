export function getCenterXPosition (randomCharacter, stringPlacementX, boxSize) {  // returns x position to draw letter in box
            let textWidth = context.measureText(randomCharacter).width
            let centerOfBox = stringPlacementX + (.5*boxSize)
            let xPosition = centerOfBox - (.5*textWidth)
            return (xPosition)
}