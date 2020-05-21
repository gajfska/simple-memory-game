export enum FieldState {
  win = 'WIN',
  normal = 'NORMAL',
  wrong = 'WRONG'
}

export class Field {
  isWanted = false;
  isVisible = false;

  constructor(isWanted: boolean, isVisible: boolean) {
    this.isWanted = isWanted;
    this.isVisible = isVisible;
  }

  statusColorItem(): FieldState {

    if (!this.isVisible) {
      return FieldState.normal;
    }
    if (this.isWanted) {
      return FieldState.win;
    }
    else {
      return FieldState.wrong;
    }
  }

  setCellVisible(isVisible: boolean, delay: number = 0) {
      setTimeout(() => {
        this.isVisible = isVisible;
      }, delay);
  }

  setCellWanted(isWanted: boolean) {
    this.isWanted = isWanted;
  }

}
