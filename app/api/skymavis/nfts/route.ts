import { NextResponse } from 'next/server';

export type NftItem = {
  contractAddress: string,
  rawMetadata: {
    description: string,
    image: string,
    name: string,
  }
  tokenId: string,
  tokenName: string,
  tokenStandard: string,
  tokenSymbol: string,
  tokenURI: string
}

export type NftsInfo = {
  result: {
    items: NftItem[],
    paging: {
      total: number,
    }
  },
}

export async function GET(request: Request){
  const {searchParams} = new URL(request.url);
  const address = searchParams.get('address');

  try {
    const response = await fetch(`${process.env.MAVIS_URL}/ronin/nfts/search`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': `${process.env.MAVIS_KEY}`,
      },
      body: JSON.stringify(
        {
          "contractAddresses": [],
          "ownerAddress": address,
          "paging": {
            "limit": 100,
          } 
        }
      )
    })

    const data = await response.json();

    return NextResponse.json(data);
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error(error);
    return NextResponse.json({ errors: [{ message: errorMessage }] }, { status: 500 });
  }
}