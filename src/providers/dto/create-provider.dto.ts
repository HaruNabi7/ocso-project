import { IsEmail, IsOptional, IsString, MaxLength } from "class-validator";
import { Provider } from "../entities/provider.entity.js";


export class CreateProviderDto {
  @IsString()
  @MaxLength(100)
  declare providerName: string;

  @IsEmail()
  @IsString()
  declare providerEmail: string;

  @IsString()
  @MaxLength(15)
  declare providerPhoneNumber: string;
}