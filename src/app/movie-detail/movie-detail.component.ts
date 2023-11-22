import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-movie-detail',
  templateUrl: './movie-detail.component.html',
  styleUrl: './movie-detail.component.scss'
})
export class MovieDetailComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: {
    title: string,
    content: string,
  }) { }
  ngOnInit(): void {
  }
}
