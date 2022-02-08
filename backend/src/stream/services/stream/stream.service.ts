import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StreamDocument } from 'src/db/schemas/stream.schema';
import { Stream } from 'stream';

@Injectable()
export class StreamService {

    constructor(
        @InjectModel(Stream.name)
        private streamModel: Model<StreamDocument>
    ) { }
    
    async validate(id: string, key: string): Promise<boolean> {
        const stream = await this.streamModel.findById(id).select('key');
        return stream.key === key;
    }

    async updateStarted(id: string): Promise<void> {
        return this.streamModel.findByIdAndUpdate(id, { started: new Date() });
    }

    async updateEnded(id: string): Promise<void> {
        return this.streamModel.findByIdAndUpdate(id, { ended: new Date() });
    }

}
