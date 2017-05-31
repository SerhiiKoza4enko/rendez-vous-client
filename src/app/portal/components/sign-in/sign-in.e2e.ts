import { browser, by, element } from 'protractor';

describe('Sign In', () => {

  beforeEach(() => {
    browser.get('/login');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'TutorialJS';
    expect(subject).toEqual(result);
  });

});
