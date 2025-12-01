import request from '@/utils/request'

export function getPost(postId) {
  return request.get('/post', { params: { postId } })
}
export function deletePost(postId) {
  return request.delete('/post', { data: postId })
}