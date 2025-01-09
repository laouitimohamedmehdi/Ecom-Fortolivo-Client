import { Component, OnInit } from '@angular/core';
import { BreadcrumbComponent, BreadcrumbService } from 'xng-breadcrumb';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-section-header',
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent],
  templateUrl: './section-header.component.html',
  styleUrl: './section-header.component.scss'
})
export class SectionHeaderComponent implements OnInit {

  constructor(private bcService: BreadcrumbService) { }
  breadcurmb$: Observable<any[]>;
  ngOnInit(): void {
    this.breadcurmb$ = this.bcService.breadcrumbs$;

  }
}
