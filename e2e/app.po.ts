import { browser, element, by } from 'protractor';

export class Ng2RealApp {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('.logo-font')).getText();
  }

  getATagButton() {
    return element(by.css('.sidebar .tag-list .tag-pill'));
  }

}
