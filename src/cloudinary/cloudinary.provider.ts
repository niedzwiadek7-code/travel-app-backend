import { v2 } from 'cloudinary'
import { ConfigModule, ConfigService } from '@nestjs/config'

export const CloudinaryProvider = {
  imports: [ConfigModule],
  inject: [ConfigService],
  provide: 'Cloudinary',
  useFactory: (configService: ConfigService) => v2.config({
    cloud_name: configService.get('CLOUDINARY_CLOUD_NAME'),
    api_key: configService.get('CLOUDINARY_API_KEY'),
    api_secret: configService.get('CLOUDINARY_API_SECRET'),
  }),
}
