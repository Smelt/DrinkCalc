import { DrinkCalcPage } from './app.po';

describe('drink-calc App', () => {
  let page: DrinkCalcPage;

  beforeEach(() => {
    page = new DrinkCalcPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
