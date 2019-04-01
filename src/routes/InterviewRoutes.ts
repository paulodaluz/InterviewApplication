import { newInterview, editInterview, deleteInterview, searchAllInterview, searchUserInterviews} from "../controller/InterviewController";

const basicAuth = require('../controller/BasicAuth');
const writeAcess = require('../controller/writeAcess')
const readAcess = require('../controller/readAcess')
export default class InterviewRouter {

    _app;

    constructor(app){
        this._app = app
        this.InterviewRouter()
    }

    InterviewRouter(){

        this._app.post("/newInterview", basicAuth, newInterview);
        this._app.put("/editInterview", basicAuth, editInterview)
        this._app.delete("/deleteInterview/:id", basicAuth, deleteInterview );
        this._app.get("/searchAllInterviews", basicAuth, searchAllInterview);
        this._app.get("/searchInterview/:user", basicAuth, searchUserInterviews );

    }
}
