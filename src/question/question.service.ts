import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { QuestionEntity, UserEntity, AnswerEntity } from '../resources'
import { AnswerDto } from './dto'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
    @InjectRepository(AnswerEntity)
    private readonly answerRepository: Repository<AnswerEntity>,
  ) {}

  getQuestion(id: string) {
    return this.questionRepository.findOne({
      where: {
        id: parseInt(id, 10),
      },
      relations: ['answers', 'author', 'answers.author'],
    })
  }

  async addAnswer(body: AnswerDto, questionId: string, user: UserEntity) {
    const answerObj = new AnswerEntity()
    answerObj.answer = body.answer
    answerObj.questionId = questionId
    answerObj.authorId = user.id.toString()

    await this.answerRepository.save(answerObj)
  }
}
