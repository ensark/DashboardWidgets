import { Component, OnInit, Input, TemplateRef } from '@angular/core';
import {
  SticosWidget,
  SticosWidgetMeta,
} from '../../decorators/sticos-widget.decorator';
import { WidgetService } from '../../services/widget.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserCacheService } from '../../services/user-cache.service';
import { UserService, IUser, IClaimsUser } from '@sticos/apis/common';

@Component({
  selector: 'sw-user-widget',
  templateUrl: './user-widget.component.html',
  styleUrls: ['./user-widget.component.scss'],
  providers: [UserService],
})
@SticosWidget({
  widgetName: 'UserWidget',
  headerName: 'User',
  options: {
    defaultHeight: 2,
    defaultWidth: 4,
    minHeight: 2,
    minWidth: 3,
  },
})
export class UserWidgetComponent implements OnInit {
  @Input()
  mod: string;
  @Input()
  settings: IUser;
  @Input()
  widgetId: string;
  @Input()
  loadingTemplate: TemplateRef<any>;

  settingsProxy: IUser;
  popupVisible = false;
  userForm: FormGroup;
  user: IUser;
  allUsers: IUser[] = [];

  @SticosWidgetMeta(UserWidgetComponent)
  sticosWidgetOptions: any;
  claimsUser: IClaimsUser;

  constructor(
    private userCacheService: UserCacheService,
    private fb: FormBuilder,
    private userService: UserService,
    private widgetService: WidgetService,
  ) {
    this.userCacheService.ClaimsUser().subscribe(claimsUser => {
      this.claimsUser = claimsUser;
    });
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      id: [],
    });

    if (!this.mod) {
      this.mod = 'default';
    }

    if (!this.settings || !this.settings.userId) {
      this.onShowSettings();
    } else {
      this.user = this.settings;
    }
  }

  onShowSettings() {
    this.userService
      .Search({ customerId: this.claimsUser.customerId.toString() })
      .subscribe((users: IUser[]) => {
        this.allUsers = users;
        this.settingsProxy = this.settings;
        const userId = this.settingsProxy ? this.settingsProxy.userId : null;
        this.userForm.setValue({ id: userId });
        this.popupVisible = true;
      });
  }

  onSettingsSaved() {
    this.user = this.allUsers.find(x => x.userId === +this.userForm.value.id);
    this.settings = this.user;
    this.widgetService.settingsChanged({
      settings: this.user,
      widgetId: this.widgetId,
    });
    this.popupVisible = false;
  }

  onDeleteWidget() {
    this.widgetService.deleteWidget(this.widgetId);
  }
}
