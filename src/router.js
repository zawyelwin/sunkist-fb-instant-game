import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Quiz from "./views/Quiz.vue";
import Gender from "./views/Gender.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "*",
            redirect: {
                name: "home"
            }
        },
        {
            path: "/",
            name: "home",
            component: Home
            // redirect: {
            //     name: 'quiz',
            //     params: {
            //             slug: 'mobile-legends'
            //     }
            // }
        },
        {
            path: "/quizzes/:slug/:gender",
            name: "quiz",
            component: Quiz
        },
        {
            path: "/gender/:gender",
            name: "gender",
            component: Gender
        }
    ]
});
