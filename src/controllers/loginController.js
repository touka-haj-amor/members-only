import passport from 'passport';

export const loginGet = (req, res)=>{
    res.render("log-in");
};

export const loginPost = passport.authenticate("local", {successRedirect: "/", failureRedirect: "/log-in"});

export const logout = (req, res, next) =>{
    req.logout(error =>{
        if (error){
            return next(error);
        }
        res.redirect("/");
    });
};
