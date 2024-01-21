import { IsString } from 'class-validator';
import { BaseModel } from 'src/common/entity/base.entity';
import { UsersModel } from 'src/users/entities/users.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PostsModel extends BaseModel {
  //Pk컬럼설정, 고유 값 설정,

  @ManyToOne(() => UsersModel, (user) => user.posts, {
    nullable: false,
  })
  author: UsersModel;

  @Column()
  @IsString({
    message: 'title은 string 타입을 입력해주세요',
  })
  title: string;

  @Column()
  @IsString({
    message: 'content은 string 타입을 입력해주세요',
  })
  content: string;

  @Column()
  likeCount: number;

  @Column()
  commentCount: number;
}
