/*
 * @Author: Yandong Hu
 * @github: https://github.com/Mad-hu
 * @Date: 2021-10-09 17:39:14
 * @LastEditTime: 2021-10-20 15:50:48
 * @LastEditors: Yandong Hu
 * @Description: 
 */
import {
    HashRouter as Router,
    Route
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
