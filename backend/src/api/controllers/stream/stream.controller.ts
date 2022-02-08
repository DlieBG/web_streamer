import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { StreamCreateDto, StreamUpdateDto } from 'src/api/dtos/stream.dto';
import { StreamService } from 'src/api/services/stream/stream.service';
import { ViewerService } from 'src/api/services/viewer/viewer.service';
import { Stream } from 'src/db/schemas/stream.schema';

@Controller('stream')
export class StreamController {

    constructor(
        private streamService: StreamService,
        private viewerService: ViewerService
    ) { }

    @Get()
    async findAll(): Promise<Stream[]> {
        return this.streamService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Stream> {
        return this.streamService.findOne(id);
    }

    @Post()
    async create(@Body() stream: StreamCreateDto): Promise<Stream> {
        return this.streamService.create(stream);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Query('key') key: string, @Body() stream: StreamUpdateDto): Promise<Stream> {
        return this.streamService.update(id, key, stream);
    }

    @Delete(':id')
    async delete(@Param('id') id: string, @Query('key') key: string): Promise<Stream> {
        return this.streamService.delete(id, key);
    }

    @Get(':id/validate')
    async validate(@Res({ passthrough: true }) res: Response,  @Param('id') id: string, @Query('key') key: string): Promise<boolean> {
        const status = await this.streamService.validate(id, key);
        
        if(!status)
            res.status(HttpStatus.UNAUTHORIZED);
        
        return status;
    }

    @Get(':id/viewer')
    async viewerPing(@Param('id') id: string, @Query('fingerprint') fingerprint: string = ''): Promise<Stream> {
        this.viewerService.viewerPing(id, fingerprint);
        return this.findOne(id);
    }

}
