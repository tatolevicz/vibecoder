/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import * as nls from '../../../../nls.js';
import { Registry } from '../../../../platform/registry/common/platform.js';
import { Extensions as ViewContainerExtensions, IViewContainersRegistry, ViewContainerLocation, IViewsRegistry } from '../../../common/views.js';
import { EmptyView } from './emptyView.js';
import { SyncDescriptor } from '../../../../platform/instantiation/common/descriptors.js';
import { ViewPaneContainer } from '../../../browser/parts/views/viewPaneContainer.js';
import { registerIcon } from '../../../../platform/theme/common/iconRegistry.js';
import { Codicon } from '../../../../base/common/codicons.js';

// Create a unique ID for our view container
const EMPTY_VIEW_CONTAINER_ID = 'workbench.view.emptyViewContainer';

// Create an icon for our view container
const emptyViewIcon = registerIcon('emptyView-icon', Codicon.beaker, nls.localize('emptyViewIcon', 'Icon for the Empty View container.'));

// Register the view container in the main sidebar (left side)
const viewContainerRegistry = Registry.as<IViewContainersRegistry>(ViewContainerExtensions.ViewContainersRegistry);
const viewContainer = viewContainerRegistry.registerViewContainer({
	id: EMPTY_VIEW_CONTAINER_ID,
	title: nls.localize2('emptyView', "Empty View"),
	ctorDescriptor: new SyncDescriptor(ViewPaneContainer, [EMPTY_VIEW_CONTAINER_ID, { mergeViewWithContainerWhenSingleView: true }]),
	icon: emptyViewIcon,
	storageId: EMPTY_VIEW_CONTAINER_ID,
	// Make the container always visible
	hideIfEmpty: false,
	order: 7 // Lower number to place it higher in the sidebar
}, ViewContainerLocation.Sidebar, { doNotRegisterOpenCommand: false }); // Use the main sidebar (left side)

// Register our view within the container
const viewsRegistry = Registry.as<IViewsRegistry>(ViewContainerExtensions.ViewsRegistry);
viewsRegistry.registerViews([{
	id: EmptyView.ID,
	name: EmptyView.TITLE,
	ctorDescriptor: new SyncDescriptor(EmptyView),
	canToggleVisibility: true,
	canMoveView: true,
	when: undefined, // Always show this view
	order: 0
}], viewContainer);

// Add welcome content to our view to make it more noticeable
viewsRegistry.registerViewWelcomeContent(EmptyView.ID, {
	content: nls.localize('emptyViewWelcome', "This is our custom empty view. Click the button below to see a notification."),
	order: 0
});