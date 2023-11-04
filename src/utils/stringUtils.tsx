export const repeatGrid= (fr:string, repeat:number)=>{
    let displayText = ""
    for(let i = 0; i<repeat;i++){
        displayText = `${displayText}${fr} `
    }
    return displayText
}