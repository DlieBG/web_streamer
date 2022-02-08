import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CronJob } from 'cron';
import { Model } from 'mongoose';
import { Stream, StreamDocument } from 'src/db/schemas/stream.schema';

@Injectable()
export class ViewerService {

    private cron: CronJob;
    
    constructor(
        @InjectModel(Stream.name)
        private streamModel: Model<StreamDocument>
    ) {
        this.cron = new CronJob('*/10 * * * * *', () => this.schedule());
        this.cron.start();
    }

    private schedule() {
        this.streamModel.find()
        .select('viewers')
        .select('viewerCount')
        .then(
            (streams) => {
                streams.forEach(
                    (stream) => {
                        let now = new Date();

                        if(stream.viewers) {
                            stream.viewers.forEach(
                                (value, key) => {

                                    if(now.getTime() - value.getTime() > 15000) {
                                        stream.viewers.set(key, undefined);
                                    }

                                }
                            );

                            stream.viewerCount = stream.viewers.size;
                        }
                        else {
                            stream.viewerCount = 0;
                        }   

                        stream.save();
                    }
                );
            }
        );
    }

    async viewerPing(id: string, fingerprint: string) {
        let stream = await this.streamModel.findById(id);
        stream.set(`viewers.${fingerprint}`, new Date());
        stream.save();
    }
    
}
