import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";

@Controller("api")
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get("greet")
  getHello() {
    return this.appService.getHello();
  }

  @Get("/see-off")
  getBye() {
    return this.appService.getBye();
  }
}
