import React from 'react'
import Title from '../components/common/Title';

function TrashPage() {
  return (
    <div className="flex min-h-dvh w-full flex-col gap-4 bg-background px-4 py-4">
      <Title title="Trash" description="Books removed from your collection. Restore them or delete them for good." />
    </div>
  )
}

export default TrashPage
