export interface User {
    id: number;
    name: string;
    email: string;
    role: 'BUYER' | 'SELLER' | 'MANAGER' | 'ADMIN';
    active: boolean;
}
