import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApiService } from './services/api.service';
import { GalleryComponent } from './gallery/gallery.view';

const routes: Routes = [ { path: '', component: GalleryComponent } ];

@NgModule({
  declarations: [ ],
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  providers: [ApiService]
})
export class AppRoutingModule {}
