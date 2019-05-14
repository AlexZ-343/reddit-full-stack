import { Component, OnInit } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sortCategory: MenuItem[];
  activeItem: MenuItem;

  constructor() { }

  ngOnInit() {
    this.sortCategory = [
      {label: 'Hot'},
      {label: 'New'},
      {label: 'Top'},
      {label: 'Rising'},
      {label: 'Controversial'},
    ];

    this.activeItem = this.sortCategory[0];
  }

}
