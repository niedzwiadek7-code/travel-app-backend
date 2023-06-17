import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionController } from './question.controller'
import { QuestionService } from './question.service'
import { AnswerEntity, QuestionEntity } from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([QuestionEntity, AnswerEntity]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
