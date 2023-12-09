import { Injectable, NotFoundException } from '@nestjs/common';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: '김용식',
    title: '이것은 제목',
    content: '이것은 본문',
    likeCount: 123,
    commentCount: 12343,
  },
  {
    id: 2,
    author: '김용식',
    title: '이것은 제목',
    content: '이것은 본문',
    likeCount: 123,
    commentCount: 12343,
  },
  {
    id: 3,
    author: '김용식',
    title: '이것은 제목',
    content: '이것은 본문',
    likeCount: 123,
    commentCount: 12343,
  },
];
//프로바이더로 사용가능, 의존성
@Injectable()
export class PostsService {
  getAllPosts() {
    return posts;
  }

  getPostById(id: number) {
    console.log(id);
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  createPost(author: string, title: string, content: string) {
    const post = {
      id: posts[posts.length - 1].id + 1,
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    };

    posts = [...posts, post];

    return post;
  }

  updatePost(id: number, author: string, title: string, content: string) {
    const post = posts.find((post) => post.id === +id);

    if (!post) {
      throw new NotFoundException();
    }

    if (author) {
      post.author = author;
    }

    if (title) {
      post.title = title;
    }

    if (content) {
      post.content = content;
    }

    posts = posts.map((prevPost) => (prevPost.id === +id ? post : prevPost));
    return post;
  }

  deletePost(postid: number) {
    const post = posts.filter((post) => post.id === postid);

    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }
}
