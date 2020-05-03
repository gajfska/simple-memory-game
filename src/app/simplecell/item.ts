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


    // if (this.isVisible === true && this.isWanted === true) {
    //   return ItemState.win;
    // }
    // if (this.isVisible === false && this.isWanted === true) {
    //   return ItemState.normal;
    // }
    // if (this.isVisible === true && this.isWanted === false) {
    //   return ItemState.wrong;
    // }
    // else {
    //   return ItemState.normal;
    // }
  }

  setCellVisible(isVisible: boolean) {
    this.isVisible = isVisible;
  }

  setCellWanted(isWanted: boolean) {
    this.isWanted = isWanted;
  }

  // isWanted(): boolean {
  //   return this.isWanted;
  // }

}
