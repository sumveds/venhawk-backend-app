import { IsString, IsEnum, IsOptional, IsBoolean, IsDateString, ValidateIf, MinLength, MaxLength } from 'class-validator';

export class CreateProjectDto {
  // Page 1 - Project Details
  @IsString()
  @IsEnum(['financial', 'healthcare', 'legal', 'saas', 'technology', 'government'])
  clientIndustry: string;

  @IsString()
  @MinLength(1)
  @MaxLength(500)
  projectTitle: string;

  @IsString()
  @IsEnum(['erp', 'app-upgrades', 'cloud-migration', 'network', 'security', 'collaboration', 'data-analytics', 'disaster-recovery', 'itsm', 'endpoint', 'database', 'virtualization', 'cloud-security', 'other'])
  projectCategory: string;

  @ValidateIf(o => o.projectCategory === 'other')
  @IsString()
  @MinLength(1)
  @MaxLength(500)
  projectCategoryOther?: string;

  @IsString()
  @MinLength(10)
  projectObjective: string;

  @IsString()
  @MinLength(10)
  businessRequirements: string;

  @IsString()
  @IsOptional()
  technicalRequirements?: string;

  // Page 2 - Budget & Timeline
  @IsDateString()
  startDate: string;

  @IsDateString()
  @IsOptional()
  endDate?: string;

  @IsBoolean()
  @IsOptional()
  flexibleDates?: boolean;

  @IsString()
  @IsEnum(['single', 'range'])
  budgetType: string;

  @ValidateIf(o => o.budgetType === 'single')
  @IsString()
  totalBudget?: string;

  @ValidateIf(o => o.budgetType === 'range')
  @IsString()
  minBudget?: string;

  @ValidateIf(o => o.budgetType === 'range')
  @IsString()
  maxBudget?: string;

  // Metadata
  @IsString()
  @IsEnum(['draft', 'submitted'])
  status: string;
}
