import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StreamComponent } from './components/stream/stream.component';
import { StreamListComponent } from './components/stream-list/stream-list.component';
import { StreamEditComponent } from './components/stream-edit/stream-edit.component';
import { StreamCreateComponent } from './components/stream-create/stream-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StreamAdminListComponent } from './components/stream-admin-list/stream-admin-list.component';
import { StreamItemComponent } from './components/stream-list/stream-item/stream-item.component';
import { StreamVideoComponent } from './components/stream/stream-video/stream-video.component';
import { StreamChatComponent } from './components/stream/stream-chat/stream-chat.component';

@NgModule({
  declarations: [
    AppComponent,
    StreamComponent,
    StreamListComponent,
    StreamEditComponent,
    StreamCreateComponent,
    StreamAdminListComponent,
    StreamItemComponent,
    StreamVideoComponent,
    StreamChatComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatChipsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
