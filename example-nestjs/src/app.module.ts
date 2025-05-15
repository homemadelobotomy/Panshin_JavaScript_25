import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './stocks/posts.module';
import { FileService } from './file.service';

@Module({
  imports: [PostModule],
})
export class AppModule {}
