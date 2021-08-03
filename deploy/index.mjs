import dotenv from "dotenv";
import { remote } from "webdriverio";
import fs from "fs";
import path from "path";

dotenv.config();

const { STUDIO_USERNAME, STUDIO_PASSWORD, STUDIO_LINK } = process.env;

const project = {};
const projectFolders = fs.readdirSync(path.resolve("projects/test"));
projectFolders.forEach((folder) => {
  const files = fs.readdirSync(path.resolve("projects/test", folder));
  project[folder] = {};

  files.forEach((file) => {
    project[folder][file] = fs.readFileSync(
      path.resolve("projects/test", folder, file),
      "utf-8"
    );
  });
});

let browser;
(async () => {
  browser = await remote({
    capabilities: { browserName: "chrome" },
  });

  const searchUntil = (selector) =>
    browser.waitUntil(
      async () => {
        const elem = await browser.$(selector);

        if (elem.error) {
          return false;
        }

        return elem;
      },
      {
        timeout: 30000,
        interval: 2000,
      }
    );

  await browser.setWindowSize(1536, 731);

  await browser.navigateTo(`${STUDIO_LINK}#/login`);

  const userNameInput = await browser.$("[ng-model=username]");
  await userNameInput.setValue(STUDIO_USERNAME);

  const passwordInput = await browser.$("[ng-model=password]");
  await passwordInput.setValue(STUDIO_PASSWORD);

  const submitButton = await browser.$("button.btn-primary");
  await submitButton.click();

  const buildLink = await browser.waitUntil(
    async () => {
      const elem = await browser.$(
        '[href="#/build/60f66e24b612cc080f173299/design"]'
      );

      if (elem.error) {
        return false;
      }

      return elem;
    },
    {
      timeout: 10000,
      interval: 1000,
    }
  );
  await buildLink.click();

  const codeTab = await searchUntil("label=Code");

  await codeTab.click();

  const setEditorValue = (fileName, value) => {
    const editorEls = document.querySelectorAll(".editorInstance");

    editorEls.forEach((el) => {
      const editor = ace.edit(el);
      const modeID = editor.session.getMode().$id;
      let ext = fileName.replace(/\w+\./, "");

      if (ext === "js") {
        ext = "javascript";
      }

      console.log(editor.getValue());

      if (new RegExp(`${ext}$`).test(modeID)) {
        editor.setValue(value);
      }
    });
  };

  for (let folder of Object.keys(project)) {
    if (folder !== "assets") {
      const editorEl = await searchUntil(`p=${folder}`);
      await editorEl.click();
      await browser.waitUntil(() => true, { timeout: 1000 });

      const files = project[folder];

      for (let file of Object.keys(files)) {
        const tab = await searchUntil(`span=${file}`);
        await tab.click();
        await browser.waitUntil(() => true, { timeout: 1000 });

        await browser.execute(setEditorValue, file, files[file]);
      }
    }
  }
  // await browser.deleteSession()
})().catch((err) => {
  console.error(err);
  return browser.deleteSession();
});
