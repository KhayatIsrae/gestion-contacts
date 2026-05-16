import {
  Directive, ElementRef,
  HostListener, Input
} from '@angular/core';
@Directive({
  selector: '[appSurvol]',
})
export class Survol {
  // Paramètre reçu depuis le template
  @Input() appSurvol: string = '#FFFDE7'; // Jaune pâle par défaut
  private couleurOriginale: string = '';
  constructor(private el: ElementRef) { }
  // Événement mouseenter : la souris entre sur l'élément
  @HostListener('mouseenter')
  onMouseEnter(): void {
    console.log(this.appSurvol)
    // Sauvegarder la couleur originale
    this.couleurOriginale =
      this.el.nativeElement.style.backgroundColor;
    // Appliquer la nouvelle couleur
    this.el.nativeElement.style.backgroundColor = this.appSurvol;
    this.el.nativeElement.style.cursor = 'pointer';
  }
  // Événement mouseleave : la souris quitte l'élément
  @HostListener('mouseleave')
  onMouseLeave(): void {
    // Restaurer la couleur originale
    this.el.nativeElement.style.backgroundColor = this.couleurOriginale;
  }
}
