import { NgModule } from '@angular/core';
import { MatIconModule } from "@angular/material/icon";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatCardModule } from "@angular/material/card";
import { ScrollingModule } from '@angular/cdk/scrolling';

import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        ScrollingModule,
        FlexLayoutModule 
    ],
    exports: [
        MatIconModule,
        MatToolbarModule,
        MatCardModule,
        ScrollingModule,
        FlexLayoutModule 
    ]
})
export class MaterialModule { }
