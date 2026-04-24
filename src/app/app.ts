import { Component, signal, OnInit } from '@angular/core';
import { FormulaireContact } from './formulaire-contact/formulaire-contact';
import { ListeContacts } from './liste-contacts/liste-contacts';
import { Contact } from './contact.interface';

@Component({
  selector: 'app-root',
  imports: [FormulaireContact, ListeContacts],
  template: `
  <!-- app.component.html -->
<header>
<h1>🔍 Gestionnaire de Contacts</h1>
<span>{{ messageStatut }}</span>
</header>
  <app-formulaire-contact (contactSauvegarde)="ajouterContact($event)" />
  <!-- liste-contacts.component.html -->
  <app-liste-contacts [contacts]="mesContacts" (contactSupprime)="supprimerContact($event)"/>
`,
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('gestion-contacts');
  mesContacts: Contact[] = [];
  ngOnInit(): void {
    this.mesContacts = [
      { nom: 'Ali Benali', email: 'ali@example.com', telephone: '0600000001' },
      { nom: 'Sara Alami', email: 'sara@example.com', telephone: '0600000002' },
    ];
    console.log('AppComponent initialisé avec', this.mesContacts.length, 'contacts');
  }
  ajouterContact(contact: Contact): void {
    //this.mesContacts.push(contact);
    this.mesContacts = [...this.mesContacts, contact];
    console.log('Contact ajouté :', contact);
  }
  // app.component.ts
  supprimerContact(index: number): void {
    this.mesContacts = this.mesContacts.filter((nonutilise, i) => i !== index);
    console.log(`Contact ${index} supprimé. Reste : ${this.mesContacts.length}`);
  }
  get nombreContacts(): number {
    return this.mesContacts.length;
  }
  get messageStatut(): string {
    if (this.mesContacts.length === 0) return 'Carnet vide';
    if (this.mesContacts.length === 1) return '1 contact';
    return `${this.mesContacts.length} contacts`;
  }
}