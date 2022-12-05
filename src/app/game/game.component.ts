import { HomeComponent } from './../home/home.component';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: any
  cutDeck: any
  shuffledDeck: any
  backgroundImageUrl = "assets/images/Background.png"

  constructor() {
    let homeComponent = new HomeComponent()
    this.game = homeComponent.getGame()
    this.cutDeck = this.game.cutDeckToRows(this.game.getPairCount())
  }

  restart() {
    this.game.startGame()
    this.cutDeck = this.game.cutDeckToRows(this.game.getPairCount())
  }

  ngOnInit(): void {
    document.body.classList.add('game-bg-img')
    document.body.classList.remove('home-gbg-img')
  }
}
