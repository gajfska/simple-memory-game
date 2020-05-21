import { Component, OnInit } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Field, FieldState} from './field';

@Component({
  selector: 'app-simplecell',
  templateUrl: './simplecell.component.html',
  styleUrls: ['./simplecell.component.css'],
  animations: [
    trigger('divState', [
      state(FieldState.wrong, style({
        'background-color': '#ff686b'
      })),
      state(FieldState.normal, style({
        'background-color': '#a9def9'
      })),
      state(FieldState.win, style({
        'background-color': '#2a9d8f'
      })),
      transition(`${FieldState.normal} => ${FieldState.wrong}` , [
        animate('0.2s')
      ]),
      transition(`${FieldState.normal} <=> ${FieldState.win}`, [
        animate('0.2s')
      ]),
    ]),
  ]
})

export class SimplecellComponent implements OnInit {
  cellCount = 3;
  memoryCount = 3;
  basicArray: Field[][];
  countGoodPoints = 0;
  sumMemoryCount = 0;
  loserMessage = false;
  winnerMessage = false;
  numberOfLevel = 1;
  endLevel = 7;
  countTime = 0;
  myTimer: any;
  word: string;
  motivationMessage = false;
  motivationArray = ['Brawo!', 'Idzie Ci super!', 'Jeszcze trochę!', 'Morowo!', 'Już blisko!', 'Trzymaj tak dalej!', 'Idziesz jak burza!'];

  constructor() {
  }

  ngOnInit(): void {
    this.generateCells();
  }

  generateCells() {
      this.basicArray = [];

      for (let i = 0; i < this.cellCount; i++) {
          const rowArray: Field[] = [];
          for (let j = 0; j < this.cellCount; j++) {
              const item = new Field(false, false);
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
                item.setCellVisible(false, 700);
            }
        }
    }

    statusColor(i: number, j: number): FieldState {
        return this.basicArray[i][j].statusColorItem();
    }

    startGame() {
        this.loserMessage = false;
        this.winnerMessage = false;
        this.motivationMessage = false;
        this.countGoodPoints = 0;
        this.numberOfLevel = 1;
        this.cellCount = 3;
        this.memoryCount = 3;
        this.sumMemoryCount = 0;
        this.countTime = 0;
        this.timer();
        this.generateGameBoard();
    }

    generateGameBoard() {
        this.sumMemoryCount = this.sumMemoryCount + this.memoryCount;
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
      console.log(this.sumMemoryCount);
      if (this.countGoodPoints === this.sumMemoryCount) {
          this.coverColorCells();
          setTimeout(() => {
                this.nextLevel();
            }, 1000);
      }
      console.log(this.numberOfLevel === this.endLevel);
      if (this.numberOfLevel === this.endLevel && this.countGoodPoints === this.sumMemoryCount){
          this.winnerMessage = true;
          clearInterval(this.myTimer);
      }
    }
    else {
        this.whenSomebodyLoses(i, j);
    }
  }

  nextLevel() {
      if (this.numberOfLevel === this.endLevel) {
          return;
      }

      this.numberOfLevel++;
      switch (this.numberOfLevel) {
        case 2:
            this.memoryCount++;
            break;
        case 3:
            this.cellCount++;
            break;
        case 4:
            this.memoryCount++;
            break;
        case 5:
            this.cellCount++;
            break;
        case 6:
            this.memoryCount++;
            break;
        case 7:
            this.memoryCount++;
            break;
    }

      // switch (this.numberOfLevel) {
      //     case 2:
      //     case 4:
      //     case 6:
      //     case 7:
      //         this.memoryCount++;
      //         break;
      //     default:
      //         this.cellCount++;
      //         break;
      // }

      this.generateGameBoard();
      this.motivationSign();
  }

  whenSomebodyLoses(i: number, j: number){
      this.basicArray[i][j].setCellVisible(true);
      this.loserMessage = true;
      clearInterval(this.myTimer);
      console.log('you lose');
  }

  timer() {
     this.myTimer = setInterval(() => {
          this.countTime++;
      }, 1000);
  }

  motivationSign() {
      this.motivationMessage = true;
      this.word = this.motivationArray[Math.floor(Math.random() * this.motivationArray.length)];
  }



}
