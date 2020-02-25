import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupedContactListComponent} from "./grouped-contact-list.component";

const routes: Routes = [
    {
        path: '',
        component: GroupedContactListComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class GroupedContactsRoutingModule { }
