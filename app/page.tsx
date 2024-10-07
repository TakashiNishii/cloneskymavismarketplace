"use client"

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [address, setAddress] = useState("");
  return (
    <div
      className="hero min-h-screen text-white bg-[url('/bg-hero.jpg')]">
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold">Wallet-NFTDex</h1>
          <p className="mb-5">
            Search for address and see the NFTs in your wallet
          </p>
          <label className="input input-bordered flex items-center gap-2">
            <input type="text" className="grow" placeholder="Add address here" value={address} onChange={(e) => setAddress(e.target.value)} />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
          <Link href={`/${address}`} className="btn btn-primary mt-10 w-full"> Search </Link>
        </div>
      </div>
    </div>
  );
}
