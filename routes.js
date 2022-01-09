const router = require("express").Router();
const { body } = require("express-validator");

const {
    homePage,
    register,
    registerPage,
    login,
    loginPage,
} = require("./controllers/userController");

const ifNotLoggedin = (req, res, next) => {
    if(!req.session.userID){
        return res.redirect('/login');
    }
    next();
}

const ifLoggedin = (req,res,next) => {
    if(req.session.userID){
        return res.redirect('/');
    }
    next();
}

router.get('/', ifNotLoggedin, homePage);

router.get("/login", ifLoggedin, loginPage);
router.post("/login",
ifLoggedin,
    [
        body("_email", "Geçersiz e-posta adresi")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "Parola en az 4 karakter uzunluğunda olmalıdır.")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    login
);

router.get("/signup", ifLoggedin, registerPage);
router.post(
    "/signup",
    ifLoggedin,
    [
        body("_name", "Ad en az 3 karakter uzunluğunda olmalıdır")
            .notEmpty()
            .escape()
            .trim()
            .isLength({ min: 3 }),
        body("_email", "Geçersiz e-posta adresi")
            .notEmpty()
            .escape()
            .trim()
            .isEmail(),
        body("_password", "Parola en az 4 karakter uzunluğunda olmalıdır")
            .notEmpty()
            .trim()
            .isLength({ min: 4 }),
    ],
    register
);

router.get('/logout', (req, res, next) => {
    req.session.destroy((err) => {
        next(err);
    });
    res.redirect('/login');
});

router.get('/home', function(request,response){
    response.render('home')
});

router.get('/anasayfa', function(request,response){
    response.render('anasayfa')
});

module.exports = router;