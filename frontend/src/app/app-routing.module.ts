import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StreamAdminListComponent } from './components/stream-admin-list/stream-admin-list.component';
import { StreamCreateComponent } from './components/stream-create/stream-create.component';
import { StreamEditComponent } from './components/stream-edit/stream-edit.component';
import { StreamListComponent } from './components/stream-list/stream-list.component';
import { StreamComponent } from './components/stream/stream.component';

const routes: Routes = [
  { path: '', component: StreamListComponent },
  { path: 'stream/:id', component: StreamComponent },
  { path: 'admin', component: StreamAdminListComponent },
  { path: 'admin/:id', component: StreamEditComponent },
  { path: 'new', component: StreamCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
