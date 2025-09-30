import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Role } from "../user.types";

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
    @Prop({required: true})
    fname: string;

    @Prop({required: true})
    lname: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({default: Role.Student})
    role: string;

    @Prop({default: Date.now})
    createdAt: Date;

    @Prop({default: Date.now})
    updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);