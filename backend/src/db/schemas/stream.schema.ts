import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type StreamDocument = Stream & Document;

@Schema()
export class Stream {

    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    fingerprint: string;

    @Prop({ select: false })
    key: string;

    @Prop({ select: false })
    viewer: Map<string, Date>;

    @Prop({ default: 0 })
    viewerCount: number;

    @Prop({ default: new Date() })
    created: Date;

    @Prop({ default: undefined })
    started: Date;

    @Prop({ default: undefined })
    ended: Date;

}

export const StreamSchema = SchemaFactory.createForClass(Stream);
