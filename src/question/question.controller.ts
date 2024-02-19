import {
  Body, Controller, Get, Param, Post, UseGuards,
} from '@nestjs/common'
import { QuestionService } from './question.service'
import { JwtGuard } from '../auth/guard'
import { AnswerDto } from './dto'
import { GetUser } from '../auth/decorator'
import { UserEntity } from '../resources'

@Controller('question')
export class QuestionController {
  constructor(
    private readonly questionService: QuestionService,
  ) {}

  @Get(':id')
  get(@Param('id') id: string) {
    return this.questionService.getQuestion(id)
  }

  @UseGuards(JwtGuard)
  @Post('answer/:id')
  createAnswer(
  @Body() body: AnswerDto,
    @GetUser() user: UserEntity,
    @Param('id') id: string,
  ) {
    return this.questionService.addAnswer(body, id, user)
  }
}
