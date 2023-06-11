import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlanModule } from '@modules/plan/plan.module';
import { UserModule } from '@modules/user/user.module';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AuthModule } from '@modules/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    MikroOrmModule.forRoot(),
    PlanModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
