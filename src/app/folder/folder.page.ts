import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  private id:string;
  private validRoutes: Array<string> = ['n5', 'n4', 'n3', 'n2', 'n1', 'custom'];

  constructor(private activatedRoute: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    // Header or redirect to home
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toLowerCase();
    if (this.validRoutes.includes(this.id)){
      this.folder = this.id.charAt(0).toUpperCase() + this.id.slice(1);
    } else {
      this.router.navigate(['home']);
    }
  }
}
