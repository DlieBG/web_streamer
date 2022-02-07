export interface Stream {
    _id: string;
    name: string;
    description: string;
    fingerprint: string;
    key: string;
    viewerCount: number;
    created: Date;
    started: Date;
    ended: Date;
}

export interface StreamCreateDto {
    name: string;
    description: string;
    fingerprint: string;
}

export interface StreamUpdateDto {
    name: string;
    description: string;
}
