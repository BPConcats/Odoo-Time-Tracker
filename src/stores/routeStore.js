import { get, writable } from "svelte/store";

export let localDir = writable('today');
export let prevDir = writable('today');

export let setLocalDir = (page) => {
    prevDir.set(get(localDir));
    localDir.set(page);
}

export let goToPrevDir = () => {
    localDir.set(get(prevDir));
}
