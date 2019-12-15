import { Product } from 'shared/models/product';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product) {
    return this.db.list('/products').push(product);
  }

  update(id, product) {
    return this.db.object('/products/' + id).update(product);
  }

  getAll(): Observable<Product[]> {
    return this.db.list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map(actions =>
          actions.map(a => ({ key: a.payload.key, ...a.payload.val() }))
        )
      );
  }

  get(productId): Observable<Product> {
    return this.db.object<Product>('/products/' + productId)
      .valueChanges()
      .pipe(take(1));
  }

  delete(productID) {
    return this.db.object('/products/' + productID).remove();
  }
}
