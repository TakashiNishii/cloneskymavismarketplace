import { NextResponse } from 'next/server';

export type tokenMetadata = {
  attributes: {
    displayType: string,
    key: string,
    values: {
      value: string,
      count: number
    }[]
  }[]
}

export type tokenMetadataInfo = {
  data: {
    tokenMetadata: tokenMetadata
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const tokenAddress = searchParams.get('tokenAddress');

  if (!tokenAddress) {
    return NextResponse.json(
      { errors: [{ message: 'token address parameter are required' }] },
      { status: 400 }
    );
  }

  try {
    const response = await fetch(`${process.env.RONIN_URL_GRAPHQL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-API-KEY': `${process.env.MAVIS_KEY}`,
      },
      body: JSON.stringify({
        query: `
          query GetTokenMetadata($tokenAddress: String!) {
            tokenMetadata(tokenAddress: $tokenAddress) {
              attributes {
                displayType
                key
                values {
                  value
                  count
                }
              }
            }
          }
        `,
        variables: {
          tokenAddress
        }
      })
    });

    const data = await response.json();

    if ('errors' in data) {
      return NextResponse.json(data, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    // Se error for uma instância de Error, retornar sua mensagem
    const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
    console.error(error);
    return NextResponse.json({ errors: [{ message: errorMessage }] }, { status: 500 });
  }
}