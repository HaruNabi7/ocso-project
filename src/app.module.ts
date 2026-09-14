import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';

@Module({
  imports: [EmployeesModule, ProductsModule, TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.host,
      port:+(process.env.port ?? 5432),
      username: 'postgres',
      password: "TheBestPasword",
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
