import {Component, OnInit} from '@angular/core';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AsyncPipe, JsonPipe, RouterLink, RouterOutlet, RouterLinkActive, DashboardComponent,HttpClientModule],
  templateUrl: 'app.component.html'

})
export class AppComponent implements OnInit {
  title = "tesla-configurator";

  constructor(){
  }

  ngOnInit(): void {
  }
}
