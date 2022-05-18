import type { NextApiRequest, NextApiResponse } from 'next'
import sanityClient from '@sanity/client'

const config = {
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  useCdn: true,
  token: process.env.SANITY_API_TOKEN,
}

const client = sanityClient(config)

export default async function CreateComment(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { _id, name, email, comment } = JSON.parse(req.body)

  try {
    await client.create({
      _type: 'comment',
      post: {
        _type: 'reference',
        _rel: _id,
      },
      name,
      email,
      comment,
    })
  } catch (error) {
    console.log('create comment error')
    return res.status(500).json({
      message: "Couldn't submit comment",
      error,
    })
  }

  console.log('Comment submitted')
  return res.status(200).json({ message: 'Comment submitted' })
}