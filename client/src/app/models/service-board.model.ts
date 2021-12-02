export interface ServiceColumn {
    _id: string;
    createdByName: string;
    createdByEmail: string;
    title: string;
    color: string;
    cards: ServiceCard[];
}

export interface ServiceCard {
    _id: string;
    createdByName: string;
    createdByEmail: string;
    parentId: string;
    columnIndex: number;
    text: string;
    pin: boolean;
    likes: number;
    comments: ServiceComment[];
}

export interface ServiceComment {
    _id: string;
    createdByName: string;
    createdByEmail: string;
    parentId: string;
    text: string;
}
