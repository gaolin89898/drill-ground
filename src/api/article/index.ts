import request from '@/http';
import { addArticleTs } from './index.d';

//获取文章列表
export async function articleList() {
  return request.get('/api/article/articleList');
}

//添加文章
export async function addArticle(data: addArticleTs) {
  return request.post('/api/article/addArticle', data);
}
