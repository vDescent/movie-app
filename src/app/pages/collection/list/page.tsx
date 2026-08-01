import ProtectedRoute from '@/app/utils/ProtectedRoute'
import React from 'react'

export default function CollectionList() {
  return (
    <ProtectedRoute>
        <div>
            <h1>Collection List (perlu crud)</h1>
            <button className='cursor-pointer'>Add collection</button>
            <p>Collection list</p>
            <p>Collection A (Clickable to collection details), edit collection, remove collection</p>
        </div>
    </ProtectedRoute>
  )
}
