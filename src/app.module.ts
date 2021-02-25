import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

// Modules:
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';

// Configs:
import { typeOrmConfig } from './config/typeorm.config';

@Module({
    imports: [TypeOrmModule.forRoot(typeOrmConfig), TasksModule, AuthModule, ProductsModule],
})
export class AppModule {}
