/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { IViewletViewOptions } from '../../../browser/parts/views/viewsViewlet.js';
import { IInstantiationService } from '../../../../platform/instantiation/common/instantiation.js';
import { IThemeService } from '../../../../platform/theme/common/themeService.js';
import { IKeybindingService } from '../../../../platform/keybinding/common/keybinding.js';
import { IContextMenuService } from '../../../../platform/contextview/browser/contextView.js';
import { IConfigurationService } from '../../../../platform/configuration/common/configuration.js';
import { ViewPane } from '../../../browser/parts/views/viewPane.js';
import { IContextKeyService } from '../../../../platform/contextkey/common/contextkey.js';
import { IViewDescriptorService } from '../../../common/views.js';
import { IOpenerService } from '../../../../platform/opener/common/opener.js';
import { IHoverService } from '../../../../platform/hover/browser/hover.js';
import { Button } from '../../../../base/browser/ui/button/button.js';
import { INotificationService } from '../../../../platform/notification/common/notification.js';
import { ILocalizedString } from '../../../../platform/action/common/action.js';
import * as nls from '../../../../nls.js';

export class EmptyView extends ViewPane {

	static readonly ID: string = 'workbench.view.emptyView';
	static readonly TITLE: ILocalizedString = nls.localize2('emptyView', "Empty View");

	constructor(
		options: IViewletViewOptions,
		@IThemeService themeService: IThemeService,
		@IViewDescriptorService viewDescriptorService: IViewDescriptorService,
		@IInstantiationService instantiationService: IInstantiationService,
		@IKeybindingService keybindingService: IKeybindingService,
		@IContextMenuService contextMenuService: IContextMenuService,
		@IConfigurationService configurationService: IConfigurationService,
		@IContextKeyService contextKeyService: IContextKeyService,
		@IOpenerService openerService: IOpenerService,
		@IHoverService hoverService: IHoverService,
		@INotificationService private readonly notificationService: INotificationService
	) {
		super(options, keybindingService, contextMenuService, configurationService, contextKeyService, viewDescriptorService, instantiationService, openerService, themeService, hoverService);
	}

	protected override renderBody(container: HTMLElement): void {
		super.renderBody(container);

		// Add a title
		const titleElement = document.createElement('h2');
		titleElement.textContent = nls.localize('emptyViewTitle', "Empty View Example");
		titleElement.style.padding = '10px';
		titleElement.style.margin = '0';
		container.appendChild(titleElement);

		// Add a description
		const descriptionElement = document.createElement('div');
		descriptionElement.textContent = nls.localize('emptyViewDescription', "This is a basic view that appears in the sidebar.");
		descriptionElement.style.padding = '0 10px 10px 10px';
		container.appendChild(descriptionElement);

		// Create a button container
		const buttonContainer = document.createElement('div');
		buttonContainer.style.padding = '10px';
		container.appendChild(buttonContainer);

		// Create a button
		const button = new Button(buttonContainer, {
			title: nls.localize('buttonTitle', "Click me!")
		});

		button.label = nls.localize('buttonLabel', "Hello VS Code");

		// Register button click event
		this._register(button.onDidClick(() => {
			this.notificationService.info(nls.localize('buttonClickMessage', "Hello from Empty View!"));
		}));
	}
}