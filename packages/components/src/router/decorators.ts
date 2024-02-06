export function route(path: string) {
  return function (target: any) {
    const decorators = Reflect.getMetadata('design:decorators', target) || [];
    decorators.push({ path });
    Reflect.defineMetadata('design:decorators', decorators, target);
  }
}