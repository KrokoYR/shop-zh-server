import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, Min } from 'class-validator';

export class GetProductsFilterDto {
    @IsOptional()
    @Min(1)
    @ApiPropertyOptional()
    priceFrom: number;

    @IsOptional()
    @Min(1)
    @ApiPropertyOptional()
    priceTo: number;

    @IsOptional()
    @ApiPropertyOptional()
    brand: string;

    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional()
    search: string;
}
