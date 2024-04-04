import request from '@/http';

//获取标签列表
export async function tagList(data: { tagName?: string }) {
  return request.get('/api/tag/tagList', { params: data });
}
//获取单个标签
export async function tagOne(id: string) {
  return request.get(`/api/tag/tagList/${id}`);
}
//添加标签
export async function addTag(data: {
  tagName: string;
  descoriber?: string;
  icon?: string;
}) {
  return request.post('/api/tag/addTag', data);
}

//编辑标签
export async function editTag(data: {
  _id: string;
  tagName: string;
  descoriber?: string;
  icon?: string;
}) {
  return request.post('/api/tag/editTag', data);
}

//删除标签
export async function deleteTag(id: string) {
  return request.delete(`/api/tag/deleteTag/${id}`);
}
