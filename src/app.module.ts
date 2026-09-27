import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';
import { ProvidersModule } from './providers/providers.module.js';
import { ManagersModule } from './managers/managers.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RegionsModule } from './regions/regions.module.js';

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
  }), ProvidersModule, ManagersModule, LocationsModule, RegionsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
