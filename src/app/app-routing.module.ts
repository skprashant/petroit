import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { GamePageComponent } from "./components/game-page/game-page.component";
import { FirstPageComponent } from "./components/first-page/first-page.component";

const routes: Routes = [
  { path: "gameStarted", component: GamePageComponent },
  { path: "letsStart", component: FirstPageComponent },
  { path: "", redirectTo: "/letsStart", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
