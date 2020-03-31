import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private rootUrl = "http://localhost:1234";

  constructor(private http: HttpClient) {}

  startTest(name: string) {
    const endPoint = "startTest";
    return this.http.get(`${this.rootUrl}/${endPoint}/${name}`);
  }

  nextQuestion(token: string) {
    const endPoint = "nextQuestion";
    return this.http.get(`${this.rootUrl}/${token}/${endPoint}`);
  }

  submitAnswer(answer: string, token: string) {
    const endPoint = "answer";
    return this.http.get(`${this.rootUrl}/${token}/${endPoint}/${answer}`);
  }
}
