const cl = console.log;
// import { fontList } from './modules/fontList.js';
// import { dynamicFontSize } from './modules/dynamicFontSize.js';
import { randomCharacterString } from './modules/randomCharacterString.js' // arg = length

window.onload = function () {           // onload wrapper

let flickerAnim = {   // flickerAnim global object
    phraseToDraw : 'Jack Wilcox Productions',
    baseFont: 'Courier',
    widthPercentage:   .7, // what percentage of screen width to fill
    verticalPlacementPercentage: .4, 
    boxSize: 50,        // size of container for letters
    letterToBoxRatio : 1.3,  // how big is the letter relative to box
    lightColor : '#ffffff',
    medColor: '#dddddd',
    darkColor : '#000000',
    initialFps : 1,
    initialFpsIncrementor : 0,
    incrementorIncrementor : 1.3 , // this controls the acceleration
    initialCyclesPerFrame : 1,  // how many letters to draw per paint
    maximumDelayBetweenLetterLocks : 5,
    cyclesBeforeOverdrive : 500, // when to increase letters/paint
    totalNumberofPaints : 0,  // keep track of total refreshes as a timer of sorts
    numberPaintsBeforeNextLock : 110, // how long before starting to seed te word letters
    letterLockedIn: [], // array with truth table for whether letter is locked in
    randomNoReplacementArray: [],  // array used to generate random but non repetitive phraseToDraw
}
                                        
var canvas;    // Global 2D context reference                            
var context;   // Global canvas object reference

    addEventListener("resize", sizeCanvas); 
    sizeCanvas()                            // create initial canvas
    function sizeCanvas () {                // Create or resize 
        if (canvas === undefined) {         
            canvas = createCanvas();        
        }

        function createCanvas () {   
            const canvas = document.createElement("canvas"); 
            canvas.style.position = "absolute"; 
            canvas.style.left     = "0px";      
            canvas.style.top      = "0px";

            document.body.appendChild(canvas);  // Add to document
            context = canvas.getContext("2d");  
            return canvas;
        }

        canvas.width  = window.innerWidth; 
        canvas.height = window.innerHeight; 
        main()     
    }

function main() {  // wrapper that gets called on resize event

const boxSize = flickerAnim.widthPercentage*innerWidth/flickerAnim.phraseToDraw.length  // dynamic resize parameters
const letterSize = flickerAnim.letterToBoxRatio*boxSize // calculated initial values
const charcatersToLockIn = flickerAnim.phraseToDraw.length
let charactersLockedIn = 0
let fps = flickerAnim.initialFps                          
let fpsIncrementor = flickerAnim.initialFpsIncrementor
let cyclesPerFrame = flickerAnim.initialCyclesPerFrame
let startingArraySpotX = (1-flickerAnim.widthPercentage)*innerWidth/2*1.4
context.font = `${letterSize}px ${flickerAnim.baseFont}`

for (let i = 0; i < flickerAnim.phraseToDraw.length; ++i) {
    flickerAnim.letterLockedIn[i] = false // seed letter matching table
    flickerAnim.randomNoReplacementArray[i] = i
}

lettersAnimation()
function lettersAnimation () {
    function drawLetter () { 
        function drawChosenLetter (positionToChange, letterToInsert) {

            function getCenterXPosition (randomCharacter, stringPlacementX, boxSize) {  // returns x position to draw letter in box
               let textWidth = context.measureText(randomCharacter).width
               let centerOfBox = stringPlacementX + (.5*boxSize)
               let xPosition = centerOfBox - (.5*textWidth)
              return (xPosition)
           }  

          let stringPlacementX = startingArraySpotX+((positionToChange-1)*boxSize) // set box position
          let stringPlacementY = innerHeight*flickerAnim.verticalPlacementPercentage

          context.fillStyle = flickerAnim.darkColor  // background box color
              // Y vertical made bigger to erase partular letters that exceed box size
         context.fillRect(stringPlacementX, stringPlacementY*.5, boxSize, boxSize*10) // erases previous letter
                                                                    

          let xPosition = getCenterXPosition(letterToInsert, stringPlacementX, boxSize) // position letter in square
          let yPosition = stringPlacementY + (.77*boxSize) // hacky center letter vertically

          context.fillStyle = flickerAnim.medColor
           context.fillText (letterToInsert, xPosition, yPosition) // draw the damn thing
       }

       flickerAnim.totalNumberofPaints ++   // simple overall counter
       for (let i = 0; i < cyclesPerFrame; ++i) { // letters to change per paint
            let positionToChange = (Math.floor(Math.random()*flickerAnim.phraseToDraw.length)) //default random
            let letterToInsert = randomCharacterString(1) // external module call <arg> is length                
            if (flickerAnim.totalNumberofPaints >= flickerAnim.numberPaintsBeforeNextLock) {// time to a lock letter!
                flickerAnim.numberPaintsBeforeNextLock += Math.floor(Math.random()*flickerAnim.maximumDelayBetweenLetterLocks + 1) // increment next time to lock
                charactersLockedIn ++  
               let j = Math.floor(Math.random()*flickerAnim.randomNoReplacementArray.length)
                  positionToChange = flickerAnim.randomNoReplacementArray[j]
                flickerAnim.randomNoReplacementArray.splice(j,1)   // remove the chosen array member
                  flickerAnim.letterLockedIn[positionToChange] = true // indicate locked in
        }
          if (flickerAnim.letterLockedIn[positionToChange] == true)
               letterToInsert = flickerAnim.phraseToDraw[positionToChange] // swap in locked letter
           drawChosenLetter(positionToChange, letterToInsert)
        }   
} 


    if (charactersLockedIn < charcatersToLockIn) {
        if (fps > flickerAnim.cyclesBeforeOverdrive) { 
            ++ cyclesPerFrame // draw multiple cycles per render
            fps *=.5    // lower the fps to avoid too sudden increase
        }
        setTimeout(function() {
           drawLetter()
            requestAnimationFrame(lettersAnimation)
            fpsIncrementor +=flickerAnim.incrementorIncrementor   // increase the increaser each time thru to get acceleration
            fps += fpsIncrementor   // basic speeding up replacement speed 
        }, 1000 / fps)
    }
}



}   // end drawScreen wrapper
}   // end onload wrapper