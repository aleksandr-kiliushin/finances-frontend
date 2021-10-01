import { Module } from '@nestjs/common'
import { FinanceCategoryTypeService } from './finance-category-type.service'
import { FinanceCategoryTypeController } from './finance-category-type.controller'

@Module({
	controllers: [FinanceCategoryTypeController],
	providers: [FinanceCategoryTypeService],
})
export class FinanceCategoryTypeModule {}

// import { Module } from '@nestjs/common'
// import { TypeOrmModule } from '@nestjs/typeorm'
// import { FinanceCategoryTypeEntity } from './entities/finance-category-type.entity'
// import { FinanceCategoryTypeResolver } from './finance-category-type.resolver'
// import { FinanceCategoryTypeService } from './finance-category-type.service'

// @Module({
// 	exports: [FinanceCategoryTypeService],
// 	imports: [TypeOrmModule.forFeature([FinanceCategoryTypeEntity])],
// 	providers: [FinanceCategoryTypeResolver, FinanceCategoryTypeService],
// })
// export class FinanceCategoryTypeModule {}
