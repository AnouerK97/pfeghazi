<template>
  <aside class="sticky top-[65px] h-[calc(100vh-65px)] py-5">
    <div
      class="flex h-full w-full flex-col gap-5 overflow-y-auto rounded-md border bg-card pb-5 scrollbar-thin scrollbar-thumb-input scrollbar-thumb-rounded-md"
    >
      <SidebarItem :links="menu" />

      <div class="mt-auto">
        <SidebarItem :links="bottomMenu" />
      </div>
    </div>
  </aside>
</template>

<script setup lang="ts">
  const bottomMenu = [
    {
      title: "Settings",
      icon: "heroicons:cog-8-tooth",
    },
    {
      title: "Logout",
      icon: "heroicons:arrow-left-on-rectangle",
    },
  ];
  const menu = [
    {
      title: "Dashboard",
      icon: "heroicons:home",
    },
    {
      title: "Analytics",
      icon: "heroicons:chart-pie",
      items: [
        { title: "Version 1",url: "/analytics/v1" },
        { title: "Version 2", url: "/analytics/v2" },
        { title: "Version 3", url: "/analytics/v3" },
      ],
    },
    {
      title: "Models",
      icon: "heroicons:cube",
      items: [
      { title: "Version 1", url: "/model/v1" },
        { title: "Version 2" , url: "/model/v2"},
        { title: "Version 3" , url: "/model/v3"},
      ],
    },

  ];
</script>
