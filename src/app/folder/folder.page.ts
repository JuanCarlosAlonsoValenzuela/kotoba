import { Observable } from 'rxjs';
import { DatabaseService, Dev } from './../services/database/database.service';
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

  //TODO: Change
  developers: Dev[] = [];
  products: Observable<any[]>;
  developer = {};
  product = {};

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router: Router,
    private db: DatabaseService) { }

  ngOnInit() {
    // Header or redirect to home
    this.id = this.activatedRoute.snapshot.paramMap.get('id').toLowerCase();
    if (this.validRoutes.includes(this.id)){
      this.folder = this.id.charAt(0).toUpperCase() + this.id.slice(1);
    } else {
      this.router.navigate(['home']);
    }

    // TODO: Change
    // Get database state and subscribe
    this.db.getDatabaseState().subscribe(ready => {
      if(ready){
        console.log('The database is ready');
        this.db.getDevs().subscribe( devs => {
          console.log('devs changed: ', devs);
          this.developers = devs;
        });
        this.products = this.db.getProducts();

      }
    })
  }

  addDeveloper() {
    let skills = this.developer['skills'].split(',');
    skills = skills.map(skill => skill.trim());
 
    this.db.addDeveloper(this.developer['name'], skills, this.developer['img'])
    .then(_ => {
      this.developer = {};
    });
  }
 
  addProduct() {
    this.db.addProduct(this.product['name'], this.product['creator'])
    .then(_ => {
      this.product = {};
    });
  }

}
