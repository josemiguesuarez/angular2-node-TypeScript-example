// Keep the Input import for now, we'll remove it later:
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from './hero.service';
import { Hero } from './hero';
import 'rxjs/add/operator/switchMap';
import { modulePath } from "../global/utils";


@Component({
    moduleId: modulePath(module),
    selector: 'my-hero-detail',
    templateUrl: 'hero-detail.component.html',
})
export class HeroDetailComponent implements OnInit {
    @Input()
    hero: Hero;
    constructor(
        private heroService: HeroService,
        private route: ActivatedRoute,
        private location: Location
    ) { }
    ngOnInit(): void {
        //let id = +this.route.snapshot.params['id'];
        this.route.params
            .switchMap((params: Params) => this.heroService.getHero(+params['id']))
            .subscribe(hero => this.hero = hero);
    }
    goBack(): void {
        this.location.back();
    }


}
