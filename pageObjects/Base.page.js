class BasePage{

    constructor(page){
        this.page = page;
        this.signupBtn = 'button:has-text("SIGNUP")' ;
    }
    async navigate(){
        await this.page.goto(`https://anylogi-recruitment.web.app/`);
    }

    async clickToSignup(){
        await this.page.click(this.signupBtn);
    }
}module.exports = BasePage; //to make this file accessible to other files