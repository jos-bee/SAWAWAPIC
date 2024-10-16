import { Component, OnInit } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

interface Post {
  id: number;
  title: string;
  body: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, CommonModule],
  template: `
    <h1>Posts from JSONPlaceholder API</h1>
    <ul>
      <li *ngFor="let post of posts">
        <h3>{{ post.title }}</h3>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  `,
})
export class App implements OnInit {
  posts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get<Post[]>('https://jsonplaceholder.typicode.com/posts')
      .subscribe(
        (data) => {
          this.posts = data.slice(0, 10); // Limit to first 10 posts
        },
        (error) => {
          console.error('Error fetching posts:', error);
        }
      );
  }
}

bootstrapApplication(App);