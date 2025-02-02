export interface Task {
    id: number;
    title: string;
    completed: boolean;
}

export interface DecodedToken {
    username: string;
}

export interface FormType {
    username: string;
    password: string;
}