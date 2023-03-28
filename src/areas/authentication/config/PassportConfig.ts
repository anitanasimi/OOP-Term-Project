import passport from "passport";

import PassportStrategy from "C:/Users/melch/Documents/Programming/COMP 2523/OOP-Term-Project/src/interfaces/passportstrategy";


//----------------------------------------
// TODO:                                 |
//----------------------------------------
// 🚀 Configure Passport.js Local Authentication in this file
//    Ensure code is fully typed wherever possible (unless inference can be made)

export default class PassportConfig {
    constructor(strategies: PassportStrategy[]){
        this.addStrategies(strategies);
    }

    private addStrategies(strategies: PassportStrategy[]): void {
        strategies.forEach((passportStrategy: PassportStrategy) => {
            passport.use(passportStrategy.name, passportStrategy.strategy);
        });
    }
}
