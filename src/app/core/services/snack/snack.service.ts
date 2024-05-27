import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar } from '@angular/material/snack-bar';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private blurClassName = "blur";
  private rootTag = "app-root";

  constructor(private matSnackBar: MatSnackBar) { }

  private setBlur(): void {
    let element = document.getElementsByTagName(this.rootTag)[0];
    if (element.classList.contains(this.blurClassName))
      return;

    element.classList.add(this.blurClassName);
  }

  private removeBlur(): void {
    let element = document.getElementsByTagName(this.rootTag)[0];
    if (!element.classList.contains(this.blurClassName))
      return;

    element.classList.remove(this.blurClassName);
  }

  private setSnackBarSettings(snack: MatSnackBarRef<TextOnlySnackBar>, blurBehavior: boolean = true): void {
    snack.afterOpened().subscribe( _ => {
      if (blurBehavior)
        this.setBlur();
    });
    snack.afterDismissed().subscribe( _ => {
      if (blurBehavior)
        this.removeBlur();
    });
  }

  showCustom(message: string, action: string, duration?: number, hPosition?: any, vPosition? : any, className?: any) {
    let snack = this.matSnackBar.open(message, action ? action : 'Fechar X', {
      duration: duration ?? 5000,
      horizontalPosition: hPosition ? hPosition : 'center',
      verticalPosition: vPosition ? vPosition : 'top',
      panelClass: className
    });
    this.setSnackBarSettings(snack);
  }

   showSuccess(message: string, action?: string) {
    let snack = this.matSnackBar.open(message, action ? action : 'Fechar X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-success']
    });
    this.setSnackBarSettings(snack);
  }

  showInfo(message: string, action?: string) {
    let snack = this.matSnackBar.open(message, action ? action : 'Fechar X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-info']
    });
    this.setSnackBarSettings(snack);
  }

  showWarning(message: string, action?: string) {
    let snack = this.matSnackBar.open(message, action ? action : 'Fechar X', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-warning']
    });
    this.setSnackBarSettings(snack);
  }

  showError(message: string, action?: string) {
    let snack = this.matSnackBar.open(message, action ? action : 'Fechar X', {
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: ['snackbar-error']
    });
    this.setSnackBarSettings(snack);
  }
}
