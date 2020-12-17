import { User } from "./Data";

export default class Peferences {
  constructor(
    public darkMode: boolean,
    public baseColor: string,
    public textColor: string,
    public user: User,
    public darkenToolbar: boolean,
    public lang: "en" | "zh"
    ) {}
}

