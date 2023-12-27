import { createRestAPIClient } from 'masto'

export default {
  async scheduled(
    controller: ScheduledController,
    env: Bindings,
    ctx: ExecutionContext,
  ): Promise<void> {
    const masto = createRestAPIClient({
      url: env.BASE_URL,
      accessToken: env.ACCESS_TOKEN,
    })
    const tinyfoxApiRes = await fetch(
      `https://api.tinyfox.dev/img?animal=wah&json`,
    )
    const tinyfoxApiData: TinyfoxAPIResponse = await tinyfoxApiRes.json()
    const imageUrl = `https://api.tinyfox.dev${tinyfoxApiData.loc}`
    const image = await fetch(imageUrl)
    const media = await masto.v2.media.create({
      file: await image.blob(),
      description: 'An image of a red panda',
    })
    const status = await masto.v1.statuses.create({
      mediaIds: [media.id],
      status: `Wah

Source: ${imageUrl}`,
      visibility: 'unlisted',
    })
    console.log(`Posted status: ${status.url}`)
  },
}
