import { login } from 'masto'

export default {
  async scheduled(
    controller: ScheduledController,
    env: Bindings,
    ctx: ExecutionContext,
  ): Promise<void> {
    const masto = await login({
      url: env.BASE_URL,
      accessToken: env.ACCESS_TOKEN,
    })
    const tinyfoxApiRes = await fetch(
      `https://api.tinyfox.dev/img?animal=wah&json`,
    )
    const tinyfoxApiData: TinyfoxAPIResponse = await tinyfoxApiRes.json()
    const imageUrl = `https://api.tinyfox.dev${tinyfoxApiData.loc}`
    const image = await fetch(imageUrl)
    const media = await masto.v2.mediaAttachments.create({
      file: await image.blob(),
      description: 'An image of a red panda',
    })
    const status = await masto.v1.statuses.create({
      mediaIds: [media.id],
      status: `Wah

Source: ${imageUrl}`,
      spoilerText: 'A red panda posted by a bot',
      sensitive: true,
      visibility: 'public',
    })
    console.log(`Posted status: ${status.url}`)
  },
}
