import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "src/app/services/api.service";
import { MatDialog } from "@angular/material/dialog";
import { PopupComponent } from "../popup/popup.component";

@Component({
  selector: "app-game-page",
  templateUrl: "./game-page.component.html",
  styleUrls: ["./game-page.component.scss"]
})
export class GamePageComponent implements OnInit {
  @ViewChild("answer", { static: false }) inputRef: ElementRef;

  private invalid: boolean = false;
  private loading: boolean = false;
  private question: string;
  private token: string;
  private questionNumber: number = 1;
  private imgSrc: string[] = [
    "assets/img/correct.png",
    "assets/img/wrong.png",
    "assets/img/congrats.png"
  ];
  private popupMessages: string[] = [
    "Correct! Next Question",
    "Oops! you have to start again",
    "Wohoo! You have won"
  ];

  constructor(
    private routes: Router,
    private api: ApiService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    document.body.style.background = "DodgerBlue";
    this.token = localStorage.getItem("gameToken");
    this.loading = true;
    if (this.token === null) {
      this.close();
    } else {
      this.nextQuestion();
    }
  }

  nextQuestion() {
    this.api.nextQuestion(this.token).subscribe(data => {
      this.loading = false;
      if (
        data.toString().indexOf("Broken Token:") > 1 ||
        data.toString() === "Spoilt scorecard. Please start again."
      ) {
        this.closeDialog(this.popupMessages[1], this.imgSrc[1]);
      } else if (data.toString() === "You have finished") {
        this.closeDialog(this.popupMessages[2], this.imgSrc[2]);
      } else {
        this.dialog.closeAll();
        this.question = "Q" + this.questionNumber++ + ". " + data.toString();
      }
    });
  }

  onSubmit(answer) {
    if (answer === "") {
      this.invalid = true;
      setTimeout(() => {
        this.invalid = false;
      }, 1000);
    } else {
      this.invalid = false;
      this.loading = true;
      this.api.submitAnswer(answer, this.token).subscribe(data => {
        this.inputRef.nativeElement.value = "";
        if (data.toString() !== "pass") {
          this.closeDialog(this.popupMessages[1], this.imgSrc[1]);
        } else {
          this.loading = false;
          this.openDialog(this.popupMessages[0], this.imgSrc[0]);
          setTimeout(() => {
            this.nextQuestion();
          }, 1000);
        }
      });
    }
  }

  close() {
    localStorage.clear();
    this.routes.navigate(["/"]);
  }

  closeDialog(message, imgSrc) {
    this.openDialog(message, imgSrc);
    setTimeout(() => {
      this.dialog.closeAll();
      this.close();
    }, 1000);
  }

  openDialog(message, imgSrc) {
    this.dialog.open(PopupComponent, {
      height: "450px",
      width: "700px",
      disableClose: true,
      data: { text: message, imgSrc: imgSrc }
    });
  }
}
