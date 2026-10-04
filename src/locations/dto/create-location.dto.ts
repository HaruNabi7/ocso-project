import { ArrayNotEmpty, IsArray, IsOptional, IsString, MaxLength, IsObject } from "class-validator";
import { Location } from "../entities/location.entity.js";
import { Region } from "../../regions/entities/region.entity.js";

export class CreateLocationDto extends Location {
  @IsString()
  @MaxLength(35)
  declare locationName: string;
  @IsString()
  @MaxLength(160)
  declare locationAddress: string;
  @IsArray()
  @ArrayNotEmpty()
  declare locationLatLng: number[];
  @IsObject()
  @IsOptional()
  declare region: Region;
}