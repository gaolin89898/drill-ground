import request from '@/http';

export async function tagList() {
  return request.get('/api/tag/tagList');
}
