import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { PersonasComponent } from './componentes/personas/personas.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanetasComponent } from './componentes/planetas/planetas.component';

const routes : Routes = [
  {
    path : "", redirectTo: "/personas", pathMatch: "full"
  },
  {
    path : "personas", component: PersonasComponent
  },
  {
    path : "planetas", component: PlanetasComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    PersonasComponent,
    PlanetasComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
