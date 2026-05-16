import { Injectable } from '@angular/core';
import { Contact } from './contact.interface';

@Injectable({
  providedIn: 'root',
})
export class ContactService {
  private contacts: Contact[] = [
    { nom: 'Ahmed Benali', email: 'ahmed@ma', actif: true, score: 16, role: 'admin' },
    { nom: 'Sara Alami', email: 'sara@ma', actif: false, score: 8, role: 'user' },
    { nom: 'Omar Tazi', email: 'omar@ma', actif: true, score: 18, role: 'admin' },
    { nom: 'Laila Rami', email: 'laila@ma', actif: true, score: 11, role: 'guest' },
  ];
  getAll(): Contact[] {
    return this.contacts;
  }
  getActifs(): Contact[] {
    return this.contacts.filter(c => c.actif);
  }
  getByRole(role: string): Contact[] {
    return this.contacts.filter(c => c.role === role);
  }
  getScoreMoyen(): number {
    if (this.contacts.length === 0) return 0;
    return Math.round(
      this.contacts.reduce((s, c) => s + c.score, 0) / this.contacts.length
    );
  }
  ajouter(contact: Contact): void {
    this.contacts.push(contact);
  }
  supprimer(email: string): void {
    this.contacts = this.contacts.filter(c => c.email !== email);
  }
  toggleActif(email: string): void {
    const contact = this.contacts.find(c => c.email === email);
    if (contact) contact.actif = !contact.actif;
  }
}
