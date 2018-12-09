import { MyStarTrekPage } from './app.po';

describe('image-import-editor-app App', function() {
  let page: MyStarTrekPage;

  beforeEach(() => {
    page = new MyStarTrekPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    // expect(page.getParagraphText()).toEqual('app works!');
  });
});
