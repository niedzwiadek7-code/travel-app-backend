import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionController } from './question.controller'
import { QuestionService } from './question.service'
import { Answer, Question } from '../../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Question, Answer]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
