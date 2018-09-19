import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { FormxComponent } from './formx/formx.component';
import { DocumentComponent } from "./document/document.component";

const routes: Routes = [
    { path: '', redirectTo: 'formx', pathMatch: 'full' },
    { path: 'formx', component: FormxComponent },
    { path: 'document', component: DocumentComponent }
];

@NgModule({
    declarations: [
    ],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: []
})
export class AppRoutingModule { }