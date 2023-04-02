import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { AuthenticationService } from "../services";
import PassportStrategy from "../../../interfaces/passportstrategy";

const authServ = new AuthenticationService;

//LocalStrategy is a class
const localLogin = new LocalStrategy(
  {
    //here, you are renaming usernameField as email and passwordField as password
    //that's why down below, you are able to then use email and password as variables
    usernameField: "email",
    passwordField: "password",
  },
  //this overwrites the normal functioning of LocalStrategy
  //here, req.body.email is passed into email. The same is done for password.
  //by default though, local uses usernames. Thus, you need to feed a specific function into user in order to correctly format it for usage. That's what the getUserByEmailAndPassword() is for.
  async (email, password, done) => {
    const user = await authServ.getUserByEmailAndPassword(email, password);
    //async await used because of how prisma stuff functions?
    
    return user
      ? done(null, user)
      : done(null, false, {
        message: "Your login details are not valid. Please try again."
      })
  }
);

//start thinking about this now
passport.serializeUser(function (user: Express.User, done: (err: any, email?: string) => void) {
  done(null, (user as any).email);
});
//easiest way to figure out how to type the function is via ctrl + click

passport.deserializeUser(function (email: string, done: (err: any, user?: Express.User | false | null) => void) {
  let user = authServ.findUserByEmail(email);
  if (user) {
    done(null, user);
  } else {
    done({ message: "User not found" }, null);
  }
});

const passportLocalStrategy: PassportStrategy = {
  name: 'local',
  strategy: localLogin,
};
//you export passportLocalStrategy so that you can import it into passportMiddleware.ts
//from inside there, you need to add passportLocalStrategy into passportConfig.addStrategies()
//also to note: github and basically every other login system will give you the user id, so deserializedUser basically always works
export default passportLocalStrategy;

//module.exports = passport.use(localLogin)