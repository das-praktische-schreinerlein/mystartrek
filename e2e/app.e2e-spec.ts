import { MyGeoManagerPage } from './app.po';

describe('image-import-editor-app App', function() {
  let page: MyGeoManagerPage;

  beforeEach(() => {
    page = new MyGeoManagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('app works!');
  });
});
