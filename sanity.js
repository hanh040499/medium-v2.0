import { createCurrentUserHook, createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

// Find this information on sanity

export const config = {
  dataset: 'production',
  useCdn: 'production',
  projectId: '907ys318',
}

export const sanityClient = createClient(config)

export const urlFor = (source) => imageUrlBuilder(config).image(source)

export const useCurrentUser = createCurrentUserHook(config)
