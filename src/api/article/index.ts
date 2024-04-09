import request from '@/http';

//获取文章列表
export async function articleList() {
  return request.get('/api/article/articleList');
}
