import { Injectable } from '@nestjs/common';
import { XMLParser } from 'fast-xml-parser';

@Injectable()
export class XmlParserService {
  private parser = new XMLParser();

  parse<T>(xml: string): T {
    return this.parser.parse(xml);
  }
}
