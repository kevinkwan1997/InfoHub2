import { Routes } from "@angular/router";
import { FullWeatherComponent } from "./full-weather/full-weather.component";
import { NewsComponent } from "./news/news.component";
import { MusicComponent } from "./music/music.component";
import { ClockComponent } from "../../clock/clock.component";
import { TaskListComponent } from "./task-list/task-list.component";
import { AboutComponent } from "./about/about.component";

export const modalRoutes: Routes = [
    { path: 'News', component: NewsComponent, data: {animation: 'default'} },
    { path: 'Music', component: MusicComponent, data: {animation: 'default'} },
    { path: 'Weather', component: FullWeatherComponent, data: {animation: 'default'} },
    { path: 'Clock', component: ClockComponent, data: {animation: 'default'} },
    { path: 'About', component: AboutComponent, data: {animation: 'default'} },
    { path: 'Tasks', component: TaskListComponent, data: {animation: 'default'} },
]