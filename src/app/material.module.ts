import { NgModule } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
    imports: [
        MatToolbarModule,
        ScrollingModule
    ],
    exports: [
        MatToolbarModule,
        ScrollingModule
    ]
})
export class MaterialModule { }
