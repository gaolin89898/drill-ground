import {FileItem} from '@arco-design/web-vue';

export type FileInfo = {
    floderType: string,
    key: string,
    edit:boolean
    uid?: string;
    status?: FileStatus;
    file?: File;
    percent?: number;
    response?: any;
    url?: string;
    name?: string;
    size?:number
}



export type GetUploadIDReq = {
    md5: string;
    size: number;
    path: string;
    total: number;
    type: string
}

export type FileChunkModel = {
    uploadId: string;
    index: string;
    etag: string;
}

export type FileModel = {
    uploadId: string;
    total: number;
    size: number;
    path: string;
    md5: string;
    fileChunkModels: FileChunkModel[] | undefined;
}

export type UploadPartReq = {
    uploadId: string;
    index: string;
    chunk: Blob;
}

export type UploadPartResPro = {
    index: number;
    uucode: string;
    uploadId: string;
}

export type UploadComplete = {
    uploadId: string;
}


export type UploadIdReq = {
    md5: string;
    size: number;
    path: string;
}

export type ChunkList = Chunk[];

export type Chunk = {
    chunk: Blob;
    index: number;
}

export type MessageFile = {
    uucode: string;
    chunkList: ChunkList;
}

export type ChunkMD5 = {
    md5: string;
    index: number;
}

export type ReceiveMessage = {
    type: string;
    data: number | string;
    uucode: string;
}

export type MapMd5FileInfo = {
    md5: string;
    progress: number;
    uuid: string;
    chunkList: ChunkList;
    size: number;
    uploadId?: string;
    uploadedSlice?: number[];
    isPause: boolean;
    path: string;
    speed: number;
    type: string;
}

export type ProgressInfo = {
    uuid: string;
    progress: number;
}

export type ProgressShowInfo = {
    progress: number;
    title: string;
    uuid: string;
}
