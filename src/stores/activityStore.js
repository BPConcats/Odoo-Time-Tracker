import { get, writable } from 'svelte/store';

export const activities = writable([]);
const storageItem = `all_activities`;

export let getLatestActivity = () => {
    if(getAllActivities().length == 0) {
        return null;
    } else {
        const actList = get(activities);
        return actList.findLast(a => a);
    }
}

export let startNewActivity = () => {
    localStorage.getItem(storageItem);
    let todayActivities = JSON.parse(localStorage.getItem(storageItem)) ?? [];
    todayActivities.push({
        id: getLatestActivity() ? getLatestActivity().id + 1 : 1,
        description: null,
        timeOnTask: 0,
        type: null,
        dateCreated: new Date()
    });
    localStorage.setItem(storageItem, JSON.stringify(todayActivities));
};

export let updateActivity = (args) => {
    const latest = getLatestActivity();
    const targetId = args.id ?? latest.id;

    activities.update(currentItems => {
        const updated = currentItems.map(item => {
            if (item.id === targetId) {
                return {
                    ...item,
                    description: args.description,
                    timeOnTask: args.timeOnTask,
                    type: args.type
                };
            }
            return item;
        });

        localStorage.setItem(storageItem, JSON.stringify(updated));
        return updated;
    });
};

export let removeActivity = (id) => {
    activities.update(currentItems => {
        const updated = currentItems.filter(item => item.id !== id);
        localStorage.setItem(storageItem, JSON.stringify(updated));
        return updated;
    });
};

export let getAllActivities = () => {
    let allActivities = JSON.parse(localStorage.getItem(storageItem)) ?? [];
    activities.set(allActivities);
    return get(activities);
};
