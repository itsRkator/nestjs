import { Injectable } from '@nestjs/common';
import { readFile, writeFile } from 'fs/promises';

@Injectable()
export class MessagesRepository {
  async findOne(id: string) {
    const fileContent = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(fileContent || '{}');
    const message = messages[id];

    return message;
  }

  async findAll() {
    const fileContent = await readFile('messages.json', 'utf-8');
    return JSON.parse(fileContent || '{}');
  }

  async create(content: string) {
    const id = Date.now();
    const fileContent = await readFile('messages.json', 'utf-8');
    const messages = JSON.parse(fileContent || '{}');
    messages[id] = { id, content };

    await writeFile('messages.json', JSON.stringify(messages));
    return 'Message Created Successfully!!';
  }
}
