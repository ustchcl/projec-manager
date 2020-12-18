/**
 * DataLayer 提供获取和保存数据的抽象
 */

import { Milestone, Project, User } from "./Data";
import Peferences from "./Peferences";

function* getId(start: number) {
    let i = start;
    while (i < 10000000) {
        yield i;
        i++;
    }
}

const pids = JSON.parse(localStorage.getItem(`ProjectIds`) ?? "[]") as number[];
pids.sort((a, b) => a - b);

const idGetter = getId(pids?.[0] ?? 1);

export const project = {
    pids: pids,
    list() {
        return this.pids.map(this.getById)
    },

    create(p: Project) {
        const id = idGetter.next();
        if (id.done) {
            throw Error("Too Many Projects");
        }
        p.id = id.value
        this.pids.push(p.id)
        localStorage.setItem(`ProjectIds`, JSON.stringify(this.pids))
        localStorage.setItem(`Pro-${p.id}`, JSON.stringify(p));
    },

    remove(id: number) {
        this.pids = this.pids.filter(x => x != id)
        localStorage.removeItem(`Pro-${id}`)
    },

    getById(id: number | string): Project | null {
        const str = localStorage.getItem(`Pro-${id}`)
        if (str) {
            return JSON.parse(str)
        } else {
            return null
        }
    },

    update(id: number, p: Project) {
        localStorage.setItem(`Pro-${id}`, JSON.stringify(p));
    }
}

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