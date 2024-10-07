"use client"

import { useEffect, useState } from "react";
import { NftsInfo } from "../api/skymavis/route";
import NFTsCard from "../components/NFTsCard";
import Link from "next/link";
import { CollectionsInfo } from "../api/skymavis/collections/route";
import classNames from "classnames";

interface NftListPageProps {
  params: {
    address: string;
  };
  searchParams: {
    contractAddress?: string;
  };
}


export default function NftListPage(
  { params, searchParams }: NftListPageProps,

) {
  const { address } = params
  const [nfts, setNfts] = useState<NftsInfo | null>(null);
  const [collections, setCollections] = useState<CollectionsInfo | null>(null);
  const [selectedCollection, setSelectedCollection] = useState<string | null>(searchParams.contractAddress ? searchParams.contractAddress : "");

  useEffect(() => {
    const fetchNfts = async () => {
      try {
        const response = await fetch(`/api/skymavis/nfts?address=${address}`);
        const data = await response.json() as NftsInfo
        setNfts(data);
      } catch (error) {
        console.error(error);
      }
    };
    const fetchCollections = async () => {
      if (!address) return
      try {
        const response = await fetch(`/api/skymavis/collections?address=${address}`);
        const data = await response.json()
        setCollections(data);

      } catch (error) {
        console.error(error);
      }
    }

    fetchNfts();
    fetchCollections();
  }, [])

  useEffect(() => {
    if (!searchParams.contractAddress) return
    setSelectedCollection(searchParams.contractAddress)
  }, [searchParams.contractAddress])

  console.log(collections)
  return (
    <div className='flex flex-col gap-5'>
      <div className="navbar bg-neutral text-neutral-content">
        <Link href="/" >
          Voltar
        </Link>
        <div className="flex-1 text-lg font-bold justify-center">
          <span className='-ml-32'>NFTs de {address}</span>
        </div>
      </div>
      <div className="flex flex-row gap-4">
        <div className="flex flex-col gap-2 w-[25%] bg-slate-600 rounded p-4">
          <h2 className="text-lg font-bold">Filters</h2>
          <h3 className="text-base font-semibold">Total: {nfts?.result.paging.total}</h3>
          <div className="mt-5 text-lg font-bold">Collections</div>
          <div className="flex flex-col gap-2">
            {collections?.result.items.map((collection) => (
              <Link
                key={`${collection.contractAddress}-${selectedCollection}`}
                href={`?contractAddress=${collection.contractAddress}`}
                className={classNames(
                  "flex justify-between hover:bg-slate-800 p-2 rounded",
                  collection.contractAddress === selectedCollection ? "bg-blue-800" : ""
                )}
              >
                <span>{collection.name}</span>
                <span>{collection.tokenCount}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className=" flex-1 grid grid-cols-3 gap-4">
          {nfts?.result.items.map((nft, index) => (
            <NFTsCard key={index} nft={nft} index={index} />
          ))}
        </div>
      </div>

    </div>

  )
}

