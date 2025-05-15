import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './post.controller';
import { FileService } from 'src/file.service';
import { Posts } from './entities/post.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService,
    {
      provide: FileService,
      useFactory: () =>
        new FileService<Posts[]>('assets/stocks.json'),
    },
  ],
})
export class PostModule{}
