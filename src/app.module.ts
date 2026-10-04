import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesModule } from './employees/employees.module.js';
import { ProductsModule } from './products/products.module.js';
import { ProvidersModule } from './providers/providers.module.js';
import { ManagersModule } from './managers/managers.module.js';
import { LocationsModule } from './locations/locations.module.js';
import { RegionsModule } from './regions/regions.module.js';
import { AuthModule } from './auth/auth.module.js';
import { JwtModule } from '@nestjs/jwt';
import { JWT_KEY, EXPIRES_IN } from './auth/constans/jwt.constanst.js';


@Module({
  imports: [ JwtModule.register({
    secret: JWT_KEY,
    signOptions: { expiresIn: EXPIRES_IN },
  }),
    EmployeesModule, ProductsModule, TypeOrmModule.forRoot({  
      type: "postgres",
      host: process.env.host,
      port:+(process.env.port ?? 5432),
      username: 'postgres',
      password: "TheBestPasword",
      database: process.env.name,
      entities: [],
      autoLoadEntities: true,
      synchronize: true,
  }), ProvidersModule, ManagersModule, LocationsModule, RegionsModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
