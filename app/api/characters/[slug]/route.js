/**
@param {Object} req
@param {Object} params
@param {string} params.slug
@returns {Promise<Object>}
*/

import characters from '@/data/characters.json'
import quotes from '@/data/quotes.json'
import { NextResponse } from 'next/server'

export async function GET(req, { params }) {
  try {
    const character = characters.data.find(item => item.slug === params.slug)

    if (!character) {
      return new NextResponse('not found', { status: 404 })
    }

    const character_qoutes = quotes.data.filter(
      item => item.character_id === character.id,
    )

    return NextResponse.json({
      character,
      character_qoutes: character_qoutes.length > 0 ? character_qoutes : null,
    })
  } catch (error) {
    return NextResponse.json('Internal Server Error', { status: 500 })
  }
}
