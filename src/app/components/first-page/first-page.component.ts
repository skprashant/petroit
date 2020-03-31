import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-first-page",
  templateUrl: "./first-page.component.html",
  styleUrls: ["./first-page.component.scss"]
})
export class FirstPageComponent implements OnInit {
  private loading: boolean = false;
  private invalid: boolean = false;

  ngOnInit(): void {
    document.body.style.background = "goldenrod";
  }
  constructor(private api: ApiService, private router: Router) {}

  startTest(name) {
    if (name === "") {
      this.invalid = true;
      setTimeout(() => {
        this.invalid = false;
      }, 1000);
    } else {
      this.invalid = false;
      this.loading = true;
      this.api.startTest(name).subscribe(data => {
        console.log(data);
        var index = data.toString().indexOf(":");
        var token = data.toString().slice(index + 2);
        localStorage.setItem("gameToken", token);
        this.router.navigate(["/gameStarted"]);
      });
    }
  }

  onSubmit(value) {
    this.startTest(value);
  }
}
