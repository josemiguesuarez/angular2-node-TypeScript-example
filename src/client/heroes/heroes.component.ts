import { Component, OnInit } from '@angular/core';
import { Hero } from './hero';
import { HeroService } from './hero.service';
import { Router } from '@angular/router'

@Component({
    selector: 'my-heroes',
    template: `
      <h2>My Heroes</h2>
      <ul class="heroes">
        <li *ngFor="let hero of heroes"
          [class.selected]="hero === selectedHero"
          (click)="onSelect(hero)">
          <span class="badge">{{hero.id}}</span> {{hero.name}}
        </li>
      </ul>
      <div *ngIf="selectedHero">
  <h2>
    {{selectedHero.name | uppercase}} is my hero
  </h2>
  <my-hero-detail [hero]="selectedHero"></my-hero-detail>
  <button (click)="gotoDetail()">View Details</button>
</div>

    `,
    providers: [HeroService]




})
export class HeroesComponent implements OnInit {
    heroes: Hero[];
    selectedHero: Hero;
    constructor(private router: Router, private heroService: HeroService) {
    }
    getHeroes(): void {
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }
    gotoDetail(): void {
        this.router.navigate(['/detail', this.selectedHero.id]);
    }


    onSelect(hero: Hero): void {
        this.selectedHero = hero
    }
    ngOnInit(): void {
        this.getHeroes();
    }

}
