import { AccessService } from './../../../core/services/access/access.service';
import { Component, OnInit } from '@angular/core';
import { AccessResponse } from 'src/app/core/models/access/access-response.model';
import { HeaderService } from 'src/app/core/services';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  accesses!: AccessResponse

  constructor(
    private _header: HeaderService,
    private _access: AccessService
  ) {
    this._header.changeTitle({ title: 'Visão geral' });
  }

  ngOnInit(): void {
    this.getAccesses();
  }


  getAccesses() {
    this._access.getAccesses().subscribe(
      (result: AccessResponse[]) => {
        console.log(result);
      }
    );
  }
}
