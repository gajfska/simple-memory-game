import {Component, EventEmitter, Output} from '@angular/core';

@Component({
    selector: 'app-levelhard',
    templateUrl: './levelhard.component.html',
    styleUrls: ['./levelhard.component.css'],
})

export class LevelhardComponent {

    @Output() featureSelected = new EventEmitter<string>();

    onSelected(feature: string) {
        this.featureSelected.emit(feature);
    }
}
