import { Card, Column, Comment } from './board.model';
import { User } from './user.model';

export interface Response {
    message?: string;
    jwt_token?: string;
    user?: User;
}

export interface ColumnsResponse {
    columns: Column[];
}

export interface CardsResponse {
    cards: Card[];
}

export interface CommentsResponse {
    comments: Comment[];
}
