export function dynamicFontSize (originalFontSize = 50, originalCanvasSize = 1360) {        // converts original design specs
    let percentOfFullSize = innerWidth/originalCanvasSize                                
    let adjustedLinearFontSize = originalFontSize*percentOfFullSize                     //linear transform
    let adjustedNonlinearFontSize = originalFontSize /(1-Math.log(percentOfFullSize))   //nonlinear transform
    return(adjustedNonlinearFontSize)
}