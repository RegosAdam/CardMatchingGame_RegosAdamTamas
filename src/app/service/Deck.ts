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

export class Deck {

  cards: any[]
  moveCounter: number
  gameWon: boolean

  constructor(pairCount: number) {
    this.cards = freshDeck(pairCount)
    this.moveCounter = 0
    this.gameWon = false
  }

  get numberOfCards(){
    return this.cards.length
  }
  
  cutDeckToRows(pairCount: number){
    let row1
    let row2
    let row3
    let row4
    switch(pairCount){
      case 3: {
        row1 = this.cards.slice(0, 3)
        row2 = this.cards.slice(3)
        break;
      }
      case 4: {
        row1 = this.cards.slice(0, 4)
        row2 = this.cards.slice(4)
        break;
      }
      case 5: {
        row1 = this.cards.slice(0, 5)
        row2 = this.cards.slice(5)
        break;
      }
      case 6: {
        row1 = this.cards.slice(0, 4)
        row2 = this.cards.slice(4, 8)
        row3 = this.cards.slice(8)
        break;
      }
      case 7: {
        row1 = this.cards.slice(0, 5)
        row2 = this.cards.slice(5, 10)
        row3 = this.cards.slice(10)
        break;
      }
      case 8: {
        row1 = this.cards.slice(0, 4)
        row2 = this.cards.slice(4, 8)
        row3 = this.cards.slice(8, 12)
        row4 = this.cards.slice(12)
        break;
      }
      case 9: {
        row1 = this.cards.slice(0, 6)
        row2 = this.cards.slice(6, 12)
        row3 = this.cards.slice(12)
        break;
      }
      case 10: {
        row1 = this.cards.slice(0, 5)
        row2 = this.cards.slice(5, 10)
        row3 = this.cards.slice(10, 15)
        row4 = this.cards.slice(15, 20)
        break;
      }
    }
    return [row1, row2, row3, row4]
  }

  findCardById(id: number){
    return this.cards.find(x => x.id === id);
  }

  flipACardById(id: number){
    this.moveCounter++
    this.cards[id].flipped = !this.cards[id].flipped
    setTimeout(() => this.checkForMatch(), 1500)
    setTimeout(() => this.checkWin(), 1500)
  }

  hideACardById(id: number){
    this.cards[id].imgURL = null
    this.cards[id].flipped = false
  }

  getFlipValueById(id: number){
    return this.cards[id].flipped
  }

  checkWin(){
    let flippedDown = this.cards.filter(x => x.flipped==false)
    let found = this.cards.filter(x => x.imgURL==null)
    if (flippedDown.length == found.length){
      this.gameWon = true
    }
  }

  checkForMatch(){
    let counter = 2;
    let filteredArray = this.cards.filter(x => x.flipped==true)
    if(filteredArray.length >= counter){
      if(filteredArray[0].name === filteredArray[1].name){
        this.hideACardById(filteredArray[0].id)
        this.hideACardById(filteredArray[1].id)
      }
      else{
        this.cards.forEach(card => {
          if (card.flipped){
            card.flipped = false
          }
        })
      }
    }
  }
}

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


