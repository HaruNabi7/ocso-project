import { IsInt, IsNumber, IsOptional, IsString, MaxLength } from "class-validator";

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  productName: string;

  @IsNumber()
  price: number;

  @IsInt()
  countSeal: number;

  @IsOptional()
  provider: { providerId: string } | any;
}