import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
  selector: 'app-new-bet',
  templateUrl: './new-bet.component.html',
  styleUrls: ['./new-bet.component.scss']
})
export class NewBetComponent {

  betData: any;
  matches: any[] = [];
  users: any[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    this.matches = this.data.matches.map((match: any) => {
      return {
        ...match,
        date: moment(match.startDate, 'x').format('LL LT')
      }
    });
    this.users = this.data.users;
    this.betData = {
      title: '',
      match: undefined,
      stake: 2,
      users: this.users,
      poolValue: this.users.length*2
    }
  }

  decrementStake() {
    this.betData.stake = Math.max(2, this.betData.stake-1);
    this.betData.poolValue = this.betData.stake*this.betData.users.length;
  }

  incrementStake() {
    this.betData.stake = Math.min(10, this.betData.stake+1);
    this.betData.poolValue = this.betData.stake*this.betData.users.length;
  }

  onMatchSelect(event: any) {
    this.betData.match = event.value;
  }

  onUsersSelect(event: any) {
    this.betData.poolValue = this.betData.stake*event.value.length;
  }

}
