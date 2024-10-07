import React, { useEffect, useState } from 'react'
import { tokenMetadata, tokenMetadataInfo } from '../api/skymavis/metadata/route'

interface PropertiesFilterProps {
  contractId: string
}

const PropertiesFilter = ({ contractId }: PropertiesFilterProps) => {
  const [properties, setProperties] = useState<tokenMetadata | null>(null)
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`/api/skymavis/metadata?tokenAddress=${contractId}`)
        const data = await response.json() as tokenMetadataInfo
        setProperties(data.data.tokenMetadata)
      } catch (error) {
        console.error(error)
      }
    }
    fetchProperties()
  }, [contractId])
  console.log(properties)
  return (
    <div className='flex flex-col'>
      {properties && properties.attributes
        .sort((a, b) => a.key.localeCompare(b.key))
        .map((attribute, index) => (
          <div key={index} className='flex flex-col gap-2'>
            <h2>{attribute.key}</h2>

          </div>
        ))}
    </div>
  )
}

export default PropertiesFilter