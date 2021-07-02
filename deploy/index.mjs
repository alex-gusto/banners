import { remote } from 'webdriverio'

let browser

;(async () => {
    browser = await remote({
        capabilities: { browserName: 'chrome' }
    })

    await browser.navigateTo('https://www.google.com/ncr')

    const searchInput = await browser.$('input')
    await searchInput.setValue('WebdriverIO')

    console.log(await browser.getTitle()) // outputs "WebdriverIO - Google Search"

    await browser.deleteSession()
})().catch((err) => {
    console.error(err)
    return browser.deleteSession()
})