import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mention',
})
export class MentionPipe implements PipeTransform {
  transform(score: number): string {
    if (score >= 18) return '📈 Félicité';
    if (score >= 16) return '📈 Très Bien';
    if (score >= 14) return '📈 Bien';
    if (score >= 10) return '✅Passable';
    return '❌ Ajourné';
  }
}

