import ProtectedRoute from '@/app/utils/ProtectedRoute'
import React from 'react'

export default function CollectionDetail() {
  return (
    <ProtectedRoute>
        <div>
            <h1>Collection Detail (perlu crud)</h1>
        </div>
    </ProtectedRoute>
  )
}
