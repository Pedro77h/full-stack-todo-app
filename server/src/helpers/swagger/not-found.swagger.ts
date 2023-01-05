import { ApiProperty } from '@nestjs/swagger';

export class NotFoundSwagger {
  @ApiProperty()
  statusCode: string;

  @ApiProperty()
  message: string;
  
  @ApiProperty()
  error: string;
}
