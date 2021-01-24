import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  slug = this.route.snapshot.params['slug'];
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {}
}
