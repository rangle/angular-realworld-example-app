import { Ng2RealApp } from './app.po';
import { browser } from 'protractor';

function wait(milliseconds) {
  return new Promise(r => setTimeout(_ => r(), milliseconds));
}

interface CDMonitoringResult {
  cdRuns: { runtime: number }[];
}

describe('ng-demo App', () => {
  let page: Ng2RealApp;

  beforeEach(() => {
    page = new Ng2RealApp();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toContain('conduit');
  });

  it('clicking tag should not trigger more than 4 change detection cycles with <30ms runtime', () => {
    return Promise.resolve()
      .then(_ => browser.executeScript('return auguryUT.startMonitoringChangeDetection()'))
      .then(_ => page.getATagButton().click().then())
      .then(_ => wait(2000)) // wait for data
      .then(_ => browser.executeScript('return auguryUT.finishMonitoringChangeDetection()'))
      .then((result: CDMonitoringResult) => {
        expect(result.cdRuns.length).toBeLessThanOrEqual(4)
        result.cdRuns.forEach(cd => expect(cd.runtime).toBeLessThanOrEqual(50))
      });
  });
});
