import React from 'react'
import { NftItem } from '../api/skymavis/route'
import Image from 'next/image'

interface NFTsCardProps {
  nft: NftItem
  index: number
}

const NFTsCard = ({
  nft
}: NFTsCardProps) => {
  return (
    <div className="card bg-base-100 w-96 max-h-96 shadow-xl">
      <figure className="px-10 pt-10">
        <Image
          src={nft.rawMetadata.image}
          alt={nft.rawMetadata.name}
          width={200}
          height={200}
          className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center">

        <span className='text-[#3d3d]'>Collection: {nft.tokenName}</span>
        <h2 className="card-title">{nft.rawMetadata.name}</h2>
        <div className="card-actions">
          <button className="btn btn-primary">Comprar</button>
        </div>
      </div>
    </div>
  )
}

export default NFTsCard