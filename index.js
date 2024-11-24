const express = require('express');
const app = express();
const port = 3000
const expressHbs = require('express-handlebars');
const { createPagination } = require('express-handlebars-paginate');

app.use(express.static(__dirname + '/html'));

app.engine('hbs', expressHbs.engine({
    layoutsDir: __dirname + "/views/layouts",
    partialsDir: __dirname + "/views/partials",
    extname: 'hbs',
    defaultLayout: 'layout',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
    },
    helpers: {
        createPagination,
        formatDate: (date) => {
            return date.toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric"
            });
        }
    }
}));

app.set('view engine', 'hbs');

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.use('/blogs', require('./routers/blogRouters'));

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});