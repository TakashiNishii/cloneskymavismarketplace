import { NextResponse } from 'next/server';

export type CollectionItem = {
  contractAddress: string,
  tokenCount: string,
  name: string,
}

export type CollectionsInfo = {
  result: {
    items: CollectionItem[],
    paging: {
      total: number,
    }
  },
}

export async function GET(request: Request){
  const {searchParams} = new URL(request.url);
  const address = searchParams.get('address');

  try {
    const response = await fetch(`https://api-gateway.skymavis.com/skynet/ronin/web3/v2/accounts/${address}/collections`,{
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'X-API-KEY': `${process.env.MAVIS_KEY}`,
      },
    })

    const contentType = response.headers.get('content-type');
    const isJson = contentType && contentType.includes('application/json');

    if (!isJson) {
      const textResponse = await response.text();
      console.error("Resposta não é JSON:", textResponse);
      return NextResponse.json({ errors: [{ message: `Resposta não é JSON ${textResponse}` }] }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data);
    
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error(error);
    return NextResponse.json({ errors: [{ message: errorMessage }] }, { status: 500 });
  }
}