import { Document, Schema, model } from 'mongoose';
export interface IToken {
    id: string;
    token: string;
    expireAt: Date;
}
export const Min = 60;
export const Hour = 60 * Min;
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
        expireAt: { type: Date, default: undefined },
    },
);
tokenSchema.index({ expireAt: 1 }, { expireAfterSeconds: 0 });

export const tokenModel = model<IToken & Document>('tokens', tokenSchema);
