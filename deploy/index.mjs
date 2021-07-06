import { remote } from "webdriverio";

let browser;
(async () => {
  browser = await remote({
    capabilities: { browserName: "chrome" },
  });

  await browser.navigateTo("");

  const userNameInput = await browser.$("[ng-model=username]");
  await userNameInput.setValue(STUDIO_USERNAME);

  const passwordInput = await browser.$("[ng-model=password]");
  await passwordInput.setValue(STUDIO_PASSWORD);

  const submitButton = await browser.$("button.btn-primary");
  await submitButton.click();

//   const link = await browser.$('[ng-click="selectCampaign(campaign)"]');
//   await link.click();

  await browser.navigateTo(
    "http://studio3.inskinmedia.com/#/build/60debff2606883720a514cb5/code"
  );

  console.log(await browser.getTitle()); // outputs "WebdriverIO - Google Search"

  // await browser.deleteSession()
})().catch((err) => {
  console.error(err);
  return browser.deleteSession();
});
