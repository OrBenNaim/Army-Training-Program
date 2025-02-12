export interface Task {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    userId: number;
    createdAt: Date
}

export interface DecodedToken {
    username: string;
}

export interface FormType {
    username: string;
    password: string;
}