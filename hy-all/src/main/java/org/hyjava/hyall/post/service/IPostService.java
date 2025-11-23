package org.hyjava.hyall.post.service;

import org.hyjava.hyall.post.pojo.Post;
import org.hyjava.hyall.post.pojo.dto.PostDTO;
import org.springframework.stereotype.Service;

@Service
public interface IPostService {
    public Post queryPost(Integer postId);
    public void deletePost(Integer postId);
    public Post updatePost(PostDTO post);
    public Post addPost(PostDTO post);
}
