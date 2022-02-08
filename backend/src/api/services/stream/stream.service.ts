import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StreamCreateDto, StreamUpdateDto } from 'src/api/dtos/stream.dto';
import { Stream, StreamDocument } from 'src/db/schemas/stream.schema';

@Injectable()
export class StreamService {

    constructor(
        @InjectModel(Stream.name)
        private streamModel: Model<StreamDocument>
    ) { }

    async findAll(): Promise<Stream[]> {
        return this.streamModel.find();
    }

    async findOne(id: string): Promise<Stream> {
        return this.streamModel.findById(id);
    }

    async create(stream: StreamCreateDto): Promise<Stream> {
        return new this.streamModel({
            name: stream.name,
            description: stream.description,
            fingerprint: stream.fingerprint,
            key: this.generateKey()
        }).save();
    }
    
    async update(id: string, key: string, stream: StreamUpdateDto): Promise<Stream> {
        if(await this.validate(id, key))
            return this.streamModel.findByIdAndUpdate(id, {
                name: stream.name,
                description: stream.description
            });
    }

    async delete(id: string, key: string): Promise<Stream> {
        if(await this.validate(id, key))
            return this.streamModel.findByIdAndDelete(id);
    }

    async validate(id: string, key: string): Promise<boolean> {
        const stream = await this.streamModel.findById(id).select('key');
        return stream.key === key;
    }

    private generateKey(): string {
        return 'abcdefghijklmnopqrstuvwxyz'.split('').map(() => Math.random().toString(36)[2]).join('');
    }

}
