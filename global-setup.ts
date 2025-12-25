import { Browser, chromium, expect, Page } from "playwright/test";
import "dotenv/config";
import { UserLogin } from "./Pages/Loginpage";
//import user from "./playwright/.auth/user.json" assert { type: "json" };

export default async function globalsetup() {
    const browser: Browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page: Page = await context.newPage();
    //await page.goto(process.env.LoginURL!);
    const login = new UserLogin(page);
    await login.Login("nisha.badal@waterflow.technology", "nisha@98696");

    //   console.log(process.env.username);
    //   console.log(process.env.password);
    await context.storageState({
        path: "./Loginauth/auth.json",
    });
    await browser.close();
}