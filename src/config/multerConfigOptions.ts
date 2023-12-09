import { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface'
import * as process from 'process'
import { Request } from 'express'
import { HttpException, HttpStatus } from '@nestjs/common'
import { extname } from 'path'
import { diskStorage } from 'multer'
import * as fs from 'fs'
import { v4 as uuidv4 } from 'uuid'

export const multerConfigOptions: MulterOptions = {
  limits: {
    fileSize: +process.env.MAX_FILE_SIZE || 5242880,
  },
  fileFilter(
    req: Request,
    file: Express.Multer.File,
    done: (error: Error, acceptFile: boolean) => void,
  ) {
    if (file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
      done(null, true)
    } else {
      done(new HttpException(
        `Unsupported file type ${extname(file.originalname)}`,
        HttpStatus.BAD_REQUEST,
      ), false)
    }
  },
  storage: diskStorage({
    destination(
      request: Request,
      file: Express.Multer.File,
      done: (error: Error | null, filename: string) => void,
    ) {
      const uploadPath = process.env.UPLOAD_DIR

      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath)
      }

      done(null, process.env.UPLOAD_DIR)
    },
    filename(
      request: Request,
      file: Express.Multer.File,
      done: (error: Error | null, filename: string) => void,
    ) {
      const filename = `${uuidv4()}${extname(file.originalname)}`
      done(null, filename)
    },
  }),
}
