import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { CricketDataService } from './core/services/cricket-data/cricket-data.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { NewUserComponent } from './components/new-user/new-user.component';
import { map } from 'lodash';
import { NewBetComponent } from './components/new-bet/new-bet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'wcup-bet-app';

  users: any[] = [];
  userNames: any[] = [];
  bets: any[] = []
  matches: any[] = [];

  chartOptions: any;

  constructor(private store: AngularFirestore, private readonly cricketDataService: CricketDataService, public dialog: MatDialog) {
    const users = this.store.collection('users').valueChanges({ idField: 'id' }) as Observable<any>;
    users.subscribe((val) => {
      this.setUsers(val);
    });

    const bets = this.store.collection('bets').valueChanges({ idField: 'id' }) as Observable<any>;
    bets.subscribe((val) => {
      this.setBets(val);
    });

    this.cricketDataService.getMatches().subscribe(
      (value) => {
        this.setMatches(value);
      }
    );

    this.chartOptions = {
      exportEnabled: true,
      animationEnabled: true,
      axisY: {
        includeZero: true
      },
      toolTip: {
        shared: true
      },
      legend: {
        cursor: "pointer"
      },
      data: [{
        type: "column",
        name: "Investments",
        showInLegend: true,      
        yValueFormatString: "# Euros",
        dataPoints: [
          { label: "DK",  y: 0 },
          { label: "Kiran", y: 0 },
          { label: "Phani", y: 0 }
        ]
      },
      {
        type: "column",
        name: "Total Returns",
        showInLegend: true,
        yValueFormatString: "# Euros",
        dataPoints: [
          { label: "DK", y: 0 },
          { label: "Kiran", y: 0 },
          { label: "Phani", y: 0 }
        ]
      }]
    };
  }

  setUsers(value: any) {
    this.users = value;
    this.userNames = map(this.users, (obj) => obj.name.toLowerCase());
  }

  setBets(value: any) {
    this.bets = value;
  }

  setMatches(value: any) {
    if (value?.typeMatches) {
      value.typeMatches.forEach((element: any) => {
        if (element.matchType === 'International') {
          const seriesMatches = element.seriesMatches;
          seriesMatches.forEach((seriesMatch: any) => {
            if (seriesMatch.seriesAdWrapper?.seriesId === 6732) {
              const matches = seriesMatch.seriesAdWrapper.matches;
              matches.forEach((match: any) => {
                this.matches.push(match.matchInfo);
              });
            }
          });
        }
      });
    }
  }

  addNewUser() {
    const dialogRef = this.dialog.open(NewUserComponent, {
      width: '250px',
      data: {
        users: this.users
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result && !this.userNames.includes(result.toLowerCase())) {
        const item = {
          name: result,
          betsWon: 0,
          moneyWon: 0
        };
        this.store.collection('users').add(item);
      }
    });
  }

  addNewBet() {
    const dialogRef = this.dialog.open(NewBetComponent, {
      width: '600px',
      data: {
        users: this.userNames,
        matches: this.matches
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result.users.length) {
        this.store.collection('bets').add(result);
      }
    });
  }

}
