import request from '@/http';

//获取分类列表
export async function classificationList(data: {
  classificationName?: string;
}) {
  return request.get('/api/classification/classificationList', {
    params: data,
  });
}
//获取单个分类
export async function classificationOne(id: string) {
  return request.get(`/api/classification/classificationList/${id}`);
}
//添加分类
export async function addClassification(data: {
  classificationName: string;
  descoriber?: string;
  icon?: string;
}) {
  return request.post('/api/classification/addclassification', data);
}

//编辑分类
export async function editClassification(data: {
  _id: string;
  classificationName: string;
  descoriber?: string;
  icon?: string;
}) {
  return request.post('/api/classification/editclassification', data);
}

//删除分类
export async function deleteClassification(id: string) {
  return request.delete(`/api/classification/deleteclassification/${id}`);
}
