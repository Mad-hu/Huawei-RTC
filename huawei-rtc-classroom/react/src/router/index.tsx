/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-09 17:39:14
 * @LastEditTime: 2021-10-09 18:07:53
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";
import { Classroom } from "../pages/classroom/classroom";
import { Login } from "../pages/login/login";

export const RootRouter = () => {
    return (
        <Router>
            <Route exact path="/" component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/classroom" component={Classroom} />
        </Router>
    )
}
