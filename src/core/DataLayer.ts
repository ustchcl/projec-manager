/**
 * DataLayer 提供获取和保存数据的抽象
 */

import { Milestone, Project, User } from "./Data";
import Peferences from "./Peferences";

export const peferences = {
    LOCAL_KEY: "PEFERENCE",
    instance: new Peferences(
        true,
        "#112233",
        "#000000",
        new User(-1, "Guest", ""),
        true,
        "zh"
    ),
    getConfig(): Peferences {
        const str = localStorage.getItem(this.LOCAL_KEY)
        if (str) {
            this.instance =  JSON.parse(str) as Peferences
        }
        return this.instance
    },
    saveConfig() {
        return localStorage.setItem(this.LOCAL_KEY, JSON.stringify(this.instance))
    },

    setValue<T extends keyof Peferences>(key: T, value: Peferences[T]) {
        this.instance[key] = value
        this.saveConfig()
    }

}

export const milestone = {
    create(milestone: Milestone) {
        localStorage.setItem(`Mil-${milestone.id}`, JSON.stringify(milestone))
    }
}