import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { MenuModel } from '../../models';
import { MenuService, HeaderService } from '../../services';

@Component({
  selector: 'gate-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  @ViewChild('menuIcon') menuIcon!: ElementRef;
  @Input() itensMenu: MenuModel[] = [];

  destroyed$: Subject<boolean> = new Subject<boolean>();
  hideMenu: boolean = false;
  markMenu: number = 1;

  isActive(item: MenuModel): boolean {
    let subMenuIsActive = item.options?.some(option => option.active)!;
    if (subMenuIsActive)
      item.active = true;

    return (subMenuIsActive || item.active)!
  }

  subMenuIsActive(item: MenuModel): boolean {
    return !!item.options && !!item.options?.length && this.isActive(item);
  }

  constructor(
    private router: Router,
    private menuService: MenuService,
    private headerService: HeaderService,
    // private authTokenService: AuthTokenService,
    ) {
    this.router.events.pipe(takeUntil(this.destroyed$)).subscribe((event) => {
      if (event instanceof NavigationEnd && this.router.routerState.snapshot.url.includes(event.url)) {
        this.activateNavigatedMenuOption(this.itensMenu);
      }
    });
  }

  ngOnInit(): void {
    this.activateNavigatedMenuOption(this.itensMenu);

    this.headerService
      .getTitle()
      .pipe(takeUntil(this.destroyed$))
      .subscribe((value) => {
        this.markMenu = value.menuState!;
      });
  }

  activateNavigatedMenuOption(itemsMenu: MenuModel[]): void {
    itemsMenu.forEach(item => {
      item.active = false;
      if (this.router.routerState.snapshot.url.includes(item.route) && !item.options) {
        item.active = true;
      } else {
        if (item.options && item.options.length)
          this.activateNavigatedMenuOption(item.options)
      }
    });
  }

  sendMenuState() {
    this.hideMenu = !this.hideMenu;
    this.menuService.changeState(this.hideMenu);
  }

  triggerHideMenu() {
    if (!this.hideMenu) {
      this.hideMenu = true;
      this.menuService.changeState(true);
    }
  }

  deactivateMenus(menuList: MenuModel[]): void {
    menuList.forEach((element: any) => {
      element.active = false
      if (element.options && element.options.length)
        element.options.map((option: MenuModel) => option.active = false);
    });
  }

  redirectTo(route: string): void {
    this.router.navigate([route])
  }

  setRedirectURI(redirectUri: string): void {
    window.localStorage.removeItem('redirectPortalURI');
    window.localStorage.setItem('redirectPortalURI', redirectUri);
  }

  searchAdminMenuOption(itensMenu: MenuModel[]): MenuModel {
    return itensMenu.find((item) => {
      return item.route?.includes('admin/user-maintenance');
    })!
  }

  removeAdminOptionsFromMenu(item: MenuModel): void {
    this.itensMenu.splice(this.itensMenu.indexOf(item!), 1);
  }
}
