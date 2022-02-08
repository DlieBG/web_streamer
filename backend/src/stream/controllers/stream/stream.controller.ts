import { Body, Controller, Get, HttpStatus, Param, Post, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { StreamService } from 'src/stream/services/stream/stream.service';

@Controller('')
export class StreamController {

    constructor(
        private streamService: StreamService
    ) { }

    @Post('publish')
    async onPublish(@Res({ passthrough: true }) res: Response, @Body() body) {
        let id = body.name;
        let key = body.key;

        const status = await this.streamService.validate(id, key);

        if(!status)
            res.status(HttpStatus.UNAUTHORIZED);
        else
            this.streamService.updateStarted(id);

        return status;
    }

    @Post('done')
    async onDone(@Res({ passthrough: true }) res: Response, @Body() body) {
        let id = body.name;
        let key = body.key;

        const status = await this.streamService.validate(id, key);

        if(!status)
            res.status(HttpStatus.UNAUTHORIZED);
        else
            this.streamService.updateEnded(id);

        return status;
    }

}
