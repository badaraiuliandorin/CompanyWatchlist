import { CompanyWatchlistPage } from './app.po';

describe('company-watchlist App', function() {
  let page: CompanyWatchlistPage;

  beforeEach(() => {
    page = new CompanyWatchlistPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
