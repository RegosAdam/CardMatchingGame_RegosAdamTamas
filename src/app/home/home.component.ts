import { Component, OnInit } from '@angular/core';
import { GameService } from '../service/game.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  game: GameService

  constructor() {
    this.game = new GameService()
  }

  getGame() {
    return this.game
  }

  ngOnInit(): void {
    document.body.classList.add('home-bg-img')
    document.body.classList.remove('game-bg-img')
  }
}
