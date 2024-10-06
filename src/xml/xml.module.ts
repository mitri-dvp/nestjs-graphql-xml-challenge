import { Global, Module } from '@nestjs/common';
import { XmlParserService } from '@src/xml/xml.service';

@Global()
@Module({
  providers: [XmlParserService],
  exports: [XmlParserService],
})
export class XmlParserModule {}
