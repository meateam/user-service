import { Document, Schema, model } from 'mongoose';
export interface IToken {
    id: string;
    token: string;
    expireAt: Date;
}
export const Second = 1000;
export const tokenSchema: Schema = new Schema(
    {
        token: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
            unique: true,
        },
        createdAt: { type: Date, default: Date.now },
        expireAt: { type: Date, default: Date.now },
    },
);

export const tokenModel = model<IToken & Document>('tokens', tokenSchema);
