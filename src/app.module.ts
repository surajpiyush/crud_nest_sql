import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService,ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

  @Module({
    imports: [
      
      TypeOrmModule.forRootAsync({
        imports: [ConfigModule.forRoot({
          isGlobal:true,
           envFilePath : ".local.env",
           //envFilePath:'.prod.env',
        })  ],
        useFactory: (configService: ConfigService) => ({
          type: 'mysql',
          host: configService.get('DB_HOST'),
         // port:+configService.get<number>('DB_PORT'),
          username: configService.get('DB_USERNAME'),
          password: configService.get('DB_PASSWORD'),
          database: configService.get('DB_DATABASE'),
          synchronize: configService.get<boolean>('DB_SYNC'),
          entities:[__dirname+'/**/*.entity{.ts,.js}'],
          logging:true
        }),
        inject: [ConfigService],
      }),
      
      UserModule

    ],
  controllers: [],
  providers: [],
})
export class AppModule {
 
}
