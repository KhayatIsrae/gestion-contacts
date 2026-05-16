// highlight.directive.ts
import {
  Directive, HostBinding,
  HostListener, Input
} from '@angular/core';
@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective {
  
  // @HostBinding lie la classe CSS 'active' à la propriété isActive
  @HostBinding('class.active')

  // @HostBinding lie la classe CSS 'hovered' à isHovered
  @HostBinding('class.hovered')
  isHovered: boolean = false;
  // @HostBinding pour le style inline
  @HostBinding('style.box-shadow')
  get shadow(): string {
    return this.isHovered ? '0 2px 8px rgba(0,0,0,0.2)' : 'none';
  }
  @HostListener('mouseenter')
  onEnter() { this.isHovered = true; }
  @HostListener('mouseleave')
  onLeave() { this.isHovered = false; }
}