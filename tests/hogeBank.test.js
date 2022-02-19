const {chromium} = require('playwright');
const BasePage = require('../pageObjects/Base.page');
const SignupPage = require('../pageObjects/Signup.page');
const PortfolioPage = require('../pageObjects/Portfolio.page');

describe('Hoge Bank - User', ()=>{
    let browser,context,page, basePage, signupPage, portfolioPage;

    beforeAll(async()=>{
        browser = await chromium.launch({headless: false});
        context =await browser.newContext({recordVideo:{dir:"./report/recordings"}});
        page = await context.newPage();
        basePage = new BasePage(page);
        signupPage = new SignupPage(page);
        portfolioPage = new PortfolioPage(page);
        await basePage.navigate();
        await basePage.clickToSignup();
    })

    it('should get an error message when signing up with blank username', async() =>{
        await signupPage.signup('','');
        expect(await signupPage.getErrorMessage()).toBe('User name cannot be blank')    
    })

    it('should get an error message when signing up with username with whitespaces', async() =>{
        await signupPage.signup('User Name','');
        expect(await signupPage.getErrorMessage()).toBe('User name cannot contain whitespaces')    
    })

    it('should get an error message when signing up with password less than 8 characters', async() =>{
        await signupPage.signup('Username','pw');
        expect(await signupPage.getErrorMessage()).toBe('Password cannot be less than 8 characters')    
    })

    it('should get an error message when signing up with password more than 32 characters', async() =>{
        await signupPage.signup('Username','thispasswordismorethan32characters');
        expect(await signupPage.getErrorMessage()).toBe('Password cannot be longer than 32 characters')    
    })

    it('should get an error message when signing up with password that does contain numbers', async() =>{
        await signupPage.signup('Username','passwords');
        expect(await signupPage.getErrorMessage()).toBe('Password must contain numbers')    
    })

    it('should get an error message when signing up with password that does contain uppercase letters', async() =>{
        await signupPage.signup('Username','password123');
        expect(await signupPage.getErrorMessage()).toBe('Password must contain uppercase letters')    
    })

    it('should be able to signup successfully', async() =>{
        await signupPage.signup('username','Password123');
        expect(await portfolioPage.ensureLoggedinUser()).toBe('username')  
    })

    it('should be able to withdraw successfully', async() =>{
        await portfolioPage.withdrawMoney('500'); 
        expect(await portfolioPage.getTotal()).toBe('9350.00')
    })

    it('should be able to deposit successfully', async() =>{
        await portfolioPage.depositMoney('100'); 
        expect(await portfolioPage.getTotal()).toBe('9420.00')
    })

    afterAll(async ()=>{
        await context.close();
        await browser.close();
    })
})
