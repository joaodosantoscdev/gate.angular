import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from './core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'gate.angular';
  constructor() { }
  ngOnInit(): void { }
}
