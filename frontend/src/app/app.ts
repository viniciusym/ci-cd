import { Component, signal, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CatService } from './services/cat';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  public readonly catService = inject(CatService);

  ngOnInit(): void {
    this.catService.fetchHeavyCats();
  }
}
