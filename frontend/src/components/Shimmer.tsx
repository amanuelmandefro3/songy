import React from 'react'

interface ShimmerProps {
  className?: string
}

const Shimmer: React.FC<ShimmerProps> = ({ className }) => {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`}></div>
  )
}

export default Shimmer

