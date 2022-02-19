const SignupPage = require("./Signup.page");

class PortfolioPage extends SignupPage{

    constructor(page){
        super(page);
        this.depositLink ='a:has-text("デポジット")'
        this.withdrawLink = 'a:has-text("引き出す")'
        this.loggedinUser = '#root > div > div > div > div > table > thead > tr:nth-child(1) > th'
        this.amountInput ='input'
        this.withdrawBtn = 'button:has-text("Withdraw")'
        this.depositBtn = 'button:has-text("Deposit")'
        this.transactionFee = '#root > div > div > div > span:nth-child(5)'
        this.total = '#root > div > div > div > div > table > tbody > tr:nth-child(1) > td:nth-child(2)'
    }

    async withdrawMoney(amount){
        await this.page.click(this.withdrawLink)
        await this.page.fill(this.amountInput, amount)
        this.ensureFee(amount)
        await this.page.click(this.withdrawBtn)
    }

    async depositMoney(amount){
        await this.page.click(this.depositLink)
        await this.page.fill(this.amountInput, amount)
        this.ensureFee(amount)
        await this.page.click(this.depositBtn)
    }


    async ensureFee(amount){
        let expectedFee = (amount*.30).toFixed(2)
        let actualFee = await this.page.evaluate(el => el.textContent, await this.page.$(this.transactionFee))
        expect(actualFee).toBe(expectedFee) 
    }

    async getTotal(){
        await this.page.waitForTimeout(10000)
        return (await this.page.evaluate(el => el.textContent, await this.page.$(this.total)))
    }

    async ensureLoggedinUser(){
       await this.page.waitForLoadState('networkidle');
       return await this.page.evaluate(el => el.textContent, await this.page.$(this.loggedinUser))
    }
} module.exports = PortfolioPage;