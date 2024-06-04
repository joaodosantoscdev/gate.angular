import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, map } from 'rxjs';
import { ResidentResponse } from 'src/app/core/models';
import { HeaderService } from 'src/app/core/services';
import { ResidentService } from 'src/app/core/services/resident/resident.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  residents: ResidentResponse[] = [];
  residentsBase: ResidentResponse[] = [];
  form!: FormGroup;

  get SearchControl(): FormControl {
    return this.form.get('search') as FormControl;
  }

  constructor(
    private _residents: ResidentService,
    private _header: HeaderService,
    private _fb: FormBuilder,
    private _router: Router
  ) {
    this._header.changeTitle({ title: 'Confira seus acessantes' });
  }

  ngOnInit(): void {
    this.form = this._fb.group({
      search: [],
    });

    this.getAllResidents();
    this.subscribeToSearchControl();
  }

  getAllResidents() {
    this._residents.getAllResidents()
      .subscribe((residents: ResidentResponse[]) => {

        this.residentsBase = residents;
        this.residents = [...residents];
    });
  }

  subscribeToSearchControl(): void {
    this.SearchControl.valueChanges
      .pipe(
        distinctUntilChanged(),
        debounceTime(500),
        map((value: string) => value.toLowerCase().trim()))
      .subscribe((value: string) => {
        this.residents = this.residentsBase.filter(resident => {
          let fullName = `${resident.name.toLowerCase()} ${resident.lastName.toLowerCase()}`
          let documentNumber = resident.documentNumber.toLowerCase();

          return fullName.includes(value) || documentNumber.includes(value);
        });
    });
  }

  navigateToUser(residentId: number) {
    this._router.navigate(['internal', 'users', residentId])
  }
}


