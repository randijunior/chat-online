module.exports =  function(app) {
    app.get('/', (req, res)=> {
        res.json({'doc': "https://chat-online-api.herokuapp.com/api-docs"});
    })
}