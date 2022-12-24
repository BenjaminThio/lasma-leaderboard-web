function hello(req:any, res:any) {
    res.json({
        message: 'Hello World!'
    });
}

export default hello;