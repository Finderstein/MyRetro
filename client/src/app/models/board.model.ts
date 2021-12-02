export interface Column {
    _id: string;
    createdByName: string;
    createdByEmail: string;
    title: string;
    color: string;
}

export interface Card {
    _id: string;
    createdByName: string;
    createdByEmail: string;
    parentId: string;
    columnIndex: number;
    text: string;
    pin: boolean;
    likes: number;
}

export interface Comment {
    _id: string;
    createdByName: string;
    createdByEmail: string;
    parentId: string;
    text: string;
}
