import { Component, OnInit } from '@angular/core';

import { Hero } from '../heroes/hero';
import { HeroService } from '../heroes/hero.service';
import { modulePath } from '../global/utils';
import * as moment from 'moment';

@Component({
    moduleId: modulePath(module),
    selector: 'my-dashboard',
    templateUrl: 'dashboard.component.html',
})

export class DashboardComponent implements OnInit {

    heroes: Hero[] = [];
    time =  moment().format("LLL");
    constructor(private heroService: HeroService) { }
    ngOnInit(): void {
        this.heroService.getHeroes()
            .then(heroes => this.heroes = heroes.slice(1, 5));
    }
}
