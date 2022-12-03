import { Deck } from './../service/Deck';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  pairCount: number = 6
  deck: Deck
  cutDeck: any
  shuffledDeck: any
  backgroundImageUrl = "assets/images/Background.png"

  constructor() {
    this.deck = new Deck(this.pairCount)
    this.shuffledDeck = this.deck
    this.cutDeck = this.deck.cutDeckToRows(this.pairCount)
   }

   restart(){
    this.deck = new Deck(this.pairCount)
    this.shuffledDeck = this.deck
    this.cutDeck = this.deck.cutDeckToRows(this.pairCount)
  }

  ngOnInit(): void {
  }
}
