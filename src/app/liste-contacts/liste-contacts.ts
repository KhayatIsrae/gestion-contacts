// liste-contacts.ts
import { Component, Input, EventEmitter, Output, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.interface';
import { FormsModule } from '@angular/forms'; //active ngmodel
import { ContactService } from '../contact';
import { Survol } from '../survol';
import { InitialesPipe } from '../initiales-pipe';
import { HighlightDirective } from '../hilight';
import { MentionPipe } from '../mention-pipe';


@Component({
  selector: 'app-liste-contacts',
  imports: [CommonModule, FormsModule, Survol, InitialesPipe, HighlightDirective, MentionPipe],
  templateUrl: './liste-contacts.html',
  styleUrl: './liste-contacts.css',
})
export class ListeContacts implements OnDestroy, OnChanges {
  @Input() contacts: Contact[] = [];
  nombreAjouts: number = 0;
  dateChargement: Date = new Date();
  recherche: string = '';
  constructor(private contactService: ContactService) { }

  filtreActif: boolean | null = null;

  @Output() contactSupprime = new EventEmitter<string>();
  supprimer(email: string): void {
    if (confirm('Confirmer la suppression ?')) {
      this.contactSupprime.emit(email);
    }
  }

  get contactsFiltres(): Contact[] {
    // get signifie que: contactsFiltres se comporte comme une variable
    //mais elle est calculée à chaque fois.
    let contactsF1: Contact[];
    if (this.filtreActif === null) contactsF1 = this.contacts;
    else contactsF1 = this.contacts.filter(c => c.actif === this.filtreActif);
    if (!this.recherche.trim()) return contactsF1;
    const terme = this.recherche.toLowerCase();
    return contactsF1.filter(c =>
      c.nom.toLowerCase().includes(terme) ||
      c.email.toLowerCase().includes(terme)
    );
  }

  // ngOnDestroy : libérer les ressources
  ngOnDestroy(): void {
    console.log('[3] ngOnDestroy() appelé — nettoyage');
  }
  ngOnChanges(changes: SimpleChanges): void {
    //ici onChange est appele uniquement une seule fois meme si on ajoute
    //car le tableau contacts ne change pas de reference on fait just push
    if (changes['contacts']) {
      const avant = changes['contacts'].previousValue;
      const apres = changes['contacts'].currentValue;
      const premier = changes['contacts'].firstChange;
      console.log('ngOnChanges() appelé');
      console.log(' Premier appel ?', premier);
      console.log(' Avant :', avant?.length ?? 0, 'contact(s)');
      console.log(' Après :', apres?.length ?? 0, 'contact(s)');
      if (!premier) this.nombreAjouts++;
    }
  }
}
