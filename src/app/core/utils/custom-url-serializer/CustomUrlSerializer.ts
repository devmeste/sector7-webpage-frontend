import { DefaultUrlSerializer, UrlSerializer, UrlTree } from '@angular/router';

export class CustomUrlSerializer extends DefaultUrlSerializer implements UrlSerializer {

  override parse(url: string): UrlTree {
    return super.parse(url.toLowerCase());
  }

  override serialize(tree: UrlTree): string {
    return super.serialize(tree);
  }
}
