import { createConnection } from 'typeorm';
import UserRoutes from './UserRoutes';
import InterviewRoutes from './InterviewRoutes';
import { Error } from '../models/Errors';


export default (app:any) => {

    createConnection().then(async () => {
        
        
        new UserRoutes(app)
        new InterviewRoutes(app)


        app.use((req, res) => {
            res.status(404).json(new Error().err404());
        });
})
}