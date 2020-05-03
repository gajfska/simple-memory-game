import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Item, ItemState} from './item';

@Component({
  selector: 'app-simplecell',
  templateUrl: './simplecell.component.html',
  styleUrls: ['./simplecell.component.css'],
  animations: [
    trigger('divState', [
      state(ItemState.wrong, style({
        'background-color': 'red'
      })),
      state(ItemState.normal, style({
        'background-color': 'blue'
      })),
      state(ItemState.win, style({
        'background-color': 'green'
      })),
      transition(`${ItemState.normal} => ${ItemState.wrong}` , [
        animate('0.5s')
      ]),
      transition(`${ItemState.normal} <=> ${ItemState.win}`, [
        animate('0.5s')
      ]),
    ]),
  ]
})

export class SimplecellComponent implements OnInit {
  statusChange: ItemState;

  cellCount = 3; //rozmiar planszy 4x4
  memoryCount = 3; //ile kwadratów do zgadnięcia
  basicArray: Item[][] = [];
  countGoodPoints = 0;
  countBadPoints = 0;

  constructor() {
  }

  ngOnInit(): void {
    for (let i = 0; i < this.cellCount; i++) {
      const rowArray: Item[] = [];
      for (let j = 0; j < this.cellCount; j++) {
        const item = new Item(false, false);
        rowArray.push(item);
      }
      this.basicArray.push(rowArray.slice(0));
    }
    console.log(this.basicArray);
  }

  createGameBoard() {
    for (let i = 0; i < this.cellCount; i++) {
      for (let j = 0; j < this.cellCount; j++) {
        if (this.basicArray[i][j].isVisible === false && this.basicArray[i][j].isWanted === false) {
          this.statusChange = ItemState.normal;
        }
      }
    }
  }

  onAnimate() {
  //   for (let i = 0; i < this.cellCount; i++) {
  //     for (let j = 0; j < this.cellCount; j++) {
  //       if (this.basicArray[i][j].isVisible === true && this.basicArray[i][j].isWanted === true) {
  //         this.basicArray[i][j].setCellVisible(false);
  //       }
  //     }
  //   }
  //   console.log(this.basicArray);
  }

  onZgaduj(i: number, j: number) {
    if (this.basicArray[i][j].isWanted === true) {
      this.basicArray[i][j].setCellVisible(true);
      this.countGoodPoints++;
    }
    else {
      this.basicArray[i][j].setCellVisible(true);
      // this.countBadPoints++;
      this.countGoodPoints = 0;
      console.log('you lose');
      alert('You los');
    }
  }


  gemerateGameBoard() {

  }

  chooseRandomColorCells() {
    for (let i = 0; i < this.memoryCount; i++) {
      const rowNum = Math.floor(Math.random() * this.basicArray.length);
      console.log(rowNum);
      const colNum = Math.floor(Math.random() * this.basicArray.length);
      console.log(colNum);
      this.basicArray[rowNum][colNum].setCellWanted(true);
      this.basicArray[rowNum][colNum].setCellVisible(true);

    }
    console.log(this.basicArray);
  }

  coverColorCells() {
    setTimeout(() => {
      for (let i = 0; i < this.cellCount; i++) {
        for (let j = 0; j < this.cellCount; j++) {
          if (this.basicArray[i][j].isVisible === true) {
            this.basicArray[i][j].setCellVisible(false);
          }
        }
      }
    }, 3000);
  }

  statusColor(i: number, j: number): ItemState {
    return this.basicArray[i][j].statusColorItem();
  }
}
