export enum ItemState {
  win = 'WIN',
  normal = 'NORMAL',
  wrong = 'WRONG'
}

export class Item {
  isWanted = false;
  isVisible = false;

  constructor(isWanted: boolean, isVisible: boolean) {
    this.isWanted = isWanted;
    this.isVisible = isVisible;
  }

  statusColorItem(): ItemState {

    if (!this.isVisible) {
      return ItemState.normal;
    }
    if (this.isWanted) {
      return ItemState.win;
    }
    else {
      return ItemState.wrong;
    }
  }

  setCellVisible(isVisible: boolean, delay: number = 0) {
    // this.isVisible = isVisible;
      setTimeout(() => {
        this.isVisible = isVisible;
      }, delay);
  }

  setCellWanted(isWanted: boolean) {
    this.isWanted = isWanted;
  }

  // coverSpeciaCells() {
  //   setTimeout(() => {
  //       for (const value of this.isVisible) {
  //           if (this.isVisible === true) {
  //               this.isVisible = false;
  //           }
  //       }
  //   }, 3000);
  // }

  // isWanted(): boolean {
  //   return this.isWanted;
  // }

}
