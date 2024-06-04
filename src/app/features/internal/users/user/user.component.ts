import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ResidentResponse } from 'src/app/core/models';
import { HeaderService } from 'src/app/core/services';
import { ResidentService } from 'src/app/core/services/resident/resident.service';
import { ACCESSTYPES_OPTIONS } from 'src/app/shared/constants/select-options.const';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  form!: FormGroup;
  options = ACCESSTYPES_OPTIONS;
  userImage: string | null = null;
  residentId: number;


  get Contacts(): FormArray {
    return this.form.get('contacts') as FormArray<FormGroup>;
  }

  constructor(
    private _fb: FormBuilder,
    private _activatedRoute: ActivatedRoute,
    private _residentService: ResidentService,
    private _header: HeaderService
  ) {
    this.initForm();
    this.residentId = +this._activatedRoute.snapshot.params['id'];
    this.getResidentById(this.residentId);
  }

  getResidentById(id: number) {
    this._residentService.getById(id)
      .subscribe((result: ResidentResponse) => {
        this.userImage = result.photoBase64 ? `data:image/jpeg;base64,${result.photoBase64}` : null;
        this.patchResident(result);
        this.form.disable();
    });
  }

  ngOnInit(): void {
    this._header.changeTitle({ title: `Visualizar informações` })
  }

  initForm() {
    this.form = this._fb.group({
      documentNumber: ['', [Validators.required]],
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      type: ['', [Validators.required]],
      placeId: ['', [Validators.required]],
      unitId: ['', [Validators.required]],
      photoBase64: [''],
      contacts: this._fb.array([
        this._fb.group({
          email: ['', [Validators.required]],
          phone: ['', [Validators.required]]
        })
      ]),
      hasToken: [],
      hasPlace: [],
      placeDescription: [],
      placeType: []
    });
  }

  patchResident(resident: ResidentResponse): void {
    this.form.patchValue({
      name: resident.name,
      lastName: resident.lastName,
      birthDate: resident.birthDate,
      documentNumber: resident.documentNumber,
      type: resident.type.toString(),
      placeId: resident.id.toString(),
      unitId: resident.places && resident.places.length ? resident.places[0]?.unitId.toString() : '',
      contacts: [
        {
          email: resident.contacts && resident.contacts.length ? resident.contacts[0].email : 'Não informado',
          phone: resident.contacts && resident.contacts.length ? resident.contacts[0].phone : '000000000'
        }
      ],
      hasToken: resident.token !== '00000000-0000-0000-0000-000000000000',
      hasPlace: resident.places && resident.places.length > 0,
      placeDescription:  resident.places && resident.places.length ? resident.places[0].placename : 'Não possui',
      placeType: resident.places && resident.places.length ? resident.places[0].type : 'Não possui',
    }, { emitEvent: false, onlySelf: true });
  };
}
