import { Injectable, signal, inject, computed } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

export interface Cat {
  name: string;
  length: string;
  origin: string;
  image_link: string;
  family_friendly: number;
  shedding: number;
  general_health: number;
  playfulness: number;
  children_friendly: number;
  grooming: number;
  intelligence: number;
  other_pets_friendly: number;
  min_weight: number;
  max_weight: number;
  min_life_expectancy: number;
  max_life_expectancy: number;
}

@Injectable({
  providedIn: 'root'
})
export class CatService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://api.api-ninjas.com/v1/cats';
  private readonly apiKey = 'EkZPszRe2UDz2UB9EGqCcbX4koJFszi6HmGGcTnm';

  #cats = signal<Cat[]>([]);
  #loading = signal<boolean>(false);
  #error = signal<string | null>(null);



  public readonly cats = this.#cats.asReadonly();
  public readonly loading = this.#loading.asReadonly();
  public readonly error = this.#error.asReadonly();




  public readonly catCount = computed(() => this.#cats().length);

  public fetchHeavyCats(): void {
    this.#loading.set(true);
    this.#error.set(null);

    const headers = new HttpHeaders({ 'X-Api-Key': this.apiKey });

    const params = new HttpParams().set('min_weight', '15');

    this.http.get<Cat[]>(this.apiUrl, { headers, params }).subscribe({
      next: (data) => {
        this.#cats.set(data);
        this.#loading.set(false);
      },
      error: (err) => {
        this.#error.set('Falha ao carregar os dados dos felinos.');
        this.#loading.set(false);
        console.error(err);
      }
    });
  }
}
