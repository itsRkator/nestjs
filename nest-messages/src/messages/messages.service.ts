import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateMessageDto } from './dto/update-message.dto';
import { MessagesRepository } from './messages.repository';

@Injectable()
export class MessagesService {
  constructor(private readonly messagesRepository: MessagesRepository) {}

  create(createMessageDto: CreateMessageDto) {
    return this.messagesRepository.create(createMessageDto.content);
  }

  findAll() {
    return this.messagesRepository.findAll();
  }

  async findOne(id: string) {
    const message = await this.messagesRepository.findOne(id);

    if (!message) {
      throw new NotFoundException('Message not found!');
    }
    return message;
  }

  update(id: string, updateMessageDto: UpdateMessageDto) {
    return `This action updates a #${id} message`;
  }

  remove(id: string) {
    return `This action removes a #${id} message`;
  }
}
