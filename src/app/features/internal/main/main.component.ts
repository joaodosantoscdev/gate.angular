import { Subject, finalize, takeUntil } from 'rxjs';
import { AccessService } from './../../../core/services/access/access.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AccessResponse } from 'src/app/core/models/access/access-response.model';
import { HeaderService } from 'src/app/core/services';
import { AccessType } from 'src/app/shared/enums/access-type.enum';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MoreInfoDialogComponent } from './more-info/more-info.dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  @ViewChild('canvas') canvas!: ElementRef<HTMLCanvasElement>;

  accesses: AccessResponse[] = [];
  accessesBase: AccessResponse[] = [];
  lastAccess!: AccessResponse;
  lastUserImage!: string | null;
  destroyed$ = new Subject<boolean>();
  displayedColumns: string[] = ['id', 'name', 'place', 'level', 'date', 'type', 'options'];
  loading: boolean = false;

  get HasOnlyExits(): boolean {
    return this.accesses && this.accesses.every(access => access.accessType == AccessType.Exit);
  }

  get HasOnlyEntries(): boolean {
    return this.accesses && this.accesses.every(access => access.accessType == AccessType.Entry);
  }

  get HasAll(): boolean {
    return this.accesses && (!this.HasOnlyExits && !this.HasOnlyEntries);
  }

  constructor(
    private _header: HeaderService,
    private _access: AccessService,
    private _dialog: MatDialog
  ) {
    this._header.changeTitle({ title: 'Visão geral' });
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getAccesses();
    }, 1500);
    
    this.loading = true;
  }

  filterAll() {
    this.accesses = [...this.accessesBase];
  }

  filterOnlyEntries() {
    this.accesses = [...this.accessesBase.filter(access => access.accessType == AccessType.Entry)];
  }

  filterOnlyExits() {
    this.accesses = [ ...this.accessesBase.filter(access => access.accessType == AccessType.Exit)];
  }

  getAccesses() {
    this._access.getAccesses()
      .pipe(
        finalize(() => this.loading = false),
        takeUntil(this.destroyed$))
      .subscribe((accesses: AccessResponse[]) => {
        this.accessesBase = accesses;
        this.accesses = [...this.accessesBase];
        if (accesses && accesses.length > 0) {
          this.lastAccess = accesses[0];
          this.lastUserImage = accesses[0].resident.photoBase64 ? `data:image/png;base64,${accesses[0].resident.photoBase64}` : null;
        }
      });
  }

  openMoreInfoDialog(index: number) {
    const dialog = this._dialog.open(MoreInfoDialogComponent, {
      height: '100vh',
      width: '35%',
      position: {right: '0'},
      data: {
        title: '',
        index: this.accesses[index].id
      }
    });

    this.afterCloseDialog(dialog);
  }

  afterCloseDialog(dialog: MatDialogRef<MoreInfoDialogComponent, any>) {
    dialog.afterClosed()
      .pipe(takeUntil(this.destroyed$))
      .subscribe()
  }
}
