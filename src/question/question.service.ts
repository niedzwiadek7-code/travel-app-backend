import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Question as QuestionEntity } from '../typeorm'

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(QuestionEntity)
    private readonly questionRepository: Repository<QuestionEntity>,
  ) {}

  getQuestion(id: string) {
    const query = this.questionRepository
      .createQueryBuilder('question')
      .innerJoinAndSelect('question.author', 'questionAuthor')
      .leftJoinAndSelect('question.answers', 'answer')
      .leftJoinAndSelect('answer.author', 'answerAuthor')
      .where('question.id = :id', { id })

    return query.getOne()
  }
}
