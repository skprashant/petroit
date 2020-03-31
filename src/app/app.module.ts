import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

import { HttpClientModule } from "@angular/common/http";
import { FirstPageComponent } from "./components/first-page/first-page.component";
import { GamePageComponent } from "./components/game-page/game-page.component";
import { PopupComponent } from "./components/popup/popup.component";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { from } from "rxjs";

@NgModule({
  declarations: [
    AppComponent,
    FirstPageComponent,
    GamePageComponent,
    PopupComponent
  ],
  entryComponents: [PopupComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
