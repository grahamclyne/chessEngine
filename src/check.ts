import * as mp from './moves'
import * as game from './game'
import * as utils from './util'


export function isCheck(colour,board){//should this take a specific board and the attack board? 
    let king = board.get(colour+'K')
    let oppColour = (colour == 'W') ? 'B' : 'W'
    let attack = mp.getAttackBoard(oppColour,board,true)
    return ((king & attack) > 0n) ? true : false
}

export function isCheckMate(colour,board,history){
    let check = isCheck(colour,board)
    let legalMoves = game.findMoves(colour, history, board)
    while (check && legalMoves.length > 0) {
        let rand = Math.floor(Math.random() * legalMoves.length)
        let move = legalMoves[rand]
        let boardState = game.makeMove(move, colour, board)
        if (!isCheck(colour, boardState)) {
            check = false
        }
        else { //remove move from list
            legalMoves = legalMoves.filter((x) => { if (!utils.arrayEquals(x, move)) return x })
        }
    }
    if(legalMoves.length == 0 && check == true){
        return 1
    }
    if(legalMoves.length == 0 && check == false){
        return 2
    }
    else{
        return 0
    }
}