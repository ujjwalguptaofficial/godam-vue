import Vue, { VueConstructor } from "vue";
import { Godam } from "godam";

declare module "vue/types/vue" {
    interface VueConstructor {
        $store: Godam
    }

    interface Vue {
        $store: Godam
    }
}
