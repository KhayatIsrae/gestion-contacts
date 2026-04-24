// liste-contacts.ts
import { Component, Input, EventEmitter, Output, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Contact } from '../contact.interface';
import { FormsModule } from '@angular/forms'; //active ngmodel


@Component({
  selector: 'app-liste-contacts',
  imports: [CommonModule, FormsModule],
  templateUrl: './liste-contacts.html',
  styleUrl: './liste-contacts.css',
})
export class ListeContacts implements OnInit, OnDestroy, OnChanges {
  @Input() contacts: Contact[] = [];
  @Output() contactSupprime = new EventEmitter<number>();
  supprimer(index: number): void {
    if (confirm('Confirmer la suppression ?')) {
      this.contactSupprime.emit(index);
    }
  }
  nombreAjouts: number = 0;
  dateChargement: string = '';
  recherche: string = '';
  get contactsFiltres(): Contact[] {
    // get signifie que: contactsFiltres se comporte comme une variable
    //mais elle est calculée à chaque fois.
    if (!this.recherche.trim()) return this.contacts;
    const terme = this.recherche.toLowerCase();
    return this.contacts.filter(c =>
      c.nom.toLowerCase().includes(terme) ||
      c.email.toLowerCase().includes(terme)
    );
  }
  constructor() {
    console.log('[1] constructor() appelé');
    // NE PAS accéder aux @Input() ici - ils ne sont pas encore remplis !
  }
  // ngOnInit : tout le reste de l'initialisation
  ngOnInit(): void {
    console.log('[2] ngOnInit() appelé');
    console.log(` Contacts reçus : ${this.contacts.length}`);
    // Enregistrer l'heure de chargement
    this.dateChargement = new Date().toLocaleTimeString('fr-FR');
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
