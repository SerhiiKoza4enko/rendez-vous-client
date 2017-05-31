import { browser, by, element } from 'protractor';

describe('Sign Up', () => {

  beforeEach(() => {
    browser.get('/join');
  });


  it('should have a title', () => {
    let subject = browser.getTitle();
    let result  = 'TutorialJS';
    expect(subject).toEqual(result);
  });

});
