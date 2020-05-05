import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Item, ItemState} from './item';
import {error} from 'selenium-webdriver';

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
  basicArray: Item[][];
  countGoodPoints = 0;
  sumMemoryCount = 3;
  looserMessage = false;
  winnerMessage = false;
  numberOfLevel = 1;

  constructor() {
  }

  ngOnInit(): void {
    this.generateCells();
  }

  generateCells() {
      this.basicArray = [];

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

    chooseRandomColorCells() {
        let i = 0;
        while (  i < this.memoryCount) {
            const rowNum = Math.floor(Math.random() * this.basicArray.length);
            console.log(rowNum);
            const colNum = Math.floor(Math.random() * this.basicArray.length);
            console.log(colNum);

            if (this.basicArray[rowNum][colNum].isWanted === true ) {
                continue;
            }
            this.basicArray[rowNum][colNum].setCellWanted(true);
            this.basicArray[rowNum][colNum].setCellVisible(true);
            i++;
        }
        console.log(this.basicArray);
    }

    coverColorCells() {
        for (const row of this.basicArray) {
            for (const item of row) {
                item.setCellVisible(false, 3000);
            }
        }
    }

    statusColor(i: number, j: number): ItemState {
        return this.basicArray[i][j].statusColorItem();
    }

    generateGameBoard() {
        this.looserMessage = false;
        this.winnerMessage = false;
        this.generateCells();

        setTimeout(() => {
            this.chooseRandomColorCells();
            this.coverColorCells();
        }, 1000);
    }

  chooseSpecificCell(i: number, j: number) {
    if (this.basicArray[i][j].isWanted === true) {
      this.basicArray[i][j].setCellVisible(true);
      this.countGoodPoints++;
      if (this.countGoodPoints === this.memoryCount) {
          this.nextLevel();
        }
    }
    else {
        this.whenSomebodyLoses(i, j);
    }
  }

  nextLevel() {
    this.numberOfLevel++;
    switch (this.numberOfLevel) {
        case 2:
          this.memoryCount++;
          this.generateGameBoard();
          break;
  //         break;
  //       case 3:
  //           this.cellCount++;
  //           break;
  //       case 4:
  //         this.memoryCount++;
  //         break;
  //       case 5:
  //           this.memoryCount++;
  //           break;
    }
  }

  whenSomebodyLoses(i: number, j: number){
      this.basicArray[i][j].setCellVisible(true);
      this.countGoodPoints = 0;
      this.looserMessage = true;
      console.log('you lose');
  }




}
