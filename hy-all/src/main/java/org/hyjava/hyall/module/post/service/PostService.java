package org.hyjava.hyall.module.post.service;
import org.hyjava.hyall.common.core.result.Result;


import org.hyjava.hyall.module.post.pojo.Post;
import org.hyjava.hyall.module.post.pojo.dto.PostDTO;
import org.hyjava.hyall.module.post.repository.PostRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PostService implements IPostService{
    @Autowired
    PostRepository postRepository;

    @Override
    public Post addPost(PostDTO post){
        Post nPost = new Post();
        BeanUtils.copyProperties(post,nPost);
        return postRepository.save(nPost);
    }

    @Override
    public void deletePost(Integer PostId){
        postRepository.deleteById(PostId);
    }

    @Override
    public Post updatePost(PostDTO Post){
        Integer postId = Post.getPostId();
        Post post = postRepository.findById(postId).orElseThrow(()->new RuntimeException("要更新的帖子不存在,ID:"+postId));
        BeanUtils.copyProperties(Post,post);
        return postRepository.save(post);
    }

    @Override
    public Post queryPost(Integer postId){
        return postRepository.findById(postId).get();
    }
}
