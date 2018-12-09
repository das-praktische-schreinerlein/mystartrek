import {ComponentFactoryResolver, Injectable, Type} from '@angular/core';
import {DynamicComponentService} from '@dps/mycms-frontend-commons/dist/angular-commons/services/dynamic-components.service';
import {StarDocActionTagsComponent} from '../components/sdoc-actiontags/sdoc-actiontags.component';

@Injectable()
export class StarDocDynamicComponentService extends DynamicComponentService {
    constructor(private componentFactoryResolver: ComponentFactoryResolver) {
        super(componentFactoryResolver);
    }

    public getComponent(componentName: string): Type<any> {
        switch (componentName) {
            case 'actionTags':
            case 'actionTagsSmall':
            case 'actionTagsBig':
            case 'actionTagsFlat':
              return StarDocActionTagsComponent;
        }

        return null;
    }
}
