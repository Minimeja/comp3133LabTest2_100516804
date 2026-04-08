import { Component, computed, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Mission } from '../../models/mission';
import { SpacexService } from '../../services/spacex.service';
import { MissionCard } from '../mission-card/mission-card';

@Component({
  selector: 'app-mission-list',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MissionCard],
  templateUrl: './mission-list.html',
  styleUrl: './mission-list.css'
})
export class MissionList {
  private spacexService = inject(SpacexService);

  missions = signal<Mission[]>([]);
  searchTerm = signal('');
  selectedStatus = signal('all');
  loading = signal(true);
  errorMessage = signal('');

  filteredMissions = computed(() => {
    return this.missions().filter((mission) => {
      const matchesSearch = mission.name
        .toLowerCase()
        .includes(this.searchTerm().toLowerCase());

      const matchesStatus =
        this.selectedStatus() === 'all' ||
        (this.selectedStatus() === 'success' && mission.success === true) ||
        (this.selectedStatus() === 'failed' && mission.success === false) ||
        (this.selectedStatus() === 'unknown' && mission.success === null);

      return matchesSearch && matchesStatus;
    });
  });

  ngOnInit(): void {
    this.loadMissions();
  }

  loadMissions(): void {
    this.spacexService.getMissions().subscribe({
      next: (data) => {
        this.missions.set(data);
        this.loading.set(false);
      },
      error: () => {
        this.errorMessage.set('Failed to load SpaceX missions.');
        this.loading.set(false);
      }
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm.set(value);
  }

  onStatusChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.selectedStatus.set(value);
  }
}