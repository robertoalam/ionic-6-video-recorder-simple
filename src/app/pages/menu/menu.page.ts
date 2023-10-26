import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage  {

  constructor() { }

  paginas:any = [
    {title:'Awesome',icone:'calendar-number-outline',rota:'/awesome'},
    {title:'Navegador',icone:'create-outline',rota:'/navigator'},
    {title:'Capacitor',icone:'construct-outline',rota:'/capacitor'},
  ];
}
