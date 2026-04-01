<script lang="ts">
    import { formatSeconds } from "../common";
    import ActivityItem from "../lib/ActivityItem.svelte";
    import { activities, getAllActivities } from "../stores/activityStore";


    let allActivities = [];
    let groupedActivities;

    $: if($activities) {
      allActivities = getAllActivities();
      groupedActivities = Object.groupBy(allActivities, (activity) => activity.dateCreated.split('T')[0]);
      console.log(groupedActivities);
    }

    function formatDate(dateString) {
      const date = new Date(dateString.replace(/-/g, '/'));

      return new Intl.DateTimeFormat('en-US', {
        month: 'long',   // "February"
        day: '2-digit',   // "02"
        year: 'numeric'   // "2026"
      }).format(date);
    }
</script>

<section class="col activities" style="flex: 1;">
  <div class="col panel" style="padding: 0px; gap: 10px; flex: 1; width: 100%; height: 490px; justify-content: start;">
      <div class="col" style="height: 490px; overflow-y: auto; gap: 0px;">
        {#each Object.entries(groupedActivities).reverse() as day}
          <details style="border-bottom: 1px solid var(--border); padding-bottom: 10px;">
            <summary style="padding: 15px 10px; padding-bottom: 0px;">
                {formatDate(day[0])} |
                <span style="color: var(--green); font-weight: bold;">{formatSeconds(day[1].filter((a) => a.description).map((a) => a.timeOnTask).reduce((sum, current) => sum + current, 0))}</span>
            </summary>
            {#each day[1].filter((a) => a.description) as activity}
              <div style="padding: 0px 20px;">
                <ActivityItem activity={activity}></ActivityItem>
              </div>
            {/each}
          </details>
        {/each}
      </div>
  </div>
</section>

<style>
    section {
        padding: 15px;
        padding-top: 4px;
    }

    .activities .panel {
        width: 100%;
    }
</style>
