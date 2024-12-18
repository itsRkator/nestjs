import { Module } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { MessagesController } from './messages.controller';
import { MessagesRepository } from './messages.repository';

@Module({
  imports: [],
  controllers: [MessagesController],
  providers: [MessagesService, MessagesRepository],
  exports: [],
})
export class MessagesModule {}
