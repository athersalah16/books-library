"use client";

import Title from "@/app/components/common/Title";

function TrashPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col gap-6 bg-background px-4 py-4 sm:px-6">
      <Title
        title="Trash"
        description="Books removed from your collection. Restore them or delete them for good."
      />
      <p className="rounded-2xl border border-border bg-card p-6 text-sm text-muted-foreground">
        Your trash is empty.
      </p>
    </div>
  );
}

export default TrashPage;
