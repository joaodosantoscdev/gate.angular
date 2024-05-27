import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { HeaderModel, MenuService, HeaderService } from '../../services';

@Component({
  selector: 'gate-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<boolean>();
  titleState: HeaderModel = {title: '', menuState: 0};
  receiveMenuState = false;
  unitUnverifiedTitle = `Você possui unidades inativas em sua empresa.`;

  constructor(
    private menuService: MenuService,
    private headerService: HeaderService,
    // private authTokenService: AuthTokenService,
  ) {}

  ngOnInit(): void {
    this.headerService.getTitle()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(title => {
        this.titleState = title;
      });

    this.menuService.getState()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(value => {
        this.receiveMenuState = value;
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  // logoff(): void {
  //   this.authTokenService.logoff();
  // }

  setRedirectURI(redirectUri: string): void {
    window.localStorage.removeItem('redirectPortalURI');
    window.localStorage.setItem('redirectPortalURI', redirectUri);
  }
}
