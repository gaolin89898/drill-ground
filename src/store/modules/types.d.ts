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
}