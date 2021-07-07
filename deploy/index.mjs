import dotenv from "dotenv"
import { remote } from "webdriverio";
dotenv.config();

const { STUDIO_USERNAME, STUDIO_PASSWORD, STUDIO_LINK } = process.env;

let browser;
(async () => {
  browser = await remote({
    capabilities: { browserName: "chrome" },
  });

  await browser.navigateTo(`${STUDIO_LINK}#/login`);

  const userNameInput = await browser.$("[ng-model=username]");
  await userNameInput.setValue(STUDIO_USERNAME);

  const passwordInput = await browser.$("[ng-model=password]");
  await passwordInput.setValue(STUDIO_PASSWORD);

  const submitButton = await browser.$("button.btn-primary");
  await submitButton.click();

  // const link = await browser.$('.campaign .name');
  // await link.click();

  // await browser.navigateTo(
  //   `${STUDIO_LINK}#/build/60debff2606883720a514cb5/code`
  // );

  console.log(await browser.getTitle());

  // await browser.deleteSession()
})().catch((err) => {
  console.error(err);
  return browser.deleteSession();
});
