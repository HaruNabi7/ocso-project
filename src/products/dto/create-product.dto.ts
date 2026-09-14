import {IsInt, IsNumber, IsOptional, IsString, IsUUID, MaxLength } from "class-validator";
import { isFloat16Array } from "util/types";

export class CreateProductDto {
    @IsString()
    @IsUUID("4")
    @IsOptional()
    producId: string;
    @IsString()
    @MaxLength(40)
    productName: string;
    @IsNumber()
    price: number;
    @IsInt()
    countSeal: number;
    @IsString()
    @IsUUID("4")
    provider: string;
}
