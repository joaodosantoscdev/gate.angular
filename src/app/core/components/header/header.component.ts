import { Component, OnDestroy, OnInit } from '@angular/core';

import { Subject, takeUntil } from 'rxjs';
import { HeaderModel, MenuService, HeaderService } from '../../services';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { ApplicationUser } from '../../models/user/application-user.model';

@Component({
  selector: 'gate-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {

  destroyed$ = new Subject<boolean>();
  titleState: HeaderModel = {title: '', menuState: 0};
  receiveMenuState = false;
  user!: ApplicationUser;

  constructor(
    private menuService: MenuService,
    private headerService: HeaderService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let storagedUser = this.authService.getStoragedUser();
    if (!storagedUser) {
      this.logoff();
    } else {
      this.user = storagedUser;
    }

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

  logoff(): void {
    this.authService.logout();
    this.router.navigate(['login'])
  }

  navigateToFastAccess(): void {
    this.router.navigate(['internal', 'accesses', 'fast-access']);
  }
}
