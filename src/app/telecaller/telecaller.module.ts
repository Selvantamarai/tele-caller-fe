import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { TelecallerList } from "./telecaller-list/telecaller-list";
import { UnsubscribeModule } from "../../shared/services/module/unsubscribe/unsubscribe.module";
import { UserDetailService } from "../../shared/services/user-detail/user-detail";
import { CallQueueService } from "../../shared/services/teli-caller/call-queue.service";
import { CallerPageComponent } from "./caller-page/caller-page.component";
import { FormsModule } from "@angular/forms";
import { TooltipModule } from "ngx-bootstrap/tooltip";

@NgModule({
    declarations: [
        TelecallerList,
        CallerPageComponent,
    ],
    imports: [
        UnsubscribeModule,
        CommonModule,
        HttpClientModule,
        FormsModule,
        TooltipModule
    ],
    providers: [
        UserDetailService,
        CallQueueService
    ],
    exports: [TelecallerList,CallerPageComponent]
})
export class TeleCallerModule { }