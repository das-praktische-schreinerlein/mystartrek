import {ComponentFactoryResolver, Injectable, Type} from '@angular/core';
import {DynamicComponentService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/dynamic-components.service';
import {GeoDocActionTagsComponent} from '../components/gdoc-actiontags/gdoc-actiontags.component';

@Injectable()
export class GeoDocDynamicComponentService extends DynamicComponentService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super(componentFactoryResolver);
    }

    public getComponent(componentName: string): Type<any> {
        switch (componentName) {
            case 'actionTags':
            case 'actionTagsSmall':
            case 'actionTagsBig':
            case 'actionTagsFlat':
              return GeoDocActionTagsComponent;
        }

        return null;
    }
}
