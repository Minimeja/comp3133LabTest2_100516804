import { Component } from '@angular/core';
import { MissionList } from './components/mission-list/mission-list';

@Component({
  selector: 'app-root',
  imports: [MissionList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  title = 'lab-test2-spacex';
}