import {FileItem} from '@arco-design/web-vue';

export type FileInfo = FileItem & {
    floderType: string,
    key: string,
    edit:boolean
}