// contact.interface.ts
export interface Contact {
    nom: string;
    email: string;
    actif: boolean;
    score: number; // 0-20
    role: 'admin' | 'user' | 'guest';
}
