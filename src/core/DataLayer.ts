/**
 * DataLayer 提供获取和保存数据的抽象
 */

import { Project } from "./Data";

function* getId() {
    let i = 1;
    while (i < 10000000) {
        yield i;
        i++;
    }
}
const idGetter = getId();

export const project = {
    pids: JSON.parse(localStorage.getItem(`ProjectIds`) ?? "[]") as number[],
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

    getById(id: number): Project | null {
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