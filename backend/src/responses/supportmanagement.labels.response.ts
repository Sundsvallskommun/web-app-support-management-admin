import ApiResponse from '@interfaces/api-service.interface';
import { IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { LabelInterface, LabelsInterface } from '@interfaces/supportmanagement.labels.interface';

export class LabelsResponse implements ApiResponse<Labels> {
  @ValidateNested()
  @Type(() => Labels)
  data: Labels;
  @IsString()
  message: string;
}

export class Labels implements LabelsInterface {
  @ValidateNested()
  @Type(() => Label)
  labelStructure: Label[];
}

export class Label implements LabelInterface {
  // NOTE: Name will be removed in sm12 and only use resourceName
  @IsString()
  name: string;
  @IsString()
  resourceName: string;
  @IsString()
  classification: string;
  @IsString()
  @IsOptional()
  displayName?: string;
  @IsString()
  @IsOptional()
  resourcePath: string;
  @IsString()
  @IsOptional()
  id: string;
  @ValidateNested()
  @Type(() => Label)
  labels?: Label[];
}
