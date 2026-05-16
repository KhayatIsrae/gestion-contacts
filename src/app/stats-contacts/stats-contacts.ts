// stats-contacts.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.interface';
import { ContactService } from '../contact';

@Component({
  selector: 'app-stats-contacts',
  imports: [CommonModule],
  templateUrl: './stats-contacts.html',
  styleUrl: './stats-contacts.css',
})
export class StatsContacts {

  totalContacts: number = 0;
  totalActifs: number = 0;
  scoreMoyen: number = 0;
  contacts: Contact[] = [];
  // Le MEME service est injecté — même instance singleton
  constructor(private contactService: ContactService) { }
  ngOnInit(): void {
    this.contacts = this.contactService.getAll();
    this.totalContacts = this.contactService.getAll().length;
    this.totalActifs = this.contactService.getActifs().length;
    this.scoreMoyen = this.contactService.getScoreMoyen();
  }
  // @Input() contacts: Contact[] = [];
  // get totalActifs(): number {
  //   return this.contacts.filter(c => c.actif).length;
  // }
  get tauxActivite(): number {
    if (this.totalContacts === 0) return 0;
    return Math.round((this.totalActifs / this.totalContacts) * 100);
  }
  // get scoreMoyen(): number {
  //   if (this.contacts.length === 0) return 0;
  //   const total = this.contacts.reduce((sum, c) => sum + c.score, 0);
  //   return Math.round(total / this.contacts.length);
  // }
  // Couleur dynamique selon le taux d'activité
  get couleurBarre(): string {
    if (this.tauxActivite >= 70) return '#4CAF50';
    if (this.tauxActivite >= 40) return '#FF9800';
    return '#F44336';
  }
}
