import { Component, Inject, OnInit } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import { map } from 'lodash';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss']
})
export class NewUserComponent {

  users: any;
  userName: string = '';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { 
    this.users = map(data.users, 'name');
  }

  add() {
    console.log('username:', this.userName);
  }

}
