import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { CatService } from './services/cat';
import { signal } from '@angular/core';

describe('App', () => {





  //MOCK DO SERVICE
  const catServiceMock = {
    cats: signal([{ name: 'Gato Gigante', origin: 'AAAAAAAA', min_weight: 15, image_link: '' }]),
    loading: signal(false),
    error: signal(null),
    // mock de uma funcao, com o fn e possivel acessar os parametros que a funcao foi chamada, simular um retorno..
    fetchHeavyCats: vi.fn()
  };





  //SETUP execultado antes de cada teste(cada 'it')
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      //import do componente que quer testar
      imports: [App],
      // injetar o mock do service(provide=nome do mock original, useValue=mome do service mockado)
      providers: [
        { provide: CatService, useValue: catServiceMock }
      ]
    }).compileComponents();

    catServiceMock.fetchHeavyCats.mockClear();
    catServiceMock.cats.set([
      { name: 'Gato Gigante', origin: 'AAAAAAAA', min_weight: 15, image_link: '' }
    ]);
  });






  it('should create the app', () => {
    // dentro de cada teste criar uma fixture do componente a ser testado
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });





  it('should call fetchHeavyCats on init', () => {
    const fixture = TestBed.createComponent(App);

    //atualizar o componente
    fixture.detectChanges();

    //teste que vai ser realizado
    expect(catServiceMock.fetchHeavyCats).toHaveBeenCalled();
  });





  it('should render the cat name from mock', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    //teste do texto de um componente html
    expect(compiled.querySelector('.cat-name')?.textContent).toContain('Gato Gigante');
  });







  it('deve exibir mensagem de "Nenhum gato encontrado" quando a lista estiver vazia', () => {
    const fixture = TestBed.createComponent(App);

    //alterar os dados do mock, para simular o retorno do service qundo e vazio
    catServiceMock.fetchHeavyCats.mockReturnValue([])
    catServiceMock.cats.set([]);

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const emptyMessage = compiled.querySelector('.empty-state');

    expect(emptyMessage).toBeTruthy();
    expect(emptyMessage?.textContent).toContain('Nenhum gato encontrado');

    const catCards = compiled.querySelectorAll('.cat-card');
    expect(catCards.length).toBe(0);
  });






});

