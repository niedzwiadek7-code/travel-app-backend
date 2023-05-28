import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { QuestionController } from './question.controller'
import { QuestionService } from './question.service'
import { Question } from '../typeorm'

@Module({
  imports: [
    TypeOrmModule.forFeature([Question]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
