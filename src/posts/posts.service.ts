import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/posts.entity';
import { InjectRepository } from '@nestjs/typeorm';

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
  //PostsModel을 다루는 레포지토리 주입 제너릭 타입에

  constructor(
    //의존성 주입 정의 (PostsModel)
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  async getAllPosts() {
    return this.postsRepository.find();
  }

  async getPostById(id: number) {
    const post = await this.postsRepository.findOne({
      where: {
        id,
      },
    });

    console.log(post);
    if (!post) {
      throw new NotFoundException();
    }
    return post;
  }

  async createPost(author: string, title: string, content: string) {
    // create => 저장할 객체를 생성한다.
    // save => 객체를 저장한다 , create메서드에서 생성한 객체로

    const post = this.postsRepository.create({
      author,
      title,
      content,
      likeCount: 0,
      commentCount: 0,
    });

    const newPost = await this.postsRepository.save(post);

    return newPost;
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
