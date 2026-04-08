import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Mission } from '../../models/mission';

@Component({
  selector: 'app-mission-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mission-card.html',
  styleUrl: './mission-card.css'
})
export class MissionCard {
  @Input() mission!: Mission;
}