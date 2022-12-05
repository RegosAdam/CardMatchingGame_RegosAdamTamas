import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  cardsArray: any[] = []
  cardToCheck: any
  totalMoves: any
  matchedCards: any[] = []
  busy: any
  gameWon: any

  constructor() {
      this.cardsArray = freshDeck(this.getPairCount())
      this.startGame()
  }

  cutDeckToRows(pairCount: number){
    let row1
    let row2
    let row3
    let row4
    switch(pairCount){
      case 3: {
        row1 = this.cardsArray.slice(0, 3)
        row2 = this.cardsArray.slice(3)
        break
      }
      case 4: {
        row1 = this.cardsArray.slice(0, 4)
        row2 = this.cardsArray.slice(4)
        break
      }
      case 5: {
        row1 = this.cardsArray.slice(0, 5)
        row2 = this.cardsArray.slice(5)
        break
      }
      case 6: {
        row1 = this.cardsArray.slice(0, 4)
        row2 = this.cardsArray.slice(4, 8)
        row3 = this.cardsArray.slice(8)
        break
      }
      case 7: {
        row1 = this.cardsArray.slice(0, 5)
        row2 = this.cardsArray.slice(5, 10)
        row3 = this.cardsArray.slice(10)
        break
      }
      case 8: {
        row1 = this.cardsArray.slice(0, 4)
        row2 = this.cardsArray.slice(4, 8)
        row3 = this.cardsArray.slice(8, 12)
        row4 = this.cardsArray.slice(12)
        break
      }
      case 9: {
        row1 = this.cardsArray.slice(0, 6)
        row2 = this.cardsArray.slice(6, 12)
        row3 = this.cardsArray.slice(12)
        break
      }
      case 10: {
        row1 = this.cardsArray.slice(0, 5)
        row2 = this.cardsArray.slice(5, 10)
        row3 = this.cardsArray.slice(10, 15)
        row4 = this.cardsArray.slice(15, 20)
        break
      }
    }
    return [row1, row2, row3, row4]
  }

  getPairCount(){
    return 6
  }

  startGame() {
      this.cardToCheck = null
      this.totalMoves = 0
      this.matchedCards = []
      this.busy = false
      this.cardsArray = freshDeck(this.getPairCount())
      this.gameWon = false
  }

  flipCard(id: number) {
      if(this.canFlipCard(this.cardsArray[id])) {
          this.totalMoves++
          this.cardsArray[id].flipped = !this.cardsArray[id].flipped
          if(this.cardToCheck)
              this.checkForCardMatch(this.cardsArray[id])
          else
              this.cardToCheck = this.cardsArray[id]
      }
  }

  getFlipValueById(id: number){
    return this.cardsArray[id].flipped
  }

  checkForCardMatch(card: any) {
      if(card.name === this.cardToCheck.name)
          this.cardMatch(card, this.cardToCheck)
      else 
          this.cardMisMatch(card, this.cardToCheck)

      this.cardToCheck = null
  }

  cardMatch(card1: any, card2: any) {
      this.matchedCards.push(card1)
      this.matchedCards.push(card2)
      this.busy = true
      setTimeout(() => {
          card1.flipped = false
          card1.imgURL = null
          card2.flipped = false
          card2.imgURL = null
          this.busy = false
      }, 1000)

      if(this.matchedCards.length === this.cardsArray.length)
        setTimeout(() => {
          this.gameWon = true
          this.busy = false
        }, 1000)
  }

  cardMisMatch(card1: any, card2: any) {
      this.busy = true
      setTimeout(() => {
          card1.flipped = false
          card2.flipped = false
          this.busy = false
      }, 1000)
  }
  
  canFlipCard(card: any) {
      return !this.busy && !this.matchedCards.includes(card) && card !== this.cardToCheck
  }
}

const CARD_IMAGES =[
  {"name":"croco", "imgURL":"assets/images/Croco.png"},
  {"name":"fox", "imgURL":"assets/images/Fox.png"},
  {"name":"gazelle", "imgURL":"assets/images/Gazelle.png"},
  {"name":"gorilla", "imgURL":"assets/images/Gorilla.png"},
  {"name":"monkey", "imgURL":"assets/images/Monkey.png"},
  {"name":"rhino", "imgURL":"assets/images/Rhino.png"},
  {"name":"ring_tailed_lemur", "imgURL":"assets/images/Ring-Tailed_Lemur.png"},
  {"name":"tiger", "imgURL":"assets/images/Tiger.png"},
  {"name":"toucan", "imgURL":"assets/images/Toucan.png"},
  {"name":"warthog", "imgURL":"assets/images/Warthog.png"}
]

function freshDeck(pairCount: number) {
  let id = -1
  const imageGroup = CARD_IMAGES.slice(0, pairCount)
  let unshuffled = imageGroup.concat(imageGroup)
  let shuffled = unshuffled
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value)

  return shuffled.map(i => ({id: ++id, name: i.name, imgURL: i.imgURL, flipped: false }))
}


