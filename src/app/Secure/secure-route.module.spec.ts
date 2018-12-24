import { SecureRouteModule } from "./secure-route.module";


describe('SecureRouteModule', () => {
  let secureRouteModule: SecureRouteModule;

  beforeEach(() => {
    secureRouteModule = new SecureRouteModule();
  });

  it('should create an instance', () => {
    expect(secureRouteModule).toBeTruthy();
  });
});
