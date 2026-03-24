<script>
    import { formatSeconds } from "../common";

    export let activity = {
        id: -1,
        description: "Blank Description",
        timeOnTask: 0,
        type: 'misc',
        dateCreated: new Date()
    };

    let edit = false;
</script>

<div class="activity row">
    {#if edit}
    <div class="row">
        <div style="border-radius: 999px; width: 10px; height: 10px; {activity.type == 'billable' ? "background-color: var(--green);" : activity.type == 'non-billable' ? "background-color: var(--blue);" : "background-color: var(--orange);"}"></div>
        <p style="max-width: 450px; max-lines: 1;">{activity.description}</p>
    </div>
    <div class="row">
        <p
        style="font-size: 12px;
            padding: 0px 6px;
            border-radius: 999px;
            {activity.type == 'billable' ? "background-color: var(--faded-green);" : activity.type == 'non-billable' ? "background-color: var(--faded-blue);" : "background-color: var(--faded-orange);"}
            {activity.type == 'billable' ? "border: 1px solid var(--green);" : activity.type == 'non-billable' ? "border: 1px solid var(--blue);" : "border: 1px solid var(--orange);"}
            {activity.type == 'billable' ? "color: var(--green);" : activity.type == 'non-billable' ? "color: var(--blue);" : "color: var(--orange);"}
        "
        >{activity.type == 'billable' ? "Billable" : activity.type == 'non-billable' ? "Non-Billable" : "Misc."}</p>
        <p>{formatSeconds(activity.timeOnTask)}</p>
        <i on:click={edit = !edit} class="iconBtn fa-solid fa-edit"></i>
        <i class="iconBtn fa-solid fa-trash"></i>
    </div>
</div>

<style>
  .activity {
    justify-content: space-between;
    padding: 10px;
    align-items: center;
    border-bottom: 1px solid var(--border);
  }

  .activity:hover {
    background-color: var(--faded-border);
  }

  .activity .iconBtn {
    font-size: small;
    color: var(--faded-text);
    cursor: pointer;
  }

  .activity .iconBtn.fa-trash:hover {
    color: var(--red);
  }

  .activity .iconBtn.fa-edit:hover {
    color: var(--green);
  }
</style>
