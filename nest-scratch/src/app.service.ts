import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  getHello() {
    return "Hello there!!";
  }

  getBye() {
    return "Bye there!";
  }
}
