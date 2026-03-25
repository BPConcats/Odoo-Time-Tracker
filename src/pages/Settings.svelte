<script>
    import { goToPrevDir } from "../stores/routeStore";


</script>

<div style="padding: 12px; padding-top: 0px;">
    <i on:click={goToPrevDir} class="button fa-solid fa-arrow-left" style="font-size: larger;"></i>
    <h1>Settings</h1>
</div>

<style>
    i.button {
        -webkit-app-region: none;
        color: var(--text);
        cursor: pointer;
    }

    i.button:hover {
        color: var(--faded-text);
    }
</style>
