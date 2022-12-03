import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  pairCount: any
  constructor() { }

  getPairCount(){
    return this.pairCount
  }

  ngOnInit(): void {
    document.body.classList.add('home-bg-img')
    document.body.classList.remove('game-bg-img')
  }

  receivePairCount(value: any){
    this.pairCount = value;
    return this.pairCount;
  }

}
