export declare class User {
    save(): void;
    id: number;
    username: string;
    authentification: boolean;
    imageUrl: string;
    twoFactorAuthSecret?: string;
    twoFactorEnabled: boolean;
    chatMessages: any;
    messages: any;
}
