const Accounts = require('./app/controllers/accounts-ctrl');



module.exports = [
    // Routes for authentication
    {method: 'GET', path: '/', config: Accounts.index},
    {method: 'GET', path: '/signup', config: Accounts.showSignup},
    {method: 'GET', path: '/login', config: Accounts.showLogin},
    {method: 'GET', path: '/logout', config: Accounts.logout},
    {method: 'POST', path: '/signup', config: Accounts.signup},
    {method: 'POST', path: '/login', config: Accounts.login},
    {method: 'GET', path: '/home', config: Accounts.home},

      // XSS using URL parameter
    {
        method: 'GET',
        path: '/url-xss-attack/{user}',
        handler: function (request, h){
            return 'Welcome '+ request.params.user;
        }
    },

    // Route to public images and allow them to be viewed by everybody
    {
        method: 'GET',
        path: '/{param*}',
        handler: {
            directory: {
                path: './public'
            }
        },
        options: {auth: false}
    }
];