import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {
  public audio_player = new Audio();
  constructor() { }

  ngOnInit() {
  }
  playAudio() {
    this.audio_player.src = '../../../assets/music/azeb.mp3';
    this.audio_player.load();
    this.audio_player.play();
  }
}
