import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  createMessage(@Body() createMessageDto: CreateMessageDto) {
    console.log(createMessageDto);
    return this.messagesService.create(createMessageDto);
  }

  @Get()
  listMessages() {
    return this.messagesService.findAll();
  }

  @Get(':id')
  getMessage(@Param('id') id: string) {
    return this.messagesService.findOne(id);
  }

  @Patch(':id')
  updateMessage(
    @Param('id') id: string,
    @Body() updateMessageDto: UpdateMessageDto,
  ) {
    return this.messagesService.update(id, updateMessageDto);
  }

  @Delete(':id')
  deleteMessage(@Param('id') id: string) {
    return this.messagesService.remove(id);
  }
}
