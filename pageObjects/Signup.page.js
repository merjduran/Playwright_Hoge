const BasePage = require('./Base.page');

class SignupPage extends BasePage{

    constructor(page){
        super(page);
        this.usernameField ='input >> nth=0';
        this.passwordField = 'input[type="password"]'
        this.signupBtn = 'button:has-text("SIGNUP")'
        this.errorMsgField = 'span'
    }
    async signup(username, password){
        await this.page.fill(this.usernameField, username);
        await this.page.fill(this.passwordField, password);
        await this.page.click(this.signupBtn);
    }
    async getErrorMessage(){
        const errMsg = await this.page.evaluate(el => el.textContent, await this.page.$(this.errorMsgField));
        return errMsg;
    }

} module.exports = SignupPage;