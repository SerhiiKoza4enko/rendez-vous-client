import { browser, by, element } from 'protractor';

describe('Password Reset', () => {

  beforeEach(() => {
    browser.get('/password-reset');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'TutorialJS';
    expect(subject).toEqual(result);
  });

});
