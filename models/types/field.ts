export interface IField {
    name: string;
    values: string[];
    type: string;
    trackable: boolean;
    mapPiece: boolean;
    _id: string;
    createdAt: string;
    updatedAt: string;
}

export interface IFieldObject {
    fields: IField[];
    entryIndexes: number[];
    _id: string;
    createdAt: string;
    updatedAt: string;
}