const app =require('./src/app')
const { getServerPort } = require('./src/config/env')
const dbConnect = require('./src/config/db.config');
const appRoute = require('./src/routes');
const { errorMiddleWareModule } = require('./src/middlewares');
const PORT = getServerPort() || 8000;
 
app.use('/api/v1/',appRoute.routesRouter)

app.all("*",errorMiddleWareModule.notFound );
app.use(errorMiddleWareModule.errorHandler);

app.listen(PORT,async()=>{
try {
   await dbConnect.mongoConnection();
   console.log(`server running on port ${PORT}`)
} catch (error) {
    console.error(error)
}
}) 
